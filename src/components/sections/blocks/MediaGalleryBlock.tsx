"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { resolveTextStyle } from "@/lib/textStyle";

export interface MediaItem {
  image?: string;
  video?: string;
  caption?: string;
  category?: string;
}
export interface MediaGalleryContent {
  heading?: string;
  sub?: string;
  columns?: "2" | "3" | "4";
  items?: MediaItem[];
  /** Optional dashboard "Text Style" overrides for the heading (see lib/textStyle.ts). */
  text_color?: string;
  heading_font?: "sans" | "serif" | "";
  heading_size?: "sm" | "lg" | "xl" | "";
}

const PAGE_SIZE = 24;

const GRID_COLS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "file"; src: string };

function parseVideo(url?: string): VideoSource | null {
  const v = (url || "").trim();
  if (!v) return null;
  const yt = v.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return { kind: "youtube", id: yt[1] };
  const vm = v.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vm) return { kind: "vimeo", id: vm[1] };
  return { kind: "file", src: v };
}

/** Where the card links if JavaScript is off / opened in a new tab: the photo or the video itself. */
function entryHref(e: { image: string; video: VideoSource | null }): string {
  const v = e.video;
  if (v?.kind === "youtube") return `https://www.youtube.com/watch?v=${v.id}`;
  if (v?.kind === "vimeo") return `https://vimeo.com/${v.id}`;
  if (v?.kind === "file") return v.src;
  return e.image;
}

interface Entry {
  image: string;
  video: VideoSource | null;
  caption: string;
  category: string;
}

/**
 * Photos + videos from events and meetups — CMS-managed block (Pages > any
 * page > "Events & Media Gallery"). Filter tabs are built from the "Event /
 * album" names editors type on the items; 24 per page with the shared
 * Pagination; clicking a card opens a viewer (photo, uploaded MP4, YouTube or
 * Vimeo) with keyboard prev/next and Esc to close.
 */
