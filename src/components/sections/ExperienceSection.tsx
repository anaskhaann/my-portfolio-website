import React, { useState } from "react";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
  isDarkMode: boolean;
  experienceRef: React.RefObject<HTMLElement>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isDarkMode,
  experienceRef,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={experienceRef}
      id="experience"
      className="py-8 animate-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-8 text-foreground">
          Experience
        </h2>
        {/* Timeline Container */}
        <div className="relative space-y-8 experience-container">
          {/* Vertical Timeline Line */}
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
              onClick={() => handleToggle(index)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === index}
            >
              {/* Timeline Dot */}
              <span
                className={`absolute left-2 top-8 w-5 h-5 rounded-full border-2 border-border bg-background shadow-lg z-10 flex items-center justify-center transition-all duration-300`}
              >
                <span className={`w-2 h-2 rounded-full bg-foreground`}></span>
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
                {/* Expand/Collapse Button (optional chevron) */}
                <button
                  type="button"
                  className="flex items-center text-foreground hover:text-foreground mt-2 mb-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(index);
                  }}
                  aria-expanded={openIndex === index}
                  aria-controls={`exp-desc-${index}`}
                >
                  <span className="mr-2 font-medium">
                    {openIndex === index ? "Hide Details" : "Show Details"}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Description (expand/collapse) */}
                <div
                  id={`exp-desc-${index}`}
                  className={`transition-all duration-500 overflow-hidden ${
                    openIndex === index
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={openIndex !== index}
                >
                  <p className="font-normal text-muted-foreground leading-relaxed text-justify">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
