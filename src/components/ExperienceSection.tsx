import React from "react";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
  isDarkMode: boolean;
  experienceRef: React.RefObject<HTMLElement>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, isDarkMode, experienceRef }) => (
  <section
    ref={experienceRef}
    id="experience"
    className="py-20 animate-section"
    data-scroll-section
  >
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      data-scroll
      data-scroll-speed="0.3"
    >
      <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Experience
      </h2>
      <div className="max-h-[600px] overflow-y-auto space-y-8 pr-4 custom-scrollbar experience-container">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`experience-card group relative glass-card p-6 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
              isDarkMode
                ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
            } shadow-lg hover:shadow-xl hover:shadow-purple-500/10`}
            data-scroll
            data-scroll-delay={index * 0.1}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">{exp.title}</h3>
                <p className="text-lg font-light text-purple-300">{exp.company}</p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 w-fit">
                {exp.duration}
              </span>
            </div>
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    isDarkMode
                      ? "bg-secondary/50 text-foreground border-border"
                      : "bg-gray-200/50 text-gray-700 border-gray-300"
                  } border hover:scale-105`}
                >
                  {tech}
                </span>
              ))}
            </div>
            {/* Click to view details indicator */}
            <div className="text-center">
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode
                    ? "text-muted-foreground group-hover:text-blue-400"
                    : "text-slate-600 group-hover:text-blue-600"
                }`}
              >
                Click to view details
              </span>
            </div>
            {/* Description overlay on hover */}
            <div
              className={`absolute inset-0 rounded-xl p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                isDarkMode
                  ? "bg-card/95 border-purple-400/40"
                  : "bg-white/95 border-purple-400/40"
              } backdrop-blur-md border`}
            >
              <p
                className={`text-center leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-muted-foreground" : "text-slate-600"
                }`}
              >
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
