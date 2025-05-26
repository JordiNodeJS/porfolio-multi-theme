import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useRef } from "react";
import { animated } from "@react-spring/web";
import useEnhanced3DEffect from "../hooks/useEnhanced3DEffect";

const Hero = () => {
  const { theme } = useTheme();
  const profileContainerRef = useRef<HTMLDivElement>(null);

  // Using our enhanced 3D effect hook for better physics-based animations
  const { springProps, isHovered, config } = useEnhanced3DEffect(
    profileContainerRef as React.RefObject<HTMLElement>,
    {
      strength: 25,
      rotateLimit: 15,
      scaleFactor: 1.08,
      zAxisMovement: 50,
      tiltReverse: false,
      resetOnLeave: true,
      dampingFactor: 15,
      stiffnessFactor: 130,
      breatheAnimation: true,
      breatheScale: 1.04,
      breatheDuration: 3000,
      glowOnHover: true,
      glowColor:
        theme === "dark"
          ? "rgba(56, 189, 248, 0.6)" // Cyan for dark mode
          : "rgba(79, 70, 229, 0.5)", // Indigo for light mode
      glowIntensity: 0.8,
    }
  );

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 to-slate-800"
            : "bg-gradient-to-br from-gray-50 to-white"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Profile image with 3D effect */}
          <div
            className="perspective-1000 mb-12 mt-12 cursor-pointer"
            ref={profileContainerRef}
          >
            {" "}
            <animated.div
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-visible shadow-2xl transform-style-3d"
              style={{
                // Apply transform directly from spring props
                rotateX: springProps.rotateX,
                rotateY: springProps.rotateY,
                scale: springProps.scale,
                zIndex: springProps.zIndex,
                // Use CSS custom property for perspective
                transform: `perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(var(--z, 0px))`,
              }}
            >
              {/* Base circular with depth effect */}
              <animated.div
                className={`absolute inset-0 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
                    : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
                } shadow-inner transform-gpu transform-style-3d`}
                style={{ transform: "translateZ(-20px)" }}
              />{" "}
              {/* Dynamic shadow effect */}
              <animated.div
                className="absolute -inset-4 rounded-full blur-md opacity-70"
                style={{
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(30,64,175,0.1) 70%, transparent 100%)"
                      : "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.1) 70%, transparent 100%)",
                  transform: "translateZ(-10px)",
                  translateX: springProps.rotateY.to((val) => -val * 0.5),
                  translateY: springProps.rotateX.to((val) => val * 0.5),
                }}
              />{" "}
              {/* Container for the image with clip-path for the "popping out of circle" effect */}
              <animated.div
                className="absolute inset-0 overflow-visible transform-style-3d"
                style={{
                  translateZ: springProps.zIndex,
                }}
              >
                {" "}
                {/* 3D Image that "pops out" of the circle */}
                <animated.img
                  src="/assets/developer.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transform-gpu transform-style-3d"
                  style={{
                    scale: springProps.scale,
                    filter: isHovered
                      ? `drop-shadow(0 0 15px ${config.glowColor})`
                      : "none",
                    transition: "filter 0.3s ease",
                  }}
                />{" "}
              </animated.div>{" "}
              {/* Border glow effect */}
              <animated.div
                className="absolute -inset-1 rounded-full pointer-events-none transform-style-3d"
                style={{
                  background:
                    theme === "dark"
                      ? `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e3a8a, #1e3a8a, #1e40af, #1d4ed8, #2563eb, #3b82f6, #60a5fa)`
                      : `conic-gradient(from ${
                          Date.now() % 360
                        }deg at 50% 50%, #93c5fd, #60a5fa, #3b82f6, #2563eb, #1d4ed8, #1e40af, #1e40af, #1d4ed8, #2563eb, #3b82f6, #60a5fa, #93c5fd)`,
                  filter: isHovered ? "blur(10px)" : "blur(8px)",
                  transform: "translateZ(5px)",
                  zIndex: 5,
                  opacity: isHovered ? 0.85 : 0.6,
                  animation: "rotate 10s linear infinite",
                  transition: "filter 0.3s ease, opacity 0.3s ease",
                }}
              />
            </animated.div>
          </div>

          {/* Text content with animations */}
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
