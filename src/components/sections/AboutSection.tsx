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
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-semibold text-foreground">
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
            className={`max-w-none font-normal text-justify text-sm ${
              isDarkMode ? "text-white" : "text-muted-foreground"
            } transition-colors duration-300`}
          >
            <p className="mb-2">
              I’m a passionate and self-driven technologist specializing in
              Artificial Intelligence and Data Science. I thrive on solving
              real-world challenges through smart, efficient, and scalable
              solutions. Known for taking initiative and learning quickly, I’m
              dedicated to delivering high-quality results while continuously
              improving my skills.
            </p>
            <p className="mb-2">
              I believe in dreaming big, starting small, and moving fast — a
              mindset that fuels my curiosity and commitment to growth. My
              diverse technical background allows me to choose the right tools
              for the job, write clean and maintainable code, and adapt swiftly
              to dynamic, fast-paced environments.
            </p>
            <p className="mb-2">
              Beyond coding, I enjoy gaming, swimming, and recharging with a
              good rest — because creativity often sparks when the mind is
              refreshed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
