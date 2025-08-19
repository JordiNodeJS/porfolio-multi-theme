#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Despliegue MANUAL al dominio principal GitHub Pages...");
console.log("🌐 URL objetivo: https://jordinodejs.github.io");

const TEMP_DIR = "temp-main-deploy";
const MAIN_REPO_URL =
  "https://github.com/JordiNodeJS/jordinodejs.github.io.git";

try {
  // 1. Construir el proyecto
  console.log("📦 Construyendo el proyecto...");
  execSync("bun run build", { stdio: "inherit" });

  // 2. Verificar que el build se completó
  if (!fs.existsSync("dist")) {
    throw new Error("❌ No se encontró el directorio dist/ después del build");
  }

  // 3. Limpiar directorio temporal si existe
  if (fs.existsSync(TEMP_DIR)) {
    console.log("🧹 Limpiando directorio temporal...");
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: "inherit" });
  }

  // 4. Clonar repositorio principal (solo los archivos esenciales)
  console.log("📥 Clonando repositorio principal...");
  execSync(`git clone --depth 1 --single-branch ${MAIN_REPO_URL} ${TEMP_DIR}`, {
    stdio: "inherit",
  });

  // 5. Limpiar contenido del repositorio principal (excepto .git)
  console.log("🧹 Preparando repositorio para nuevos archivos...");
  const files = fs.readdirSync(TEMP_DIR);
  files.forEach((file) => {
    if (file !== ".git") {
      const filePath = path.join(TEMP_DIR, file);
      execSync(`rm -rf "${filePath}"`, { stdio: "pipe" });
    }
  });

  // 6. Copiar archivos del build
  console.log("📋 Copiando archivos del build...");
  const distFiles = fs.readdirSync("dist");
  distFiles.forEach((file) => {
    const srcPath = path.join("dist", file);
    const destPath = path.join(TEMP_DIR, file);
    execSync(`cp -r "${srcPath}" "${destPath}"`, { stdio: "inherit" });
  });

  // 7. Commit y push
  console.log("📤 Subiendo cambios...");
  process.chdir(TEMP_DIR);

  execSync("git add .", { stdio: "inherit" });

  // Forzar commit incluso si no hay cambios aparentes
  try {
    const commitMessage = `Deploy portfolio from porfolio-multi-theme - ${new Date().toISOString()}`;
    execSync(`git commit -m "${commitMessage}" --allow-empty`, { stdio: "inherit" });
    execSync("git push origin main", { stdio: "inherit" });
    
    console.log("✅ ¡Despliegue completado exitosamente!");
  } catch (commitError) {
    console.log("⚠️  Intentando forzar el commit...");
    try {
      const forceCommitMessage = `Force deploy portfolio - ${new Date().toISOString()}`;
      execSync(`git commit -m "${forceCommitMessage}" --allow-empty`, { stdio: "inherit" });
      execSync("git push origin main --force", { stdio: "inherit" });
      console.log("✅ ¡Despliegue forzado completado!");
    } catch (forceError) {
      console.log("❌ No se pudo forzar el despliegue:", forceError.message);
    }
  }

  // 8. Limpiar directorio temporal
  process.chdir("..");
  execSync(`rm -rf ${TEMP_DIR}`, { stdio: "pipe" });

  console.log("🌐 Tu sitio estará disponible en:");
  console.log("   https://jordinodejs.github.io");
  console.log("");
  console.log("⏱️ Los cambios estarán visibles en 2-10 minutos");
} catch (error) {
  console.error("❌ Error durante el despliegue:", error.message);

  // Limpiar en caso de error
  try {
    process.chdir("..");
    if (fs.existsSync(TEMP_DIR)) {
      execSync(`rm -rf ${TEMP_DIR}`, { stdio: "pipe" });
    }
  } catch (cleanupError) {
    // Ignorar errores de limpieza
  }

  console.log("");
  console.log("💡 Soluciones posibles:");
  console.log(
    "   1. Verifica que tienes acceso al repositorio jordinodejs.github.io"
  );
  console.log("   2. Asegúrate de que tienes git configurado correctamente");
  console.log("   3. Verifica tu conexión a internet");
  process.exit(1);
}
