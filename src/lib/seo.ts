import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function routeMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
