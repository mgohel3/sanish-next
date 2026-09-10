"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import type { SpecialEditionContent } from "@/lib/homepage";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SE = {
  heading: "Special Edition\nArchitectural Panels",
  body: "Our limited edition architectural panels redefine luxury interiors. Featuring synchronised textures that perfectly mimic natural materials with enhanced durability.",
  tags: ["Syncro-Texture", "1.25 mm Thick", "8ft × 4ft", "Moisture Proof"],
  cta_label: "Explore Range",
  cta_url: "/collection",
  image: "/assets/img/material/15-08-2026/Special%20Edition_Banner.jpg",
  image_kicker: "Limited Collection",
  image_title: "Syncro-Texture Series",
};

export default function SpecialEdition({ content = {} }: { content?: SpecialEditionContent }) {
  const heading = content.heading || DEFAULT_SE.heading;
  const body = content.body || DEFAULT_SE.body;
  const tags =
    content.tags && content.tags.length > 0
      ? content.tags.map((t) => t.label || "").filter(Boolean)
      : DEFAULT_SE.tags;
  const ctaLabel = content.cta_label || DEFAULT_SE.cta_label;
  const ctaUrl = content.cta_url || DEFAULT_SE.cta_url;
  const image = content.image || DEFAULT_SE.image;
  const imageKicker = content.image_kicker || DEFAULT_SE.image_kicker;
  const imageTitle = content.image_title || DEFAULT_SE.image_title;
  const headingLines = heading.split("\n");
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
    <section ref={sectionRef} className="home-section--compact bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Content */}
          <div className="lg:order-2">
            <h2 className="home-heading mb-6">
              {headingLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8] max-w-lg mb-8">
              {body}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {tags.map((tag) => (
                <span key={tag} className="text-[11px] font-semibold px-4 py-2 rounded-full border"
                  style={{ color: "var(--accent-blue)", borderColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)", opacity: 0.85 }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href={ctaUrl} className="btn-pill btn-pill-primary inline-flex">
              {ctaLabel}
            </Link>
          </div>

          {/* Right — Single parallax image */}
          <div className="relative overflow-hidden lg:order-1" style={{ borderRadius: "28px", aspectRatio: "3 / 2", transform: "translateZ(0)" }}>
            <div ref={imgRef} className="absolute inset-0 w-[110%] h-[110%]" style={{ top: "-5%", left: "-5%" }}>
              <img
                src={image}
                alt={imageTitle}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom gradient label */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,18,0.55) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                {imageKicker}
              </div>
              <div className="text-white text-[20px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>
                {imageTitle}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
