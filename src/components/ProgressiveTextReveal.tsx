import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

interface ProgressiveTextRevealProps {
  text: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ProgressiveTextReveal: React.FC<ProgressiveTextRevealProps> = ({
  text,
  duration = 3000,
  className = "",
  style = {},
}) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);
  const getProgressiveStyle = () => {
    const baseOpacity = 0.2;
    const targetOpacity = 1;
    const opacity = Math.min(
      baseOpacity + (progress / 100) * (targetOpacity - baseOpacity),
      targetOpacity
    );

    const baseBlur = 4;
    const blur = Math.max(baseBlur - (progress / 100) * baseBlur, 0);

    switch (theme) {
      case "dark": {
        const darkBrightness = 0.5 + (progress / 100) * 0.5;
        const darkContrast = 0.8 + (progress / 100) * 0.4;
        const darkShadowIntensity = 0.1 + (progress / 100) * 0.3;
        return {
          filter: `blur(${blur}px) brightness(${darkBrightness}) contrast(${darkContrast}) saturate(${
            1 + (progress / 100) * 0.2
          })`,
          opacity,
          textShadow: `
            0 4px 12px rgba(59, 130, 246, ${darkShadowIntensity}),
            0 0 20px rgba(96, 165, 250, ${darkShadowIntensity * 0.6}),
            0 8px 32px rgba(147, 51, 234, ${darkShadowIntensity * 0.4})
          `,
          transform: `scale(${0.98 + (progress / 100) * 0.02})`,
        };
      }

      case "light": {
        const lightContrast = 0.6 + (progress / 100) * 0.4;
        const lightSaturation = 0.8 + (progress / 100) * 0.3;
        const lightShadowIntensity = 0.03 + (progress / 100) * 0.07;
        return {
          filter: `blur(${blur}px) contrast(${lightContrast}) saturate(${lightSaturation})`,
          opacity,
          textShadow: `
            0 2px 8px rgba(0, 0, 0, ${lightShadowIntensity}),
            0 4px 16px rgba(59, 130, 246, ${lightShadowIntensity * 0.8}),
            0 1px 3px rgba(147, 51, 234, ${lightShadowIntensity * 0.6})
          `,
          transform: `scale(${0.99 + (progress / 100) * 0.01})`,
        };
      }

      case "retro-pastel": {
        const pastelSaturation = 0.4 + (progress / 100) * 0.6;
        const pastelBrightness = 0.9 + (progress / 100) * 0.1;
        const pastelShadowIntensity = 0.15 + (progress / 100) * 0.25;
        return {
          filter: `blur(${blur}px) saturate(${pastelSaturation}) brightness(${pastelBrightness}) contrast(${
            1 + (progress / 100) * 0.1
          })`,
          opacity,
          textShadow: `
            0 3px 8px rgba(255, 182, 193, ${pastelShadowIntensity}),
            0 0 15px rgba(255, 218, 185, ${pastelShadowIntensity * 0.7}),
            0 6px 20px rgba(251, 113, 133, ${pastelShadowIntensity * 0.5})
          `,
          transform: `scale(${0.97 + (progress / 100) * 0.03})`,
        };
      }

      default:
        return { opacity };
    }
  };
  const getGradientIntensity = () => {
    // En lugar de generar clases dinámicas que podrían no estar en el bundle de Tailwind,
    // usamos gradientes estáticos que se intensifican con la opacidad y otros efectos
    switch (theme) {
      case "dark": {
        return "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600";
      }

      case "light": {
        return "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600";
      }

      case "retro-pastel": {
        return "bg-gradient-to-r from-pink-300 via-rose-200 to-orange-200";
      }

      default: {
        return (
          className.split(" ").find((c) => c.includes("bg-gradient")) || ""
        );
      }
    }
  };

  return (
    <motion.div
      className={`${className} ${
        theme !== "brutalism" && theme !== "vintage"
          ? getGradientIntensity()
          : className
      }`}
      style={{
        ...style,
        ...getProgressiveStyle(),
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.2 }}
          animate={{
            opacity:
              progress >= (index / text.length) * 100
                ? 1
                : 0.2 + (progress / 100) * 0.3,
          }}
          transition={{
            duration: 0.1,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ProgressiveTextReveal;
