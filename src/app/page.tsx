import { routeMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

export const metadata = routeMetadata(
  "/",
  `${siteConfig.name} — ${siteConfig.role}`,
  siteConfig.description
);

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <AboutSection preview />
      <ExperienceSection />
      <ProjectsSection projects={projects.slice(0, 4)} moreHref="/projects" />
      <SkillsSection />
    </div>
  );
}
