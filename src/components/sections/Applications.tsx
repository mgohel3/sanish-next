"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !masonryRef.current) return;

    const items = masonryRef.current.querySelectorAll(".masonry-item");
    
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="home-section bg-white relative">
      <div className="site-container">
        <div className="home-heading-row">
          <div>
            <h2 className="home-heading">
              Architectural Applications
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="text-[13px] font-medium text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-all">All</button>
            <button className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] pb-1 transition-all">Kitchens</button>
            <button className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] pb-1 transition-all">Commercial</button>
            <button className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] pb-1 transition-all">Retail</button>
          </div>
        </div>

        <div ref={masonryRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {/* Masonry Items */}
          <div className="masonry-item relative group overflow-hidden break-inside-avoid">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600" alt="Application 1" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Modern Kitchen</span>
            </div>
          </div>
          
          <div className="masonry-item relative group overflow-hidden break-inside-avoid">
            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600" alt="Application 2" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Retail Space</span>
            </div>
          </div>

          <div className="masonry-item relative group overflow-hidden break-inside-avoid">
            <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600" alt="Application 3" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Corporate Office</span>
            </div>
          </div>

          <div className="masonry-item relative group overflow-hidden break-inside-avoid">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600" alt="Application 4" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Luxury Living</span>
            </div>
          </div>

          <div className="masonry-item relative group overflow-hidden break-inside-avoid">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" alt="Application 5" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Boutique Hotel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
