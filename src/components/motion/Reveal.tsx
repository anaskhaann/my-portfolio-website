"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export default function Reveal({ children, delay = 0, y = 12 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <BlurFade
      delay={delay}
      offset={y}
      direction="up"
      duration={0.35}
      blur="0px"
      inViewMargin="-80px"
    >
      {children}
    </BlurFade>
  );
}
