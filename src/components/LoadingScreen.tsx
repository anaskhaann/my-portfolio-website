import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  /**
   * Loading progress percentage (0-100)
   */
  loadingProgress: number;
  /**
   * Callback function called when loading animation completes
   */
  onLoadingComplete: () => void;
  /**
   * Text to display during loading (used as fallback if no GIF)
   */
  displayText?: string;
}

/**
 * LoadingScreen Component
 *
 * Displays a full-screen loading animation with progress bar.
 * Supports both GIF animation and text fallback.
 * Automatically triggers completion callback when loading reaches 100%.
 *
 * @param loadingProgress - Current loading percentage (0-100)
 * @param onLoadingComplete - Function called when loading completes
 * @param displayText - Fallback name to display if no GIF provided
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loadingProgress,
  onLoadingComplete,
  displayText = "Anas Khan",
}) => {
  // Refs for DOM elements to animate
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Effect to handle loading completion animation
  useEffect(() => {
    // Only trigger completion when progress reaches 100%
    if (loadingProgress >= 100) {
      console.log("Loading complete - starting exit animation...");

      // Animate loading screen exit
      const tl = gsap.timeline();

      tl.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("Loading screen hidden - showing main content...");
          onLoadingComplete();
        },
      });
    }
  }, [loadingProgress, onLoadingComplete]);

  // Effect to animate progress bar width
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${loadingProgress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [loadingProgress]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center z-50"
    >
      <div className="text-center text-white">
        {/* Animated Display Name Always Visible Above Progress Bar */}
        <div className="mb-4 flex justify-center items-center">
          <h1 className="text-2xl font-light bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            {displayText}
          </h1>
        </div>
        {/* Progress Bar Container */}
        <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: "0%" }}
          />
        </div>
        {/* Progress Percentage */}
        <p className="text-sm text-gray-400">{loadingProgress}%</p>
        {/* Loading Status Text */}
        <p className="text-xs text-gray-500 mt-2">
          {loadingProgress < 50
            ? "Initializing..."
            : loadingProgress < 90
            ? "Loading assets..."
            : "Almost ready..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
