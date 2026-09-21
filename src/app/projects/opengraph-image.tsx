import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Projects</div>
        <div style={{ fontSize: 32, fontWeight: 400, opacity: 0.7 }}>
          {`${siteConfig.name} — ${siteConfig.role}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
