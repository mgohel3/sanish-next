"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    
    // Parallax background effect for the CTA
    gsap.to(ctaRef.current.querySelector(".bg-image"), {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={ctaRef} className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#8EA9C4]">
        <img 
          src="https://images.unsplash.com/photo-1600607687644-b7171b6bac0b?q=80&w=1600" 
          alt="Premium Texture Background" 
          className="bg-image w-full h-[120%] object-cover opacity-20 mix-blend-multiply absolute top-[-10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/80 mb-6 font-semibold">
            Let's Collaborate
          </div>
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.1] text-white mb-8 font-normal drop-shadow-sm">
            Elevate Your Next <br/> Architectural Project
          </h2>
          <p className="text-[16px] text-white/90 leading-[1.6] mb-12 max-w-lg mx-auto">
            Contact our design consultants to explore the complete Sanish Laminates collection and discuss your bespoke requirements.
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {/* Primary — white glass pill */}
            <a
              href="#"
              className="group relative overflow-hidden text-[var(--accent-blue)] text-[11.5px] font-semibold px-8 py-3.5 flex items-center gap-2 transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "999px",
                fontFamily: "var(--font-jakarta)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.15)";
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-[var(--accent-blue)]/8 skew-x-12" />
              <span className="relative z-10">Request a Catalogue</span>
              <svg className="w-[13px] h-[13px] relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Secondary — glass border pill */}
            <a
              href="mailto:info@sanishlaminate.com"
              className="group relative overflow-hidden text-white text-[11.5px] font-semibold px-8 py-3.5 flex items-center gap-2 transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "999px",
                fontFamily: "var(--font-jakarta)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <span className="relative z-10">Contact Sales Team</span>
              <svg className="w-[13px] h-[13px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
