import { useEffect, useState } from "react";

/**
 * Custom hook for theme (dark/light mode) management.
 * Initializes theme from localStorage or system preference,
 * and applies the theme to the document.
 */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDarkMode);
    document.documentElement.classList.toggle("dark", shouldUseDarkMode);
  }, []);

  return { isDarkMode, setIsDarkMode };
}
