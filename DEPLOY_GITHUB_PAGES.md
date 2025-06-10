# Despliegue a GitHub Pages

Este documento explica cómo configurar y desplegar el portfolio multi-theme al repositorio `jordinodejs.github.io` usando GitHub Pages.

## Opción 1: Despliegue Automático con GitHub Actions (Recomendado)

### Configuración Inicial

1. **Crear un Personal Access Token en GitHub:**
   - Ve a GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Genera un nuevo token con permisos `repo` completos
   - Copia el token generado

2. **Configurar el Secret en GitHub:**
   - Ve al repositorio `porfolio-multi-theme` en GitHub
   - Settings → Secrets and variables → Actions
   - Crea un nuevo secret llamado `PERSONAL_ACCESS_TOKEN`
   - Pega el token como valor

3. **Verificar la configuración:**
   - El workflow está en `.github/workflows/deploy.yml`
   - Se ejecuta automáticamente al hacer push a `main` o `master`

### Uso

Simplemente haz push de tus cambios:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

El workflow se ejecutará automáticamente y desplegará los cambios a `jordinodejs.github.io`.

## Opción 2: Despliegue Manual

### Uso

Para desplegar manualmente ejecuta:

```bash
npm run deploy:github-pages
```

Este comando:
1. Construye el proyecto (`npm run build`)
2. Clona el repositorio `jordinodejs.github.io`
3. Copia los archivos construidos
4. Hace commit y push de los cambios

### Requisitos

- Tener configurado Git con tus credenciales
- Permisos de escritura en el repositorio `jordinodejs.github.io`

## Configuración de Vite

La configuración actual de Vite está optimizada para GitHub Pages:

```typescript
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
  },
});
```

## Solución de Problemas

### Error de permisos
Si tienes errores de permisos, verifica:
- Que el Personal Access Token tenga permisos `repo`
- Que tengas acceso de escritura al repositorio de destino

### Error de rutas
Si las rutas no funcionan correctamente:
- Verifica que `base: "/"` esté configurado en `vite.config.ts`
- Asegúrate de que todas las rutas sean relativas

### Build falló
Si el build falla:
```bash
npm run build
```
Revisa los errores y corrígelos antes de desplegar.

## URLs

- **Repositorio fuente:** `porfolio-multi-theme`
- **Repositorio de despliegue:** `jordinodejs.github.io`
- **URL del sitio:** https://jordinodejs.github.io 