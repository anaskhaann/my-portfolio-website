import { experiences } from "@/content/experience";

/**
 * Work history rendered exactly as authored in content: title, company,
 * duration, description, technologies. No date parsing, no duration math.
 */
export default function ExperienceList() {
  return (
    <ul className="flex flex-col gap-8">
      {experiences.map((item) => (
        <li key={item.id} className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-bold text-foreground">{item.title}</h3>
            <span className="text-sm text-muted-foreground">
              {item.duration}
            </span>
          </div>
          <p className="text-sm font-normal text-muted-foreground">
            {item.company}
          </p>
          <p className="mt-1 text-justify text-sm font-normal leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-foreground/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
