"use client";

import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  {
    src:      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900",
    label:    "Modern Kitchen",
    category: "Kitchens",
    finish:   "High Gloss White",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=900",
    label:    "Retail Space",
    category: "Retail",
    finish:   "Textured Stone",
    tall:     true,
  },
  {
    src:      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900",
    label:    "Corporate Office",
    category: "Commercial",
    finish:   "Ultra Matte",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900",
    label:    "Luxury Living Room",
    category: "Residential",
    finish:   "Acrylic Pearl",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900",
    label:    "Boutique Hotel",
    category: "Commercial",
    finish:   "Metallic Bronze",
    tall:     true,
  },
  {
    src:      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900",
    label:    "Premium Kitchen",
    category: "Kitchens",
    finish:   "Suede Greige",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900",
    label:    "Showroom Display",
    category: "Retail",
    finish:   "High Gloss Anthracite",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900",
    label:    "Open Plan Office",
    category: "Commercial",
    finish:   "Woodgrain Walnut",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=900",
    label:    "Master Bedroom",
    category: "Residential",
    finish:   "Soft Linen Matte",
    tall:     true,
  },
  {
    src:      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=900",
    label:    "Island Kitchen",
    category: "Kitchens",
    finish:   "Calacatta Gloss",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=900",
    label:    "Restaurant Interior",
    category: "Commercial",
    finish:   "Fluted Oak",
    tall:     false,
  },
  {
    src:      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=900",
    label:    "Wardrobe & Closet",
    category: "Residential",
    finish:   "Pure White Matte",
    tall:     false,
  },
];

const FILTERS = ["All", "Kitchens", "Commercial", "Retail", "Residential"];

const ACCENT: Record<string, string> = {
  Kitchens:    "#7B9EC4",
  Commercial:  "#E8956D",
  Retail:      "#C97A92",
  Residential: "#6BBFA0",
};

export default function ApplicationsGallery() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = active === "All" ? ITEMS : ITEMS.filter(i => i.category === active);

  return (
    <>
      {/* ── Hero bar ── */}
      <div className="pt-36 pb-16 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            <Link href="/" className="hover:text-[var(--accent-blue)] transition-colors">Home</Link>
            <span>/</span>
            <span>Applications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                Inspiration Gallery
              </div>
              <h1 className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.1] text-[var(--text-primary)]">
                Applications
              </h1>
              <p className="mt-4 text-[16px] text-[var(--text-secondary)] leading-[1.7] max-w-[520px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                See how Sanish Laminates bring warmth, elegance, and durability to kitchens, offices, hotels, retail stores, and modern living spaces across India.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActive(f)}
                  className="text-[12px] font-semibold px-5 py-2.5 transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    borderRadius: "999px",
                    border: `1.5px solid ${active === f ? (ACCENT[f] ?? "var(--accent-blue)") : "rgba(30,30,46,0.12)"}`,
                    backgroundColor: active === f ? (ACCENT[f] ?? "var(--accent-blue)") + "14" : "transparent",
                    color: active === f ? (ACCENT[f] ?? "var(--accent-blue)") : "var(--text-secondary)",
                  }}>
                  {f}
                  {active === f && f !== "All" && (
                    <span className="ml-2 text-[10px] opacity-70">
                      ({ITEMS.filter(i => i.category === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Masonry gallery ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item, i) => (
              <div key={item.src + active}
                className="relative group overflow-hidden break-inside-avoid cursor-pointer"
                style={{ borderRadius: "16px" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />

                {/* Category pill — always visible */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5"
                    style={{
                      backgroundColor: (ACCENT[item.category] ?? "#7B9EC4") + "22",
                      color: ACCENT[item.category] ?? "#7B9EC4",
                      borderRadius: "999px",
                      border: `1px solid ${(ACCENT[item.category] ?? "#7B9EC4")}44`,
                      fontFamily: "var(--font-jakarta)",
                      backdropFilter: "blur(8px)",
                    }}>
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    background: "linear-gradient(to top, rgba(10,8,18,0.88) 0%, rgba(10,8,18,0.15) 60%)",
                    opacity: hovered === i ? 1 : 0,
                  }}>
                  <div className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-400"
                    style={{ transform: hovered === i ? "translateY(0)" : "translateY(10px)" }}>
                    <div className="text-white text-[17px] font-bold mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {item.label}
                    </div>
                    <div className="text-[12px]" style={{ color: ACCENT[item.category] ?? "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
                      {item.finish}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              No items in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 border-t border-[var(--color-border-subtle)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Ready to create your space?
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Get free samples delivered to your door — choose from 500+ designs.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact-us"
              className="flex items-center gap-2 text-white text-[12px] font-semibold px-7 py-3.5 transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--accent-blue)", borderRadius: "999px", fontFamily: "var(--font-jakarta)", letterSpacing: "0.06em" }}>
              Request Free Samples
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/surface-explorer"
              className="flex items-center gap-2 text-[12px] font-semibold px-7 py-3.5 border transition-all hover:-translate-y-0.5"
              style={{ color: "var(--accent-blue)", borderColor: "var(--accent-blue)", borderRadius: "999px", fontFamily: "var(--font-jakarta)", letterSpacing: "0.06em" }}>
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
