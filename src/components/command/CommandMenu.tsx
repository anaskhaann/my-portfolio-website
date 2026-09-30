import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { Search } from "lucide-react";
import { siteConfig } from "@/content/site";
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
  const lenis = useLenis();
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

  // Radix locks body scroll but Lenis keeps driving window scroll on wheel,
  // so the page behind the palette moves. Pause it while open; the
  // CommandList keeps its own native overflow scroll.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

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
        <CommandInput placeholder="Go to a page…" />
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
        </CommandList>
      </CommandDialog>
    </>
  );
}
