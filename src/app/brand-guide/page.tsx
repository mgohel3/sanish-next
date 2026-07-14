import type { Metadata } from "next";
import PopupTrigger from "@/components/brandguide/PopupTrigger";
import DemoForm from "@/components/brandguide/DemoForm";

export const metadata: Metadata = {
  title: "Brand Guide | Sanish Laminates",
  description: "Internal brand and style reference for Sanish Laminates.",
};

const TYPE_SCALE = [
  { tag: "H1", role: "Page Hero Title",      family: "Vogue", size: "44 – 82px", extra: "clamp(44px, 6vw, 82px) · line-height 1.05 · weight 500" },
  { tag: "H2", role: "Section Heading",       family: "Vogue", size: "34 – 56px", extra: "clamp(34px, 4vw, 56px) · line-height 1.1 · weight 400" },
  { tag: "H3", role: "Card / Sub Heading",    family: "Vogue", size: "18px",      extra: "line-height 1.35 · weight 700" },
  { tag: "H4", role: "Minor Heading",         family: "Vogue", size: "16px",      extra: "line-height 1.4 · weight 700" },
  { tag: "H5", role: "Small Heading",         family: "Vogue", size: "14px",      extra: "line-height 1.45 · weight 600" },
  { tag: "H6", role: "Micro Heading",         family: "Vogue", size: "12px",      extra: "line-height 1.5 · weight 600 · uppercase" },
  { tag: "P",  role: "Body / Description",    family: "Heebo", size: "15px",      extra: "line-height 1.8 · weight 400" },
  { tag: "Btn", role: "Button",                family: "Heebo", size: "11px",      extra: "uppercase · weight 600 · letter-spacing 0.16em" },
];

const DOTS = [
  { name: "Dot Blue",   hex: "#85ADDC", color: "#85addc", role: "Primary accent — links, primary buttons, focus states" },
  { name: "Dot Rose",   hex: "#F39BA2", color: "#f39ba2", role: "Hover / secondary accent" },
  { name: "Dot Purple", hex: "#AC8CC0", color: "#ac8cc0", role: "Tertiary accent — filters, tags" },
  { name: "Dot Orange", hex: "#FABF7D", color: "#fabf7d", role: "Highlight accent — badges" },
];

const BACKGROUNDS = [
  { name: "Primary BG",   hex: "#FAFAFA", color: "#fafafa", border: true },
  { name: "Secondary BG", hex: "#F3F4F6", color: "#f3f4f6" },
  { name: "Section BG",   hex: "#ECEEF1", color: "#eceef1" },
  { name: "Card BG",      hex: "#FFFFFF", color: "#ffffff", border: true },
  { name: "Soft Highlight", hex: "#EAF2FB", color: "#eaf2fb" },
];

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span style={{ fontFamily: "var(--font-vogue)", fontSize: 15, color: "var(--accent-blue)" }}>{num}</span>
      <h2 style={{ fontSize: "clamp(26px,3vw,36px)" }}>{title}</h2>
    </div>
  );
}

