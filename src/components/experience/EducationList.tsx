import { education } from "@/content/education";

/**
 * Education history rendered exactly as authored in content: degree,
 * institution, duration. No date parsing, no duration math.
 */
export default function EducationList() {
  return (
    <ul className="flex flex-col gap-4">
      {education.map((item) => (
        <li key={item.id} className="flex flex-col gap-1">
          <p className="font-semibold text-foreground">{item.degree}</p>
          <p className="text-sm text-muted-foreground">
            {item.institution} · {item.duration}
          </p>
        </li>
      ))}
    </ul>
  );
}
