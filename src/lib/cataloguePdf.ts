/**
 * Shared "download a catalogue PDF" trigger — used by CollectionShowcase.tsx
 * (/collection page) and CatalogueDownloadCard.tsx (gallery detail page
 * sidebar, added 2026-08-19) so both go through the exact same mechanism:
 * dispatches the same event Popup.tsx listens for, gating the actual
 * download behind the inquiry form.
 *
 * To add a PDF for a new catalogue, drop the file in
 * sanish-next/public/assets/pdf/collections/ and add an entry below keyed by
 * the catalogue's slug (same slug used in src/lib/gallery.ts and
 * CollectionShowcase.tsx's COLLECTIONS array).
 */
const CATALOGUE_PDF_FILES: Record<string, string> = {
  "sshades":      "s_shades.pdf",
  "thre3":        "three.pdf",
  "cool-colour":  "cool_colors.pdf",
  "08mm":         "0.8mm.pdf",
  "thermo":       "thermo.pdf",
};

export function openCataloguePdfPopup(slug: string, name: string) {
  const pdf = CATALOGUE_PDF_FILES[slug];
  window.dispatchEvent(new CustomEvent("open-inquiry-popup", {
    detail: {
      downloadAfterSubmit: true,
      downloadUrl: pdf ? `/assets/pdf/collections/${pdf}` : undefined,
      downloadFilename: `Sanish-${name.replace(/[^a-zA-Z0-9]+/g, "-")}-Catalogue.pdf`,
    },
  }));
}
