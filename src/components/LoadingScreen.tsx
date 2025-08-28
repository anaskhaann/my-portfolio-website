import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // List of greetings
  const greetings = [
    "Hello",
    "Hola",
    "Hallo",
    "Bonjour",
    "السلام عليكم",
    "Ciao",
    "你好",
    "こんにちは",
    "안녕하세요",
  ];

  useLayoutEffect(() => {
    const inDuration = 0.2;
    const holdDuration = 0.45;
    const outDuration = 0.2;

    // reset all spans to hidden
    spansRef.current.forEach((el) => el && gsap.set(el, { opacity: 0, y: 8 }));
    // ensure overlay is visible immediately and first greeting is shown to avoid blank frame
    if (preloaderRef.current && spansRef.current[0]) {
      gsap.set(preloaderRef.current, { opacity: 1 });
      gsap.set(spansRef.current[0], { opacity: 1, y: 0 });
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    timelineRef.current = tl;

    const lastIndex = greetings.length - 1;
    spansRef.current.forEach((el, i) => {
      if (!el) return;
      // For the first one we already showed instantly; still do a tiny hold before animating
      if (i === 0) {
        tl.to({}, { duration: holdDuration });
      } else {
        // Fade in
        tl.to(el, { opacity: 1, y: 0, duration: inDuration });
        // Hold visible
        tl.to({}, { duration: holdDuration });
      }
      // For all but last, fade out; for last, we keep it, then fade the overlay
      if (i !== lastIndex) {
        tl.to(el, { opacity: 0, y: -8, duration: outDuration });
      }
    });

    // After the last greeting has held, fade out the overlay
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // hide completely to avoid any overlay flash
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onLoadingComplete();
      },
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      const pre = preloaderRef.current;
      if (pre) gsap.killTweensOf(pre);
      spansRef.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, [onLoadingComplete, greetings.length]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      aria-live="polite"
      role="status"
    >
      <div className="relative h-20 w-full">
        {greetings.map((greeting, idx) => (
          <span
            key={idx}
            ref={(el) => {
              if (el) spansRef.current[idx] = el;
            }}
            className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl font-light text-foreground tracking-tight opacity-0 will-change-transform will-change-opacity"
          >
            {greeting}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
