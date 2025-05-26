import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContextDef";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Function to get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    try {
      // First, check localStorage for saved preference
      const savedTheme = localStorage.getItem("theme") as Theme;
      const validThemes: Theme[] = [
        "dark",
        "light",
        "vintage",
        "retro-pastel",
        "brutalism",
      ];

      if (savedTheme && validThemes.includes(savedTheme)) {
        return savedTheme;
      }

      // If no saved preference, check system preference
      if (typeof window !== "undefined" && window.matchMedia) {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
      }

      // Fallback to dark theme
      return "dark";
    } catch (error) {
      console.warn("Error reading theme preference from localStorage:", error);
      return "dark";
    }
  };

  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    // Apply theme to document and save to localStorage with error handling
    try {
      document.documentElement.setAttribute("data-theme", theme);
      // Also keep class for compatibility with existing code
      document.documentElement.classList.remove(
        "dark",
        "light",
        "vintage",
        "retro-pastel",
        "brutalism"
      );
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);

      // Optional: Dispatch custom event for other components to listen
      window.dispatchEvent(
        new CustomEvent("themeChanged", { detail: { theme } })
      );
    } catch (error) {
      console.warn("Error saving theme preference to localStorage:", error);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem("theme");
      if (!hasManualPreference) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prevTheme: Theme) => {
      const themeOrder: Theme[] = [
        "dark",
        "light",
        "vintage",
        "retro-pastel",
        "brutalism",
      ];
      const currentIndex = themeOrder.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      return themeOrder[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
