import Image from "next/image";
import { routeMetadata } from "@/lib/seo";
import { profile } from "@/content/profile";
import { skillCategories } from "@/content/skills";
import { siteConfig } from "@/content/site";

export const metadata = routeMetadata(
  "/about",
  "About — Mohd Anas",
  "About Mohd Anas: AI/ML Engineer specializing in machine learning, data science, and web development."
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 lg:px-8">
      <section className="py-8">
        <h1 className="mb-2 text-3xl font-semibold text-foreground">
          About Me
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {siteConfig.role} · {profile.availability}
        </p>
        <div className="rounded-xl border border-border bg-card/30 p-4">
          {profile.bio.map((paragraph, i) => (
            <p
              key={i}
              className="mb-2 text-justify text-sm font-normal text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h1 className="mb-8 text-3xl font-semibold text-foreground">Skills</h1>
        <div className="flex flex-col gap-6">
          {skillCategories.map((c) => (
            <div key={c.category}>
              <h2 className="mb-3 text-xl font-medium text-foreground">
                {c.category}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1 text-sm text-foreground"
                  >
                    <Image
                      src={s.icon}
                      alt=""
                      width={18}
                      height={18}
                      loading="lazy"
                    />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
