import { useEffect, useState } from "react";
import gsap from "gsap";

// Helper function to detect mobile devices
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Custom hook for animated cursor follower effect.
 *
 * @param cursorRef - ref for the main cursor element
 * @param cursorDotRef - ref for the cursor dot element
 * @param isLoading - loading state (to delay effect until loaded)
 */
export function useCursorFollower(cursorRef: React.RefObject<HTMLDivElement>, cursorDotRef: React.RefObject<HTMLDivElement>, isLoading: boolean) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    const mobile = isMobileDevice();
    setIsMobile(mobile);

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    // If it's a mobile device or elements don't exist, hide the cursors and return early
    if (mobile || !cursor || !cursorDot) {
      if (cursor) cursor.style.display = 'none';
      if (cursorDot) cursorDot.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      gsap.set(cursor, { x: cursorX - 20, y: cursorY - 20 });
      gsap.set(cursorDot, { x: mouseX - 4, y: mouseY - 4 });
      requestAnimationFrame(animateCursor);
    };

    const addHoverEffect = (selector: string, scale: number = 1.5) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale, duration: 0.3, ease: "power2.out" });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    };

    document.addEventListener("mousemove", moveCursor);
    animateCursor();

    setTimeout(() => {
      addHoverEffect("button", 1.8);
      addHoverEffect("a", 1.5);
      addHoverEffect(".project-card", 1.3);
      addHoverEffect(".skill-card", 1.2);
      addHoverEffect(".experience-card", 1.2);
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorRef, cursorDotRef, isLoading]);
}
