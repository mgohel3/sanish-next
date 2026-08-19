/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { GalleryCatalogue } from "@/lib/gallery";

/**
 * TEMPORARY (2026-08-19): catalogue-grouped preview-image gallery, standing in
 * for the case-study ApplicationsCategories grid on /applications while that
 * feature is paused per client instruction. Swap back to
 * <ApplicationsCategories /> in src/app/applications/page.tsx when case
 * studies are reactivated — nothing here needs to be deleted, this component
 * is additive and ApplicationsCategories.tsx is untouched.
 *
 * UPDATED (2026-08-19, client instruction): two-step browsing — clicking a
 * catalogue (tile or filter pill) navigates to /applications/gallery/[catalogue],
 * which lists every image in it (grid itself lives in CatalogueImageGrid.tsx,
 * also reused by that page). The filter-pill bar below intentionally mirrors
 * ApplicationsCategories.tsx's "Filter applications" bar styling per client
 * reference — but each pill is a plain Link straight to the catalogue page,
 * not an inline filter, since there's nothing on THIS page left to filter.
 *
 * `catalogues` comes from the parent Server Component via
 * getGalleryCatalogues() in src/lib/gallery.ts, which reads
 * public/assets/img/gallery/<slug>/ on the filesystem. To add more
 * catalogues/products — or set a custom thumbnail per catalogue via a
 * "cover.jpg" file — see the comment at the top of gallery.ts.
 */
export default function DesignGallery({ catalogues }: { catalogues: GalleryCatalogue[] }) {
  if (catalogues.length === 0) return null;

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Filter by catalogue
            </p>
            <div className="flex flex-wrap gap-2">
              {catalogues.map((c) => (
                <Link key={c.slug} href={`/applications/gallery/${c.slug}`}
                  className="text-[12px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 bg-transparent border-[rgba(30,30,46,0.12)] text-[var(--text-secondary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:bg-[rgba(133,173,220,0.08)]"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Catalogue tile grid ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalogues.map((c) => (
              <Link
                key={c.slug}
                href={`/applications/gallery/${c.slug}`}
                className="group relative overflow-hidden rounded-[20px] block"
                style={{ aspectRatio: "3/4" }}
              >
                <img src={c.thumbnail} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5"
                    style={{
                      backgroundColor: "#fabf7d",
                      color: "#24262b",
                      borderRadius: "999px",
                      fontFamily: "var(--font-jakarta)",
                      boxShadow: "0 4px 12px rgba(250,191,125,0.45)",
                    }}>
                    Collection
                  </span>
                </div>

                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-white font-serif text-xl tracking-wide">{c.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
