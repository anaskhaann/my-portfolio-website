"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { registerPaletteOpener } from "@/lib/palette";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const deregister = registerPaletteOpener(() => setOpen(true));
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      deregister();
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden h-8 gap-2 border-border bg-secondary px-3 text-xs text-muted-foreground md:inline-flex"
      >
        Search
        <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Go to a page or project…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="home" onSelect={() => go("/")}>
              Home
            </CommandItem>
            {siteConfig.navigation.map((item) => (
              <CommandItem
                key={item.href}
                value={item.name}
                onSelect={() => go(item.href)}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem
                key={p.id}
                value={p.title}
                onSelect={() => go("/projects")}
              >
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
