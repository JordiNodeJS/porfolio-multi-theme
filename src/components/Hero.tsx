import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo gradiente - Simplificado */}
      <div
        className={`absolute inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 to-slate-800"
            : "bg-gradient-to-br from-gray-50 to-white"
        }`}
      />

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Imagen circular */}
          <motion.div
            className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-12 mt-12 rounded-full overflow-hidden border-4 border-white shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/src/assets/developer.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {/* Overlay simplificado */}
            <div
              className={`absolute inset-0 rounded-full ${
                theme === "dark" ? "bg-black/10" : "bg-white/10"
              }`}
            />
          </motion.div>

          {/* Texto */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{
                color: theme === "dark" ? "#ffffff" : "#1a202c",
                lineHeight: "1.2",
              }}
            >
              JORGE
            </motion.h1>

            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
              style={{
                color: theme === "dark" ? "#e2e8f0" : "#4a5568",
                textShadow:
                  theme === "dark"
                    ? "0 2px 4px rgba(0,0,0,0.3)"
                    : "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Frontend React Engineer
            </motion.h2>

            <motion.div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
