"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";

/* ─── Slide Data ─────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000",
    tag: "New 2024 Collection",
    number: "01",
    line1: "Where",
    line2: "Architecture",
    line3: "Meets Artistry",
    sub: "Premium decorative laminates crafted for architects, designers, and luxury interiors.",
    accent: "#7B9EC4",
    bgLight: "#EFF4F9",
    bgWarm: "#E8F0F8",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
    tag: "S'Shades Collection",
    number: "02",
    line1: "Crafted",
    line2: "For Elegant",
    line3: "Spaces",
    sub: "High-gloss, matte and textured finishes that redefine interior surfaces with precision.",
    accent: "#E8956D",
    bgLight: "#FAF3EE",
    bgWarm: "#F5EBE4",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=2000",
    tag: "Architectural Series",
    number: "03",
    line1: "Texture",
    line2: "That Speaks",
    line3: "Design",
    sub: "From woodgrains to metallics — surfaces that transform spaces into masterpieces.",
    accent: "#C97A92",
    bgLight: "#F7EEF3",
    bgWarm: "#F0E6ED",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2000",
    tag: "Fluted Panels",
    number: "04",
    line1: "Defining",
    line2: "Modern Living",
    line3: "Spaces",
    sub: "Architectural panels — the definitive language of contemporary design.",
    accent: "#6B9E8A",
    bgLight: "#EDF4F1",
    bgWarm: "#E4EFE9",
  },
];

const DURATION = 7000;

export default function HeroClassic() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgPanelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(Date.now());

  /* ── Image refs per slide ── */
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slide = slides[current];

  /* ── Progress ticker ── */
  const startProgress = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = Date.now();
    const tick = () => {
      const pct = Math.min(((Date.now() - startRef.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── Slide transition — clip-path wipe + text reveal ── */
  const goTo = useCallback((nextIdx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);

    const prevIdx = current;
    const nextSlide = slides[nextIdx];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(nextIdx);
        setIsAnimating(false);
        startProgress();
        timerRef.current = setTimeout(() => goTo((nextIdx + 1) % slides.length), DURATION);
      },
    });

    /* -- BG color transition -- */
    tl.to(wrapperRef.current, {
      backgroundColor: nextSlide.bgLight,
      duration: 0.9,
      ease: "power3.inOut",
    }, 0);

    /* -- Text out -- */
    tl.to([".hc2-tag", ".hc2-l1", ".hc2-l2", ".hc2-l3", ".hc2-sep", ".hc2-sub", ".hc2-btns", ".hc2-stats"], {
      y: -28, opacity: 0, duration: 0.45, stagger: 0.035, ease: "power3.in", overwrite: true,
    }, 0);

    /* -- Outgoing image: clip-path close to left (curtain reveal) -- */
    if (imgRefs.current[prevIdx]) {
      tl.fromTo(imgRefs.current[prevIdx]!,
        { clipPath: "inset(0 0% 0 0 round 0px)" },
        { clipPath: "inset(0 100% 0 0 round 0px)", duration: 0.85, ease: "power4.inOut" },
        0
      );
    }

    /* -- Incoming image: clip-path open from left -- */
    if (imgRefs.current[nextIdx]) {
      // First set it to clipped left, then reveal
      gsap.set(imgRefs.current[nextIdx]!, { clipPath: "inset(0 0% 0 100% round 0px)", zIndex: 3 });
      tl.fromTo(imgRefs.current[nextIdx]!,
        { clipPath: "inset(0 0% 0 100% round 0px)" },
        { clipPath: "inset(0 0% 0 0% round 0px)", duration: 0.95, ease: "power4.inOut" },
        0.1
      );
    }

    /* -- Number counter swap -- */
    tl.fromTo(".hc2-num",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
      0.55
    );

    /* -- Text in (new slide content set by React state change in onComplete) -- */
    // We pre-animate these into view after state updates via useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isAnimating, startProgress]);

  /* ── Animate text in when slide changes ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".hc2-tag",   { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0)
      .fromTo(".hc2-l1",    { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.08)
      .fromTo(".hc2-l2",    { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.17)
      .fromTo(".hc2-l3",    { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.26)
      .fromTo(".hc2-sep",   { scaleX: 0 },          { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.5)
      .fromTo(".hc2-sub",   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.58)
      .fromTo(".hc2-btns",  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.68)
      .fromTo(".hc2-stats", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 }, 0.8);
  }, [current]);

  /* ── Boot ── */
  useEffect(() => {
    // Set all images initially (only current is visible)
    slides.forEach((_, i) => {
      if (imgRefs.current[i]) {
        gsap.set(imgRefs.current[i]!, {
          clipPath: i === 0 ? "inset(0 0% 0 0% round 0px)" : "inset(0 100% 0 0 round 0px)",
          zIndex: i === 0 ? 2 : 1,
        });
      }
    });

    startProgress();
    timerRef.current = setTimeout(() => goTo(1), DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <section
      ref={wrapperRef}
      id="hero-classic"
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex"
      style={{
        backgroundColor: slide.bgLight,
        transition: "background-color 0ms", // Handled by GSAP
        paddingTop: "80px", // account for fixed header
      }}
    >
      {/* ── Grain texture ── */}
      <div className="grain-texture" style={{ zIndex: 10, opacity: 0.022 }} />

      {/* ══ LEFT PANEL — Text ══════════════════════════════ */}
      <div className="relative z-20 flex flex-col justify-center px-10 md:px-16 lg:px-20"
        style={{ width: "50%", minWidth: "420px", flexShrink: 0 }}>

        {/* Large ghost number */}
        <div className="hc2-num select-none absolute right-4 top-1/2 -translate-y-1/2 leading-none font-bold opacity-[0.045] pointer-events-none"
          style={{
            fontSize: "clamp(120px, 18vw, 240px)",
            fontFamily: "var(--font-jakarta)",
            color: slide.accent,
            transition: "color 800ms ease",
            letterSpacing: "-0.04em",
          }}
        >
          {slide.number}
        </div>

        {/* Tag */}
        <div className="hc2-tag flex items-center gap-3 mb-8">
          <div className="w-8 h-[1.5px]" style={{ backgroundColor: slide.accent, transition: "background-color 600ms ease" }} />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: slide.accent, fontFamily: "var(--font-jakarta)", transition: "color 600ms ease" }}
          >
            {slide.tag}
          </span>
        </div>

        {/* Headline — 3 line stagger */}
        <div className="mb-7 overflow-hidden">
          {[slide.line1, slide.line2, slide.line3].map((line, i) => (
            <div key={i} className={`hc2-l${i + 1} block font-bold leading-[1.06] tracking-tight`}
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(30px, 4.2vw, 62px)",
                color: i === 1 ? slide.accent : "#1E1E2E",
                transition: "color 600ms ease",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="hc2-sep h-[1.5px] w-12 mb-7 origin-left"
          style={{ backgroundColor: slide.accent, borderRadius: "999px", transition: "background-color 600ms ease" }}
        />

        {/* Sub copy */}
        <p className="hc2-sub text-[14.5px] leading-[1.85] max-w-[360px] mb-9"
          style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)", fontWeight: 300 }}>
          {slide.sub}
        </p>

        {/* Buttons */}
        <div className="hc2-btns flex flex-wrap items-center gap-4 mb-12">
          <Link
            href="/#products"
            className="group relative overflow-hidden flex items-center gap-2.5 text-white text-[11px] font-semibold px-7 py-3.5 transition-all duration-400"
            style={{
              backgroundColor: slide.accent,
              borderRadius: "999px",
              fontFamily: "var(--font-jakarta)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: `0 8px 26px ${slide.accent}44`,
              transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2.5px) scale(1.02)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 36px ${slide.accent}66`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 26px ${slide.accent}44`;
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/20 skew-x-12" />
            <span className="relative z-10">Explore Collection</span>
            <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/#about"
            className="group flex items-center gap-2 text-[11px] font-semibold transition-all duration-400"
            style={{
              color: "#1E1E2E",
              fontFamily: "var(--font-jakarta)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.color = slide.accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.7";
              (e.currentTarget as HTMLElement).style.color = "#1E1E2E";
            }}
          >
            Our Story
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-start gap-10 pt-7 border-t" style={{ borderColor: "rgba(30,30,46,0.08)" }}>
          {[{ v: "500+", l: "Designs" }, { v: "25+", l: "Years" }, { v: "18K+", l: "Clients" }].map((s) => (
            <div key={s.l} className="hc2-stats">
              <div className="font-bold text-[24px] leading-none mb-1.5"
                style={{ fontFamily: "var(--font-jakarta)", color: slide.accent, transition: "color 600ms ease" }}>
                {s.v}
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em] font-semibold"
                style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ RIGHT PANEL — Images with wipe transition ══════ */}
      <div
        ref={imgPanelRef}
        className="relative flex-1 overflow-hidden"
        style={{ borderRadius: "28px 0 0 28px", margin: "20px 0 20px 0" }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { imgRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{
              clipPath: "inset(0 0% 0 0% round 0px)",
              zIndex: i === current ? 2 : 1,
            }}
          >
            <img
              src={s.image}
              alt={s.line1}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: "scale(1.06)",
                transition: "transform 8s ease-out",
              }}
            />
            {/* Soft left fade to blend with text panel */}
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to right, ${s.bgLight}FF 0%, ${s.bgLight}22 18%, transparent 40%)` }} />
          </div>
        ))}

        {/* Slide counter — top right */}
        <div className="absolute top-6 right-6 z-20">
          <span className="text-[11px] font-semibold tabular-nums"
            style={{ color: "#1E1E2E", fontFamily: "var(--font-jakarta)", opacity: 0.5 }}>
            <span style={{ color: slide.accent, opacity: 1 }}>{String(current + 1).padStart(2, "0")}</span>
            {" "}/{" "}{String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Accent tag pill — floats over image */}
        <div className="absolute top-6 left-8 z-20 px-4 py-2 text-white text-[9.5px] uppercase tracking-[0.18em] font-semibold"
          style={{
            backgroundColor: slide.accent,
            borderRadius: "999px",
            fontFamily: "var(--font-jakarta)",
            transition: "background-color 600ms ease",
            boxShadow: `0 6px 18px ${slide.accent}50`,
          }}>
          {slide.tag}
        </div>
      </div>

      {/* ══ Bottom progress bar ════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Progress bar */}
        <div className="h-[1.5px]" style={{ backgroundColor: "rgba(30,30,46,0.08)" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: slide.accent,
            borderRadius: "999px",
            transition: "width 0.09s linear, background-color 600ms ease",
          }} />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between px-10 md:px-16 lg:px-20 py-5"
          style={{ borderTop: "none" }}>

          {/* Pill nav dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((s, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "28px" : "7px",
                  height: "7px",
                  borderRadius: "999px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  backgroundColor: i === current ? slide.accent : "rgba(30,30,46,0.18)",
                  transition: "width 450ms cubic-bezier(0.25,0.46,0.45,0.94), background-color 450ms ease",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            {[
              { fn: goPrev, d: "M19 12H5M12 19l-7-7 7-7" },
              { fn: goNext, d: "M5 12h14M12 5l7 7-7 7" },
            ].map(({ fn, d }, i) => (
              <button key={i} onClick={fn}
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  border: "1.5px solid rgba(30,30,46,0.14)",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = slide.accent;
                  (e.currentTarget as HTMLElement).style.background = `${slide.accent}12`;
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,30,46,0.14)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="#1E1E2E" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Scroll cue ═══════════════════════════════════ */}
      <div className="absolute bottom-20 left-10 md:left-16 lg:left-20 z-20 flex flex-col items-center gap-2">
        <div className="relative w-[1px] h-12 overflow-hidden" style={{ backgroundColor: "rgba(30,30,46,0.10)" }}>
          <div className="absolute top-0 left-0 w-full h-1/2"
            style={{ backgroundColor: slide.accent, animation: "hc2Cue 2.2s cubic-bezier(0.4,0,0.6,1) infinite", transition: "background-color 600ms ease" }} />
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] font-semibold"
          style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>Scroll</span>
      </div>

      <style>{`
        @keyframes hc2Cue {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%);  opacity: 1; }
          100% { transform: translateY(260%);  opacity: 0; }
        }
      `}</style>
    </section>
  );
}
