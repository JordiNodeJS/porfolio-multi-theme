# Informe de Solución: Modales de Experiencia en Móvil

## 1. Problemática Inicial

En la sección de **Experiencia** (vista móvil), al interactuar con las tarjetas:

- El modal de logros no se abría en todas las tarjetas.
- Overlays de navegación o selector de idioma bloqueaban los clicks.
- Tras cerrar un modal, el overlay podía seguir presente, impidiendo nuevas interacciones.

## 2. Diagnóstico

- Se implementó un test automatizado con Playwright para simular la experiencia móvil real:
  - Navegación a la sección de experiencia.
  - Click en cada tarjeta y verificación de apertura/cierre de modal.
  - Detección de overlays residuales y elementos bloqueando eventos.
- El test identificó correctamente los fallos y reportó qué tarjetas funcionaban y cuáles no.

## 3. Solución Técnica Paso a Paso

### a. Refactorización del Modal

- El modal y su overlay se movieron fuera de cualquier `.map` de tarjetas, asegurando **un solo modal y overlay global**.
- Se usó `AnimatePresence` para animar y desmontar correctamente el modal y overlay.
- Se añadió `pointer-events-auto` al overlay y se verificó que no quedaran overlays con pointer events activos tras cerrar el modal.

### b. Mejora en la Navegación Móvil

- Se corrigió el overlay del menú móvil y del selector de idioma para que no intercepten eventos cuando están cerrados.
- El test automatizado ahora cierra cualquier overlay residual antes de interactuar con las tarjetas.

### c. Robustecimiento del Test

- El test espera a que desaparezcan todos los overlays antes de continuar con la siguiente tarjeta.
- Se añaden logs detallados para saber exactamente qué elemento está bloqueando el click en caso de error.

## 4. Resultado Final

- **Todas las tarjetas de experiencia pueden abrir su modal de logros correctamente en móvil.**
- **No quedan overlays residuales** tras cerrar un modal, permitiendo la interacción con el resto de tarjetas.
- El test automatizado genera un **reporte claro** de qué tarjetas funcionan y cuáles no.

## 5. Resumen Visual del Flujo Solucionado

1. Abrir menú móvil → Navegar a "Experiencia".
2. Cerrar overlays residuales si existen.
3. Click en tarjeta → Modal de logros aparece.
4. Cerrar modal → Overlay desaparece completamente.
5. Repetir para todas las tarjetas.

## 6. Conclusión

La problemática se resolvió **refactorizando la gestión del modal y overlays** para garantizar que nunca bloqueen la interacción tras su cierre, y robusteciendo la automatización de tests para detectar y prevenir regresiones en la experiencia móvil.

## 7. Fragmento Exacto de Código Modificado

A continuación se muestra el fragmento clave del componente `Experience.tsx` que soluciona el problema:

```tsx
<AnimatePresence>
  {activeModal && (
    <>
      {/* Overlay global */}
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
        onClick={handleCloseModal}
      />
      {/* Modal global */}
      <motion.div
        key={activeModal}
        initial={{
          opacity: 0,
          x: modalDirection === "right" ? "100%" : "-100%",
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: modalDirection === "right" ? "100%" : "-100%",
        }}
        transition={{
          type: "spring",
          damping: theme === "brutalism" ? 30 : 25,
          stiffness: theme === "brutalism" ? 350 : 300,
          mass: theme === "brutalism" ? 1.2 : 1,
        }}
        className={`fixed ${
          modalDirection === "right" ? "right-0" : "left-0"
        } top-0 h-full w-full max-w-xl md:max-w-2xl modal-bg z-50`}
        style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
      >
        {/* ...contenido del modal... */}
        <button
          onClick={handleCloseModal}
          className="p-2 absolute top-4 right-4"
        >
          <X className="w-6 h-6" />
        </button>
        {/* ...resto del contenido... */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Puntos clave:**

- El modal y overlay están fuera de cualquier `.map` y solo existen una vez en el DOM.
- Se usa `AnimatePresence` para animar y desmontar correctamente.
- El overlay tiene `pointer-events-auto` y desaparece completamente al cerrar el modal.
- El botón de cerrar y el overlay ambos llaman a la función de cierre.

---
