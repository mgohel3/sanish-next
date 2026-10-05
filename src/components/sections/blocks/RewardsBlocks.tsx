/* eslint-disable @next/next/no-img-element */
// Rewards-page section blocks. Each one reproduces, markup-for-markup, a section
// that used to be hard-coded in src/app/rewards/page.tsx — so the page looks
// exactly the same, but every word, number, colour and card is now editable from
// Dashboard > Pages > Rewards.
import { Fragment } from "react";
import StoreBadges from "@/components/ui/StoreBadges";
import BrandMonogram from "@/components/BrandMonogram";
import { REWARD_ICONS } from "@/components/sections/blocks/rewardIcons";

/* eslint-disable @typescript-eslint/no-explicit-any */
type C = { content?: Record<string, any> };

const lines = (s?: string) => String(s ?? "").split(/\r?\n/);

/** "You Install, We Reward" + dark app card with stats. */
export function RewardsIntroBlock({ content = {} }: C) {
  const { heading, body_1, body_2, show_store_badges = true, card_eyebrow, card_title, stats = [] } = content;
  const titleLines = lines(card_title);
  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            {heading && (
              <h2 className="font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.1] text-[var(--text-primary)] mb-6">
                {heading}
              </h2>
            )}
            {body_1 && (
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-6">{body_1}</p>
            )}
            {body_2 && (
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-10">{body_2}</p>
            )}
            {show_store_badges !== false && <StoreBadges size="md" />}
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "28px", background: "linear-gradient(135deg,#1E1E2E 0%,#2d2b45 100%)", padding: "48px 40px", minHeight: "380px" }}
            >
              <div className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(172,140,192,0.25) 0%, transparent 70%)" }} />
              <div className="absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(133,173,220,0.20) 0%, transparent 70%)" }} />

              <BrandMonogram size={14} className="mb-8" />

              {card_eyebrow && (
                <div className="text-white/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {card_eyebrow}
                </div>
              )}
              {card_title && (
                <div className="text-white text-[32px] font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {titleLines.map((l, i) => (
                    <Fragment key={i}>
                      {i > 0 && <br />}
                      {l}
                    </Fragment>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {stats.map((s: any, i: number) => (
                  <div key={i} className="rounded-2xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
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
  );
}

/** "How It Works" — numbered step cards with a coloured top bar. */
export function StepsCardsBlock({ content = {} }: C) {
  const { heading, steps = [] } = content;
  return (
    <section className="home-section--compact bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
      <div className="site-container">
        {heading && (
          <div className="text-center mb-14">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">{heading}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step: any, i: number) => {
            const accent = step.accent || "#85addc";
            return (
              <div
                key={i}
                className="relative bg-white rounded-[24px] p-8 border border-[var(--color-border-subtle)]"
                style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-[13px] font-bold"
                  style={{ backgroundColor: `${accent}22`, color: accent, fontFamily: "var(--font-jakarta)" }}
                >
                  {step.num}
                </div>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-[24px]" style={{ backgroundColor: accent }} />
                <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.75]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** "What You Get" — icon + title + text cards. */
export function IconBenefitsBlock({ content = {} }: C) {
  const { heading, items = [] } = content;
  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {heading && (
          <div className="text-center mb-14">
            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">{heading}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((b: any, i: number) => {
            const accent = b.accent || "#85addc";
            return (
              <div
                key={i}
                className="group flex flex-col gap-4 p-7 rounded-[20px] border border-[var(--color-border-subtle)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,30,46,0.10)] shadow-[0_4px_16px_rgba(30,30,46,0.05)]"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ backgroundColor: `${accent}18`, color: accent }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {REWARD_ICONS[b.icon] || REWARD_ICONS.star}
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">{b.title}</h3>
                  <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.7]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Narrow list of question / answer cards. */
export function FaqCardsBlock({ content = {} }: C) {
  const { heading, items = [] } = content;
  return (
    <section className="home-section--compact bg-[var(--bg-primary)] border-t border-[var(--color-border-subtle)]">
      <div className="site-container-narrow">
        {heading && (
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] text-[var(--text-primary)]">{heading}</h2>
          </div>
        )}
        <div className="space-y-4">
          {items.map((faq: any, i: number) => (
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
  );
}

/** Dark "download the app" call-to-action with store badges and tick list. */
export function AppCtaBlock({ content = {} }: C) {
  const { eyebrow, heading, text, show_store_badges = true, checks = [] } = content;
  return (
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
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#fabf7d", fontFamily: "var(--font-jakarta)" }}>
            {eyebrow}
          </div>
        )}
        {heading && (
          <h2 className="font-serif text-[clamp(32px,4.5vw,58px)] text-white leading-[1.08] mb-6">{heading}</h2>
        )}
        {text && (
          <p className="text-[16px] text-white/65 leading-[1.7] max-w-[540px] mx-auto mb-10" style={{ fontFamily: "var(--font-jakarta)" }}>
            {text}
          </p>
        )}

        {show_store_badges !== false && (
          <div className="inline-flex flex-wrap items-center justify-center gap-5">
            <StoreBadges size="lg" variant="light" />
          </div>
        )}

        {checks.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            {checks.map((c: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-[12px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#fabf7d" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
