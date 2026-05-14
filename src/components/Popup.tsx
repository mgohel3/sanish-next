"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Popup() {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerPopup = () => {
      if (hasTriggered) return;
      setHasTriggered(true);
      setRender(true);
      setTimeout(() => setShow(true), 50);
    };

    // 1. Timer: 30 seconds
    const timer = setTimeout(() => {
      triggerPopup();
    }, 30000);

    // 2. Scroll trigger: after About section
    const aboutSection = document.getElementById("about");
    let st: ScrollTrigger | null = null;
    
    if (aboutSection) {
      st = ScrollTrigger.create({
        trigger: aboutSection,
        start: "bottom center", // triggers when bottom of about section hits center of viewport
        once: true,
        onEnter: triggerPopup
      });
    }

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setRender(false), 500);
  };

  if (!render) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-500 ${
        show ? "bg-black/40 backdrop-blur-md opacity-100 visible" : "bg-black/0 backdrop-blur-none opacity-0 invisible"
      }`}
    >
      <div 
        className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-[24px] p-8 max-w-[420px] w-[90%] shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative transform transition-all duration-500 ease-out ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors p-1"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="text-center mb-8 mt-2">
          <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-3 font-medium">
            Have a project?
          </div>
          <h3 className="font-serif text-[clamp(28px,4vw,32px)] leading-tight text-[var(--text-primary)] mb-3">
            Request an Inquiry
          </h3>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed px-2">
            Share your details and our architectural consultants will get back to you shortly.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-full px-5 py-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-full px-5 py-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            required 
            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-full px-5 py-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
          <button 
            type="submit" 
            className="w-full mt-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full px-6 py-4 text-[13px] font-medium tracking-wide hover:bg-[var(--accent-blue)] hover:text-white transition-colors"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
