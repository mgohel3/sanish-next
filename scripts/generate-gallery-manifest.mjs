import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const galleryRoot = path.join(projectRoot, "public", "assets", "img", "gallery");
const outputPath = path.join(projectRoot, "src", "generated", "gallery-manifest.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

async function readGalleryManifest() {
  let entries;

  try {
    entries = await readdir(galleryRoot, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }

  const folderNames = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();

  return Promise.all(
    folderNames.map(async (slug) => {
      const entries = await readdir(path.join(galleryRoot, slug), { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
        .map((entry) => entry.name)
        .sort();

      return { slug, files };
    }),
  );
}

const manifest = await readGalleryManifest();
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);

const imageCount = manifest.reduce((total, catalogue) => total + catalogue.files.length, 0);
console.log(`Generated gallery manifest with ${manifest.length} catalogues and ${imageCount} images.`);
