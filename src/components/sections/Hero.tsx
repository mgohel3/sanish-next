"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";

/* ─── Slide Data ─────────────────────────────────────────────── */
/* Native aspect ratio of the slide images — used to size the right-side visual */
const SLIDE_ASPECT = "16 / 9";

const allSlides = [
  {
    id: 1,
    image: "/assets/img/hero/slides/slide-1.jpg",
    // Purpose-cropped portrait (400x600) version for mobile/tablet — the
    // landscape desktop image can't fill a portrait frame without either
    // heavy side-cropping or large letterboxed gaps.
    mobileImage: "/assets/img/hero/slides/slide-1-mobile.jpg",
    tag: "Premium Craftsmanship",
    line1: "Surfaces That",
    line2: "Define Excellence",
    sub: "From decorative laminates to Thermo Laminates and architectural panels — 25+ years of craftsmanship behind every surface.",
    accent: "#85addc",
    bg: "#EEF3FA",
    orb1: "rgba(133,173,220,0.22)",
    orb2: "rgba(243,155,162,0.14)",
    imageOnly: true, // full-width image, no text/tag/badge/buttons on this slide
  },
  {
    id: 2,
    image: "/assets/img/hero/slides/slide-2.jpg",
    tag: "Laminates Collection",
    line1: "Premium Laminates",
    line2: "For Every Space",
    sub: "High-gloss, matte and textured finishes crafted for architects, designers and luxury interiors — explore our complete laminates range.",
    accent: "#ac8cc0",
    bg: "#F1EDF7",
    orb1: "rgba(172,140,192,0.22)",
    orb2: "rgba(250,191,125,0.14)",
  },
  {
    id: 3,
    image: "/assets/img/hero/slides/slide-3.jpg",
    tag: "Thermo Laminates Collection",
    line1: "Built To Last",
    line2: "Thermo Panels",
    sub: "Engineered for UV and weather resistance — durable Thermo Laminate panels built for lasting performance on modern facades.",
    accent: "#f39ba2",
    bg: "#FBF0F2",
    orb1: "rgba(243,155,162,0.22)",
    orb2: "rgba(172,140,192,0.12)",
  },
  {
    id: 4,
    image: "/assets/img/hero/slides/slide-4.jpg",
    tag: "Fluted Panels",
    line1: "Defining Modern",
    line2: "Living Spaces",
    sub: "Architectural panels — the language of contemporary design.",
    accent: "#ac8cc0",
    bg: "#EEF2F7",
    orb1: "rgba(172,140,192,0.20)",
    orb2: "rgba(232,149,109,0.12)",
    hidden: true, // TODO: re-enable once a slide-4 image is ready
  },
];

const slides = allSlides.filter((s) => !s.hidden);

