"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  { name: "S'Shades", sub: "Premium Finishes",  image: "/assets/img/material/shadesCollection.png",   accent: "#7B9EC4" },
  { name: "Thre3",    sub: "Exclusive Designs",  image: "/assets/img/material/threeCollection.jpg",    accent: "#E8956D" },
  { name: "Cool Colour", sub: "Modern Shades",   image: "/assets/img/material/cool_colour_Collection.webp", accent: "#C97A92" },
  { name: "0.8mm",    sub: "Durable Series",     image: "/assets/img/material/08mmCollection.webp",   accent: "#E8B49A" },
  { name: "Fluted",   sub: "Textured Panels",    image: "/assets/img/material/flutedCollection.webp", accent: "#7B9EC4" },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* ── Card cursor-tilt effect ── */
  const setupTilt = (card: HTMLElement) => {
    const img = card.querySelector<HTMLElement>(".h-card-img");
    const overlay = card.querySelector<HTMLElement>(".h-card-overlay");

    const onEnter = () => {
      gsap.to(card, { scale: 1.02, duration: 0.5, ease: "power3.out" });
      gsap.to(img, { scale: 1.06, duration: 0.8, ease: "power3.out" });
      gsap.to(overlay, { opacity: 0.65, duration: 0.4 });
    };

    const onLeave = () => {
      gsap.to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      gsap.to(img, { scale: 1.0, duration: 0.8, ease: "power3.out" });
      gsap.to(overlay, { opacity: 0.5, duration: 0.4 });
    };

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: cx * 6,
        rotateX: -cy * 5,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("mousemove", onMove);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove", onMove);
    };
  };

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".h-card");
    const trackWidth = trackRef.current.scrollWidth - window.innerWidth;

    /* ── Horizontal scroll pin ── */
    const st = gsap.to(trackRef.current, {
      x: -trackWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${trackWidth}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    /* ── Card entry stagger ── */
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    /* ── Tilt cleanup ── */
    const cleanups = cards.map(setupTilt);

    return () => {
      st.kill();
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
      {/* Header */}
      <div className="absolute top-10 md:top-16 left-8 md:left-14 z-10">
        <div className="eyebrow mb-3">Surface Explorer</div>
        <h2
          className="font-bold leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(28px, 3.5vw, 46px)", color: "#1E1E2E" }}
        >
          Material Collections
        </h2>
      </div>

      {/* Card count indicator */}
      <div className="absolute top-10 md:top-16 right-8 md:right-14 z-10 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
          {collections.length} Collections
        </span>
        <svg className="w-4 h-4" fill="none" stroke="#7B9EC4" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M5 12h14" strokeLinecap="round" />
          <path d="M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex h-full items-center gap-6 will-change-transform"
        style={{ paddingLeft: "8vw", paddingRight: "8vw", paddingTop: "110px", paddingBottom: "32px" }}
      >
        {collections.map((item, i) => (
          <div
            key={i}
            className="h-card flex-shrink-0 relative cursor-pointer gpu"
            style={{
              width: "clamp(240px, 28vw, 360px)",
              height: "clamp(320px, 56vh, 500px)",
              borderRadius: "24px",
              overflow: "hidden",
              transformStyle: "preserve-3d",
              willChange: "transform",
              boxShadow: "0 20px 48px rgba(30,30,46,0.08)",
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
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 42, height: 42, borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.08)",
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
      <div className="absolute bottom-8 left-8 md:left-14 right-8 md:right-14 z-10 flex items-center gap-4">
        <div className="flex-1 h-[1px]" style={{ backgroundColor: "rgba(30,30,46,0.1)" }}>
          <div className="h-full" style={{ width: "20%", backgroundColor: "#7B9EC4", borderRadius: "999px", transition: "width 0.1s linear" }} />
        </div>
        <span className="text-[9px] uppercase tracking-[0.18em] font-medium flex-shrink-0" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
