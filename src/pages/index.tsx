import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio Data Types
 *
 * Define the structure for portfolio content
 * These interfaces ensure type safety and make it easy to update content
 */
interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  imageUrl: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

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

  // Locomotive Scroll instance
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  // ===== PORTFOLIO DATA =====

  /**
   * Work Experience Data
   * TODO: Update with your actual work experience
   * Each entry should include role, company, duration, description, and technologies used
   */
  const experiences: Experience[] = [
    {
      id: 1,
      title: "Senior Full Stack Developer", // TODO: Update with your actual title
      company: "Tech Innovations Inc.", // TODO: Update with your actual company
      duration: "2023 - Present", // TODO: Update with your actual duration
      description:
        "Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and improved system performance by 40%.", // TODO: Update with your actual responsibilities
      technologies: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"], // TODO: Update with technologies you actually used
    },
    {
      id: 2,
      title: "Frontend Developer", // TODO: Update
      company: "Digital Solutions Ltd.", // TODO: Update
      duration: "2021 - 2023", // TODO: Update
      description:
        "Built responsive user interfaces and improved user experience across multiple projects. Collaborated with design teams to implement pixel-perfect designs.", // TODO: Update
      technologies: ["React", "Vue.js", "Sass", "JavaScript", "Figma"], // TODO: Update
    },
    {
      id: 3,
      title: "Junior Web Developer", // TODO: Update
      company: "StartUp Hub", // TODO: Update
      duration: "2020 - 2021", // TODO: Update
      description:
        "Developed and maintained company websites using modern web technologies. Gained experience in full-stack development and agile methodologies.", // TODO: Update
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], // TODO: Update
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
      title: "E-Commerce Platform", // TODO: Update with your actual project
      description:
        "A full-featured e-commerce platform with user authentication, payment integration, and admin dashboard.", // TODO: Update
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"], // TODO: Update
      githubUrl: "https://github.com", // TODO: Update with your GitHub repo
      liveUrl: "https://demo.com", // TODO: Update with live demo URL
      videoUrl: "https://youtube.com", // TODO: Update with demo video
      imageUrl: "/lovable-uploads/c690029b-7e30-420e-a647-d3fc30978d90.png", // Using sample project image
    },
    {
      id: 2,
      title: "Task Management App", // TODO: Update
      description:
        "A collaborative task management application with real-time updates and team collaboration features.", // TODO: Update
      technologies: ["Vue.js", "Firebase", "Vuetify", "WebSockets"], // TODO: Update
      githubUrl: "https://github.com", // TODO: Update
      liveUrl: "https://demo.com", // TODO: Update
      imageUrl: "/lovable-uploads/c690029b-7e30-420e-a647-d3fc30978d90.png", // Using sample project image
    },
    {
      id: 3,
      title: "Weather Dashboard", // TODO: Update
      description:
        "A responsive weather dashboard with location-based forecasts and interactive charts.", // TODO: Update
      technologies: ["React", "D3.js", "OpenWeather API", "Tailwind"], // TODO: Update
      githubUrl: "https://github.com", // TODO: Update
      imageUrl: "/lovable-uploads/c690029b-7e30-420e-a647-d3fc30978d90.png", // Using sample project image
    },
    {
      id: 4,
      title: "Social Media Analytics", // TODO: Update
      description:
        "Analytics dashboard for social media metrics with real-time data visualization.", // TODO: Update
      technologies: ["Angular", "Chart.js", "Express", "PostgreSQL"], // TODO: Update
      githubUrl: "https://github.com", // TODO: Update
      liveUrl: "https://demo.com", // TODO: Update
      videoUrl: "https://youtube.com", // TODO: Update
      imageUrl: "/lovable-uploads/c690029b-7e30-420e-a647-d3fc30978d90.png", // Using sample project image
    },
  ];

  /**
   * Skills Data
   * TODO: Update with your actual skills
   * Organize by categories (Languages, Frontend, Backend, Database, etc.)
   */
  const skillCategories: SkillCategory[] = [
    {
      category: "Languages", // TODO: Update with your programming languages
      skills: [
        {
          name: "JavaScript",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        }, // Using sample icon
        {
          name: "TypeScript",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Python",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Java",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
      ],
    },
    {
      category: "Frontend", // TODO: Update with your frontend technologies
      skills: [
        {
          name: "React",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Vue.js",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Angular",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Tailwind",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
      ],
    },
    {
      category: "Backend", // TODO: Update with your backend technologies
      skills: [
        {
          name: "Node.js",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Express",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Django",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Flask",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
      ],
    },
    {
      category: "Database", // TODO: Update with your database technologies
      skills: [
        {
          name: "MongoDB",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "PostgreSQL",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "MySQL",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
        },
        {
          name: "Redis",
          icon: "/lovable-uploads/07df244b-2959-40c2-a608-2d9cb7327a7f.png",
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
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
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
  useEffect(() => {
    if (isLoading || !scrollContainerRef.current) return;

    const initLocomotiveScroll = () => {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollContainerRef.current!,
        smooth: true,
        multiplier: 1,
        class: "is-revealed",
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });

      // Update ScrollTrigger when Locomotive Scroll updates
      locomotiveScrollRef.current.on("scroll", ScrollTrigger.update);

      // Refresh ScrollTrigger and Locomotive Scroll after setup
      ScrollTrigger.refresh();
    };

    // Initialize after content is loaded
    setTimeout(initLocomotiveScroll, 500);

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, [isLoading]);

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
   * Smooth scroll to specific section using Locomotive Scroll
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
    if (targetRef?.current && locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(targetRef.current, {
        duration: 1500,
        easing: [0.25, 0.0, 0.35, 1.0],
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
        loadingGifUrl="/loading.gif" // TODO: Upload your loading.gif to public folder
        displayName="Anas Khan" // TODO: Update with your name
      />
    );
  }

  // ===== MAIN PORTFOLIO CONTENT =====

  return (
    <div ref={scrollContainerRef} data-scroll-container className="relative">
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
        <section
          ref={aboutRef}
          id="about"
          className="py-20 animate-section"
          data-scroll-section
        >
          <div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            data-scroll
            data-scroll-speed="0.5"
          >
            <h2
              className={`text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}
            >
              About Me
            </h2>
            <div
              className={`glass-card p-8 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                isDarkMode
                  ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                  : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
              } shadow-xl hover:shadow-2xl`}
            >
              <div
                className={`prose prose-lg max-w-none transition-colors duration-300 ${
                  isDarkMode ? "text-muted-foreground" : "text-slate-700"
                }`}
              >
                {/* TODO: Update with your actual bio */}
                <p className="text-lg leading-relaxed mb-6">
                  I'm a passionate full-stack developer with over 5 years of
                  experience building scalable web applications and
                  user-friendly interfaces. My journey in technology started
                  with a curiosity about how things work, which led me to
                  explore programming and eventually fall in love with creating
                  digital solutions.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  I specialize in modern web technologies including React,
                  Node.js, and cloud platforms. I believe in writing clean,
                  maintainable code and following best practices to deliver
                  high-quality products. I'm always eager to learn new
                  technologies and take on challenging projects that push my
                  limits.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new coffee
                  shops, hiking local trails, or contributing to open-source
                  projects. I'm passionate about mentoring aspiring developers
                  and giving back to the tech community that has taught me so
                  much.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          ref={experienceRef}
          id="experience"
          className="py-20 animate-section"
          data-scroll-section
        >
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            data-scroll
            data-scroll-speed="0.3"
          >
            <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="max-h-[600px] overflow-y-auto space-y-8 pr-4 custom-scrollbar experience-container">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`experience-card group relative glass-card p-6 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                    isDarkMode
                      ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                      : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
                  } shadow-lg hover:shadow-xl hover:shadow-purple-500/10`}
                  data-scroll
                  data-scroll-delay={index * 0.1}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-blue-400">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-light text-purple-300">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 w-fit">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          isDarkMode
                            ? "bg-secondary/50 text-foreground border-border"
                            : "bg-gray-200/50 text-gray-700 border-gray-300"
                        } border hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Click to view details indicator */}
                  <div className="text-center">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode
                          ? "text-muted-foreground group-hover:text-blue-400"
                          : "text-slate-600 group-hover:text-blue-600"
                      }`}
                    >
                      Click to view details
                    </span>
                  </div>

                  {/* Description overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-card/95 border-purple-400/40"
                        : "bg-white/95 border-purple-400/40"
                    } backdrop-blur-md border`}
                  >
                    <p
                      className={`text-center leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? "text-muted-foreground" : "text-slate-600"
                      }`}
                    >
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          id="projects"
          className="py-20 animate-section"
          data-scroll-section
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            data-scroll
            data-scroll-speed="0.4"
          >
            <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 projects-container">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group project-card glass-card rounded-xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${
                    isDarkMode
                      ? "bg-card/30 border-purple-500/20 hover:border-purple-400/40"
                      : "bg-white/50 border-purple-500/20 hover:border-purple-400/40"
                  } shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer`}
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
                  data-scroll
                  data-scroll-delay={index * 0.1}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isDarkMode
                          ? "bg-gradient-to-t from-background/80 to-transparent"
                          : "bg-gradient-to-t from-white/80 to-transparent"
                      } opacity-0 group-hover:opacity-100`}
                    ></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-4 text-blue-400">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 hover:border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500/30 hover:border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </Button>
                      )}
                      {project.videoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-500/30 hover:border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.videoUrl, "_blank");
                          }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>

                    {expandedProject === project.id && (
                      <div className="animate-fade-in">
                        <p
                          className={`mb-4 leading-relaxed transition-colors duration-300 ${
                            isDarkMode
                              ? "text-muted-foreground"
                              : "text-slate-600"
                          }`}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 transition-all duration-300 hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 text-center">
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          isDarkMode
                            ? "text-muted-foreground"
                            : "text-slate-600"
                        }`}
                      >
                        {expandedProject === project.id
                          ? "Click to collapse"
                          : "Click to expand"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={skillsRef}
          id="skills"
          className="py-20 animate-section"
          data-scroll-section
        >
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            data-scroll
            data-scroll-speed="0.2"
          >
            <h2 className="text-4xl font-light text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skills
            </h2>
            <div className="space-y-8 skills-container">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  data-scroll
                  data-scroll-delay={categoryIndex * 0.1}
                >
                  <h3 className="text-2xl font-light mb-6 text-center text-purple-400">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`skill-card flex items-center space-x-3 px-6 py-3 rounded-full glass-card backdrop-blur-md transition-all duration-300 hover:scale-110 group cursor-pointer ${
                          isDarkMode
                            ? "bg-card/30 border-purple-500/20 hover:border-purple-400/50"
                            : "bg-white/50 border-purple-500/20 hover:border-purple-400/50"
                        } shadow-lg hover:shadow-xl hover:shadow-purple-500/20`}
                      >
                        {/* Skill icon - supports both PNG and SVG */}
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <span
                          className={`font-medium transition-all duration-300 ${
                            isDarkMode
                              ? "text-foreground group-hover:text-blue-400"
                              : "text-slate-700 group-hover:text-blue-600"
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-16 border-t transition-all duration-300 ${
            isDarkMode
              ? "border-border bg-card/50"
              : "border-slate-200 bg-white/50"
          } animate-section`}
          data-scroll-section
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            data-scroll
            data-scroll-speed="0.1"
          >
            <div className="text-center">
              {/* Social Media Links with Sample Icons */}
              <div className="flex justify-center space-x-6 mb-8">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com" // TODO: Replace with your actual LinkedIn URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform duration-300 hover:scale-110"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                      isDarkMode
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                    }`}
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:your.email@example.com" // TODO: Replace with your actual email
                  className="group transition-transform duration-300 hover:scale-110"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                      isDarkMode
                        ? "bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
                        : "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500"
                    }`}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com" // TODO: Replace with your actual GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform duration-300 hover:scale-110"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                        : "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                    }`}
                  >
                    <Github className="w-6 h-6 text-white" />
                  </div>
                </a>
              </div>

              {/* Copyright */}
              <p
                className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-muted-foreground" : "text-slate-600"
                }`}
              >
                © 2025 Anas Khan. Crafted with ❤️ precision and passion.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