const SLIDE_DURATION = 6500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(Date.now());

  const slide = slides[current];

  /* ── Text In — line-mask reveal ── */
  const animIn = useCallback(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".h-line1",   { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0)
        .fromTo(".h-line2",   { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.22)
        .fromTo(".h-divider", { scaleX: 0 },          { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.55)
        .fromTo(".h-sub",     { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.6)
        .fromTo(".h-btn",     { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.72)
        .fromTo(".h-stats",   { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.82);
    }, contentRef);
    return () => ctx.revert();
  }, []);

  /* ── Text Out ── */
  const animOut = useCallback((cb: () => void) => {
    gsap.to([".h-line1",".h-line2",".h-divider",".h-sub",".h-btn",".h-stats"], {
      y: -20, opacity: 0, duration: 0.45, stagger: 0.025,
      ease: "power3.in", overwrite: true, onComplete: cb,
    });
  }, []);

  /* ── Progress ── */
  const startProgress = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = Date.now();
    const tick = () => {
      const pct = Math.min(((Date.now() - startRef.current) / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── Navigate ── */
  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    animOut(() => {
      setCurrent(idx);
      setTransitioning(false);
      startProgress();
      timerRef.current = setTimeout(() => goTo((idx + 1) % slides.length), SLIDE_DURATION);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitioning, animOut, startProgress]);

  const goNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  /* ── Mouse Parallax ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(".hero-orb-a", { x: x * 35, y: y * 25, duration: 2.5, ease: "power3.out", overwrite: true });
      gsap.to(".hero-orb-b", { x: -x * 22, y: -y * 18, duration: 3, ease: "power3.out", overwrite: true });
      gsap.to(".hero-slab-a", { x: x * 14, y: y * 10, duration: 2, ease: "power3.out", overwrite: true });
      gsap.to(".hero-badge", { x: x * 6, y: y * 4, duration: 2, ease: "power3.out", overwrite: true });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Boot ── */
  useEffect(() => {
    animIn();
    startProgress();
    timerRef.current = setTimeout(() => goTo(1), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { animIn(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [current]);

  /* ─── Render ────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden flex items-center"
      style={{
        backgroundColor: slide.bg,
        transition: "background-color 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        minHeight: "clamp(680px, 88svh, 860px)",
        paddingTop: "clamp(108px, 12vh, 132px)",
        paddingBottom: "78px",
      }}
    >
      {/* ── Ambient orbs (mouse-reactive) ── */}
      <div
        className="hero-orb-a"
        style={{
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
          width: 560, height: 560,
          top: "0%", left: "-12%",
          background: slide.orb1,
          filter: "blur(120px)",
          opacity: 0.7,
          animation: "orbFloat1 14s ease-in-out infinite",
          transition: "background 1400ms ease",
          willChange: "transform",
          zIndex: 1,
        }}
      />
      <div
        className="hero-orb-b"
        style={{
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
          width: 420, height: 420,
          bottom: "5%", right: "2%",
          background: slide.orb2,
          filter: "blur(100px)",
          opacity: 0.65,
          animation: "orbFloat2 18s ease-in-out infinite",
          transition: "background 1400ms ease",
          willChange: "transform",
          zIndex: 1,
        }}
      />

      {/* ── Grain texture ── */}
      <div className="grain-texture" style={{ zIndex: 3 }} />

      {/* ── Full-width image-only slide (no text/tag/badge/buttons) ── */}
      {slide.imageOnly && (
        <div className="absolute inset-0 z-[2] overflow-hidden">
          {slides.map((s, i) => (
            s.imageOnly && (
              <div
                key={s.id}
                className="absolute inset-0"
                style={{ opacity: i === current ? 1 : 0, transition: "opacity 1300ms cubic-bezier(0.4,0,0.2,1)", zIndex: i === current ? 2 : 1 }}
              >
                <picture>
                  {s.mobileImage && <source media="(max-width: 1023px)" srcSet={s.mobileImage} />}
                  <img src={s.image} alt={s.line1 || "Banner"} className="w-full h-full object-cover" />
                </picture>
              </div>
            )
          ))}
        </div>
      )}

      {/* ── Main layout ── */}
      {!slide.imageOnly && (
      <div className="site-container relative z-10 w-full grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-0 items-center">

        {/* ── LEFT: Text ── */}
        <div ref={contentRef} className="flex flex-col justify-center lg:pr-14">

          {/* Headline — masked reveal */}
          <div className="mb-7 space-y-1">
            <div className="overflow-hidden pb-2">
              <h1
                className="h-line1 block leading-[1.18] tracking-tight whitespace-nowrap"
                style={{
                  fontSize: "clamp(26px, 3.9vw, 68px)",
                  fontWeight: 500,
                  color: "#1E1E2E",
                }}
              >
                {slide.line1}
              </h1>
            </div>
            <div className="overflow-hidden pb-2">
              <h1
                className="h-line2 block leading-[1.18] tracking-tight whitespace-nowrap"
                style={{
                  fontSize: "clamp(26px, 3.9vw, 68px)",
                  fontWeight: 500,
                  color: slide.accent,
                  transition: "color 800ms ease",
                }}
              >
                {slide.line2}
              </h1>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-divider h-[2px] w-14 mb-6 origin-left"
            style={{ backgroundColor: slide.accent, borderRadius: "999px", transition: "background-color 800ms ease" }}
          />

          {/* Sub copy */}
          <p
            className="h-sub text-[14px] leading-[1.8] max-w-[380px] mb-10"
            style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)", fontWeight: 300 }}
          >
            {slide.sub}
          </p>

          {/* Pill Buttons */}
          <div className="flex flex-wrap gap-6 mb-10 items-center">
            <Button
              href="/collection"
              variant="primary"
              className="h-btn group"
              style={{
                backgroundColor: slide.accent,
                boxShadow: `0 8px 28px ${slide.accent}45`,
                transition: "background-color 800ms ease, box-shadow 800ms ease, filter 250ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
            >
              <span>Explore Collection</span>
              <svg className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>

            <Link
              href="/about-us"
              className="h-btn inline-flex items-center gap-2 transition-all duration-300 group"
              style={{
                color: "#1E1E2E",
                fontFamily: "var(--font-jakarta)",
                fontSize: "14px",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              <span>Our Story</span>
              <svg className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-start gap-10 pt-7 border-t" style={{ borderColor: "rgba(30,30,46,0.08)" }}>
            {[{ value: "500+", label: "Designs" }, { value: "25+", label: "Years" }, { value: "18K+", label: "Clients" }].map((s) => (
              <div key={s.label} className="h-stats">
                <div className="font-bold text-[26px] leading-none mb-1.5" style={{ fontFamily: "var(--font-jakarta)", color: slide.accent, transition: "color 800ms ease" }}>
                  {s.value}
                </div>
                <div className="text-[9.5px] uppercase tracking-[0.14em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className="relative flex items-center justify-center">

          {/* Single slab — sized to the source image's native aspect ratio */}
          <div
            className="hero-slab-a relative w-full overflow-hidden gpu"
            style={{
              aspectRatio: SLIDE_ASPECT,
              borderRadius: "24px",
              boxShadow: "0 40px 80px rgba(30,30,46,0.12)",
              willChange: "transform",
            }}
          >
            {slides.map((s, i) => (
              <div key={s.id} className="absolute inset-0"
                style={{ opacity: i === current ? 1 : 0, transition: "opacity 1300ms cubic-bezier(0.4,0,0.2,1)", zIndex: i === current ? 2 : 1 }}>
                <img src={s.image} alt={s.line1}
                  className="w-full h-full object-cover"
                  style={{ transform: i === current ? "scale(1.0)" : "scale(1.06)", transition: "transform 7500ms ease-out" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
              </div>
            ))}
          </div>

          {/* Floating badge */}
          <div
            className="hero-badge glass-card absolute px-5 py-4 z-20 gpu"
            style={{
              bottom: "6%", right: "-2%",
              willChange: "transform",
              borderRadius: "20px",
              boxShadow: "0 16px 40px rgba(30,30,46,0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-[1px]">
                {["#85addc","#ac8cc0","#f39ba2","#fabf7d"].map((c) => (
                  <span key={c} className="block w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <div className="text-[12px] font-semibold" style={{ color: "#1E1E2E", fontFamily: "var(--font-jakarta)" }}>500+ Collections</div>
                <div className="text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>Available Now</div>
              </div>
            </div>
          </div>

          {/* Accent pill tag — brand orange, matches badge color used site-wide (product cards, etc.) */}
          <div
            className="absolute top-6 left-6 z-20 px-4 py-2 text-white text-[9.5px] uppercase tracking-[0.16em] font-semibold"
            style={{
              backgroundColor: "#fabf7d",
              borderRadius: "999px",
              fontFamily: "var(--font-jakarta)",
              boxShadow: "0 6px 18px rgba(250,191,125,0.4)",
            }}
          >
            {slide.tag}
          </div>
        </div>
      </div>
      )}

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress bar */}
        <div className="h-[1.5px] w-full" style={{ backgroundColor: "rgba(30,30,46,0.07)" }}>
          <div className="h-full origin-left" style={{ width: `${progress}%`, backgroundColor: slide.accent, transition: "width 0.09s linear, background-color 800ms ease", borderRadius: "999px" }} />
        </div>

        <div className="site-container flex items-center justify-between py-5">
          {/* Pill dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: i === current ? slide.accent : "rgba(30,30,46,0.18)",
                  transition: "width 500ms cubic-bezier(0.25,0.46,0.45,0.94), background-color 500ms ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-5">
            <span className="text-[11px] tabular-nums" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
              <span className="font-semibold" style={{ color: "#1E1E2E" }}>{String(current + 1).padStart(2, "0")}</span>
              {" / "}{String(slides.length).padStart(2, "0")}
            </span>

            {[
              { fn: goPrev, d: "M19 12H5M12 19l-7-7 7-7", label: "Previous slide" },
              { fn: goNext, d: "M5 12h14M12 5l7 7-7 7", label: "Next slide" },
            ].map(({ fn, d, label }, i) => (
              <IconButton key={i} size="sm" aria-label={label} onClick={fn}>
                <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute left-8 md:left-14 bottom-24 z-20 flex flex-col items-center gap-2">
        <div className="relative w-[1px] h-14 overflow-hidden" style={{ backgroundColor: "rgba(30,30,46,0.1)" }}>
          <div className="absolute top-0 left-0 w-full h-1/2"
            style={{ backgroundColor: slide.accent, animation: "heroCue 2.2s cubic-bezier(0.4,0,0.6,1) infinite", transition: "background-color 800ms ease" }} />
        </div>
        <span className="text-[8.5px] uppercase tracking-[0.28em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>Scroll</span>
      </div>

      <style>{`
        @keyframes heroCue {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%); opacity: 1; }
          100% { transform: translateY(260%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
