"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/content/experience";

/**
 * Work history rendered exactly as authored in content: title, company,
 * duration, description, technologies. Header always visible; details
 * expand on click. No date parsing, no duration math.
 */
export default function ExperienceList() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <ul className="flex flex-col gap-3">
      {experiences.map((item) => {
        const expanded = expandedId === item.id;
        return (
          <li
            key={item.id}
            className="rounded-xl border border-border bg-card/30 px-4 py-3"
          >
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`experience-panel-${item.id}`}
              onClick={() => setExpandedId(expanded ? null : item.id)}
              className="flex w-full cursor-pointer items-center justify-between gap-2 text-left"
            >
              <span>
                <span className="block font-bold text-foreground">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {item.company} · {item.duration}
                </span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {expanded && (
              <div
                id={`experience-panel-${item.id}`}
                className="animate-fade-in"
              >
                <p className="mt-2 text-justify text-sm font-normal leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-foreground/80"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
