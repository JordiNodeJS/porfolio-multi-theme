import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Animation variants for the J letter
  const jVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  // Floating particles around the J
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    duration: 2 + Math.random() * 2,
    radius: 50 + Math.random() * 80,
    angle: i * 45 * (Math.PI / 180),
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center"
        >
          <div className="text-center relative">
            {/* Animated J letter with SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
              >
                <motion.path
                  d="M50 20 L50 70 Q50 90 30 90 Q10 90 10 70 L10 65"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={jVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* Dot for the J */}
                <motion.circle
                  cx="50"
                  cy="10"
                  r="5"
                  fill="url(#gradient)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, ease: "backOut" }}
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating particles around the J */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1, 1, 0],
                    x: Math.cos(particle.angle) * particle.radius,
                    y: Math.sin(particle.angle) * particle.radius,
                    opacity: [0, 0.8, 0.8, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)`,
                    filter: "blur(1px)",
                  }}
                />
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Jorge Portfolio
              </h1>
              <p className="text-slate-400 text-lg">Cargando experiencia...</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-64 mx-auto mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="w-full bg-slate-800 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <p className="text-slate-500 text-sm mt-2">
                {Math.round(progress)}%
              </p>
            </motion.div>

            {/* Background floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0.2,
                    x: Math.random() * 800 - 400,
                    y: Math.random() * 600 - 300,
                    scale: 0.5 + Math.random() * 0.5,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    x: Math.random() * 800 - 400,
                    y: Math.random() * 600 - 300,
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-2 h-2 rounded-full blur-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
