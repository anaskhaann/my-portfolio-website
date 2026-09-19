import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50 py-8 text-foreground">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-center space-x-4">
          {siteConfig.socials.slice(0, 3).map((s) => {
            const Icon = icons[s.name] ?? Mail;
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="group transition-transform duration-300 hover:scale-110"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary shadow-lg transition-all duration-300 group-hover:shadow-xl hover:bg-muted">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
              </a>
            );
          })}
        </div>
        <p className="text-base text-muted-foreground">
          © 2025 Anas. Crafted with care. Last updated Sept 2025.
        </p>
      </div>
    </footer>
  );
}
