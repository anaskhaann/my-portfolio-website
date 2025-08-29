import React from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  /** Indicates whether dark mode is currently active. */
  isDarkMode: boolean;
  /** Controls the visibility of the mobile navigation menu. */
  isMobileMenuOpen: boolean;
  /** A function to toggle the color theme between light and dark mode. */
  onThemeToggle: () => void;
  /** A function to toggle the visibility of the mobile navigation menu. */
  onMobileMenuToggle: () => void;
  /** A function to handle scrolling to a specific section of the page. */
  onSectionScroll: (sectionName: string) => void;
}

/**
 * The main navigation component for the website.
 * It provides links to different sections, a theme toggle, and a resume download button.
 * It is responsive and adapts to different screen sizes.
 *
 * @param {NavigationProps} props - The props for the component.
 */
const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  isMobileMenuOpen,
  onThemeToggle,
  onMobileMenuToggle,
  onSectionScroll,
}) => {
  // Defines the navigation links and their corresponding section IDs.
  const navigationItems = [
    { name: "About", section: "about" },
    { name: "Experience", section: "history" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
  ];

  /**
   * Handles clicks on navigation links.
   * It scrolls to the selected section and closes the mobile menu if it's open.
   * @param {string} section - The ID of the section to scroll to.
   */
  const handleNavClick = (section: string) => {
    onSectionScroll(section);
    // Close the mobile menu after a navigation link is clicked.
    if (isMobileMenuOpen) {
      onMobileMenuToggle();
    }
  };

  /**
   * Opens the user's resume in a new browser tab.
   */
  const handleResumeDownload = () => {
    window.open(
      "https://drive.google.com/file/d/16DDCrdMmQA3U8AIzFOGsYKLTJu3fFprc/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand Name - Scrolls to the top of the page on click. */}
          <button
            type="button"
            onClick={() => onSectionScroll("home")}
            className="cursor-pointer text-3xl font-black tracking-wide text-foreground transition-colors duration-300 focus:outline-none"
            aria-label="Scroll to home section"
          >
            /A\
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-6 font-medium md:flex">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.section)}
                className="group relative text-foreground/80 transition-colors duration-300 hover:text-foreground"
              >
                {item.name}
                {/* Underline animation on hover. */}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground/40 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Resume Download Button for Desktop */}
            <Button
              size="sm"
              className="border-0 bg-foreground text-background shadow-lg shadow-black/10 transition-all duration-300 hover:opacity-90 dark:shadow-white/10"
              onClick={handleResumeDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>

            {/* Theme Toggle Button for Desktop */}
            <button
              onClick={onThemeToggle}
              className="rounded-full border border-border bg-secondary p-2 transition-all duration-300 hover:bg-muted"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={onThemeToggle}
              className="rounded-full border border-border bg-secondary p-2 transition-all duration-300 hover:bg-muted"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={onMobileMenuToggle}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background/95 py-4 backdrop-blur-md md:hidden">
            <div className="flex flex-col space-y-2 font-medium">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.section)}
                  className="py-1 text-left text-foreground/80 transition-colors duration-300 hover:text-foreground"
                >
                  {item.name}
                </button>
              ))}

              {/* Resume Download Button for Mobile */}
              <Button
                size="sm"
                className="w-fit bg-foreground text-background hover:opacity-90"
                onClick={handleResumeDownload}
              >
                <Download className="mr-2 h-4 w-4" />
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
