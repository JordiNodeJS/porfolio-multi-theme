#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Desplegando a GitHub Pages en el mismo repositorio...');

try {
  // 1. Verificar que estamos en la rama principal
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`📍 Rama actual: ${currentBranch}`);

  if (!['main', 'master'].includes(currentBranch)) {
    console.log('⚠️  Advertencia: No estás en la rama main/master');
  }

  // 2. Verificar que no hay cambios sin commitear
  try {
    execSync('git diff-index --quiet HEAD --', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Hay cambios sin commitear. Considera hacer commit primero.');
  }

  // 3. Construir el proyecto
  console.log('📦 Construyendo el proyecto...');
  execSync('bun run build', { stdio: 'inherit' });

  // 4. Verificar que dist existe
  if (!fs.existsSync('./dist')) {
    throw new Error('❌ No se encontró el directorio dist después del build');
  }

  // 5. Desplegar usando gh-pages
  console.log('📤 Desplegando a rama gh-pages...');
  execSync('bunx gh-pages -d dist', { stdio: 'inherit' });

  console.log('✅ ¡Despliegue completado exitosamente!');
  console.log('🌐 Tu sitio estará disponible en:');
  console.log('   https://jordinodejs.github.io/porfolio-multi-theme/');
  console.log('');
  console.log('📝 Para habilitar GitHub Pages:');
  console.log('   1. Ve a Settings > Pages en tu repositorio');
  console.log('   2. Selecciona "Deploy from a branch"');
  console.log('   3. Elige la rama "gh-pages" y carpeta "/ (root)"');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
} 