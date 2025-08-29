import React from "react";
import type { EducationItem } from "@/types";

interface EducationSectionProps {
  education: EducationItem[];
  isDarkMode: boolean;
  educationRef: React.RefObject<HTMLElement>;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  isDarkMode,
  educationRef,
}) => {
  return (
    <section ref={educationRef} id="education" className="py-8 animate-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-8 text-foreground">
          Education
        </h2>

        <div className="relative space-y-8">
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
      </div>
    </section>
  );
};

export default EducationSection;
