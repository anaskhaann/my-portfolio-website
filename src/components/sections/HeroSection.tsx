import React from "react";

interface HeroSectionProps {
  /**
   * Handles scrolling to different parts of the page.
   */
  onSectionScroll: (sectionName: string) => void;
  /**
   * A reference to the main hero section element, used for scrolling.
   */
  homeRef?: React.RefObject<HTMLElement>;
}

/**
 * The main landing page section.
 *
 * This component welcomes visitors with:
 * - A profile picture with animated decorations.
 * - The user's name and a role.
 * - A layout that works well on both mobile and desktop screens.
 */
import { useTheme } from "@/hooks/useTheme";

const HeroSection: React.FC<HeroSectionProps> = ({
  onSectionScroll,
  homeRef,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <section id="home" ref={homeRef} className="mt-12 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="flex flex-row gap-4 lg:gap-6 items-center">
          {/* Text content: name and title */}
          <div className="flex-1 text-left space-y-6">
            {/* Greeting and user's name */}
            <div className="hero-element">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-normal leading-tight">
                <span className="text-foreground font-bold tracking-tight">
                  Mohd Anas
                </span>
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-2xl flex items-center justify-start">
                <span className="text-foreground">AI/ML Engineer</span>
              </div>
            </div>
          </div>

          {/* Profile image */}
          <div className="flex justify-center hero-element">
            <div className="relative group">
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-border shadow-2xl relative transition-all duration-300 ease-in-out group-hover:scale-105">
                <div className="w-full h-full relative">
                  <img
                    src="/assets/pfp.webp"
                    alt="Profile Photo"
                    className="w-full h-full object-cover absolute inset-0 transition-all duration-300 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Small animated circles floating around the profile picture. */}
              <div className="absolute -top-6 -right-6 w-5 h-5 bg-muted rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-5 h-5 bg-muted rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-muted rounded-full shadow-lg animate-ping"></div>
            </div>
          </div>
        </div>
        {/* A personal or professional tagline */}
        <div className="hero-element mt-2">
          <p className="text-base sm:text-lg lg:text-xl font-normal text-black dark:text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I Build what I love and love what I Built. I am Good at What I Do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
