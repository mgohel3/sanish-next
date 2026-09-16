import Link from "next/link";
import Button from "@/components/ui/Button";
import PageHero from "@/components/PageHero";
import CityPageContactCard from "@/components/CityPageContactCard";
import type { CityPageData, CityPageListItem } from "@/lib/cityPages";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600";

/** Every section title on this page shares one size (56px desktop). */
const TITLE_STYLE = { fontSize: "clamp(32px, 4.5vw, 56px)" };

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

/** Renders a CMS "<Product> in <City>" page (`CityPage.resolved()`), sharing
 *  the site's design tokens (`.section-header`, `.home-section`, `Button`)
 *  but with its own left-aligned, conversion-focused layout — distinct from
 *  the centered generic SitePage blocks, which stay centered for Home/About/etc. */
export default function CityPageView({
  page,
  siblingCities = [],
}: {
  page: CityPageData;
  siblingCities?: CityPageListItem[];
}) {
  const d = page.resolved_data;

  const features = (d.why_choose_us || []).filter((f) => f.title || f.desc);
  const faqs = (d.faqs || []).filter((f) => f.q && f.a);
  const testimonials = (d.testimonials || []).filter((t) => t.quote);
  const others = siblingCities.filter((c) => c.slug !== d.slug);

  return (
    <>
      <PageHero
        eyebrow={`${d.product_type} in ${d.city}`}
        title={d.h1_title || d.hero_heading || `${d.product_type} in ${d.city}`}
        description={d.hero_description}
        image={HERO_IMAGE}
        imageFill
        breadcrumb={[{ label: "Home", href: "/" }, { label: d.city }]}
        rightSlot={<CityPageContactCard city={d.city} />}
      />

      {/* Intro + quick facts */}
      {(d.main_content || d.city) && (
        <section className="home-section bg-[var(--bg-primary)]">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[60px] lg:gap-[80px] items-start">
              {d.main_content && (
                <div
                  className="space-y-6 text-[15px] text-[var(--text-secondary)] leading-[1.8]"
                  dangerouslySetInnerHTML={{ __html: d.main_content }}
                />
              )}
              <div
                className="rounded-[24px] p-8 border border-[var(--color-border-subtle)] bg-white"
                style={{ boxShadow: "0 12px 40px rgba(30,30,46,0.06)" }}
              >
                <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6 font-medium">
                  Quick Facts
                </div>
                <dl className="space-y-5">
                  <div>
                    <dt className="text-[11px] text-[var(--text-secondary)] mb-1">Serving</dt>
                    <dd className="text-[15px] font-medium text-[var(--text-primary)]">
                      {d.city}{d.state ? `, ${d.state}` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-[var(--text-secondary)] mb-1">Product Range</dt>
                    <dd className="text-[15px] font-medium text-[var(--text-primary)]">{d.product_type}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-[var(--text-secondary)] mb-1">Dealer Network</dt>
                    <dd className="text-[15px] font-medium text-[var(--text-primary)]">Authorised local dealers</dd>
                  </div>
                </dl>
                <Button href="/contact-us" variant="primary" fullWidth className="mt-7">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      {features.length > 0 && (
        <section className="home-section--compact bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
          <div className="site-container">
            <div className="section-header">
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Why Sanish
              </div>
              <h2 style={TITLE_STYLE}>Why Choose Sanish {d.product_type} in {d.city}?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-[20px] p-7 border border-[var(--color-border-subtle)] bg-white flex gap-4"
                >
                  <div className="text-[var(--color-accent-primary)] mt-0.5">
                    <CheckIcon />
                  </div>
                  <div>
                    {f.title && (
                      <h3 className="font-serif text-[19px] text-[var(--text-primary)] mb-1.5">{f.title}</h3>
                    )}
                    {f.desc && (
                      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">{f.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="home-section--compact bg-[var(--bg-primary)]">
          <div className="site-container">
            <div className="section-header">
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Testimonials
              </div>
              <h2 style={TITLE_STYLE}>What {d.city} Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="rounded-[24px] p-8 border border-[var(--color-border-subtle)] bg-white flex flex-col gap-5"
                  style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.06)" }}
                >
                  <p className="text-[15px] text-[var(--text-secondary)] leading-[1.75] italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto">
                    {t.avatar && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar} alt={t.name || ""} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    )}
                    <div>
                      {t.name && <div className="text-[14px] font-semibold text-[var(--text-primary)]">{t.name}</div>}
                      {t.role && <div className="text-[12px] text-[var(--text-secondary)]">{t.role}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="home-section--compact bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
          <div className="site-container">
            <div className="max-w-[760px]">
              <div className="section-header">
                <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                  FAQ
                </div>
                <h2 style={TITLE_STYLE}>Frequently Asked Questions</h2>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {faqs.map((f, i) => (
                  <details key={i} className="group py-6">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-[16px] font-medium text-[var(--text-primary)]">
                      {f.q}
                      <span className="ml-4 flex-shrink-0 text-[var(--text-secondary)] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[15px] text-[var(--text-secondary)] leading-[1.7]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Also serving — internal links to sibling city pages */}
      {others.length > 0 && (
        <section className="home-section--compact bg-[var(--bg-primary)]">
          <div className="site-container">
            <div className="section-header">
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Nearby
              </div>
              <h2 style={TITLE_STYLE}>Also Serving</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="rounded-full px-5 py-2.5 text-[13px] font-medium border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white transition-colors"
                >
                  {c.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="relative home-section overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#1c130a] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,19,10,0.82) 0%, rgba(20,30,50,0.72) 60%, rgba(28,19,10,0.82) 100%)",
            }}
          />
        </div>
        <div className="site-container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-serif leading-[1.15] mb-5 font-normal text-white drop-shadow-sm"
              style={TITLE_STYLE}
            >
              Ready to transform your space in {d.city}?
            </h2>
            <p className="text-[15px] leading-[1.6] mb-9 text-white/85">
              Speak with our design team for personalised {d.product_type.toLowerCase()} recommendations, samples and dealer support in {d.city}.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <Button href="/contact-us" variant="light">Enquire Now</Button>
              <Button href="/contact-us" variant="glass">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>

      {page.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_json) }}
        />
      )}
    </>
  );
}
