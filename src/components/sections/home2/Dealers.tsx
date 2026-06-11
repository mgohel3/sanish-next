import Link from "next/link";

const C = {
  bg:       "#EDE8E3",
  card:     "#FFFFFF",
  border:   "#E5E0D8",
  accent:   "#8B7BAB",   // lavender for dealers section
  textP:    "#1C1C1C",
  textS:    "#5C5C5C",
};

const STATES = [
  "Rajasthan", "Gujarat", "Maharashtra", "Delhi NCR", "Punjab",
  "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Karnataka", "Tamil Nadu",
  "Telangana", "Andhra Pradesh", "West Bengal", "Bihar", "Odisha",
];

export default function Home2Dealers() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.bg }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: C.accent }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
                style={{ color: C.accent, fontFamily: "'General Sans', var(--font-jakarta), sans-serif" }}>Dealer Network</span>
            </div>
            <h2 className="font-medium leading-[1.1] mb-6"
              style={{ fontSize: "clamp(34px,4vw,50px)", fontFamily: "'Clash Display', var(--font-playfair), sans-serif", color: C.textP, letterSpacing: "-0.01em" }}>
              1200+ Dealers<br /><em>Across India</em>
            </h2>
            <p className="text-[15px] leading-[1.75] mb-8"
              style={{ color: C.textS, fontFamily: "'General Sans', var(--font-jakarta), sans-serif" }}>
              With a growing network spanning 15 states, Sanish Laminates is accessible to contractors, interior designers, and homeowners everywhere. Become an authorised dealer and join India's fastest-growing laminate brand.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/find-a-dealer"
                className="flex items-center gap-2 text-white text-[12px] font-medium px-7 py-3.5 transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: C.accent, borderRadius: "999px", fontFamily: "'General Sans', var(--font-jakarta), sans-serif", letterSpacing: "0.04em" }}>
                Become a Dealer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/find-a-dealer"
                className="flex items-center gap-2 text-[12px] font-medium px-7 py-3.5 border transition-all hover:-translate-y-0.5"
                style={{ color: C.accent, borderColor: C.accent, borderRadius: "999px", fontFamily: "'General Sans', var(--font-jakarta), sans-serif", letterSpacing: "0.04em" }}>
                Find Nearest Dealer
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {STATES.map((state) => (
                <span key={state} className="text-[12px] font-medium px-4 py-2"
                  style={{ backgroundColor: C.card, color: C.textP, borderRadius: "999px", border: `1px solid ${C.border}`, fontFamily: "'General Sans', var(--font-jakarta), sans-serif" }}>
                  {state}
                </span>
              ))}
              <span className="text-[12px] font-semibold px-4 py-2"
                style={{ backgroundColor: C.accent, color: "white", borderRadius: "999px", fontFamily: "'General Sans', var(--font-jakarta), sans-serif" }}>
                + more
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { v: "1200+", l: "Dealers" },
                { v: "15",    l: "States" },
                { v: "48hr",  l: "Dispatch" },
              ].map((s) => (
                <div key={s.l} className="text-center p-5"
                  style={{ backgroundColor: C.card, borderRadius: "18px", border: `1px solid ${C.border}` }}>
                  <div className="text-[28px] font-semibold leading-none mb-1"
                    style={{ fontFamily: "'Clash Display', var(--font-playfair), sans-serif", color: C.accent, letterSpacing: "-0.01em" }}>
                    {s.v}
                  </div>
                  <div className="text-[12px]"
                    style={{ color: C.textS, fontFamily: "'General Sans', var(--font-jakarta), sans-serif" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
