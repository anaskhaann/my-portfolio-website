import { routeMetadata } from "@/lib/seo";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";

export const metadata = routeMetadata(
  "/about",
  "About — Mohd Anas",
  "About Mohd Anas: AI/ML Engineer specializing in machine learning, data science, and web development."
);

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
      <SkillsSection />
    </div>
  );
}
