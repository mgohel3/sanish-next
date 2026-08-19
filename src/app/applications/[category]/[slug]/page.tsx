/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import InquireButton from "@/components/InquireButton";
import { getApplication, getRelatedApplications, applications, categorySlug, getCategoryBySlug } from "@/lib/applications";

export async function generateStaticParams() {
  return applications.map((a) => ({ category: categorySlug(a.category), slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) return {};
  return {
    title: `${app.label} — Applications | Sanish Laminates`,
    description: app.description.slice(0, 155),
  };
}

const COLLECTION_THUMB: Record<string, string> = {
  "S'Shades":      "/assets/img/material/shadesCollection.png",
  "Thre3":         "/assets/img/material/threeCollection.jpg",
  "Cool Colour":   "/assets/img/material/cool_colour_Collection.webp",
  "Perspective V4": "/assets/img/material/08mmCollection.webp",
  "Fluted":        "/assets/img/material/flutedCollection.webp",
};

export default async function ApplicationCaseStudy({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlugParam, slug } = await params;
  const app = getApplication(slug);
  if (!app || categorySlug(app.category) !== categorySlugParam) notFound();

  const category = getCategoryBySlug(categorySlugParam);
  const related = getRelatedApplications(app, 3);
  const accent = category?.accent ?? "#85addc";

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-0 overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 z-0">
          <img src={app.src} alt={app.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,18,0.55) 0%, rgba(10,8,18,0.20) 50%, rgba(255,255,255,1) 100%)" }} />
        </div>

        <div className="site-container relative z-10 pt-16 pb-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-white/70 mb-10" style={{ fontFamily: "var(--font-jakarta)" }}>
            <Link href="/applications" className="hover:text-white transition-colors">Applications</Link>
            <span className="opacity-50">/</span>
            <Link href={`/applications/${categorySlugParam}`} className="hover:text-white transition-colors">{app.category}</Link>
            <span className="opacity-50">/</span>
            <span className="text-white/90">{app.label}</span>
          </nav>

          {/* Category pill */}
          <Link href={`/applications/${categorySlugParam}`}
            className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full text-white mb-5 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent, fontFamily: "var(--font-jakarta)" }}>
            {app.category}
          </Link>

          <h1 className="font-serif text-white text-[clamp(36px,5.5vw,72px)] leading-[1.08] mb-6 max-w-3xl">
            {app.label}
          </h1>

          <div className="flex flex-wrap gap-5 text-[13px] text-white/75" style={{ fontFamily: "var(--font-jakarta)" }}>
            <span>📍 {app.location}</span>
            <span>· {app.year}</span>
            {app.designer && <span>· {app.designer}</span>}
            {app.area && <span>· {app.area}</span>}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

            {/* Left: content */}
            <div>
              {/* Description */}
              <div className="mb-12">
                <p className="text-[16px] text-[var(--text-secondary)] leading-[1.9]"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  {app.description}
                </p>
              </div>

              {/* Photo gallery */}
              {app.gallery.length > 0 && (
                <div className="mb-14 overflow-hidden rounded-[20px]" style={{ aspectRatio: "16/9" }}>
                  <img src={app.gallery[0]} alt={app.label} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Right: sticky sidebar */}
            <div className="space-y-6">
              {/* Project details card */}
              <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
                <div className="px-7 py-5 border-b border-[var(--color-border-subtle)]"
                  style={{ backgroundColor: `${accent}10` }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: accent, fontFamily: "var(--font-jakarta)" }}>
                    Project Details
                  </div>
                </div>
                <div className="bg-white px-7 py-6 space-y-4">
                  {[
                    { label: "Location",  val: app.location },
                    { label: "Year",      val: app.year },
                    { label: "Category",  val: app.category },
                    ...(app.designer ? [{ label: "Designer",  val: app.designer }] : []),
                    ...(app.area     ? [{ label: "Area",      val: app.area     }] : []),
                    { label: "Surface",   val: app.finish },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-4 text-[13px]">
                      <span className="text-[var(--text-secondary)] flex-shrink-0"
                        style={{ fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                      <span className="font-semibold text-[var(--text-primary)] text-right"
                        style={{ fontFamily: "var(--font-jakarta)" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products used card */}
              {app.productsUsed.length > 0 && (
                <div className="rounded-[24px] border border-[var(--color-border-subtle)] overflow-hidden"
                  style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
                  <div className="px-7 py-5 border-b border-[var(--color-border-subtle)]"
                    style={{ backgroundColor: `${accent}10` }}>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: accent, fontFamily: "var(--font-jakarta)" }}>
                      Products Used
                    </div>
                  </div>
                  <div className="bg-white px-7 py-6 space-y-5">
                    {app.productsUsed.map((p, i) => (
                      <div key={p.name} className={i > 0 ? "pt-5 border-t border-[var(--color-border-subtle)]" : ""}>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden">
                            <img
                              src={COLLECTION_THUMB[p.collection] ?? app.src}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-[14px] font-semibold text-[var(--text-primary)]"
                              style={{ fontFamily: "var(--font-jakarta)" }}>
                              {p.code}
                            </div>
                            <div className="text-[11.5px] text-[var(--text-secondary)]"
                              style={{ fontFamily: "var(--font-jakarta)" }}>
                              {p.collection} Collection · {p.finish}
                            </div>
                          </div>
                        </div>
                        <div className="text-[12.5px] text-[var(--text-secondary)] leading-[1.6] mb-3"
                          style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="font-semibold text-[var(--text-primary)]">Used for:</span> {p.usage}
                        </div>
                        {p.productSlug && (
                          <Link href={`/products/${p.productSlug}`}
                            className="inline-block text-[11px] font-semibold uppercase tracking-[0.09em] px-4 py-2 rounded-full border transition-all duration-200 hover:-translate-y-[2px]"
                            style={{ borderColor: accent, color: accent, fontFamily: "var(--font-jakarta)" }}>
                            View Product →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights card */}
              <div className="rounded-[24px] bg-white border border-[var(--color-border-subtle)] px-7 py-6"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.07)" }}>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] mb-4"
                  style={{ color: accent, fontFamily: "var(--font-jakarta)" }}>
                  Project Highlights
                </div>
                <ul className="space-y-3">
                  {app.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[13.5px] text-[var(--text-secondary)]"
                      style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${accent}20` }}>
                        <svg className="w-2.5 h-2.5" fill="none" stroke={accent} strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA card */}
              <div className="rounded-[24px] p-7 text-center"
                style={{ background: `linear-gradient(135deg, ${accent}15 0%, ${accent}05 100%)`, border: `1px solid ${accent}25` }}>
                <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  Inspired by this project?
                </div>
                <p className="text-[12px] text-[var(--text-secondary)] mb-5 leading-[1.6]"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  Talk to our consultants about recreating this look for your space.
                </p>
                <InquireButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related projects ── */}
      {related.length > 0 && (
        <section className="home-section--compact border-t border-[var(--color-border-subtle)]"
          style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="site-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-[clamp(24px,3vw,34px)] text-[var(--text-primary)]">
                  Related Projects
                </h2>
              </div>
              <Link href={`/applications/${categorySlugParam}`} className="text-[12px] font-semibold hover:opacity-70 transition-opacity"
                style={{ color: accent, fontFamily: "var(--font-jakarta)" }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/applications/${categorySlug(r.category)}/${r.slug}`}
                  className="group block relative overflow-hidden rounded-[20px]"
                  style={{ minHeight: "260px" }}>
                  <img src={r.src} alt={r.label}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(10,8,18,0.80) 0%, rgba(10,8,18,0.10) 60%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70"
                      style={{ fontFamily: "var(--font-jakarta)" }}>{r.category}</span>
                    <div className="text-white text-[17px] font-bold mt-1"
                      style={{ fontFamily: "var(--font-jakarta)" }}>{r.label}</div>
                    <div className="text-[12px] mt-0.5" style={{ color: accent, fontFamily: "var(--font-jakarta)" }}>
                      {r.finish}
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
