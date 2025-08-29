import React, { useRef } from "react";
import Navigation from "@/components/layout/Navigation";
import FooterSection from "@/components/sections/FooterSection";
import { useCursorFollower } from "@/hooks/useCursorFollower";

interface AppLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  onThemeToggle: () => void;
  onMobileMenuToggle: () => void;
  onSectionScroll: (sectionName: string) => void;
  isLoading: boolean;
}

/**
 * The main layout component for the application.
 * It includes the navigation, footer, and a custom cursor effect.
 *
 * @param {AppLayoutProps} props - The props for the component.
 */
const AppLayout = ({
  children,
  isDarkMode,
  isMobileMenuOpen,
  onThemeToggle,
  onMobileMenuToggle,
  onSectionScroll,
  isLoading,
}: AppLayoutProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Activates the custom cursor follower effect.
  useCursorFollower(cursorRef, cursorDotRef, isLoading);

  return (
    <div className="relative">
      <div
        className={`min-h-screen bg-background text-foreground transition-all duration-500 ease-out`}
        style={{
          opacity: 1,
          visibility: "visible",
          display: "block",
        }}
      >
        {/* Custom animated cursor elements. */}
        <div
          ref={cursorRef}
          className={`fixed h-10 w-10 pointer-events-none z-50 mix-blend-difference rounded-full border-2 transition-colors duration-300 ${
            isDarkMode ? "border-primary" : "border-slate-900"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          ref={cursorDotRef}
          className={`fixed h-2 w-2 pointer-events-none z-50 rounded-full transition-colors duration-300 ${
            isDarkMode ? "bg-primary" : "bg-slate-900"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Decorative background elements with theme-aware styling. */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className={`absolute inset-0 bg-background transition-all duration-500`}
          />
          <div
            className={`absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-muted/60 blur-3xl transition-all duration-500`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-muted/60 blur-3xl transition-all duration-500`}
          />
        </div>

        {/* Top navigation bar. */}
        <Navigation
          isDarkMode={isDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          onThemeToggle={onThemeToggle}
          onMobileMenuToggle={onMobileMenuToggle}
          onSectionScroll={onSectionScroll}
        />

        {/* Main content area where page content is rendered. */}
        <main>{children}</main>

        {/* Footer section. */}
        <FooterSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default AppLayout;
