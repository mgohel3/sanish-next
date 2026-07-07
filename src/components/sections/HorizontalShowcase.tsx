"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  { name: "S'Shades",    sub: "Premium Finishes",  category: "Laminates",  image: "/assets/img/material/shadesCollection.png",         accent: "#fabf7d" },
  { name: "Thre3",       sub: "Exclusive Designs",  category: "Laminates",  image: "/assets/img/material/threeCollection.jpg",          accent: "#fabf7d" },
  { name: "Fluted",      sub: "Textured Panels",    category: "Louvers",    image: "/assets/img/material/flutedCollection.webp",        accent: "#fabf7d" },
  { name: "0.8mm",       sub: "Durable Series",     category: "ASA Sheets", image: "/assets/img/material/08mmCollection.webp",          accent: "#fabf7d" },
  { name: "Cool Colour", sub: "Modern Shades",      category: "Laminates",  image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#fabf7d" },
];

const filters = ["Laminates", "Louvers", "ASA Sheets"];

export default function HorizontalShowcase() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const stRef       = useRef<ScrollTrigger | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Card cursor-tilt effect ── */
  const setupTilt = (card: HTMLElement) => {
    const img     = card.querySelector<HTMLElement>(".h-card-img");
    const overlay = card.querySelector<HTMLElement>(".h-card-overlay");

    const onEnter = () => {
      gsap.to(card,    { scale: 1.02, duration: 0.5, ease: "power3.out" });
      gsap.to(img,     { scale: 1.06, duration: 0.8, ease: "power3.out" });
      gsap.to(overlay, { opacity: 0.65, duration: 0.4 });
    };
    const onLeave = () => {
      gsap.to(card,    { scale: 1, rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      gsap.to(img,     { scale: 1.0, duration: 0.8, ease: "power3.out" });
      gsap.to(overlay, { opacity: 0.5, duration: 0.4 });
    };
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(card, { rotateY: cx * 6, rotateX: -cy * 5, transformPerspective: 900, duration: 0.5, ease: "power3.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("mousemove",  onMove);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove",  onMove);
    };
  };

  /* ── Scroll to card when filter tab clicked ── */
  const scrollToCard = useCallback((idx: number) => {
    if (!sectionRef.current || !trackRef.current) return;
    const trackScrollable = trackRef.current.scrollWidth - window.innerWidth;
    if (trackScrollable <= 0) return;

    // Approximate progress: evenly distribute across track
    const progress   = collections.length > 1 ? idx / (collections.length - 1) : 0;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const target     = sectionTop + progress * trackScrollable;

    window.scrollTo({ top: target, behavior: "smooth" });
    setActiveIdx(idx);
  }, []);

  const scrollToFilter = useCallback((filter: string) => {
    const targetIdx = collections.findIndex((item) => item.category === filter);
    if (targetIdx >= 0) scrollToCard(targetIdx);
  }, [scrollToCard]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth - window.innerWidth;

    /* ── Horizontal scroll pin ── */
    const anim = gsap.to(trackRef.current, {
      x: -trackWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "top top",
        end:     () => `+=${trackWidth}`,
        pin:     true,
        scrub:   1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (collections.length - 1));
          setActiveIdx(idx);
        },
      },
    });
    stRef.current = anim.scrollTrigger!;

    /* ── Card entry stagger ── */
    gsap.fromTo(
      gsap.utils.toArray<HTMLElement>(".h-card"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    /* ── Tilt cleanup ── */
    const cleanups = gsap.utils.toArray<HTMLElement>(".h-card").map(setupTilt);

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hScrollSection"
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#F5F3F8" }}
    >
      {/* Header + Filter Tabs — stacked in one container */}
      <div className="absolute top-14 md:top-16 left-0 right-0 z-10">
        <div className="site-container">
        {/* Header row */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2
              className="font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(30px, 3.2vw, 46px)", color: "#1E1E2E" }}
            >
              Our Collections
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
              {collections.length} Collections
            </span>
            <svg className="w-4 h-4" fill="none" stroke="#85addc" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M5 12h14" strokeLinecap="round" />
              <path d="M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter) => {
          const isActive = collections[activeIdx]?.category === filter;
          return (
            <button
              key={filter}
              onClick={() => scrollToFilter(filter)}
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: "999px",
                border: isActive ? "none" : "1.5px solid rgba(30,30,46,0.14)",
                backgroundColor: isActive ? "#fabf7d" : "rgba(255,255,255,0.80)",
                color: isActive ? "#fff" : "#6B6B80",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: isActive
                  ? "0 6px 18px rgba(250,191,125,0.40)"
                  : "0 2px 8px rgba(30,30,46,0.06)",
                transform: isActive ? "translateY(-1px)" : "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#fabf7d";
                  (e.currentTarget as HTMLElement).style.color = "#fabf7d";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,30,46,0.14)";
                  (e.currentTarget as HTMLElement).style.color = "#6B6B80";
                }
              }}
            >
              {filter}
            </button>
          );
        })}
        </div>
        </div>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex h-full items-center gap-6 will-change-transform"
        style={{
          paddingLeft: "max(clamp(24px, 4vw, 64px), calc((100vw - 1400px) / 2 + 64px))",
          paddingRight: "max(clamp(24px, 4vw, 64px), calc((100vw - 1400px) / 2 + 64px))",
          paddingTop: "clamp(150px, 19vh, 190px)",
          paddingBottom: "32px",
        }}
      >
        {collections.map((item, i) => (
          <div
            key={i}
            className="h-card flex-shrink-0 relative cursor-pointer gpu"
            style={{
              width: "clamp(240px, 28vw, 360px)",
              height: "clamp(300px, 52vh, 480px)",
              borderRadius: "24px",
              overflow: "hidden",
              transformStyle: "preserve-3d",
              willChange: "transform",
              boxShadow: i === activeIdx
                ? "0 0 0 3px #fabf7d, 0 20px 48px rgba(250,191,125,0.22)"
                : "0 20px 48px rgba(30,30,46,0.08)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="h-card-img absolute inset-0 w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />

            {/* Gradient overlay */}
            <div
              className="h-card-overlay absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
                opacity: 0.5,
              }}
            />

            {/* Active ring accent top */}
            {i === activeIdx && (
              <div
                className="absolute top-0 left-0 right-0 h-1 z-20"
                style={{ backgroundColor: "#fabf7d", borderRadius: "24px 24px 0 0" }}
              />
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between z-10">
              <div>
                <div
                  className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-white mb-3"
                  style={{ backgroundColor: item.accent, borderRadius: "999px" }}
                >
                  {item.sub}
                </div>
                <h3
                  className="font-bold text-white leading-[1.1]"
                  style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(20px, 2.2vw, 28px)" }}
                >
                  {item.name}
                </h3>
              </div>

              {/* Arrow circle */}
              <div
                className="flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  width: 42, height: 42, borderRadius: "50%",
                  border: i === activeIdx ? "1.5px solid #fabf7d" : "1.5px solid rgba(255,255,255,0.4)",
                  backgroundColor: i === activeIdx ? "rgba(250,191,125,0.20)" : "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="site-container flex items-center gap-4">
          <div className="flex-1 h-[1px]" style={{ backgroundColor: "rgba(30,30,46,0.1)" }}>
          <div
            className="h-full"
            style={{
              width: `${((activeIdx) / (collections.length - 1)) * 100}%`,
              backgroundColor: "#fabf7d",
              borderRadius: "999px",
              transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />
          </div>
          <span className="text-[9px] uppercase tracking-[0.18em] font-medium flex-shrink-0" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
