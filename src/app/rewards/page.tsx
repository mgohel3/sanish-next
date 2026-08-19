/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import StoreBadges from "@/components/ui/StoreBadges";

export const metadata = {
  title: "Rewards | Sanish Laminates",
  description:
    "Join the Sanish Carpenter Rewards Programme. Earn points on every installation and redeem exciting rewards.",
};

const STEPS = [
  {
    num: "01",
    title: "Download & Register",
    desc: "Download the Sanish Rewards app from Google Play and create your free account in minutes.",
    accent: "#fabf7d",
  },
  {
    num: "02",
    title: "Install & Earn Points",
    desc: "Install Sanish Laminates at your projects. Scan the QR code on each pack to instantly credit points to your account.",
    accent: "#ac8cc0",
  },
  {
    num: "03",
    title: "Redeem Your Rewards",
    desc: "Accumulate points and redeem them for cash transfers, gift vouchers, tools, and exclusive offers — all inside the app.",
    accent: "#f39ba2",
  },
];

const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: "Made for Carpenters",
    desc: "Exclusively designed for professional carpenters and furniture makers who use Sanish products daily.",
    accent: "#fabf7d",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Points on Every Pack",
    desc: "Earn reward points on every Sanish laminate pack you install. The more you install, the more you earn.",
    accent: "#ac8cc0",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    title: "Instant Cash Transfer",
    desc: "Redeem your points directly to your bank account or UPI ID — no waiting, no paperwork.",
    accent: "#f39ba2",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "Track Live Earnings",
    desc: "See your points balance, transaction history and available rewards in real-time through the app.",
    accent: "#85addc",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: "Exclusive Gift Vouchers",
    desc: "Redeem points for gift vouchers from leading brands — tools, home appliances, shopping & more.",
    accent: "#fabf7d",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Dedicated Support",
    desc: "Our team is available to assist with any questions about your points, redemptions or app issues.",
    accent: "#ac8cc0",
  },
];

const FAQS = [
  {
    q: "Who can join the Sanish Rewards programme?",
    a: "Any professional carpenter or furniture maker who regularly purchases and installs Sanish Laminates is eligible to join. Registration is free.",
  },
  {
    q: "How do I earn points?",
    a: "Scan the unique QR code found on each Sanish laminate pack using the app. Points are instantly credited to your account after verification.",
  },
  {
    q: "When can I redeem my points?",
    a: "You can redeem points once you reach the minimum threshold. Redemptions are processed within 24–48 hours to your bank or UPI.",
  },
  {
    q: "Is there an expiry on points?",
    a: "Points are valid for 12 months from the date of earning. Stay active and keep installing to retain and grow your balance.",
  },
];

export default function RewardsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <PageHero
        eyebrow="Carpenter Rewards"
        title="Earn Rewards on Every Installation"
        image="/assets/img/rewards-banner.jpg"
        description="The Sanish Rewards programme is built for professional carpenters. Install more, earn more — and redeem rewards that matter to you."
      />

      {/* ── Intro Banner ── */}
      <section className="home-section--compact bg-[var(--bg-primary)]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.1] text-[var(--text-primary)] mb-6">
                You Install, We Reward
              </h2>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-6">
                As a professional carpenter, you are the backbone of every beautiful interior. The Sanish
                Rewards programme is our way of saying thank you. Every laminate sheet you install earns
                you points that convert into real cash, gift vouchers, and exclusive perks.
              </p>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-10">
                Join thousands of carpenters across India who are already earning with Sanish. Simply
                download the app, scan packs and watch your rewards grow.
              </p>
              <StoreBadges size="md" />
            </div>

            {/* Visual card */}
            <div className="relative">
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "28px", background: "linear-gradient(135deg,#1E1E2E 0%,#2d2b45 100%)", padding: "48px 40px", minHeight: "380px" }}
              >
                {/* Background orb */}
                <div className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(172,140,192,0.25) 0%, transparent 70%)" }} />
                <div className="absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(133,173,220,0.20) 0%, transparent 70%)" }} />

                {/* Monogram */}
                <div className="grid grid-cols-2 mb-8" style={{ gap: "4px", width: "fit-content" }}>
                  {["#fabf7d","#ac8cc0","#f39ba2","#85addc"].map((c) => (
                    <span key={c} className="block rounded-full" style={{ width: 14, height: 14, backgroundColor: c }} />
                  ))}
                </div>

                <div className="text-white/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Sanish Rewards
                </div>
                <div className="text-white text-[32px] font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Carpenter<br />Loyalty App
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "10,000+", label: "Active Carpenters" },
                    { val: "₹50L+",   label: "Rewards Paid Out" },
                    { val: "5★",      label: "App Rating" },
                    { val: "Free",    label: "To Join" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                      <div className="text-[20px] font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>{s.val}</div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-white/50" style={{ fontFamily: "var(--font-jakarta)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="home-section--compact bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative bg-white rounded-[24px] p-8 border border-[var(--color-border-subtle)]"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-[13px] font-bold"
                  style={{ backgroundColor: `${step.accent}22`, color: step.accent, fontFamily: "var(--font-jakarta)" }}
                >
                  {step.num}
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-1 rounded-t-[24px]"
                  style={{ backgroundColor: step.accent }}
                />
                <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.75]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <section className="home-section--compact bg-[var(--bg-primary)]">
        <div className="site-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
              What You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group flex flex-col gap-4 p-7 rounded-[20px] border border-[var(--color-border-subtle)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,30,46,0.10)] shadow-[0_4px_16px_rgba(30,30,46,0.05)]"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ backgroundColor: `${b.accent}18`, color: b.accent }}
                >
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.7]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-section--compact bg-[var(--bg-secondary)] border-t border-[var(--color-border-subtle)]">
        <div className="site-container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] text-[var(--text-primary)]">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-[18px] px-7 py-6 border border-[var(--color-border-subtle)]"
                style={{ boxShadow: "0 2px 12px rgba(30,30,46,0.04)" }}
              >
                <div className="text-[15px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {faq.q}
                </div>
                <div className="text-[14px] text-[var(--text-secondary)] leading-[1.75]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section
        className="home-section relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1E1E2E 0%,#2d2b45 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(172,140,192,0.18) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(133,173,220,0.15) 0%, transparent 70%)" }} />
        </div>

        <div className="site-container relative z-10 text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#fabf7d", fontFamily: "var(--font-jakarta)" }}>
            Start Earning Today
          </div>
          <h2 className="font-serif text-[clamp(32px,4.5vw,58px)] text-white leading-[1.08] mb-6">
            Download the App & Join Free
          </h2>
          <p className="text-[16px] text-white/65 leading-[1.7] max-w-[540px] mx-auto mb-10" style={{ fontFamily: "var(--font-jakarta)" }}>
            Over 10,000 carpenters are already earning with Sanish Rewards. Register in 2 minutes
            and start collecting points on your very next installation.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-5">
            <StoreBadges size="lg" variant="light" />
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            {["Free to join", "Instant points", "No minimum order"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-white/60 text-[12px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#fabf7d" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
