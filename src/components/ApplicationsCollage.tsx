"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import { photoLabel } from "@/lib/photos";

const PAGE_SIZE = 48;

/**
 * Mixed photo collage for /applications-new. Photos keep their own shape (no cropping) and reserve their space
 * from the stored pixel size, so nothing jumps while images load. Shown 48 at a time ("Show more") so the page
 * stays light with hundreds of photos; the parent re-mounts this (key = active space) when the filter changes.
 */
export default function ApplicationsCollage({ photos }: { photos: Photo[] }) {
  const [count, setCount] = useState(PAGE_SIZE);
  const visible = photos.slice(0, count);
  const left = photos.length - visible.length;

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/applications-new/photo/${p.id}`}
            prefetch={false}
            className="group relative block mb-4 break-inside-avoid overflow-hidden rounded-[16px] bg-[#ece9e4]"
            style={{ aspectRatio: p.width && p.height ? `${p.width} / ${p.height}` : "1 / 1" }}
          >
            <img
              src={p.src}
              alt={`${photoLabel(p)} — ${p.catalogue.name}${p.spaces.length ? ` · ${p.spaces.map((s) => s.name).join(", ")}` : ""}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div
              className="absolute inset-x-0 bottom-0 p-3 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to top, rgba(20,20,30,0.7), rgba(20,20,30,0))" }}
            >
              <div className="text-white text-[13px] font-semibold leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                {p.sku || p.catalogue.name}
              </div>
              {p.sku && (
                <div className="text-white/75 text-[11px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {p.catalogue.name}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {left > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE_SIZE)}
            className="text-[13px] font-semibold px-8 py-3 transition-colors hover:text-white hover:bg-[var(--accent-purple)] hover:border-[var(--accent-purple)]"
            style={{ fontFamily: "var(--font-jakarta)", border: "1.5px solid rgba(30,30,46,0.18)", color: "var(--text-primary)", background: "transparent" }}
          >
            Show more photos ({left} left)
          </button>
        </div>
      )}
    </>
  );
}
