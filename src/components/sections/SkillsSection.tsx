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
    <section
      ref={skillsRef}
      id="skills"
      className="py-10 animate-section"

    >
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"

      >
        <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="space-y-8 skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}

            >
              <h3 className="text-2xl font-light mb-6 text-center text-purple-400">
                {category.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skill-card flex items-center space-x-3 px-6 py-3 rounded-full glass-card backdrop-blur-md transition-all duration-300 hover:scale-110 group cursor-pointer ${
                      isDarkMode
                        ? "bg-card/30 border-purple-500/20 hover:border-purple-400/50"
                        : "bg-white/50 border-purple-500/20 hover:border-purple-400/50"
                    } shadow-lg hover:shadow-xl hover:shadow-purple-500/20`}
                  >
                    {/* Skill icon - supports both PNG and SVG */}
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span
                      className={`font-medium transition-all duration-300 ${
                        isDarkMode
                          ? "text-foreground group-hover:text-blue-400"
                          : "text-slate-700 group-hover:text-blue-600"
                      }`}
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
