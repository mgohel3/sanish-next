"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Palette ── */
const C = {
  bgPrimary:   "#F5F2EE",
  bgSecondary: "#EDE8E3",
  bgDark:      "#2C3E50",
  textPrimary: "#1C1C1C",
  textSec:     "#5C5C5C",
  accent:      "#C4916A",
  border:      "#E5E0D8",
};

const SLIDES = [
  {
    image:   "/assets/img/material/shadesCollection.png",
    eyebrow: "S'Shades Collection",
    title:   "Where Colour Meets\nPrecision Craft",
    sub:     "Over 200 curated shades engineered for architects, designers and discerning homeowners.",
    dot:     "#85addc",
    cta:     { label: "Explore S'Shades", href: "/collection" },
  },
  {
    image:   "/assets/img/material/flutedCollection.webp",
    eyebrow: "Fluted Panel Series",
    title:   "Texture That\nTransforms Spaces",
    sub:     "Architectural fluted panels that turn ordinary walls into design statements.",
    dot:     "#85addc",
    cta:     { label: "View Fluted Series", href: "/collection" },
  },
  {
    image:   "/assets/img/material/cool_colour_Collection.webp",
    eyebrow: "Cool Colour Collection",
    title:   "Bold. Vibrant.\nUncompromising.",
    sub:     "Cool Colour laminates designed for spaces that refuse to blend in.",
    dot:     "#85addc",
    cta:     { label: "Discover Cool Colour", href: "/collection" },
  },
];

export default function Home2Hero() {
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setCurrent((c) => (c + 1) % SLIDES.length); setAnimating(false); }, 400);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const go = (i: number) => {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 400);
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-screen flex overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.bgPrimary} 0%, ${C.bgSecondary} 100%)` }}
    >
      {/* ── Left: text panel ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[55%] px-6 md:px-12 lg:px-16 pt-32 pb-20">

        {/* H1 */}
        <h1
          className={`leading-[1.05] font-semibold mb-6 transition-all duration-500 ${animating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
          style={{
            fontSize: "clamp(40px, 5vw, 68px)",
            fontFamily: "var(--font-vogue)",
            color: C.textPrimary,
            whiteSpace: "pre-line",
            letterSpacing: "-0.02em",
          }}
        >
          {slide.title}
        </h1>

        {/* Sub */}
        <p
          className={`text-[17px] leading-[1.75] mb-10 max-w-[480px] transition-all duration-500 delay-75 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          style={{ fontFamily: "var(--font-heebo)", color: C.textSec }}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className={`flex flex-wrap gap-4 mb-16 transition-all duration-500 delay-100 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <Link href={slide.cta.href}
            className="flex items-center gap-2.5 text-white text-[12px] font-medium px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: C.accent, borderRadius: "999px",
              fontFamily: "var(--font-heebo)", letterSpacing: "0.04em",
              boxShadow: `0 6px 20px ${C.accent}44`,
            }}>
            {slide.cta.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact-us"
            className="flex items-center gap-2.5 text-[12px] font-medium px-8 py-4 border transition-all duration-300 hover:-translate-y-1"
            style={{
              color: C.textPrimary, border: `1.5px solid ${C.textPrimary}`,
              borderRadius: "999px", fontFamily: "var(--font-heebo)",
              letterSpacing: "0.04em",
            }}>
            Request Free Samples
          </Link>
        </div>

        {/* Slide dots + trust badges */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => go(i)}
                className="transition-all duration-400 cursor-pointer border-0 p-0"
                style={{ width: i === current ? "32px" : "8px", height: "8px", borderRadius: "999px", backgroundColor: i === current ? C.accent : C.border }} />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["ISI Certified", "20+ Years", "500+ Designs", "Pan India"].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.accent }} />
                <span className="text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: C.textSec, fontFamily: "var(--font-heebo)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: image panel ── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]" style={{ borderRadius: "0 0 0 40px", overflow: "hidden" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            <img src={s.image} alt={s.eyebrow} className="w-full h-full object-cover" />
            {/* Soft left fade to blend into cream */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bgSecondary} 0%, transparent 18%)` }} />
          </div>
        ))}

        {/* Thumbnail strip — right edge */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => go(i)}
              className="overflow-hidden cursor-pointer border-0 p-0 transition-all duration-400"
              style={{
                borderRadius: "12px", width: "72px", height: i === current ? "100px" : "64px",
                opacity: i === current ? 1 : 0.45,
                border: i === current ? `2px solid ${C.accent}` : `2px solid ${C.border}`,
              }}>
              <img src={s.image} alt={s.eyebrow} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
