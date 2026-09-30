import EducationList from "@/components/experience/EducationList";
import ExperienceList from "@/components/experience/ExperienceList";

function Subheading({ children }: { children: string }) {
  return (
    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  );
}

export default function ExperienceSection({
  pageTitle = false,
}: {
  pageTitle?: boolean;
}) {
  const Title = pageTitle ? "h1" : "h2";

  return (
    <section id="history" className="py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Title
          className={`mb-8 font-bold text-foreground ${
            pageTitle ? "text-h1" : "text-h2"
          }`}
        >
          Experience & Education
        </Title>
        <Subheading>Experience</Subheading>
        <ExperienceList />
        <div className="mt-12">
          <Subheading>Education</Subheading>
          <EducationList />
        </div>
      </div>
    </section>
  );
}
