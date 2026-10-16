"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Space = { slug: string; name: string };

const pillStyle = (isActive: boolean) => ({
  fontFamily: "var(--font-jakarta)",
  borderRadius: "999px",
  border: `1.5px solid ${isActive ? "var(--accent-purple)" : "rgba(30,30,46,0.12)"}`,
  backgroundColor: isActive ? "var(--accent-purple)" : "transparent",
  color: isActive ? "white" : "var(--text-secondary)",
});

/**
 * "Browse by space" filter row for /applications. One line only: "All" stays pinned at the left while the
 * space pills scroll sideways (trackpad / mouse wheel / drag, or the arrow buttons), so no button ever jumps
 * to a new row when the selection changes. The active pill is scrolled into view on load.
 */
export default function SpaceFilterBar({ spaces, active }: { spaces: Space[]; active: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () =>
      setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    const current = el.querySelector<HTMLElement>('[aria-current="true"]');
    if (current) el.scrollLeft = Math.max(0, current.offsetLeft - el.clientWidth / 2 + current.offsetWidth / 2);
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active, spaces.length]);

  const nudge = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  const arrow =
    "shrink-0 w-9 h-9 flex items-center justify-center rounded-full border bg-white transition-colors hover:bg-black/5";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
      <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] whitespace-nowrap">
        Browse by space
      </p>

      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Link
          href="/applications"
          prefetch={false}
          scroll={false}
          aria-current={active === "" ? "true" : undefined}
          className="shrink-0 text-[12px] font-semibold px-5 py-2.5 whitespace-nowrap transition-all duration-200"
          style={pillStyle(active === "")}
        >
          All
        </Link>

        <span className="shrink-0 w-px h-6" style={{ backgroundColor: "rgba(30,30,46,0.12)" }} aria-hidden="true" />

        {edge.left && (
          <button type="button" aria-label="Scroll filters left" onClick={() => nudge(-1)} className={arrow} style={{ borderColor: "rgba(30,30,46,0.12)" }}>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div
          ref={scroller}
          role="navigation"
          aria-label="Filter photos by space"
          className="flex flex-nowrap items-center gap-2 min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            // soft fade at whichever edge still has more to scroll to
            WebkitMaskImage: `linear-gradient(to right, ${edge.left ? "transparent, black 28px" : "black, black"}, black calc(100% - 28px), ${edge.right ? "transparent" : "black"})`,
            maskImage: `linear-gradient(to right, ${edge.left ? "transparent, black 28px" : "black, black"}, black calc(100% - 28px), ${edge.right ? "transparent" : "black"})`,
          }}
        >
          {spaces.map((s) => {
            const isActive = active === s.slug;
            return (
              <Link
                key={s.slug}
                href={`/applications?space=${s.slug}`}
                prefetch={false}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className="shrink-0 text-[12px] font-semibold px-5 py-2.5 whitespace-nowrap transition-all duration-200"
                style={pillStyle(isActive)}
              >
                {s.name}
              </Link>
            );
          })}
        </div>

        {edge.right && (
          <button type="button" aria-label="Scroll filters right" onClick={() => nudge(1)} className={arrow} style={{ borderColor: "rgba(30,30,46,0.12)" }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
