#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GITHUB_PAGES_REPO = 'https://github.com/jordinodejs/jordinodejs.github.io.git';
const TEMP_DIR = 'temp-github-pages';

console.log('🚀 Iniciando despliegue a GitHub Pages...');

try {
  // 1. Construir el proyecto
  console.log('📦 Construyendo el proyecto...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Clonar el repositorio de GitHub Pages
  console.log('📥 Clonando repositorio de GitHub Pages...');
  if (fs.existsSync(TEMP_DIR)) {
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
  }
  execSync(`git clone ${GITHUB_PAGES_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });

  // 3. Limpiar el directorio temporal (excepto .git)
  console.log('🧹 Limpiando directorio temporal...');
  const files = fs.readdirSync(TEMP_DIR);
  files.forEach(file => {
    if (file !== '.git') {
      execSync(`rm -rf ${path.join(TEMP_DIR, file)}`, { stdio: 'inherit' });
    }
  });

  // 4. Copiar archivos construidos
  console.log('📋 Copiando archivos construidos...');
  execSync(`cp -r dist/* ${TEMP_DIR}/`, { stdio: 'inherit' });

  // 5. Commit y push
  console.log('📤 Subiendo cambios...');
  process.chdir(TEMP_DIR);
  execSync('git add .', { stdio: 'inherit' });
  
  try {
    execSync(`git commit -m "Deploy from porfolio-multi-theme - ${new Date().toISOString()}"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Despliegue completado exitosamente!');
  } catch (error) {
    if (error.message.includes('nothing to commit')) {
      console.log('ℹ️  No hay cambios que desplegar');
    } else {
      throw error;
    }
  }

  // 6. Limpiar
  process.chdir('..');
  execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
} 