"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Some browsers/contexts don't honour the `autoplay` attribute even with
  // `muted` + `playsInline` set — a background video that's meant to be
  // constantly moving instead sits frozen on its first frame, which reads
  // as broken, especially while it's visibly growing during the scroll
  // reveal below. Explicitly calling `.play()` covers that gap; the
  // rejected-promise catch is required because browsers reject it instead
  // of throwing when autoplay is genuinely blocked, and an unhandled
  // rejection would otherwise surface as a console error for no benefit.
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const media = mediaRef.current!;
      const header = document.querySelector<HTMLElement>("header");

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
            trigger: section,
            start: "top 72%",
          },
        }
      );

      // Video stays in its normal in-flow inset position (no fixed/absolute
      // positioning, no duplicate spacer element) and grows purely via
      // `scale` + `x`/`y` transform — a single uniform `scale` value never
      // stretches the box non-uniformly, and `object-fit: cover` on the
      // <video> itself means the footage is only ever cropped, never
      // distorted, so the source aspect ratio is preserved throughout.
      // The header stays visible the whole time (matching the reference),
      // so the target region is the viewport area below the header, not
      // the full viewport — the video never renders underneath it.
      // Measured functionally so invalidateOnRefresh recalculates it
      // correctly on resize — GSAP resets pinned elements to their
      // natural, untransformed state while refreshing before it
      // re-measures, so the rect read here is always the resting position.
      const getTransform = () => {
        const rect = media.getBoundingClientRect();
        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        // clientWidth excludes the vertical scrollbar; innerWidth doesn't —
        // on a page this long the scrollbar is always present, so using
        // innerWidth here would systematically bias the "centre" a few
        // pixels off from what's actually visible, and that offset grows
        // as the video scales up. clientWidth keeps it centred on what
        // the user can actually see.
        const targetWidth = document.documentElement.clientWidth;
        const targetHeight = window.innerHeight - headerHeight;
        const scale = Math.max(targetWidth / rect.width, targetHeight / rect.height);
        const targetCenterX = targetWidth / 2;
        const targetCenterY = headerHeight + targetHeight / 2;
        return {
          scale,
          x: targetCenterX - (rect.left + rect.width / 2),
          y: targetCenterY - (rect.top + rect.height / 2),
        };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Kept short deliberately: at 150% (1.5 viewport-heights) the
          // video spends most of that distance still small while
          // `power2.inOut` eases slowly in and out, so the majority of the
          // scroll reads as a mostly-empty page with a small floating
          // video rather than a reveal — a much shorter distance still
          // gives the growth room to read as smooth motion (not a snap)
          // without the long empty-feeling scroll before it pays off.
          end: "+=60%",
          // A numeric scrub (vs. `true`) adds a short catch-up lag behind
          // the scrollbar, giving the motion inertia/weight instead of
          // feeling rigidly 1:1 with the mouse wheel — kept short so it
          // settles into its final centred position quickly once
          // scrolling stops, rather than visibly lagging behind.
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Both animations share one timeline/ScrollTrigger so they can never
      // drift out of sync with each other (a prior version used two
      // separate ScrollTriggers on the same element, which could desync).
      // The text retreats and finishes early (duration 0.35 of the
      // timeline) so it's fully out of the way well before the video
      // finishes growing, instead of both landing at the same instant.
      tl.to(items, { opacity: 0, y: -30, scale: 0.98, ease: "power1.in", duration: 0.35 }, 0);
      tl.to(
        media,
        {
          scale: () => getTransform().scale,
          x: () => getTransform().x,
          y: () => getTransform().y,
          borderRadius: 0,
          // Eases the growth curve instead of a flat linear rate — starts
          // deliberate, accelerates through the middle, settles at the end.
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );
      // Vignette dims the frame while it's still small/floating and clears
      // completely as the video opens up to full screen — reads like a
      // spotlight opening rather than a flat resize.
      tl.to(".about-media-vignette", { opacity: 0, ease: "power1.out", duration: 1 }, 0);
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
      style={{ position: "relative" }}
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
          style={{
            aspectRatio: "16 / 10",
            height: "clamp(360px, 38vw, 490px)",
            minHeight: "0",
            zIndex: 60,
          }}
        >
          <video
            ref={videoRef}
            src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Sanish material and manufacturing film"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="about-media-vignette"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              // `ellipse` (not `circle`) conforms to the box's own
              // proportions — on a wide rectangle, a circle gradient
              // reaches its dark stop far sooner at the corners than
              // along the edges, pooling into visible dark corner
              // patches instead of a smooth, even vignette.
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