export default function MediaGalleryBlock({ content = {} }: { content?: MediaGalleryContent }) {
  const { heading, sub, columns = "3", items = [] } = content;
  const headingStyle = resolveTextStyle(content);

  const entries = useMemo<Entry[]>(
    () =>
      items
        .map((it) => ({
          image: (it.image || "").trim(),
          video: parseVideo(it.video),
          caption: (it.caption || "").trim(),
          category: (it.category || "").trim(),
        }))
        .filter((e) => e.image || e.video),
    [items],
  );

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const e of entries) if (e.category && !seen.includes(e.category)) seen.push(e.category);
    return seen;
  }, [entries]);

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? entries.filter((e) => e.category === activeCategory) : entries),
    [entries, activeCategory],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const n = filtered.length;

  const goToPage = (p: number) => {
    setPage(p);
    document.getElementById("media-gallery-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const chooseCategory = (c: string) => {
    setActiveCategory(c);
    setPage(1);
  };

  const openAt = (i: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null || n === 0 ? o : (o + d + n) % n)),
    [n],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const current = open !== null ? filtered[open] : null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {(heading || sub) && (
          <div className="text-center mb-14">
            {heading && (
              <h2
                className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]"
                style={headingStyle}
              >
                {heading}
              </h2>
            )}
            {sub && (
              <p className="text-[15px] text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-[1.7]">{sub}</p>
            )}
          </div>
        )}

        {entries.length === 0 ? (
          <div
            className="text-center rounded-[20px] border border-dashed border-[var(--color-border-subtle)] bg-white py-20 px-6 text-[15px] text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Photos and videos from our events and meetups will appear here soon.
          </div>
        ) : (
          <>
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10" role="tablist" aria-label="Filter by event">
                {["", ...categories].map((c) => {
                  const active = c === activeCategory;
                  return (
                    <button
                      key={c || "__all"}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseCategory(c)}
                      className="rounded-full px-5 py-2 text-[13px] font-semibold border transition-all"
                      style={
                        active
                          ? { backgroundColor: "var(--text-primary)", color: "white", borderColor: "var(--text-primary)" }
                          : { color: "var(--text-secondary)", borderColor: "rgba(30,30,46,0.14)", backgroundColor: "white" }
                      }
                    >
                      {c || "All"}
                    </button>
                  );
                })}
              </div>
            )}

            <div id="media-gallery-top" className={`grid grid-cols-1 ${GRID_COLS[columns] || GRID_COLS["3"]} gap-6 scroll-mt-28`}>
              {pageItems.map((e, k) => {
                const idx = (currentPage - 1) * PAGE_SIZE + k;
                const isVideo = !!e.video;
                const label = e.caption || e.category || (isVideo ? "video" : "photo");
                return (
                  // An <a>, not a <button>: globals.css forces every button to a pill
                  // (border-radius: 999px !important), which would turn these tiles into ovals.
                  <a
                    key={idx}
                    href={entryHref(e)}
                    onClick={(ev) => { ev.preventDefault(); openAt(idx); }}
                    aria-label={`${isVideo ? "Play video" : "View photo"}: ${label}`}
                    className="group relative block w-full overflow-hidden rounded-[20px] bg-[#24262b]"
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    <Thumb entry={e} />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(10,8,18,0.70) 0%, rgba(10,8,18,0.05) 55%)" }}
                    />
                    {isVideo && (
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="var(--text-primary)"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    )}
                    {(e.caption || e.category) && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {e.category && (
                          <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                            {e.category}
                          </div>
                        )}
                        {e.caption && (
                          <div className="text-white text-[14px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                            {e.caption}
                          </div>
                        )}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>

            <Pagination page={currentPage} totalPages={totalPages} onChange={goToPage} />
          </>
        )}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || current.category || "Media viewer"}
          // Above the sticky header (z-index 9999) but below the site popups (99998+).
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>

          {n > 1 && (
            <>
              <button
                type="button"
                onClick={(ev) => { ev.stopPropagation(); step(-1); }}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={(ev) => { ev.stopPropagation(); step(1); }}
                aria-label="Next"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}

          <div className="w-full max-w-[1100px] flex flex-col items-center" onClick={(ev) => ev.stopPropagation()}>
            <Viewer key={open} entry={current} />
            {(current.caption || current.category || n > 1) && (
              <div className="mt-4 text-center text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                {current.category && (
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">{current.category}</div>
                )}
                {current.caption && <div className="text-[15px] font-semibold mt-0.5">{current.caption}</div>}
                {n > 1 && open !== null && <div className="text-[12px] text-white/50 mt-1">{open + 1} / {n}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/** Grid thumbnail: the photo / cover image, else a YouTube still, else the video's first frame. */
function Thumb({ entry }: { entry: Entry }) {
  const cls = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700";
  if (entry.image) return <img src={entry.image} alt={entry.caption} loading="lazy" className={cls} />;
  const v = entry.video;
  if (v?.kind === "youtube")
    return <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={entry.caption} loading="lazy" className={cls} />;
  if (v?.kind === "file")
    return <video src={`${v.src}#t=0.1`} preload="metadata" muted playsInline className={cls} />;
  return null;
}

function Viewer({ entry }: { entry: Entry }) {
  const v = entry.video;
  if (!v) {
    return <img src={entry.image} alt={entry.caption} className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl" />;
  }
  if (v.kind === "file") {
    return (
      <video
        src={v.src}
        poster={entry.image || undefined}
        controls
        autoPlay
        playsInline
        className="max-h-[78vh] max-w-full rounded-xl bg-black"
      />
    );
  }
  const src =
    v.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${v.id}?autoplay=1`;
  return (
    <div className="w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16 / 9", maxHeight: "78vh" }}>
      <iframe
        src={src}
        title={entry.caption || "Event video"}
        className="w-full h-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
