import React, { useState, useEffect, useRef } from "react";
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
import { ScrollTrigger } from "gsap/ScrollTrigger"; // LocomotiveScroll and its CSS removed
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Portfolio Data Types
 *
 * Define the structure for portfolio content
 * These interfaces ensure type safety and make it easy to update content
 */
import type { Experience, Project, Skill, SkillCategory } from "@/types";

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
 * - Locomotive Scroll for smooth scrolling
 * - Animated cursor follower effect
 */
const Portfolio = () => {
  // ===== STATE MANAGEMENT =====

  /**
   * Theme and UI State
   */
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Loading State
   * Controls the loading screen visibility and progress
   */
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  /**
   * Project Interaction State
   */
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // ===== REFS FOR DOM ELEMENTS =====

  /**
   * Section refs for smooth scrolling navigation
   * Used to programmatically scroll to different sections
   */
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Locomotive Scroll removed

  // ===== PORTFOLIO DATA =====

  /**
   * Work Experience Data
   * TODO: Update with your actual work experience
   * Each entry should include role, company, duration, description, and technologies used
   */
  const experiences: Experience[] = [
    {
      id: 1,
      title: " Front End Developer Intern", // Update with your actual title
      company: " Farsoft Infotech Pvt. Ltd.", // Update with your actual company
      duration: "Dec 2023 - March 2024", // Update with your actual duration
      description:
        "Developed responsive websites using HTML, CSS, and JavaScript, boosting mobile engagement by 15%. Customized and launched 5+ sites while maintaining brand consistency and cross-browser compatibility. Collaborated with cross-functional teams to enhance performance and resolve technical issues.", // Update with your actual description
      technologies: ["HTML", "CSS", "Javascript", "Bootstrap"], // Update with technologies you actually used
    },
    {
      id: 2,
      title: " Machine Learning & Data Science Intern",
      company: " PHNTechnology Pvt. Ltd.",
      duration: "April 2023 - June 2023",
      description:
        "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
      technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
    },
    {
      id: 3,
      title: "Test experience for website checking 1",
      company: " PHNTechnology Pvt. Ltd.",
      duration: "April 2023 - June 2023",
      description:
        "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
      technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
    },
    {
      id: 4,
      title: "Test experience for website checking 2",
      company: " PHNTechnology Pvt. Ltd.",
      duration: "April 2023 - June 2023",
      description:
        "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
      technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
    },
    {
      id: 5,
      title: "Test experience for website checking 3",
      company: " PHNTechnology Pvt. Ltd.",
      duration: "April 2023 - June 2023",
      description:
        "Gained hands-on experience in predictive modeling and data analysis through mentorship and project work. Contributed to building and validating a machine learning model using trading data. Created visualizations with Pandas and Matplotlib to support performance review and identify trading pattern improvements.",
      technologies: ["Python", "Numpy", "Pandas", "Matplotlib"],
    },
  ];

  /**
   * Projects Data
   * TODO: Replace with your actual projects
   * Include title, description, technologies, and links (GitHub, live demo, video)
   */
  const projects: Project[] = [
    {
      id: 1,
      title: "Chat with Database", // TODO: Update with your actual project
      description:
        "Developed an AI tool enabling natural language SQL queries using LangChain, Streamlit, and Meta's LLaMA, allowing non-technical users to interact with MySQL and SQLite databases. Improved performance with caching and fine-tuned model parameters, reducing response times by 15-20% and enhancing query accuracy.", // TODO: Update
      technologies: ["Python", "Langchain", "Streamlit", "LLama", "MySQL"], // TODO: Update
      githubUrl: "https://github.com/anaskhaann/Chat-with-Database-SQL", // TODO: Update with your GitHub repo
      // liveUrl: "https://demo.com", // TODO: Update with live demo URL if exists
      videoUrl:
        "https://drive.google.com/file/d/1_zDUrBSChOOdiV0xt4BLuEMJCrTBH9nL/view?usp=sharing", // TODO: Update with demo video if exists
      imageUrl: "/assets/projects/sample.png", // Use as background image for a project
    },
    {
      id: 2,
      title: "Gesture Based Presentation Controller",
      description:
        "Developed a Gesture-Based Presentation system using Python, OpenCV, and MediaPipe,enabling touch-free slide navigation and annotation for intuitive presentation experience.Achieved 85% hand detection accuracy and 90% gesture recognition accuracy, with optimized slide transition under 0.5s, ensuring fast and reliable real-time control",
      technologies: ["Python", "MediaPipe", "OpenCV", "Numpy"],
      githubUrl: "https://github.com/anaskhaann/Gesture-Based-Presentation",
      imageUrl: "/assets/projects/sample.png",
    },
    {
      id: 3,
      title: "Full Stack Web App",
      description:
        "Developed a Pinterest clone with Express.js and MongoDB, focusing on core social media features like board management, saving and deleting pins, and personalized feeds. Implemented file uploads with Multer, and used Mongoose for database interaction to streamline development.",
      technologies: ["Javascript", "CSS", "Express.Js", "HTML"],
      githubUrl: "https://github.com/anaskhaann/Pinterest-Clone",
      imageUrl: "/assets/projects/sample.png",
    },
    {
      id: 4,
      title: "Web Automation With Selenium",
      description:
        "This Project Is Based On My Repo Named Daily Life Journal. This is Made to Automate its Printing Task and Create a Book.Automate webpage-to-PDF conversion with ease! Perfect for batch downloading and archiving web content.",
      technologies: ["Python", "Selenium"],
      liveUrl: "www.google.com",
      videoUrl: "www.youtube.com",
      githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
      imageUrl: "/assets/projects/sample.png",
    },
    {
      id: 5,
      title: "Test project for website checking 1",
      description:
        "This Project Is Based On My Repo Named Daily Life Journal. This is Made to Automate its Printing Task and Create a Book.Automate webpage-to-PDF conversion with ease! Perfect for batch downloading and archiving web content.",
      technologies: ["Python", "Selenium"],
      githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
      imageUrl: "/assets/projects/sample.png",
    },
    {
      id: 6,
      title: "Test project for website checking 2",
      description:
        "This Project Is Based On My Repo Named Daily Life Journal. This is Made to Automate its Printing Task and Create a Book.Automate webpage-to-PDF conversion with ease! Perfect for batch downloading and archiving web content.",
      technologies: ["Python", "Selenium"],
      githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
      imageUrl: "/assets/projects/sample.png",
    },
    {
      id: 7,
      title: "Test project for website checking 3",
      description:
        "This Project Is Based On My Repo Named Daily Life Journal. This is Made to Automate its Printing Task and Create a Book.Automate webpage-to-PDF conversion with ease! Perfect for batch downloading and archiving web content.",
      technologies: ["Python", "Selenium"],
      githubUrl: "https://github.com/anaskhaann/Web-Automation-With-Selenium",
      liveUrl: "www.google.com",
      videoUrl: "www.youtube.com",
      imageUrl: "/assets/projects/sample.png",
    },
  ];

  /**
   * Skills Data
   * Organize by categories (Languages, Frontend, Backend, Database, etc.)
   */
  const skillCategories: SkillCategory[] = [
    {
      category: "Languages",
      skills: [
        {
          name: "Python",
          icon: "/assets/skills/python.svg",
        },
        {
          name: "JavaScript",
          icon: "/assets/skills/js.svg",
        },
        {
          name: "HTML",
          icon: "/assets/skills/html.svg",
        },
        {
          name: "CSS",
          icon: "/assets/skills/css.svg",
        },
        {
          name: "Bash/Script",
          icon: "/assets/skills/bash.svg",
        },
      ],
    },
    {
      category: "Framworks",
      skills: [
        {
          name: "Git",
          icon: "/assets/skills/git.svg",
        },
        {
          name: "Flask",
          icon: "/assets/skills/flask.svg",
        },
        {
          name: "Jupyter",
          icon: "/assets/skills/jupyter.svg",
        },
        {
          name: "Numpy",
          icon: "/assets/skills/numpy.svg",
        },
        {
          name: "Pandas",
          icon: "/assets/skills/pandas.svg",
        },
        {
          name: "Matplotlib",
          icon: "/assets/skills/matplotlib.svg",
        },
      ],
    },
    {
      category: "Database",
      skills: [
        {
          name: "MySQL",
          icon: "/assets/skills/mysql.svg",
        },
        {
          name: "SQlite",
          icon: "/assets/skills/sqlite.svg",
        },
        {
          name: "MongoDB",
          icon: "/assets/skills/mongodb.svg",
        },
      ],
    },
    {
      category: "Others",
      skills: [
        {
          name: "Vs Code",
          icon: "/assets/skills/vscode.svg",
        },
        {
          name: "Linux",
          icon: "/assets/skills/linux.svg",
        },
        {
          name: "GitHub",
          icon: "/assets/skills/github.svg",
        },
        {
          name: "Docker",
          icon: "/assets/skills/docker.svg",
        },
        {
          name: "UV",
          icon: "/assets/skills/uv.svg",
        },
        {
          name: "Anaconda",
          icon: "/assets/skills/anaconda.svg",
        },
      ],
    },
  ];

  // ===== LOADING ANIMATION EFFECT =====

  /**
   * Initialize loading sequence
   *
   * This effect:
   * 1. Starts the loading progress animation
   * 2. Simulates loading time (2.5 seconds)
   * 3. Updates progress state
   * 4. Triggers completion when done
   */
  useEffect(() => {
    console.log("🚀 Starting loading sequence...");

    // Simulate loading progress over 2.5 seconds
    const progressInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 4; // Increment by 4% each time

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        return newProgress;
      });
    }, 100); // Update every 100ms for smooth animation

    // Cleanup interval on component unmount
    return () => {
      clearInterval(progressInterval);
      ScrollTrigger.killAll();
    };
  }, []);

  /**
   * Initialize theme from localStorage or system preference
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDarkMode =
      savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDarkMode);

    // Apply theme to document
    document.documentElement.classList.toggle("dark", shouldUseDarkMode);
  }, []);

  /**
   * Initialize animated cursor follower effect
   */
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth follow animation for main cursor
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      });

      // Instant follow for dot
      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
      });

      requestAnimationFrame(animateCursor);
    };

    // Add hover effects for interactive elements
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

    // Add hover effects to interactive elements
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
  }, [isLoading]);

  /**
   * Initialize Locomotive Scroll and GSAP ScrollTrigger integration
   */
  // Locomotive Scroll removed. No custom scroll initialization needed.
  // If you want to add smooth scrolling in the future, you can use CSS or another JS solution.

  /**
   * Handle loading completion
   *
   * Called when loading screen finishes its exit animation
   * Ensures main content is visible and initializes page animations
   */
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

  /**
   * Initialize page animations with proper theme-aware colors
   *
   * Sets up GSAP animations for:
   * - Hero section elements
   * - Scroll-triggered section animations
   * - Smooth transitions between elements
   */
  const initializeAnimations = () => {
    console.log("🎨 Initializing page animations...");

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

    console.log("✨ Page animations initialized successfully");
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
    <div className="relative"> // scrollContainerRef and data-scroll-container removed
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
        <HeroSection onSectionScroll={scrollToSection} />

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
