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
      className="py-10 animate-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Experience
        </h2>
        {/* Timeline Container */}
        <div className="relative space-y-12 experience-container">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/40 via-purple-400/30 to-purple-500/40 rounded-full pointer-events-none"
            style={{ zIndex: 0 }}
          />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex items-start group experience-card glass-card p-6 pl-16 rounded-xl backdrop-blur-md transition-all duration-500 cursor-pointer border-l-0 ${
                isDarkMode
                  ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                  : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
              } shadow-lg hover:shadow-xl hover:shadow-purple-500/10`}
              onClick={() => handleToggle(index)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === index}
            >
              {/* Timeline Dot */}
              <span
                className={`absolute left-2 top-8 w-5 h-5 rounded-full border-2 ${
                  isDarkMode
                    ? "border-purple-400 bg-background"
                    : "border-blue-400 bg-white"
                } shadow-lg z-10 flex items-center justify-center transition-all duration-300`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode ? "bg-purple-400" : "bg-blue-400"
                  }`}
                ></span>
              </span>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 mx-2">
                  <div>
                    <h3
                      className={`text-xl font-medium ${
                        isDarkMode ? "text-blue-400" : "text-white"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-lg font-light text-purple-700">
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDarkMode
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30"
                        : "bg-white/10 text-white border-white/20"
                    } border w-fit`}
                  >
                    {exp.duration}
                  </span>
                </div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        isDarkMode
                          ? "bg-secondary/50 text-foreground border-border"
                          : "bg-gray-600/50 text-white border-gray-300"
                      } border hover:scale-105`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Expand/Collapse Button (optional chevron) */}
                <button
                  type="button"
                  className="flex items-center text-white hover:text-white focus:ring-2 focus:ring-black mt-2 mb-1"
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
                  <p className="text-base text-white dark:text-gray-300 leading-relaxed text-justify">
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
