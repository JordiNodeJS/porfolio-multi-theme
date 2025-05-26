import { useEffect } from "react";
import { useTheme } from "./useTheme";

export const useBrutalismEffects = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "brutalism") {
      // Agregar efectos especiales al body
      document.body.classList.add("brutalism-active");

      // Crear partículas flotantes de colores brutalism
      const createBrutalParticle = () => {
        const particle = document.createElement("div");
        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${color};
          border: 2px solid #000000;
          z-index: 1000;
          pointer-events: none;
          left: ${Math.random() * 100}vw;
          top: 100vh;
          animation: brutalFloat 5s linear infinite;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      };

      // Crear CSS para la animación de partículas
      const style = document.createElement("style");
      style.textContent = `
        @keyframes brutalFloat {
          to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Crear partículas cada 2 segundos
      const particleInterval = setInterval(createBrutalParticle, 2000);

      // Cleanup cuando cambie el tema
      return () => {
        document.body.classList.remove("brutalism-active");
        clearInterval(particleInterval);
        document.head.removeChild(style);

        // Remover partículas existentes
        const particles = document.querySelectorAll(
          'div[style*="brutalFloat"]'
        );
        particles.forEach((particle) => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }
  }, [theme]);

  return {
    isBrutalism: theme === "brutalism",
    addBrutalEffect: (
      element: HTMLElement,
      effectType: "shake" | "glow" | "pulse"
    ) => {
      if (theme === "brutalism") {
        element.classList.add(`brutalism-${effectType}`);
        setTimeout(
          () => {
            element.classList.remove(`brutalism-${effectType}`);
          },
          effectType === "shake" ? 500 : 2000
        );
      }
    },
  };
};
