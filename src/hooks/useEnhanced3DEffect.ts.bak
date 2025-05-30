import { useState, useRef, useEffect } from "react";
import type { RefObject } from "react";
import { useSpring } from "@react-spring/web";

interface Enhanced3DOptions {
  strength?: number;
  rotateLimit?: number;
  perspective?: number;
  scaleFactor?: number;
  zAxisMovement?: number;
  tiltReverse?: boolean;
  resetOnLeave?: boolean;
  dampingFactor?: number;
  stiffnessFactor?: number;
  breatheAnimation?: boolean;
  breatheScale?: number;
  breatheDuration?: number;
  glowOnHover?: boolean;
  glowColor?: string;
  glowIntensity?: number;
}

export const useEnhanced3DEffect = (
  ref: RefObject<HTMLElement>,
  options: Enhanced3DOptions = {}
) => {
  // Default options with sensible values
  const {
    strength = 25,
    rotateLimit = 15,
    perspective = 1000,
    scaleFactor = 1.05,
    zAxisMovement = 30,
    tiltReverse = false,
    resetOnLeave = true,
    dampingFactor = 15,
    stiffnessFactor = 130,
    breatheAnimation = true,
    breatheScale = 1.03,
    breatheDuration = 3000,
    glowOnHover = true,
    glowColor = "rgba(59, 130, 246, 0.5)", // Default blue glow
    glowIntensity = 0.7,
  } = options;

  // State to track if mouse is over the element
  const [isHovered, setIsHovered] = useState(false);

  // Timer ref for breathing animation
  const breatheTimerRef = useRef<number | null>(null);

  // Calculate transform multiplier based on tilt direction
  const tiltMultiplier = tiltReverse ? -1 : 1;

  // Spring animation for smooth transitions
  const [springProps, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    zIndex: 0,
    config: {
      mass: 1,
      tension: stiffnessFactor,
      friction: dampingFactor,
    },
  }));

  // Animation for breathing effect when not hovered
  const startBreathingAnimation = () => {
    if (!breatheAnimation || isHovered) return;

    let isIncreasing = true;
    const animate = () => {
      if (isHovered) return;

      api.start({
        scale: isIncreasing ? breatheScale : 1,
        config: { duration: breatheDuration },
      });

      isIncreasing = !isIncreasing;
      breatheTimerRef.current = window.setTimeout(animate, breatheDuration);
    };

    animate();
  };

  // Stop breathing animation
  const stopBreathingAnimation = () => {
    if (breatheTimerRef.current) {
      clearTimeout(breatheTimerRef.current);
      breatheTimerRef.current = null;
    }
  };

  // Effect for mouse movement tracking
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Start breathing if enabled
    if (breatheAnimation) {
      startBreathingAnimation();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Calculate relative position (from -0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Apply rotation and limit values
      const rotateY = Math.min(
        Math.max(x * strength * tiltMultiplier, -rotateLimit),
        rotateLimit
      );
      const rotateX = Math.min(
        Math.max(-y * strength * tiltMultiplier, -rotateLimit),
        rotateLimit
      );

      // Update spring animation
      api.start({
        rotateX,
        rotateY,
        scale: scaleFactor,
        zIndex: zAxisMovement,
        immediate: false,
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      stopBreathingAnimation();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      if (resetOnLeave) {
        api.start({
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          zIndex: 0,
        });
      }

      if (breatheAnimation) {
        startBreathingAnimation();
      }
    };

    // Add event listeners
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      stopBreathingAnimation();
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    ref,
    api,
    strength,
    rotateLimit,
    tiltMultiplier,
    scaleFactor,
    zAxisMovement,
    resetOnLeave,
    breatheAnimation,
    isHovered,
  ]);

  return {
    springProps,
    isHovered,
    config: {
      perspective,
      glowOnHover,
      glowColor: isHovered && glowOnHover ? glowColor : "transparent",
      glowIntensity: isHovered && glowOnHover ? glowIntensity : 0,
    },
  };
};

export default useEnhanced3DEffect;
