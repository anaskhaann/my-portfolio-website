"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

/**
 * Minimal share menu built from the installed dropdown-menu primitive and the
 * copy-button clipboard hook. The upstream `share-menu` registry item was
 * skipped: it imports a `toast.add` API that its own registry does not ship,
 * so installing it verbatim produces broken code.
 */
export function ShareMenu() {
  const { copy } = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const url = siteConfig.url;
  const encoded = encodeURIComponent(url);

  const copyLink = async () => {
    await copy(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Share this site">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyLink}>
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? "Link copied" : "Copy link"}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://x.com/intent/tweet?url=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on X
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite?url=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on LinkedIn
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
