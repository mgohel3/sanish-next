"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Mission",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
    text: "Transforming spaces through the timeless design and longevity of our pioneering decorative solutions.",
    accent: "#85addc",
  },
  {
    title: "Vision",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    text: "To craft products that inspire people to adorn their spaces with unmatched aesthetic brilliance.",
    accent: "#f39ba2",
  },
  {
    title: "Values",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    text: "At Sanish, integrity is our cornerstone, guiding every interaction with unwavering honesty and transparency.",
    accent: "#ac8cc0",
  },
];

export default function AboutMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;
    const tween = gsap.fromTo(
      bgRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* ── Parallax background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{ top: "-10%" }}
      >
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Light overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(248,248,251,0.82) 48%, rgba(255,255,255,0.90) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="site-container relative z-10">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-[clamp(32px,4vw,52px)] text-[var(--text-primary)]"
          >
            Mission, Vision &amp; Values
          </h2>
          <div
            className="w-12 h-[2px] mx-auto mt-5 rounded-full"
            style={{ background: "linear-gradient(90deg, #85addc, #ac8cc0)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col"
              style={{
                background: "rgba(255,255,255,0.96)",
                borderRadius: "24px",
                border: "1px solid rgba(30,30,46,0.08)",
                boxShadow: "0 18px 50px rgba(30,30,46,0.10)",
                overflow: "hidden",
              }}
            >
              {/* Card image */}
              <div className="overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card body */}
              <div className="p-7 flex flex-col gap-3">
                <div
                  className="w-8 h-[3px] rounded-full"
                  style={{ backgroundColor: card.accent }}
                />
                <h3
                  className="text-[14px] font-bold uppercase tracking-[0.14em] text-[var(--text-primary)]"
                >
                  {card.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.75] text-[var(--text-secondary)]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
