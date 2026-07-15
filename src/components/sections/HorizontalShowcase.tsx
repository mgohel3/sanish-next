"use client";

import { useRef, useState, useEffect, useCallback, type MouseEvent } from "react";

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

  // Tracks an in-progress mouse drag so a real drag doesn't also fire a
  // card's onClick once the pointer is released.
  const dragRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  /* ── Native scroll — this is the actual scrollable element now, so
     there's no custom transform/offset math left to drift out of sync
     with what's on screen (that was the root cause of the cropping). ── */
  const scrollToCard = useCallback((idx: number) => {
    const track = trackRef.current;
    const card = track?.children[idx] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
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

  /* ── Autoplay — loops through cards, resets on any interaction ── */
  useEffect(() => {
    const id = setTimeout(() => {
      const next = (activeIdx + 1) % collections.length;
      setActiveIdx(next);
      scrollToCard(next);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(id);
  }, [activeIdx, scrollToCard]);

  /* ── Click-and-drag scrolling (desktop) — touch swipe already works
     natively on the overflow-x:auto track, no extra code needed there. ── */
  const onMouseDown = (e: MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { isDown: true, startX: e.pageX, startScrollLeft: track.scrollLeft, moved: false };
    track.style.scrollBehavior = "auto";
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
    const track = trackRef.current;
    dragRef.current.isDown = false;
    if (track) track.style.scrollBehavior = "smooth";
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

        {/* Carousel — native horizontal scroll, so touch swipe works out of
            the box; mouse click-and-drag is added on top for desktop. */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar"
          style={{
            padding: "16px",
            cursor: "grab",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {collections.map((item, i) => (
            <div
              key={item.name}
              onClick={() => handleCardClick(i)}
              className={`flex-shrink-0 relative cursor-pointer select-none transition-transform duration-400 hover:scale-[1.02] ${i === activeIdx ? "scale-[1.03]" : ""}`}
              style={{
                width: "clamp(240px, 28vw, 360px)",
                height: "clamp(300px, 46vh, 420px)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: i === activeIdx
                  ? "0 8px 20px rgba(250,191,125,0.28), 0 28px 64px rgba(250,191,125,0.22)"
                  : "0 20px 48px rgba(30,30,46,0.08)",
                transition: "box-shadow 0.4s ease",
              }}
            >
              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
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
