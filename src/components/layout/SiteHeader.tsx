"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Download, Search } from "lucide-react";
import { siteConfig } from "@/content/site";
import { openPalette } from "@/lib/palette";
import CommandMenu from "@/components/command/CommandMenu";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <AnimatedThemeToggler
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={(t) => setTheme(t)}
      variant="circle"
      duration={400}
      aria-label="Toggle theme"
      className={`rounded-full border border-border bg-secondary p-2 transition-all duration-300 hover:bg-muted ${className}`}
    />
  );
}

export default function SiteHeader() {
  const pathname = usePathname();

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
        <nav
          className="hidden items-center space-x-6 font-medium md:flex"
          aria-label="Primary"
        >
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
          <CommandMenu />
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border-0 bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition-all duration-300 hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="p-2" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" aria-label="Mobile">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                <SheetClose asChild>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className="rounded-md px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                  >
                    Home
                  </Link>
                </SheetClose>
                {siteConfig.navigation.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        pathname === item.href ? "page" : undefined
                      }
                      className="rounded-md px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <button
                    type="button"
                    onClick={openPalette}
                    className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                  >
                    <Search className="h-4 w-4" />
                    Search
                    <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">
                      ⌘K
                    </kbd>
                  </button>
                </SheetClose>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