export default function BrandGuidePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-16 text-center relative overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{
            top: -120, left: "50%", transform: "translateX(-50%)",
            width: 640, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(133,173,220,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="site-container relative">
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>Sanish Laminates</div>
          <h1 className="mt-4" style={{ fontSize: "clamp(40px,6vw,64px)", lineHeight: 1.05 }}>Brand &amp; Style Guide</h1>
          <p className="mt-5 mx-auto" style={{ maxWidth: 560, color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.75 }}>
            Logo, colour, typography, and UI components — pulled live from this site&apos;s own design tokens,
            so the guide can never drift from what actually ships.
          </p>
        </div>
      </section>

      {/* ── 01 Logo ──────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="01" title="Logo" />
          <p className="mb-10" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            Use the black wordmark on light backgrounds and the white wordmark on dark or photographic backgrounds.
            Never recolour, stretch, or add effects to the logo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[20px] p-14 flex flex-col items-center justify-center gap-6"
              style={{ background: "#ffffff", border: "1px solid var(--color-border-subtle)" }}>
              <img src="/assets/img/logo/black-logo.svg" alt="Sanish black logo" style={{ height: 40, width: "auto" }} />
              <span className="h6" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "var(--text-secondary)" }}>On Light</span>
            </div>
            <div className="rounded-[20px] p-14 flex flex-col items-center justify-center gap-6" style={{ background: "#1a1c22" }}>
              <img src="/assets/img/logo/white-logo.svg" alt="Sanish white logo" style={{ height: 40, width: "auto" }} />
              <span style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>On Dark</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-6">
            {[44, 28, 18].map((s) => (
              <div key={s} className="flex-1 rounded-[18px] p-7 flex flex-col items-center gap-3.5" style={{ minWidth: 140, background: "#fff", border: "1px solid var(--color-border-subtle)" }}>
                <img src="/assets/img/favicon.svg" alt="Monogram" width={s} height={s * 0.88} />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{s === 44 ? "Monogram / Favicon mark" : `${s}px`}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl mt-7 p-6" style={{ background: "var(--soft-highlight, #eaf2fb)", fontSize: 13.5, lineHeight: 1.7 }}>
            <b style={{ color: "var(--accent-blue)" }}>Clear space:</b> keep padding around the wordmark equal to the height of the monogram dots. {" "}
            <b style={{ color: "var(--accent-blue)" }}>Minimum size:</b> don&apos;t scale the full wordmark below 90px wide, or the monogram below 16px.
          </div>
        </div>
      </section>

      {/* ── 02 Favicon ───────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="02" title="Favicon" />
          <p className="mb-10" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            The favicon is the same four-dot monogram used throughout the site as a decorative &quot;brand dot&quot; motif,
            coloured with the four brand accents. This is the real <code>favicon.ico</code> served by the site —
            not a placeholder.
          </p>
          <div className="rounded-2xl overflow-hidden max-w-[420px]" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff", boxShadow: "0 20px 50px rgba(30,30,46,0.08)" }}>
            <div className="flex items-center gap-2 px-3.5 py-2.5" style={{ background: "#ececef", borderBottom: "1px solid var(--color-border-subtle)" }}>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#d6d6da" }} />
                <span className="w-2 h-2 rounded-full" style={{ background: "#d6d6da" }} />
                <span className="w-2 h-2 rounded-full" style={{ background: "#d6d6da" }} />
              </div>
              <div className="flex items-center gap-2 ml-2.5 px-3.5 py-1.5 rounded-t-lg" style={{ background: "#fff", fontSize: 11.5, color: "var(--text-secondary)" }}>
                <img src="/assets/img/favicon.svg" alt="favicon" width={14} height={14} />
                Sanish Laminates
              </div>
            </div>
            <div className="py-8 text-center" style={{ color: "var(--text-secondary)", fontSize: 12.5 }}>sanishlaminates.com</div>
          </div>
        </div>
      </section>

      {/* ── 03 Colour ────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="03" title="Colour" />
          <p className="mb-10" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            Four accent dots form the brand&apos;s core identity colour set, layered on neutral backgrounds and text
            tones for a soft, editorial palette.
          </p>

          <h6 className="mb-4" style={{ color: "var(--text-secondary)" }}>Brand Dots (Accent)</h6>
          <div className="grid gap-5 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
            {DOTS.map((d) => (
              <div key={d.hex} className="rounded-[18px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
                <div style={{ height: 92, background: d.color }} />
                <div className="p-4">
                  <div className="text-[13px] font-semibold mb-0.5">{d.name}</div>
                  <div className="text-[12px]" style={{ color: "var(--text-secondary)", fontFamily: "Consolas, monospace" }}>{d.hex}</div>
                  <div className="text-[11px] mt-1.5" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>{d.role}</div>
                </div>
              </div>
            ))}
          </div>

          <h6 className="mb-4" style={{ color: "var(--text-secondary)" }}>Backgrounds</h6>
          <div className="grid gap-5 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
            {BACKGROUNDS.map((d) => (
              <div key={d.hex} className="rounded-[18px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
                <div style={{ height: 92, background: d.color, borderBottom: d.border ? "1px solid var(--color-border-subtle)" : "none" }} />
                <div className="p-4">
                  <div className="text-[13px] font-semibold mb-0.5">{d.name}</div>
                  <div className="text-[12px]" style={{ color: "var(--text-secondary)", fontFamily: "Consolas, monospace" }}>{d.hex}</div>
                </div>
              </div>
            ))}
          </div>

          <h6 className="mb-4" style={{ color: "var(--text-secondary)" }}>Text &amp; Border</h6>
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
            <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
              <div style={{ height: 92, background: "#24262b" }} />
              <div className="p-4"><div className="text-[13px] font-semibold mb-0.5">Text Primary</div><div className="text-[12px]" style={{ color: "var(--text-secondary)", fontFamily: "Consolas, monospace" }}>#24262B</div></div>
            </div>
            <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
              <div style={{ height: 92, background: "#686b72" }} />
              <div className="p-4"><div className="text-[13px] font-semibold mb-0.5">Text Secondary</div><div className="text-[12px]" style={{ color: "var(--text-secondary)", fontFamily: "Consolas, monospace" }}>#686B72</div></div>
            </div>
            <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
              <div style={{ height: 92, background: "#fff", boxShadow: "inset 0 0 0 6px rgba(36,38,43,0.10)" }} />
              <div className="p-4"><div className="text-[13px] font-semibold mb-0.5">Border Subtle</div><div className="text-[12px]" style={{ color: "var(--text-secondary)", fontFamily: "Consolas, monospace" }}>rgba(36,38,43,.10)</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Typography ────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="04" title="Typography" />
          <p className="mb-10" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            Two roles, used consistently everywhere: <b>Vogue</b> for every heading level (H1–H6), <b>Heebo</b> for
            description, body copy, and buttons. Sizes below are the canonical scale — enforced as the site-wide
            default in <code>globals.css</code>, so every page shares the same H1–H6 and paragraph sizing unless a
            component deliberately overrides it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-[20px] p-8" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
              <div className="eyebrow mb-3.5">Title — H1–H6</div>
              <div style={{ fontSize: 32, marginBottom: 6 }}>Vogue</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Every heading level — falls back to Bodoni Moda, then Didot, then serif.
              </div>
              <div className="mt-5" style={{ fontSize: 22 }}>Aa Bb Cc 0123</div>
            </div>
            <div className="rounded-[20px] p-8" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
              <div className="eyebrow mb-3.5">Description / Body / Button</div>
              <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-heebo)" }}>Heebo</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                nav, buttons, labels, paragraphs — falls back to Arial Narrow / Arial.
              </div>
              <div className="mt-5" style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-heebo)" }}>Aa Bb Cc 0123</div>
            </div>
          </div>

          <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}>
            {TYPE_SCALE.map((row, i) => (
              <div key={row.tag} className="flex flex-wrap items-baseline justify-between gap-4 px-7 py-5"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border-subtle)" }}>
                <div className="flex items-baseline gap-4">
                  <span className="rounded-full flex items-center justify-center" style={{ width: 30, height: 30, fontSize: 10.5, fontWeight: 700, background: "var(--soft-highlight)", color: "var(--accent-blue)" }}>{row.tag}</span>
                  {row.tag === "H1" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 30 }}>{row.role}</span>}
                  {row.tag === "H2" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 26 }}>{row.role}</span>}
                  {row.tag === "H3" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 20, fontWeight: 700 }}>{row.role}</span>}
                  {row.tag === "H4" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 18, fontWeight: 700 }}>{row.role}</span>}
                  {row.tag === "H5" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 16, fontWeight: 600 }}>{row.role}</span>}
                  {row.tag === "H6" && <span style={{ fontFamily: "var(--font-vogue)", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{row.role}</span>}
                  {row.tag === "P" && <span style={{ fontFamily: "var(--font-heebo)", fontSize: 15 }}>{row.role}</span>}
                  {row.tag === "Btn" && <span className="btn-pill btn-pill-ghost" style={{ padding: "9px 20px" }}>{row.role}</span>}
                </div>
                <div className="text-right" style={{ fontSize: 11.5, color: "var(--text-secondary)", fontFamily: "Consolas, monospace", whiteSpace: "nowrap" }}>
                  {row.family} · {row.extra}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Buttons ───────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="05" title="Buttons" />
          <p className="mb-8" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            Pill-shaped, uppercase, Heebo, letter-spaced — the same casing, shape, and font apply everywhere a
            button appears.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="btn-pill btn-pill-primary">Primary Action</button>
            <button className="btn-pill btn-pill-ghost">Secondary Action</button>

            <a href="https://play.google.com/store/apps/details?id=com.sapphirewoods.loyalty&hl=en_IN" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full" style={{ background: "#0b0c0e", textDecoration: "none" }}>
              <svg width="18" height="20" viewBox="0 0 20 22" fill="none"><path d="M0.5 21.5L11 11L0.5 0.5C0.2 0.8 0 1.2 0 1.7V20.3C0 20.8 0.2 21.2 0.5 21.5Z" fill="#EA4335"/><path d="M0.5 0.5L11 11L15.5 6.5L2 0C1.4-0.3 0.8-0.1 0.5 0.5Z" fill="#4FC3F7"/><path d="M0.5 21.5L11 11L15.5 15.5L2 22C1.4 22.3 0.8 22.1 0.5 21.5Z" fill="#4CAF50"/><path d="M19 12.9L15.5 15.5L11 11L15.5 6.5L19 9.1C19.9 9.6 20 10.4 20 11C20 11.6 19.9 12.4 19 12.9Z" fill="#FFCA28"/></svg>
              <span><span className="block text-white" style={{ fontSize: 8.5, letterSpacing: "0.08em", opacity: 0.75 }}>GET IT ON</span><span className="text-white font-semibold" style={{ fontSize: 13.5 }}>Google Play</span></span>
            </a>

            <a href="https://apps.apple.com/us/app/srewards/id6758007860" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full" style={{ background: "#0b0c0e", textDecoration: "none" }}>
              <svg width="16" height="20" viewBox="0 0 24 24" fill="white"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.41-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.113c.83-1.012 1.39-2.42 1.234-3.821-1.196.052-2.638.796-3.494 1.807-.767.9-1.442 2.35-1.26 3.71 1.338.104 2.687-.68 3.52-1.696z"/></svg>
              <span><span className="block text-white" style={{ fontSize: 8.5, letterSpacing: "0.08em", opacity: 0.75 }}>DOWNLOAD ON THE</span><span className="text-white font-semibold" style={{ fontSize: 13.5 }}>App Store</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 06 Cards ─────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="06" title="Cards" />
          <p className="mb-8" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            24px rounded corners are the standard card radius. Elevated cards lift on hover; glass cards sit on
            top of colour or imagery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { tag: "S'Shades", grad: "linear-gradient(135deg,#85addc,#ac8cc0)" },
              { tag: "Thre3",    grad: "linear-gradient(135deg,#f39ba2,#fabf7d)" },
              { tag: "Fluted",   grad: "linear-gradient(135deg,#fabf7d,#85addc)" },
            ].map((c) => (
              <div key={c.tag} className="card-elevated" style={{ background: "#fff", border: "1px solid var(--color-border-subtle)" }}>
                <div style={{ height: 140, background: c.grad }} />
                <div className="p-5">
                  <span className="block mb-2" style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, color: "var(--accent-blue)" }}>{c.tag}</span>
                  <h3 className="mb-1.5">Product Card</h3>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>Standard elevated card — lifts 8px with a soft shadow on hover.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] p-12 flex justify-center" style={{ background: "linear-gradient(135deg,#85addc,#ac8cc0,#f39ba2)" }}>
            <div className="glass-card p-6" style={{ maxWidth: 260 }}>
              <span className="block mb-2" style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, color: "var(--accent-purple)" }}>Glass Card</span>
              <h4 className="mb-1.5">Frosted overlay</h4>
              <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>80% white, 20px blur, soft border — used over gradients and photography.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 Layout & Alignment ────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="07" title="Layout &amp; Alignment" />
          <p className="mb-8" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            Every section on the site shares the exact same <code>.site-container</code> — 1400px max width with
            the same responsive padding — so page width never drifts between sections. Two-column
            content/image layouts align to the <b>top</b>, not the middle: the text column starts level with the
            top of the image, not vertically centred against it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl p-6" style={{ border: "1.5px solid var(--accent-blue)", background: "var(--soft-highlight)" }}>
              <div className="eyebrow mb-3">Correct — items-start</div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <h4 className="mb-1.5">Heading text</h4>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Top edge lines up with the image beside it, however long the copy runs.</p>
                </div>
                <div style={{ height: 100, borderRadius: 14, background: "linear-gradient(135deg,#85addc,#ac8cc0)" }} />
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ border: "1.5px solid rgba(30,30,46,0.12)" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>Avoid — items-center</div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <h4 className="mb-1.5">Heading text</h4>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Vertically centred — drifts from the image top as copy length varies.</p>
                </div>
                <div style={{ height: 100, borderRadius: 14, background: "#d8d8dc" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 Forms ─────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="08" title="Forms" />
          <p className="mb-8" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            The same field styling is used in the inquiry popup, sample-request form, and newsletter signup:
            rounded-2xl fields, a neutral fill at rest, and an accent-pink border on focus.
          </p>

          <DemoForm />
        </div>
      </section>

      {/* ── 09 Popup ─────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        <div className="site-container">
          <SectionLabel num="09" title="Popup" />
          <p className="mb-8" style={{ maxWidth: 640, color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75 }}>
            The site&apos;s inquiry popup is a single global component, triggered from anywhere by dispatching an
            <code> open-inquiry-popup</code> window event. The button below fires the real component — not a
            recreation.
          </p>
          <PopupTrigger />
        </div>
      </section>

      <footer className="py-14 text-center" style={{ borderTop: "1px solid var(--color-border-subtle)", color: "var(--text-secondary)", fontSize: 12.5 }}>
        Sanish Laminates — internal brand reference, generated from the live design tokens in <code>globals.css</code>.
      </footer>
    </main>
  );
}
