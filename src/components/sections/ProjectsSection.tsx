import React from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play, ChevronDown } from "lucide-react";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  /** An array of project objects to be displayed. */
  projects: Project[];
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
  /** The ID of the currently expanded project, or `null` if none is expanded. */
  expandedProject: number | null;
  /** A function to set the ID of the expanded project. */
  setExpandedProject: (id: number | null) => void;
  /** A React ref to the main section element for targeting with animations or scrolling. */
  projectsRef: React.RefObject<HTMLElement>;
}

/**
 * The "Projects" section of the portfolio.
 * It displays a grid of projects with expandable details.
 *
 * @param {ProjectsSectionProps} props - The props for the component.
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isDarkMode,
  expandedProject,
  setExpandedProject,
  projectsRef,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const hasMore = projects.length > 4;
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section ref={projectsRef} id="projects" className="animate-section py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-4 lg:px-8">
        <h2 className="mb-8 text-3xl font-semibold text-foreground">
          Projects
        </h2>
        {/* List container for projects */}
        <div className="flex flex-col">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="border-b border-border py-4 px-4 cursor-pointer transition-all duration-500"
              onClick={() =>
                setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )
              }
            >
              <h3 className={`mb-2 text-xl font-medium text-foreground`}>
                {project.title}
              </h3>
              {/* Links to the project's GitHub, live demo, and video. */}
              <div className="mb-2 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs border-border bg-secondary text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank");
                  }}
                >
                  <Github className="mr-1 h-3 w-3" />
                  GitHub
                </Button>
                {project.liveUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs border-border bg-secondary text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Live
                  </Button>
                )}
              </div>
              {/* Expanded view with project description and technologies. */}
              {expandedProject === project.id && (
                <div className="animate-fade-in">
                  <p
                    className={`mb-2 text-justify font-normal leading-relaxed text-sm ${
                      isDarkMode ? "text-white" : "text-muted-foreground"
                    } transition-colors duration-300`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full border border-border bg-secondary px-2 py-1 text-xs text-foreground/80 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-2 flex justify-center">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    expandedProject === project.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        {/* "View More" / "Show Less" button for projects. */}
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-secondary text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
        {/* Link to GitHub for more projects.Comment for time beign */}
        {/* <div className="mt-6 flex justify-center">
          <a
            href="https://github.com/anaskhaann"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-secondary px-4 py-2 font-medium text-foreground shadow-sm transition-all duration-300 hover:bg-muted hover:shadow-lg"
          >
            <Github className="mr-2 h-5 w-5" />
            For more projects, Checkout my GitHub
          </a>
        </div>
         */}
      </div>
    </section>
  );
};

export default ProjectsSection;
