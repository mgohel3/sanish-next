/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/ui/Button";
import { openCataloguePdfPopup } from "@/lib/cataloguePdf";

/**
 * Sidebar card on the gallery detail page (/applications/gallery/[catalogue]/[id])
 * offering the catalogue's own PDF download — uses the same popup mechanism as
 * the "Download Catalogue" button on /collection (see src/lib/cataloguePdf.ts).
 */
export default function CatalogueDownloadCard({ slug, name, thumbnail }: { slug: string; name: string; thumbnail: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img src={thumbnail} alt={`${name} catalogue cover`} className="w-full h-full object-cover" style={{ objectPosition: "center center" }} />
      </div>
      <div className="bg-white px-7 py-6 text-center">
        <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
          {name} Catalogue
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] mb-4 leading-[1.6]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Download the full catalogue for the complete design range and specifications.
        </p>
        <Button type="button" variant="primary" fullWidth onClick={() => openCataloguePdfPopup(slug, name)}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
          </svg>
          Download Catalogue
        </Button>
      </div>
    </div>
  );
}
