const BG   = "#2C3E50";
const ACC  = "#C4916A";
const ON   = "#F5F2EE";

const STATS = [
  { value: "20+",   label: "Years of Manufacturing", desc: "Established since 2004" },
  { value: "500+",  label: "Laminate Designs",        desc: "Across 12 surface categories" },
  { value: "1200+", label: "Dealer Network",           desc: "Across 15 Indian states" },
  { value: "8mm",   label: "Quality Thickness",        desc: "ISI 2046 certified standard" },
];

export default function Home2Stats() {
  return (
    <section style={{ backgroundColor: BG }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", overflow: "hidden" }}>
          {STATS.map((s) => (
            <div key={s.label} className="px-8 py-10" style={{ backgroundColor: BG }}>
              <div className="text-[44px] md:text-[52px] font-semibold leading-none mb-2"
                style={{ fontFamily: "var(--font-vogue)", color: ACC, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div className="text-[14px] font-medium mb-1"
                style={{ fontFamily: "var(--font-poppins)", color: ON }}>
                {s.label}
              </div>
              <div className="text-[12px]"
                style={{ color: "rgba(245,242,238,0.6)", fontFamily: "var(--font-poppins)" }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
