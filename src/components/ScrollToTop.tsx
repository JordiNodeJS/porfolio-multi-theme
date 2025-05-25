import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border ${
            theme === "vintage"
              ? "bg-gradient-to-r from-[#c69f26] to-[#d27c54] hover:shadow-[0_0_20px_rgba(227,181,5,0.6)] border-[#a78a21]/30"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] border-blue-400/20"
          }`}
          title="Subir al inicio"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
