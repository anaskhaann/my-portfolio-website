import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom hook for loading state and progress animation.
 * Simulates loading progress and cleans up on unmount.
 */
export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => {
      clearInterval(progressInterval);
      ScrollTrigger.killAll();
    };
  }, []);

  return { isLoading, setIsLoading, loadingProgress, setLoadingProgress };
}
