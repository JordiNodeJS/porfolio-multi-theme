import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useRef } from "react";
import useMotion3DEffect from "../hooks/useMotion3DEffect";
import { TextRevealAnimation } from "./TextRevealAnimation";
import ProgressiveTextReveal from "./ProgressiveTextReveal";
import { usePortfolioDataFromLocales } from "../hooks/usePortfolioDataFromLocales";

const Hero = () => {
  const { theme } = useTheme();
  const { data: portfolioData } = usePortfolioDataFromLocales();
  const profileContainerRef = useRef<HTMLDivElement>(null);

  // Using our enhanced 3D effect hook for better physics-based animations
  const { springProps, isHovered, config } = useMotion3DEffect(
    profileContainerRef as React.RefObject<HTMLElement>,
    {
      strength: 25,
      rotateLimit: 15,
      scaleFactor: 1.08,
      zAxisMovement: 50,
      tiltReverse: false,
      resetOnLeave: true,

      breatheAnimation: false, // Disable breathing animation for specific themes
      breatheScale: 1.04,
      breatheDuration: 3000,
      glowOnHover: true,
      glowColor:
        theme === "dark"
          ? "rgba(56, 189, 248, 0.6)" // Cyan for dark mode
          : theme === "light"
          ? "rgba(79, 70, 229, 0.5)" // Indigo for light mode
          : theme === "vintage"
          ? "rgba(227, 181, 5, 0.6)" // Dorado para vintage
          : theme === "retro-pastel"
          ? "rgba(229, 107, 129, 0.5)" // Rosa para retro-pastel
          : theme === "brutalism"
          ? "rgba(255, 107, 107, 0.7)" // Rojo brillante para brutalism
          : "rgba(79, 70, 229, 0.5)",
      glowIntensity: theme === "brutalism" ? 1 : 0.8,
    }
  );
  return (
    <section
      id="hero"
      className={`relative py-20 ${
        theme === "brutalism" ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      {" "}
      {/* Background gradient */}
      <div
        className={`absolute inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 to-slate-800"
            : theme === "light"
            ? "bg-gradient-to-br from-gray-50 to-white"
            : theme === "vintage"
            ? "bg-gradient-to-br from-[#6e4c30] to-[#543825]"
            : theme === "retro-pastel"
            ? "bg-gradient-to-br from-[#f9f1f0] to-[#fadcd9]"
            : theme === "brutalism"
            ? "bg-[#ffeaa7]" // Color sólido para brutalism
            : "bg-gradient-to-br from-gray-50 to-white"
        }`}
      />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Profile image with 3D effect */}
          <div
            className="perspective-1000 mb-12 mt-12 cursor-pointer profile-image-container hover-smooth"
            ref={profileContainerRef}
          >
            {" "}
            <motion.div
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-visible shadow-2xl transform-style-3d scale-smooth"
              style={{
                // Apply transform directly from spring props
                rotateX: springProps.rotateX,
                rotateY: springProps.rotateY,
                scale: springProps.scale,
                z: springProps.zIndex,
                // Use CSS custom property for perspective
                transform: `perspective(1000px)`,
                // Add smooth transitions for all transformations
                transition:
                  "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease",
              }}
            >
              {" "}
              {/* Base circular with depth effect */}
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
                    : theme === "light"
                    ? "bg-gradient-to-br from-gray-100 via-white to-gray-200"
                    : theme === "vintage"
                    ? "bg-gradient-to-br from-[#a87e58] via-[#9b714c] to-[#8a6440]"
                    : theme === "retro-pastel"
                    ? "bg-gradient-to-br from-[#ffb5b5] via-[#ffaec0] to-[#f59cb0]"
                    : theme === "brutalism"
                    ? "bg-[#ff6b6b] border-4 border-black"
                    : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
                } shadow-inner transform-gpu transform-style-3d background-smooth`}
                style={{
                  z: -20,
                  transform: `translateZ(-20px)`,
                  transition:
                    "transform 0.8s cubic-bezier(0.23, 1, 0.320, 1), background 0.6s ease-out",
                }}
              />{" "}
              {/* Dynamic shadow effect */}
              <motion.div
                className="absolute -inset-4 rounded-full blur-md opacity-70 background-smooth"
                style={{
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(30,64,175,0.1) 70%, transparent 100%)"
                      : theme === "light"
                      ? "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.1) 70%, transparent 100%)"
                      : theme === "vintage"
                      ? "radial-gradient(circle, rgba(227,181,5,0.3) 0%, rgba(168,126,88,0.2) 70%, transparent 100%)"
                      : theme === "retro-pastel"
                      ? "radial-gradient(circle, rgba(229,107,129,0.25) 0%, rgba(248,177,149,0.15) 70%, transparent 100%)"
                      : theme === "brutalism"
                      ? "none" // Sin sombra para el tema brutalism
                      : "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.1) 70%, transparent 100%)",
                  transform:
                    theme === "brutalism"
                      ? "translateZ(-10px)"
                      : "translateZ(-10px)",
                  opacity: isHovered ? 0.9 : 0.7,
                  scale: isHovered ? 1.1 : 1.0,
                  boxShadow:
                    theme === "brutalism" ? "5px 5px 0px #000" : "none",
                  transition:
                    "transform 0.8s cubic-bezier(0.23, 1, 0.320, 1), opacity 0.6s ease-out, scale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />{" "}
              {/* Container for the image with clip-path for the "popping out of circle" effect */}
              <motion.div
                className="absolute inset-0 overflow-visible transform-style-3d"
                style={{
                  z: springProps.zIndex,
                }}
              >
                {" "}
                {/* 3D Image that "pops out" of the circle */}
                <motion.img
                  src={`${import.meta.env.BASE_URL}assets/developer.png`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transform-gpu transform-style-3d scale-smooth"
                  style={{
                    scale: springProps.scale,
                    filter: isHovered
                      ? `drop-shadow(0 0 20px ${config.glowColor})`
                      : "none",
                    transition:
                      "filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), scale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />{" "}
              </motion.div>{" "}
              {/* Border glow effect */}
              <motion.div
                className={`absolute -inset-1 rounded-full pointer-events-none transform-style-3d background-smooth ${
                  theme === "brutalism" ? "border-4 border-black" : ""
                }`}
                style={{
                  background:
                    theme === "dark"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e3a8a, #1e3a8a, #1e40af, #1d4ed8, #2563eb, #3b82f6, #60a5fa)`
                      : theme === "light"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #93c5fd, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e40af, #1d4ed8, #2563eb, #3b82f6, #60a5fa, #93c5fd)`
                      : theme === "vintage"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #e3b505, #c89e31, #a87e58, #967043, #826036, #6e4c30, #6e4c30, #826036, #967043, #a87e58, #c89e31, #e3b505)`
                      : theme === "retro-pastel"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #ffb5b5, #ffaec0, #f59cb0, #e56b81, #cf6279, #b85671, #b85671, #cf6279, #e56b81, #f59cb0, #ffaec0, #ffb5b5)`
                      : theme === "brutalism"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #4ecdc4, #45b7d1, #3b82f6, #ff6b6b, #ffeaa7, #ffeaa7, #ff6b6b, #3b82f6, #45b7d1, #4ecdc4)`
                      : `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #93c5fd, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e40af, #1d4ed8, #2563eb, #3b82f6, #60a5fa, #93c5fd)`,
                  filter:
                    theme === "brutalism"
                      ? "none"
                      : isHovered
                      ? "blur(12px)"
                      : "blur(8px)",
                  transform:
                    theme === "brutalism"
                      ? "translateZ(5px) skew(-3deg)"
                      : "translateZ(5px)",
                  zIndex: 5,
                  opacity: isHovered ? 0.9 : 0.6,
                  scale: isHovered ? 1.05 : 1.0,
                  animation: "rotate 10s linear infinite",
                  transition:
                    "filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s ease-out, scale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  boxShadow:
                    theme === "brutalism" ? "4px 4px 0px #000" : "none",
                }}
              />
            </motion.div>
          </div>

          {/* Text content with animations */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              // Ensure text container doesn't clip content
              overflow: "visible",
              ...(theme === "brutalism" && {
                minWidth: "100%",
                width: "auto",
              }),
            }}
          >
            {/* Progressive text reveal for dark, light, retro-pastel themes */}
            {theme === "dark" ||
            theme === "light" ||
            theme === "retro-pastel" ? (
              <ProgressiveTextReveal
                text={portfolioData?.presentation?.name || "JORGE"}
                duration={4000}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                    : theme === "light"
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    : theme === "retro-pastel"
                    ? "bg-gradient-to-r from-pink-300 via-rose-200 to-orange-200"
                    : ""
                }`}
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "1.1",
                  ...(theme === "retro-pastel" && {
                    fontFamily: '"Comfortaa", cursive, sans-serif',
                    fontWeight: "600",
                    letterSpacing: "0.02em",
                  }),
                }}
              />
            ) : (
              /* Regular text for brutalism and vintage themes */
              <div
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                  theme === "brutalism"
                    ? "text-black"
                    : theme === "vintage"
                    ? "bg-clip-text text-transparent"
                    : "bg-clip-text text-transparent"
                } ${
                  theme === "vintage"
                    ? "bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600"
                    : theme === "brutalism"
                    ? ""
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                }`}
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "1.1",
                  // Ensure proper display for brutalism theme
                  ...(theme === "brutalism" && {
                    color: "#ef7574",
                    textShadow:
                      "2px 2px 0 #000, " +
                      "-1px -1px 0 #f8d7da, " +
                      "-1px -2px 0 #f5b5b5, " +
                      "1px -1px 0 #000, " +
                      "-1px 1px 0 #000, " +
                      "1px 1px 0 #000",
                    WebkitTextStroke: "0.5px #000",
                    overflow: "visible", // Ensure text is not clipped
                    whiteSpace: "nowrap", // Prevent text wrapping that might cause issues
                  }),
                  ...(theme === "vintage" && {
                    textShadow:
                      "2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(251, 191, 36, 0.5)",
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    filter: "drop-shadow(0 4px 8px rgba(139, 94, 60, 0.4))",
                  }),
                }}
              >
                <TextRevealAnimation
                  text={portfolioData?.presentation?.name || "JORGe's web"}
                  charDelay={theme === "brutalism" ? 0.12 : 0.08} // Slower animation for brutalism to ensure all chars appear
                  animationStyle="scale"
                  once={false}
                  replay={false}
                />
              </div>
            )}

            <div
              className={`text-xl md:text-2xl lg:text-3xl font-medium mb-6 ${
                theme === "dark"
                  ? "text-slate-200"
                  : theme === "brutalism"
                  ? "text-black font-bold"
                  : theme === "vintage"
                  ? "text-amber-700 font-medium"
                  : theme === "retro-pastel"
                  ? "text-rose-400 font-light"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-700"
              }`}
              style={{
                // Force absolute centering - override any conflicting styles
                textAlign: "center" as const,
                display: "flex" as const,
                justifyContent: "center" as const,
                alignItems: "center" as const,
                width: "100%" as const,
                margin: "0 auto" as const,
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                ...(theme === "dark" && {
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }),
                ...(theme === "brutalism" && {
                  textShadow:
                    "1px 1px 0 #000, -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #000",
                  WebkitTextStroke: "0.3px #000",
                }),
                ...(theme === "vintage" && {
                  textShadow:
                    "1px 1px 2px rgba(0, 0, 0, 0.2), 0 0 10px rgba(251, 191, 36, 0.3)",
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                }),
                ...(theme === "retro-pastel" && {
                  textShadow:
                    "0 2px 4px rgba(255, 182, 193, 0.3), 0 0 8px rgba(255, 218, 185, 0.2)",
                  fontFamily: '"Comfortaa", cursive, sans-serif',
                  letterSpacing: "0.01em",
                  fontWeight: "300",
                }),
                ...(theme === "light" && {
                  textShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }),
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Simple text without animation to ensure centering */}
                <span style={{ textAlign: "center", display: "inline-block" }}>
                  {portfolioData?.presentation?.title ||
                    "Frontend React Engineer"}
                </span>
              </div>
            </div>

            <motion.div
              className={`w-24 h-1 mx-auto rounded-full mt-4 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  : theme === "light"
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  : theme === "vintage"
                  ? "bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/50"
                  : theme === "retro-pastel"
                  ? "bg-gradient-to-r from-pink-200 via-rose-100 to-orange-100 shadow-md shadow-pink-200/60"
                  : theme === "brutalism"
                  ? "bg-black border-2 border-white shadow-[2px_2px_0px_#ff6b6b]"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              }`}
              style={{
                // Additional spacing from subtitle
                marginTop: "1rem",
                ...(theme === "vintage" && {
                  filter: "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.6))",
                  height: "3px",
                }),
                ...(theme === "retro-pastel" && {
                  filter: "drop-shadow(0 1px 3px rgba(255, 182, 193, 0.4))",
                  height: "2px",
                  borderRadius: "1px",
                }),
              }}
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
