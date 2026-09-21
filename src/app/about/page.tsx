import { routeMetadata } from "@/lib/seo";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContributionsSection from "@/components/github/ContributionsSection";

export const metadata = routeMetadata(
  "/about",
  "About — Mohd Anas",
  "About Mohd Anas: AI/ML Engineer specializing in machine learning, data science, and web development."
);

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection pageTitle />
      <ContributionsSection />
      <SkillsSection />
    </div>
  );
}
