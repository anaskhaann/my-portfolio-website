import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // List of greetings
  const greetings = [
    "Hello",
    "آداب",
    "Привет",
    "مرحبًا",
    "Hola",
    "हेलो",
    "Bonjour",
    "Ciao",
  ];

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (index < greetings.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          // After the last greeting, start exit animation immediately
          setTimeout(() => {
            setIsVisible(false);
            // Call onLoadingComplete after the exit animation completes
            setTimeout(() => {
              onLoadingComplete();
            }, 600); // Reduced time for faster transition
          }, 300); // Reduced hold time for faster sequence
        }
      },
      index === 0 ? 200 : 200 // Set initial start time to zero
    );

    return () => clearTimeout(timer);
  }, [index, onLoadingComplete, greetings.length]);

  // Animation variants
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

          {/* Curved background animation */}
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
