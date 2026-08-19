"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import BrandMonogram from "@/components/BrandMonogram";
import IconButton from "@/components/ui/IconButton";
import StoreBadges from "@/components/ui/StoreBadges";

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
  { label: "Applications",   href: "/applications" },
  { label: "Rewards",        href: "/rewards" },
  { label: "Contact Us",     href: "/contact-us" },
];

export default function Footer() {
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
                className="text-white px-5 py-3 text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap"
                style={{ background: "var(--accent-blue)", fontFamily: "var(--font-heebo)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-pink)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-blue)"; }}
              >
                Subscribe
              </button>
            </div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-[0.05em]">Download App</div>
            <StoreBadges size="sm" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#e5e7eb" }} className="border-t border-black/5 py-6">
        <div className="site-container flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px]" style={{ color: "#9A9A9A" }}>
            {footer.copyright}
          </div>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "#9A9A9A" }}>Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "#9A9A9A" }}>Terms & Conditions</Link>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <IconButton key={s.label} size="sm" href={s.href} aria-label={s.label}
                target={s.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
                {s.icon}
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
