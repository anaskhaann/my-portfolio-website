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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Main Portfolio Page Component
 *
 * This component orchestrates the content sections of the portfolio.
 * Layout and global elements are handled by AppLayout.
 */
const Portfolio = () => {
  // ===== STATE MANAGEMENT =====
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { lenis } = useLenis(); // Get the shared Lenis instance
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // ===== REFS FOR DOM ELEMENTS =====
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // ===== ANIMATIONS & LOADING =====
  // The usePortfolioAnimations hook now manages its own lifecycle via useLayoutEffect.
  // We just need to pass it the ref of the container element.
  usePortfolioAnimations(mainContentRef);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // ===== THEME MANAGEMENT =====
  // Now handled by useTheme context
  // const toggleTheme = ... (removed)

  // ===== NAVIGATION =====
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
          offsetY: 0, // Adjust if you have a fixed header
        },
        duration: 1.8,
        ease: "power3.inOut",
      });
    }

    setIsMobileMenuOpen(false);
  };

  // ===== RENDER LOGIC =====
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
