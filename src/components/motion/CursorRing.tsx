"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, select, textarea, label';

/**
 * Outline ring around the pointer that expands over interactive elements.
 * Follows with a fast lerp and writes transforms straight to the DOM, so
 * pointermove never triggers a React render. Mounts only where the cursor
 * follower mounts (fine pointers, no reduced motion).
 */
export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;
    let scale = 1;
    let targetScale = 1;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      const target = e.target as HTMLElement | null;
      targetScale = target?.closest(HOVER_SELECTOR) ? 1.7 : 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      x += (targetX - x) * 0.35;
      y += (targetY - y) * 0.35;
      scale += (targetScale - scale) * 0.25;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[98] size-7 rounded-full border border-foreground/40"
    />
  );
}
