/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquireButton from "@/components/InquireButton";
import CatalogueDownloadCard from "@/components/CatalogueDownloadCard";
import { getGalleryCatalogues, getGalleryImage, getGalleryDescription } from "@/lib/gallery";

export async function generateStaticParams() {
  return getGalleryCatalogues().flatMap((c) =>
    c.images.map((img) => ({ catalogue: c.slug, id: img.id }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ catalogue: string; id: string }> }) {
  const { catalogue: catalogueSlug, id } = await params;
  const found = getGalleryImage(catalogueSlug, id);
  if (!found) return {};
  return {
    title: `${found.catalogue.name} — Laminate #${id} | Sanish Laminates`,
    description: getGalleryDescription(found.catalogue.name, id).slice(0, 155),
  };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ catalogue: string; id: string }> }) {
  const { catalogue: catalogueSlug, id } = await params;
  const found = getGalleryImage(catalogueSlug, id);
  if (!found) notFound();
  const { catalogue, image } = found;

  const more = catalogue.images.filter((img) => img.id !== id).slice(0, 4);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      {/* ── Page header (plain — no cover image) ── */}
      <section className="pt-32 pb-10 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <nav className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            <Link href="/applications" className="hover:text-[var(--accent-blue)] transition-colors">Applications</Link>
            <span className="opacity-50">/</span>
            <Link href={`/applications/gallery/${catalogue.slug}`} className="hover:text-[var(--accent-blue)] transition-colors">{catalogue.name}</Link>
            <span className="opacity-50">/</span>
            <span className="text-[var(--text-primary)]">Laminate #{id}</span>
          </nav>

          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full text-white mb-5"
            style={{ backgroundColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
            Catalogue: {catalogue.name}
          </span>

          <h1 className="font-serif text-[var(--text-primary)] text-[clamp(32px,5vw,60px)] leading-[1.08] mb-2 max-w-3xl">
            Laminate #{id}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

            {/* Left: image + description */}
            <div>
              <div className="mb-10 overflow-hidden rounded-[20px]" style={{ aspectRatio: "16/9" }}>
                <img src={image.src} alt={`Laminate #${id} — ${catalogue.name}`} className="w-full h-full object-cover" />
              </div>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.9]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {getGalleryDescription(catalogue.name, id)}
              </p>
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
                <div className="px-7 py-5 border-b border-[var(--color-border-subtle)]"
                  style={{ backgroundColor: "rgba(133,173,220,0.08)" }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                    Product Details
                  </div>
                </div>
                <div className="bg-white px-7 py-6 space-y-4">
                  {[
                    { label: "Catalogue", val: catalogue.name },
                    { label: "Laminate #", val: id },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-4 text-[13px]">
                      <span className="text-[var(--text-secondary)] flex-shrink-0" style={{ fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                      <span className="font-semibold text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-jakarta)" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CatalogueDownloadCard slug={catalogue.slug} name={catalogue.name} thumbnail={catalogue.thumbnail} />

              <div className="rounded-[24px] p-7 text-center"
                style={{ background: "linear-gradient(135deg, rgba(133,173,220,0.15) 0%, rgba(133,173,220,0.05) 100%)", border: "1px solid rgba(133,173,220,0.25)" }}>
                <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Interested in this finish?
                </div>
                <p className="text-[12px] text-[var(--text-secondary)] mb-5 leading-[1.6]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Talk to our consultants about samples, specifications and pricing.
                </p>
                <InquireButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More from this catalogue ── */}
      {more.length > 0 && (
        <section className="home-section--compact border-t border-[var(--color-border-subtle)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="site-container">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-[clamp(24px,3vw,34px)] text-[var(--text-primary)]">
                More from {catalogue.name}
              </h2>
              <Link href={`/applications/gallery/${catalogue.slug}`} className="text-[12px] font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {more.map((img) => (
                <Link key={img.id} href={`/applications/gallery/${catalogue.slug}/${img.id}`}
                  className="group block relative overflow-hidden rounded-[18px]" style={{ aspectRatio: "4/3" }}>
                  <img src={img.src} alt={`Laminate #${img.id} — ${catalogue.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-white text-[13px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Laminate #{img.id}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
