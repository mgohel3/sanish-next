import Link from "next/link";
import { getSitePage } from "@/lib/pages";

type Item = { image?: string; video?: string; caption?: string; alt?: string; category?: string };

/** Home page "Media Gallery" preview: the first photos/videos of the Events & Media page, plus a button to the full gallery. CMS-managed. */
export default async function MediaTeaser({ content = {} }: { content?: Record<string, unknown> }) {
  const heading = (content.heading as string) || "Media Gallery";
  const sub = (content.sub as string) || "";
  const ctaLabel = (content.cta_label as string) || "View Media Gallery \u2192";
  const ctaUrl = (content.cta_url as string) || "/events";
  const count = Math.max(1, Math.min(12, parseInt((content.count as string) || "6", 10) || 6));
  const source = ((content.source_page as string) || "events").replace(/^\/+/, "");

  const page = await getSitePage(source);
  const items: Item[] = [];
  for (const s of page?.sections ?? []) {
    const c = s.content as unknown as { items?: Item[] } | undefined;
    if (s.block_type === "media_gallery") {
      for (const it of c?.items ?? []) if (it.image) items.push(it);
    }
  }
  const shown = items.slice(0, count);
  // Nothing to preview yet: show nothing rather than an empty box.
  if (shown.length === 0) return null;

  return (
    {/* Soft grey-blue (same tone as Collections) so it reads as its own band below the off-white Editorial section */}
    <section className="home-section relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="site-container">
        <div className="home-heading-row">
          <div>
            <h2 className="home-heading">{heading}</h2>
            {sub && (
              <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-xl" style={{ fontFamily: "var(--font-jakarta)" }}>{sub}</p>
            )}
          </div>
          <Link href={ctaUrl} className="btn-pill btn-pill-ghost flex-shrink-0" style={{ textTransform: "none" }}>
            {ctaLabel}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {shown.map((it, i) => (
            <Link
              key={i}
              href={ctaUrl}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: "4 / 3", borderRadius: "20px", boxShadow: "0 16px 40px rgba(30,30,46,0.07)", backgroundColor: "#24262b" }}
              aria-label={it.caption || it.alt || (it.video ? "Watch video" : "View photo")}
            >
              <img
                loading="lazy"
                decoding="async"
                src={it.image}
                alt={it.alt || it.caption || "Sanish Laminates event"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {it.video && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="#24262b"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              )}
              {(it.caption || it.category) && (
                <span
                  className="absolute inset-x-0 bottom-0 p-3 sm:p-4 pt-12 text-white text-[12px] sm:text-[13px] leading-snug"
                  style={{ background: "linear-gradient(to top, rgba(20,20,30,0.82), rgba(20,20,30,0))", fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="line-clamp-2">{it.caption || it.category}</span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
