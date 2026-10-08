import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ApplicationsCollage from "@/components/ApplicationsCollage";
import SpaceFilterBar from "@/components/SpaceFilterBar";
import CollagePager from "@/components/CollagePager";
import { getPhotos, getSpaces, interleaveByCatalogue } from "@/lib/photos";

// NEW Applications layout (review copy of /applications-previous, built to the client's brief):
//   • no catalogue cards / catalogue filter — opens straight into one mixed collage of every photo
//   • a row of SPACE filters under the heading; the chosen one lives in the URL (?space=bedroom) so a
//     filtered view can be shared; one photo can sit under several spaces
//   • 40 photos a page with numbered pagination (?page=2)
//   • each photo opens a detail page (SKU, catalogue, tags, Enquire)
// Not linked anywhere and not indexed; the live /applications page and every existing route are untouched.
export const metadata = {
  title: "Laminate Applications by Space (new layout — preview)",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 40;

export default async function ApplicationsNewPage({
  searchParams,
}: {
  searchParams: Promise<{ space?: string | string[]; page?: string | string[] }>;
}) {
  const sp = await searchParams;
  const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  const [photos, spaces] = await Promise.all([getPhotos(), getSpaces()]);
  const active = spaces.find((s) => s.slug === first(sp.space))?.slug ?? "";

  const mixed = interleaveByCatalogue(photos);
  const filtered = active ? mixed.filter((p) => p.spaces.some((s) => s.slug === active)) : mixed;
  const activeName = spaces.find((s) => s.slug === active)?.name;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = parseInt(first(sp.page) ?? "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const to = (page - 1) * PAGE_SIZE + shown.length;

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

      {/* ── Space filters (one scrollable line, "All" pinned) ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <SpaceFilterBar spaces={spaces} active={active} />
        </div>
      </div>

      {/* ── Mixed collage ── */}
      <section id="collage-top" className="home-section--compact bg-[var(--bg-primary)] scroll-mt-24">
        <div className="site-container">
          <p className="text-[12px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            {filtered.length === 0
              ? "0 photos"
              : `Showing ${from}–${to} of ${filtered.length} photo${filtered.length === 1 ? "" : "s"}`}
            {activeName ? ` in ${activeName}` : ""}
          </p>

          {shown.length === 0 ? (
            <div className="py-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              {active ? `No photos tagged ${activeName} yet.` : "Photos will appear here soon."}
            </div>
          ) : (
            <ApplicationsCollage photos={shown} />
          )}

          <CollagePager page={page} totalPages={totalPages} space={active} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
