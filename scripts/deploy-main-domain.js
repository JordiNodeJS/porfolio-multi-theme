#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Desplegando al dominio principal GitHub Pages...');
console.log('🌐 URL objetivo: https://jordinodejs.github.io');

try {
  // 1. Construir el proyecto
  console.log('📦 Construyendo el proyecto...');
  execSync('bun run build', { stdio: 'inherit' });

  // 2. Verificar que el build se completó
  if (!fs.existsSync('dist')) {
    throw new Error('❌ No se encontró el directorio dist/ después del build');
  }

  // 3. Usar gh-pages para desplegar directamente al repositorio principal
  console.log('📤 Desplegando al repositorio jordinodejs.github.io...');
  
  // Limpiar caché de gh-pages antes del despliegue
  try {
    execSync('rm -rf node_modules/.cache/gh-pages', { stdio: 'pipe' });
  } catch (e) {
    // Ignorar errores de limpieza
  }
  
  // Configurar el repositorio remoto para gh-pages
  const mainRepoUrl = 'https://github.com/JordiNodeJS/jordinodejs.github.io.git';
  
  execSync(`npx gh-pages -d dist -r ${mainRepoUrl} -b main --dotfiles`, { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      // Asegurar que gh-pages use el repositorio correcto
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });

  console.log('✅ ¡Despliegue completado exitosamente!');
  console.log('🌐 Tu sitio estará disponible en:');
  console.log('   https://jordinodejs.github.io');
  console.log('');
  console.log('📝 Configuración requerida en GitHub:');
  console.log('   1. Ve a Settings > Pages en el repositorio jordinodejs.github.io');
  console.log('   2. Selecciona "Deploy from a branch"');
  console.log('   3. Elige la rama "main" y carpeta "/ (root)"');
  console.log('');
  console.log('⏱️ Los cambios estarán visibles en 2-10 minutos');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  console.log('');
  console.log('💡 Soluciones posibles:');
  console.log('   1. Verifica que tienes acceso al repositorio jordinodejs.github.io');
  console.log('   2. Asegúrate de que tienes configurado git con tu usuario');
  console.log('   3. Intenta ejecutar: git config --global user.name "Tu Nombre"');
  console.log('   4. Intenta ejecutar: git config --global user.email "tu@email.com"');
  process.exit(1);
}
