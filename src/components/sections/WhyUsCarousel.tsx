"use client";

import { useState, useEffect, useRef } from "react";
import IconButton from "@/components/ui/IconButton";

const CARDS = [
  {
    title: "ISI Certified",
    desc: "All our laminates conform to IS 2046 standards — guaranteed quality you can trust.",
    icon: <img src="/assets/img/icon/why-us/isi-certified.svg" alt="" className="w-10 h-10" />,
  },
  {
    title: "Scratch Resistant",
    desc: "Our laminate surface is engineered to resist everyday scratches, scuffs, and abrasions.",
    icon: <img src="/assets/img/icon/why-us/scratch-resistant.svg" alt="" className="w-10 h-10" />,
  },
  {
    title: "Moisture Proof",
    desc: "Formulated to withstand humid environments — perfect for kitchens and bathrooms.",
    icon: <img src="/assets/img/icon/why-us/moisture-proof.svg" alt="" className="w-10 h-10" />,
  },
  {
    title: "Fire Retardant",
    desc: "Formulated with fire-retardant properties for added safety in commercial applications.",
    icon: <img src="/assets/img/icon/why-us/fire-retardant.svg" alt="" className="w-10 h-10" />,
  },
  {
    title: "Easy to Clean",
    desc: "Stain-resistant topcoat — a simple wipe is all it takes to restore a pristine finish.",
    icon: <img src="/assets/img/icon/why-us/easy-to-clean.svg" alt="" className="w-10 h-10" />,
  },
];

export default function WhyUsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const paused = useRef(false);
  const maxIndex = Math.max(CARDS.length - visibleCards, 0);

  useEffect(() => {
    const updateVisibleCards = () => {
      // Mobile and tablet both show one card at a time — only the lg
      // (desktop/laptop) breakpoint keeps the original 3-up layout.
      if (window.innerWidth >= 1024) setVisibleCards(3);
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
      style={{ backgroundColor: "var(--bg-secondary)" }}
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
              <IconButton key={i} onClick={fn} aria-label={i === 0 ? "Previous" : "Next"}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {i === 0
                    ? <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />}
                </svg>
              </IconButton>
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
                <div className="w-12 h-12 flex items-center justify-center mb-6">
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
