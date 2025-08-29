import React, { useState, useEffect } from "react";

interface HeroSectionProps {
  /**
   * Function to scroll to specific section
   */
  onSectionScroll: (sectionName: string) => void;
  /**
   * Ref for the home section (for scroll-to-home functionality)
   */
  homeRef?: React.RefObject<HTMLElement>;
}

/**
 * HeroSection Component
 *
 * Main landing section featuring:
 * - Profile photo with floating animations
 * - Name and role with typing animation
 * - Responsive layout (photo on top for mobile, side-by-side for desktop)
 *
 * Uses typewriter effect for dynamic role display.
 */
import { useTheme } from "@/hooks/useTheme";

const HeroSection: React.FC<HeroSectionProps> = ({
  onSectionScroll,
  homeRef,
}) => {
  // Typing animation state management
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Words to cycle through in typing animation
  const typingWords = ["an Engineer", "a Developer", "a Gamer"];

  /**
   * Typing Animation Effect
   *
   * Creates a typewriter effect that:
   * 1. Types out each word character by character
   * 2. Pauses when word is complete
   * 3. Deletes the word character by character
   * 4. Moves to next word and repeats
   */
  useEffect(() => {
    const typingSpeed = 150; // Speed for typing characters
    const deletingSpeed = 100; // Speed for deleting characters
    const pauseDuration = 1500; // Pause duration when word is complete

    const timeout = setTimeout(
      () => {
        const currentWord = typingWords[currentWordIndex];

        if (isDeleting) {
          // Deleting phase: remove characters
          if (currentCharIndex > 0) {
            setCurrentCharIndex((prev) => prev - 1);
            setTypingText(currentWord.substring(0, currentCharIndex - 1));
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        } else {
          // Typing phase: add characters
          if (currentCharIndex < currentWord.length) {
            setCurrentCharIndex((prev) => prev + 1);
            setTypingText(currentWord.substring(0, currentCharIndex + 1));
          } else {
            // Finished typing, start deleting after pause
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentWordIndex, typingWords]);

  const { isDarkMode } = useTheme();

  return (
    <section id="home" ref={homeRef} className="py-20 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1 lg:order-2 flex justify-center hero-element">
            <div className="relative group">
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border shadow-2xl relative transition-all duration-300 ease-in-out group-hover:scale-105">
                <div className="w-full h-full relative">
                  <img
                    src="/assets/pfp.jpg"
                    alt="Profile Photo"
                    className="w-full h-full object-cover absolute inset-0 transition-all duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating decorative elements with improved animations */}
              <div className="absolute -top-6 -right-6 w-8 h-8 bg-muted rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-muted rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-muted rounded-full shadow-lg animate-ping"></div>
            </div>
          </div>

          {/* Text Content Section - Shows second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            {/* Greeting and Main Name */}
            <div className="hero-element">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight">
                <span className="block text-foreground mb-2 text-2xl sm:text-3xl lg:text-4xl">
                  Hey there, I'm
                </span>
                <span className="text-foreground font-bold tracking-tight">
                  Mohd Anas
                </span>
              </h1>
            </div>

            {/* Dynamic Role with Typing Animation */}
            <div className="hero-element">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-6 min-h-[2rem] flex items-center justify-center lg:justify-start">
                <span className="text-foreground mr-2">
                  {/* Here we will have dynamic typing animation */}I am{" "}
                </span>
                <span className="text-foreground font-medium">
                  {typingText}
                  <span className="animate-pulse text-foreground ml-1">|</span>
                </span>
              </div>
            </div>

            {/* Professional Tagline */}
            <div className="hero-element">
              <p className="text-lg sm:text-xl lg:text-2xl font-normal text-black dark:text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I Build what I love and love what I Built.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-normal text-black dark:text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I am Good at What I Do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
