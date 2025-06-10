#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Verificando configuración de despliegue para GitHub Pages...\n');

const errors = [];
const warnings = [];

// 1. Verificar configuración de package.json
console.log('📦 Verificando package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.homepage === 'https://jordinodejs.github.io') {
    console.log('✅ Homepage configurado correctamente');
  } else {
    errors.push('❌ Homepage incorrecto en package.json');
  }
  
  if (packageJson.scripts.build && packageJson.scripts['deploy:github-pages']) {
    console.log('✅ Scripts de build y deploy configurados');
  } else {
    errors.push('❌ Faltan scripts en package.json');
  }
} catch (error) {
  errors.push('❌ Error leyendo package.json');
}

// 2. Verificar vite.config.ts
console.log('\n⚙️  Verificando vite.config.ts...');
try {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  
  if (viteConfig.includes('base: "/"')) {
    console.log('✅ Base path configurado correctamente para repositorio de usuario');
  } else if (viteConfig.includes('base:')) {
    warnings.push('⚠️  Base path configurado, verificar si es correcto');
  } else {
    warnings.push('⚠️  Base path no configurado explícitamente');
  }
} catch (error) {
  errors.push('❌ Error leyendo vite.config.ts');
}

// 3. Verificar workflows de GitHub Actions
console.log('\n🔄 Verificando workflows de GitHub Actions...');
try {
  const deployWorkflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');
  
  if (deployWorkflow.includes('jordinodejs/jordinodejs.github.io')) {
    console.log('✅ Workflow principal configurado para repositorio externo');
  } else {
    errors.push('❌ Workflow principal mal configurado');
  }
  
  if (deployWorkflow.includes('PERSONAL_ACCESS_TOKEN')) {
    console.log('✅ Personal Access Token configurado en workflow');
  } else {
    errors.push('❌ Falta configuración de Personal Access Token');
  }
  
  // Verificar workflow alternativo deshabilitado
  const deploySeflWorkflow = fs.readFileSync('.github/workflows/deploy-self.yml', 'utf8');
  if (!deploySeflWorkflow.includes('push:')) {
    console.log('✅ Workflow alternativo deshabilitado para evitar conflictos');
  } else {
    warnings.push('⚠️  Workflow alternativo aún activo - puede causar conflictos');
  }
} catch (error) {
  errors.push('❌ Error leyendo workflows de GitHub Actions');
}

// 4. Verificar que se puede hacer build
console.log('\n🏗️  Probando build del proyecto...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  
  if (fs.existsSync('dist/index.html')) {
    console.log('✅ Build exitoso - dist/index.html generado');
    
    // Verificar rutas en el HTML
    const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
    if (indexHtml.includes('href="/assets/') && indexHtml.includes('src="/assets/')) {
      console.log('✅ Rutas de assets correctas para repositorio de usuario');
    } else {
      warnings.push('⚠️  Verificar rutas de assets en dist/index.html');
    }
  } else {
    errors.push('❌ Build no generó dist/index.html');
  }
} catch (error) {
  errors.push('❌ Error durante el build');
}

// 5. Verificar Git remoto
console.log('\n🔗 Verificando configuración de Git...');
try {
  const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  
  if (remoteUrl.includes('porfolio-multi-theme')) {
    console.log('✅ Repositorio fuente correcto');
  } else {
    warnings.push('⚠️  Verificar repositorio remoto');
  }
  
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`📍 Rama actual: ${branch}`);
  
  if (['main', 'master'].includes(branch)) {
    console.log('✅ En rama principal');
  } else {
    warnings.push('⚠️  No estás en rama main/master');
  }
} catch (error) {
  warnings.push('⚠️  Error verificando Git');
}

// Resumen final
console.log('\n' + '='.repeat(60));
console.log('📋 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('🎉 ¡PERFECTO! Tu configuración está lista para GitHub Pages');
  console.log('\n📍 URL del sitio: https://jordinodejs.github.io');
  console.log('🚀 Haz push a main/master para desplegar automáticamente');
} else {
  if (errors.length > 0) {
    console.log('\n❌ ERRORES QUE DEBES CORREGIR:');
    errors.forEach(error => console.log(`   ${error}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  ADVERTENCIAS:');
    warnings.forEach(warning => console.log(`   ${warning}`));
  }
}

console.log('\n📝 PRÓXIMOS PASOS:');
console.log('   1. Asegúrate de tener PERSONAL_ACCESS_TOKEN configurado en GitHub');
console.log('   2. Haz push de estos cambios: git add . && git commit -m "Optimize GitHub Pages deployment"');
console.log('   3. El workflow se ejecutará automáticamente');
console.log('   4. Verifica en https://jordinodejs.github.io que el sitio se actualizó'); 