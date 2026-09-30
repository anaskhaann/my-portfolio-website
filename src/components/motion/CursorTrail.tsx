"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

const TRAIL_MS = 350;
const MAX_POINTS = 24;

/**
 * Canvas particle trail behind the pointer: recent positions render as
 * shrinking, fading dots. Runs entirely outside React render (refs + rAF),
 * so pointermove never triggers a re-render. Mounts only where the cursor
 * follower mounts (fine pointers, no reduced motion).
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: TrailPoint[] = [];
    let rafId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > MAX_POINTS) points.splice(0, points.length - MAX_POINTS);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      while (points.length > 0 && now - points[0].t > TRAIL_MS) points.shift();
      const n = points.length;
      for (let i = 0; i < n; i++) {
        const p = points[i];
        const age = (now - p.t) / TRAIL_MS;
        // Skip the freshest point: the head dot covers it.
        if (i === n - 1) continue;
        const k = 1 - age;
        const radius = 1 + 4 * k * (i / n);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 130, 130, ${(0.45 * k).toFixed(3)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99]"
    />
  );
}
