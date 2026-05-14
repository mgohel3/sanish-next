"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoFullRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoFullRef.current || !placeholderRef.current || !gridRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Standard reveals
    const reveals = gridRef.current.querySelectorAll(".about-reveal");
    gsap.fromTo(
      reveals,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Video Zoom Effect
    let mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const setClip = () => {
        if (!placeholderRef.current || !videoFullRef.current || !sectionRef.current) return;
        const rect = placeholderRef.current.getBoundingClientRect();
        const aboutRect = sectionRef.current.getBoundingClientRect();
        
        const top = rect.top - aboutRect.top;
        const left = rect.left - aboutRect.left;
        const right = aboutRect.width - (left + rect.width);
        const bottom = aboutRect.height - (top + rect.height);
        
        gsap.set(videoFullRef.current, { clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)` });
      };

      // Set initial clip path
      setTimeout(setClip, 100);
      window.addEventListener("resize", setClip);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=120%",
          pin: true,
          scrub: true
        }
      });
      
      tl.to(videoFullRef.current, {
        clipPath: "inset(0px 0px 0px 0px)",
        ease: "none",
        duration: 1
      }, 0)
      .to(gridRef.current, {
        opacity: 0,
        ease: "none",
        duration: 0.5
      }, 0);

      return () => {
        window.removeEventListener("resize", setClip);
      };
    });

    mm.add("(max-width: 899px)", () => {
      gsap.set(videoFullRef.current, { clipPath: "inset(0px 0px 0px 0px)", position: "relative", height: "500px", top: "auto", left: "auto" });
      if(placeholderRef.current) placeholderRef.current.style.display = "none";
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="h-[100vh] min-h-[800px] flex items-center bg-[var(--bg-primary)] relative">
      <div 
        ref={videoFullRef} 
        className="absolute top-0 left-0 w-full h-full z-[1] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-black/10"
        style={{ clipPath: "inset(0px 0px 0px 0px)" }}
      >
        <video 
          src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-[2] w-full">
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="about-reveal text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6 font-medium">
              Best Laminate Company in India
            </div>
            <h2 className="about-reveal font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.15] text-[var(--text-primary)] mb-8 font-normal">
              Innovation & Design for Modern Spaces.
            </h2>
            <p className="about-reveal text-[16px] text-[var(--text-secondary)] leading-[1.7] max-w-lg mb-6">
              Founded in 2017, Sanish Laminates has emerged as one of India's fastest-growing premium laminate brands. Our unwavering commitment to trailblazing, quirky designs and research-driven quality sets us apart in the decorative industry.
            </p>
            <p className="about-reveal text-[16px] text-[var(--text-secondary)] leading-[1.7] max-w-lg mb-10">
              We believe every space deserves perfection. We continuously push boundaries to elevate interiors, bringing timeless appeal, durability, and sustainable practices to every surface we create.
            </p>
            <div className="about-reveal">
              <a href="/about-us" className="inline-flex items-center justify-center border border-[var(--color-border-subtle)] px-8 py-4 text-[13px] font-medium hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all text-[var(--text-primary)]">
                Read Our Story
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 about-reveal">
            <div ref={placeholderRef} className="w-full h-[500px] rounded-[4px]" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
