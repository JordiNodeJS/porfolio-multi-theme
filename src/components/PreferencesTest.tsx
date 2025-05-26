import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useUserPreferences } from "../hooks/useUserPreferences";

const PreferencesTest: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreference, exportPreferences, resetPreferences } =
    useUserPreferences();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: string[] = [];

    try {
      // Test 1: Theme persistence
      results.push("🧪 Test 1: Theme persistence");
      const originalTheme = theme;
      setTheme("vintage");
      await new Promise((resolve) => setTimeout(resolve, 100));
      const storedTheme = localStorage.getItem("theme");
      results.push(
        storedTheme === "vintage"
          ? "✅ Theme saved to localStorage"
          : "❌ Theme not saved"
      );

      // Test 2: Preferences update
      results.push("🧪 Test 2: Preferences update");
      updatePreference("animations", false);
      const storedPrefs = JSON.parse(
        localStorage.getItem("portfolio-user-preferences") || "{}"
      );
      results.push(
        storedPrefs.animations === false
          ? "✅ Preferences updated"
          : "❌ Preferences not updated"
      );

      // Test 3: Export functionality
      results.push("🧪 Test 3: Export functionality");
      const exported = exportPreferences();
      const exportedObj = JSON.parse(exported);
      results.push(
        exportedObj.theme && exportedObj.language !== undefined
          ? "✅ Export works"
          : "❌ Export failed"
      );

      // Test 4: Reset functionality
      results.push("🧪 Test 4: Reset functionality");
      resetPreferences();
      await new Promise((resolve) => setTimeout(resolve, 100));
      const resetTheme = localStorage.getItem("theme");
      results.push(
        resetTheme === "dark" ? "✅ Reset works" : "❌ Reset failed"
      );

      // Restore original theme
      setTheme(originalTheme);
      results.push("✅ All tests completed!");
    } catch (error) {
      results.push(`❌ Test error: ${error}`);
    }

    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm z-50"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Preferences System Test
      </h3>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Current Theme: <span className="font-semibold">{theme}</span>
        </p>
        <p>
          Animations:{" "}
          <span className="font-semibold">
            {preferences.animations ? "On" : "Off"}
          </span>
        </p>
        <p>
          Language:{" "}
          <span className="font-semibold">{preferences.language}</span>
        </p>
      </div>

      <button
        onClick={runTests}
        disabled={isRunning}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mb-2 transition-colors"
      >
        {isRunning ? "Running Tests..." : "Run Tests"}
      </button>

      {testResults.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs max-h-32 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="mb-1 text-gray-800 dark:text-gray-200">
              {result}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PreferencesTest;
