import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "./AnimatedWaves.css";

const AnimatedWaves = () => {
  const { theme } = useTheme();

  // Wave path configurations for different layers with more organic curves
  const waveConfigs = [
    {
      id: "wave-1",
      path: "M0,60 Q150,40 300,60 T600,60 Q750,40 900,60 T1200,60 Q1350,40 1500,60 L1500,300 L0,300 Z",
      duration: 20,
      delay: 0,
      opacity: 0.8,
      scale: 1,
    },
    {
      id: "wave-2", 
      path: "M0,80 Q200,50 400,80 T800,80 Q1000,50 1200,80 T1500,80 L1500,300 L0,300 Z",
      duration: 25,
      delay: 3,
      opacity: 0.6,
      scale: 1.1,
    },
    {
      id: "wave-3",
      path: "M0,100 Q100,70 200,100 Q300,130 400,100 Q500,70 600,100 Q700,130 800,100 Q900,70 1000,100 Q1100,130 1200,100 Q1300,70 1400,100 Q1450,70 1500,100 L1500,300 L0,300 Z",
      duration: 30,
      delay: 6,
      opacity: 0.4,
      scale: 1.2,
    },
  ];

  // Color configurations per theme
  const getWaveColors = () => {
    switch (theme) {
      case "dark":
        return [
          "rgba(56, 189, 248, 0.5)", // Cyan - More intense
          "rgba(59, 130, 246, 0.4)", // Blue  
          "rgba(147, 51, 234, 0.3)", // Purple
        ];
      case "light":
        return [
          "rgba(59, 130, 246, 0.4)", // Blue
          "rgba(147, 51, 234, 0.3)", // Purple
          "rgba(236, 72, 153, 0.25)", // Pink
        ];
      case "vintage":
        return [
          "rgba(251, 191, 36, 0.5)", // Gold - More intense
          "rgba(245, 158, 11, 0.4)", // Amber
          "rgba(217, 119, 6, 0.3)", // Orange
        ];
      case "retro-pastel":
        return [
          "rgba(255, 182, 193, 0.5)", // Light pink - More intense
          "rgba(255, 218, 185, 0.4)", // Peach
          "rgba(250, 176, 196, 0.3)", // Rose
        ];
      case "brutalism":
        return [
          "rgba(255, 107, 107, 0.6)", // Bright red - More intense
          "rgba(78, 205, 196, 0.5)", // Turquoise
          "rgba(255, 234, 167, 0.4)", // Yellow
        ];
      default:
        return [
          "rgba(59, 130, 246, 0.4)",
          "rgba(147, 51, 234, 0.3)",
          "rgba(236, 72, 153, 0.25)",
        ];
    }
  };

  const colors = getWaveColors();

  return (
    <div className={`wave-container waves-${theme}`}>
      <svg
        className="wave-svg"
        viewBox="0 0 1500 300"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Gradient definitions for each wave */}
          {waveConfigs.map((_, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`waveGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors[index]} stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors[index]} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors[index]} stopOpacity="0.4" />
            </linearGradient>
          ))}

          {/* Filter for subtle glow effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Render animated waves */}
        {waveConfigs.map((wave, index) => (
          <motion.path
            key={wave.id}
            d={wave.path}
            fill={`url(#waveGradient-${index})`}
            opacity={wave.opacity}
            filter={theme === "brutalism" ? "none" : "url(#glow)"}
            initial={{ 
              pathLength: 0,
              x: -50,
              scale: wave.scale,
            }}
            animate={{
              pathLength: 1,
              x: [0, 30, -15, 45, 0],
              y: [0, -8, 5, -12, 0],
              scale: [wave.scale, wave.scale * 1.08, wave.scale * 0.95, wave.scale * 1.05, wave.scale],
            }}
            transition={{
              pathLength: {
                duration: 3,
                delay: wave.delay * 0.4,
                ease: "easeInOut",
              },
              x: {
                duration: wave.duration,
                delay: wave.delay,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for wind-like movement
                repeatType: "mirror",
              },
              y: {
                duration: wave.duration * 0.8,
                delay: wave.delay + 1,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                repeatType: "mirror",
              },
              scale: {
                duration: wave.duration * 0.6,
                delay: wave.delay + 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              },
            }}
            style={{
              transformOrigin: "center bottom",
              ...(theme === "brutalism" && {
                filter: "drop-shadow(3px 3px 0px #000)",
              }),
            }}
          />
        ))}

        {/* Additional floating elements for wind effect */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.circle
            key={`floating-${index}`}
            cx={200 + index * 200}
            cy={50 + (index % 3) * 20}
            r={index % 2 === 0 ? 2 : 1.5}
            fill={colors[index % colors.length]}
            opacity={0.4}
            initial={{ 
              x: -50,
              opacity: 0,
            }}
            animate={{
              x: [0, 100, 50, 150, 0],
              y: [0, -20, 10, -15, 0],
              opacity: [0, 0.6, 0.3, 0.8, 0],
              scale: [1, 1.3, 0.8, 1.5, 1],
            }}
            transition={{
              duration: 12 + index * 2,
              delay: index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />
        ))}

        {/* Particle system for enhanced wind effect */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.ellipse
            key={`particle-${index}`}
            cx={100 + index * 120}
            cy={80 + (index % 4) * 15}
            rx={1}
            ry={0.5}
            fill={colors[index % colors.length]}
            opacity={0.3}
            initial={{
              x: -30,
              rotate: 0,
            }}
            animate={{
              x: [0, 80, 40, 120, 0],
              y: [0, -10, 5, -8, 0],
              rotate: [0, 360, 180, 540, 0],
              opacity: [0, 0.5, 0.2, 0.7, 0],
            }}
            transition={{
              duration: 8 + index,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedWaves;
