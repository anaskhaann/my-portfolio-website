import React from "react";

interface AboutSectionProps {
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
  /** A React ref to the main section element for targeting with animations or scrolling. */
  aboutRef: React.RefObject<HTMLElement>;
}

/**
 * The "About Me" section of the portfolio.
 * It provides a brief introduction and background.
 *
 * @param {AboutSectionProps} props - The props for the component.
 */
const AboutSection: React.FC<AboutSectionProps> = ({
  isDarkMode,
  aboutRef,
}) => {
  return (
    <section ref={aboutRef} id="about" className="animate-section py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-4xl font-semibold text-foreground">
          About Me
        </h2>
        <div
          className={`glass-card rounded-xl p-4 backdrop-blur-md transition-all duration-300 ${
            isDarkMode
              ? "border-border bg-card/30 hover:border-foreground/40"
              : "border-border bg-card/30 hover:border-foreground/40"
          } shadow-xl hover:shadow-2xl`}
        >
          <div
            className={`max-w-none font-normal text-justify text-muted-foreground transition-colors duration-300`}
          >
            <p className="mb-2">
              Hello! My name is Mohd Anas Khan, and I hold a Bachelor's degree
              in Computer Science and Engineering from Rizvi College of
              Engineering, Mumbai. I specialize in Artificial Intelligence and
              Data Science.
            </p>
            <p className="mb-2">
              I am a self-motivated and collaborative team player, passionate
              about creating solutions that solve real-world challenges. I am
              known for my ability to take initiative, learn quickly, and
              consistently deliver high-quality results. I believe in the
              philosophy of dreaming big, starting small, and moving fast. My
              commitment to continuous learning and personal growth means that
              while I may not know everything, I have the determination and
              resourcefulness to find solutions and get the job done.
            </p>
            <p className="mb-2">
              My skillset is diverse, allowing me to select the best tools for
              building efficient and effective products. I thrive in fast-paced
              environments where I can quickly acquire new skills to improve and
              meet deadlines.
              <br />
              I am dedicated to writing clean, maintainable code and adhering to
              best practices to ensure the delivery of high-quality products. I
              am always eager to explore new technologies and take on
              challenging projects that push my boundaries.
              <br />
              When I'm not coding, you can find me gaming, swimming, or catching
              up on sleep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
