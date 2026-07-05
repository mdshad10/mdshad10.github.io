import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceAssets = resolve(root, "dist/assets/build");
const targetAssets = resolve(root, "assets/build");

await rm(targetAssets, { recursive: true, force: true });
await mkdir(targetAssets, { recursive: true });
await cp(sourceAssets, targetAssets, { recursive: true });
await copyFile(resolve(root, "dist/app.html"), resolve(root, "index.html"));

console.log("Synced production build to the GitHub Pages root.");
