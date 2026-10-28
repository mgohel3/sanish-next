"use client";

import { useEffect, useRef, useState, useCallback, useMemo, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import Link from "next/link";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import type { HeroContent } from "@/lib/homepage";
import { resolveTextStyle } from "@/lib/textStyle";
import { fieldStyleCss, type FieldStyle } from "@/components/FieldStyles";

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
    sub: "From decorative laminates to Thermo Laminates and architectural panels — 9+ years of craftsmanship behind every surface.",
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

const DEFAULT_SLIDES = allSlides.filter((s) => !s.hidden);

type Slide = {
  id: number; image: string; mobileImage?: string; tag: string; line1: string; line2: string; sub: string;
  accent: string; bg: string; orb1: string; orb2: string;
  imageOnly?: boolean; stacked?: boolean; ctaLabel?: string; ctaUrl?: string; st?: Record<string, FieldStyle | undefined>;
  isVideo?: boolean; video?: string; hAlign?: string; vAlign?: string; overlay?: number; hasCta?: boolean;
  focus?: string; fit?: string; textFirst?: boolean; swap?: boolean;
};

const VIDEO_SAFETY_MS = 45000; // a video slide normally moves on when the video ends; this only covers a video that fails to play
const DEFAULT_SLIDE_SECONDS = 5; // was 6.5s; editors can change it in CMS > Home Page > Hero Slider

export default function Hero({ content, designsCount = "800+" }: { content?: HeroContent; designsCount?: string }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  // Seconds per slide from the CMS, kept in a ref so the timer callbacks below always read the latest value.
  const slideMs = Math.min(20, Math.max(2, Number(content?.slide_seconds) || DEFAULT_SLIDE_SECONDS)) * 1000;
  const slideMsRef = useRef(slideMs);
  slideMsRef.current = slideMs;
  const headStyle = resolveTextStyle(content as Record<string, unknown>);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(Date.now());

  // CMS slides carry text + images only; the per-slide colour styling
  // (accent / bg / orbs) is reused from the built-in slide at the same index.
  const slides = useMemo<Slide[]>(() => {
    const cmsSlides = content?.slides;
    if (!cmsSlides || cmsSlides.length === 0) return DEFAULT_SLIDES;
    const all = cmsSlides.map((s, i) => {
      const style = allSlides[i % allSlides.length];
      const layout = s.layout || (s.image_only ? "image_only" : "split");
      return {
        slide: {
          id: i + 1,
          image: s.image || style.image,
          mobileImage: s.mobile_image || undefined,
          tag: s.tag ?? "",
          line1: s.line1 ?? "",
          line2: s.line2 ?? "",
          sub: s.sub ?? "",
          accent: style.accent,
          bg: style.bg,
          orb1: style.orb1,
          orb2: style.orb2,
          imageOnly: layout === "image_only",
          stacked: layout === "stacked",
          isVideo: layout === "video",
          video: s.video || undefined,
          hAlign: s.text_align || "left",
          vAlign: s.text_valign || "bottom",
          overlay: Math.min(80, Math.max(0, Number(s.overlay ?? 35) || 0)),
          hasCta: !!s.cta_label,
          focus: s.image_focus || "center",
          fit: s.fit_mode || "fill",
          textFirst: s.mobile_order === "text_first",
          swap: !!s.swap_desktop,
          ctaLabel: s.cta_label || "Explore Collection",
          ctaUrl: s.cta_url || "/collection",
          st: { tag: s.tag__style, line1: s.line1__style, line2: s.line2__style, sub: s.sub__style, cta: s.cta_label__style },
        } as Slide,
        hidden: !!s.hidden,
      };
    });
    // Banners switched off in the CMS are skipped; if every one is off, the first stays so the top of the page is never empty.
    const shown = all.filter((x) => !x.hidden).map((x) => x.slide);
    return shown.length ? shown : [all[0].slide];
  }, [content?.slides]);

  const slide = slides[current] ?? slides[0];
  const fs = (k: string) => fieldStyleCss(slide.st?.[k]); // this slide's per-field toolbar styles

  /* Warm the browser cache with every slide's picture so none of them pops in late when its turn comes */
  useEffect(() => {
    slides.forEach((sl) => {
      [sl.image, sl.mobileImage].forEach((src) => { if (src) { const im = new window.Image(); im.src = src; } });
    });
  }, [slides]);

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
      const pct = Math.min(((Date.now() - startRef.current) / slideMsRef.current) * 100, 100);
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
      const sl = slides[idx];
      if (sl?.isVideo && sl.video && slides.length > 1) {
        timerRef.current = setTimeout(() => goTo((idx + 1) % slides.length), VIDEO_SAFETY_MS); // only if the video never plays
      } else {
        startProgress();
        timerRef.current = setTimeout(() => goTo((idx + 1) % slides.length), slideMsRef.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitioning, animOut, startProgress]);

  const goNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  /* ── Mouse Parallax ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches) return;
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
    if (slides[0]?.isVideo && slides[0].video && slides.length > 1) {
      timerRef.current = setTimeout(() => goTo(1), VIDEO_SAFETY_MS);
    } else {
      startProgress();
      timerRef.current = setTimeout(() => goTo(1), slideMsRef.current);
    }
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
      data-kind={slide.imageOnly ? "image_only" : slide.stacked ? "stacked" : slide.isVideo ? "video" : "split"}
      className="relative w-full overflow-hidden flex items-center"
      style={{
        backgroundColor: slide.bg,
        transition: "background-color 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                {s.fit === "fit" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.mobileImage || s.image} alt="" aria-hidden="true" className="hero-blur-bg" />
                )}
                <picture>
                  {s.mobileImage && <source media="(max-width: 1023px)" srcSet={s.mobileImage} />}
                  <img src={s.image} alt={s.line1 || "Banner"} className={`relative w-full h-full ${s.fit === "fit" ? "hero-fit" : "object-cover"}`} style={{ objectPosition: s.focus || "center" }} />
                </picture>
              </div>
            )
          ))}
        </div>
      )}

      {/* ── Video banner: full-screen looping video, text on top (position + overlay set per slide in the CMS) ── */}
      {slide.isVideo && (
        <>
          <div className="absolute inset-0 z-[4] overflow-hidden bg-black">
            {slide.video ? (
              <video
                key={slide.video}
                className="absolute inset-0 w-full h-full object-cover"
                src={slide.video}
                poster={slide.image}
                autoPlay
                muted
                loop={slides.length < 2}
                onEnded={goNext}
                onTimeUpdate={(e) => { const v = e.currentTarget; if (v.duration) setProgress((v.currentTime / v.duration) * 100); }}
                onLoadedMetadata={(e) => {
                  // the video's own length replaces the safety timer (+ a small buffer)
                  const d = e.currentTarget.duration;
                  if (slides.length > 1 && isFinite(d) && d > 0) {
                    if (timerRef.current) clearTimeout(timerRef.current);
                    timerRef.current = setTimeout(() => goNext(), (d + 3) * 1000);
                  }
                }}
                playsInline
                preload="auto"
                disableRemotePlayback
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.image} alt={slide.line1 || "Banner"} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${(slide.overlay ?? 35) / 100})` }} />
          </div>
          <div
            ref={contentRef}
            className={`absolute inset-0 z-[6] flex flex-col px-6 md:px-14 ${slide.vAlign === "top" ? "justify-start" : slide.vAlign === "middle" ? "justify-center" : "justify-end"} ${slide.hAlign === "center" ? "items-center text-center" : slide.hAlign === "right" ? "items-end text-right" : "items-start text-left"}`}
            style={{ paddingTop: "clamp(108px, 12vh, 132px)", paddingBottom: "112px" }}
          >
            <div className="w-full max-w-[820px]">
              {slide.tag && (
                <div className="h-sub mb-4 text-[12px] md:text-[13px] uppercase tracking-[0.22em]"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-jakarta)", ...fs("tag") }}>
                  {slide.tag}
                </div>
              )}
              {(slide.line1 || slide.line2) && (
                <h2 className="leading-[1.1] tracking-tight" style={{ fontSize: "clamp(32px, 5.2vw, 78px)", fontWeight: 500, color: "#fff" }}>
                  {slide.line1 && <span className="h-line1 block" style={{ ...headStyle, ...fs("line1") }}>{slide.line1}</span>}
                  {slide.line2 && <span className="h-line2 block" style={{ ...headStyle, ...fs("line2") }}>{slide.line2}</span>}
                </h2>
              )}
              {slide.sub && (
                <p className="h-sub mt-5 max-w-[540px] text-[15px] md:text-[16px] leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-jakarta)", fontWeight: 300, ...(slide.hAlign === "center" ? { marginInline: "auto" } : slide.hAlign === "right" ? { marginLeft: "auto" } : {}), ...fs("sub") }}>
                  {slide.sub}
                </p>
              )}
              {slide.hasCta && (
                <div className="h-btn mt-7">
                  <Button href={slide.ctaUrl || "/collection"} variant="primary" className="group" style={{ backgroundColor: slide.accent }}>
                    <span style={fs("cta")}>{slide.ctaLabel}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Main layout ── */}
      {!slide.imageOnly && !slide.stacked && !slide.isVideo && (
      <div className="site-container relative z-10 w-full grid lg:grid-cols-[1fr_1fr] gap-5 lg:gap-0 items-center">

        {/* ── LEFT: Text ── */}
        <div ref={contentRef} className={`flex flex-col justify-center ${slide.textFirst ? "order-1" : "order-2"} ${slide.swap ? "lg:order-2 lg:pl-14" : "lg:order-1 lg:pr-14"}`}>

          {/* Headline — masked reveal */}
          <div className="mb-2 lg:mb-7 space-y-0 lg:space-y-1">
            <div className="overflow-hidden pb-1 lg:pb-2">
              <h2
                className="h-line1 block leading-[1.18] tracking-tight whitespace-nowrap"
                style={{
                  fontSize: "clamp(26px, 3.9vw, 68px)",
                  fontWeight: 500,
                  color: "#1E1E2E",
                  ...headStyle,
                  ...fs("line1"),
                }}
              >
                {slide.line1}
              </h2>
            </div>
            <div className="overflow-hidden pb-1 lg:pb-2">
              <h2
                className="h-line2 block leading-[1.18] tracking-tight whitespace-nowrap"
                style={{
                  fontSize: "clamp(26px, 3.9vw, 68px)",
                  fontWeight: 500,
                  color: slide.accent,
                  transition: "color 800ms ease",
                  ...headStyle,
                  ...fs("line2"),
                }}
              >
                {slide.line2}
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-divider hidden lg:block h-[2px] w-14 mb-6 origin-left"
            style={{ backgroundColor: slide.accent, borderRadius: "999px", transition: "background-color 800ms ease" }}
          />

          {/* Sub copy */}
          <p
            className="h-sub text-[14px] leading-[1.7] lg:leading-[1.8] max-w-[380px] mb-4 lg:mb-10"
            style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)", fontWeight: 300, ...fs("sub") }}
          >
            {slide.sub}
          </p>

          {/* Pill Buttons */}
          <div className="flex flex-nowrap lg:flex-wrap gap-x-4 lg:gap-x-6 gap-y-2 mb-4 lg:mb-10 items-center">
            <Button
              href={slide.ctaUrl || "/collection"}
              variant="primary"
              className="h-btn group max-lg:!px-5 max-lg:!py-3 max-lg:!text-[11px] max-lg:!tracking-[0.14em]"
              style={{
                backgroundColor: slide.accent,
                boxShadow: `0 8px 28px ${slide.accent}45`,
                transition: "background-color 800ms ease, box-shadow 800ms ease, filter 250ms ease",
              }}
              onMouseEnter={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
              onMouseLeave={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
            >
              <span style={fs("cta")}>{slide.ctaLabel || "Explore Collection"}</span>
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
          <div className="flex items-start gap-7 lg:gap-10 pt-4 lg:pt-7 border-t" style={{ borderColor: "rgba(30,30,46,0.08)" }}>
            {[{ value: designsCount, label: "Designs" }, { value: "9+", label: "Years" }, { value: "18K+", label: "Clients" }].map((s) => (
              <div key={s.label} className="h-stats">
                <div className="font-bold text-[20px] lg:text-[26px] leading-none mb-1" style={{ fontFamily: "var(--font-jakarta)", color: slide.accent, transition: "color 800ms ease" }}>
                  {s.value}
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] lg:tracking-[0.14em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className={`relative flex items-center justify-center -mx-1.5 lg:mx-0 ${slide.textFirst ? "order-2" : "order-1"} ${slide.swap ? "lg:order-1" : "lg:order-2"}`}>

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
                  style={{ objectPosition: s.focus || "center", transform: i === current ? "scale(1.0)" : "scale(1.06)", transition: "transform 7500ms ease-out" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
              </div>
            ))}
          </div>

          {/* Floating badge */}
          <div
            className="hero-badge glass-card hidden md:block absolute px-5 py-4 z-20 gpu"
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
                <div className="text-[12px] font-semibold" style={{ color: "#1E1E2E", fontFamily: "var(--font-jakarta)" }}>{designsCount} Designs</div>
                <div className="text-[12px] md:text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>Available Now</div>
              </div>
            </div>
          </div>

          {/* Accent pill tag — brand orange, matches badge color used site-wide (product cards, etc.) */}
          <div
            className="hidden lg:block absolute top-6 left-6 z-20 px-4 py-2 text-white text-[12px] md:text-[11px] uppercase tracking-[0.16em] font-semibold"
            style={{
              backgroundColor: "#fabf7d",
              borderRadius: "999px",
              fontFamily: "var(--font-jakarta)",
              boxShadow: "0 6px 18px rgba(250,191,125,0.4)",
              ...fs("tag"),
            }}
          >
            {slide.tag}
          </div>
        </div>
      </div>
      )}


      {/* ── Stacked layout: image on top (~70%), content strip below (~30%) ── */}
      {slide.stacked && (
        <div className="absolute inset-0 z-10 flex flex-col" style={{ paddingTop: "clamp(84px, 9vh, 96px)", paddingBottom: "78px" }}>
          <div className="w-full flex-[7] min-h-0 pb-5">
            <div className="relative w-full h-full overflow-hidden">
              <picture>
                {slide.mobileImage && <source media="(max-width: 1023px)" srcSet={slide.mobileImage} />}
                <img src={slide.image} alt={slide.line1} className="w-full h-full object-cover" style={{ objectPosition: slide.focus || "center" }} />
              </picture>
{slide.tag && (              <div className="absolute top-5 left-5 md:left-14 px-4 py-2 text-white text-[12px] md:text-[11px] uppercase tracking-[0.16em] font-semibold"
                style={{ backgroundColor: "#fabf7d", borderRadius: "999px", fontFamily: "var(--font-jakarta)", ...fs("tag") }}>
                {slide.tag}
              </div>)}
            </div>
          </div>
          <div ref={contentRef} className="site-container w-full flex-[3] min-h-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-12">
            <div className="overflow-hidden">
              <h2 className="h-line1 inline leading-[1.15] tracking-tight" style={{ fontSize: "clamp(24px, 3.2vw, 52px)", fontWeight: 500, color: "#1E1E2E", ...headStyle, ...fs("line1") }}>{slide.line1} </h2>
              <h2 className="h-line2 inline leading-[1.15] tracking-tight" style={{ fontSize: "clamp(24px, 3.2vw, 52px)", fontWeight: 500, color: slide.accent, ...headStyle, ...fs("line2") }}>{slide.line2}</h2>
            </div>
            <p className="h-sub text-[14px] leading-[1.7] max-w-[420px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)", fontWeight: 300, ...fs("sub") }}>{slide.sub}</p>
            <div className="flex flex-wrap items-center gap-6 shrink-0">
              <Button href={slide.ctaUrl || "/collection"} variant="primary" className="h-btn group" style={{ backgroundColor: slide.accent, boxShadow: `0 8px 28px ${slide.accent}45` }}>
                <span style={fs("cta")}>{slide.ctaLabel || "Explore Collection"}</span>
              </Button>
              <Link href="/about-us" className="h-btn inline-flex items-center gap-2" style={{ color: "#1E1E2E", fontFamily: "var(--font-jakarta)", fontSize: "14px", fontWeight: 500 }}>
                <span>Our Story</span>
              </Link>
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

        <div className="site-container flex items-center justify-between py-1 lg:py-5">
          {/* Pill dots - the button is a 40px-tall tap target, the visible pill is the inner span */}
          <div className="flex items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="flex items-center justify-center"
                style={{ height: "40px", padding: "0 5px", border: "none", background: "transparent", cursor: "pointer" }}
              >
                <span
                  style={{
                    display: "block",
                    width: i === current ? "32px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    backgroundColor: i === current ? (slide.isVideo ? "#ffffff" : slide.accent) : slide.isVideo ? "rgba(255,255,255,0.4)" : "rgba(30,30,46,0.18)",
                    transition: "width 500ms cubic-bezier(0.25,0.46,0.45,0.94), background-color 500ms ease",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-5">
            <span className="text-[12px] md:text-[11px] tabular-nums" style={{ color: slide.isVideo ? "rgba(255,255,255,0.75)" : "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
              <span className="font-semibold" style={{ color: slide.isVideo ? "#fff" : "#1E1E2E" }}>{String(current + 1).padStart(2, "0")}</span>
              {" / "}{String(slides.length).padStart(2, "0")}
            </span>

            {[
              { fn: goPrev, d: "M19 12H5M12 19l-7-7 7-7", label: "Previous slide" },
              { fn: goNext, d: "M5 12h14M12 5l7 7-7 7", label: "Next slide" },
            ].map(({ fn, d, label }, i) => (
              <IconButton key={i} size="sm" variant={slide.isVideo ? "glass" : "default"} aria-label={label} onClick={fn}>
                <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      {!slide.stacked && !slide.isVideo && <div className="absolute left-8 md:left-14 bottom-24 z-20 hidden lg:flex flex-col items-center gap-2">
        <div className="relative w-[1px] h-14 overflow-hidden" style={{ backgroundColor: "rgba(30,30,46,0.1)" }}>
          <div className="absolute top-0 left-0 w-full h-1/2"
            style={{ backgroundColor: slide.accent, animation: "heroCue 2.2s cubic-bezier(0.4,0,0.6,1) infinite", transition: "background-color 800ms ease" }} />
        </div>
        <span className="text-[12px] md:text-[10px] uppercase tracking-[0.28em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>Scroll</span>
      </div>}

      <style>{`
        #hero { min-height: max(680px, 100svh); padding-top: clamp(108px, 12vh, 132px); padding-bottom: 78px; }
        @media (max-width: 1023px) {
          #hero { min-height: 0; padding-top: 93px; padding-bottom: 60px; }
          #hero[data-kind="stacked"], #hero[data-kind="video"] { min-height: max(620px, 100svh); }
          /* single "centre-stage" image: a shorter 4:5 frame on phones (the fixed header covers its top strip) */
          #hero[data-kind="image_only"] { height: 125vw; padding: 0; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #hero[data-kind="image_only"] { height: 80vw; }
        }
        .hero-blur-bg { display: none; }
        .hero-fit { object-fit: cover; }
        @media (max-width: 1023px) {
          .hero-blur-bg { display: block; position: absolute; left: -10%; top: -10%; width: 120%; height: 120%; object-fit: cover; filter: blur(26px) saturate(1.1); }
          .hero-fit { object-fit: contain; }
        }
        @keyframes heroCue {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%); opacity: 1; }
          100% { transform: translateY(260%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
