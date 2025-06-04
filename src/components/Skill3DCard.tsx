import { useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { motion } from "framer-motion";
import useMotion3DEffect from "../hooks/useMotion3DEffect";
import type { IconType } from "react-icons";

interface Skill3DCardProps {
  icon: IconType;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  color?: string;
  description?: string;
}

const Skill3DCard = ({
  icon: Icon,
  name,
  level,
  color = "from-blue-500 to-blue-700",
  description,
}: Skill3DCardProps) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  // Use our enhanced 3D effect with custom settings for skill cards
  const { springProps, isHovered, config } = useMotion3DEffect(
    cardRef as React.RefObject<HTMLElement>,
    {
      strength: 15,
      rotateLimit: 10,
      scaleFactor: 1.05,
      zAxisMovement: 20,
      tiltReverse: false,
      resetOnLeave: true,

      breatheAnimation: false,
      glowOnHover: true,
      glowColor:
        theme === "dark" ? "rgba(59, 130, 246, 0.5)" : "rgba(79, 70, 229, 0.4)",
      glowIntensity: 0.6,
    }
  );

  // Calculate styles for the skill level indicator
  const getLevelStyles = () => {
    const baseStyles = "h-1.5 rounded-full mt-2";
    let width = "";
    let levelColor = "";

    switch (level) {
      case "beginner":
        width = "w-1/4";
        levelColor =
          theme === "dark" ? "bg-emerald-500/70" : "bg-emerald-600/70";
        break;
      case "intermediate":
        width = "w-2/4";
        levelColor = theme === "dark" ? "bg-blue-500/70" : "bg-blue-600/70";
        break;
      case "advanced":
        width = "w-3/4";
        levelColor = theme === "dark" ? "bg-purple-500/70" : "bg-purple-600/70";
        break;
      case "expert":
        width = "w-full";
        levelColor = theme === "dark" ? "bg-red-500/70" : "bg-red-600/70";
        break;
      default:
        width = "w-0";
        break;
    }

    return `${baseStyles} ${width} ${levelColor}`;
  };

  return (
    <div ref={cardRef} className="relative perspective-1000">
      {" "}
      <motion.div
        className={`p-4 transform-style-3d ${
          theme === "dark"
            ? "bg-slate-800/90"
            : theme === "brutalism"
            ? "bg-[#fff4d3] border-2 border-black"
            : theme === "vintage"
            ? "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/60"
            : "bg-white/95"
        } ${
          theme === "brutalism" ? "rounded-none" : "rounded-xl backdrop-blur-sm"
        }`}
        style={{
          rotateX: springProps.rotateX,
          rotateY: springProps.rotateY,
          scale: springProps.scale,
          z: springProps.zIndex,
          boxShadow:
            theme === "brutalism"
              ? isHovered
                ? "4px 4px 0 #000, 0 0 0 1px #000"
                : "3px 3px 0 #000, 0 0 0 1px #000"
              : isHovered
              ? `0 10px 25px -5px ${config.glowColor}, 0 8px 10px -6px ${config.glowColor}`
              : theme === "dark"
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          transform: theme === "brutalism" ? "translateZ(10px)" : "none",
          transition: theme === "brutalism" ? "all 0.2s ease" : "none",
        }}
      >
        {/* Card content */}
        <div className="flex flex-col items-center p-2">
          {/* Icon */}
          <div
            className={`w-16 h-16 flex items-center justify-center ${
              theme === "brutalism" ? "border border-black" : "rounded-full"
            } bg-gradient-to-br ${color} mb-3`}
          >
            <Icon
              className={`w-8 h-8 tech-icon ${
                theme === "brutalism" ? "text-black" : ""
              }`}
            />
          </div>

          {/* Skill name */}
          <h3
            className={`text-lg font-bold mb-1 ${
              theme === "dark"
                ? "text-white"
                : theme === "brutalism"
                ? "text-black"
                : "text-gray-800"
            }`}
            style={{
              WebkitTextStroke: theme === "brutalism" ? "0.3px #000" : "none",
              textShadow: theme === "brutalism" ? "0.5px 0.5px 0 #000" : "none",
            }}
          >
            {name}
          </h3>

          {/* Level indicator */}
          {level && (
            <div
              className={`w-full ${
                theme === "dark"
                  ? "bg-gray-700/50"
                  : theme === "brutalism"
                  ? "bg-gray-300 border-t border-b border-l-2 border-r-2 border-black"
                  : "bg-gray-200"
              } ${theme === "brutalism" ? "h-2" : "h-1.5 rounded-full"}`}
            >
              <div className={getLevelStyles()}></div>
            </div>
          )}

          {/* Optional description */}
          {description && (
            <p
              className={`text-sm mt-3 text-center ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Extra glow effect when hovered */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${config.glowColor} 0%, transparent 70%)`,
            opacity: isHovered ? config.glowIntensity : 0,
            transition: "opacity 0.4s ease",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Skill3DCard;
