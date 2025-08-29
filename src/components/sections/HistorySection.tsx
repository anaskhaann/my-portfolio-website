import React, { useState } from "react";
import type { Experience, EducationItem } from "@/types";

interface HistorySectionProps {
  /** An array of work experience objects. */
  experiences: Experience[];
  /** An array of education items. */
  education: EducationItem[];
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
  /** A React ref to the main section element for targeting with animations or scrolling. */
  historyRef: React.RefObject<HTMLElement>;
}

/**
 * The "Experience & Education" section of the portfolio.
 * It displays work history and educational background in a tabbed interface.
 *
 * @param {HistorySectionProps} props - The props for the component.
 */
const HistorySection: React.FC<HistorySectionProps> = ({
  experiences,
  education,
  isDarkMode,
  historyRef,
}) => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );

  const handleTabChange = (tab: "experience" | "education") => {
    setActiveTab(tab);
  };

  return (
    <section ref={historyRef} id="history" className="animate-section py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-4xl font-semibold text-foreground">
          Experience & Education
        </h2>

        {/* Tab navigation to switch between Experience and Education. */}
        <div className="mb-8 flex justify-center">
          <div className="flex rounded-lg border border-border bg-secondary/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => handleTabChange("experience")}
              className={`rounded-md px-6 py-2 font-medium transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => handleTabChange("education")}
              className={`rounded-md px-6 py-2 font-medium transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Content area for the selected tab. */}
        <div className="relative">
          {/* Experience Tab Content */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              {/* Vertical timeline bar. */}
              <div
                className="pointer-events-none absolute left-5 top-0 bottom-0 w-1 rounded-full bg-muted"
                style={{ zIndex: 0 }}
              />

              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`experience-card glass-card group relative flex cursor-pointer items-start rounded-xl p-6 pl-8 backdrop-blur-md transition-all duration-300 ${
                    isDarkMode
                      ? "border-border bg-card/30 hover:border-foreground/40"
                      : "border-border bg-card/30 hover:border-foreground/40"
                  } shadow-lg hover:shadow-xl`}
                  tabIndex={0}
                  role="button"
                >
                  {/* Timeline marker dot. */}
                  <span
                    className={`absolute left-2 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background shadow-lg transition-all duration-300`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full bg-foreground`}
                    ></span>
                  </span>

                  <div className="flex-1">
                    <div className="mx-2 mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className={`text-xl font-medium text-foreground`}>
                          {exp.title}
                        </h3>
                        <p className="text-lg font-normal italic text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`w-fit rounded-full border border-border bg-secondary px-4 py-2 text-sm font-normal text-foreground/80`}
                      >
                        {exp.duration}
                      </span>
                    </div>
                    {/* Technologies used in the role. */}
                    <div className="mb-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`rounded-full border border-border bg-secondary px-3 py-1 text-sm text-foreground transition-all duration-300 hover:scale-105`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Job description. */}
                    <p className="text-justify font-normal leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Tab Content */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {/* Vertical timeline bar. */}
              <div
                className="pointer-events-none absolute left-5 top-0 bottom-0 w-1 rounded-full bg-muted"
                style={{ zIndex: 0 }}
              />

              {education.map((ed) => (
                <div
                  key={ed.id}
                  className={`relative flex items-start rounded-xl p-6 pl-8 backdrop-blur-md transition-all duration-300 glass-card ${
                    isDarkMode
                      ? "border-border bg-card/30 hover:border-foreground/40"
                      : "border-border bg-card/30 hover:border-foreground/40"
                  }`}
                >
                  {/* Timeline marker dot. */}
                  <span className="absolute left-2 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background shadow-lg transition-all duration-300">
                    <span className="h-2 w-2 rounded-full bg-foreground" />
                  </span>

                  <div className="flex-1">
                    <div className="mx-2 mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-foreground">
                          {ed.degree}
                        </h3>
                        <p className="text-lg font-normal italic text-muted-foreground">
                          {ed.institution}
                        </p>
                      </div>
                      <span className="w-fit rounded-full border border-border bg-secondary px-4 py-2 text-sm font-normal text-foreground/80">
                        {ed.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
