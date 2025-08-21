import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
import { resolve } from "path";

// https://vite.dev/config/
const pkgPath = resolve(__dirname, "package.json");
let appVersion = "";
try {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  appVersion = pkg.version || "";
} catch (e) {
  // ignore: if package.json can't be read, leave version empty
}

export default defineConfig({
  plugins: [
    react(),
    // Inject version meta tag into index.html at build time so deployed site exposes version
    {
      name: "html-inject-version",
      transformIndexHtml(html) {
        if (!appVersion) return html;
        const meta = `<meta name=\"app-version\" content=\"${appVersion}\">`;
        return html.replace(/<title>(.*?)<\/title>/i, (m) => `${m}\n    ${meta}`);
      },
    },
  ],
  base: "/", // Configurado para dominio principal: https://jordinodejs.github.io
  build: {
    outDir: "dist",
  },
});
