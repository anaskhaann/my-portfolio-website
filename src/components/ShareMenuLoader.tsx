"use client";

import dynamic from "next/dynamic";

const ShareMenu = dynamic(
  () => import("@/components/share-menu").then((m) => m.ShareMenu),
  {
    ssr: false,
    loading: () => <span aria-hidden="true" className="h-9 w-9" />,
  }
);

export default function ShareMenuLoader() {
  return <ShareMenu />;
}
