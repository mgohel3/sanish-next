"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";
import { photoLabel } from "@/lib/photos";

/**
 * One-column phone layout for /applications (CMS: Site Settings → Mobile → Applications page).
 * Each card rises into view as it is scrolled to; "zoom" additionally settles the photo from a slight zoom-in.
 * Hidden from md up — the desktop masonry is rendered by ApplicationsCollage.
 */
export default function ApplicationsMobileList({ photos, zoom }: { photos: Photo[]; zoom: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-am]") ?? []);
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => c.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [photos]);

  return (
    <div ref={root} className="md:hidden flex flex-col gap-5">
      {photos.map((p) => (
        <Link
          key={p.id}
          href={`/applications/photo/${p.id}`}
          prefetch={false}
          data-am=""
          className="am-card group relative block overflow-hidden rounded-[22px] bg-[#ece9e4] shadow-[0_10px_30px_-12px_rgba(20,20,30,0.35)]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <img
            src={p.src}
            alt={`${photoLabel(p)} — ${p.catalogue.name}${p.spaces.length ? ` · ${p.spaces.map((s) => s.name).join(", ")}` : ""}`}
            loading="lazy"
            decoding="async"
            className={`am-img absolute inset-0 w-full h-full object-cover ${zoom ? "am-zoom" : ""}`}
          />
          <div
            className="am-label absolute inset-x-0 bottom-0 px-5 pb-5 pt-16"
            style={{ background: "linear-gradient(to top, rgba(20,20,30,0.85), rgba(20,20,30,0))" }}
          >
            <div className="text-white text-[18px] font-semibold leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              {p.sku || p.catalogue.name}
            </div>
            {p.sku && (
              <div className="text-white/90 text-[13px] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                {p.catalogue.name}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
