import { routeMetadata } from "@/lib/seo";
import ExperienceSection from "@/components/sections/ExperienceSection";

export const metadata = routeMetadata(
  "/experience",
  "Experience — Mohd Anas",
  "Work experience and education of Mohd Anas, AI/ML Engineer."
);

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      <ExperienceSection pageTitle />
    </div>
  );
}
