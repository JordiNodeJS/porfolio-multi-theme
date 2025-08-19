# Despliegue a GitHub Pages

Este documento explica cómo configurar y desplegar el portfolio multi-theme a GitHub Pages.

## 🌐 CONFIGURACIÓN DE DOMINIO

El proyecto está configurado para desplegarse en el **dominio principal** de GitHub Pages:

- **URL del sitio:** https://jordinodejs.github.io (dominio principal)
- **Repositorio fuente:** `porfolio-multi-theme` (código fuente)
- **Repositorio de despliegue:** `jordinodejs.github.io` (sitio web)

## 🎯 MÉTODOS DE DESPLIEGUE

### Método 1: Despliegue al Dominio Principal (RECOMENDADO)

Para desplegar al dominio principal `https://jordinodejs.github.io`:

```bash
# 1. Construir el proyecto con configuración para dominio principal
bun run build

# 2. Desplegar al repositorio principal
bun run deploy:github-pages
```

## ✅ SOLUCIÓN IMPLEMENTADA

**El problema de nombres largos se resolvió configurando:**

```bash
git config --global core.longpaths true
```

### Método 1: Despliegue al Dominio Principal (FUNCIONANDO ✅)

Para desplegar al dominio principal `https://jordinodejs.github.io`:

```bash
# PASO 1: Configurar git para nombres largos (solo una vez)
git config --global core.longpaths true

# PASO 2: Construir y desplegar
bun run build
bun run deploy:main
```

### Método 2: Despliegue a Subdominio (Alternativo)

Para desplegar como subproyecto `https://jordinodejs.github.io/porfolio-multi-theme/`:

```bash
# Cambiar base en vite.config.ts a: "/porfolio-multi-theme/"
# Luego:
bun run build
bun run deploy:self
```

### Configuración en GitHub (OBLIGATORIO después del despliegue)

#### Para Dominio Principal (Método 1):

1. **Ve al repositorio** `jordinodejs.github.io` en GitHub
2. **Settings** → **Pages** (menú lateral izquierdo)
3. **Configurar la fuente:**
   - Source: **"Deploy from a branch"**
   - Branch: **"main"**
   - Folder: **"/ (root)"**
4. **Save**

#### Para Subdominio (Método 2):

1. **Ve al repositorio** `porfolio-multi-theme` en GitHub
2. **Settings** → **Pages** (menú lateral izquierdo)
3. **Configurar la fuente:**
   - Source: **"Deploy from a branch"**
   - Branch: **"gh-pages"**
   - Folder: **"/ (root)"**
4. **Save**

### URL resultante

- **Sitio web:** https://jordinodejs.github.io/porfolio-multi-theme/

## ❌ Métodos que causan errores

### ~~Opción 1: Despliegue al repositorio usuario (NO USAR)~~

```bash
# ❌ ESTE COMANDO FALLA EN WINDOWS
npm run deploy:github-pages  # Error: Filename too long
```

**Error conocido:** `fatal: cannot create directory at 'node_modules/.pnpm/...' Filename too long`

### ~~Opción 2: GitHub Actions~~

Requiere configuración adicional de tokens que no siempre funciona correctamente.

## 🤖 PROMPT PARA AI - DESPLIEGUE AUTOMÁTICO

### Para Dominio Principal (https://jordinodejs.github.io)

Si eres una AI y el usuario te pide "despliega el proyecto a GitHub Pages en el dominio principal", ejecuta EXACTAMENTE estos comandos:

```bash
# PASO 1: Configurar Git para nombres largos (solo si no está configurado)
git config --global core.longpaths true

# PASO 2: Verificar configuración
cd /ruta/al/proyecto/porfolio-multi-theme

# PASO 3: Verificar que vite.config.ts tenga base: "/"
# (para dominio principal)

# PASO 4: Construir y desplegar
git add . && git commit -m "Update portfolio for main domain deployment"
bun run build
bun run deploy:main

# PASO 5: Informar al usuario
echo "✅ Despliegue completado a https://jordinodejs.github.io"
echo "⏱️ Los cambios estarán visibles en 2-10 minutos"
echo "📝 Configuración en GitHub Pages debe usar rama 'main' en repositorio jordinodejs.github.io"
```

