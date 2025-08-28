import React from "react";
import type { SkillCategory } from "@/types";

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  isDarkMode: boolean;
  skillsRef: React.RefObject<HTMLElement>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillCategories,
  isDarkMode,
  skillsRef,
}) => {
  return (
    <section ref={skillsRef} id="skills" className="py-10 animate-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center mb-12 text-foreground">
          Skills
        </h2>
        <div className="space-y-8 skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-light mb-6 text-center text-muted-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skill-card flex items-center space-x-3 px-6 py-3 rounded-full glass-card backdrop-blur-md transition-all duration-300 hover:scale-110 group cursor-pointer ${
                      isDarkMode
                        ? "bg-card/30 border-border hover:border-foreground/40"
                        : "bg-card/30 border-border hover:border-foreground/40"
                    } shadow-lg hover:shadow-xl`}
                  >
                    {/* Skill icon - supports both PNG and SVG */}
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span
                      className={`font-medium transition-all duration-300 text-foreground`}
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
