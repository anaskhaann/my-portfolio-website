"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect-hindi";

const READINESS_TIMEOUT_MS = 400;

function timeout(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

async function waitForReadiness(imageSelector: string): Promise<void> {
  const pending: Promise<unknown>[] = [];

  if (typeof document !== "undefined" && "fonts" in document) {
    pending.push(document.fonts.ready.catch(() => undefined));
  }

  const image = document.querySelector<HTMLImageElement>(imageSelector);
  if (image) {
    pending.push(image.decode().catch(() => undefined));
  }

  await Promise.race([Promise.all(pending), timeout(READINESS_TIMEOUT_MS)]);
}

interface IntroGateProps {
  children: ReactNode;
  imageSelector?: string;
}

export default function IntroGate({
  children,
  imageSelector = "[data-intro-image]",
}: IntroGateProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Play on every full page load: sessionStorage survives a hard refresh
    // in the same tab, so gating on it meant the intro never replayed.
    // (Client-side navigation doesn't remount the layout, so this still
    // fires only on real loads.) Reduced-motion users skip it entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    setShowIntro(true);
    waitForReadiness(imageSelector).then(() => {
      if (cancelled) return;
      setReady(true);
    });


    return () => {
      cancelled = true;
    };
  }, [imageSelector]);

  return (
    <>
      <AnimatePresence>
        {showIntro && !ready ? (
          <motion.div
            role="status"
            aria-label="Loading portfolio"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AppleHelloEffectHindi
              durationScale={0.12}
              className="h-16 w-auto text-foreground"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
