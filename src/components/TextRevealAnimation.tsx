import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";

interface TextRevealAnimationProps {
  text: string;
  className?: string;
  charDelay?: number;
  once?: boolean;
  animationStyle?: "scale" | "slide" | "fade" | "bounce" | "random";
  initialDelay?: number;
  highlightColor?: string;
  replay?: boolean;
  onAnimationComplete?: () => void;
}

export const TextRevealAnimation = ({
  text,
  className = "",
  charDelay = 0.08, // 80ms default delay
  once = true,
  animationStyle = "scale",
  initialDelay = 0.1,
  highlightColor,
  replay = false,
  onAnimationComplete,
}: TextRevealAnimationProps) => {
  const { theme } = useTheme();
  const [key, setKey] = useState(0);

  // Rerender when replay prop changes
  useEffect(() => {
    if (replay) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [replay]);

  // Reset animation when text changes (e.g., language change)
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [text]);

  // Create array of characters from text
  const characters = text.split("");

  // Function to get random animation style for each character
  const getRandomAnimation = (index: number) => {
    const styles = ["scale", "slide", "fade", "bounce"];
    // Consistent random for each character based on its position
    const randomIndex = Math.floor((index * 13) % 4);
    return styles[randomIndex];
  };

  // Determine animation style for current character
  const getAnimationVariant = (index: number) => {
    const style =
      animationStyle === "random" ? getRandomAnimation(index) : animationStyle;

    switch (style) {
      case "slide":
        return {
          hidden: {
            opacity: 0,
            y: theme === "brutalism" ? 20 : 10,
            filter: theme === "brutalism" ? "blur(8px)" : "blur(2px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          },
        };
      case "fade":
        return {
          hidden: {
            opacity: 0,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
          },
        };
      case "bounce":
        return {
          hidden: {
            opacity: 0,
            scale: theme === "brutalism" ? 1.5 : 1.2,
            y: theme === "brutalism" ? -15 : -8,
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
          },
        };
      case "scale":
      default:
        return {
          hidden: {
            opacity: 0,
            scale: 0.5,
            filter: theme === "brutalism" ? "blur(8px)" : "blur(3px)",
            y: theme === "brutalism" ? 10 : 5,
          },
          visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
          },
        };
    }
  };

  // Animation variants for each character
  const charVariants = {
    hidden: (i: number) => {
      const variant = getAnimationVariant(i);
      return variant.hidden;
    },
    visible: (i: number) => ({
      ...getAnimationVariant(i).visible,
      transition: {
        delay: initialDelay + i * charDelay,
        duration: 0.3,
        ease: theme === "brutalism" ? "backOut" : "easeOut",
      },
    }),
  };
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: charDelay,
        delayChildren: initialDelay,
      },
    },
  };
  // Apply highlighting effect for characters
  const getCharacterStyle = (char: string) => {
    const baseStyle: React.CSSProperties = {
      display: "inline-block",
      whiteSpace: char === " " ? "pre" : "normal",
    };

    // Add brutalism-specific styles
    if (theme === "brutalism" && char !== " ") {
      baseStyle.textShadow = "1px 1px 0 #000";
    }

    // Add highlight color if provided
    if (highlightColor && char !== " ") {
      baseStyle.color = highlightColor;
    }

    return baseStyle;
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      key={key} // Force re-render when key changes
      onAnimationComplete={() => onAnimationComplete?.()}
      style={{
        // Ensure container doesn't clip text, especially for brutalism theme
        overflow: "visible",
        // Force centering when text-center class is present
        ...(className?.includes("text-center") ? {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
        } : {
          display: "inline-block",
          width: "auto",
        }),
        ...(theme === "brutalism" && {
          width: className?.includes("text-center") ? "100%" : "auto",
        }),
      }}
    >
      <span 
        style={{ 
          display: "inline-block",
          textAlign: "inherit",
        }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            custom={index}
            variants={charVariants}
            style={{
              ...getCharacterStyle(char),
              // Ensure each character is properly displayed
              ...(theme === "brutalism" && {
                position: "relative",
                zIndex: 1,
              }),
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
};
