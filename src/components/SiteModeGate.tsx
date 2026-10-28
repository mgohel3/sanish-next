"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

/* Coming soon / maintenance cover, switched from CMS > Site Mode. It sits over the whole site; a visitor with the private
   preview link (/?preview=KEY) is remembered on that device and sees the real website. */

const BLOBS = [
  { cls: "mm-b1", color: "#85ADDC", size: "52vmax", dur: 16 },
  { cls: "mm-b2", color: "#AC8CC0", size: "50vmax", dur: 19 },
  { cls: "mm-b3", color: "#F4A0A8", size: "46vmax", dur: 21 },
  { cls: "mm-b4", color: "#FABF7D", size: "42vmax", dur: 17 },
];

const sha256 = async (t: string) =>
  Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t))))
    .map((b) => b.toString(16).padStart(2, "0")).join("");

export default function SiteModeGate() {
  const settings = useSiteSettings();
  const sm = settings.site_mode;
  const pathname = usePathname();
  const [bypass, setBypass] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const active = !!sm && sm.mode !== "off" && !pathname.startsWith("/cms-preview");
  const target = sm?.launch_at ? Date.parse(`${sm.launch_at}:00+05:30`) : NaN;
  const hasTarget = Number.isFinite(target);
  const over = now !== null && hasTarget && now >= target;
  const hidden = !active || bypass || (sm?.mode === "coming_soon" && sm.auto_open && over);

  useEffect(() => {
    if (!active || !sm) return;
    (async () => {
      try {
        const key = new URLSearchParams(window.location.search).get("preview");
        if (key && (await sha256(key)) === sm.bypass_hash) localStorage.setItem("sanish-preview", sm.bypass_hash);
        if (localStorage.getItem("sanish-preview") === sm.bypass_hash) setBypass(true);
      } catch { /* private mode: the cover just stays */ }
    })();
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active, sm]);

  useEffect(() => {
    if (hidden) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [hidden]);

  if (hidden || !sm) return null;

  const soon = sm.mode === "coming_soon";
  const title = sm.title || (soon ? "Something beautiful is on its way" : "We'll be right back");
  const message = sm.message || (soon
    ? "Our new website is almost ready. Premium laminates, thoughtfully designed - coming very soon."
    : "We're making a few improvements to give you a better experience. Thank you for your patience.");
  const diff = hasTarget && now !== null ? Math.max(0, target - now) : 0;
  const parts = [
    { v: Math.floor(diff / 86400000), l: "Days" },
    { v: Math.floor(diff / 3600000) % 24, l: "Hours" },
    { v: Math.floor(diff / 60000) % 60, l: "Minutes" },
    { v: Math.floor(diff / 1000) % 60, l: "Seconds" },
  ];
  const d = (n: number) => ({ "--d": `${n}ms` }) as CSSProperties;
  const wa = (settings.social.whatsapp || "").replace(/\D/g, "");

  return (
    <div className="fixed inset-0 z-[3000] overflow-y-auto" style={{ background: "#f7f4fb", color: "#1E1E2E" }} role="dialog" aria-label={title}>
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none">
        {BLOBS.map((b) => (
          <span key={b.cls} className={`mm-blob ${b.cls}`} style={{ background: b.color, width: b.size, height: b.size, opacity: 0.8, animationDuration: `${b.dur}s` }} />
        ))}
        <span className="absolute inset-0" style={{ background: "rgba(255,255,255,0.25)" }} />
      </div>

      <div className="relative min-h-full flex items-center justify-center px-4 py-10">
        <div className="mm-item w-full max-w-[720px] text-center rounded-[32px] p-7 sm:p-12"
          style={{ ...d(60), background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.75)", backdropFilter: "blur(28px) saturate(1.4)", WebkitBackdropFilter: "blur(28px) saturate(1.4)", boxShadow: "0 30px 80px rgba(80,60,120,0.18)" }}>
          {settings.logo_dark_url && <img src={settings.logo_dark_url} alt={settings.site_name} className="mm-item h-9 sm:h-10 w-auto mx-auto mb-6" style={d(160)} />}

          <div className="mm-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-5" style={{ ...d(240), background: "#AC8CC0" }}>
            {soon ? "Coming soon" : (
              <>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6 2.6-2.2z" /></svg>
                Under maintenance
              </>
            )}
          </div>

          <h1 className="mm-item text-[30px] sm:text-[46px] leading-[1.1] mb-4" style={{ ...d(320), fontFamily: "var(--font-vogue)", fontWeight: 500 }}>{title}</h1>
          <p className="mm-item text-[14.5px] sm:text-[16px] leading-relaxed max-w-[520px] mx-auto" style={{ ...d(400), color: "#5b5b70" }}>{message}</p>

          {sm.show_timer && hasTarget && (
            <div className="mm-item mt-8" style={d(480)}>
              {!soon && <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#5b5b70" }}>Expected back in</p>}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-[480px] mx-auto">
                {parts.map((p) => (
                  <div key={p.l} className="rounded-2xl py-3 sm:py-4" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)" }}>
                    <div className="text-[26px] sm:text-[38px] font-semibold leading-none tabular-nums" style={{ fontFamily: "var(--font-vogue)" }}>{String(p.v).padStart(2, "0")}</div>
                    <div className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] mt-1.5" style={{ color: "#5b5b70" }}>{p.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mm-item mt-8 flex flex-wrap items-center justify-center gap-2.5" style={d(560)}>
            {settings.phone_primary && (
              <a href={`tel:${settings.phone_primary.replace(/\s/g, "")}`} className="px-4 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.9)" }}>{settings.phone_primary}</a>
            )}
            {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full text-[13px] font-semibold text-white" style={{ background: "#AC8CC0" }}>WhatsApp us</a>}
            {settings.email_primary && (
              <a href={`mailto:${settings.email_primary}`} className="px-4 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.9)" }}>{settings.email_primary}</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
