import Link from "next/link";
import { getSitePage } from "@/lib/pages";
import MediaTeaserGrid from "./MediaTeaserGrid";

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

  // Soft grey-blue (same tone as Collections) so it reads as its own band below the off-white Editorial section.
  return (
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

        <MediaTeaserGrid items={shown} />
      </div>
    </section>
  );
}
