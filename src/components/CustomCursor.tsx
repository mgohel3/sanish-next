"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide on mobile
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId: number;
    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      // Dot follows instantly
      gsap.to(dot, {
        x: mx,
        y: my,
        duration: 0.08,
        ease: "none",
      });
    };

    // Ring follows with soft lag (luxury feel)
    const followRing = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      gsap.set(ring, { x: rx, y: ry });
      rafId = requestAnimationFrame(followRing);
    };

    // Hover states
    const onEnterInteractive = () => {
      gsap.to(dot, { scale: 1.8, background: "var(--accent-orange)", duration: 0.4, ease: "power3.out" });
      gsap.to(ring, { scale: 1.5, borderColor: "rgba(232,149,109,0.5)", duration: 0.5, ease: "power3.out" });
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, background: "var(--accent-blue)", duration: 0.4, ease: "power3.out" });
      gsap.to(ring, { scale: 1, borderColor: "rgba(123,158,196,0.5)", duration: 0.5, ease: "power3.out" });
    };

    const attachHovers = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    // Initial state — hidden until mouse moves
    gsap.set([dot, ring], { opacity: 0, x: mx, y: my });
    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(followRing);

    // Attach with small delay (wait for DOM)
    const t = setTimeout(attachHovers, 500);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor"
        style={{ position: "fixed", zIndex: 99999, pointerEvents: "none",
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--accent-blue)", transform: "translate(-50%,-50%)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-follower"
        style={{ position: "fixed", zIndex: 99998, pointerEvents: "none",
          width: 38, height: 38, borderRadius: "50%",
          border: "1.5px solid rgba(123,158,196,0.5)",
          transform: "translate(-50%,-50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
