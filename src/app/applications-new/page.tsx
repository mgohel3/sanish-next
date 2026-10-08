import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ApplicationsCollage from "@/components/ApplicationsCollage";
import { getPhotos, getSpaces, interleaveByCatalogue } from "@/lib/photos";

// NEW Applications layout (review copy of /applications-previous, built to the client's brief):
//   • no catalogue cards / catalogue filter — opens straight into one mixed collage of every photo
//   • a row of SPACE filters under the heading; the chosen one lives in the URL (?space=bedroom) so a
//     filtered view can be shared; one photo can sit under several spaces
//   • each photo opens a detail page (SKU, catalogue, tags, Enquire)
// Not linked anywhere and not indexed; the live /applications page and every existing route are untouched.
export const metadata = {
  title: "Laminate Applications by Space (new layout — preview)",
  robots: { index: false, follow: false },
};

export default async function ApplicationsNewPage({
  searchParams,
}: {
  searchParams: Promise<{ space?: string | string[] }>;
}) {
  const sp = await searchParams;
  const requested = Array.isArray(sp.space) ? sp.space[0] : sp.space;

  const [photos, spaces] = await Promise.all([getPhotos(), getSpaces()]);
  const active = spaces.find((s) => s.slug === requested)?.slug ?? "";

  const mixed = interleaveByCatalogue(photos);
  const shown = active ? mixed.filter((p) => p.spaces.some((s) => s.slug === active)) : mixed;
  const activeName = spaces.find((s) => s.slug === active)?.name;

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Inspiration Gallery"
        title="Applications"
        image="/assets/img/applications-banner.jpg"
        imageFill
        description="See Sanish surfaces in kitchens, workplaces, retail environments and modern homes."
      />

      {/* ── Space filters ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Browse by space
            </p>
            <div className="flex flex-wrap gap-2" role="navigation" aria-label="Filter photos by space">
              {[{ slug: "", name: "All" }, ...spaces].map((s) => {
                const isActive = active === s.slug;
                return (
                  <Link
                    key={s.slug || "all"}
                    href={s.slug ? `/applications-new?space=${s.slug}` : "/applications-new"}
                    scroll={false}
                    prefetch={false}
                    aria-current={isActive ? "true" : undefined}
                    className="text-[12px] font-semibold px-5 py-2.5 transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      borderRadius: "999px",
                      border: `1.5px solid ${isActive ? "var(--accent-purple)" : "rgba(30,30,46,0.12)"}`,
                      backgroundColor: isActive ? "var(--accent-purple)" : "transparent",
                      color: isActive ? "white" : "var(--text-secondary)",
                    }}
                  >
                    {s.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mixed collage ── */}
      <section className="home-section--compact bg-[var(--bg-primary)]">
        <div className="site-container">
          <p className="text-[12px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            {shown.length} photo{shown.length === 1 ? "" : "s"}
            {activeName ? ` in ${activeName}` : ""}
          </p>

          {shown.length === 0 ? (
            <div className="py-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              {active ? (
                <>
                  No photos tagged {activeName} yet.{" "}
                  <Link href="/applications-new" className="underline">
                    See all photos
                  </Link>
                </>
              ) : (
                "Photos will appear here soon."
              )}
            </div>
          ) : (
            <ApplicationsCollage key={active || "all"} photos={shown} />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
