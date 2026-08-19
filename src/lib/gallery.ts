import galleryManifest from "@/generated/gallery-manifest.json";

/**
 * Design Gallery — catalogue-grouped, room-scene preview images handed over by the
 * design agency (Karya Graphito). Manually organized for now per client instruction
 * (2026-08-19): full CMS bulk-upload panel deferred, see note in
 * dashboard/views/seo_views.py-adjacent apps for future work.
 *
 * A prebuild script scans public/assets/img/gallery/<slug>/ — client instruction
 * (2026-08-19): "create folders, I will add images manually, if folder is empty then
 * it will not appear on website." So: add a file to a catalogue folder, it shows up
 * after the next build; folder stays empty, that catalogue is skipped entirely. No
 * code changes needed to add images to an EXISTING catalogue folder.
 *
 * Each image's `id` is the numeric product/laminate code the designer used in the
 * filename (e.g. "10005_PW.jpg" → id "10005") — the "_PW" ("preview") suffix the
 * design team appends is stripped if present, nothing else. These ids are NOT yet
 * linked to real catalog Product records — see DesignGallery.tsx for the "no
 * redirect" note.
 *
 * Catalogue tile thumbnail (2026-08-19): by default the tile grid on
 * /applications uses whichever image sorts first in the folder. To pick a
 * specific thumbnail instead, drop a file literally named "cover.jpg" (or
 * .png/.webp/etc.) into that catalogue's folder, e.g.
 * public/assets/img/gallery/sshades/cover.jpg — it's used as the tile image
 * and is NOT counted as a product (won't get its own "Laminate #" page).
 */

export interface GalleryImage {
  id: string;
  src: string;
}

export interface GalleryCatalogue {
  slug: string;
  name: string;
  thumbnail: string;
  images: GalleryImage[];
}

// Known catalogue slugs get a proper display name; anything new falls back to a
// title-cased version of the folder name so an unlisted slug still works.
const CATALOGUE_NAMES: Record<string, string> = {
  "sshades":      "S'Shades",
  "thre3":        "Thre3",
  "cool-colour":  "Cool Colour",
  "08mm":         "Perspective V4",
  "thermo":       "Thermo Laminates",
};

// Preferred display order for known slugs (matches the site's Collections order);
// anything not listed here sorts alphabetically after these.
const CATALOGUE_ORDER = ["sshades", "thre3", "cool-colour", "08mm", "thermo"];

function prettifySlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Designers tag preview filenames with all sorts of suffix text beyond just
 * "_PW" — "_BS", "_ok", "_ok_BS", "_ok_P", etc. Client instruction
 * (2026-08-19): keep only digits. So: take the leading digit run (allowing a
 * single "-digits" segment for codes like "6005-5") and drop everything
 * after it, whatever it says — "10005_PW" → "10005", "3317_ok_BS" → "3317",
 * "6005-5_PW" → "6005-5".
 */
function extractProductId(filenameNoExt: string): string {
  const match = filenameNoExt.match(/^\d+(?:-\d+)?/);
  return match ? match[0] : filenameNoExt;
}

/** Returns catalogues discovered by the build-time gallery manifest generator. */
export function getGalleryCatalogues(): GalleryCatalogue[] {
  const catalogues: GalleryCatalogue[] = galleryManifest.map(({ slug, files }) => {
    // A file literally named "cover.<ext>" (case-insensitive) is the catalogue's
    // chosen thumbnail for the tile grid — not a product, so it's excluded from
    // `images` below. No cover file? Falls back to the first product image.
    const coverFile = files.find((filename) => filename.replace(/\.[^.]+$/, "").toLowerCase() === "cover");
    const productFiles = coverFile ? files.filter((f) => f !== coverFile) : files;

    const images: GalleryImage[] = productFiles.map((filename) => {
      const id = extractProductId(filename.replace(/\.[^.]+$/, ""));
      return { id, src: `/assets/img/gallery/${slug}/${filename}` };
    });

    const thumbnail = coverFile
      ? `/assets/img/gallery/${slug}/${coverFile}`
      : (images[0]?.src ?? "");

    return {
      slug,
      name: CATALOGUE_NAMES[slug] ?? prettifySlug(slug),
      thumbnail,
      images,
    };
  });

  return catalogues
    .filter((c) => c.images.length > 0)
    .sort((a, b) => {
      const ai = CATALOGUE_ORDER.indexOf(a.slug);
      const bi = CATALOGUE_ORDER.indexOf(b.slug);
      if (ai === -1 && bi === -1) return a.slug.localeCompare(b.slug);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

export function getCatalogueBySlug(slug: string): GalleryCatalogue | undefined {
  return getGalleryCatalogues().find((c) => c.slug === slug);
}

export function getGalleryImage(catalogueSlug: string, id: string) {
  const catalogue = getCatalogueBySlug(catalogueSlug);
  const image = catalogue?.images.find((img) => img.id === id);
  return catalogue && image ? { catalogue, image } : null;
}

export interface HomeGalleryTile {
  catalogueSlug: string;
  catalogueName: string;
  id: string;
  src: string;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Random product picks for the homepage Applications teaser — one from each
 * populated catalogue first (so all catalogues stay represented), then
 * filled up to `count` from the remaining pool. Picked fresh per build.
 */
export function getRandomGalleryTiles(count = 5): HomeGalleryTile[] {
  const catalogues = getGalleryCatalogues();
  const toTile = (c: GalleryCatalogue, img: GalleryImage): HomeGalleryTile => ({
    catalogueSlug: c.slug,
    catalogueName: c.name,
    id: img.id,
    src: img.src,
  });

  const picked: HomeGalleryTile[] = [];
  const rest: HomeGalleryTile[] = [];

  for (const c of catalogues) {
    const shuffled = shuffle(c.images);
    if (shuffled.length === 0) continue;
    picked.push(toTile(c, shuffled[0]));
    rest.push(...shuffled.slice(1).map((img) => toTile(c, img)));
  }

  const combined = shuffle(picked).concat(shuffle(rest));
  return combined.slice(0, count);
}

/**
 * One shared description template for every gallery detail page — per client
 * instruction (2026-08-19): only the catalogue name and product id change,
 * the rest of the copy repeats across all products. Edit the sentence here to
 * change it everywhere at once.
 */
export function getGalleryDescription(catalogueName: string, productId: string): string {
  return `Explore ${catalogueName}, Product ${productId}, presented in a thoughtfully designed interior setting to demonstrate its colour, pattern and visual character in application. Suitable for wardrobes, cabinetry, wall panels and modular furniture. Contact the Sanish Laminate team for specifications, sample availability and pricing.`;
}
