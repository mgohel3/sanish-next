"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import BrandMonogram from "@/components/BrandMonogram";

const ICON_INSTAGRAM = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const ICON_FACEBOOK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const ICON_YOUTUBE = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const ICON_LINKEDIN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const COLLECTIONS = [
  { label: "S'Shades Premium",   href: "/collection" },
  { label: "Thre3",              href: "/collection" },
  { label: "Cool Colour",        href: "/collection" },
  { label: "Perspective V4",     href: "/collection" },
  { label: "Thermo Laminates",   href: "/collection" },
  { label: "Sanish Perspective", href: "/collection" },
  { label: "View All Collections", href: "/collection" },
];

const COMPANY = [
  { label: "About Us",       href: "/about-us" },
  { label: "Find a Dealer",  href: "/find-a-dealer" },
  { label: "Applications",   href: "/applications" },
  { label: "Rewards",        href: "/rewards" },
  { label: "Contact Us",     href: "/contact-us" },
  { label: "Blog",           href: "#" },
];

export default function FooterApple() {
  const settings = useSiteSettings();
  const { social, footer } = settings;

  const socialLinks = [
    { href: social.facebook  || "#", icon: ICON_FACEBOOK,  label: "Facebook" },
    { href: social.instagram || "#", icon: ICON_INSTAGRAM, label: "Instagram" },
    { href: social.linkedin  || "#", icon: ICON_LINKEDIN,  label: "LinkedIn" },
    { href: social.youtube   || "#", icon: ICON_YOUTUBE,   label: "YouTube" },
  ];

  return (
    <footer
      className="pt-20 border-t border-[var(--color-border-subtle)]"
      id="footer"
      style={{ background: "linear-gradient(160deg, rgba(243,155,162,0.10) 0%, rgba(172,140,192,0.12) 45%, #f3f4f6 100%)" }}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_0.85fr_1.1fr] gap-10 pb-16">

          {/* Col 1 — Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <img src={settings.logo_light_url} alt={settings.site_name} className="h-12 w-auto" />
            </Link>
            <div className="font-sans text-[12px] font-medium text-[var(--accent-blue)] mb-4 uppercase tracking-[0.1em]">
              {settings.tagline}
            </div>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.6] max-w-[320px]">
              {footer.description}
            </p>
            {(settings.phone_primary || settings.email_primary) && (
              <div className="mt-5 flex flex-col gap-3">
                {settings.phone_primary && (
                  <a href={`tel:${settings.phone_primary.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent-pink)] transition-colors">
                    <Phone className="h-4 w-4 text-[var(--accent-blue)]" aria-hidden="true" />
                    {settings.phone_primary}
                  </a>
                )}
                {settings.email_primary && (
                  <a href={`mailto:${settings.email_primary}`}
                    className="inline-flex items-center gap-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent-pink)] transition-colors">
                    <Mail className="h-4 w-4 text-[var(--accent-blue)]" aria-hidden="true" />
                    {settings.email_primary}
                  </a>
                )}
                {settings.full_address && (
                  <div className="inline-flex items-start gap-2.5 text-[13px] leading-6 text-[var(--text-secondary)]">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-blue)]" aria-hidden="true" />
                    <span>{settings.full_address}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Col 2 — Collections */}
          <div>
            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Collections</h4>
            <div className="flex flex-col gap-2">
              {COLLECTIONS.map((c) => (
                <Link key={c.label} href={c.href}
                  className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Company</h4>
            <div className="flex flex-col gap-2">
              {COMPANY.map((c) => (
                <Link key={c.href} href={c.href}
                  className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Stay Connected</h4>
            <p className="text-[13px] font-normal leading-[1.7] mb-5 text-[var(--text-secondary)]">
              {footer.newsletter_text}
            </p>
            <div className="flex mb-6 rounded-full overflow-hidden border border-[var(--color-border-subtle)] focus-within:border-[var(--accent-blue)] transition-colors">
              <input type="email" placeholder="Your email address"
                style={{ outline: "none" }}
                className="flex-1 min-w-0 bg-white px-5 py-3 text-[12px] text-[var(--text-primary)]" />
              <button
                className="text-white px-5 py-3 text-[11px] tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #F39BA2, #AC8CC0)" }}
              >
                Subscribe
              </button>
            </div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-[0.05em]">Download App</div>
            <div className="flex flex-wrap items-center gap-2">
              <a href="https://play.google.com/store/apps/details?id=com.sapphirewoods.loyalty&hl=en_IN"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
                style={{ backgroundColor: "#0b0c0e", borderRadius: "999px", textDecoration: "none" }}>
                {/* Google Play 4-colour icon */}
                <svg width="15" height="17" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* bottom-left: red */}
                  <path d="M0.5 21.5L11 11L0.5 0.5C0.2 0.8 0 1.2 0 1.7V20.3C0 20.8 0.2 21.2 0.5 21.5Z" fill="#EA4335"/>
                  {/* top: cyan/blue */}
                  <path d="M0.5 0.5L11 11L15.5 6.5L2 0C1.4-0.3 0.8-0.1 0.5 0.5Z" fill="#4FC3F7"/>
                  {/* bottom: green */}
                  <path d="M0.5 21.5L11 11L15.5 15.5L2 22C1.4 22.3 0.8 22.1 0.5 21.5Z" fill="#4CAF50"/>
                  {/* right: yellow */}
                  <path d="M19 12.9L15.5 15.5L11 11L15.5 6.5L19 9.1C19.9 9.6 20 10.4 20 11C20 11.6 19.9 12.4 19 12.9Z" fill="#FFCA28"/>
                </svg>
                <div>
                  <div className="text-white leading-none" style={{ fontSize: "7.5px", letterSpacing: "0.06em", opacity: 0.8 }}>GET IT ON</div>
                  <div className="text-white font-semibold leading-tight" style={{ fontSize: "12px", letterSpacing: "0.01em" }}>Google Play</div>
                </div>
              </a>

              <a href="https://apps.apple.com/us/app/srewards/id6758007860"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
                style={{ backgroundColor: "#0b0c0e", borderRadius: "999px", textDecoration: "none" }}>
                <svg width="13" height="17" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.41-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.113c.83-1.012 1.39-2.42 1.234-3.821-1.196.052-2.638.796-3.494 1.807-.767.9-1.442 2.35-1.26 3.71 1.338.104 2.687-.68 3.52-1.696z" />
                </svg>
                <div>
                  <div className="text-white leading-none" style={{ fontSize: "7.5px", letterSpacing: "0.06em", opacity: 0.8 }}>Download on the</div>
                  <div className="text-white font-semibold leading-tight" style={{ fontSize: "12px", letterSpacing: "0.01em" }}>App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#e5e7eb" }} className="border-t border-black/5 py-6">
        <div className="site-container flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            {footer.copyright}
          </div>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "var(--text-secondary)" }}>Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "var(--text-secondary)" }}>Terms & Conditions</Link>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}
                target={s.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-pink)] hover:text-white hover:border-[var(--accent-pink)] transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
