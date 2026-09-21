import type { Project } from "@/types";
import { fetchStarCount, parseRepoSlug } from "@/lib/github";
import Reveal from "@/components/motion/Reveal";
import ProjectList from "@/components/sections/ProjectList";

interface ProjectsSectionProps {
  projects: Project[];
  moreHref?: string;
}

export default async function ProjectsSection({
  projects,
  moreHref,
}: ProjectsSectionProps) {
  const entries = await Promise.all(
    projects.map(async (project) => {
      const slug = parseRepoSlug(project.githubUrl);
      return {
        id: project.id,
        stars: slug ? await fetchStarCount(slug) : null,
      };
    })
  );
  const stars: Record<number, number | null> = Object.fromEntries(
    entries.map((e) => [e.id, e.stars])
  );

  return (
    <section id="projects" className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-4 lg:px-8">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold text-foreground">
            Projects
          </h2>
        </Reveal>
        <ProjectList projects={projects} stars={stars} moreHref={moreHref} />
      </div>
    </section>
  );
}
