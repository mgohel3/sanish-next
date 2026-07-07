"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
    name: "Venetian Marble",
    sub: "High Gloss Finish",
    tag: "New",
    accent: "#fabf7d",
    offset: false,
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600",
    name: "Nordic Walnut",
    sub: "Synchronized Texture",
    tag: null,
    accent: "#fabf7d",
    offset: true,
  },
  {
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=600",
    name: "Oxidized Brass",
    sub: "Metallic Series",
    tag: "Bestseller",
    accent: "#fabf7d",
    offset: false,
  },
];

export default function EliteCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      /* Section header */
      gsap.fromTo(".elite-header > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".elite-header", start: "top 80%" } }
      );

      /* Cards */
      gsap.fromTo(".elite-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: "expo.out",
          scrollTrigger: { trigger: ".elite-grid", start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-section relative" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Soft top gradient from previous section */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #F5F3F8, transparent)" }} />

      <div className="site-container">

        {/* Header */}
        <div className="elite-header mb-12">
          <h2 className="home-heading mb-4">
            The Elite Collection
          </h2>
          <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)] max-w-[560px]">
            Our most exclusive range of high-end decorative surfaces, crafted for luxury interiors and statement architectural pieces.
          </p>
        </div>

        {/* Cards grid */}
        <div className="elite-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="elite-card group cursor-pointer"
              style={{ transform: card.offset ? "translateY(32px)" : undefined, willChange: "transform" }}
            >
              {/* Image container — rounded */}
              <div
                className="relative mb-6 overflow-hidden img-premium-wrap"
                style={{
                  height: "clamp(320px, 42vh, 480px)",
                  borderRadius: "24px",
                  boxShadow: "0 20px 48px rgba(30,30,46,0.07)",
                  transition: "box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 32px 64px rgba(30,30,46,0.13)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(30,30,46,0.07)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="img-premium w-full h-full object-cover"
                  style={{ transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                />
                {/* Soft overlay on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)", opacity: 0 }}
                />
                {/* Tag */}
                {card.tag && (
                  <div
                    className="absolute top-5 right-5 z-10 px-4 py-1.5 text-white text-[9px] uppercase tracking-[0.16em] font-semibold"
                    style={{ backgroundColor: card.accent, borderRadius: "999px", boxShadow: `0 6px 18px ${card.accent}55` }}
                  >
                    {card.tag}
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="flex items-start justify-between px-1">
                <div>
                  <h3
                    className="font-bold text-[17px] mb-1 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      color: "#1E1E2E",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = card.accent; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1E1E2E"; }}
                  >
                    {card.name}
                  </h3>
                  <p className="text-[12px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{card.sub}</p>
                </div>

                {/* Arrow button */}
                <div
                  className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    border: `1.5px solid rgba(30,30,46,0.12)`,
                    transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = card.accent;
                    (e.currentTarget as HTMLElement).style.borderColor = card.accent;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,30,46,0.12)";
                  }}
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-45 duration-400" fill="none" stroke="#1E1E2E" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-20 text-center">
          <a
            href="#products"
            className="btn-pill btn-pill-primary inline-flex"
            style={{ backgroundColor: "#85addc", boxShadow: "0 8px 28px rgba(133,173,220,0.28)" }}
          >
            Explore All Collections
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
