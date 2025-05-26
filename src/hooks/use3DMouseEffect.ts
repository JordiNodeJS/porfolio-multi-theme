import { useState, useEffect } from "react";
import type { RefObject } from "react";

interface Mouse3DEffectOptions {
  intensity?: number;
  resetOnLeave?: boolean;
  perspective?: number;
}

/**
 * Hook para crear un efecto 3D basado en la posición del ratón
 * @param ref Referencia al elemento que tendrá el efecto 3D
 * @param options Opciones de configuración
 * @returns Valores de transformación para aplicar al elemento
 */
const use3DMouseEffect = (
  ref: RefObject<HTMLElement>,
  options: Mouse3DEffectOptions = {}
) => {
  const { intensity = 20, resetOnLeave = true, perspective = 1000 } = options;

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Calcular la posición relativa del mouse dentro del elemento (de -1 a 1)
      const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Aplicar la rotación inversa para un efecto más natural
      setTransform({
        rotateX: -relY * intensity,
        rotateY: relX * intensity,
        scale: 1.05,
        z: 30,
      });
    };

    const handleMouseLeave = () => {
      if (resetOnLeave) {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1, z: 0 });
      }
    };

    // Aplicar los eventos
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, intensity, resetOnLeave, perspective]);

  return transform;
};

export default use3DMouseEffect;
