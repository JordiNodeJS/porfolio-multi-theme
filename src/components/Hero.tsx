import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Hero = () => {
  const { data } = usePortfolioData();

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-28"
    >
      {" "}
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-bg-gradient opacity-20"></div>
        <div className="absolute inset-0 hero-bg-gradient opacity-10"></div>
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 },
        }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 },
        }}
        className="absolute top-1/2 right-10 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
      />
      <div className="container-custom relative z-10">
        {" "}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <span className="text-primary-400 font-medium text-lg md:text-xl">
              👋 Hola, soy
            </span>
          </motion.div>

          {/* Main Content with Photo and Title */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-8">
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-500 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-2">
                <img
                  src="/src/assets/developer.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            {/* Name and Title */}
            <div className="text-center lg:text-left">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4"
              >
                <span className="gradient-text">
                  {data?.presentation.name || "JORGe"}
                </span>
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-300"
              >
                {data?.presentation.title || "Frontend React Developer"}
              </motion.h2>
            </div>
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed text-center"
          >
            {data?.presentation.description ||
              "Creando experiencias digitales excepcionales con React y tecnologías modernas"}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.a
              href="#projects"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
            >
              <span className="text-sm mb-2">Ver Proyectos</span>
              <ChevronDown className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
