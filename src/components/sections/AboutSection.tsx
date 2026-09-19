import Link from "next/link";
import { profile } from "@/content/profile";
import Reveal from "@/components/motion/Reveal";

export default function AboutSection({ preview = false }: { preview?: boolean }) {
  const paragraphs = preview ? profile.bio.slice(0, 1) : profile.bio;

  return (
    <section id="about" className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold text-foreground">
            About Me
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="rounded-xl border-border bg-card/30 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:shadow-2xl glass-card">
            <div className="max-w-none text-justify text-sm font-normal text-muted-foreground transition-colors duration-300">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
        {preview && (
          <Link
            href="/about"
            className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            More about me →
          </Link>
        )}
      </div>
    </section>
  );
}
