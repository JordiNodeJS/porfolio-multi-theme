import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Save, Eye, Settings } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useUserPreferences } from "../hooks/useUserPreferences";

const PreferencesDemo: React.FC = () => {
  const { theme } = useTheme();
  const { preferences } = useUserPreferences();
  const [lastSaved, setLastSaved] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the demo component after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update the last saved timestamp when preferences change
    setLastSaved(new Date().toLocaleTimeString());
  }, [preferences]);

  const demoSteps = [
    {
      icon: Settings,
      title: "Cambiar tema",
      description: "Usa el botón de tema en la navegación",
      status: "completed",
    },
    {
      icon: Save,
      title: "Guardado automático",
      description: "Las preferencias se guardan en localStorage",
      status: "completed",
    },
    {
      icon: Eye,
      title: "Persistencia",
      description: "Recarga la página para ver que se mantienen",
      status: "pending",
    },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`fixed top-20 right-4 w-80 p-4 rounded-lg border shadow-lg z-40 ${
        theme === "dark"
          ? "bg-slate-800/95 border-slate-700/50 backdrop-blur-sm"
          : theme === "light"
          ? "bg-white/95 border-gray-200/50 backdrop-blur-sm"
          : theme === "vintage"
          ? "bg-amber-900/95 border-amber-800/50 backdrop-blur-sm"
          : theme === "retro-pastel"
          ? "bg-pink-100/95 border-pink-200/50 backdrop-blur-sm"
          : "bg-yellow-200 border-black border-2"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold text-sm">Preferencias de Usuario</h3>
        <motion.button
          onClick={() => setIsVisible(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-auto text-gray-500 hover:text-gray-700 text-xs"
        >
          ✕
        </motion.button>
      </div>

      {/* Current Preferences */}
      <div className="mb-4 p-3 rounded-lg bg-black/10 dark:bg-white/10">
        <h4 className="font-semibold text-xs mb-2">Estado Actual:</h4>
        <div className="space-y-1 text-xs">
          <div>
            🎨 Tema: <strong>{preferences.theme}</strong>
          </div>
          <div>
            🌐 Idioma: <strong>{preferences.language}</strong>
          </div>
          <div>
            ⏰ Guardado: <strong>{lastSaved}</strong>
          </div>
        </div>
      </div>

      {/* Demo Steps */}
      <div className="space-y-2">
        <h4 className="font-semibold text-xs mb-2">Demo de localStorage:</h4>
        {demoSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`flex items-center gap-2 p-2 rounded text-xs ${
              step.status === "completed"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-800/30"
            }`}
          >
            <step.icon className="w-4 h-4 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium">{step.title}</div>
              <div className="text-xs opacity-75">{step.description}</div>
            </div>
            {step.status === "completed" && (
              <Check className="w-4 h-4 text-green-600" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Storage Info */}
      <div className="mt-3 pt-3 border-t border-current/20">
        <div className="text-xs opacity-75">
          <div>📦 Almacenamiento: localStorage</div>
          <div>🔑 Clave: 'portfolio-user-preferences'</div>
          <div>💾 Tamaño: ~{JSON.stringify(preferences).length} bytes</div>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferencesDemo;
