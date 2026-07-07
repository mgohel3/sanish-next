const BG   = "#2C3E50";
const ON   = "#F5F2EE";
const ACC  = "#C4916A";

const STEPS = [
  { num: "01", title: "Raw Material Selection",    desc: "We source kraft paper, phenolic resin, and decorative prints from verified suppliers — the foundation of lasting quality.",      accent: "#85addc" },
  { num: "02", title: "High-Pressure Lamination",  desc: "Sheets are assembled and pressed under 1,000+ PSI at 150°C for 40–60 minutes, creating a dense, void-free bond.",             accent: "#85addc" },
  { num: "03", title: "Surface Treatment",         desc: "The top layer receives scratch-resistant, anti-bacterial, and UV-stable coatings depending on the finish grade.",              accent: "#85addc" },
  { num: "04", title: "Quality Inspection",        desc: "Every sheet passes IS 2046 dimensional, adhesion, and colour-fastness checks before it leaves our plant.",                    accent: "#85addc" },
];

export default function Home2Process() {
  return (
    <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: ACC }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
                style={{ color: ACC, fontFamily: "var(--font-poppins)" }}>Our Process</span>
            </div>
            <h2 className="font-medium leading-[1.1] mb-6"
              style={{ fontSize: "clamp(32px,4vw,48px)", fontFamily: "var(--font-vogue)", color: ON, letterSpacing: "-0.01em" }}>
              Precision at<br /><em>Every Layer</em>
            </h2>
            <p className="text-[15px] leading-[1.8] mb-10"
              style={{ color: "rgba(245,242,238,0.75)", fontFamily: "var(--font-poppins)" }}>
              Sanish Laminates are high-pressure decorative laminates (HPDL) manufactured in our state-of-the-art plant using a multi-step process that ensures consistency across every batch.
            </p>
            <a href="/about-us"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-75"
              style={{ color: ACC, fontFamily: "var(--font-poppins)" }}>
              About Our Manufacturing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right — steps */}
          <div className="space-y-5">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-6 p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "20px", borderLeft: `3px solid ${step.accent}` }}>
                <div className="text-[28px] font-semibold flex-shrink-0 leading-none"
                  style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-vogue)" }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[16px] font-medium mb-1.5"
                    style={{ color: ON, fontFamily: "var(--font-poppins)" }}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65]"
                    style={{ color: "rgba(245,242,238,0.7)", fontFamily: "var(--font-poppins)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
