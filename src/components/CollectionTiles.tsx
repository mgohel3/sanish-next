/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const COLLECTIONS = [
  {
    name: "S'Shades Premium",
    slug: "sshades",
    category: "Laminates",
    path: "/laminates",
    accent: "#85addc",
    image: "/assets/img/material/shadesCollection.png",
    thickness: "1.0mm",
    desc: "Luxurious 1mm thickness with sophisticated premium finishes and superior durability — crafted for spaces that demand the extraordinary.",
    highlights: ["1mm Premium Thickness", "Luxury Surface Finishes", "Superior Durability"],
  },
  {
    name: "Thre3",
    slug: "thre3",
    category: "Laminates",
    path: "/laminates",
    accent: "#ac8cc0",
    image: "/assets/img/material/threeCollection.jpg",
    thickness: "1.0mm",
    desc: "Timeless designs and captivating textures with impeccable craftsmanship — elevating aesthetics from residential bedrooms to premium commercial spaces.",
    highlights: ["Timeless Design Language", "Rich Texture Range", "Versatile Applications"],
  },
  {
    name: "Cool Colour",
    slug: "cool-colour",
    category: "Laminates",
    path: "/laminates",
    accent: "#f39ba2",
    image: "/assets/img/material/cool_colour_Collection.webp",
    thickness: "0.8mm",
    desc: "Sleek, understated hues with modern finishes that bring a refined balance of softness and style to contemporary interiors.",
    highlights: ["Modern Pastel Palette", "Understated Elegance", "Matte & Satin Finishes"],
  },
  {
    name: "0.8mm Series",
    slug: "08mm",
    category: "Laminates",
    path: "/laminates",
    accent: "#fabf7d",
    image: "/assets/img/material/shadesCollection.png",
    thickness: "0.8mm",
    desc: "Exceptional value without compromising design diversity — a wide range of designs and styles for every interior.",
    highlights: ["Wide Design Variety", "Value-Focused Range", "Easy Application"],
  },
  {
    name: "Fluted",
    slug: "fluted",
    category: "Louvers",
    path: "/louvers",
    accent: "#85addc",
    image: "/assets/img/material/flutedCollection.webp",
    thickness: "Panels",
    desc: "Architectural fluted textures ranging from subtle to bold — ideal for feature walls, cabinetry fronts, and statement partitions.",
    highlights: ["3D Fluted Texture", "Architectural Statement", "Feature Wall Ready"],
  },
];

function openCataloguePopup() {
  window.dispatchEvent(new CustomEvent("open-inquiry-popup", { detail: { downloadAfterSubmit: true } }));
}

export default function CollectionTiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {COLLECTIONS.map((col) => (
        <div
          key={col.slug}
          className="group relative overflow-hidden rounded-[24px] bg-white flex flex-col"
          style={{
            border: "1px solid rgba(30,30,46,0.08)",
            boxShadow: "0 4px 24px rgba(30,30,46,0.06)",
            transition: "box-shadow 0.35s ease, transform 0.35s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(30,30,46,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(30,30,46,0.06)";
          }}
        >
          {/* Image — clicking the image navigates to the collection */}
          <Link href={`${col.path}?collection=${col.slug}`} className="relative overflow-hidden block" style={{ aspectRatio: "16/9" }}>
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,8,18,0.55) 0%, transparent 55%)" }}
            />
            {/* Category badge */}
            <span
              className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: col.accent, fontFamily: "var(--font-jakarta)" }}
            >
              {col.category}
            </span>
            {/* Thickness pill */}
            <span
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
              style={{ color: col.accent, fontFamily: "var(--font-jakarta)" }}
            >
              {col.thickness}
            </span>
            {/* Name on image */}
            <h3
              className="absolute bottom-4 left-5 right-5 font-serif text-white leading-tight"
              style={{ fontSize: "clamp(22px, 2.8vw, 30px)" }}
            >
              {col.name}
            </h3>
          </Link>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            {/* Accent line */}
            <div className="w-8 h-[3px] rounded-full mb-4" style={{ backgroundColor: col.accent }} />

            <p
              className="text-[14px] leading-[1.75] text-[var(--text-secondary)] mb-5 flex-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {col.desc}
            </p>

            {/* Highlights */}
            <ul className="space-y-2 mb-6">
              {col.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2.5 text-[12.5px]"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${col.accent}20` }}
                  >
                    <svg className="w-2 h-2" fill="none" stroke={col.accent} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {/* CTA row — two buttons */}
            <div
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(30,30,46,0.07)" }}
            >
              {/* Browse Collection */}
              <Link
                href={`${col.path}?collection=${col.slug}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-[1px]"
                style={{
                  backgroundColor: col.accent,
                  fontFamily: "var(--font-jakarta)",
                  boxShadow: `0 6px 18px ${col.accent}40`,
                }}
              >
                Browse
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Download Catalogue */}
              <button
                type="button"
                onClick={openCataloguePopup}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[11.5px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[var(--bg-secondary)]"
                style={{
                  border: `1.5px solid ${col.accent}`,
                  color: col.accent,
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
