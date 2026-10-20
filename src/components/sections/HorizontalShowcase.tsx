"use client";

import { useRef, useState, useEffect, useMemo, useCallback, type MouseEvent } from "react";
import type { HorizontalShowcaseContent } from "@/lib/homepage";

const ACCENT = "#fabf7d";

const DEFAULT_COLLECTIONS = [
  { name: "S'Shades", sub: "Premium Finishes", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Shades Collection.jpg", accent: ACCENT },
  { name: "Thre3", sub: "Exclusive Designs", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Thre3 Collection.jpg", accent: ACCENT },
  { name: "Cool Colour", sub: "Modern Shades", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Cool Colour Collection.jpg", accent: ACCENT },
  { name: "Perspective V4", sub: "Durable Series", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_0.8mm Collection.jpg", accent: ACCENT },
  { name: "Thermo Laminates", sub: "Weather Resistant", category: "Thermo Laminates", image: "/assets/img/material/15-08-2026/thermocollection.jpg", accent: ACCENT },
];

// Filter tabs; each card's category must match one of these exactly. Both lists are editable in the CMS (Home page > Collections Showcase).
const DEFAULT_FILTERS = ["Laminates", "Thermo Laminates"];

const AUTOPLAY_DELAY = 4000;
const SCROLL_DURATION = 350; // ms — native "smooth" scroll drags on for large jumps, so we animate it ourselves

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HorizontalShowcase({ content = {} }: { content?: HorizontalShowcaseContent }) {
  const heading = content.heading || "Our Collections";

  const collections = useMemo(() => {
    if (content.collections && content.collections.length > 0) {
      return content.collections.map((c) => ({
        name: c.name || "",
        sub: c.sub || "",
        category: c.category || "",
        image: c.image || "",
        accent: ACCENT,
      }));
    }
    return DEFAULT_COLLECTIONS;
  }, [content.collections]);

  const filters = useMemo(() => {
    if (content.filters && content.filters.length > 0) {
      return content.filters.map((f) => f.label || "").filter(Boolean);
    }
    return DEFAULT_FILTERS;
  }, [content.filters]);

  // Every collection appears exactly once — autoplay wraps back to the first card instead of cloning it.
  const displayItems = collections;

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollAnimRef = useRef<number | null>(null);

  // Tracks an in-progress mouse drag so a real drag doesn't also fire a
  // card's onClick once the pointer is released.
  const dragRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  /* ── Fixed-duration eased scroll — native scroll-behavior:smooth has no
     speed control and visibly drags on for bigger jumps, so we animate the
     scrollLeft ourselves at a fixed, snappy duration regardless of distance. ── */
  const scrollToCard = useCallback((idx: number) => {
    const track = trackRef.current;
    const card = track?.children[idx] as HTMLElement | undefined;
    if (!track || !card) return;
    if (scrollAnimRef.current !== null) cancelAnimationFrame(scrollAnimRef.current);

    const start = track.scrollLeft;
    const target = card.offsetLeft - track.offsetLeft;
    const distance = target - start;
    if (distance === 0) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / SCROLL_DURATION, 1);
      track.scrollLeft = start + distance * easeOutCubic(t);
      scrollAnimRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  }, []);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    scrollToCard(idx);
  };

  const scrollToFilter = (filter: string) => {
    const matches = collections
      .map((c, i) => ({ ...c, i }))
      .filter((c) => c.category === filter);
    if (matches.length === 0) return;
    // Cycle to the next card in this category so clicking always moves,
    // even when already viewing a card that belongs to it.
    const currentPos = matches.findIndex((m) => m.i === activeIdx);
    const next = currentPos >= 0 ? matches[(currentPos + 1) % matches.length] : matches[0];
    goTo(next.i);
  };

  /* ── Autoplay — steps forward through the real cards and, after the last one, scrolls back to the first. ── */
  useEffect(() => {
    if (collections.length < 2) return;
    const id = setTimeout(() => {
      const next = activeIdx + 1 >= collections.length ? 0 : activeIdx + 1;
      setActiveIdx(next);
      scrollToCard(next);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(id);
  }, [activeIdx, collections.length, scrollToCard]);

  /* ── Click-and-drag scrolling (desktop) — touch swipe already works
     natively on the overflow-x:auto track, no extra code needed there. ── */
  const onMouseDown = (e: MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    if (scrollAnimRef.current !== null) cancelAnimationFrame(scrollAnimRef.current);
    dragRef.current = { isDown: true, startX: e.pageX, startScrollLeft: track.scrollLeft, moved: false };
  };
  const onMouseMove = (e: MouseEvent) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!drag.isDown || !track) return;
    const dx = e.pageX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    track.scrollLeft = drag.startScrollLeft - dx;
  };
  const endDrag = () => {
    dragRef.current.isDown = false;
  };

  const handleCardClick = (i: number) => {
    if (dragRef.current.moved) return; // this was a drag, not a click
    goTo(i);
  };

  return (
    <section className="home-section--compact relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="site-container">

        {/* Header — title left-aligned, filter tabs centred */}
        <div className="mb-10">
          <h2 className="home-heading mb-6">
            {heading}
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

        {/* Carousel — native horizontal scroll, so touch swipe works out of
            the box; mouse click-and-drag is added on top for desktop. */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar"
          style={{
            padding: "16px",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {displayItems.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              onClick={() => handleCardClick(i)}
              className={`group flex-shrink-0 relative cursor-pointer select-none ${i === activeIdx ? "scale-[1.03]" : ""}`}
              style={{
                width: "clamp(240px, 28vw, 360px)",
                aspectRatio: "4 / 5",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#12131a",
                boxShadow: i === activeIdx
                  ? "0 8px 20px rgba(250,191,125,0.28), 0 28px 64px rgba(250,191,125,0.22)"
                  : "0 20px 48px rgba(30,30,46,0.08)",
                transition: "box-shadow 0.4s ease, transform 0.4s ease",
              }}
            >
              {/* Card locked to the source images' native 4:5 ratio, so object-cover
                  fills it completely with no letterboxing and no meaningful cropping. */}
              <img loading="lazy" decoding="async"
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                draggable={false}
              />
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

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {collections.map((item, i) => (
            <button
              key={item.name}
              onClick={() => goTo(i)}
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
