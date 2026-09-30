import type { Metadata, Viewport } from "next";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/content/site";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CursorLoader from "@/components/motion/CursorLoader";
import IntroGate from "@/components/motion/IntroGate";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: "%s — Mohd Anas",
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: siteConfig.email,
  image: `${siteConfig.url}/assets/pfp.webp`,
  sameAs: siteConfig.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ReactLenis root options={{ autoRaf: true }}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <TooltipProvider>
              <ScrollProgress className="bg-none bg-foreground" />
              <CursorLoader />
              <IntroGate>
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </IntroGate>
            </TooltipProvider>
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
