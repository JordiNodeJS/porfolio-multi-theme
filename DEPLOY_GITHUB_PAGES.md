# Despliegue a GitHub Pages

Este documento explica cómo configurar y desplegar el portfolio multi-theme a GitHub Pages.

## ⚠️ MÉTODO RECOMENDADO: Despliegue a rama gh-pages

**IMPORTANTE:** Usar siempre `bun run deploy:self` en lugar de `bun run deploy:github-pages` para evitar errores de nombres de archivo largos en Windows.

### Uso (Método que funciona)

```bash
# 1. Construir el proyecto
bun run build

# 2. Desplegar a rama gh-pages
bun run deploy:self
```

### Configuración en GitHub (OBLIGATORIO después del despliegue)

1. **Ve a tu repositorio** `porfolio-multi-theme` en GitHub
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

Si eres una AI y el usuario te pide "despliega el proyecto a GitHub Pages", ejecuta EXACTAMENTE estos comandos en este orden:

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

La configuración actual de Vite está optimizada para GitHub Pages:

```typescript
export default defineConfig({
  plugins: [react()],
  base: "/porfolio-multi-theme/", // Ajustado para project pages
  build: {
    outDir: "dist",
  },
});
```

## URLs

- **Repositorio fuente:** `porfolio-multi-theme`
- **Método de despliegue:** Rama `gh-pages`
- **URL del sitio:** https://jordinodejs.github.io/porfolio-multi-theme/

## 🚀 Comandos de Actualización Rápida

Para futuras actualizaciones del portfolio:

```bash
# Comando único para actualizar y desplegar
git add . && git commit -m "Update portfolio" && bun run deploy:self
```
