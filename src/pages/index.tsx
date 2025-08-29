import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import HistorySection from "@/components/sections/HistorySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import AppLayout from "@/components/layout/AppLayout"; // Import the new layout
import { useTheme } from "@/hooks/useTheme";
import { useLoading } from "@/hooks/useLoading";
import { usePortfolioAnimations } from "@/hooks/usePortfolioAnimations";
import {
  experiences,
  projects,
  skillCategories,
  education,
} from "@/data/portfolioData";
import { useLenis } from "@/providers/LenisProvider";

// Register GSAP plugins for scroll-to functionality and scroll-triggered animations.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * The main page component for the portfolio.
 * It brings together all the different sections of the portfolio and manages their state.
 */
const Portfolio = () => {
  // State for theme, mobile menu, loading status, and expanded project.
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { lenis } = useLenis(); // Lenis instance for smooth scrolling.
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Refs for each section to enable smooth scrolling.
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Custom hook to initialize and manage GSAP animations.
  usePortfolioAnimations(mainContentRef);

  // Callback to hide the loading screen when animations are complete.
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  /**
   * Scrolls to a specific section of the page using GSAP.
   * @param {string} sectionName - The name of the section to scroll to.
   */
  const scrollToSection = (sectionName: string) => {
    const sectionRefs: { [key: string]: React.RefObject<HTMLElement> } = {
      home: homeRef,
      about: aboutRef,
      history: historyRef,
      projects: projectsRef,
      skills: skillsRef,
    };

    const target = sectionRefs[sectionName]?.current;

    if (target) {
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 0, // Adjust this if you have a fixed header.
        },
        duration: 1.8,
        ease: "power3.inOut",
      });
    }

    setIsMobileMenuOpen(false); // Close the mobile menu after scrolling.
  };

  return (
    <AppLayout
      isDarkMode={isDarkMode}
      isMobileMenuOpen={isMobileMenuOpen}
      onThemeToggle={toggleTheme}
      onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      onSectionScroll={scrollToSection}
      isLoading={isLoading}
    >
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div
        ref={mainContentRef}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <HeroSection onSectionScroll={scrollToSection} homeRef={homeRef} />
        <AboutSection isDarkMode={isDarkMode} aboutRef={aboutRef} />
        <HistorySection
          experiences={experiences}
          education={education}
          isDarkMode={isDarkMode}
          historyRef={historyRef}
        />
        <ProjectsSection
          projects={projects}
          isDarkMode={isDarkMode}
          expandedProject={expandedProject}
          setExpandedProject={setExpandedProject}
          projectsRef={projectsRef}
        />
        <SkillsSection
          skillCategories={skillCategories}
          isDarkMode={isDarkMode}
          skillsRef={skillsRef}
        />
      </div>
    </AppLayout>
  );
};

export default Portfolio;
