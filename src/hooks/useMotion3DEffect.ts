import { useState, useRef, useEffect } from "react";
import type { RefObject } from "react";
import { useMotionValue, useTransform, useAnimation } from "framer-motion";

interface Motion3DOptions {
  strength?: number;
  rotateLimit?: number;
  perspective?: number;
  scaleFactor?: number;
  zAxisMovement?: number;
  tiltReverse?: boolean;
  resetOnLeave?: boolean;
  breatheAnimation?: boolean;
  breatheScale?: number;
  breatheDuration?: number;
  glowOnHover?: boolean;
  glowColor?: string;
  glowIntensity?: number;
}

export const useMotion3DEffect = (
  ref: RefObject<HTMLElement>,
  options: Motion3DOptions = {}
) => {
  // Default options with sensible values - reduced intensity for smoother experience
  const {
    strength = 15, // Reduced from 25 for smoother motion
    rotateLimit = 8, // Reduced from 15 for less extreme rotation
    perspective = 1000,
    scaleFactor = 1.02, // Reduced from 1.05 for subtler scaling
    zAxisMovement = 15, // Reduced from 30 for gentler depth
    tiltReverse = false,
    resetOnLeave = true,

    breatheAnimation = true,
    breatheScale = 1.015, // Reduced breathing scale for subtlety
    breatheDuration = 4000, // Slower breathing for calmer effect
    glowOnHover = true,
    glowColor = "rgba(59, 130, 246, 0.5)", // Default blue glow
    glowIntensity = 0.5, // Reduced intensity
  } = options;

  // State to track if mouse is over the element
  const [isHovered, setIsHovered] = useState(false);

  // Timer ref for breathing animation
  const breatheTimerRef = useRef<number | null>(null);

  // Calculate transform multiplier based on tilt direction
  const tiltMultiplier = tiltReverse ? -1 : 1;

  // Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);
  const zIndex = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [rotateLimit * tiltMultiplier, -rotateLimit * tiltMultiplier]
  );

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-rotateLimit * tiltMultiplier, rotateLimit * tiltMultiplier]
  );

  // Animation controls for programmatic animations
  const controls = useAnimation();

  // Animation for breathing effect when not hovered
  const startBreathingAnimation = () => {
    if (!breatheAnimation || isHovered) return;

    let isIncreasing = true;
    const animate = async () => {
      if (isHovered) return;

      scale.set(isIncreasing ? breatheScale : 1);
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

      // Apply easing to mouse movement for smoother transitions
      const easedX = x * 0.7; // Reduce sensitivity
      const easedY = y * 0.7;

      // Update motion values with smoothed values
      mouseX.set(easedX);
      mouseY.set(easedY);
      scale.set(scaleFactor);
      zIndex.set(zAxisMovement);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      stopBreathingAnimation();

      // Smooth transition into hover state
      setTimeout(() => {
        scale.set(scaleFactor);
        zIndex.set(zAxisMovement);
      }, 50);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      if (resetOnLeave) {
        // Smooth transition out of hover state
        const smoothReset = () => {
          mouseX.set(0);
          mouseY.set(0);
          scale.set(1);
          zIndex.set(0);
        };

        // Add slight delay for smoother transition
        setTimeout(smoothReset, 100);
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
    mouseX,
    mouseY,
    scale,
    zIndex,
    strength,
    rotateLimit,
    tiltMultiplier,
    scaleFactor,
    zAxisMovement,
    resetOnLeave,
    breatheAnimation,
    isHovered,
  ]);

  // Return motion values and config - compatible with previous API
  return {
    motionProps: {
      style: {
        rotateX,
        rotateY,
        scale,
        z: zIndex,
      },
    },
    // Legacy compatibility - transform motion values to spring-like props
    springProps: {
      rotateX,
      rotateY,
      scale,
      zIndex,
    },
    isHovered,
    controls,
    config: {
      perspective,
      glowOnHover,
      glowColor: isHovered && glowOnHover ? glowColor : "transparent",
      glowIntensity: isHovered && glowOnHover ? glowIntensity : 0,
    },
  };
};

export default useMotion3DEffect;
