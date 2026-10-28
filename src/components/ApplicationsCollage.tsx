/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import { photoLabel } from "@/lib/photos";
import ApplicationsMobileList from "./ApplicationsMobileList";

// Card shapes cycle through a fixed set so the wall reads as a real masonry (tall, square and wide cards); the photo fills its
// card (object-cover, centred). Picked from the photo id, so a photo keeps the same shape on every page and visit.
const SHAPES = ["1 / 1", "9 / 16", "2 / 3", "4 / 5", "1 / 1", "3 / 4", "4 / 3", "9 / 16", "2 / 3", "1 / 1", "3 / 2", "4 / 5"];
const shapeFor = (id: number) => SHAPES[(id * 5) % SHAPES.length];

/**
 * Mixed photo collage for /applications. Cards come in mixed shapes (see SHAPES) and reserve their space up front,
 * so nothing jumps while images load. The page hands this one page (40) of photos.
 */
export default function ApplicationsCollage({ photos, mobileLayout = "grid2" }: { photos: Photo[]; mobileLayout?: string }) {
  const insta = mobileLayout === "insta";
  const one = insta || mobileLayout === "grid1" || mobileLayout === "grid1zoom";
  return (
    <>
    {insta && (
      <div className="md:hidden grid grid-cols-3 gap-[2px] -mx-1">
        {photos.map((p, i) => (
          <Link
            key={p.id}
            href={`/applications/photo/${p.id}`}
            prefetch={false}
            aria-label={`${photoLabel(p)} — ${p.catalogue.name}`}
            className="ig-tile relative block aspect-square overflow-hidden bg-[#ece9e4]"
            style={{ animationDelay: `${Math.min(i, 15) * 35}ms` }}
          >
            <img src={p.src} alt={`${photoLabel(p)} — ${p.catalogue.name}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 active:scale-95" />
          </Link>
        ))}
      </div>
    )}
    {one && !insta && <ApplicationsMobileList photos={photos} zoom={mobileLayout === "grid1zoom"} />}
    <div className={`${one ? "hidden md:block " : ""}columns-2 md:columns-3 lg:columns-4 gap-4`}>
      {photos.map((p) => (
        <Link
          key={p.id}
          href={`/applications/photo/${p.id}`}
          prefetch={false}
          className="group relative block mb-4 break-inside-avoid overflow-hidden rounded-[16px] bg-[#ece9e4]"
          style={{ aspectRatio: shapeFor(p.id) }}
        >
          <img
            src={p.src}
            alt={`${photoLabel(p)} — ${p.catalogue.name}${p.spaces.length ? ` · ${p.spaces.map((s) => s.name).join(", ")}` : ""}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div
            className="absolute inset-x-0 bottom-0 p-3 pt-14"
            style={{ background: "linear-gradient(to top, rgba(20,20,30,0.82), rgba(20,20,30,0))" }}
          >
            <div className="text-white text-[14px] font-semibold leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              {p.sku || p.catalogue.name}
            </div>
            {p.sku && (
              <div className="text-white/90 text-[12px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {p.catalogue.name}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}
