import { routeMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata = routeMetadata(
  "/projects",
  "Projects — Mohd Anas",
  "Selected projects by Mohd Anas: agentic AI chatbots, RAG pipelines, ML tooling, and full-stack web apps."
);

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsSection projects={projects} pageTitle />
    </div>
  );
}
