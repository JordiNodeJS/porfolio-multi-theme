#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const GITHUB_PAGES_REPO =
  "https://github.com/JordiNodeJS/jordinodejs.github.io.git";
const TEMP_DIR = "temp-github-pages";

console.log("🚀 Iniciando despliegue a GitHub Pages...");

try {
  // 1. Construir el proyecto con configuración para dominio principal
  console.log("📦 Construyendo el proyecto...");
  execSync("bun run build", {
    stdio: "inherit",
    env: { ...process.env, VITE_BASE_PATH: "/" },
  });

  // 2. Clonar el repositorio de GitHub Pages
  console.log("📥 Clonando repositorio de GitHub Pages...");
  if (fs.existsSync(TEMP_DIR)) {
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: "inherit" });
  }
  execSync(`git clone ${GITHUB_PAGES_REPO} ${TEMP_DIR}`, { stdio: "inherit" });

  // 3. Limpiar el directorio temporal (excepto .git)
  console.log("🧹 Limpiando directorio temporal...");
  const files = fs.readdirSync(TEMP_DIR);
  files.forEach((file) => {
    if (file !== ".git") {
      execSync(`rm -rf ${path.join(TEMP_DIR, file)}`, { stdio: "inherit" });
    }
  });

  // 4. Copiar archivos construidos
  console.log("📋 Copiando archivos construidos...");
  execSync(`cp -r dist/* ${TEMP_DIR}/`, { stdio: "inherit" });

  // 4.5 Crear timestamp para cache busting
  const timestamp = new Date().toISOString();
  const indexPath = path.join(TEMP_DIR, "index.html");
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, "utf8");
    indexContent = indexContent.replace(
      "<head>",
      `<head>\n    <!-- Deploy timestamp: ${timestamp} -->`
    );
    fs.writeFileSync(indexPath, indexContent);
    console.log("⏱️ Añadido timestamp para cache busting");
  }

  // 5. Commit y push
  console.log("📤 Subiendo cambios...");
  process.chdir(TEMP_DIR);
  execSync("git add .", { stdio: "inherit" });

  // Verificar si hay cambios antes de hacer commit
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" });

    if (status.trim() === "") {
      console.log(
        "ℹ️  No hay cambios que desplegar - el sitio ya está actualizado"
      );
    } else {
      execSync(
        `git commit -m "Deploy from porfolio-multi-theme - ${new Date().toISOString()}"`,
        { stdio: "inherit" }
      );
      execSync("git push origin main", { stdio: "inherit" });
      console.log("✅ Despliegue completado exitosamente!");
    }
  } catch (error) {
    console.error("❌ Error durante el commit/push:", error.message);
    throw error;
  }

  // 6. Limpiar
  process.chdir("..");
  execSync(`rm -rf ${TEMP_DIR}`, { stdio: "inherit" });

  console.log("🎉 Proceso de despliegue finalizado correctamente!");
} catch (error) {
  console.error("❌ Error durante el despliegue:", error.message);

  // Asegurarse de limpiar en caso de error
  try {
    if (process.cwd().includes(TEMP_DIR)) {
      process.chdir("..");
    }
    if (fs.existsSync(TEMP_DIR)) {
      execSync(`rm -rf ${TEMP_DIR}`, { stdio: "inherit" });
    }
  } catch (cleanupError) {
    console.error("⚠️  Error durante la limpieza:", cleanupError.message);
  }

  process.exit(1);
}
