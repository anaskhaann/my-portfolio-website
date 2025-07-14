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
    <section ref={projectsRef} id="projects" className="py-10 animate-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 projects-container">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group project-card glass-card rounded-xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${
                isDarkMode
                  ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                  : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
              } shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer`}
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
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-t from-background/80 to-transparent"
                      : "bg-gradient-to-t from-white/80 to-transparent"
                  } opacity-0 group-hover:opacity-100`}
                ></div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-medium mb-4 ${
                    isDarkMode ? "text-blue-400" : "text-white"
                  }`}
                >
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500/30 hover:border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all duration-300"
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
                      className="border-purple-500/30 hover:border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-all duration-300"
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
                      className="border-cyan-500/30 hover:border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-all duration-300"
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

                {expandedProject === project.id && (
                  <div className="animate-fade-in">
                    <p
                      className={`mb-4 leading-relaxed transition-colors duration-300 text-justify ${
                        isDarkMode ? "text-muted-foreground" : "text-white"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-muted-foreground" : "text-white/80"
                    }`}
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
              className="border-purple-500/30 hover:border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-all duration-300"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
        {/* More projects on GitHub */}
        <div className="flex justify-center mt-8">
          <a
            href="https://github.com/anaskhaann"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-purple-400/40 text-black hover:text-purple-400 transition-all duration-300 font-medium shadow-sm hover:shadow-lg"
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
