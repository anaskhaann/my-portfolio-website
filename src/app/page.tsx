import ExperienceSection from "@/components/experience/ExperienceSection";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { routeMetadata } from "@/lib/seo";

export const metadata = routeMetadata(
  "/",
  `${siteConfig.name} — ${siteConfig.role}`,
  siteConfig.description,
);

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection preview />
      <ExperienceSection />
      <ProjectsSection projects={projects.slice(0, 4)} moreHref="/projects" />
      <SkillsSection />
    </div>
  );
}
