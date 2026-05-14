"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    date: "Oct 15, 2026", category: "Design Trends",
    title: "The Rise of Tactile Surfaces in Modern Commercial Spaces",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600",
    accent: "#7B9EC4",
  },
  {
    date: "Sep 28, 2026", category: "Architecture",
    title: "Integrating High Gloss Finishes in Minimalist Interiors",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600",
    accent: "#C97A92",
  },
  {
    date: "Sep 12, 2026", category: "Sustainability",
    title: "How Eco-Friendly Laminates Are Changing Green Building",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600",
    accent: "#E8956D",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-[1380px] mx-auto px-8 md:px-14">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">Insights &amp; News</div>
            <div className="section-sep mb-5" />
            <h2 className="font-bold leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-jakarta)", fontSize: "clamp(28px,3.5vw,44px)", color: "#1E1E2E" }}>
              Editorial
            </h2>
          </div>
          <a href="#" className="btn-pill btn-pill-ghost text-[11px]" style={{ borderRadius: "999px", padding: "10px 24px", fontFamily: "var(--font-jakarta)" }}>
            View All Articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="blog-card group cursor-pointer flex flex-col h-full">
              {/* Rounded image */}
              <div className="relative mb-6 overflow-hidden img-premium-wrap"
                style={{ height: "clamp(220px, 28vh, 300px)", borderRadius: "20px", boxShadow: "0 16px 40px rgba(30,30,46,0.07)",
                  transition: "box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 56px rgba(30,30,46,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(30,30,46,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <img src={post.image} alt={post.title} className="img-premium w-full h-full object-cover" />
                {/* Category pill overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 text-white text-[9px] uppercase tracking-[0.16em] font-semibold"
                  style={{ backgroundColor: post.accent, borderRadius: "999px" }}>
                  {post.category}
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10.5px] uppercase tracking-wider mb-3" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: post.accent }} />
                <span>{post.date}</span>
              </div>

              <h3 className="font-bold text-[17px] leading-[1.35] mb-4 flex-1 transition-colors duration-300"
                style={{ fontFamily: "var(--font-jakarta)", color: "#1E1E2E" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = post.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1E1E2E"; }}>
                {post.title}
              </h3>

              <div className="mt-auto flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300"
                style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = post.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B6B80"; }}>
                Read Article
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
