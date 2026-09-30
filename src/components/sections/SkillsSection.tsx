import Image from "next/image";
import { skillCategories } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mb-8 text-h2 font-bold text-foreground">
            Worked with
          </h2>
        </Reveal>
        <div className="space-y-4">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <Reveal>
                <h3 className="mb-4 text-center text-lg font-normal text-muted-foreground">
                  {category.category}
                </h3>
              </Reveal>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card group relative flex cursor-pointer items-center justify-center rounded-lg border-border bg-card/30 px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-150 hover:scale-110 hover:border-foreground/40 hover:shadow-xl"
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={20}
                      height={20}
                      loading="lazy"
                      className="absolute inset-0 m-auto object-contain opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                    />
                    <span className="font-normal text-foreground transition-opacity duration-100 group-hover:opacity-0">
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
}
