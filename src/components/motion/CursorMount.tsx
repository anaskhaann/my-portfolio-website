import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import CursorRing from "@/components/motion/CursorRing";
import CursorTrail from "@/components/motion/CursorTrail";

export default function CursorMount() {
  const reduceMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (reduceMotion || !hasFinePointer) return null;

  return (
    <div aria-hidden="true">
      <SmoothCursor cursor={<span className="block size-2 rounded-full bg-foreground" />} />
      <CursorRing />
      <CursorTrail />
    </div>
  );
}
