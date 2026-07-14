"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;

      const items = section.querySelectorAll(".about-copy-reveal");
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        media,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[var(--bg-primary)] home-section"
    >
      <div className="site-container grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <h2 className="about-copy-reveal home-heading mb-7">
            Innovation That Shapes Modern Spaces
          </h2>
          <p className="about-copy-reveal mb-5 max-w-xl text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            Founded in 2017, Sanish Laminates has emerged as one of India&apos;s fastest-growing premium laminate brands. Research-led quality and expressive design set us apart in the decorative surface industry.
          </p>
          <p className="about-copy-reveal mb-9 max-w-xl text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            We continuously push boundaries to elevate interiors, bringing timeless appeal, durability and responsible manufacturing to every surface we create.
          </p>
          <div className="about-copy-reveal">
            <a href="/about-us" className="btn-pill btn-pill-primary">
              Read Our Story
            </a>
          </div>
        </div>

        <div
          ref={mediaRef}
          className="home-media-rectangle relative shadow-[0_24px_70px_rgba(36,38,43,0.12)]"
          style={{ aspectRatio: "16 / 10", height: "clamp(360px, 38vw, 490px)", minHeight: "0" }}
        >
          <video
            src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Sanish material and manufacturing film"
          />
        </div>
      </div>
    </section>
  );
}
