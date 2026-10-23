"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import type { GalleryCatalogue } from "@/lib/gallery";
import Pagination from "@/components/ui/Pagination";

/**
 * Grid of "Laminate #X" cards for a single catalogue — used by
 * /applications/gallery/[catalogue] (the full per-catalogue listing).
 * Extracted from DesignGallery.tsx (2026-08-19) when that component became
 * the top-level category-tile selector instead of an inline filter+grid.
 *
 * Paginated 30/page (2026-09-28) — some catalogues run past 300 images,
 * which was rendering unpaginated. Same client-side slice + <Pagination>
 * pattern as ProductListClient.tsx's product grid (which also uses 30/page).
 */
const PAGE_SIZE = 30;

export default function CatalogueImageGrid({ catalogue }: { catalogue: GalleryCatalogue }) {
  const [page, setPage] = useState(1);

  if (catalogue.images.length === 0) {
    return (
      <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
        No images in this catalogue yet.
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(catalogue.images.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = catalogue.images.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(p);
    if (typeof window !== "undefined") {
      document.getElementById("catalogue-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="catalogue-grid-top">
      <div className="mb-5 text-[12px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
        Showing{" "}
        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
          {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, catalogue.images.length)}
        </span>{" "}
        of {catalogue.images.length} images
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {paginated.map((img) => (
          <Link key={img.id} href={`/applications/gallery/${catalogue.slug}/${img.id}`}
            className="group relative block overflow-hidden rounded-[18px]" style={{ aspectRatio: "4/3" }}>
            <img loading="lazy" decoding="async" src={img.src} alt={`Laminate #${img.id} — ${catalogue.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-[12px] md:text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/70"
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

      <Pagination page={currentPage} totalPages={totalPages} onChange={goToPage} />
    </div>
  );
}
