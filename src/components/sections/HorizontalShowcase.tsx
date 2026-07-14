"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";

const collections = [
  { name: "S'Shades",    sub: "Premium Finishes",  category: "Laminates",  image: "/assets/img/material/shadesCollection.png",         accent: "#fabf7d" },
  { name: "Thre3",       sub: "Exclusive Designs",  category: "Laminates",  image: "/assets/img/material/threeCollection.jpg",          accent: "#fabf7d" },
  { name: "Fluted",      sub: "Textured Panels",    category: "Louvers",    image: "/assets/img/material/flutedCollection.webp",        accent: "#fabf7d" },
  { name: "0.8mm",       sub: "Durable Series",     category: "ASA Sheets", image: "/assets/img/material/08mmCollection.webp",          accent: "#fabf7d" },
  { name: "Cool Colour", sub: "Modern Shades",      category: "Laminates",  image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#fabf7d" },
];

const filters = ["Laminates", "Louvers", "ASA Sheets"];

const AUTOPLAY_DELAY = 4000;

export default function HorizontalShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const scrollToFilter = (filter: string) => {
    const idx = collections.findIndex((c) => c.category === filter);
    if (idx >= 0) setActiveIdx(idx);
  };

  /* ── Recompute slide offset from the active card's position ── */
  useLayoutEffect(() => {
    const recalc = () => {
      const track = trackRef.current;
      const card = track?.children[activeIdx] as HTMLElement | undefined;
      if (!track || !card) return;
      setOffsetX(card.offsetLeft - track.offsetLeft);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [activeIdx]);

  /* ── Autoplay — loops through cards, resets on any interaction ── */
  useEffect(() => {
    const id = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % collections.length);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(id);
  }, [activeIdx]);

  return (
    <section className="home-section--compact relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="site-container">

        {/* Header — centred */}
        <div className="text-center mb-10">
          <h2
            className="leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: "clamp(30px, 3.2vw, 46px)", color: "#1E1E2E" }}
          >
            Our Collections
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filters.map((filter) => {
              const isActive = collections[activeIdx]?.category === filter;
              return (
                <button
                  key={filter}
                  onClick={() => scrollToFilter(filter)}
                  style={{
                    fontFamily: "var(--font-heebo)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "9px 18px",
                    borderRadius: "999px",
                    border: isActive ? "none" : "1.5px solid rgba(30,30,46,0.14)",
                    backgroundColor: isActive ? "#fabf7d" : "white",
                    color: isActive ? "#fff" : "#6B6B80",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
                    boxShadow: isActive ? "0 6px 18px rgba(250,191,125,0.40)" : "0 2px 8px rgba(30,30,46,0.06)",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simple carousel */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{
              transform: `translateX(-${offsetX}px)`,
              transition: "transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)",
              paddingBottom: 8,
            }}
          >
            {collections.map((item, i) => (
              <div
                key={item.name}
                onClick={() => setActiveIdx(i)}
                className="flex-shrink-0 relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  width: "clamp(240px, 28vw, 360px)",
                  height: "clamp(300px, 46vh, 420px)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: i === activeIdx
                    ? "0 0 0 3px #fabf7d, 0 20px 48px rgba(250,191,125,0.22)"
                    : "0 20px 48px rgba(30,30,46,0.08)",
                  transition: "box-shadow 0.4s ease",
                }}
              >
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div
                    className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-white mb-3"
                    style={{ backgroundColor: item.accent, borderRadius: "999px" }}
                  >
                    {item.sub}
                  </div>
                  <h3 className="text-white leading-[1.1]" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {collections.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to ${item.name}`}
              aria-current={i === activeIdx}
              style={{
                width: i === activeIdx ? 24 : 8,
                height: 8,
                borderRadius: "999px",
                backgroundColor: i === activeIdx ? "#fabf7d" : "rgba(30,30,46,0.18)",
                border: "none",
                cursor: "pointer",
                transition: "width 400ms cubic-bezier(0.25,0.46,0.45,0.94), background-color 300ms ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
