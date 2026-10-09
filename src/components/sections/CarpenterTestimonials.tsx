"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import IconButton from "@/components/ui/IconButton";
import type { CarpenterTestimonial } from "@/lib/testimonials";

const AVATAR_COLORS = ["#85addc", "#ac8cc0", "#f39ba2", "#fabf7d"];

/**
 * Carpenter testimonials carousel on /rewards, above the FAQ section —
 * CMS-managed via Dashboard > Testimonials (add / hide / remove, reorder by
 * drag). Same slide mechanics as WhyUsCarousel.tsx (auto-play, prev/next
 * arrows, dots, 3-up desktop / 1-up mobile) so it matches the carousel
 * pattern already used elsewhere on the site.
 */
export default function CarpenterTestimonials({
  testimonials,
  heading,
  sub,
}: {
  testimonials: CarpenterTestimonial[];
  heading?: string;
  sub?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const paused = useRef(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const maxIndex = Math.max(testimonials.length - visibleCards, 0);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3);
      else setVisibleCards(1);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (testimonials.length <= visibleCards) return;
    const id = setInterval(() => {
      if (!paused.current) {
        setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
      }
    }, 3800);
    return () => clearInterval(id);
  }, [maxIndex, testimonials.length, visibleCards]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

  if (testimonials.length === 0) return null;

  const prev = () => setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () => setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));

  const cardGap = 20;
  const totalGap = (visibleCards - 1) * cardGap;
  const cardWidth = `calc((100% - ${totalGap}px) / ${visibleCards})`;
  const slideOffset = `calc(-${activeIndex} * (((100% - ${totalGap}px) / ${visibleCards}) + ${cardGap}px))`;

  return (
    <section
      className="home-section--compact relative overflow-hidden bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="site-container">

        {/* Header — centered, same size as the "What You Get" heading above
            this section, matching that section's own treatment exactly. */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
            {heading ?? "What Carpenters Say"}
          </h2>
          {sub && (
            <p className="mt-4 text-[15px] text-[var(--text-secondary)] max-w-[560px] mx-auto leading-[1.7]">{sub}</p>
          )}
        </div>

        {/* Slider viewport */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              gap: `${cardGap}px`,
              transform: `translateX(${slideOffset})`,
              transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {testimonials.map((t, i) => (
              <div key={t.id}
                className="shrink-0 p-8 bg-white border border-[var(--color-border-subtle)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(30,30,46,0.06)] transition-all duration-300 flex flex-col"
                style={{ width: cardWidth, borderRadius: "24px" }}>
                {t.proof ? (
                  <a
                    href={t.proof}
                    onClick={(e) => { e.preventDefault(); setLightbox({ src: t.proof as string, alt: `Payment proof — ${t.name}` }); }}
                    aria-label={`View payment proof from ${t.name}`}
                    className="mb-5 block h-[220px] rounded-[14px] bg-[var(--bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden cursor-zoom-in"
                  >
                    <img src={t.proof} alt={`Payment proof — ${t.name}`} loading="lazy" className="w-full h-full object-cover object-top" />
                  </a>
                ) : (
                  <svg className="w-7 h-7 mb-5" viewBox="0 0 24 24" fill="var(--accent-blue)" opacity="0.25">
                    <path d="M9.333 6C6.4 6 4 8.4 4 11.333c0 2.934 2.4 5.334 5.333 5.334.267 0 .534-.027.8-.054C9.333 18.027 7.733 19 5.6 19v2c3.6 0 6.667-2.667 6.667-6.4V11.33C12.267 8.4 10.933 6 9.333 6zm10.667 0c-2.933 0-5.333 2.4-5.333 5.333 0 2.934 2.4 5.334 5.333 5.334.267 0 .534-.027.8-.054C20 18.027 18.4 19 16.267 19v2c3.6 0 6.666-2.667 6.666-6.4V11.33C22.933 8.4 21.6 6 20 6z" />
                  </svg>
                )}
                <p className="text-[14.5px] text-[var(--text-secondary)] leading-[1.75] mb-6 flex-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-11 h-11 rounded-full overflow-hidden flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name.charAt(0).toUpperCase()
                    )}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-[var(--text-primary)]">{t.name}</div>
                    {t.role && (
                      <div className="text-[12px] text-[var(--text-secondary)]">{t.role}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots + arrows — grouped together below the carousel now that the
            heading above is centered (arrows no longer sit beside it). */}
        {testimonials.length > visibleCards && (
          <div className="flex items-center justify-center gap-5 mt-8">
            <IconButton onClick={prev} aria-label="Previous">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === activeIndex ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    backgroundColor: i === activeIndex ? "var(--accent-blue)" : "rgba(30,30,46,0.15)",
                    transition: "width 350ms ease, background-color 300ms ease",
                  }}
                />
              ))}
            </div>

            <IconButton onClick={next} aria-label="Next">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>
          </div>
        )}

      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[92vh] max-w-[92vw] rounded-[12px] object-contain shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center bg-white text-[var(--text-primary)] shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
