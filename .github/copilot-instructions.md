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

## 🚀 DEPLOYMENT AUTOMÁTICO - PROCESO SIMPLIFICADO

### ✨ Deploy Completamente Automatizado

**¡El deploy ahora es completamente automático!** NO necesitas ejecutar scripts manuales.

#### Proceso de Deploy

1. **Desarrollo local**:
   ```bash
   bun dev  # Desarrollar en http://localhost:5174/
   ```

2. **Confirmar cambios**:
   ```bash
   git add .
   git commit -m "feat: descripción de los cambios"
   ```

3. **Deploy automático**:
   ```bash
   git push origin main
   ```
   
   **¡YA ESTÁ!** GitHub Actions automáticamente:
   - 📦 Detecta los cambios
   - 🔨 Construye el proyecto con Bun
   - 🚀 Despliega a https://jordinodejs.github.io
   - ⚡ Todo listo en ~2 minutos

#### ⚙️ Configuración GitHub Actions

- **Archivo**: `.github/workflows/deploy-external.yml`
- **Trigger**: Push a rama `main`
- **Detecta cambios en**: `src/`, `public/`, `index.html`, `package.json`, etc.
- **Destino**: `jordinodejs.github.io` (dominio principal)

#### 🔍 Verificar Deploy

- **GitHub Actions**: https://github.com/JordiNodeJS/porfolio-multi-theme/actions
- **Sitio web**: https://jordinodejs.github.io
- **Tiempo**: ~2 minutos desde push hasta sitio actualizado

### ❌ QUE NO HACER

- ~~No usar scripts manuales~~ (ya eliminados)
- ~~No ejecutar comandos de deploy~~ 
- ~~No configurar nada manualmente~~

**Solo usa: `git push origin main` y el resto es automático**

**Solo usa: `git push origin main` y el resto es automático**

### Project Structure

```
src/
  components/     # Componentes reutilizables
  pages/         # Páginas principales
  db/           # Datos JSON locales (migrados a i18n)
  hooks/        # Custom hooks
  utils/        # Utilidades
  types/        # Tipos TypeScript
  i18n/         # Internacionalización y traducciones
```

### Data Sources

- **Nuevos datos i18n**: `src/i18n/locales/` (es.json, en.json)
- ~~Personal info: `src/db/db.json`~~ (migrado a i18n)
- ~~Skills: `src/db/skills.json`~~ (migrado a i18n)
- ~~Experience: `src/db/experience.json`~~ (migrado a i18n)
- ~~Education: `src/db/education.json`~~ (migrado a i18n)

### Design Guidelines

- Modern, clean design
- Dark theme by default
- Smooth animations with Framer Motion
- Mobile-first responsive design
- Performance-oriented

### Version Control and Testing

- **Versión actual**: `1.0.0` (package.json)
- **Testing**: Playwright automático en CI/CD
- **Verification**: Console logs para verificar deployments

**Always remember**: Use BUN for package management and `git push origin main` for automatic deployment!
