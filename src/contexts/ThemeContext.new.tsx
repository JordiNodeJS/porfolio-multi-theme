import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useUserPreferences } from "../hooks/useUserPreferences";

type Theme = "dark" | "light" | "vintage" | "retro-pastel" | "brutalism";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, updatePreference } = useUserPreferences();

  // Apply theme to document whenever it changes
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.remove(
        "dark",
        "light",
        "vintage",
        "retro-pastel",
        "brutalism"
      );
      document.documentElement.classList.add(theme);
    } catch (error) {
      console.warn("Error applying theme to document:", error);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    updatePreference("theme", newTheme);
  };

  const toggleTheme = () => {
    const themeOrder: Theme[] = [
      "dark",
      "light",
      "vintage",
      "retro-pastel",
      "brutalism",
    ];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
