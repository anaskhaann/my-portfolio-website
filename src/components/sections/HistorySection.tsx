import React, { useState } from "react";
import type { Experience, EducationItem } from "@/types";

interface HistorySectionProps {
  experiences: Experience[];
  education: EducationItem[];
  isDarkMode: boolean;
  historyRef: React.RefObject<HTMLElement>;
}

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
    <section ref={historyRef} id="history" className="py-8 animate-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-8 text-foreground">
          Experience & Education
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-secondary/50 backdrop-blur-sm rounded-lg p-1 border border-border">
            <button
              onClick={() => handleTabChange("experience")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => handleTabChange("education")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative">
          {/* Experience Content */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              {/* Vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-1 bg-muted rounded-full pointer-events-none"
                style={{ zIndex: 0 }}
              />

              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex items-start group experience-card glass-card p-6 pl-8 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-card/30 border-border hover:border-foreground/40"
                      : "bg-card/30 border-border hover:border-foreground/40"
                  } shadow-lg hover:shadow-xl`}
                  onClick={() => {
                    // Toggle functionality can be added here if needed
                  }}
                  tabIndex={0}
                  role="button"
                >
                  {/* Timeline Dot */}
                  <span
                    className={`absolute left-2 top-8 w-5 h-5 rounded-full border-2 border-border bg-background shadow-lg z-10 flex items-center justify-center transition-all duration-300`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-foreground`}
                    ></span>
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 mx-2">
                      <div>
                        <h3 className={`text-xl font-medium text-foreground`}>
                          {exp.title}
                        </h3>
                        <p className="text-lg font-normal italic text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-normal bg-secondary text-foreground/80 border border-border w-fit`}
                      >
                        {exp.duration}
                      </span>
                    </div>
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 bg-secondary text-foreground border border-border hover:scale-105`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Description */}
                    <p className="font-normal text-muted-foreground leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Content */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {/* Vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-1 bg-muted rounded-full pointer-events-none"
                style={{ zIndex: 0 }}
              />

              {education.map((ed) => (
                <div
                  key={ed.id}
                  className={`relative flex items-start p-6 pl-8 rounded-xl glass-card backdrop-blur-md transition-all duration-300 ${
                    isDarkMode
                      ? "bg-card/30 border-border hover:border-foreground/40"
                      : "bg-card/30 border-border hover:border-foreground/40"
                  }`}
                >
                  {/* Timeline Dot */}
                  <span className="absolute left-2 top-8 w-5 h-5 rounded-full border-2 border-border bg-background shadow-lg z-10 flex items-center justify-center transition-all duration-300">
                    <span className="w-2 h-2 rounded-full bg-foreground" />
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 mx-2">
                      <div>
                        <h3 className="text-xl font-medium text-foreground">
                          {ed.degree}
                        </h3>
                        <p className="text-lg font-normal italic text-muted-foreground">
                          {ed.institution}
                        </p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-normal bg-secondary text-foreground/80 border border-border w-fit">
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
