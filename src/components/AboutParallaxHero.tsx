/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const img = heroRef.current.querySelector<HTMLElement>(".hero-bg-img");
    if (!img) return;

    const tween = gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "clamp(360px, 48vw, 560px)", background: "#24262b" }}
    >
      {/* Parallax image */}
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000"
        alt="About Sanish Laminates"
        className="hero-bg-img absolute inset-0 w-full h-[120%] object-cover top-[-10%]"
      />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,12,14,0.82) 0%, rgba(11,12,14,0.30) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 w-full" style={{ padding: "clamp(150px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(56px, 8vw, 96px)", maxWidth: "1400px", margin: "0 auto", color: "white" }}>
        <h1 className="font-serif" style={{ fontSize: "clamp(44px, 6vw, 82px)", fontWeight: 500, lineHeight: 1.02, marginBottom: "20px" }}>
          About Us
        </h1>
        <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(255,255,255,0.80)", maxWidth: "540px", lineHeight: 1.65 }}>
          Innovation, precision and expressive surfaces for modern spaces.
        </p>
      </div>
    </section>
  );
}
