import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "vintage" | "retro-pastel" | "brutalism";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
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
  // Function to get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    try {
      // First, check localStorage for saved preference
      const savedTheme = localStorage.getItem("theme") as Theme;
      const validThemes: Theme[] = ["dark", "light", "vintage", "retro-pastel", "brutalism"];
      
      if (savedTheme && validThemes.includes(savedTheme)) {
        return savedTheme;
      }

      // If no saved preference, check system preference
      if (typeof window !== "undefined" && window.matchMedia) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
      }

      // Fallback to dark theme
      return "dark";
    } catch (error) {
      console.warn("Error reading theme preference from localStorage:", error);
      return "dark";
    }
  };
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  
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
    } catch (error) {
      console.warn("Error saving theme preference to localStorage:", error);
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => {
      if (prevTheme === "dark") return "light";
      if (prevTheme === "light") return "vintage";
      if (prevTheme === "vintage") return "retro-pastel";
      if (prevTheme === "retro-pastel") return "brutalism";
      return "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
