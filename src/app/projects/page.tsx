import { routeMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";

export const metadata = routeMetadata(
  "/projects",
  "Projects — Mohd Anas",
  "Selected projects by Mohd Anas: agentic AI chatbots, RAG pipelines, ML tooling, and full-stack web apps."
);

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 lg:px-8">
      <section className="py-8">
        <h1 className="mb-2 text-3xl font-semibold text-foreground">Projects</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {projects.length} projects — newest first.
        </p>
        <div className="flex flex-col">
          {projects.map((p) => (
            <article
              key={p.id}
              className="border-b border-border px-4 py-4"
            >
              <h2 className="mb-2 text-xl font-medium text-foreground">
                {p.title}
              </h2>
              <p className="mb-2 text-justify text-sm font-normal leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mb-2 flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  GitHub →
                </a>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Live →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
