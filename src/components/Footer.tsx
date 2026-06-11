"use client";

import Link from "next/link";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

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
    <footer className="bg-gradient-to-b from-[#F4EDF7] to-[#EFE7F3] pt-20 border-t border-[var(--color-border-subtle)]" id="footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">

          {/* Col 1 — Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src={settings.logo_light_url} alt={settings.site_name} className="h-12 w-auto" />
            </Link>
            <div className="font-sans text-[12px] font-medium text-[var(--accent-blue)] mb-4 uppercase tracking-[0.1em]">
              {settings.tagline}
            </div>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.6] max-w-[320px]">
              {footer.description}
            </p>
            {(settings.phone_primary || settings.email_primary) && (
              <div className="mt-4 flex flex-col gap-1">
                {settings.phone_primary && (
                  <a href={`tel:${settings.phone_primary.replace(/\s/g, "")}`}
                    className="text-[13px] text-[var(--accent-blue)] hover:underline">
                    {settings.phone_primary}
                  </a>
                )}
                {settings.email_primary && (
                  <a href={`mailto:${settings.email_primary}`}
                    className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">
                    {settings.email_primary}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Col 2 — Collections */}
          <div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Collections</div>
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
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Company</div>
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
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Stay Connected</div>
            <p className="text-[13px] font-normal leading-[1.7] mb-5 text-[var(--text-secondary)]">
              {footer.newsletter_text}
            </p>
            <div className="flex mb-6">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white border border-r-0 border-[var(--color-border-subtle)] px-4 py-3 text-[12px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors" />
              <button className="bg-[#2C3E50] text-white px-5 py-3 text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-[#1a252f] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-[0.05em]">Download App</div>
            <a href="#"
              className="inline-flex items-center gap-3 px-5 py-3 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
              style={{ backgroundColor: "#000000", borderRadius: "8px", minWidth: "160px", textDecoration: "none" }}>
              {/* Google Play 4-colour icon */}
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="text-white leading-none" style={{ fontSize: "9px", letterSpacing: "0.06em", opacity: 0.8 }}>GET IT ON</div>
                <div className="text-white font-semibold leading-tight" style={{ fontSize: "15px", letterSpacing: "0.01em" }}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#E0DBE8" }} className="border-t border-black/5 py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
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
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--accent-blue)] transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
