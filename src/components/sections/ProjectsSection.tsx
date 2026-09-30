import type { Project } from "@/types";
import Reveal from "@/components/motion/Reveal";
import ProjectList from "@/components/sections/ProjectList";

interface ProjectsSectionProps {
  projects: Project[];
  moreHref?: string;
  pageTitle?: boolean;
}

export default function ProjectsSection({
  projects,
  moreHref,
  pageTitle = false,
}: ProjectsSectionProps) {
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
        <ProjectList projects={projects} moreHref={moreHref} />
      </div>
    </section>
  );
}
