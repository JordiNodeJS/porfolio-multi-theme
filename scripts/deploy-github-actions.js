#!/usr/bin/env node

/**
 * Deploy script for GitHub Pages using GitHub Actions
 * This script deploys the portfolio to the jordinodejs.github.io repository
 * using the main branch, which triggers GitHub Actions deployment
 */

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

const config = {
  REPO_URL: "https://github.com/JordiNodeJS/jordinodejs.github.io.git",
  REPO_NAME: "jordinodejs.github.io",
  SOURCE_DIR: "./dist",
  TEMP_DIR: "./temp-github-pages",
  BRANCH: "main", // Deploy to main branch to trigger GitHub Actions
};

// Helper function for cross-platform file operations
async function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    if (process.platform === "win32") {
      await execAsync(`rmdir /s /q "${dirPath}"`);
    } else {
      await execAsync(`rm -rf "${dirPath}"`);
    }
  }
}

async function copyFiles(source, destination) {
  if (process.platform === "win32") {
    await execAsync(`xcopy "${source}" "${destination}" /e /i /y`);
  } else {
    await execAsync(`cp -r "${source}/." "${destination}"`);
  }
}

async function deploy() {
  try {
    console.log("🚀 Starting GitHub Pages deployment with GitHub Actions...");

    // Step 1: Build the project
    console.log("📦 Building project...");
    await execAsync("bun run build");
    console.log("✅ Build completed successfully!");

    // Step 2: Check if dist directory exists
    if (!fs.existsSync(config.SOURCE_DIR)) {
      throw new Error(`Build directory ${config.SOURCE_DIR} not found!`);
    }

    // Step 3: Clean up any existing temp directory
    console.log("🧹 Cleaning up previous deployments...");
    await removeDir(config.TEMP_DIR);

    // Step 4: Clone the GitHub Pages repository
    console.log("📥 Cloning GitHub Pages repository...");
    await execAsync(`git clone ${config.REPO_URL} ${config.TEMP_DIR}`);

    // Step 5: Copy .github directory to preserve GitHub Actions workflows
    const githubDir = path.join(config.TEMP_DIR, ".github");
    const localGithubDir = ".github";

    console.log("⚙️ Setting up GitHub Actions workflows...");

    // Remove old .github if exists and copy the new one
    if (fs.existsSync(githubDir)) {
      await removeDir(githubDir);
    }

    if (fs.existsSync(localGithubDir)) {
      await copyFiles(localGithubDir, githubDir);
      console.log("✅ GitHub Actions workflows copied successfully!");
    }

    // Step 6: Clear existing content (except .git and .github)
    console.log("🗑️ Clearing existing content...");
    const files = fs.readdirSync(config.TEMP_DIR);
    for (const file of files) {
      if (file !== ".git" && file !== ".github") {
        const filePath = path.join(config.TEMP_DIR, file);
        if (fs.statSync(filePath).isDirectory()) {
          await removeDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      }
    }

    // Step 7: Copy built files
    console.log("📋 Copying built files...");
    await copyFiles(config.SOURCE_DIR, config.TEMP_DIR);

    // Step 8: Add deployment timestamp to index.html
    const indexPath = path.join(config.TEMP_DIR, "index.html");
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, "utf8");
      const timestamp = new Date().toISOString();
      content = content.replace(
        "<head>",
        `<head>\n    <!-- GitHub Actions deploy timestamp: ${timestamp} -->`
      );
      fs.writeFileSync(indexPath, content);
      console.log(`✅ Added deployment timestamp: ${timestamp}`);
    }

    // Step 9: Git operations
    console.log("📝 Committing changes...");
    process.chdir(config.TEMP_DIR);

    // Configure git if needed
    try {
      await execAsync("git config user.name");
    } catch {
      await execAsync('git config user.name "Deploy Bot"');
      await execAsync('git config user.email "deploy@github.com"');
    }

    await execAsync("git add .");

    try {
      const commitMessage = `GitHub Actions deployment - ${new Date().toISOString()}`;
      await execAsync(`git commit -m "${commitMessage}"`);
      console.log("✅ Changes committed successfully!");
    } catch (error) {
      if (error.message.includes("nothing to commit")) {
        console.log("ℹ️ No changes to commit");
      } else {
        throw error;
      }
    }

    // Step 10: Push to main branch (this will trigger GitHub Actions)
    console.log("🚀 Pushing to main branch to trigger GitHub Actions...");
    await execAsync(`git push origin ${config.BRANCH}`);
    console.log("✅ Successfully pushed to main branch!");

    // Step 11: Cleanup
    process.chdir("..");
    await removeDir(config.TEMP_DIR);

    console.log("\n🎉 Deployment completed successfully!");
    console.log("📌 Next steps:");
    console.log(
      "   1. Go to https://github.com/JordiNodeJS/jordinodejs.github.io/settings/pages"
    );
    console.log('   2. Under "Source", select "GitHub Actions"');
    console.log("   3. The workflow should start automatically after the push");
    console.log(
      "   4. Check https://github.com/JordiNodeJS/jordinodejs.github.io/actions for progress"
    );
    console.log(
      "   5. Your site will be available at https://jordinodejs.github.io"
    );
    console.log(
      "\n💡 This deployment uses GitHub Actions for better reliability!"
    );
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);

    // Cleanup on error
    try {
      process.chdir("..");
      await removeDir(config.TEMP_DIR);
    } catch (cleanupError) {
      console.error("⚠️ Cleanup failed:", cleanupError.message);
    }

    process.exit(1);
  }
}

// Run deployment
deploy();
