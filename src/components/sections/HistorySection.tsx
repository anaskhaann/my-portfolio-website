"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/content/experience";
import { education } from "@/content/education";
import Reveal from "@/components/motion/Reveal";

export default function HistorySection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );

  return (
    <section id="history" className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold text-foreground">
            Experience & Education
          </h2>
        </Reveal>

        <div className="mb-8 flex justify-center">
          <div className="flex rounded-lg border border-border bg-secondary/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("experience")}
              className={`rounded-md px-4 py-1.5 font-medium transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`rounded-md px-4 py-1.5 font-medium transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Education
            </button>
          </div>
        </div>

        <div className="relative">
          {activeTab === "experience" && (
            <div className="space-y-8">
              <div
                className="pointer-events-none absolute left-5 top-0 bottom-0 w-1 rounded-full bg-muted"
                style={{ zIndex: 0 }}
              />

              {experiences.map((exp) => (
                <Reveal key={exp.id}>
                  <div
                    className="glass-card group relative flex cursor-pointer items-start rounded-xl border-border bg-card/30 p-4 pl-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:shadow-xl"
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      setExpandedExperience(
                        expandedExperience === exp.id ? null : exp.id
                      )
                    }
                  >
                    <span className="absolute left-2 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background shadow-lg transition-all duration-300">
                      <span className="h-2 w-2 rounded-full bg-foreground"></span>
                    </span>

                    <div className="flex-1">
                      <div className="mx-2 mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-base font-normal italic text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                        <span className="w-fit rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-normal text-foreground/80">
                          {exp.duration}
                          {exp.end === null && " · Current"}
                        </span>
                      </div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-border bg-secondary px-3 py-1 text-sm text-foreground transition-all duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {expandedExperience === exp.id && (
                        <p className="text-justify text-sm font-normal leading-relaxed text-muted-foreground transition-colors duration-300">
                          {exp.description}
                        </p>
                      )}
                      <div className="mt-2 flex justify-center">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            expandedExperience === exp.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-8">
              <div
                className="pointer-events-none absolute left-5 top-0 bottom-0 w-1 rounded-full bg-muted"
                style={{ zIndex: 0 }}
              />

              {education.map((ed) => (
                <Reveal key={ed.id}>
                  <div className="glass-card relative flex items-start rounded-xl p-4 pl-6 backdrop-blur-md transition-all duration-300">
                    <span className="absolute left-2 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background shadow-lg transition-all duration-300">
                      <span className="h-2 w-2 rounded-full bg-foreground" />
                    </span>

                    <div className="flex-1">
                      <div className="mx-2 mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-foreground">
                            {ed.degree}
                          </h3>
                          <p className="text-base font-normal italic text-muted-foreground">
                            {ed.institution}
                          </p>
                        </div>
                        <span className="w-fit rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-normal text-foreground/80">
                          {ed.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
