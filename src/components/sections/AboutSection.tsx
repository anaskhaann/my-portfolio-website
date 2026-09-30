import Link from "next/link";
import { profile } from "@/content/profile";
import Reveal from "@/components/motion/Reveal";

export default function AboutSection({
  preview = false,
  pageTitle = false,
}: {
  preview?: boolean;
  pageTitle?: boolean;
}) {
  const paragraphs = preview ? profile.bio.slice(0, 1) : profile.bio;
  const Title = pageTitle ? "h1" : "h2";

  return (
    <section id="about" className="py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Title
            className={`mb-8 font-bold text-foreground ${
              pageTitle ? "text-h1" : "text-h2"
            }`}
          >
            About Me
          </Title>
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
            className="mt-3 inline-block text-sm font-normal text-foreground underline-offset-4 hover:underline"
          >
            More about me →
          </Link>
        )}
      </div>
    </section>
  );
}
