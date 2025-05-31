# 🚀 Portfolio Moderno con Animaciones

Un portfolio impresionante y moderno construido con React, TypeScript, Framer Motion y TailwindCSS.

## ✨ Características Implementadas

### 🎨 Diseño y UX

- ✅ **Diseño moderno** con efectos de vidrio (glass morphism)
- ✅ **Tema oscuro/claro** con transiciones suaves
- ✅ **Animaciones impresionantes** usando Framer Motion
- ✅ **Responsive design** optimizado para todos los dispositivos
- ✅ **Partículas flotantes** de fondo para un efecto visual único
- ✅ **Pantalla de carga** animada para una experiencia pulida

### 🔧 Tecnologías

- ✅ **React 18** con TypeScript
- ✅ **Vite** como build tool
- ✅ **Framer Motion** para animaciones
- ✅ **TailwindCSS v3** para estilos
- ✅ **Lucide React** para iconos
- ✅ **Bun** como package manager

### 🚀 Funcionalidades

- ✅ **Navegación suave** entre secciones
- ✅ **Efectos hover** interactivos en proyectos y tarjetas
- ✅ **Barras de progreso animadas** para habilidades
- ✅ **Timeline animado** para experiencia
- ✅ **Formulario de contacto** funcional
- ✅ **Botón scroll-to-top** con animaciones
- ✅ **Carga de datos** desde archivos JSON locales

## 📁 Componentes Principales

- **Navigation**: Barra de navegación con efecto glass y menú móvil
- **Hero**: Sección principal con animaciones de entrada y avatar giratorio
- **Projects**: Grid de proyectos con hover effects y filtros por tecnología
- **Skills**: Barras de progreso animadas con niveles de competencia
- **Experience**: Timeline interactivo con tarjetas alternadas
- **Education**: Tarjetas de formación académica con estadísticas
- **Contact**: Formulario funcional con información de contacto
- **ThemeToggle**: Botón para cambiar entre tema oscuro y claro
- **LoadingScreen**: Pantalla de carga con animaciones
- **FloatingParticles**: Partículas de fondo animadas

## 🚀 Instalación y Uso

```bash
# Instalar dependencias con Bun
bun install

# Iniciar servidor de desarrollo
bun dev

# Construir para producción
bun run build

# Vista previa de producción
bun run preview
```

## 🌐 Internacionalización (i18n)

El portfolio ahora utiliza **i18n** para la gestión de idiomas y traducciones. Todo el contenido textual y los datos de secciones como Skills, Experience, Education y Contact están centralizados en archivos de localización:

- `src/i18n/locales/es.json` — Español
- `src/i18n/locales/en.json` — Inglés
- (y otros idiomas disponibles)

Puedes agregar o modificar textos y datos directamente en estos archivos para personalizar el contenido en cada idioma.

### 🛠️ Migración de datos

- Los antiguos archivos JSON en `src/db/` han sido migrados a los archivos de localización.
- Ahora toda la información de habilidades, experiencia, educación y textos de UI se gestiona desde los archivos de localización.

## 📝 Personalización

Edita los archivos de localización en `src/i18n/locales/` para personalizar el contenido y las traducciones:

- `es.json`: Español
- `en.json`: Inglés
- (otros idiomas disponibles)

Ejemplo de estructura para la sección Skills:

```json
"skills": {
  "title": "Habilidades Técnicas",
  "subtitle": "Tecnologías y herramientas con las que trabajo",
  "competenceLevel": "Nivel de Competencia",
  "techStack": "Stack Tecnológico",
  "methodologies": "Metodologías y Herramientas",
  "categories": {
    "frontend": "Frontend",
    "backend": "Backend",
    "tools": "Herramientas",
    "databases": "Bases de Datos"
  }
}
```

---

⭐ **Portfolio completamente funcional, multilenguaje y con animaciones modernas!**

🚀 **Servidor corriendo en:** http://localhost:5173/
