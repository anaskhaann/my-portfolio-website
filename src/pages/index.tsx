import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Play,
  Linkedin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import { useTheme } from "@/hooks/useTheme";
import { useLoading } from "@/hooks/useLoading";
import { useCursorFollower } from "@/hooks/useCursorFollower";
import { usePortfolioAnimations } from "@/hooks/usePortfolioAnimations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import type { Experience, Project, Skill, SkillCategory } from "@/types";
import { experiences, projects, skillCategories } from "@/data/portfolioData";

/**
 * Main Portfolio Component
 *
 * This is the main component that orchestrates the entire portfolio website.
 * It handles:
 * - Loading state and animations
 * - Theme management (Dark/Light mode)
 * - Navigation between sections
 * - Responsive design
 * - GSAP animations for smooth user experience
 * - Animated cursor follower effect
 */
const Portfolio = () => {
  // ===== STATE MANAGEMENT =====

  /**
   * Theme and UI State
   */
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } =
    useLoading();

  /**
   * Project Interaction State
   */
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // ===== REFS FOR DOM ELEMENTS =====

  /**
   * Section refs for smooth scrolling navigation
   * Used to programmatically scroll to different sections
   */
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Locomotive Scroll removed
  useCursorFollower(cursorRef, cursorDotRef, isLoading);


  // ===== LOADING ANIMATION EFFECT =====

  /**
  GSAP ScrollTrigger integration
   */
  // Locomotive Scroll removed. No custom scroll initialization needed.
  // If you want to add smooth scrolling in the future, you can use CSS or another JS solution.

  /**
   * Handle loading completion
   *
   * Called when loading screen finishes its exit animation
   * Ensures main content is visible and initializes page animations
   */
  const { initializeAnimations } = usePortfolioAnimations();
  const handleLoadingComplete = () => {
    console.log("✅ Loading complete - initializing page...");

    // Ensure main content is visible
    setIsLoading(false);

    // Make sure content is visible immediately
    if (mainContentRef.current) {
      mainContentRef.current.style.opacity = "1";
      mainContentRef.current.style.visibility = "visible";
      mainContentRef.current.style.display = "block";
    }

    // Initialize page animations after a short delay
    setTimeout(() => {
      initializeAnimations();
    }, 100);
  };

  // ===== THEME MANAGEMENT =====

  /**
   * Toggle between dark and light themes
   *
   * Updates state and saves preference to localStorage
   * Also toggles the 'dark' class on document element
   */
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Update document class for theme switching
    document.documentElement.classList.toggle("dark", newTheme);

    // Save theme preference
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    console.log(`🎨 Theme switched to: ${newTheme ? "dark" : "light"}`);
  };

  // ===== NAVIGATION FUNCTIONS =====

  /**
   * Smooth scroll to specific section using native smooth scrolling
   *
   * @param sectionName - Name of the section to scroll to
   */
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
        duration: 1.2, // Smooth, modern scroll duration
        scrollTo: { y: targetRef.current, offsetY: 0 },
        ease: "power2.inOut", // Smooth, modern easing
      });
      console.log(`📍 Scrolled to: ${sectionName}`);
    }

    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // ===== RENDER LOADING SCREEN =====

  /**
   * Show loading screen while page is loading
   * Supports both GIF animation and text fallback
   */
  if (isLoading) {
    return (
      <LoadingScreen
        loadingProgress={loadingProgress}
        onLoadingComplete={handleLoadingComplete}
        displayText="Loading..." // TODO: Update with your text
      />
    );
  }

  // ===== MAIN PORTFOLIO CONTENT =====

  return (
    <div className="relative">
      {" "}
      // scrollContainerRef and data-scroll-container removed
      <div
        ref={mainContentRef}
        className={`min-h-screen transition-all duration-500 ease-out ${
          isDarkMode
            ? "bg-background text-foreground"
            : "bg-slate-50 text-slate-900"
        }`}
        style={{
          opacity: 1,
          visibility: "visible",
          display: "block",
        }}
      >
        {/* Animated Custom Cursor */}
        <div
          ref={cursorRef}
          className={`fixed w-10 h-10 pointer-events-none z-50 mix-blend-difference rounded-full border-2 transition-colors duration-300 ${
            isDarkMode ? "border-primary" : "border-slate-900"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          ref={cursorDotRef}
          className={`fixed w-2 h-2 pointer-events-none z-50 rounded-full transition-colors duration-300 ${
            isDarkMode ? "bg-primary" : "bg-slate-900"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Background Effects with Theme Support */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isDarkMode
                ? "bg-gradient-to-br from-background via-purple-900/10 to-background"
                : "bg-gradient-to-br from-slate-50 via-blue-100/30 to-slate-50"
            }`}
          />
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
              isDarkMode ? "bg-purple-500/20" : "bg-purple-400/20"
            }`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
              isDarkMode ? "bg-blue-500/20" : "bg-blue-400/20"
            }`}
          />
        </div>

        {/* Navigation */}
        <Navigation
          isDarkMode={isDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          onThemeToggle={toggleTheme}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSectionScroll={scrollToSection}
        />

        {/* Hero Section */}
        <HeroSection onSectionScroll={scrollToSection} homeRef={homeRef} />

        {/* About Section */}
        <AboutSection isDarkMode={isDarkMode} aboutRef={aboutRef} />

        {/* Experience Section */}
        <ExperienceSection
          experiences={experiences}
          isDarkMode={isDarkMode}
          experienceRef={experienceRef}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={projects}
          isDarkMode={isDarkMode}
          expandedProject={expandedProject}
          setExpandedProject={setExpandedProject}
          projectsRef={projectsRef}
        />

        {/* Skills Section */}
        <SkillsSection
          skillCategories={skillCategories}
          isDarkMode={isDarkMode}
          skillsRef={skillsRef}
        />

        {/* Footer */}
        <FooterSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Portfolio;
