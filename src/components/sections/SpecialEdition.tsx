"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SpecialEdition() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;

    // Subtle parallax between left and right columns
    gsap.to(rightColRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--bg-secondary)] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Content & Image */}
          <div ref={leftColRef} className="flex-1 flex flex-col justify-center">
            <div className="mb-12">
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
                Exclusive Range
              </div>
              <h2 className="font-serif text-[clamp(36px,4vw,56px)] leading-[1.1] text-[var(--text-primary)] mb-6">
                Special Edition <br /> Architectural Panels
              </h2>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.6] max-w-md">
                Our limited edition architectural panels redefine luxury interiors. Featuring synchronized textures that perfectly mimic natural materials with enhanced durability.
              </p>
            </div>
            
            <div className="relative h-[450px] w-full max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800" 
                alt="Special Edition Panel" 
                className="w-full h-full object-cover"
                style={{ borderRadius: "24px" }}
              />
              {/* Floating specs card */}
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white p-6 shadow-xl max-w-[240px] border border-[var(--color-border-subtle)] glass-card" style={{ borderRadius: "20px" }}>
                <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--accent-blue)] mb-2 font-medium">Specifications</div>
                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-2 mb-2">
                  <span className="text-[12px] text-[var(--text-secondary)]">Thickness</span>
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">1.25mm</span>
                </div>
                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-2 mb-2">
                  <span className="text-[12px] text-[var(--text-secondary)]">Size</span>
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">8ft × 4ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[var(--text-secondary)]">Finish</span>
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">Syncro-Texture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div ref={rightColRef} className="flex-1 relative pt-12 lg:pt-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="mt-20">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600" 
                  alt="Detail 1" 
                  className="w-full h-[320px] object-cover mb-6"
                  style={{ borderRadius: "18px" }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600" 
                  alt="Detail 2" 
                  className="w-full h-[240px] object-cover"
                  style={{ borderRadius: "18px" }}
                />
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=600" 
                  alt="Detail 3" 
                  className="w-full h-[280px] object-cover mb-6"
                  style={{ borderRadius: "18px" }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" 
                  alt="Detail 4" 
                  className="w-full h-[380px] object-cover"
                  style={{ borderRadius: "18px" }}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
