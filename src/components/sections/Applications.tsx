"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HomeGalleryTile } from "@/lib/gallery";

export default function Applications({ tiles }: { tiles: HomeGalleryTile[] }) {
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
          <Link href="/applications" className="btn-pill btn-pill-ghost flex-shrink-0" style={{ textTransform: "none" }}>
            View All Applications →
          </Link>
        </div>

        <div ref={masonryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[300px_300px] gap-6">
          {/* Real product tiles, picked from the catalogue galleries */}
          {tiles.map((tile, i) => (
            <Link
              key={`${tile.catalogueSlug}-${tile.id}`}
              href={`/applications/gallery/${tile.catalogueSlug}/${tile.id}`}
              className={`masonry-item relative group overflow-hidden rounded-[20px] block aspect-[4/3] lg:aspect-auto ${i === 2 ? "lg:row-span-2" : ""}`}
            >
              <img src={tile.src} alt={`${tile.catalogueName} — Laminate #${tile.id}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{tile.catalogueName}</span>
                <span className="text-white/80 text-xs tracking-wide mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Laminate #{tile.id}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
