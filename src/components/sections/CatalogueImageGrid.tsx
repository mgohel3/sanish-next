/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { GalleryCatalogue } from "@/lib/gallery";

/**
 * Grid of "Laminate #X" cards for a single catalogue — used by
 * /applications/gallery/[catalogue] (the full per-catalogue listing).
 * Extracted from DesignGallery.tsx (2026-08-19) when that component became
 * the top-level category-tile selector instead of an inline filter+grid.
 */
export default function CatalogueImageGrid({ catalogue }: { catalogue: GalleryCatalogue }) {
  if (catalogue.images.length === 0) {
    return (
      <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
        No images in this catalogue yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {catalogue.images.map((img) => (
        <Link key={img.id} href={`/applications/gallery/${catalogue.slug}/${img.id}`}
          className="group relative block overflow-hidden rounded-[18px]" style={{ aspectRatio: "4/3" }}>
          <img src={img.src} alt={`Laminate #${img.id} — ${catalogue.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/70"
              style={{ fontFamily: "var(--font-jakarta)" }}>
              Catalogue: {catalogue.name}
            </div>
            <div className="text-white text-[14px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
              Laminate #{img.id}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
