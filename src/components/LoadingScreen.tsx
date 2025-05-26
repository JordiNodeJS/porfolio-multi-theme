import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

const LoadingScreen = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simplified loading - just show for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants for the J letter
  const jVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };
  // Theme-aware color configurations
  const getThemeConfig = () => {
    switch (theme) {
      case "light":
        return {
          background: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
          gradientStops: {
            start: "#3B82F6", // Blue
            middle: "#6366F1", // Indigo
            end: "#8B5CF6", // Purple
          },
          particles:
            "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
          floatingBg:
            "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400",
          title: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600",
          subtitle: "text-gray-600",
        };

      case "vintage":
        return {
          background:
            "bg-gradient-to-br from-[#6e4c30] via-[#8b5e3c] to-[#4a5240]",
          gradientStops: {
            start: "#e3b505", // Mustard
            middle: "#a78a21", // Gold
            end: "#8b5e3c", // Brown
          },
          particles:
            "bg-gradient-to-r from-[#e3b505] via-[#a78a21] to-[#8b5e3c]",
          floatingBg:
            "bg-gradient-to-r from-[#f3ebd3] via-[#e3b505] to-[#a78a21]",
          title: "bg-gradient-to-r from-[#f3ebd3] via-[#e3b505] to-[#a78a21]",
          subtitle: "text-[#f3ebd3]/80",
        };

      case "retro-pastel":
        return {
          background:
            "bg-gradient-to-br from-[#fffaf0] via-[#ffaec0] to-[#ffe9a6]",
          gradientStops: {
            start: "#ff8da3", // Pink
            middle: "#ffd34d", // Custard
            end: "#92c9a9", // Mint
          },
          particles:
            "bg-gradient-to-r from-[#ff8da3] via-[#ffd34d] to-[#92c9a9]",
          floatingBg:
            "bg-gradient-to-r from-[#ffaec0] via-[#9d8fc2] to-[#8fc4e5]",
          title: "bg-gradient-to-r from-[#e56b81] via-[#ff8da3] to-[#ffd34d]",
          subtitle: "text-[#3d2c2c]/80",
        };

      case "brutalism":
        return {
          background:
            "bg-gradient-to-br from-[#ff6b6b] via-[#4ecdc4] to-[#ffeaa7] bg-[length:300%_300%] animate-[brutalGradient_3s_ease-in-out_infinite]",
          gradientStops: {
            start: "#ff6b6b", // Red
            middle: "#4ecdc4", // Cyan
            end: "#45b7d1", // Blue
          },
          particles:
            "bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#45b7d1] border-2 border-black",
          floatingBg:
            "bg-gradient-to-r from-[#96ceb4] via-[#ffeaa7] to-[#ff6b6b] border border-black",
          title: "text-black font-black drop-shadow-[2px_2px_0px_#ffeaa7]",
          subtitle: "text-black font-bold",
        };

      default: // dark
        return {
          background:
            "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900",
          gradientStops: {
            start: "#3B82F6", // Blue
            middle: "#8B5CF6", // Purple
            end: "#EC4899", // Pink
          },
          particles:
            "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          floatingBg:
            "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          title: "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500",
          subtitle: "text-slate-400",
        };
    }
  };

  const themeConfig = getThemeConfig();

  // Floating particles around the J
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    duration: 2 + Math.random() * 2,
    radius: 50 + Math.random() * 80,
    angle: i * 45 * (Math.PI / 180),
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`fixed inset-0 z-50 ${themeConfig.background} flex items-center justify-center`}
        >
          <div className="text-center relative">
            {/* Animated J letter with SVG */}{" "}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`mb-8 relative ${
                theme === "brutalism"
                  ? "filter drop-shadow-[4px_4px_0px_#000]"
                  : ""
              }`}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
              >
                <motion.path
                  d="M50 20 L50 70 Q50 90 30 90 Q10 90 10 70 L10 65"
                  stroke="url(#gradient)"
                  strokeWidth={theme === "brutalism" ? "8" : "6"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={jVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    filter:
                      theme === "brutalism"
                        ? "drop-shadow(2px 2px 0px #000) drop-shadow(-1px -1px 0px #000)"
                        : undefined,
                  }}
                />
                {/* Dot for the J */}
                <motion.circle
                  cx="50"
                  cy="10"
                  r={theme === "brutalism" ? "6" : "5"}
                  fill="url(#gradient)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, ease: "backOut" }}
                  style={{
                    filter:
                      theme === "brutalism"
                        ? "drop-shadow(2px 2px 0px #000) drop-shadow(-1px -1px 0px #000)"
                        : undefined,
                  }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={themeConfig.gradientStops.start}
                    />
                    <stop
                      offset="50%"
                      stopColor={themeConfig.gradientStops.middle}
                    />
                    <stop
                      offset="100%"
                      stopColor={themeConfig.gradientStops.end}
                    />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating particles around the J */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1, 1, 0],
                    x: Math.cos(particle.angle) * particle.radius,
                    y: Math.sin(particle.angle) * particle.radius,
                    opacity: [0, 0.8, 0.8, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${
                    themeConfig.particles
                  } blur-sm ${
                    theme === "brutalism" ? "shadow-[1px_1px_0px_0px_#000]" : ""
                  }`}
                />
              ))}
            </motion.div>{" "}
            {/* Loading text */}{" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center"
            >
              <h1
                className={`text-3xl font-bold mb-2 ${
                  theme === "brutalism"
                    ? themeConfig.title
                    : `${themeConfig.title} bg-clip-text text-transparent`
                }`}
              >
                Jorge Portfolio
              </h1>
              <p className={`text-lg ${themeConfig.subtitle}`}>
                Cargando experiencia...
              </p>
            </motion.div>
            {/* Background floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0.2,
                    x: Math.random() * 800 - 400,
                    y: Math.random() * 600 - 300,
                    scale: 0.5 + Math.random() * 0.5,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    x: Math.random() * 800 - 400,
                    y: Math.random() * 600 - 300,
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2,
                  }}
                  className={`absolute w-2 h-2 rounded-full blur-sm ${
                    themeConfig.floatingBg
                  } opacity-60 ${
                    theme === "brutalism" ? "shadow-[1px_1px_0px_0px_#000]" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
