import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A custom hook to manage the application's loading state and progress.
 * It simulates a loading sequence and provides state for loading status and progress percentage.
 */
export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress by incrementing the progress value at intervals.
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(progressInterval); // Stop the interval when loading is complete.
          return 100;
        }
        return next;
      });
    }, 100); // Update progress every 100ms.

    // Cleanup function to run when the component unmounts.
    return () => {
      clearInterval(progressInterval); // Ensure the interval is cleared.
      ScrollTrigger.killAll(); // Kill all ScrollTrigger instances to prevent memory leaks.
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return { isLoading, setIsLoading, loadingProgress, setLoadingProgress };
}
