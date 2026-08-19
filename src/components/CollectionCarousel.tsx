/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

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
    desc: "Represents the pinnacle of excellence within the Sanish portfolio. Distinguished by its luxurious 1mm thickness, S'Shades combines sophisticated premium finishes with elevated aesthetics and superior functionality — crafted for spaces that demand the extraordinary.",
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
    desc: "Designed to captivate with timeless designs and captivating textures. Thre3 combines impeccable craftsmanship with a curated palette to elevate the aesthetics of any room — from residential bedrooms to premium commercial spaces.",
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
    desc: "A perfect solution for designers who value sleek, understated hues. Cool Colour's calm tones and modern finishes complement contemporary interiors, bringing a refined balance of softness and style to every surface.",
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
    desc: "An eclectic range that delivers a refreshing vibe and extraordinary decor ideas. Perspective V4 offers exceptional value without compromising on the design diversity that Sanish is known for.",
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
    desc: "Engineered with extra weatherproof durability, our AASA-grade Thermo Laminates range is eco-friendly, highly solvent-resistant and built to hold its mechanical properties from scorching heat to low temperatures — ideal for outdoor cladding and high-exposure facades.",
    highlights: ["Extra Weatherproof Durability", "Eco-Friendly — No UV Stabilizer Needed", "Highly Solvent & Heat Resistant"],
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CollectionCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const total = COLLECTIONS.length;

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const col = COLLECTIONS[active];

  const openDownload = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-popup", {
      detail: {
        downloadAfterSubmit: true,
        downloadUrl: `/assets/pdf/collections/${col.pdf}`,
        downloadFilename: `Sanish-${col.name.replace(/[^a-zA-Z0-9]+/g, "-")}-Catalogue.pdf`,
      },
    }));
  };

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slide container ── */}
      <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(30,30,46,0.10)]">

        {/* Slides track */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${active * 100}%)`,
            transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {COLLECTIONS.map((c, i) => (
            <div key={c.slug} className="w-full flex-shrink-0 min-w-full bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]" style={{ minHeight: "520px" }}>

                {/* Image panel */}
                <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    style={{
                      position: "absolute", inset: 0,
                      transform: i === active ? "scale(1.03)" : "scale(1)",
                      transition: "transform 5s ease",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(120deg, rgba(10,8,18,0.45) 0%, rgba(10,8,18,0.05) 60%)" }} />

                  {/* Category badge — brand orange/yellow, consistent site-wide */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full"
                      style={{ backgroundColor: "#fabf7d", color: "#24262b", fontFamily: "var(--font-jakarta)" }}>
                      {c.category}
                    </span>
                  </div>

                  {/* Slide counter */}
                  <div className="absolute bottom-6 left-6 text-white/60 text-[11px] font-semibold"
                    style={{ fontFamily: "var(--font-jakarta)" }}>
                    {pad(i + 1)} / {pad(total)}
                  </div>

                  {/* Thickness pill */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    <span className="text-[11px] font-semibold" style={{ color: c.accent, fontFamily: "var(--font-jakarta)" }}>
                      {c.thickness}
                    </span>
                  </div>
                </div>

                {/* Content panel */}
                <div className="flex flex-col justify-center px-10 py-10 lg:px-14 lg:py-16"
                  style={{ backgroundColor: "white" }}>

                  {/* Accent bar */}
                  <div className="w-10 h-1 rounded-full mb-7" style={{ backgroundColor: c.accent }} />

                  <h3 className="font-serif leading-[1.1] text-[var(--text-primary)] mb-5"
                    style={{ fontSize: "clamp(28px,3.2vw,44px)" }}>
                    {c.name}
                  </h3>

                  <p className="text-[15px] text-[var(--text-secondary)] leading-[1.85] mb-7"
                    style={{ fontFamily: "var(--font-jakarta)" }}>
                    {c.desc}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-9">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-[13.5px]"
                        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
                        <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${c.accent}20` }}>
                          <svg className="w-2.5 h-2.5" fill="none" stroke={c.accent} strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`${c.path}?collection=${c.slug}`}
                      className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.09em] px-7 py-3.5 text-white rounded-full transition-all duration-300 hover:-translate-y-[2px]"
                      style={{
                        backgroundColor: c.accent,
                        fontFamily: "var(--font-jakarta)",
                        boxShadow: `0 8px 22px ${c.accent}45`,
                      }}
                    >
                      Browse Collection
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      onClick={openDownload}
                      className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.09em] px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:bg-[var(--bg-secondary)]"
                      style={{
                        border: `1.5px solid ${c.accent}`,
                        color: c.accent,
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                      </svg>
                      Download Catalogue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows — overlaid on the image side */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", boxShadow: "0 4px 16px rgba(0,0,0,0.14)" }}
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" stroke="var(--text-primary)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 lg:right-[46%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", boxShadow: "0 4px 16px rgba(0,0,0,0.14)" }}
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" stroke="var(--text-primary)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Dot navigation ── */}
      <div className="flex items-center justify-center gap-2.5 mt-7">
        {COLLECTIONS.map((c, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${c.name}`}
            className="transition-all duration-400 rounded-full flex-shrink-0"
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              backgroundColor: i === active ? col.accent : "rgba(30,30,46,0.15)",
            }}
          />
        ))}
      </div>

      {/* Progress bar under active dot */}
      {!paused && (
        <div className="flex justify-center mt-3">
          <div className="w-28 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: `${col.accent}20` }}>
            <div
              key={active}
              className="h-full rounded-full"
              style={{
                backgroundColor: col.accent,
                animation: "progress-fill 5s linear forwards",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress-fill {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