### Para Subdominio (https://jordinodejs.github.io/porfolio-multi-theme/)

Si el usuario prefiere el subdominio, ejecuta:

```bash
# PASO 1: Cambiar configuración para subdominio
# Cambiar base: "/" por base: "/porfolio-multi-theme/" en vite.config.ts

# PASO 2: Construir y desplegar
git add . && git commit -m "Update portfolio for subdomain deployment"
bun run build
bun run deploy:self

# PASO 3: Informar al usuario
echo "✅ Despliegue completado a https://jordinodejs.github.io/porfolio-multi-theme/"
```

### Comandos de Verificación

```bash
# Verificar estado del repositorio
git status
git log --oneline -3

# Verificar build exitoso
ls -la dist/

# En caso de errores, verificar:
bun run build  # Verificar que compile sin errores
```

```bash
# Paso 1: Verificar estado del repositorio
git status

# Paso 2: Hacer commit si hay cambios pendientes
git add . && git commit -m "🚀 Deploy: Update portfolio before deployment"

# Paso 3: Construir el proyecto
bun run build

# Paso 4: Desplegar (SOLO usar este comando)
bun run deploy:self
```

**NO uses nunca:**

- `bun run deploy:github-pages` (falla en Windows)
- `npm run deploy`
- `gh-pages -d dist` directamente
- Scripts de GitHub Actions sin configuración previa

**Después del despliegue exitoso, informa al usuario:**

1. ✅ Despliegue completado
2. 🌐 URL: https://jordinodejs.github.io/porfolio-multi-theme/
3. 📝 Recordar configurar Pages en GitHub si es la primera vez:
   - Ir a Settings > Pages
   - Branch: gh-pages
   - Folder: / (root)

## 🔍 Diagnóstico de Errores Comunes

### Error: "Filename too long"

- **Causa:** Windows + nombres largos de node_modules
- **Solución:** Usar `bun run deploy:self` en lugar de `deploy:github-pages`

### Error: "Command failed: git clone"

- **Causa:** Trying to clone jordinodejs.github.io repository with long paths
- **Solución:** Usar gh-pages branch deployment (`deploy:self`)

### Error: "fatal: cannot create directory"

- **Causa:** Path length limitations on Windows
- **Solución:** Always use `deploy:self` command

### Build exitoso pero sitio no funciona

- **Causa:** GitHub Pages no configurado correctamente
- **Solución:** Configurar Pages en GitHub Settings

## 📋 Checklist Post-Despliegue

- [ ] Comando `bun run deploy:self` ejecutado exitosamente
- [ ] Mensaje "✅ ¡Despliegue completado exitosamente!" mostrado
- [ ] GitHub Pages configurado en Settings > Pages
- [ ] Branch "gh-pages" seleccionado
- [ ] Sitio accesible en https://jordinodejs.github.io/porfolio-multi-theme/

## Configuración de Vite

### Para Dominio Principal

La configuración está optimizada para el dominio principal:

```typescript
export default defineConfig({
  plugins: [react()],
  base: "/", // Dominio principal: https://jordinodejs.github.io
  build: {
    outDir: "dist",
  },
});
```

### Para Subdominio (si necesitas cambiarlo)

Para desplegar como subproyecto, cambiar `base` a:

```typescript
base: "/porfolio-multi-theme/", // Subdominio: https://jordinodejs.github.io/porfolio-multi-theme/
```

## URLs Resultantes

- **Dominio principal:** https://jordinodejs.github.io
- **Subdominio (alternativo):** https://jordinodejs.github.io/porfolio-multi-theme/

## 🚀 Comandos de Actualización Rápida

Para actualizaciones al dominio principal:

```bash
# Comando único para actualizar y desplegar al dominio principal
git add . && git commit -m "Update portfolio" && bun run deploy:github-pages
```

Para actualizaciones al subdominio:

```bash
# Comando único para actualizar y desplegar como subproyecto
git add . && git commit -m "Update portfolio" && bun run deploy:self
```
