import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            theme === "vintage"
              ? "bg-gradient-to-r from-vintage-mustard to-vintage-terracotta hover:shadow-[0_0_20px_rgba(227,181,5,0.6)] border-vintage-mustard-dark/30"
              : theme === "light"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] border-indigo-400/20"
              : theme === "retro-pastel"
              ? "bg-gradient-to-r from-retroPastel-peach to-retroPastel-lavender hover:shadow-[0_0_20px_rgba(255,170,128,0.6)] border-retroPastel-lavender/20"
              : theme === "brutalism"
              ? "bg-brutalism-red text-black border-4 border-black brutalism-shadow hover:bg-brutalism-cyan"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400/20"
          }`}
          title="Subir al inicio"
        >
          <ChevronUp
            className={`w-6 h-6 ${theme === "brutalism" ? "stroke-2" : ""}`}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
