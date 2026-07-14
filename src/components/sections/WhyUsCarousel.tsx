"use client";

import { useState, useEffect, useRef } from "react";

const CARDS = [
  {
    title: "ISI Certified",
    desc: "All our laminates conform to IS 2046 standards — guaranteed quality you can trust.",
    iconBg: "rgba(133,173,220,0.12)", iconColor: "#85addc",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12 1.897 0 3.69-.44 5.281-1.226A11.955 11.955 0 0021 12c0-1.897-.44-3.69-1.226-5.281A11.955 11.955 0 0015 3c-2.197 0-4.26.591-6 1.624z" />
      </svg>
    ),
  },
  {
    title: "Scratch Resistant",
    desc: "Our laminate surface is engineered to resist everyday scratches, scuffs, and abrasions.",
    iconBg: "rgba(172,140,192,0.12)", iconColor: "#ac8cc0",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: "Moisture Proof",
    desc: "Formulated to withstand humid environments — perfect for kitchens and bathrooms.",
    iconBg: "rgba(243,155,162,0.12)", iconColor: "#f39ba2",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Fire Retardant",
    desc: "Formulated with fire-retardant properties for added safety in commercial applications.",
    iconBg: "rgba(250,191,125,0.12)", iconColor: "#fabf7d",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6c.36 0 .72-.012 1.08-.036A8.25 8.25 0 0015.362 5.214z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.562a7.5 7.5 0 017.5 7.5" />
      </svg>
    ),
  },
  {
    title: "Easy to Clean",
    desc: "Stain-resistant topcoat — a simple wipe is all it takes to restore a pristine finish.",
    iconBg: "rgba(133,173,220,0.12)", iconColor: "#85addc",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Pan-India Delivery",
    desc: "Fast dispatch from our manufacturing plant to dealers and contractors across India.",
    iconBg: "rgba(172,140,192,0.12)", iconColor: "#ac8cc0",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25" />
      </svg>
    ),
  },
];

export default function WhyUsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const paused = useRef(false);
  const maxIndex = Math.max(CARDS.length - visibleCards, 0);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 640) setVisibleCards(2);
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
    const id = setInterval(() => {
      if (!paused.current) {
        setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
      }
    }, 3200);
    return () => clearInterval(id);
  }, [maxIndex]);

  const prev = () => setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () => setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));

  const cardGap = 20;
  const totalGap = (visibleCards - 1) * cardGap;
  const cardWidth = `calc((100% - ${totalGap}px) / ${visibleCards})`;
  const slideOffset = `calc(-${activeIndex} * (((100% - ${totalGap}px) / ${visibleCards}) + ${cardGap}px))`;

  return (
    <section
      className="home-section--compact relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="site-container">

        {/* Header */}
        <div className="home-heading-row">
          <div>
            <h2 className="home-heading">
              Built to Last. <em>Designed to Impress.</em>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            {[prev, next].map((fn, i) => (
              <button key={i} onClick={fn}
                className="w-11 h-11 flex items-center justify-center border border-[var(--color-border-subtle)] bg-white hover:bg-[var(--accent-blue)] hover:border-[var(--accent-blue)] hover:text-white text-[var(--text-primary)] transition-all duration-300"
                style={{ borderRadius: "50%" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {i === 0
                    ? <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />}
                </svg>
              </button>
            ))}
          </div>
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
            {CARDS.map((card) => (
              <div key={card.title}
                className="shrink-0 p-8 bg-white border border-[var(--color-border-subtle)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(30,30,46,0.06)] transition-all duration-300"
                style={{ width: cardWidth, borderRadius: "24px" }}>
                <div className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{ backgroundColor: card.iconBg, color: card.iconColor, borderRadius: "16px" }}>
                  {card.icon}
                </div>
                <h3 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
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

      </div>
    </section>
  );
}
