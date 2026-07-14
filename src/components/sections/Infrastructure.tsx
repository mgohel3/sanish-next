"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Infrastructure() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".infra-fade");
    
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--bg-primary)] border-t border-[var(--color-border-subtle)]">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 w-full relative h-[400px] lg:h-[600px] infra-fade">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" 
              alt="State of the art manufacturing facility" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-[var(--accent-blue)] mix-blend-overlay opacity-30"></div>
            
            {/* Stats Block */}
            <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 md:p-10 shadow-xl border border-[var(--color-border-subtle)] max-w-[300px] glass-card">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-serif text-[var(--accent-blue)] mb-1">2M+</div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">Sheets<br/>Annually</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[var(--accent-blue)] mb-1">50+</div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">Countries<br/>Exported</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="infra-fade text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
              World-Class Infrastructure
            </div>
            <h2 className="infra-fade font-serif text-[clamp(32px,4vw,48px)] leading-[1.2] text-[var(--text-primary)] mb-8">
              Precision Engineering & Sustainable Manufacturing
            </h2>
            <p className="infra-fade text-[15px] text-[var(--text-secondary)] leading-[1.6] mb-8">
              Our state-of-the-art facility integrates advanced European technology with sustainable practices to produce decorative laminates that meet global quality standards. Every sheet undergoes rigorous quality control to ensure flawless texture and finish.
            </p>
            <ul className="infra-fade space-y-4 mb-10">
              <li className="flex items-center gap-4 text-[14px] text-[var(--text-primary)]">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--accent-blue)] text-xs">✓</span>
                Eco-friendly resin technology
              </li>
              <li className="flex items-center gap-4 text-[14px] text-[var(--text-primary)]">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--accent-blue)] text-xs">✓</span>
                Automated pressing and finishing lines
              </li>
              <li className="flex items-center gap-4 text-[14px] text-[var(--text-primary)]">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--accent-blue)] text-xs">✓</span>
                Zero-waste water treatment plant
              </li>
            </ul>
            <div className="infra-fade">
              <a href="#" className="text-[13px] font-medium border-b border-[var(--text-primary)] pb-1 hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-all">
                Learn About Our Process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
