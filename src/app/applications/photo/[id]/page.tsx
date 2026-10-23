/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquireButton from "@/components/InquireButton";
import CatalogueDownloadCard from "@/components/CatalogueDownloadCard";
import { getPhoto, getPhotos, photoLabel } from "@/lib/photos";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await getPhoto(id);
  if (!photo) return {};
  return {
    title: `${photoLabel(photo)} — ${photo.catalogue.name} | Sanish Laminates`,
    robots: { index: false, follow: false },
  };
}

export default async function ApplicationPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await getPhoto(id);
  if (!photo) notFound();

  // "More like this": photos sharing a space, topped up from the same catalogue.
  const all = await getPhotos();
  const spaceSlugs = new Set(photo.spaces.map((s) => s.slug));
  const sameSpace = all.filter((p) => p.id !== photo.id && p.spaces.some((s) => spaceSlugs.has(s.slug)));
  const sameCatalogue = all.filter((p) => p.id !== photo.id && p.catalogue.slug === photo.catalogue.slug && !sameSpace.includes(p));
  const more = [...sameSpace, ...sameCatalogue].slice(0, 4);

  const label = photoLabel(photo);
  const alt = `${label} — ${photo.catalogue.name}${photo.spaces.length ? ` · ${photo.spaces.map((s) => s.name).join(", ")}` : ""}`;

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      {/* ── Page header ── */}
      <section className="pt-32 pb-10 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <nav className="flex items-center gap-2 text-[12px] md:text-[11px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            <Link href="/applications" className="hover:text-[var(--accent-blue)] transition-colors">Applications</Link>
            <span className="opacity-50">/</span>
            <span className="text-[var(--text-primary)]">{label}</span>
          </nav>

          <span className="inline-block text-[12px] md:text-[10px] font-bold uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full text-white mb-5"
            style={{ backgroundColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
            Catalogue: {photo.catalogue.name}
          </span>

          <h1 className="font-serif text-[var(--text-primary)] text-[clamp(32px,5vw,60px)] leading-[1.08] max-w-3xl">
            {photo.sku ? `Laminate #${photo.sku}` : "Application photo"}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

            {/* Left: the photo, shown whole — never cropped */}
            <div>
              <div className="overflow-hidden rounded-[20px] bg-[#ece9e4]">
                <img loading="lazy" decoding="async"
                  src={photo.src}
                  alt={alt}
                  className="w-full h-auto block"
                  style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
                />
              </div>
            </div>

            {/* Right: sidebar — same panel as the catalogue photo pages */}
            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
                <div className="px-7 py-5 border-b border-[var(--color-border-subtle)]"
                  style={{ backgroundColor: "rgba(133,173,220,0.08)" }}>
                  <div className="text-[12px] md:text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                    Product Details
                  </div>
                </div>
                <div className="bg-white px-7 py-6 space-y-4">
                  {[
                    { label: "Catalogue", val: photo.catalogue.name },
                    { label: "Laminate #", val: photo.sku || "—" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-4 text-[13px]">
                      <span className="text-[var(--text-secondary)] flex-shrink-0" style={{ fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                      <span className="font-semibold text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-jakarta)" }}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-start gap-4 text-[13px]">
                    <span className="text-[var(--text-secondary)] flex-shrink-0" style={{ fontFamily: "var(--font-jakarta)" }}>Spaces</span>
                    <span className="flex flex-wrap justify-end gap-1.5">
                      {photo.spaces.length === 0 && (
                        <span className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-jakarta)" }}>—</span>
                      )}
                      {photo.spaces.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/applications?space=${s.slug}`}
                          prefetch={false}
                          className="text-[12px] md:text-[11px] font-semibold px-3 py-1 transition-colors hover:text-white hover:bg-[var(--accent-purple)] hover:border-[var(--accent-purple)]"
                          style={{ borderRadius: "999px", border: "1.5px solid rgba(30,30,46,0.12)", color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              <CatalogueDownloadCard slug={photo.catalogue.slug} name={photo.catalogue.name} thumbnail={photo.catalogue.thumbnail} />

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

      {/* ── More like this ── */}
      {more.length > 0 && (
        <section className="home-section--compact border-t border-[var(--color-border-subtle)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="site-container">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-[clamp(24px,3vw,34px)] text-[var(--text-primary)]">More like this</h2>
              <Link href="/applications" className="text-[12px] font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {more.map((p) => (
                <Link key={p.id} href={`/applications/photo/${p.id}`} prefetch={false}
                  className="group block relative overflow-hidden rounded-[18px]" style={{ aspectRatio: "4/3" }}>
                  <img src={p.src} alt={`${photoLabel(p)} — ${p.catalogue.name}`} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-white text-[13px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {p.sku ? `Laminate #${p.sku}` : p.catalogue.name}
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
