import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogueImageGrid from "@/components/sections/CatalogueImageGrid";
import { getGalleryCatalogues, getCatalogueBySlug } from "@/lib/gallery";

export async function generateStaticParams() {
  return getGalleryCatalogues().map((c) => ({ catalogue: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ catalogue: string }> }) {
  const { catalogue: slug } = await params;
  const catalogue = getCatalogueBySlug(slug);
  if (!catalogue) return {};
  return {
    title: `${catalogue.name} — Design Gallery | Sanish Laminates`,
    description: `Browse ${catalogue.images.length} in-room preview images from the Sanish ${catalogue.name} catalogue.`,
  };
}

export default async function CatalogueGalleryPage({ params }: { params: Promise<{ catalogue: string }> }) {
  const { catalogue: slug } = await params;
  const catalogue = getCatalogueBySlug(slug);
  if (!catalogue) notFound();

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <section className="pt-32 pb-10 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                <Link href="/applications" className="hover:text-[var(--accent-blue)] transition-colors">Applications</Link>
                <span className="opacity-50">/</span>
                <span className="text-[var(--text-primary)]">{catalogue.name}</span>
              </nav>

              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full text-white mb-5"
                style={{ backgroundColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                Catalogue: {catalogue.name}
              </span>

              <h1 className="font-serif text-[var(--text-primary)] text-[clamp(32px,5vw,60px)] leading-[1.08] max-w-3xl">
                {catalogue.name}
              </h1>
            </div>

            <Link
              href="/applications"
              className="inline-flex items-center gap-2 text-[12px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 hover:-translate-y-[1px] w-fit flex-shrink-0"
              style={{
                fontFamily: "var(--font-jakarta)",
                borderColor: "var(--accent-blue)",
                color: "var(--accent-blue)",
              }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Applications
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section--compact bg-white">
        <div className="site-container">
          <CatalogueImageGrid catalogue={catalogue} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
