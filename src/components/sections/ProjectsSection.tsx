import React from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play } from "lucide-react";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  isDarkMode: boolean;
  expandedProject: number | null;
  setExpandedProject: (id: number | null) => void;
  projectsRef: React.RefObject<HTMLElement>;
}

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
    <section ref={projectsRef} id="projects" className="py-8 animate-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-8 text-foreground">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 projects-container">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group project-card glass-card rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-[1.2] ${
                isDarkMode
                  ? "bg-card/30 border-border hover:border-foreground/40"
                  : "bg-card/30 border-border hover:border-foreground/40"
              } shadow-lg hover:shadow-2xl cursor-pointer`}
              onClick={() =>
                setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )
              }
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 bg-background/60 opacity-0 group-hover:opacity-100`}
                ></div>
              </div>

              <div className="p-4">
                <h3 className={`text-xl font-medium mb-2 text-foreground`}>
                  {project.title}
                </h3>
                {/* Project Links Buttons */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:border-foreground/50 bg-secondary hover:bg-muted text-foreground transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, "_blank");
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:border-foreground/50 bg-secondary hover:bg-muted text-foreground transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  )}
                  {project.videoUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:border-foreground/50 bg-secondary hover:bg-muted text-foreground transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.videoUrl, "_blank");
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
                {/* Project Description Section */}
                {expandedProject === project.id && (
                  <div className="animate-fade-in">
                    <p
                      className={`mb-2 font-normal leading-relaxed transition-colors duration-300 text-justify text-muted-foreground`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 rounded-full text-xs bg-secondary text-foreground/80 border border-border transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-2 text-center">
                  <span
                    className={`text-sm transition-colors duration-300 text-muted-foreground`}
                  >
                    {expandedProject === project.id
                      ? "Hide Details"
                      : "Show Details"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View More / Show Less Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-foreground/50 bg-secondary hover:bg-muted text-foreground transition-all duration-300"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
        {/* More projects on GitHub */}
        <div className="flex justify-center mt-6">
          <a
            href="https://github.com/anaskhaann"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-muted transition-all duration-300 font-medium shadow-sm hover:shadow-lg"
          >
            <Github className="w-5 h-5 mr-2" />
            For more projects, Checkout my GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
