import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found | Sanish Laminates",
  description: "The page you are looking for has moved or no longer exists. Browse our decorative laminates or contact the Sanish team.",
  robots: { index: false, follow: true },
  alternates: { canonical: null }, // a 404 has no canonical URL
};

const LINKS = [
  { label: "Laminates", href: "/laminates", note: "S'Shades, Thre3, Cool Colour, Perspective V4" },
  { label: "Thermo Laminates", href: "/asa-sheets", note: "Weather-resistant surfaces" },
  { label: "Collections", href: "/collection", note: "Download catalogues" },
  { label: "Applications", href: "/applications", note: "Real spaces, by room" },
  { label: "Find a Dealer", href: "/find-a-dealer", note: "Dealer network" },
  { label: "Contact Us", href: "/contact-us", note: "Talk to our team" },
];

export default function NotFound() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <section className="home-section relative overflow-hidden" style={{ paddingTop: "clamp(140px, 18vw, 200px)" }}>
        <div className="absolute -top-24 right-[-8%] w-[460px] h-[460px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(172,140,192,0.22) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-120px] left-[-6%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(133,173,220,0.20) 0%, transparent 70%)" }} />
        <div className="site-container relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-8" aria-hidden="true">
            {["#85addc", "#ac8cc0", "#f39ba2", "#fabf7d"].map((c) => (
              <span key={c} className="block w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <p className="text-[12px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "var(--accent-purple)", fontFamily: "var(--font-jakarta)" }}>
            Error 404
          </p>
          <h1 className="font-serif text-[clamp(38px,6vw,76px)] leading-[1.05] text-[var(--text-primary)] mb-5">
            This page isn&apos;t here
          </h1>
          <p className="text-[16px] leading-[1.8] text-[var(--text-secondary)] max-w-[560px] mx-auto mb-10" style={{ fontFamily: "var(--font-jakarta)" }}>
            The link may be old, or the page may have moved. Search our laminates by design code or name, or pick a place to continue.
          </p>

          <form action="/products" method="get" role="search" className="flex items-center gap-2 max-w-[520px] mx-auto mb-10">
            <label htmlFor="nf-search" className="sr-only">Search laminates</label>
            <input id="nf-search" name="q" type="search" placeholder="Search a design code or name, e.g. 6582 PW"
              className="flex-1 min-w-0 px-5 py-3.5 text-[15px] bg-white border border-[rgba(30,30,46,0.12)] outline-none focus:border-[var(--accent-blue)]"
              style={{ fontFamily: "var(--font-jakarta)", borderRadius: 999 }} />
            <Button type="submit" variant="primary">Search</Button>
          </form>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
            <Button href="/" variant="primary">Back to Home</Button>
            <Button href="/laminates" variant="ghost">Browse Laminates</Button>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-[860px] mx-auto text-left">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block p-4 md:p-5 bg-white border border-[var(--color-border-subtle)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(30,30,46,0.07)] transition-all duration-300" style={{ borderRadius: 18 }}>
                  <span className="block text-[15px] font-semibold text-[var(--text-primary)]">{l.label}</span>
                  <span className="block text-[12.5px] mt-1 text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>{l.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
