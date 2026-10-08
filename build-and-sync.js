import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

const frontendOutputDir = path.join(rootDir, "Frontend", ".output");
const rootOutputDir = path.join(rootDir, ".output");
const backendOutputDir = path.join(rootDir, "Backend", ".output");

const frontendPublicDir = path.join(frontendOutputDir, "public");
const rootPublicDir = path.join(rootDir, "public");
const backendPublicDir = path.join(rootDir, "Backend", "public");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("[Sync] Synchronizing production build outputs across all host directories...");

// 1. Copy Frontend/.output -> root .output and Backend/.output
console.log(`[Sync] Copying ${frontendOutputDir} -> ${rootOutputDir}`);
copyDirRecursive(frontendOutputDir, rootOutputDir);

console.log(`[Sync] Copying ${frontendOutputDir} -> ${backendOutputDir}`);
copyDirRecursive(frontendOutputDir, backendOutputDir);

// 2. Copy Frontend/.output/public -> root public and Backend/public
console.log(`[Sync] Copying ${frontendPublicDir} -> ${rootPublicDir}`);
copyDirRecursive(frontendPublicDir, rootPublicDir);

console.log(`[Sync] Copying ${frontendPublicDir} -> ${backendPublicDir}`);
copyDirRecursive(frontendPublicDir, backendPublicDir);

// 3. Find latest main JS and CSS bundles
const assetsDir = path.join(frontendPublicDir, "assets");
let latestJs = "";
let latestCss = "";

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFiles = files
    .filter(f => f.startsWith("index-") && f.endsWith(".js"))
    .map(f => ({ name: f, time: fs.statSync(path.join(assetsDir, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);

  const cssFiles = files
    .filter(f => f.startsWith("styles-") && f.endsWith(".css"))
    .map(f => ({ name: f, time: fs.statSync(path.join(assetsDir, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);

  if (jsFiles.length > 0) latestJs = `/assets/${jsFiles[0].name}`;
  if (cssFiles.length > 0) latestCss = `/assets/${cssFiles[0].name}`;
}

console.log(`[Sync] Detected latest bundles: JS=${latestJs}, CSS=${latestCss}`);

// 4. Write synced index.html
if (latestJs && latestCss) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Success Book Hub — Curated Books & Timeless Stories</title>
  <meta name="description" content="A dedicated independent bookstore in College Street, Kolkata, sending thoughtfully chosen books across India." />
  <meta name="author" content="Success Book Hub" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" />
  <link rel="stylesheet" href="${latestCss}" />
  <link rel="modulepreload" href="${latestJs}" />
</head>
<body class="bg-background text-foreground antialiased">
  <div id="root"></div>
  <script type="module" src="${latestJs}"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(rootPublicDir, "index.html"), htmlContent, "utf8");
  fs.writeFileSync(path.join(backendPublicDir, "index.html"), htmlContent, "utf8");
  console.log("[Sync] Updated public/index.html and Backend/public/index.html with latest bundle references.");
}

console.log("[Sync] All directories fully synced with latest production assets!");
