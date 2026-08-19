/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CollectionShowcase from "@/components/CollectionShowcase";
import CollectionInquiryForm from "@/components/CollectionInquiryForm";

export const metadata = {
  title: "Collections | Sanish Laminates",
  description:
    "Explore the full Sanish Laminates collection — S'Shades, Thre3, Cool Colour, Perspective V4 and Thermo Laminates. Premium decorative surface solutions for every interior.",
};

export default function CollectionPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <PageHero
        eyebrow="Our Collections"
        title="Surface Design, Elevated"
        image="/assets/img/collections-banner.jpg"
        description="Five distinct collections crafted for architects, designers and discerning homeowners who believe every surface tells a story."
      />

      {/* ── Intro stats ── */}
      <section className="home-section--compact bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,48px)] leading-[1.1] text-[var(--text-primary)] mb-5">
                Designed to Inspire.<br />Built to Last.
              </h2>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.85]"
                style={{ fontFamily: "var(--font-jakarta)" }}>
                Every Sanish collection is born from a commitment to craft — pairing the finest raw materials with
                precision manufacturing to produce surfaces that are as enduring as they are beautiful.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Extensive Range",   desc: "Designs across every finish and texture", accent: "#85addc" },
                { title: "Curated Collections", desc: "Distinct lines for every design language", accent: "#ac8cc0" },
                { title: "Proven Expertise",   desc: "Decades of manufacturing excellence", accent: "#f39ba2" },
                { title: "Certified Quality",  desc: "Compliant with IS:848 safety standards", accent: "#fabf7d" },
              ].map((s) => (
                <div key={s.title} className="rounded-[20px] p-6 border border-[var(--color-border-subtle)]"
                  style={{ backgroundColor: `${s.accent}0d` }}>
                  <div className="font-serif text-[19px] font-bold mb-1.5 leading-[1.25]" style={{ color: s.accent }}>{s.title}</div>
                  <div className="text-[13px] leading-[1.5] text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-jakarta)" }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collection Tiles ── */}
      <section className="home-section--compact bg-[var(--bg-secondary)]">
        <div className="site-container">
          <div className="section-header">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
              Our Collections
            </h2>
          </div>
          <CollectionShowcase />
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section className="home-section--compact bg-white border-t border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.1] text-[var(--text-primary)] mb-6">
                Collection Inquiry
              </h2>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.85] mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}>
                Interested in a specific collection? Our design consultants are ready to help you select the
                perfect surface for your project — whether residential, commercial, or architectural.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Dedicated design support",              accent: "#85addc" },
                  { label: "Physical sample dispatch",              accent: "#ac8cc0" },
                  { label: "Technical specifications on request",   accent: "#f39ba2" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.accent}20` }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke={item.accent} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] p-8 md:p-10 border border-[var(--color-border-subtle)]"
              style={{ backgroundColor: "var(--bg-secondary)", boxShadow: "0 8px 40px rgba(30,30,46,0.06)" }}>
              <CollectionInquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
