import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { usePortfolioTranslations } from "../hooks/usePortfolioTranslations";

const Hero = () => {
  const { theme } = useTheme();
  const { hero } = usePortfolioTranslations();

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
          : "bg-gradient-to-br from-[#6e4c30] via-[#8b5e3c] to-[#4a5240]"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 opacity-20 ${
            theme === "dark"
              ? "hero-bg-gradient"
              : theme === "light"
              ? "bg-gradient-to-br from-blue-50/50 to-purple-50/50"
              : "bg-gradient-to-br from-[#a78a21]/30 to-[#d27c54]/30"
          }`}
        ></div>
        <div
          className={`absolute inset-0 opacity-10 ${
            theme === "dark"
              ? "hero-bg-gradient"
              : theme === "light"
              ? "bg-gradient-to-br from-primary-50/30 to-purple-50/30"
              : "bg-gradient-to-br from-[#e3b505]/20 to-[#94a197]/20"
          }`}
        ></div>
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className={`absolute top-20 left-10 w-20 h-20 rounded-full blur-xl ${
          theme === "dark" ? "bg-primary-500/10" : 
          theme === "light" ? "bg-primary-400/20" :
          "bg-[#e3b505]/20"
        }`}
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 },
        }}
        className={`absolute bottom-20 right-20 w-32 h-32 rounded-full blur-xl ${
          theme === "dark" ? "bg-purple-500/10" : 
          theme === "light" ? "bg-purple-400/20" :
          "bg-[#d27c54]/20"
        }`}
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 },
        }}
        className={`absolute top-1/2 right-10 w-16 h-16 rounded-full blur-xl ${
          theme === "dark" ? "bg-pink-500/10" : 
          theme === "light" ? "bg-pink-400/20" :
          "bg-[#a78a21]/20"
        }`}
      />
      <div className="container-custom relative z-10">
        {" "}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {" "}
          {/* Greeting */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <span
              className={`font-medium text-lg md:text-xl ${
                theme === "dark" ? "text-primary-400" : 
                theme === "light" ? "text-primary-600" :
                "text-[#e3b505]"
              }`}
            >
              👋 {hero.greeting}
            </span>
          </motion.div>
          {/* Main Content with Photo and Title - Improved Layout */}
          <div className="flex flex-col items-center justify-center mb-12">
            {/* Profile Image - Centered and Enhanced */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-8 flex-shrink-0"
            >
              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-full animate-spin-slow ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-primary-400 via-purple-500 to-primary-400"
                    : theme === "light"
                    ? "bg-gradient-to-r from-primary-500 via-purple-600 to-primary-500"
                    : "bg-gradient-to-r from-[#e3b505] via-[#d27c54] to-[#e3b505]"
                }`}
              ></div>

              {/* Inner Container */}
              <div
                className={`absolute inset-2 rounded-full p-3 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-800 to-gray-900"
                    : theme === "light"
                    ? "bg-gradient-to-br from-white to-gray-50"
                    : "bg-gradient-to-br from-[#8b5e3c] to-[#6e4c30]"
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/src/assets/developer.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Subtle overlay for better integration */}
                  <div
                    className={`absolute inset-0 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-t from-slate-900/20 to-transparent"
                        : theme === "light"
                        ? "bg-gradient-to-t from-gray-100/20 to-transparent"
                        : "bg-gradient-to-t from-[#4a5240]/20 to-transparent"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-primary-400 to-purple-500"
                    : theme === "light"
                    ? "bg-gradient-to-r from-primary-500 to-purple-600"
                    : "bg-gradient-to-r from-[#e3b505] to-[#d27c54]"
                }`}
              ></div>
            </motion.div>

            {/* Name and Title - Centered Layout */}
            <div className="text-center max-w-4xl">
              {" "}
              <motion.h1
                variants={itemVariants}
                className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight ${
                  theme === "dark" ? "text-white" : 
                  theme === "light" ? "text-gray-900" :
                  "text-[#f3ebd3]"
                }`}
              >
                <span className="gradient-text">{hero.name}</span>
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 ${
                  theme === "dark" ? "text-gray-300" : 
                  theme === "light" ? "text-gray-700" :
                  "text-[#f3ebd3]/90"
                }`}
              >
                {hero.title}
              </motion.h2>
              {/* Decorative Line */}
              <motion.div
                variants={itemVariants}
                className={`w-24 h-1 mx-auto rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-primary-400 to-purple-500"
                    : theme === "light"
                    ? "bg-gradient-to-r from-primary-500 to-purple-600"
                    : "bg-gradient-to-r from-[#e3b505] to-[#d27c54]"
                }`}
              ></motion.div>
            </div>
          </div>
          {/* Description */}{" "}
          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl mb-16 max-w-4xl mx-auto leading-relaxed text-center ${
              theme === "dark" ? "text-gray-400" : 
              theme === "light" ? "text-gray-600" :
              "text-[#f3ebd3]/80"
            }`}
          >
            {hero.subtitle}
          </motion.p>
          {/* Scroll Down Indicator */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.a
              href="#projects"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex flex-col items-center transition-colors duration-300 cursor-pointer group ${
                theme === "dark"
                  ? "text-gray-400 hover:text-primary-400"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              <span className="text-sm mb-2 font-medium">
                {hero.viewProjects}
              </span>
              <div
                className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark"
                    ? "bg-slate-800/50 group-hover:bg-primary-500/20"
                    : "bg-gray-100 group-hover:bg-primary-100"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
