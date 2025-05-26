import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Download, Upload, RotateCcw, Check, X } from "lucide-react";
import { useUserPreferences } from "../hooks/useUserPreferences";
import { useTheme } from "../hooks/useTheme";

interface PreferencesManagerProps {
  className?: string;
}

const PreferencesManager: React.FC<PreferencesManagerProps> = ({
  className,
}) => {
  const {
    preferences,
    resetPreferences,
    exportPreferences,
    importPreferences,
  } = useUserPreferences();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExport = () => {
    const data = exportPreferences();
    navigator.clipboard
      .writeText(data)
      .then(() => {
        showMessage("success", "Preferences copied to clipboard!");
      })
      .catch(() => {
        // Fallback: create download link
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "portfolio-preferences.json";
        a.click();
        URL.revokeObjectURL(url);
        showMessage("success", "Preferences downloaded!");
      });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      showMessage("error", "Please enter preferences data");
      return;
    }

    const success = importPreferences(importText);
    if (success) {
      showMessage("success", "Preferences imported successfully!");
      setImportText("");
      setIsOpen(false);
    } else {
      showMessage("error", "Invalid preferences format");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all preferences?")) {
      resetPreferences();
      showMessage("success", "Preferences reset to defaults");
    }
  };

  const themeOptions: Array<{
    value: typeof theme;
    label: string;
    color: string;
  }> = [
    { value: "dark", label: "Dark", color: "bg-slate-800" },
    {
      value: "light",
      label: "Light",
      color: "bg-white border border-gray-300",
    },
    { value: "vintage", label: "Vintage", color: "bg-amber-800" },
    { value: "retro-pastel", label: "Retro Pastel", color: "bg-pink-300" },
    { value: "brutalism", label: "Brutalism", color: "bg-yellow-400" },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-lg backdrop-blur-sm border transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:text-blue-500"
            : theme === "light"
            ? "bg-white/50 border-gray-200/50 text-gray-700 hover:text-blue-500"
            : theme === "vintage"
            ? "bg-amber-800/50 border-amber-900/50 text-amber-100 hover:text-amber-300"
            : theme === "retro-pastel"
            ? "bg-pink-200/50 border-pink-300/50 text-pink-800 hover:text-pink-600"
            : "bg-yellow-400 border-black border-2 text-black hover:bg-yellow-300"
        }`}
        aria-label="Preferences"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Preferences Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className={`absolute top-full right-0 mt-2 w-80 p-4 rounded-lg backdrop-blur-sm border z-50 ${
              theme === "dark"
                ? "bg-slate-800/90 border-slate-700/50"
                : theme === "light"
                ? "bg-white/90 border-gray-200/50"
                : theme === "vintage"
                ? "bg-amber-900/90 border-amber-800/50"
                : theme === "retro-pastel"
                ? "bg-pink-100/90 border-pink-200/50"
                : "bg-yellow-200 border-black border-2"
            }`}
          >
            <h3 className="font-bold mb-4">User Preferences</h3>

            {/* Theme Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                      theme === option.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded ${option.color}`} />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleExport}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Import Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Import Preferences
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste preferences JSON here..."
                className="w-full h-20 p-2 text-sm border rounded resize-none bg-transparent"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleImport}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>
                <button
                  onClick={() => setImportText("")}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>

            {/* Preferences Info */}
            <div className="text-xs opacity-75">
              <p>Preferences saved: {Object.keys(preferences).length} items</p>
              <p>Storage: localStorage</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-3 rounded-lg flex items-center gap-2 z-50 ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreferencesManager;
