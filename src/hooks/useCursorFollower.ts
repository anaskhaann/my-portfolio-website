import { useEffect, useState } from "react";
import gsap from "gsap";

/**
 * Detects if the current device is a mobile device based on its user agent.
 * @returns {boolean} True if the device is mobile, otherwise false.
 */
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * A custom hook that creates a cursor follower effect.
 * The cursor is disabled on mobile devices.
 *
 * @param cursorRef - A React ref for the main cursor element.
 * @param cursorDotRef - A React ref for the cursor's dot element.
 * @param isLoading - A boolean to delay the effect until the page has loaded.
 */
export function useCursorFollower(
  cursorRef: React.RefObject<HTMLDivElement>,
  cursorDotRef: React.RefObject<HTMLDivElement>,
  isLoading: boolean
) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Determine if the device is mobile.
    const mobile = isMobileDevice();
    setIsMobile(mobile);

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Disable the cursor follower on mobile devices or if refs are not available.
    if (mobile || !cursor || !cursorDot) {
      if (cursor) cursor.style.display = "none";
      if (cursorDot) cursorDot.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    /**
     * Updates the mouse coordinates.
     * @param {MouseEvent} e - The mouse event.
     */
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    /**
     * Animates the cursor to follow the mouse position smoothly.
     */
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX - 15, y: cursorY - 15 });
      gsap.set(cursorDot, { x: mouseX - 4, y: mouseY - 4 });
      requestAnimationFrame(animateCursor);
    };

    /**
     * Adds a hover effect to specified elements, scaling the cursor.
     * @param {string} selector - The CSS selector for the elements.
     * @param {number} [scale=1.5] - The amount to scale the cursor on hover.
     */
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

    // Set up event listeners and start the animation.
    document.addEventListener("mousemove", moveCursor);
    animateCursor();

    // Add hover effects to interactive elements after a short delay.
    setTimeout(() => {
      addHoverEffect("button", 1.5);
      addHoverEffect("a", 1.5);
      addHoverEffect(".project-card", 1.5);
      addHoverEffect(".experience-card", 1.5);
    }, 1000);

    // Cleanup function to remove event listeners and restore the cursor.
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorRef, cursorDotRef, isLoading]);
}
