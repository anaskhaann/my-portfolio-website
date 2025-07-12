import { useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom hook to initialize GSAP animations for the portfolio sections.
 * Returns an `initializeAnimations` function to be called after loading.
 */
export function usePortfolioAnimations() {
  const initializeAnimations = useCallback(() => {
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
    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section, index) => {
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
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
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

    // Animate experience cards
    gsap.fromTo(
      ".experience-card",
      {
        opacity: 0,
        x: -50,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        stagger: 0.2,
      }
    );
  }, []);

  return { initializeAnimations };
}
