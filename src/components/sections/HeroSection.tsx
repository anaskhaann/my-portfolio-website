import React, { useState, useEffect } from "react";

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
 * - The user's name and a role that types itself out.
 * - A layout that works well on both mobile and desktop screens.
 */
import { useTheme } from "@/hooks/useTheme";

const HeroSection: React.FC<HeroSectionProps> = ({
  onSectionScroll,
  homeRef,
}) => {
  // State for the typing animation
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // The list of words to display in the animation
  const typingWords = ["an Engineer", "a Developer", "a Gamer"];

  /**
   * Manages the typewriter animation for the user's role.
   * It cycles through the `typingWords` array, typing each one out,
   * pausing, and then deleting it before moving to the next.
   */
  useEffect(() => {
    const typingSpeed = 150; // How fast to type
    const deletingSpeed = 100; // How fast to delete
    const pauseDuration = 1500; // How long to wait after a word is typed

    const timeout = setTimeout(
      () => {
        const currentWord = typingWords[currentWordIndex];

        if (isDeleting) {
          // If deleting, remove characters one by one
          if (currentCharIndex > 0) {
            setCurrentCharIndex((prev) => prev - 1);
            setTypingText(currentWord.substring(0, currentCharIndex - 1));
          } else {
            // When the word is fully deleted, switch to the next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        } else {
          // If typing, add characters one by one
          if (currentCharIndex < currentWord.length) {
            setCurrentCharIndex((prev) => prev + 1);
            setTypingText(currentWord.substring(0, currentCharIndex + 1));
          } else {
            // When the word is fully typed, wait and then start deleting
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
    <section id="home" ref={homeRef} className="mt-2 py-24 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1 lg:order-2 flex justify-center hero-element">
            <div className="relative group">
              <div className="w-72 h-72 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-border shadow-2xl relative transition-all duration-300 ease-in-out group-hover:scale-105">
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
              <div className="absolute -top-6 -right-6 w-8 h-8 bg-muted rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-muted rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-muted rounded-full shadow-lg animate-ping"></div>
            </div>
          </div>

          {/* Container for all the text content. The order changes on different screen sizes. */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            {/* Greeting and user's name */}
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

            {/* The role that appears with the typing animation */}
            <div className="hero-element">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-6 min-h-[2rem] flex items-center justify-center lg:justify-start">
                <span className="text-foreground mr-2">
                  {/* Static text before the animation */}I am{" "}
                </span>
                <span className="text-foreground font-medium">
                  {typingText}
                  <span className="animate-pulse text-foreground ml-1">|</span>
                </span>
              </div>
            </div>

            {/* A personal or professional tagline */}
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
