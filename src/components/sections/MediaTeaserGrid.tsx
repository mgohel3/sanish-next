"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseVideo, Viewer, type Entry } from "@/components/sections/blocks/MediaGalleryBlock";

type Item = { image?: string; video?: string; caption?: string; alt?: string; category?: string };

/** Home "Media Gallery" tiles: a tap opens the photo / video in a viewer (same viewer as the Events page), with prev/next and Esc to close. */
export default function MediaTeaserGrid({ items }: { items: Item[] }) {
  const entries = useMemo<Entry[]>(
    () =>
      items.map((it) => ({
        image: (it.image || "").trim(),
        video: parseVideo(it.video),
        caption: (it.caption || "").trim(),
        alt: (it.alt || "").trim(),
        category: (it.category || "").trim(),
      })),
    [items],
  );
  const n = entries.length;
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open !== null ? entries[open] : null;
  const arrow = "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors";

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {entries.map((it, i) => {
          const v = it.video;
          const href = v?.kind === "youtube" ? `https://www.youtube.com/watch?v=${v.id}` : v?.kind === "vimeo" ? `https://vimeo.com/${v.id}` : v?.kind === "file" ? v.src : it.image;
          return (
            <a
              key={i}
              href={href}
              onClick={(e) => { e.preventDefault(); setOpen(i); }}
              className="group relative block overflow-hidden cursor-pointer"
              style={{ aspectRatio: "4 / 3", borderRadius: "20px", boxShadow: "0 16px 40px rgba(30,30,46,0.07)", backgroundColor: "#24262b" }}
              aria-label={it.caption || it.alt || (v ? "Watch video" : "View photo")}
            >
              <img
                loading="lazy"
                decoding="async"
                src={it.image}
                alt={it.alt || it.caption || "Sanish Laminates event"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {v && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="#24262b"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              )}
              {(it.caption || it.category) && (
                <span
                  className="absolute inset-x-0 bottom-0 p-3 sm:p-4 pt-12 text-white text-[12px] sm:text-[13px] leading-snug"
                  style={{ background: "linear-gradient(to top, rgba(20,20,30,0.82), rgba(20,20,30,0))", fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="line-clamp-2">{it.caption || it.category}</span>
                </span>
              )}
            </a>
          );
        })}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || "Media viewer"}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
        >
          <button ref={closeRef} type="button" onClick={close} aria-label="Close viewer" className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
          {n > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" className={`${arrow} left-3 sm:left-6`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" className={`${arrow} right-3 sm:right-6`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}
          <div className="w-full max-w-[1100px] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Viewer key={open} entry={current} />
            {(current.caption || current.category) && (
              <div className="mt-4 text-center text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                {current.category && <div className="text-[12px] md:text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">{current.category}</div>}
                {current.caption && <div className="text-[15px] font-semibold mt-0.5">{current.caption}</div>}
                {open !== null && n > 1 && <div className="text-[12px] text-white/50 mt-1">{open + 1} / {n}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
