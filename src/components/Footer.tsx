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
const ICON_PINTEREST = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.992 3.992-.285 1.193.597 2.164 1.777 2.164 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.289 1.198c-.046.19-.153.232-.349.141-1.3-.604-2.115-2.502-2.115-4.032 0-3.284 2.388-6.302 6.892-6.302 3.636 0 6.466 2.593 6.466 6.059 0 3.615-2.279 6.526-5.441 6.526-1.062 0-2.061-.552-2.403-1.205l-.653 2.491c-.236.902-.876 2.031-1.306 2.719A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);
const ICON_YOUTUBE = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const COLLECTIONS = [
  { label: "S'Shades Premium",   href: "/products?collection=sshades" },
  { label: "Thre3",              href: "/products?collection=thre3" },
  { label: "Cool Colour",        href: "/products?collection=cool-colour" },
  { label: "0.8mm Series",       href: "/products?collection=08mm" },
  { label: "Fluted",             href: "/products?collection=fluted" },
  { label: "Sanish Perspective", href: "/products?collection=perspective" },
  { label: "View All Products",  href: "/products" },
];

const COMPANY = [
  { label: "About Us",       href: "/about-us" },
  { label: "Find a Dealer",  href: "/find-a-dealer" },
  { label: "Applications",   href: "/applications" },
  { label: "Rewards",        href: "/rewards" },
  { label: "Contact Us",     href: "/contact-us" },
  { label: "Blog",           href: "#" },
];

export default function Footer() {
  const settings = useSiteSettings();
  const { social, footer } = settings;

  const socialLinks = [
    { href: social.instagram || "#", icon: ICON_INSTAGRAM, label: "Instagram" },
    { href: social.facebook  || "#", icon: ICON_FACEBOOK,  label: "Facebook" },
    { href: social.pinterest || "#", icon: ICON_PINTEREST, label: "Pinterest" },
    { href: social.youtube   || "#", icon: ICON_YOUTUBE,   label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-[#f3f4f6] pt-20 border-t border-[var(--color-border-subtle)]" id="footer">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">

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
                    className="inline-flex items-center gap-2.5 text-[13px] text-[var(--accent-blue)] hover:text-[var(--accent-pink)]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
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
                <Link key={c.href} href={c.href}
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
            <div className="flex mb-6">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white border border-r-0 border-[var(--color-border-subtle)] px-4 py-3 text-[12px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors" />
              <button className="bg-[var(--accent-blue)] text-white px-5 py-3 text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-[var(--accent-pink)] transition-colors whitespace-nowrap">
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
          <div className="text-[13px]" style={{ color: "#9A9A9A" }}>
            {footer.copyright}
          </div>
          <div className="flex gap-5">
            <Link href="#" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "#9A9A9A" }}>Privacy Policy</Link>
            <Link href="#" className="text-[13px] hover:text-[var(--accent-blue)] transition-colors" style={{ color: "#9A9A9A" }}>Terms & Conditions</Link>
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
