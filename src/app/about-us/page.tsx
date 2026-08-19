/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutParallaxHero from "@/components/AboutParallaxHero";
import AboutMissionSection from "@/components/sections/AboutMissionSection";

export const metadata = {
  title: "About Us | Sanish Laminates",
  description: "Best Laminate Company in India. Innovation and Design.",
};

const CERTS = [
  {
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    image: "https://sanishlaminate.com/assets/images/certifications/certificateNo1.webp",
    body: "Certified by Otabu Certification Pvt. Ltd. as meeting the requirements of ISO 9001:2015 Quality Management System for manufacturers, traders, importers and exporters of HPL, laminates, plywood, block board and flush doors.",
    accent: "#85addc",
  },
  {
    title: "Bureau of Indian Standards",
    subtitle: "IS 2046 : 1995 Certified",
    image: "https://sanishlaminate.com/assets/images/certifications/certificateNo2_01.webp",
    body: "Licence No. CML-9100131599 issued by Bureau of Indian Standards (BIS) for Decorative Thermosetting Synthetic Resin Bonded Laminated Sheets, confirming compliance with Indian Standard IS 2046:1995.",
    accent: "#fabf7d",
  },
];

export default function AboutUsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <AboutParallaxHero />

      {/* ── Innovation & Design ── */}
      <section className="home-section bg-[var(--bg-primary)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[100px] items-stretch">
            <div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
                Best Laminate Company in India
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-[var(--text-primary)] mb-8 leading-[1.1]">
                Innovation and Design
              </h2>
              <div className="space-y-6 text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                <p>
                  Founded in 2017, Sanish has made a strong foothold in the market as one of the fastest-growing laminate brands. With a strong commitment to innovation and design, we have stepped forward to bring the most innovative designs for your interior spaces.
                </p>
                <p>
                  Our dedication goes beyond just products; it's about cultivating lasting connections. We prioritize delivering exceptional value to our clients, aiming to leave an indelible mark of quality, innovation, and beauty in every space we have the privilege to influence.
                </p>
                <p>
                  At the heart of our success lies an unwavering commitment to research and development. Through extensive investment in R&amp;D, we bring forth products of the highest quality that are not only ahead of their time but also possess a timeless appeal in their design and craftsmanship.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-full min-h-[420px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <img
                  src="/assets/img/about/innovation-design.jpg"
                  className="w-full h-full object-cover"
                  alt="Material Finishes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutMissionSection />

      {/* ── Certifications ── */}
      <section className="home-section--compact bg-[var(--bg-primary)]">
        <div className="site-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
              Quality Certifications
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-[1.7]"
              style={{ fontFamily: "var(--font-jakarta)" }}>
              Our manufacturing processes and products are independently certified to the highest national and international quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CERTS.map((cert) => (
              <div key={cert.title}
                className="rounded-[28px] overflow-hidden border border-[var(--color-border-subtle)] bg-white"
                style={{ boxShadow: "0 12px 40px rgba(30,30,46,0.08)" }}>
                {/* Certificate image */}
                <div className="relative overflow-hidden bg-[#f8f8f8]" style={{ height: "340px" }}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full text-white"
                      style={{ backgroundColor: cert.accent, fontFamily: "var(--font-jakarta)" }}>
                      Certified
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="px-8 py-7">
                  <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: cert.accent }} />
                  <h3 className="font-serif text-[22px] text-[var(--text-primary)] mb-1">{cert.title}</h3>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
                    style={{ color: cert.accent, fontFamily: "var(--font-jakarta)" }}>
                    {cert.subtitle}
                  </div>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.75]"
                    style={{ fontFamily: "var(--font-jakarta)" }}>
                    {cert.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-section bg-[var(--bg-secondary)] border-t border-[var(--border)] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000"
            alt="Ready to start"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="site-container relative z-10">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.1] text-[var(--text-primary)] mb-6">
              Ready to elevate your space?
            </h2>
            <p className="text-[16px] text-[var(--text-secondary)] mb-10 leading-[1.7]">
              Whether you're an architect working on a large-scale project or a homeowner looking for the perfect finish, our team is here to assist you with expert advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact-us" className="btn-pill btn-pill-primary">Contact Our Team</a>
              <a href="/collection" className="btn-pill btn-pill-ghost">Explore Collection</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
