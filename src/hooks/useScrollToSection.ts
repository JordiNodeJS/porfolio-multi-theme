import { useCallback } from "react";

/**
 * Hook personalizado para manejar navegación con offset de la barra de navegación
 * Soluciona el problema de que los títulos de sección se oculten detrás de la navegación fija
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      // Calcular la altura de la navegación dinámicamente
      const navigation = document.querySelector("nav");
      const navHeight = navigation?.getBoundingClientRect().height || 80;

      // Agregar un offset adicional para padding visual
      const extraPadding = 20;
      const totalOffset = navHeight + extraPadding;

      // Obtener la posición del elemento
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - totalOffset;

      // Scroll suave a la posición con offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
};

export default useScrollToSection;
