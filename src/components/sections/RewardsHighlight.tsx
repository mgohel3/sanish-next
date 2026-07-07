const PERKS = [
  { label: "Earn Points",       desc: "Earn reward points on every purchase of Sanish products.",        color: "#85addc" },
  { label: "Exclusive Offers",  desc: "Unlock member-only discounts, gifts, and seasonal promotions.",   color: "#f39ba2" },
  { label: "Track Rewards",     desc: "Real-time tracking of your points balance and redemption history.", color: "#ac8cc0" },
  { label: "Easy Redemption",   desc: "Redeem points instantly for cash discounts on your next order.",   color: "#fabf7d" },
];

export default function RewardsHighlight() {
  return (
    <section className="home-section--compact relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)" }}>
      {/* Subtle gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(133,173,220,0.16) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(172,140,192,0.12) 0%, transparent 70%)" }} />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <div>
            <h2 className="home-heading mb-5">
              S&apos;Rewards App
            </h2>
            <p className="text-[15px] leading-[1.8] mb-8 max-w-lg"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
              Join thousands of carpenters and contractors already earning with Sanish. Download the S&apos;Rewards app and start turning every purchase into points, gifts, and cash rewards.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {PERKS.map((perk) => (
                <div key={perk.label} className="p-5 rounded-[18px]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--color-border-subtle)", boxShadow: "0 16px 40px rgba(30,30,46,0.04)" }}>
                  <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: perk.color }} />
                  <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {perk.label}
                  </div>
                  <div className="text-[12px] leading-[1.6]" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
                    {perk.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.sapphirewoods.loyalty&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 text-white transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#0b0c0e",
                borderRadius: "999px",
                minWidth: "180px",
                boxShadow: "0 12px 28px rgba(11,12,14,0.18)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 21.5L11 11L0.5 0.5C0.2 0.8 0 1.2 0 1.7V20.3C0 20.8 0.2 21.2 0.5 21.5Z" fill="#EA4335"/>
                <path d="M0.5 0.5L11 11L15.5 6.5L2 0C1.4-0.3 0.8-0.1 0.5 0.5Z" fill="#4FC3F7"/>
                <path d="M0.5 21.5L11 11L15.5 15.5L2 22C1.4 22.3 0.8 22.1 0.5 21.5Z" fill="#4CAF50"/>
                <path d="M19 12.9L15.5 15.5L11 11L15.5 6.5L19 9.1C19.9 9.6 20 10.4 20 11C20 11.6 19.9 12.4 19 12.9Z" fill="#FFCA28"/>
              </svg>
              <div>
                <div className="text-white leading-none" style={{ fontSize: "9px", letterSpacing: "0.06em", opacity: 0.8 }}>GET IT ON</div>
                <div className="text-white font-semibold leading-tight" style={{ fontSize: "15px", letterSpacing: "0.01em" }}>Google Play</div>
              </div>
            </a>

            <div className="inline-flex items-center gap-2">
              <a href="/rewards"
                className="btn-pill btn-pill-ghost"
                style={{ fontSize: "10.5px", padding: "13px 24px" }}>
                Learn more about the programme →
              </a>
            </div>
          </div>

          {/* Right — App visual */}
          </div>

          <div className="relative flex items-center justify-center">
            {/* Glow ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(133,173,220,0.18) 0%, transparent 70%)" }} />

            {/* Phone mockup frame */}
            <div className="relative z-10 w-[280px]"
              style={{ borderRadius: "42px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>

              {/* Status bar */}
              <div className="flex justify-between items-center px-6 pt-4 pb-2"
                style={{ backgroundColor: "#1a1d27" }}>
                <span className="text-[10px] font-semibold text-white/50" style={{ fontFamily: "var(--font-jakarta)" }}>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-2 border border-white/40 rounded-[2px] relative">
                    <div className="absolute inset-[1.5px] right-auto w-2/3 bg-white/60 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* App content */}
              <div style={{ backgroundColor: "#1a1d27" }}>
                {/* Header */}
                <div className="px-5 pb-4 pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #85addc, #ac8cc0)" }}>
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>S&apos;Rewards</div>
                      <div className="text-[9px] text-white/40" style={{ fontFamily: "var(--font-jakarta)" }}>Sanish Loyalty Programme</div>
                    </div>
                  </div>

                  {/* Points card */}
                  <div className="rounded-2xl p-4 mb-4"
                    style={{ background: "linear-gradient(135deg, #85addc20, #ac8cc020)", border: "1px solid rgba(133,173,220,0.25)" }}>
                    <div className="text-[9px] uppercase tracking-[0.14em] text-white/50 mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>Your Points</div>
                    <div className="text-[28px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>4,250</div>
                    <div className="text-[9px] text-white/40 mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>≈ ₹ 425 redeemable</div>
                  </div>

                  {/* Recent activity */}
                  {[
                    { label: "Order #2847", pts: "+150 pts", color: "#85addc" },
                    { label: "Order #2831", pts: "+320 pts", color: "#f39ba2" },
                    { label: "Redeemed",    pts: "−200 pts", color: "#fabf7d" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-2.5 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="text-[10px] text-white/60" style={{ fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                      <span className="text-[10px] font-bold" style={{ color: row.color, fontFamily: "var(--font-jakarta)" }}>{row.pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav bar */}
              <div className="flex justify-around items-center px-2 py-3"
                style={{ backgroundColor: "#141620", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {["Home", "Orders", "Redeem", "Profile"].map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    <div className="w-3.5 h-3.5 rounded-sm opacity-60" style={{ backgroundColor: i === 0 ? "#85addc" : "rgba(255,255,255,0.3)" }} />
                    <span className="text-[7px]" style={{ color: i === 0 ? "#85addc" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-jakarta)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 lg:right-8 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.86)", border: "1px solid var(--color-border-subtle)", backdropFilter: "blur(12px)", boxShadow: "0 16px 40px rgba(30,30,46,0.10)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(61,143,65,0.2)" }}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#3d8f41">
                  <path d="M3.18 23.76A1.98 1.98 0 012 22V2c0-.75.42-1.4 1.05-1.74L13.88 12 3.18 23.76z"/>
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Google Play</div>
                <div className="text-[8px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Free download</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
