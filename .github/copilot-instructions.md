# Copilot Instructions for Portfolio Project

## 🛠️ Tech Stack & Tools

**IMPORTANTE**: Este proyecto utiliza **BUN** como package manager y runtime, NO npm o yarn.

### Core Technologies

- **Package Manager**: Bun (siempre usar `bun install`, `bun dev`, etc.)
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React (reemplaza a `react-icons`)

### Commands to Remember

```bash
# Install dependencies
bun install [package-name]

# Development
bun dev

# Build
bun run build

# Add dev dependencies
bun add -d [package-name]
```

### Project Structure

```
src/
  components/     # Componentes reutilizables
  pages/         # Páginas principales
  db/           # Datos JSON locales
  hooks/        # Custom hooks
  utils/        # Utilidades
  types/        # Tipos TypeScript
```

### Data Sources

- Personal info: `src/db/db.json`
- Skills: `src/db/skills.json`
- Experience: `src/db/experience.json`
- Education: `src/db/education.json`

### Design Guidelines

- Modern, clean design
- Dark theme by default
- Smooth animations with Framer Motion
- Mobile-first responsive design
- Performance-oriented

### Next Steps

1. Install animation libraries with Bun
2. Setup TailwindCSS configuration
3. Create component structure
4. Implement hero section with animations
5. Build project showcase with interactive elements

**Always remember**: Use BUN for package management!
