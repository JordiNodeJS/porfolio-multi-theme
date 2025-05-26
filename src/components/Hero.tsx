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
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              }`}
              style={{
                lineHeight: "1.2",
                textShadow:
                  theme === "dark"
                    ? "0 0 20px rgba(59, 130, 246, 0.3)"
                    : "0 2px 8px rgba(147, 51, 234, 0.2)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              JORGE
            </motion.h1>

            <motion.h2
              className={`text-xl md:text-2xl lg:text-3xl font-medium mb-6 ${
                theme === "dark" ? "text-slate-200" : "text-gray-700"
              }`}
              style={{
                textShadow:
                  theme === "dark"
                    ? "0 2px 8px rgba(0,0,0,0.4)"
                    : "0 1px 4px rgba(0,0,0,0.1)",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span
                className={`${
                  theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                } font-semibold`}
              >
                Frontend
              </span>{" "}
              <span
                className={`${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                } font-semibold`}
              >
                React
              </span>{" "}
              <span
                className={`${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                } font-semibold`}
              >
                Engineer
              </span>
            </motion.h2>

            <motion.div
              className={`w-24 h-1 mx-auto rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
