import { motion } from "framer-motion";
import { Sun, Moon, Coffee, Heart, Zap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-12 h-12 rounded-lg dark:bg-slate-800/50 light:bg-white/50 vintage:bg-amber-800/50 retro-pastel:bg-[#ffaec0]/30 backdrop-blur-sm border dark:border-slate-700/50 light:border-gray-200/50 vintage:border-amber-900/50 retro-pastel:border-[#e56b81]/30 dark:text-slate-300 light:text-gray-700 vintage:text-amber-100 retro-pastel:text-[#3d2c2c] hover:text-blue-500 transition-colors duration-300 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: theme === "vintage" ? 1 : 0,
          opacity: theme === "vintage" ? 1 : 0,
          rotate: theme === "vintage" ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Coffee className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "retro-pastel" ? 1 : 0,
          opacity: theme === "retro-pastel" ? 1 : 0,
          rotate: theme === "retro-pastel" ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Heart className="w-5 h-5 text-[#e56b81]" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: theme === "brutalism" ? 1 : 0,
          opacity: theme === "brutalism" ? 1 : 0,
          rotate: theme === "brutalism" ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Zap
          className="w-5 h-5 text-black font-black"
          style={{ filter: "drop-shadow(2px 2px 0px #ff6b6b)" }}
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
