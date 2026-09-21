"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import type { Project } from "@/types";
import { parseRepoSlug } from "@/lib/github";
import Reveal from "@/components/motion/Reveal";
import { MagicCard } from "@/components/ui/magic-card";
import { GitHubStars } from "@/components/github-stars";

interface ProjectListProps {
  projects: Project[];
  stars: Record<number, number | null>;
  moreHref?: string;
}

export default function ProjectList({
  projects,
  stars,
  moreHref,
}: ProjectListProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const hasMore = projects.length > 4;
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <>
      <div className="flex flex-col gap-3">
        {visibleProjects.map((project) => {
          const expanded = expandedProject === project.id;
          const slug = parseRepoSlug(project.githubUrl);
          const count = stars[project.id];
          return (
            <Reveal key={project.id}>
              <MagicCard
                className="rounded-xl px-4 py-4"
                gradientSize={220}
                gradientColor="rgba(128,128,128,0.25)"
                gradientFrom="rgba(128,128,128,0.55)"
                gradientTo="transparent"
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`project-panel-${project.id}`}
                  onClick={() =>
                    setExpandedProject(expanded ? null : project.id)
                  }
                  className="flex w-full cursor-pointer items-center justify-between gap-2 text-left"
                >
                  <h3 className="mb-2 text-xl font-medium text-foreground">
                    {project.title}
                  </h3>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "h-6 border-border bg-secondary px-2 text-xs text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted"
                    )}
                  >
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline" }),
                        "h-6 border-border bg-secondary px-2 text-xs text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted"
                      )}
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Live
                    </a>
                  )}
                  {slug && count != null && (
                    <GitHubStars repo={slug} stargazersCount={count} />
                  )}
                </div>
                {expanded && (
                  <div
                    id={`project-panel-${project.id}`}
                    className="animate-fade-in"
                  >
                    <p className="mb-2 text-justify text-sm font-normal leading-relaxed text-muted-foreground transition-colors duration-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-foreground/80 transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </MagicCard>
            </Reveal>
          );
        })}
      </div>
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
      {moreHref && (
        <div className="mt-3 text-center">
          <Link
            href={moreHref}
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            All projects →
          </Link>
        </div>
      )}
    </>
  );
}
