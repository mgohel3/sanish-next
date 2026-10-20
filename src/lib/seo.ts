import type { Metadata } from "next";
import type { SiteSettings } from "@/lib/siteSettings";

/** The public (live) address. Canonical URLs, share tags, schema and the sitemap always use it — staging included — so nothing
 *  ever points at a staging address. Override with NEXT_PUBLIC_SITE_URL if the domain ever changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://sanishlaminate.com").replace(/\/+$/, "");
/** One brand name for titles, share tags and schema. */
export const SITE_NAME = "Sanish Laminates";
export const MAIN_KEYWORD = "Premium Decorative Laminates Manufacturer in India";
export const DEFAULT_OG_IMAGE = "/assets/img/og-default.jpg";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith("/") ? "" : "/") + pathOrUrl;
}

/** Plain-text snippet of at most `max` characters, cut at a word boundary (for meta descriptions). */
export function snippet(text: string, max = 160): string {
  const t = (text || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 40)).replace(/[,;:–—-]+$/, "").trim() + "…";
}

/** Adds the brand once: "Title | Sanish Laminates" (skipped when the title already names the brand). */
export function withBrand(title: string): string {
  return /sanish/i.test(title) ? title : `${title} | ${SITE_NAME}`;
}

type PageMeta = { title: string; description: string; path: string; image?: string; noindex?: boolean; type?: "website" | "article" };

/** Title + description + canonical + Open Graph + Twitter card for one page. `path` is the clean URL (no query string). */
export function pageMetadata({ title, description, path, image, noindex, type = "website" }: PageMeta): Metadata {
  const img = absoluteUrl(image || DEFAULT_OG_IMAGE);
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: "en_IN", type, images: [{ url: img, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

function addressOf(s: SiteSettings) {
  return {
    "@type": "PostalAddress",
    streetAddress: [s.address_line1, s.address_line2].filter(Boolean).join(", ") || "SAPPHIRE WOODS (INDIA) LLP, Regd. Office: 203 Aggarwal Chamber, Sainik Vihar",
    addressLocality: s.city || "Pitam Pura",
    addressRegion: s.state || "Delhi",
    postalCode: s.pincode || "110034",
    addressCountry: "IN",
  };
}

function socialLinks(s: SiteSettings): string[] {
  return Object.entries(s.social || {}).filter(([k, v]) => k !== "whatsapp" && /^https?:\/\//.test(v)).map(([, v]) => v);
}

/** Organization schema (logo, phone, address, social profiles) from the CMS site settings. */
export function organizationSchema(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "Sapphire Woods (India) LLP",
    url: SITE_URL,
    logo: absoluteUrl(s.logo_dark_url || "/assets/img/logo/black-logo.svg"),
    description: "Manufacturer of premium decorative laminates and surface solutions in India.",
    sameAs: socialLinks(s),
    address: addressOf(s),
    contactPoint: [{ "@type": "ContactPoint", telephone: s.phone_primary, email: s.email_primary, contactType: "sales", areaServed: "IN", availableLanguage: ["en", "hi"] }],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/products?q={search_term_string}`, "query-input": "required name=search_term_string" },
  };
}

/** LocalBusiness schema for the contact / dealer pages. */
export function localBusinessSchema(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    url: SITE_URL,
    telephone: s.phone_primary,
    email: s.email_primary,
    address: addressOf(s),
    ...(s.map_lat && s.map_lng ? { geo: { "@type": "GeoCoordinates", latitude: Number(s.map_lat), longitude: Number(s.map_lng) } } : {}),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" }],
    sameAs: socialLinks(s),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}
