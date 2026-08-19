/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/ui/Button";
import { openCataloguePdfPopup } from "@/lib/cataloguePdf";

const COLLECTIONS = [
  {
    name: "S'Shades Premium",
    slug: "sshades",
    category: "Laminates",
    path: "/laminates",
    accent: "#85addc",
    image: "/assets/img/material/shadesCollection.jpg",
    thickness: "1.0mm",
    pdf: "s_shades.pdf",
    desc: "Luxurious 1mm thickness with sophisticated premium finishes and superior durability — crafted for spaces that demand the extraordinary.",
    highlights: ["1mm Premium Thickness", "Luxury Surface Finishes", "Superior Durability"],
  },
  {
    name: "Thre3",
    slug: "thre3",
    category: "Laminates",
    path: "/laminates",
    accent: "#ac8cc0",
    image: "/assets/img/material/threecollection.jpg",
    thickness: "1.0mm",
    pdf: "three.pdf",
    desc: "Timeless designs and captivating textures with impeccable craftsmanship — elevating aesthetics from residential bedrooms to premium commercial spaces.",
    highlights: ["Timeless Design Language", "Rich Texture Range", "Versatile Applications"],
  },
  {
    name: "Cool Colour",
    slug: "cool-colour",
    category: "Laminates",
    path: "/laminates",
    accent: "#f39ba2",
    image: "/assets/img/material/cool-colour-collection.jpg",
    thickness: "0.8mm",
    pdf: "cool_colors.pdf",
    desc: "Sleek, understated hues with modern finishes that bring a refined balance of softness and style to contemporary interiors.",
    highlights: ["Modern Pastel Palette", "Understated Elegance", "Matte & Satin Finishes"],
  },
  {
    name: "Perspective V4",
    slug: "08mm",
    category: "Laminates",
    path: "/laminates",
    accent: "#fabf7d",
    image: "/assets/img/material/prespective-v4-collection.jpg",
    thickness: "0.8mm",
    pdf: "0.8mm.pdf",
    desc: "Exceptional value without compromising design diversity — a wide range of designs and styles for every interior.",
    highlights: ["Wide Design Variety", "Value-Focused Range", "Easy Application"],
  },
  {
    name: "Thermo Laminates",
    slug: "thermo",
    category: "Thermo Laminates",
    path: "/asa-sheets",
    accent: "#85addc",
    image: "/assets/img/material/thermocollection.jpg",
    thickness: "1.0mm",
    pdf: "thermo.pdf",
    desc: "Engineered with extra weatherproof durability, our AASA-grade Thermo sheets are eco-friendly, highly solvent-resistant and built to hold their mechanical properties from scorching heat to low temperatures — ideal for outdoor cladding and high-exposure facades.",
    highlights: ["Extra Weatherproof Durability", "Eco-Friendly — No UV Stabilizer Needed", "Highly Solvent & Heat Resistant"],
  },
];

function openInquiryPopup() {
  window.dispatchEvent(new CustomEvent("open-inquiry-popup", { detail: { downloadAfterSubmit: false } }));
}

function openCataloguePopup(col: (typeof COLLECTIONS)[number]) {
  openCataloguePdfPopup(col.slug, col.name);
}

export default function CollectionShowcase() {
  return (
    <div className="flex flex-col">
      {COLLECTIONS.map((col, i) => {
        const imageOnLeft = i % 2 === 0;
        return (
          <div
            key={col.slug}
            className={`w-full py-12 lg:py-16 ${i > 0 ? "border-t" : ""}`}
            style={{ borderColor: "var(--color-border-subtle)" }}
          >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Image */}
                <div
                  className={`relative overflow-hidden rounded-[24px] block ${imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,18,0.45) 0%, transparent 55%)" }} />
                  <span
                    className="absolute top-5 left-5 text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "#fabf7d", color: "#24262b", fontFamily: "var(--font-jakarta)" }}
                  >
                    {col.category}
                  </span>
                  <span
                    className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
                    style={{ color: col.accent, fontFamily: "var(--font-jakarta)" }}
                  >
                    {col.thickness}
                  </span>
                </div>

                {/* Content */}
                <div className={imageOnLeft ? "lg:order-2" : "lg:order-1"}>
                  <h3 className="font-serif text-[clamp(28px,3.2vw,42px)] leading-tight text-[var(--text-primary)] mb-5">
                    {col.name}
                  </h3>

                  <p className="text-[15px] leading-[1.85] text-[var(--text-secondary)] mb-7 max-w-lg"
                    style={{ fontFamily: "var(--font-jakarta)" }}>
                    {col.desc}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {col.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-[14px]"
                        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${col.accent}20` }}>
                          <svg className="w-2.5 h-2.5" fill="none" stroke={col.accent} strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" variant="primary" onClick={openInquiryPopup}>
                      Enquire Now
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => openCataloguePopup(col)}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                      </svg>
                      Download Catalogue
                    </Button>
                  </div>
                </div>
              </div>
          </div>
        );
      })}
    </div>
  );
}
