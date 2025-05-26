# 🎨 Tema Brutalism - Inspirado en RetroUI

> **🆕 TIPOGRAFÍA MEJORADA v1.1** ✅  
> Se ha optimizado la legibilidad de los títulos manteniendo el impacto visual brutal

## 📋 Descripción

El tema **Brutalism** es una implementación audaz y vibrante inspirada en el diseño web brutalist y los estilos de [RetroUI.dev](https://www.retroui.dev/docs). Este tema transforma tu portfolio en una experiencia visual impactante con:

### 🎯 Mejoras Recientes (v1.1)

- ✅ **Tipografía optimizada**: Reducción de capas de sombra para mejor legibilidad
- ✅ **Nuevas clases**: `.brutalism-heading-large`, `.brutalism-heading-clean`, `.brutalism-text`
- ✅ **Mejor contraste**: Color negro forzado con `!important` para máxima legibilidad
- ✅ **Diseño responsive**: Tamaños adaptativos con `clamp()` para títulos principales

## ✨ Características Principales

### 🎨 Paleta de Colores

- **Rojo vibrante**: `#ff6b6b` - Para elementos de acento y sombras
- **Cian brillante**: `#4ecdc4` - Para efectos secundarios y contraste
- **Azul dinámico**: `#45b7d1` - Para elementos interactivos
- **Verde menta**: `#96ceb4` - Para elementos de soporte
- **Amarillo intenso**: `#ffeaa7` - Para destacar contenido importante
- **Negro absoluto**: `#000000` - Para contornos y texto
- **Blanco puro**: `#ffffff` - Para contrastes y efectos

### 🔥 Efectos Visuales

#### Fondos Animados

- Gradientes rotatorios con múltiples colores
- Patrones geométricos en diagonal
- Animación de fondo que se mueve constantemente

#### Sombras Multicapa

- Sombras escalonadas en diferentes colores
- Efectos de profundidad con múltiples capas
- Sombras de texto con contornos marcados

#### Transformaciones Geométricas

- Elementos con `skew()` para darles ángulos
- Rotaciones dinámicas
- Escalado en hover para interactividad

### 🎭 Componentes Especiales

#### `.brutalism-card`

```css
background: linear-gradient(45deg, #ffeaa7, #96ceb4);
border: 4px solid #000000;
box-shadow: 8px 8px 0px #ff6b6b, 12px 12px 0px #000000;
transform: skew(-1deg, 1deg);
```

#### `.brutalism-button`

```css
background: linear-gradient(45deg, #4ecdc4, #45b7d1);
border: 3px solid #000000;
color: #000000;
font-weight: 900;
text-shadow: 2px 2px 0px #ffffff;
box-shadow: 4px 4px 0px #ff6b6b;
transform: skew(-3deg);
```

#### `.brutalism-heading`

**UPDATED FOR BETTER LEGIBILITY** 📖

```css
font-weight: 900;
text-transform: uppercase;
letter-spacing: 2px;
/* Improved legibility - reduced shadow layers */
text-shadow: 2px 2px 0px #ffffff, 4px 4px 0px #ff6b6b;
transform: skew(-1deg);
color: #000000 !important;
```

#### `.brutalism-heading-large`

Para títulos principales con mayor impacto visual:

```css
font-weight: 900;
text-transform: uppercase;
letter-spacing: 3px;
text-shadow: 3px 3px 0px #ffffff, 6px 6px 0px #ff6b6b;
transform: skew(-2deg);
color: #000000 !important;
font-size: clamp(2rem, 5vw, 4rem);
```

#### `.brutalism-heading-clean`

Estilo alternativo con fondo para máxima legibilidad:

```css
font-weight: 800;
text-transform: uppercase;
letter-spacing: 1.5px;
text-shadow: 2px 2px 0px #ff6b6b;
color: #000000 !important;
background: linear-gradient(45deg, #ffeaa7, #ffffff);
padding: 0.5rem 1rem;
border: 3px solid #000000;
display: inline-block;
transform: skew(-1deg);
```

#### `.brutalism-text`

Para texto del cuerpo con sutiles efectos brutalist:

```css
font-weight: 700;
text-shadow: 1px 1px 0px #ffffff;
color: #000000 !important;
```

### 🎬 Animaciones

#### `brutalGradient`

Animación de fondo que rota entre los colores principales cada 15 segundos.

#### `brutalGlow`

Efecto de brillo pulsante que alterna entre diferentes colores de sombra.

#### `brutalShake`

Animación de vibración sutil para elementos interactivos.

#### `brutalPulse`

Efecto de pulso que cambia el matiz y la escala de los elementos.

### 🎯 Elementos Únicos

#### Scrollbar Personalizado

- Ancho de 12px (más grueso que otros temas)
- Fondo con gradiente de colores brutalism
- Bordes negros marcados
- Efecto hover con inversión de colores

#### Navegación Especial

- Fondo con gradiente horizontal
- Bordes superiores e inferiores contrastantes
- Patrón diagonal superpuesto
- Links con efectos de sombra múltiple

#### Efectos de Vidrio Brutalist

- Sin blur (diferente a otros temas)
- Bordes gruesos y negros
- Sombras escalonadas en colores vibrantes
- Transformación skew para darle carácter

## 🚀 Cómo Usar el Tema

### Activación

1. Haz clic en el botón de cambio de tema (ícono de rayo ⚡)
2. Cicla hasta llegar al tema "brutalism"
3. ¡Disfruta de la experiencia visual brutalist!

### Componente Demo

Al activar el tema por primera vez, aparecerá un modal de demostración que muestra las características principales.

### Classes CSS Disponibles

```css
/* Tarjetas */
.brutalism-card
.brutalism-card-alt

/* Botones */
.brutalism-button

/* Títulos */
.brutalism-heading

/* Animaciones */
.brutalism-glow
.brutalism-shake
.brutalism-pulse

/* Navegación */
.nav-link-brutal;
```

## 🎨 Inspiración

Este tema está inspirado en:

- **RetroUI.dev** - Biblioteca de componentes retro y brutalist
- **Diseño Web Brutalist** - Movimiento que enfatiza la funcionalidad sobre la decoración
- **Memphis Design** - Estilo de los 80s con colores vibrantes y formas geométricas
- **Neobrutalism** - Evolución moderna del brutalism aplicado al diseño digital

## 🔧 Personalización

Para personalizar el tema brutalism, modifica las variables en `src/index.css`:

```css
/* Cambia los colores principales */
[data-theme="brutalism"] {
  --brutal-red: #ff6b6b;
  --brutal-cyan: #4ecdc4;
  --brutal-blue: #45b7d1;
  --brutal-green: #96ceb4;
  --brutal-yellow: #ffeaa7;
}
```

## 💡 Consejos de Uso

1. **Menos es más**: Aunque el tema es vibrante, úsalo estratégicamente
2. **Contraste**: Asegúrate de que el texto sea legible sobre los fondos coloridos
3. **Interactividad**: Los elementos hover tienen efectos especiales
4. **Responsividad**: El tema está optimizado para todos los dispositivos

## 🐛 Problemas Conocidos

- En algunos navegadores muy antiguos, las animaciones CSS pueden no funcionar correctamente
- El alto contraste puede ser intenso para sesiones prolongadas de navegación
- Recomendado para portfolios creativos y proyectos experimentales

---

**¡Disfruta del poder del Brutalism! 🔥⚡**
