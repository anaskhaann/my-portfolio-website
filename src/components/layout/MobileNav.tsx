"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      className="border-t border-border bg-background px-4 py-4 md:hidden"
      aria-label="Mobile"
    >
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          onClick={onNavigate}
          aria-current={pathname === "/" ? "page" : undefined}
          className="rounded-md px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
        >
          Home
        </Link>
        {siteConfig.navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={pathname === item.href ? "page" : undefined}
            className="rounded-md px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            {item.name}
          </Link>
        ))}
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Resume
        </a>
      </div>
    </nav>
  );
}
