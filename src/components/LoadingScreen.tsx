import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

/**
 * A loading screen component that cycles through a list of greetings in different languages
 * before revealing the main content. It uses Framer Motion for animations.
 *
 * @param {LoadingScreenProps} props - The props for the component.
 * @param {() => void} props.onLoadingComplete - A callback function that is called when the loading animation is complete.
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // A list of greetings to be displayed during the loading sequence.
  const greetings = [
    "Hello", // English
    "آداب", // Urdu
    "Привет", // Russian
    "مرحبًا", // Arabic
    "Hola", // Spanish
    "हेलो", // Hindi
    "Bonjour", // French
    "Ciao", // Italian
  ];

  useEffect(() => {
    // This effect manages the timing and sequence of the greetings animation.
    const timer = setTimeout(
      () => {
        if (index < greetings.length - 1) {
          // Move to the next greeting.
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          // Once all greetings have been shown, trigger the exit animation.
          setTimeout(() => {
            setIsVisible(false);
            // Notify the parent component that loading is complete after the exit animation.
            setTimeout(() => {
              onLoadingComplete();
            }, 600); // Corresponds to the exit animation duration.
          }, 300); // A short delay before starting the exit animation.
        }
      },
      index === 0 ? 200 : 200 // Delay between greetings.
    );

    // Cleanup function to clear the timeout when the component unmounts or re-renders.
    return () => clearTimeout(timer);
  }, [index, onLoadingComplete, greetings.length]);

  // Animation variants for Framer Motion.
  const slideUp: Variants = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };

  const fade: Variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 0.75,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  // Defines the curve animation for the SVG background.
  const curve: Variants = {
    initial: {
      d: `M0 0 L100 0 L100 100 Q50 130 0 100 L0 0`,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: `M0 0 L100 0 L100 100 Q50 100 0 100 L0 0`,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          variants={slideUp}
          initial="initial"
          exit="exit"
        >
          <motion.div
            className="flex items-center text-4xl font-black text-foreground md:text-4xl"
            variants={fade}
            initial="initial"
            animate="enter"
          >
            <p>{"👋🏻"}</p>
            <p>{greetings[index]}</p>
          </motion.div>

          {/* The curved SVG background that animates on exit. */}
          <motion.svg
            className="absolute top-0 -z-10 h-[calc(100%+300px)] w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              className="fill-background"
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
