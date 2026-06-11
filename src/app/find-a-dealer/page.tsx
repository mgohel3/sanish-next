import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Find a Sanish Laminate Dealer | Dealer Network India",
  description:
    "Locate authorised Sanish Laminate dealers across India. Contact us for dealer enquiries and distribution partnerships.",
};

export default function FindADealerPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-[118px] border-b" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "rgba(30,30,46,0.07)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3.5">
          <nav className="flex items-center gap-2 text-[11.5px]" style={{ fontFamily: "var(--font-jakarta)", color: "#6B6B80" }}>
            <Link href="/" className="hover:text-[#7B9EC4] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <span style={{ color: "var(--text-primary)" }}>Find a Dealer</span>
          </nav>
        </div>
      </div>

      {/* Page body */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 max-w-2xl">
          <div className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
            Dealer Network
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.1] text-[var(--text-primary)] mb-8">
            Find a Dealer
          </h1>
          <p className="text-[17px] leading-[1.75] text-[var(--text-secondary)] mb-8" style={{ fontFamily: "var(--font-jakarta)", maxWidth: "520px" }}>
            Dealer network information coming soon.
          </p>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid rgba(30,30,46,0.08)" }}>
            <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              In the meantime, contact us directly:
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="mailto:info@sanishlaminate.com"
                className="text-[15px] font-semibold hover:underline" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
                info@sanishlaminate.com
              </a>
              <a href="tel:+917027777032"
                className="text-[15px] font-semibold hover:underline" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
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
