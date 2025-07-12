import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import AppLayout from "@/components/layout/AppLayout"; // Import the new layout
import { useTheme } from "@/hooks/useTheme";
import { useLoading } from "@/hooks/useLoading";
import { usePortfolioAnimations } from "@/hooks/usePortfolioAnimations";
import { experiences, projects, skillCategories } from "@/data/portfolioData";

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
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, setIsLoading, loadingProgress } = useLoading();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // ===== REFS FOR DOM ELEMENTS =====
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // ===== ANIMATIONS & LOADING =====
  const { initializeAnimations } = usePortfolioAnimations();

  const handleLoadingComplete = () => {
    console.log("✅ Loading complete - initializing page...");
    setIsLoading(false);
    if (mainContentRef.current) {
      mainContentRef.current.style.opacity = "1";
      mainContentRef.current.style.visibility = "visible";
      mainContentRef.current.style.display = "block";
    }
    setTimeout(() => {
      initializeAnimations();
    }, 100);
  };

  // ===== THEME MANAGEMENT =====
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    console.log(`🎨 Theme switched to: ${newTheme ? "dark" : "light"}`);
  };

  // ===== NAVIGATION =====
  const scrollToSection = (sectionName: string) => {
    const sectionRefs: { [key: string]: React.RefObject<HTMLElement> } = {
      home: homeRef,
      about: aboutRef,
      experience: experienceRef,
      projects: projectsRef,
      skills: skillsRef,
    };
    const targetRef = sectionRefs[sectionName];
    if (targetRef?.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetRef.current, offsetY: 0 },
        ease: "power2.inOut",
      });
      console.log(`📍 Scrolled to: ${sectionName}`);
    }
    setIsMobileMenuOpen(false);
  };

  // ===== RENDER LOGIC =====
  if (isLoading) {
    return (
      <LoadingScreen
        loadingProgress={loadingProgress}
        onLoadingComplete={handleLoadingComplete}
        displayText="Loading..."
      />
    );
  }

  return (
    <AppLayout
      isDarkMode={isDarkMode}
      isMobileMenuOpen={isMobileMenuOpen}
      onThemeToggle={toggleTheme}
      onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      onSectionScroll={scrollToSection}
      isLoading={isLoading}
    >
      <div ref={mainContentRef}>
        <HeroSection onSectionScroll={scrollToSection} homeRef={homeRef} />
        <AboutSection isDarkMode={isDarkMode} aboutRef={aboutRef} />
        <ExperienceSection
          experiences={experiences}
          isDarkMode={isDarkMode}
          experienceRef={experienceRef}
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
