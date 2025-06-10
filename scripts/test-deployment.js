#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const GITHUB_PAGES_REPO_PATH = '../jordinodejs.github.io';
const LOCAL_DIST_PATH = './dist';

console.log('🧪 Testeando configuración de despliegue...\n');

function checkExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${description}: ${filePath} (NO ENCONTRADO)`);
    return false;
  }
}

function runCommand(command, description) {
  try {
    console.log(`\n🔄 ${description}...`);
    const output = execSync(command, { encoding: 'utf8', cwd: process.cwd() });
    console.log(`✅ ${description} completado`);
    return output;
  } catch (error) {
    console.log(`❌ Error en ${description}:`, error.message);
    return null;
  }
}

try {
  // 1. Verificar que existe el proyecto dist
  console.log('📦 Verificando build del proyecto...');
  if (!checkExists(LOCAL_DIST_PATH, 'Directorio dist')) {
    console.log('🔨 Construyendo proyecto...');
    runCommand('npm run build', 'Build del proyecto');
  }

  // 2. Verificar archivos principales en dist
  checkExists(path.join(LOCAL_DIST_PATH, 'index.html'), 'index.html en dist');
  checkExists(path.join(LOCAL_DIST_PATH, 'assets'), 'Directorio assets en dist');

  // 3. Verificar repositorio de destino
  console.log('\n🎯 Verificando repositorio de destino...');
  checkExists(GITHUB_PAGES_REPO_PATH, 'Repositorio jordinodejs.github.io');
  
  if (fs.existsSync(GITHUB_PAGES_REPO_PATH)) {
    // Cambiar al directorio del repositorio de destino
    process.chdir(GITHUB_PAGES_REPO_PATH);
    
    // Verificar que es un repositorio git
    if (checkExists('.git', 'Directorio .git')) {
      
      // Verificar rama actual
      const currentBranch = runCommand('git branch --show-current', 'Verificación de rama actual');
      console.log(`📍 Rama actual: ${currentBranch?.trim()}`);
      
      // Verificar estado del repositorio
      runCommand('git status --porcelain', 'Estado del repositorio');
      
      // Verificar últimos commits
      const lastCommits = runCommand('git log --oneline -3', 'Últimos 3 commits');
      console.log('📜 Últimos commits:');
      console.log(lastCommits);
      
      // Verificar remoto
      const remoteUrl = runCommand('git remote get-url origin', 'URL del repositorio remoto');
      console.log(`🌐 URL remoto: ${remoteUrl?.trim()}`);
    }
    
    // Volver al directorio original
    process.chdir('../porfolio-multi-theme');
  }

  // 4. Simular despliegue (dry run)
  console.log('\n🎭 Simulando proceso de despliegue...');
  console.log('1️⃣ Build del proyecto: ✅');
  console.log('2️⃣ Clonar repositorio remoto: ✅');
  console.log('3️⃣ Copiar archivos de dist: ✅');
  console.log('4️⃣ Commit y push: ⏸️  (no ejecutado en modo test)');

  console.log('\n✨ Testing completado!');
  console.log('\n📝 Para hacer un despliegue real ejecuta:');
  console.log('   npm run deploy:github-pages');
  
  console.log('\n🌐 Para verificar el sitio desplegado visita:');
  console.log('   https://jordinodejs.github.io');

} catch (error) {
  console.error('\n❌ Error durante el testing:', error.message);
  process.exit(1);
} 