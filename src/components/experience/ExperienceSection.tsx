import { experiences } from "@/content/experience";
import type { Experience } from "@/types";
import {
  WorkExperience,
  type ExperienceItemType,
} from "@/components/work-experience";

const MONTHS: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};

function toPeriodDate(label: string): string {
  const parts = label.trim().split(/\s+/);
  if (parts.length < 2) return parts[0];
  const month = MONTHS[parts[0].toLowerCase().slice(0, 3)] ?? "01";
  return `${month}.${parts[1]}`;
}

function toRegistryExperience(e: Experience): ExperienceItemType {
  const [startLabel] = e.duration.split(" - ");
  return {
    id: String(e.id),
    companyName: e.company,
    isCurrentEmployer: e.end === null,
    positions: [
      {
        id: `${e.id}-0`,
        title: e.title,
        employmentPeriod: {
          start: toPeriodDate(startLabel),
          ...(e.end === null ? {} : { end: toPeriodDate(e.end) }),
        },
        description: e.description,
        skills: e.technologies,
      },
    ],
  };
}

export default function ExperienceSection() {
  return (
    <section id="history" className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-semibold text-foreground">
          Experience & Education
        </h2>
        <WorkExperience experiences={experiences.map(toRegistryExperience)} />
      </div>
    </section>
  );
}
