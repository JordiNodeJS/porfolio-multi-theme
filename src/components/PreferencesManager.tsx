import React, { useState, useEffect, useRef } from "react";
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
  
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Cerrar el panel al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    // Agregar el manejador de eventos
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpiar el manejador de eventos al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Solo se vuelve a crear si cambia isOpen

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
    <div className={`relative z-50 ${className}`} ref={panelRef}>
      {/* Settings Button */}{" "}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-lg backdrop-blur-sm border transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800/70 border-slate-600 text-slate-200 hover:text-blue-400 hover:bg-slate-700/70"
            : theme === "light"
            ? "bg-white/70 border-gray-300 text-gray-700 hover:text-blue-600 hover:bg-gray-100/70"
            : theme === "vintage"
            ? "bg-amber-800/90 border-amber-600 text-white hover:text-white hover:bg-amber-700"
            : theme === "retro-pastel"
            ? "bg-pink-200/70 border-pink-300 text-pink-800 hover:text-pink-900 hover:bg-pink-300/70"
            : "bg-yellow-400 border-black border-2 text-black hover:text-black hover:bg-yellow-300"
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
            className={`fixed sm:absolute left-4 sm:left-auto right-4 sm:right-0 top-20 sm:top-full bottom-auto sm:translate-y-0 mt-0 sm:mt-2 w-auto sm:w-96 md:w-80 p-3 sm:p-4 rounded-lg backdrop-blur-sm border z-50 max-w-[calc(100vw-2rem)] ${
              theme === "dark"
                ? "bg-slate-800/90 border-slate-700/50"
                : theme === "light"
                ? "bg-white/90 border-gray-200/50"
                : theme === "vintage"
                ? "bg-amber-900/95 border-amber-700 border-2"
                : theme === "retro-pastel"
                ? "bg-pink-100/90 border-pink-200/50"
                : "bg-yellow-200 border-black border-2"
            }`}
          >
            {" "}
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              User Preferences
            </h3>
            {/* Theme Selection */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Theme
              </label>{" "}
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center gap-2 p-2 rounded border transition-all duration-200 text-xs sm:text-sm ${
                      theme === option.value
                        ? theme === "dark"
                          ? "border-blue-400 bg-blue-900/30 text-blue-300"
                          : theme === "light"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : theme === "vintage"
                          ? "border-amber-400 bg-amber-800/30 text-amber-200"
                          : theme === "retro-pastel"
                          ? "border-pink-400 bg-pink-200/50 text-pink-700"
                          : "border-yellow-600 bg-yellow-300 text-black"
                        : theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500 hover:text-white"
                        : theme === "light"
                        ? "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900"
                        : theme === "vintage"
                        ? "border-amber-700 text-amber-200 hover:bg-amber-600 hover:border-amber-400 hover:text-white"
                        : theme === "retro-pastel"
                        ? "border-pink-300 text-pink-700 hover:bg-pink-200/80 hover:border-pink-400 hover:text-pink-900"
                        : "border-black text-black hover:bg-yellow-300 hover:text-black"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${option.color}`}
                    />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>{" "}
            {/* Action Buttons */}{" "}
            <div className="flex sm:flex-row gap-2 mb-3 sm:mb-4">
              <button
                onClick={handleExport}
                className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm rounded transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : theme === "light"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : theme === "vintage"
                    ? "bg-amber-600 text-white hover:bg-amber-500 hover:text-white"
                    : theme === "retro-pastel"
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-black text-yellow-400 hover:bg-gray-800"
                }`}
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                Export
              </button>{" "}
              <button
                onClick={handleReset}
                className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm rounded transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : theme === "light"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : theme === "vintage"
                    ? "bg-red-700 text-white hover:bg-red-600 hover:text-white"
                    : theme === "retro-pastel"
                    ? "bg-red-400 text-white hover:bg-red-500"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                Reset
              </button>
            </div>{" "}
            {/* Import Section */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Import Preferences
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste preferences JSON here..."
                className={`w-full h-16 sm:h-20 p-2 text-xs sm:text-sm border rounded resize-none transition-colors ${
                  theme === "dark"
                    ? "bg-slate-700/50 border-slate-600 text-slate-200 placeholder-slate-400"
                    : theme === "light"
                    ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                    : theme === "vintage"
                    ? "bg-amber-800/60 border-amber-600 text-white placeholder-amber-200"
                    : theme === "retro-pastel"
                    ? "bg-pink-50 border-pink-300 text-pink-800 placeholder-pink-500"
                    : "bg-yellow-100 border-black text-black placeholder-gray-600"
                }`}
              />{" "}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleImport}
                  className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm rounded transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-green-600 text-white hover:bg-green-500"
                      : theme === "light"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : theme === "vintage"
                      ? "bg-green-700 text-white hover:bg-green-600 hover:text-white"
                      : theme === "retro-pastel"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                  Import
                </button>{" "}
                <button
                  onClick={() => setImportText("")}
                  className={`flex flex-1 items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm rounded transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-600 text-white hover:bg-gray-500"
                      : theme === "light"
                      ? "bg-gray-500 text-white hover:bg-gray-600"
                      : theme === "vintage"
                      ? "bg-gray-700 text-white hover:bg-gray-600 hover:text-white"
                      : theme === "retro-pastel"
                      ? "bg-gray-400 text-white hover:bg-gray-500"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  Clear
                </button>
              </div>
            </div>{" "}
            {/* Preferences Info */}
            <div className="text-xs opacity-75">
              <p className="mb-1">
                Preferences saved: {Object.keys(preferences).length} items
              </p>
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
            className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 p-3 rounded-lg flex items-center gap-2 z-50 text-xs sm:text-sm max-w-[calc(100%-2rem)] sm:max-w-sm mx-auto sm:mx-0 ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {" "}
            {message.type === "success" ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            )}
            <span className="break-words">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreferencesManager;
