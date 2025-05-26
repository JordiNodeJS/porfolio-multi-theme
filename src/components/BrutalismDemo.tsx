import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

const BrutalismDemo = () => {
  const { theme } = useTheme();
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (theme === "brutalism") {
      // Mostrar el demo solo la primera vez que se cambia a brutalism
      const hasSeenDemo = localStorage.getItem("brutalism-demo-seen");
      if (!hasSeenDemo) {
        setShowDemo(true);
        localStorage.setItem("brutalism-demo-seen", "true");
      }
    }
  }, [theme]);

  if (!showDemo || theme !== "brutalism") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {" "}
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        className="brutalism-card p-8 max-w-2xl w-full mx-4 relative"
      >
        {/* Botón de cierre */}
        <button
          onClick={() => setShowDemo(false)}
          className="absolute top-4 right-4 brutalism-button p-2 w-auto"
        >
          <X className="w-4 h-4" />
        </button>{" "}
        <h1 className="brutalism-heading-large mb-6 text-center">
          ¡BRUTALISM ACTIVATED!
        </h1>
        <div className="space-y-4">
          <p className="brutalism-text text-lg">
            🎨 Bienvenido al tema{" "}
            <span className="brutalism-heading-clean text-xl inline-block">
              BRUTALISM
            </span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button className="brutalism-button py-3 px-6 brutalism-pulse">
              BOTÓN BRUTAL
            </button>
            <button className="brutalism-button py-3 px-6 brutalism-glow">
              OTRO BOTÓN
            </button>
          </div>

          <div className="brutalism-card-alt p-4 mt-4">
            <h3 className="brutalism-heading text-lg mb-2">Características:</h3>
            <ul className="brutalism-text space-y-1">
              <li>• Colores vibrantes y contrastes fuertes</li>
              <li>• Sombras marcadas en múltiples capas</li>
              <li>• Formas geométricas y ángulos</li>
              <li>• Tipografía en mayúsculas y bold</li>
              <li>• Animaciones dinámicas</li>
            </ul>
          </div>

          <motion.div
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-center mt-6"
          >
            <p className="brutalism-text text-lg">
              Inspirado en RetroUI.dev 🚀
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrutalismDemo;
