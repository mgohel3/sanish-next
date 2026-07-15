import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Find a Sanish Laminate Dealer | Dealer Network India",
  description:
    "Locate authorised Sanish Laminate dealers across India. Contact us for dealer enquiries and distribution partnerships.",
};

export default function FindADealerPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Dealer Network"
        title="Find a Dealer"
        image="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2000"
        description="Connect with an authorised Sanish dealer for samples, product guidance and availability."
      />

      {/* Page body */}
      <section className="home-section">
        <div className="site-container-narrow">
          <p className="text-[17px] leading-[1.75] text-[var(--text-secondary)] mb-8" style={{ fontFamily: "var(--font-jakarta)", maxWidth: "520px" }}>
            Dealer network information coming soon.
          </p>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid rgba(30,30,46,0.08)" }}>
            <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              In the meantime, contact us directly:
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="mailto:info@sanishlaminate.com"
                className="text-[15px] font-semibold hover:underline" style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                info@sanishlaminate.com
              </a>
              <a href="tel:+917027777032"
                className="text-[15px] font-semibold hover:underline" style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>
                +91 7027 777 032
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
