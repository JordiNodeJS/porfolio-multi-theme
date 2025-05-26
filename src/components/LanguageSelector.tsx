import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ca", name: "Català", flag: "🇪🇸" },
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
          ${theme === 'retro-pastel' 
            ? 'bg-retroPastel-pink/20 hover:bg-retroPastel-pink/30 border-retroPastel-pink/30 hover:border-retroPastel-pink/50 text-retroPastel-text' 
            : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t("language.select")}
      >
        <div className="flex items-center gap-2">
          <Globe className={`w-4 h-4 flex-shrink-0 ${theme === 'retro-pastel' ? 'text-retroPastel-text' : 'text-white'}`} />
          <span className="text-xl leading-none">{currentLanguage.flag}</span>
          <span className={`text-sm hidden sm:block leading-none ${theme === 'retro-pastel' ? 'text-retroPastel-text' : 'text-white'}`}>
            {currentLanguage.name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-white" />
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
              className={`absolute top-full right-0 mt-2 w-48 backdrop-blur-md rounded-lg shadow-xl overflow-hidden z-50 py-1
                ${theme === 'light' 
                  ? 'bg-white/95 border-slate-200 text-slate-800' 
                  : 'bg-slate-900/95 border-white/20 text-white'}`}
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    theme === 'light'
                      ? i18n.language === language.code
                        ? 'bg-slate-100 text-slate-800'
                        : 'text-slate-800 hover:bg-slate-100/50'
                      : theme === 'retro-pastel'
                        ? i18n.language === language.code
                          ? 'bg-retroPastel-pink/30 text-retroPastel-text'
                          : 'text-retroPastel-text hover:bg-retroPastel-pink/20'
                        : i18n.language === language.code
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'text-white hover:bg-white/10'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flex items-baseline gap-3 w-full">
                    <span className="text-xl flex-shrink-0 relative top-0.5">{language.flag}</span>
                    <span className="text-sm font-medium leading-none flex-grow">{language.name}</span>
                    {i18n.language === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                          theme === 'retro-pastel' ? 'bg-retroPastel-pink' : 'bg-primary-400'
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
