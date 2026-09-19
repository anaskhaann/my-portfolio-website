import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skillCategories } from "@/content/skills";

export const metadata = routeMetadata(
  "/",
  `${siteConfig.name} — ${siteConfig.role}`,
  siteConfig.description
);

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const recentExperience = experiences.slice(0, 2);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 lg:px-8">
      <section id="home" className="py-8">
        <h1 className="text-2xl font-normal leading-tight sm:text-3xl lg:text-4xl">
          <span className="font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </h1>
        <p className="mt-1 text-lg text-foreground sm:text-xl lg:text-2xl">
          {siteConfig.role}
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          {profile.availability} — {profile.currentRole}
        </p>
      </section>

      <section id="about" className="py-8">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">About Me</h2>
        <p className="text-justify text-sm font-normal leading-relaxed text-muted-foreground">
          {profile.bio[0]}
        </p>
        <Link
          href="/about"
          className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          More about me →
        </Link>
      </section>

      <section id="history" className="py-8">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">
          Experience
        </h2>
        <ul className="flex flex-col gap-4">
          {recentExperience.map((e) => (
            <li key={e.id} className="border-b border-border pb-4">
              <h3 className="text-xl font-medium text-foreground">{e.title}</h3>
              <p className="text-sm text-muted-foreground">
                {e.company} · {e.duration}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/experience"
          className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Full experience →
        </Link>
      </section>

      <section id="projects" className="py-8">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">Projects</h2>
        <ul className="flex flex-col gap-4">
          {featuredProjects.map((p) => (
            <li key={p.id} className="border-b border-border pb-4">
              <h3 className="text-xl font-medium text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.technologies.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/projects"
          className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          All projects →
        </Link>
      </section>

      <section id="skills" className="py-8">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {skillCategories.map((c) => (
            <li
              key={c.category}
              className="rounded-lg border border-border bg-secondary px-3 py-1 text-sm text-foreground"
            >
              {c.category} ({c.skills.length})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
