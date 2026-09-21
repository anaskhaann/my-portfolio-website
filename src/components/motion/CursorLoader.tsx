"use client";

import dynamic from "next/dynamic";

const CursorMount = dynamic(
  () => import("@/components/motion/CursorMount"),
  { ssr: false }
);

export default function CursorLoader() {
  return <CursorMount />;
}
