import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";

const Hero = () => {
  const { theme } = useTheme();
  const { hero } = usePortfolioTranslations();
  const circleControls = useAnimation();
  const imageControls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-28 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : theme === "light"
          ? "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          : theme === "brutalism"
          ? "hero-bg-gradient brutalism-pulse"
          : "bg-gradient-to-br from-retroPastel-background to-retroPastel-background/90"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "hero-bg-gradient"
              : theme === "light"
              ? "bg-gradient-to-br from-blue-50/50 to-purple-50/50"
              : theme === "brutalism"
              ? "hero-bg-gradient"
              : "bg-gradient-to-br from-retroPastel-custard/5 via-retroPastel-background/95 to-retroPastel-lavender/5"
          }`}
        ></div>
        {theme === "retro-pastel" && (
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233d2c2c' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34H0v-2h6v-4H4v-2h2v4h2v2zm10-24V4h-2v4h-4v2h4v4h2V6h4V4h-4zM6 24H0v-2h6v-4H4v-2h2v4h2v2zm30-4v2h6v-2h-6z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        )}
        {theme === "brutalism" && (
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.1) 35px, rgba(0,0,0,0.1) 70px)",
              }}
            ></div>
            <div className="absolute top-10 left-10 w-16 h-16 bg-black border-4 border-white brutalism-glow transform rotate-45"></div>
            <div className="absolute bottom-20 right-10 w-12 h-12 bg-brutalism-red border-3 border-black transform -rotate-12"></div>
            <div className="absolute top-1/3 right-20 w-8 h-8 bg-brutalism-cyan border-2 border-black transform rotate-12"></div>
          </>
        )}
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className={`absolute top-20 left-10 w-20 h-20 rounded-full blur-xl ${
          theme === "dark"
            ? "bg-primary-500/10"
            : theme === "light"
            ? "bg-primary-400/20"
            : theme === "brutalism"
            ? "bg-brutalism-red/30 blur-none border-4 border-black"
            : "bg-retroPastel-custard/20"
        }`}
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 },
        }}
        className={`absolute bottom-20 right-20 w-32 h-32 rounded-full blur-xl ${
          theme === "dark"
            ? "bg-purple-500/10"
            : theme === "light"
            ? "bg-purple-400/20"
            : theme === "brutalism"
            ? "bg-brutalism-cyan/30 blur-none border-4 border-black transform skew-x-12"
            : "bg-retroPastel-pink/20"
        }`}
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 },
        }}
        className={`absolute top-1/2 right-10 w-16 h-16 rounded-full blur-xl ${
          theme === "dark"
            ? "bg-pink-500/10"
            : theme === "light"
            ? "bg-pink-400/20"
            : "bg-retroPastel-lavender/20"
        }`}
      />
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          style={{
            color: theme === 'dark' ? '#ffffff' : '#1a202c',
            lineHeight: '1.2'
          }}
        >
          JORGE
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
          style={{
            color: theme === 'dark' ? '#e2e8f0' : '#4a5568'
          }}
        >
          Frontend React Engineer
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
