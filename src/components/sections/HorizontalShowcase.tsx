"use client";

import { useRef, useState, useEffect, useMemo, useCallback, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import type { HorizontalShowcaseContent } from "@/lib/homepage";

const ACCENT = "#fabf7d";

const DEFAULT_COLLECTIONS = [
  { name: "S'Shades", link: "/laminates?collection=sshades", sub: "Premium Finishes", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Shades Collection.jpg", accent: ACCENT },
  { name: "Thre3", link: "/laminates?collection=thre3", sub: "Exclusive Designs", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Thre3 Collection.jpg", accent: ACCENT },
  { name: "Cool Colour", link: "/laminates?collection=cool-colour", sub: "Modern Shades", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_Cool Colour Collection.jpg", accent: ACCENT },
  { name: "Perspective V4", link: "/laminates?collection=08mm", sub: "Durable Series", category: "Laminates", image: "/assets/img/material/15-08-2026/Our Collections_0.8mm Collection.jpg", accent: ACCENT },
  { name: "Thermo Laminates", link: "/asa-sheets", sub: "Weather Resistant", category: "Thermo Laminates", image: "/assets/img/material/15-08-2026/thermocollection.jpg", accent: ACCENT },
];

// Filter tabs; each card's category must match one of these exactly. Both lists are editable in the CMS (Home page > Collections Showcase).
const DEFAULT_FILTERS = ["Laminates", "Thermo Laminates"];

const AUTOPLAY_DELAY = 4000;
const SCROLL_DURATION = 350; // ms — native "smooth" scroll drags on for large jumps, so we animate it ourselves

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function padL(track: HTMLElement) {
  return parseFloat(getComputedStyle(track).paddingLeft) || 0;
}

// Distance between a card and the same card in the next copy of the strip.
function setWidthOf(track: HTMLElement, n: number) {
  const a = track.children[0] as HTMLElement | undefined;
  const b = track.children[n] as HTMLElement | undefined;
  return a && b ? b.offsetLeft - a.offsetLeft : 0;
}

export default function HorizontalShowcase({ content = {} }: { content?: HorizontalShowcaseContent }) {
  const heading = content.heading || "Our Collections";
  const router = useRouter();

  const collections = useMemo(() => {
    if (content.collections && content.collections.length > 0) {
      return content.collections.map((c) => ({
        name: c.name || "",
        sub: c.sub || "",
        category: c.category || "",
        image: c.image || "",
        link: c.link || "",
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
  const n = collections.length;
  const loop = n >= 2;
  const displayItems = useMemo(
    () =>
      Array.from({ length: loop ? 3 : 1 }).flatMap((_, copy) =>
        collections.map((item, i) => ({ item, i, clone: loop && copy !== 1, key: `${copy}-${item.name}-${i}` })),
      ),
    [collections, loop],
  );

  const mobileStyle = content.mobile_style === "strips" || content.mobile_style === "rows" ? content.mobile_style : "slider";
  const desktopStyle = content.desktop_style === "strips" ? "strips" : "slider";
  // null until mounted; phones + tablets (< 1024px) use the mobile style
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const secs = Number(content.autoplay_seconds ?? 4);
  const autoMs = Number.isFinite(secs) && secs > 0 ? secs * 1000 : 0;
  const shownStyle = wide === null ? "slider" : wide ? desktopStyle : mobileStyle;
  const accordionShown = shownStyle !== "slider";
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollAnimRef = useRef<number | null>(null);

  // Tracks an in-progress mouse drag so a real drag doesn't also fire a
  // card's onClick once the pointer is released.
  const dragRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  /* ── Fixed-duration eased scroll — native scroll-behavior:smooth has no
     speed control and visibly drags on for bigger jumps, so we animate the
     scrollLeft ourselves at a fixed, snappy duration regardless of distance. ── */
  // Keep the strip inside the middle copy. Every copy looks identical, so the jump is invisible.
  const recentre = useCallback(() => {
    const track = trackRef.current;
    if (!track || n < 2) return;
    const w = setWidthOf(track, n);
    if (!w) return;
    const startMid = (track.children[n] as HTMLElement).offsetLeft - track.offsetLeft - padL(track);
    if (track.scrollLeft >= startMid + w) track.scrollLeft -= w;
    else if (track.scrollLeft < startMid) track.scrollLeft += w;
  }, [n]);

  /* ── Fixed-duration eased scroll — native scroll-behavior:smooth has no
     speed control and visibly drags on for bigger jumps, so we animate the
     scrollLeft ourselves. `idx` is the position in the three-copy strip. ── */
  const scrollToCard = useCallback((idx: number, ms: number = SCROLL_DURATION, ease: (t: number) => number = easeOutCubic) => {
    const track = trackRef.current;
    const card = track?.children[idx] as HTMLElement | undefined;
    if (!track || !card) return;
    if (scrollAnimRef.current !== null) cancelAnimationFrame(scrollAnimRef.current);

    const start = track.scrollLeft;
    const target = card.offsetLeft - track.offsetLeft - padL(track);
    const distance = target - start;
    if (distance === 0) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / ms, 1);
      track.scrollLeft = start + distance * ease(t);
      if (t < 1) scrollAnimRef.current = requestAnimationFrame(step);
      else { scrollAnimRef.current = null; recentre(); }
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  }, [recentre]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    scrollToCard(loop ? n + idx : idx);
  };

  // Start on the first card of the middle copy, and re-settle after a swipe or drag stops.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loop || accordionShown) return;
    const w = setWidthOf(track, n);
    if (w && track.scrollLeft < (track.children[n] as HTMLElement).offsetLeft - track.offsetLeft - padL(track)) {
      track.scrollLeft = (track.children[n] as HTMLElement).offsetLeft - track.offsetLeft - padL(track);
    }
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (idle) clearTimeout(idle);
      idle = setTimeout(() => { if (scrollAnimRef.current === null && !dragRef.current.isDown) recentre(); }, 140);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); if (idle) clearTimeout(idle); };
  }, [loop, n, accordionShown, wide, recentre]);

  const scrollToFilter = (filter: string) => {
    if (accordionShown) {
      const first = collections.findIndex((c) => c.category === filter);
      if (first >= 0) setOpenIdx(first);
      return;
    }
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

  /* ── Autoplay — glides to the next card; after the last one it carries on into the first card of the next copy, forever. ── */
  useEffect(() => {
    if (collections.length < 2 || accordionShown || !autoMs) return;
    const id = setTimeout(() => {
      const next = activeIdx + 1 >= collections.length ? 0 : activeIdx + 1;
      setActiveIdx(next);
      scrollToCard(activeIdx + 1 >= collections.length ? 2 * collections.length : collections.length + next, 800, easeInOutCubic);
    }, autoMs);
    return () => clearTimeout(id);
  }, [activeIdx, collections.length, scrollToCard, accordionShown, autoMs]);

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
    const link = collections[i]?.link;
    if (link) {
      // The page this card was given in the CMS (Home page > Collections Showcase > Link).
      if (/^https?:\/\//i.test(link)) window.open(link, "_blank", "noopener");
      else router.push(link);
      return;
    }
    goTo(i);
  };

  // Expanding cards: one open, the rest collapsed. Tap a collapsed one to open it; tap the open one to go to its page.
  const accList = collections.map((c, i) => ({ c, i })); // every card shows; the badges only jump to the first card of a category
  const accOpen = accList.some((x) => x.i === openIdx) ? (openIdx as number) : accList[0]?.i;
  const onAcc = (i: number) => {
    if (i !== accOpen) { setOpenIdx(i); return; }
    handleCardClick(i);
  };
  useEffect(() => {
    if (!accordionShown || !autoMs || accList.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => {
      const pos = accList.findIndex((x) => x.i === accOpen);
      setOpenIdx(accList[(pos + 1) % accList.length].i);
    }, autoMs);
    return () => clearTimeout(id);
  }, [accordionShown, autoMs, accOpen, accList.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderAcc = (kind: "strips" | "rows", wrapCls: string) => (
    <div className={wrapCls}>
      <div
        className={kind === "strips" ? "flex gap-2 h-[420px] lg:h-[520px]" : "flex flex-col gap-2"}
        style={{ padding: "4px 0 16px" }}
      >
        {accList.map(({ c, i }) => {
          const open = i === accOpen;
          return (
            <div
              key={`${c.name}-${i}`}
              onClick={() => onAcc(i)}
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => { if (e.key === "Enter") onAcc(i); }}
              className="relative overflow-hidden cursor-pointer select-none"
              style={
                kind === "strips"
                  ? { flex: open ? 5 : 1, minWidth: 0, borderRadius: 12, backgroundColor: "#12131a", transition: "flex 0.55s cubic-bezier(.3,.7,.2,1)" }
                  : { height: open ? 300 : 64, borderRadius: 18, backgroundColor: "#12131a", transition: "height 0.55s cubic-bezier(.3,.7,.2,1)" }
              }
            >
              <img loading="lazy" decoding="async" src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.15) 55%, transparent 100%)" }} />
              {kind === "strips" ? (
                <span
                  className="absolute text-white uppercase font-bold whitespace-nowrap"
                  style={{ left: "50%", bottom: 14, writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)", fontSize: 11, letterSpacing: "0.14em", opacity: open ? 0 : 1, transition: "opacity .3s" }}
                >
                  {c.name}
                </span>
              ) : (
                <span className="absolute inset-y-0 left-4 flex items-center text-white uppercase font-bold" style={{ fontSize: 12, letterSpacing: "0.14em", opacity: open ? 0 : 1, transition: "opacity .3s" }}>
                  {c.name}
                </span>
              )}
              {c.sub && (
                <div
                  className="absolute top-3 left-3 max-w-[calc(100%-24px)] px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ backgroundColor: c.accent, borderRadius: 999, opacity: open ? 1 : 0, transition: "opacity .4s .15s", pointerEvents: "none" }}
                >
                  {c.sub}
                </div>
              )}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(8px)", transition: "opacity .4s .15s, transform .4s .15s", pointerEvents: open ? "auto" : "none" }}
              >
                <h3 className="text-white leading-[1.1]" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>{c.name}</h3>
                {c.link && <span className="inline-block mt-2 text-[12px] font-semibold text-white underline">View collection</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="home-section--compact relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="site-container">

        {/* Header — title left-aligned, filter tabs centred */}
        <div className="mb-2 lg:mb-10">
          <h2 className="home-heading mb-6">
            {heading}
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto w-fit max-w-full mx-0 lg:mx-auto px-1 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((filter) => {
              const isActive = (accordionShown ? collections[accOpen ?? 0]?.category : collections[activeIdx]?.category) === filter;
              return (
                <button
                  key={filter}
                  onClick={() => scrollToFilter(filter)}
                  className={isActive ? "shadow-[0_6px_18px_rgba(250,191,125,0.40)] max-lg:shadow-[0_2px_5px_rgba(250,191,125,0.35)]" : "shadow-[0_2px_8px_rgba(30,30,46,0.06)] max-lg:shadow-none"}
                  style={{
                    fontFamily: "var(--font-heebo)",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    fontSize: "12px",
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
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${mobileStyle === "slider" ? "max-lg:block" : "max-lg:hidden"} ${desktopStyle === "slider" ? "lg:block" : "lg:hidden"}`}>
        {/* Carousel — native horizontal scroll, so touch swipe works out of
            the box; mouse click-and-drag is added on top for desktop. */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar"
          style={{
            // room round the cards so the enlarged active card and its glow are not cut off, with a soft fade at the two ends
            padding: "28px 16px 36px",
            margin: "0 -16px",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
            WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 20px), transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 20px), transparent 100%)",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {displayItems.map(({ item, i, clone, key }) => (
            <div
              key={key}
              aria-hidden={clone || undefined}
              onClick={() => handleCardClick(i)}
              role={item.link ? "link" : undefined}
              tabIndex={clone ? -1 : item.link ? 0 : undefined}
              onKeyDown={(e) => { if (item.link && e.key === "Enter") handleCardClick(i); }}
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
                alt={clone ? "" : item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div
                  className="inline-block px-3 py-1 text-[12px] md:text-[9px] uppercase tracking-[0.16em] font-semibold text-white mb-3"
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
        <div className="flex items-center justify-center gap-2 mt-2">
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

        {renderAcc("strips", `${mobileStyle === "strips" ? "max-lg:block" : "max-lg:hidden"} ${desktopStyle === "strips" ? "lg:block" : "lg:hidden"}`)}
        {renderAcc("rows", `${mobileStyle === "rows" ? "max-lg:block" : "max-lg:hidden"} lg:hidden`)}
      </div>
    </section>
  );
}
