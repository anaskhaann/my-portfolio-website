import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize GSAP animations for the portfolio sections.
 * Manages animation setup and cleanup automatically.
 * @param scope - A React ref to the container element for the animations.
 */
export function usePortfolioAnimations(scope: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    // Ensure the scope is connected to a DOM element
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      // Hero section animations with stagger
      gsap.fromTo(
        ".hero-element",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // Scroll-triggered animations for sections
      const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 60%",
              scrub: 1.5, // Smoothly scrubs the animation
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Animate skill cards with bounce effect
      gsap.fromTo(
        ".skill-card",
        {
          opacity: 0,
          scale: 0.7,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.1,
        }
      );

      // Animate project cards with 3D effect
      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 60,
          rotationY: -15,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.15,
        }
      );
    }, scope); // Use scope for context

    // Cleanup function
    return () => ctx.revert();
  }, [scope]); // Rerun effect if scope changes
}
