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
      // Hero section animations with stagger and slight rotation for depth
      gsap.fromTo(
        ".hero-element",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: 10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.25,
        }
      );

      // Scroll-triggered animations for sections with added blur for focus effect
      const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Animate skill cards with bounce effect and rotation for liveliness
      gsap.fromTo(
        ".skill-card",
        {
          opacity: 0,
          scale: 0.7,
          y: 40,
          rotation: 5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.15,
        }
      );

      // Animate project cards with 3D effect and slight scale pulse for emphasis
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
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.2,
        }
      );
    }, scope); // Use scope for context

    // Cleanup function
    return () => ctx.revert();
  }, [scope]); // Rerun effect if scope changes
}
