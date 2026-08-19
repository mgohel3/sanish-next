"use client";

import { useState } from "react";
import IconButton from "@/components/ui/IconButton";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="lg:sticky lg:top-[100px]">
      {/* Main image */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-[#f3f4f6] cursor-zoom-in group"
        onClick={() => setZoomed(true)}
      >
        <img
          key={active}
          src={images[active]}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-[10.5px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          Click to zoom
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2.5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="aspect-square rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border: i === active ? "2px solid #85addc" : "2px solid transparent",
              opacity: i === active ? 1 : 0.6,
              transform: i === active ? "scale(0.96)" : "scale(1)",
            }}
          >
            <img
              src={img}
              alt={`${name} view ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
        >
          <img
            src={images[active]}
            alt={name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton
            variant="glass"
            aria-label="Close"
            className="absolute top-6 right-6"
            onClick={() => setZoomed(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
}
