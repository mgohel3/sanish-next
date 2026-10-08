/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquireButton from "@/components/InquireButton";
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

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <section className="pt-32 pb-10 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <nav className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            <Link href="/applications-new" className="hover:text-[var(--accent-blue)] transition-colors">Applications</Link>
            <span className="opacity-50">/</span>
            <span className="text-[var(--text-primary)]">{label}</span>
          </nav>
          <h1 className="font-serif text-[var(--text-primary)] text-[clamp(32px,5vw,60px)] leading-[1.08] max-w-3xl">
            {photo.sku ? `Laminate ${photo.sku}` : "Application photo"}
          </h1>
        </div>
      </section>

      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">
            {/* Photo — shown whole, never cropped */}
            <div className="overflow-hidden rounded-[20px] bg-[#ece9e4]">
              <img
                src={photo.src}
                alt={`${label} — ${photo.catalogue.name}${photo.spaces.length ? ` · ${photo.spaces.map((s) => s.name).join(", ")}` : ""}`}
                className="w-full h-auto block"
                style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
              />
            </div>

            {/* Details */}
            <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden lg:sticky lg:top-28"
              style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
              <dl className="divide-y divide-[var(--color-border-subtle)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                <div className="px-7 py-5">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] mb-1">SKU</dt>
                  <dd className="text-[18px] font-semibold text-[var(--text-primary)]">{photo.sku || "—"}</dd>
                </div>
                <div className="px-7 py-5">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] mb-1">Catalogue</dt>
                  <dd className="text-[16px] text-[var(--text-primary)]">{photo.catalogue.name}</dd>
                </div>
                <div className="px-7 py-5">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] mb-2">Spaces</dt>
                  <dd className="flex flex-wrap gap-2">
                    {photo.spaces.length === 0 && <span className="text-[14px] text-[var(--text-secondary)]">—</span>}
                    {photo.spaces.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/applications-new?space=${s.slug}`}
                        className="text-[12px] font-semibold px-4 py-2 transition-colors hover:text-white hover:bg-[var(--accent-purple)] hover:border-[var(--accent-purple)]"
                        style={{ borderRadius: "999px", border: "1.5px solid rgba(30,30,46,0.12)", color: "var(--text-secondary)" }}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="p-7 pt-2">
                <InquireButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="home-section--compact bg-[var(--bg-primary)]">
          <div className="site-container">
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] text-[var(--text-primary)] mb-8">More like this</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {more.map((p) => (
                <Link key={p.id} href={`/applications-new/photo/${p.id}`} prefetch={false} className="group relative block overflow-hidden rounded-[16px] bg-[#ece9e4]"
                  style={{ aspectRatio: "1 / 1" }}>
                  <img src={p.src} alt={`${photoLabel(p)} — ${p.catalogue.name}`} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
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
