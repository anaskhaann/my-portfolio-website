import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A custom hook that sets up and manages GSAP animations for the portfolio.
 * It handles the initialization of animations and their cleanup.
 *
 * @param scope - A React ref to the main container element where animations will be scoped.
 */
export function usePortfolioAnimations(scope: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    // Exit if the ref is not yet connected to a DOM element.
    if (!scope.current) return;

    // Create a GSAP context for safe animation cleanup.
    const ctx = gsap.context(() => {
      // Animate elements in the hero section with a staggered fade-in effect.
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
          ease: "power2.out",
          stagger: 0.3,
        }
      );

      // Animate sections on scroll, with a blur effect for focus.
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
            ease: "power2.out",
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

      // Animate skill cards with a playful bounce and rotation effect.
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
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.1,
        }
      );

      // Animate project cards with a 3D rotation effect.
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
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.1,
        }
      );
    }, scope); // Scope the animations to the provided element.

    // Cleanup function to revert all animations within the context.
    return () => ctx.revert();
  }, [scope]); // Rerun the effect if the scope changes.
}
