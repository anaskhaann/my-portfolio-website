import { routeMetadata } from "@/lib/seo";
import { experiences } from "@/content/experience";
import { education } from "@/content/education";

export const metadata = routeMetadata(
  "/experience",
  "Experience — Mohd Anas",
  "Work experience and education of Mohd Anas, AI/ML Engineer."
);

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 lg:px-8">
      <section className="py-8">
        <h1 className="mb-8 text-3xl font-semibold text-foreground">
          Experience
        </h1>
        <div className="flex flex-col gap-6">
          {experiences.map((e) => (
            <article
              key={e.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h2 className="text-xl font-medium text-foreground">{e.title}</h2>
              <p className="text-sm text-muted-foreground">
                {e.company} · {e.duration}
                {e.end === null && " · Current"}
              </p>
              <p className="mt-2 text-justify text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {e.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h1 className="mb-8 text-3xl font-semibold text-foreground">
          Education
        </h1>
        <div className="flex flex-col gap-4">
          {education.map((d) => (
            <article
              key={d.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h2 className="text-xl font-medium text-foreground">{d.degree}</h2>
              <p className="text-sm text-muted-foreground">
                {d.institution} · {d.duration}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
