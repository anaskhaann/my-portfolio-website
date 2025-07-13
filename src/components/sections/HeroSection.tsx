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
    <section
      id="home"
      ref={homeRef}
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1 lg:order-2 flex justify-center hero-element">
            <div className="relative group">
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 relative transition-all duration-700 group-hover:scale-105 group-hover:shadow-purple-500/40">
                <img
                  src={
                    isDarkMode ? "/assets/light_pf.jpg" : "/assets/dark_pf.jpg"
                  }
                  alt="Profile Photo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating decorative elements with improved animations */}
              <div className="absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 animate-ping"></div>
            </div>
          </div>

          {/* Text Content Section - Shows second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            {/* Greeting and Main Name */}
            <div className="hero-element">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                <span className="block text-gray-400 dark:text-gray-300 mb-2 text-2xl sm:text-3xl lg:text-4xl">
                  Hi there, I'm
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium tracking-tight">
                  Anas Khan
                </span>
              </h1>
            </div>

            {/* Dynamic Role with Typing Animation */}
            <div className="hero-element">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-6 min-h-[3rem] flex items-center justify-center lg:justify-start">
                <span className="text-gray-400 dark:text-gray-300 mr-3">
                  {/* Here we will have dynamic typing animation */}I am{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                  {typingText}
                  <span className="animate-pulse text-purple-400 ml-1">|</span>
                </span>
              </div>
            </div>

            {/* Professional Tagline */}
            <div className="hero-element">
              <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I Build what I love and love what I Build.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
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
