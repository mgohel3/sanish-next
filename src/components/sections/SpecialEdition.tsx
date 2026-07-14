"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialEdition() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current) return;
    const tween = gsap.fromTo(
      imgRef.current,
      { yPercent: -5 },
      { yPercent: 5, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="home-section--compact bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Content */}
          <div className="lg:order-2">
            <h2 className="home-heading mb-6">
              Special Edition <br /> Architectural Panels
            </h2>
            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.7] max-w-lg mb-8">
              Our limited edition architectural panels redefine luxury interiors. Featuring synchronised textures that perfectly mimic natural materials with enhanced durability.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Syncro-Texture", "1.25 mm Thick", "8ft × 4ft", "Moisture Proof"].map((tag) => (
                <span key={tag} className="text-[11px] font-semibold px-4 py-2 rounded-full border"
                  style={{ color: "var(--accent-blue)", borderColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)", opacity: 0.85 }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/laminates" className="btn-pill btn-pill-primary inline-flex">
              Explore Range
            </Link>
          </div>

          {/* Right — Single parallax image */}
          <div className="relative overflow-hidden lg:order-1" style={{ borderRadius: "28px", height: "clamp(390px, 42vw, 520px)" }}>
            <div ref={imgRef} className="absolute inset-0 w-full h-[110%]" style={{ top: "-5%" }}>
              <img
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200"
                alt="Special Edition Panel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom gradient label */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,18,0.55) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Limited Collection
              </div>
              <div className="text-white text-[20px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>
                Syncro-Texture Series
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
