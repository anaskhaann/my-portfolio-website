import React from "react";
import type { SkillCategory } from "@/types";

interface SkillsSectionProps {
  /** An array of skill categories, each containing a list of skills. */
  skillCategories: SkillCategory[];
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
  /** A React ref to the main section element for targeting with animations or scrolling. */
  skillsRef: React.RefObject<HTMLElement>;
}

/**
 * The "Skills" section of the portfolio.
 * It displays a categorized list of skills with their corresponding icons.
 *
 * @param {SkillsSectionProps} props - The props for the component.
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillCategories,
  isDarkMode,
  skillsRef,
}) => {
  return (
    <section ref={skillsRef} id="skills" className="animate-section py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-4xl font-semibold text-foreground">
          Worked with
        </h2>
        <div className="skills-container space-y-4">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="mb-4 text-center text-xl font-medium text-muted-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skill-card group flex items-center space-x-2 rounded-full px-4 py-2 backdrop-blur-md glass-card transition-smooth duration-150 hover:scale-110 ${
                      isDarkMode
                        ? "border-border bg-card/30 hover:border-foreground/40"
                        : "border-border bg-card/30 hover:border-foreground/40"
                    } shadow-lg hover:shadow-xl`}
                  >
                    {/* Skill icon, supporting both PNG and SVG formats. */}
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-6 w-6 object-contain transition-smooth duration-100 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span
                      className={`font-normal text-foreground transition-smooth duration-100`}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
