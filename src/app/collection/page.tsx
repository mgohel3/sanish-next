/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CollectionTiles from "@/components/CollectionTiles";
import Link from "next/link";

export const metadata = {
  title: "Collections | Sanish Laminates",
  description:
    "Explore the full Sanish Laminates collection — S'Shades, Thre3, Cool Colour, 0.8mm Series and Fluted. Premium decorative surface solutions for every interior.",
};

export default function CollectionPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <PageHero
        eyebrow="Our Collections"
        title="Surface Design, Elevated"
        image="https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=2000"
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
                { val: "500+",   label: "Designs",          accent: "#85addc" },
                { val: "5",      label: "Collections",      accent: "#ac8cc0" },
                { val: "25+",    label: "Years Experience", accent: "#f39ba2" },
                { val: "IS:848", label: "Certified",        accent: "#fabf7d" },
              ].map((s) => (
                <div key={s.label} className="rounded-[20px] p-6 border border-[var(--color-border-subtle)]"
                  style={{ backgroundColor: `${s.accent}0d` }}>
                  <div className="font-serif text-[32px] font-bold mb-1" style={{ color: s.accent }}>{s.val}</div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-jakarta)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collection Tiles ── */}
      <section className="home-section--compact bg-[var(--bg-secondary)]">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
              Our Collections
            </h2>
          </div>
          <CollectionTiles />
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

function CollectionInquiryForm() {
  return (
    <form
      action="mailto:info@sanishlaminate.com"
      method="get"
      encType="text/plain"
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Full Name</label>
          <input type="text" name="name" placeholder="Your full name" required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" required
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Contact Number</label>
          <input type="tel" name="phone" placeholder="+91 00000 00000"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Select Collection</label>
          <select name="collection"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors appearance-none cursor-pointer"
            style={{ fontFamily: "var(--font-jakarta)" }}>
            <option value="">Choose a collection</option>
            <option value="sshades">S&apos;Shades Premium</option>
            <option value="thre3">Thre3</option>
            <option value="cool-colour">Cool Colour</option>
            <option value="08mm">0.8mm Series</option>
            <option value="fluted">Fluted</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
          style={{ fontFamily: "var(--font-jakarta)" }}>Enquiry Purpose</label>
        <select name="purpose"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors appearance-none cursor-pointer"
          style={{ fontFamily: "var(--font-jakarta)" }}>
          <option value="">Select purpose</option>
          <option value="commercial">Commercial Project</option>
          <option value="residential">Residential Project</option>
          <option value="architectural">Architectural Specification</option>
          <option value="distributor">Distributor / Dealer Inquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
          style={{ fontFamily: "var(--font-jakarta)" }}>Message</label>
        <textarea name="message" rows={4} placeholder="Tell us about your project…"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors resize-none"
          style={{ fontFamily: "var(--font-jakarta)" }} />
      </div>
      <button type="submit"
        className="w-full py-3.5 rounded-full text-white text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-[2px]"
        style={{ backgroundColor: "var(--accent-blue)", fontFamily: "var(--font-jakarta)", boxShadow: "0 8px 24px rgba(133,173,220,0.35)" }}>
        Send Inquiry
      </button>
    </form>
  );
}
