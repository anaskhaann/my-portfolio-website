"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Download } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import MobileNav from "@/components/layout/MobileNav";

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="cursor-pointer text-3xl font-black tracking-wide text-foreground"
          aria-label="Mohd Anas — home"
        >
          /A\
        </Link>
        <nav className="hidden items-center space-x-6 font-medium md:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="group relative text-foreground/80 transition-colors duration-300 hover:text-foreground"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground/40 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border-0 bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition-all duration-300 hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-border bg-secondary p-2 transition-all duration-300 hover:bg-muted"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </button>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-border bg-secondary p-2"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && <MobileNav onNavigate={() => setOpen(false)} />}
    </header>
  );
}
