# 🚀 Despliegue Automático a GitHub Pages

Este documento explica el sistema de despliegue automático configurado para el portfolio.

## ✨ Despliegue Completamente Automatizado

### 🎯 Configuración Actual

- **URL del sitio**: https://jordinodejs.github.io (dominio principal)
- **Repositorio fuente**: `porfolio-multi-theme` (código fuente)
- **Repositorio destino**: `jordinodejs.github.io` (sitio web)
- **Método**: GitHub Actions (automático)

### 🔧 Cómo Funciona el Despliegue Automático

#### 1. **Trigger Automático**

- Se ejecuta automáticamente con `git push origin main`
- Detecta cambios en: `src/`, `public/`, `index.html`, `package.json`, `vite.config.ts`, `tailwind.config.js`

#### 2. **Proceso de Build**

```yaml
- name: Setup Bun
  uses: oven-sh/setup-bun@v1

- name: Install dependencies
  run: bun install

- name: Build for production
  run: bun run build
  env:
    VITE_BASE_PATH: "/"
```

#### 3. **Deploy Automático**

```yaml
- name: Deploy to external repository
  run: |
    git clone https://github.com/JordiNodeJS/jordinodejs.github.io.git temp-repo
    cd temp-repo
    # Limpiar archivos existentes (mantener .git)
    find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +
    # Copiar archivos construidos
    cp -r ../dist/* .
    # Commit y push automático
    git add .
    git commit -m "Auto-deploy from porfolio-multi-theme"
    git push origin main
```

## 🚀 Workflow para Desarrolladores

### ✅ Proceso Simplificado

**¡Ya no necesitas scripts manuales!** El proceso es súper simple:

```bash
# 1. Desarrollo local
bun dev

# 2. Hacer cambios y confirmar
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Subir cambios (esto dispara el deploy automático)
git push origin main

# ¡LISTO! GitHub Actions se encarga del resto automáticamente
```

### ⏱️ Tiempos de Deploy

- **Detección de cambios**: Inmediato
- **Build del proyecto**: ~1 minuto
- **Deploy a GitHub Pages**: ~30 segundos
- **Total**: ~2 minutos desde push hasta sitio actualizado

## 🔍 Monitoreo del Deploy

### Ver el Estado del Deploy

1. **GitHub Actions**: https://github.com/JordiNodeJS/porfolio-multi-theme/actions
2. **Logs en tiempo real**: Click en el workflow activo
3. **Verificación**: https://jordinodejs.github.io (sitio actualizado)

### Solución de Problemas

Si el deploy falla:

1. **Revisar GitHub Actions**: Logs detallados en la pestaña Actions
2. **Verificar sintaxis**: `bun run build` debe funcionar localmente
3. **Verificar permisos**: Token GitHub debe tener permisos de escritura

## 📋 Archivo de Configuración

El archivo `.github/workflows/deploy-external.yml` contiene toda la configuración:

```yaml
name: Deploy to External GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - "src/**"
      - "public/**"
      - "index.html"
      - "package.json"
      - "vite.config.ts"
      - "tailwind.config.js"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - name: Deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Script de deploy automático
```

## ✅ Ventajas del Sistema Actual

### 🎯 Beneficios

- ✅ **Completamente automático**: Sin scripts manuales
- ✅ **Detección inteligente**: Solo deploys cuando hay cambios relevantes
- ✅ **Rápido**: ~2 minutos total
- ✅ **Confiable**: GitHub Actions robusto
- ✅ **Logs detallados**: Fácil debugging
- ✅ **Zero configuración**: Todo está listo

### 🚀 Resultado

**Portfolio siempre actualizado automáticamente en https://jordinodejs.github.io**

---

⭐ **Despliegue automático configurado y funcionando perfectamente!**

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
