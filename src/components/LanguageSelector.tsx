import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸", shortCode: "ES" },
  { code: "en", name: "English", flag: "🇺🇸", shortCode: "US" },
  { code: "fr", name: "Français", flag: "🇫🇷", shortCode: "FR" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", shortCode: "DE" },
  { code: "it", name: "Italiano", flag: "🇮🇹", shortCode: "IT" },
  { code: "pt", name: "Português", flag: "🇵🇹", shortCode: "PT" },
  { code: "ca", name: "Català", flag: "🇪🇸", shortCode: "ES" },
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors border h-10
          ${
            theme === "retro-pastel"
              ? "bg-retroPastel-pink/20 hover:bg-retroPastel-pink/30 border-retroPastel-pink/30 hover:border-retroPastel-pink/50 text-retroPastel-text"
              : theme === "vintage"
              ? "bg-[#6e4c30]/20 hover:bg-[#6e4c30]/30 border-[#a78a21]/30 hover:border-[#a78a21]/50 text-[#f3ebd3]"
              : theme === "brutalism"
              ? "bg-white border-4 border-black shadow-[0_4px_0_black] text-black"
              : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white"
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t("language.select")}
      >
        <div className="flex items-center w-full">
          <Globe
            className={`w-4 h-4 flex-shrink-0 ${
              theme === "retro-pastel"
                ? "text-retroPastel-text"
                : theme === "vintage"
                ? "text-[#f3ebd3]"
                : theme === "brutalism"
                ? "text-black"
                : "text-white"
            }`}
          />
          <span className="w-6 text-xs text-center font-medium opacity-80">
            {currentLanguage.shortCode}
          </span>
          <span
            className={`text-sm hidden sm:block leading-none ${
              theme === "retro-pastel"
                ? "text-retroPastel-text"
                : theme === "vintage"
                ? "text-[#f3ebd3]"
                : theme === "brutalism"
                ? "text-black"
                : "text-white"
            }`}
          >
            {currentLanguage.name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={`w-4 h-4 ${
              theme === "brutalism" ? "text-black" : "text-white"
            }`}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full right-0 mt-2 w-48 rounded-lg overflow-hidden z-50 py-1 ${
                theme === "brutalism"
                  ? "bg-white border-4 border-black shadow-[0_4px_0_black]"
                  : theme === "retro-pastel"
                  ? "backdrop-blur-md rounded-lg shadow-xl bg-retroPastel-background/95 border border-retroPastel-pink/30"
                  : theme === "vintage"
                  ? "bg-[#6e4c30]/95 border-[#a78a21]/50 text-[#f3ebd3] backdrop-blur-md shadow-xl"
                  : "backdrop-blur-md shadow-xl bg-white/95 border border-gray-200 dark:bg-slate-900/95 dark:border-white/20"
              }`}
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    theme === "brutalism"
                      ? "text-black hover:bg-black/10"
                      : theme === "retro-pastel"
                      ? i18n.language === language.code
                        ? "bg-retroPastel-pink/30 text-retroPastel-text"
                        : "text-retroPastel-text hover:bg-retroPastel-pink/20"
                      : theme === "vintage"
                      ? i18n.language === language.code
                        ? "bg-[#a78a21]/30 text-[#f3ebd3]"
                        : "text-[#f3ebd3] hover:bg-[#a78a21]/20"
                      : i18n.language === language.code
                      ? "bg-primary-500/20 text-primary-600 dark:text-primary-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flex items-center w-full">
                    <span className="w-6 text-xs text-center font-medium opacity-80 flex-shrink-0">
                      {language.shortCode}
                    </span>
                    <span
                      className={`text-sm font-medium leading-none flex-grow ${
                        theme === "brutalism" ? "font-bold" : ""
                      }`}
                    >
                      {language.name}
                    </span>
                    {i18n.language === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                          theme === "retro-pastel"
                            ? "bg-retroPastel-pink"
                            : theme === "vintage"
                            ? "bg-[#a78a21]"
                            : theme === "brutalism"
                            ? "bg-black"
                            : "bg-primary-400"
                        }`}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
