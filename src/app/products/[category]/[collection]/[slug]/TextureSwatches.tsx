"use client";

import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";

export default function TextureSwatches({
  variants,
  name,
}: {
  variants: { label: string; image: string }[];
  name: string;
}) {
  const [zoomed, setZoomed] = useState<number | null>(null);

  return (
    <div className="mb-8">
      <p className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
        Available Textures
      </p>
      <p className="text-[11.5px] mb-3" style={{ color: "#A0A0B0", fontFamily: "var(--font-jakarta)" }}>
        Click a swatch to view full size
      </p>
      <div className="flex flex-wrap gap-4">
        {variants.map((t, i) => (
          <button
            key={`${t.label}-${i}`}
            type="button"
            onClick={() => setZoomed(i)}
            className="flex flex-col items-center gap-1.5 w-[152px] cursor-zoom-in"
          >
            <div className="w-[152px] h-[152px] rounded-xl overflow-hidden bg-[#f3f4f6] ring-1 ring-inset ring-black/[0.06] transition-transform duration-200 hover:scale-[1.04]">
              {t.image && (
                <img src={t.image} alt={t.label || name} className="w-full h-full object-cover" />
              )}
            </div>
            {t.label && (
              <span className="text-[13px] font-medium text-center leading-tight" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                {t.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {zoomed !== null && (
        <Lightbox
          src={variants[zoomed].image}
          alt={variants[zoomed].label || name}
          onClose={() => setZoomed(null)}
        />
      )}
    </div>
  );
}
