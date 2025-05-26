import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "vintage" | "retro-pastel" | "brutalism";

interface UserPreferences {
  theme: Theme;
  language?: string;
  animations?: boolean;
  notifications?: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  language: "en",
  animations: true,
  notifications: true,
};

const STORAGE_KEY = "portfolio-user-preferences";

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }

      // Check system preference for theme if no stored preference
      const systemPrefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      return {
        ...DEFAULT_PREFERENCES,
        theme: systemPrefersDark ? "dark" : "light",
      };
    } catch (error) {
      console.warn("Error loading user preferences:", error);
      return DEFAULT_PREFERENCES;
    }
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.warn("Error saving user preferences:", error);
    }
  }, [preferences]);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  const exportPreferences = () => {
    return JSON.stringify(preferences, null, 2);
  };

  const importPreferences = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      setPreferences({ ...DEFAULT_PREFERENCES, ...imported });
      return true;
    } catch (error) {
      console.error("Error importing preferences:", error);
      return false;
    }
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
    exportPreferences,
    importPreferences,
    // Convenience getters
    theme: preferences.theme,
    language: preferences.language,
    animations: preferences.animations,
    notifications: preferences.notifications,
  };
};
