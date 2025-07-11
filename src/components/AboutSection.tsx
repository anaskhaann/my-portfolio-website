import React from "react";

interface AboutSectionProps {
  isDarkMode: boolean;
  aboutRef: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode, aboutRef }) => {
  return (
    <section
      ref={aboutRef}
      id="about"
      className="py-20 animate-section"
      data-scroll-section
    >
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        data-scroll
        data-scroll-speed="0.5"
      >
        <h2
          className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          About Me
        </h2>
        <div
          className={`glass-card p-8 rounded-2xl backdrop-blur-md transition-all duration-300 ${
            isDarkMode
              ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
              : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
          } shadow-xl hover:shadow-2xl`}
        >
          <div
            className={`prose prose-lg max-w-none transition-colors duration-300 ${
              isDarkMode ? "text-muted-foreground" : "text-slate-700"
            }`}
          >
            {/* TODO: Update with your actual bio */}
            <p className="text-lg leading-relaxed mb-6">
              My journey in technology started with a curiosity about how
              things work, which led me to explore programming and
              eventually fall in love with creating digital solutions.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              A self-starter and collaborative team player, passionate about
              building solutions that address real-world problems. Known for
              taking initiative, learning quickly, and consistently
              delivering results. I believe in dreaming big, starting small,
              and moving fast, and I bring a strong commitment to continuous
              learning and personal growth. I may not know everything, but I
              have the drive and resourcefulness to figure things out and
              get things done.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              I specialize in Artificial Intelligence and Data Science. I
              believe in writing clean, maintainable code and following best
              practices to deliver high-quality products. I'm always eager
              to learn new technologies and take on challenging projects
              that push my limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
