import React from "react";

interface AboutSectionProps {
  isDarkMode: boolean;
  aboutRef: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  isDarkMode,
  aboutRef,
}) => {
  return (
    <section ref={aboutRef} id="about" className="py-10 animate-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center mb-12 text-foreground">
          About Me
        </h2>
        <div
          className={`glass-card p-8 rounded-2xl backdrop-blur-md transition-all duration-300 ${
            isDarkMode
              ? "bg-card/30 border-border hover:border-foreground/40"
              : "bg-card/30 border-border hover:border-foreground/40"
          } shadow-xl hover:shadow-2xl`}
        >
          <div
            className={`prose prose-lg max-w-none transition-colors duration-300 text-justify text-muted-foreground`}
          >
            {/* TODO: Update with your actual bio */}
            <p className="text-lg mb-2">
              Hello ! my name is Mohd Anas Khan, I have completed my Bachelors
              in Computer Science and Engineering from RCOE, Mumbai. I
              specialize in Artificial Intelligence and Data Science.
            </p>
            <p className="text-lg mb-2">
              A self-starter and collaborative team player, passionate about
              building solutions that address real-world problems. Known for
              taking initiative, learning quickly, and consistently delivering
              results. I believe in dreaming big, starting small, and moving
              fast, and I bring a strong commitment to continuous learning and
              personal growth. I may not know everything, but I have the drive
              and resourcefulness to figure things out and get things done.
            </p>
            <p className="text-lg mb-2">
              My skillset is quite wide-ranged, I like to choose the best tools
              to get the best product as fast as possible. I'm a quick learner,
              especially in fast-paced environments where I'm able to hone
              skills on the fly to improve and deliver on time.
              <br />
              I believe in writing clean, maintainable code and following best
              practices to deliver high-quality products. I'm always eager to
              learn new technologies and take on challenging projects that push
              my limits.
              <br />
              When I'm not coding, you can find me Gaming, Swimming, or
              Sleeping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
