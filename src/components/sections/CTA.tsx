"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import type { CtaContent } from "@/lib/homepage";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CTA = {
  heading: "Elevate Your Next\nArchitectural Project",
  body: "Contact our design consultants to explore the complete Sanish Laminates collection and discuss your bespoke requirements.",
  bg_image: "/assets/img/cta-bg.jpg",
  primary_label: "View Catalogue",
  primary_url: "#",
  secondary_label: "Contact Sales Team",
  secondary_url: "mailto:info@sanishlaminate.com",
};

export default function CTA({ content = {} }: { content?: CtaContent }) {
  const c = { ...DEFAULT_CTA, ...content };
  const headingLines = (c.heading || "").split("\n");
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    const img = ctaRef.current.querySelector<HTMLElement>(".bg-image");
    if (!img) return;

    // fromTo ensures the parallax starts at the correct offset regardless of
    // when ScrollTrigger initialises relative to the scroll position.
    const tween = gsap.fromTo(
      img,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    /* No overflow-hidden here — keeps Lenis scroll-height calculation clean.
       Clipping is handled by the inner background wrapper below. */
    <section ref={ctaRef} id="cta-section" className="relative home-section">
      {/* Parallax background — overflow-hidden lives here, not on the section */}
      <div className="absolute inset-0 z-0 bg-[#1c130a] overflow-hidden">
        <img
          src={c.bg_image}
          alt="Premium Texture Background"
          className="bg-image w-full h-[130%] object-cover absolute top-[-15%]"
        />
        {/* Brand-tinted colour overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(28,19,10,0.72) 0%, rgba(20,30,50,0.62) 60%, rgba(28,19,10,0.72) 100%)" }} />
        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, rgba(28,19,10,0.60), transparent)" }} />
      </div>

      <div className="site-container relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.1] text-white mb-8 font-normal drop-shadow-sm">
            {headingLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
          <p className="text-[16px] text-white/90 leading-[1.6] mb-12 max-w-lg mx-auto">
            {c.body}
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {c.primary_label && c.primary_url && (
              <Button href={c.primary_url} variant="light" className="group">
                <span>{c.primary_label}</span>
                <svg className="w-[13px] h-[13px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            )}

            {c.secondary_label && c.secondary_url && (
              <Button href={c.secondary_url} variant="glass" className="group">
                <span>{c.secondary_label}</span>
                <svg className="w-[13px] h-[13px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
