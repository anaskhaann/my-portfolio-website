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

  useCursorFollower(cursorRef, cursorDotRef, isLoading);

  return (
    <div className="relative">
      <div
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
          onThemeToggle={onThemeToggle}
          onMobileMenuToggle={onMobileMenuToggle}
          onSectionScroll={onSectionScroll}
        />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <FooterSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default AppLayout;
