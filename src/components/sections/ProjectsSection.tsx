import type { Project } from "@/types";
import { fetchStarCount, parseRepoSlug } from "@/lib/github";
import Reveal from "@/components/motion/Reveal";
import ProjectList from "@/components/sections/ProjectList";

interface ProjectsSectionProps {
  projects: Project[];
  moreHref?: string;
  pageTitle?: boolean;
}

export default async function ProjectsSection({
  projects,
  moreHref,
  pageTitle = false,
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
  const Title = pageTitle ? "h1" : "h2";

  return (
    <section id="projects" className="py-section">
      <div className="mx-auto max-w-content px-4 sm:px-4 lg:px-8">
        <Reveal>
          <Title
            className={`mb-8 font-semibold text-foreground ${
              pageTitle ? "text-h1" : "text-h2"
            }`}
          >
            Projects
          </Title>
        </Reveal>
        <ProjectList projects={projects} stars={stars} moreHref={moreHref} />
      </div>
    </section>
  );
}
