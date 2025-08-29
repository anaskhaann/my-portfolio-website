import React from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  /**
   * Current theme mode (dark/light)
   */
  isDarkMode: boolean;
  /**
   * Mobile menu open state
   */
  isMobileMenuOpen: boolean;
  /**
   * Function to toggle theme
   */
  onThemeToggle: () => void;
  /**
   * Function to toggle mobile menu
   */
  onMobileMenuToggle: () => void;
  /**
   * Function to scroll to specific section
   */
  onSectionScroll: (sectionName: string) => void;
}

/**
 * Navigation Component
 *
 * Renders the main navigation bar with:
 * - Logo/brand name
 * - Desktop navigation links
 * - Mobile hamburger menu
 * - Theme toggle button
 * - Resume download button
 *
 * Responsive design with mobile-first approach.
 */
const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  isMobileMenuOpen,
  onThemeToggle,
  onMobileMenuToggle,
  onSectionScroll,
}) => {
  // Navigation menu items configuration
  const navigationItems = [
    { name: "About", section: "about" },
    { name: "Experience", section: "history" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
  ];

  /**
   * Handle navigation item click
   * Scrolls to section and closes mobile menu
   */
  const handleNavClick = (section: string) => {
    onSectionScroll(section);
    // Close mobile menu after navigation (for mobile UX)
    if (isMobileMenuOpen) {
      onMobileMenuToggle();
    }
  };

  /**
   * Handle resume download
   * Opens resume in new tab
   */
  const handleResumeDownload = () => {
    window.open(
      "https://drive.google.com/file/d/16DDCrdMmQA3U8AIzFOGsYKLTJu3fFprc/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <button
            type="button"
            onClick={() => onSectionScroll("home")}
            className="text-3xl font-black tracking-wide text-foreground transition-colors duration-300 cursor-pointer focus:outline-none"
            aria-label="Scroll to home section"
          >
            /A\
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 font-medium">
            {/* Navigation Links */}
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.section)}
                className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.name}
                {/* Animated underline effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground/40 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Resume Download Button */}
            <Button
              size="sm"
              className="bg-foreground text-background hover:opacity-90 border-0 shadow-lg shadow-black/10 dark:shadow-white/10 transition-all duration-300"
              onClick={handleResumeDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>

            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full bg-secondary hover:bg-muted border border-border transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full bg-secondary hover:bg-muted border border-border transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onMobileMenuToggle}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-2 font-medium">
              {/* Mobile Navigation Links */}
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.section)}
                  className="text-left py-1 text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile Resume Button */}
              <Button
                size="sm"
                className="w-fit bg-foreground text-background hover:opacity-90"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
