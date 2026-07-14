const C = {
  bg:      "#EDE8E3",
  card:    "#FFFFFF",
  border:  "#E5E0D8",
  accent:  "#C4916A",
  textP:   "#1C1C1C",
  textS:   "#5C5C5C",
};

const USPs = [
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12 1.897 0 3.69-.44 5.281-1.226A11.955 11.955 0 0021 12c0-1.897-.44-3.69-1.226-5.281A11.955 11.955 0 0015 3c-2.197 0-4.26.591-6 1.624z" /></svg>,
    title: "ISI Certified",
    desc:  "All our laminates conform to IS 2046 standards — guaranteed quality you can trust.",
    iconBg: "rgba(196,145,106,0.12)", iconColor: "#C4916A",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" /></svg>,
    title: "Scratch Resistant",
    desc:  "Our laminate surface is engineered to resist everyday scratches, scuffs, and abrasions.",
    iconBg: "rgba(139,123,171,0.12)", iconColor: "#8B7BAB",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Moisture Proof",
    desc:  "Formulated to withstand humid environments — perfect for kitchens and bathrooms.",
    iconBg: "rgba(123,171,139,0.12)", iconColor: "#7BAB8B",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6c.36 0 .72-.012 1.08-.036A8.25 8.25 0 0015.362 5.214z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 5.562a7.5 7.5 0 017.5 7.5" /></svg>,
    title: "Fire Retardant",
    desc:  "Formulated with fire-retardant properties for added safety in commercial applications.",
    iconBg: "rgba(196,145,106,0.12)", iconColor: "#C4916A",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
    title: "Easy to Clean",
    desc:  "Stain-resistant topcoat — a simple wipe is all it takes to restore a pristine finish.",
    iconBg: "rgba(139,123,171,0.12)", iconColor: "#8B7BAB",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25" /></svg>,
    title: "Pan-India Delivery",
    desc:  "Fast dispatch from our manufacturing plant to dealers and contractors across India.",
    iconBg: "rgba(123,171,139,0.12)", iconColor: "#7BAB8B",
  },
];

export default function Home2WhyUs() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.bg }}>
      <div className="site-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: C.accent }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
              style={{ color: C.accent, fontFamily: "var(--font-heebo)" }}>Why Sanish</span>
            <div className="w-8 h-[2px]" style={{ backgroundColor: C.accent }} />
          </div>
          <h2 className="font-medium leading-[1.15]"
            style={{ fontSize: "clamp(32px,4vw,48px)", fontFamily: "var(--font-vogue)", color: C.textP, letterSpacing: "-0.01em" }}>
            Built to Last. <em>Designed to Impress.</em>
          </h2>
          <p className="text-[16px] mt-4 max-w-[540px] mx-auto leading-[1.7]"
            style={{ fontFamily: "var(--font-heebo)", color: C.textS }}>
            Every Sanish laminate is manufactured with stringent quality control, giving your projects decades of beauty and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USPs.map((u) => (
            <div key={u.title} className="group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: C.card, borderRadius: "24px", border: `1px solid ${C.border}` }}>
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-6"
                style={{ backgroundColor: u.iconBg, color: u.iconColor }}>
                {u.icon}
              </div>
              <h3 className="text-[17px] font-medium mb-3"
                style={{ fontFamily: "var(--font-heebo)", color: C.textP }}>
                {u.title}
              </h3>
              <p className="text-[14px] leading-[1.65]"
                style={{ color: C.textS, fontFamily: "var(--font-heebo)" }}>
                {u.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
