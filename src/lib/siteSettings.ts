export interface SiteSettingsSocial {
  instagram: string;
  facebook: string;
  youtube: string;
  pinterest: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
}

export interface SiteSettingsHeader {
  topbar_badge: string;
  cta_label: string;
  cta_url: string;
}

export interface SiteSettingsFooter {
  show_newsletter?: boolean;
  show_apps?: boolean;
  show_social?: boolean;
  order?: string[];
  social_show_title?: boolean;
  social_title?: string;
  social_title_font?: string;
  social_title_color?: string;
  social_icon_size?: number;
  description: string;
  copyright: string;
  newsletter_text: string;
}

export interface SiteSettingsAnalytics {
  ga4_id: string;
  gtm_id: string;
  fb_pixel_id: string;
  clarity_id: string;
  gsc_verification: string;
}

export interface SiteSettingsRecaptcha {
  version: "off" | "v2" | "v3";
  site_key: string;
}

export interface SiteSettingsSound {
  enabled: boolean;
  url: string;
  show_button: boolean;
  size: number;
  volume: number;
  position: "left" | "right";
}

export interface SiteSettingsMobileMenu {
  style: "drawer_right" | "drawer_left" | "fullscreen";
  theme: "light" | "dark" | "brand";
  bg_color: string;
  bg_image: string;
  logo_url: string;
  show_catalogue: boolean;
  show_contact: boolean;
  show_social?: boolean;
  effect?: "plain" | "glass" | "liquid" | "image";
  overlay?: number;
  layout?: "list" | "tiles";
  motion?: "off" | "slow" | "normal" | "fast";
}

export interface SiteSettingsSiteMode {
  mode: "off" | "coming_soon" | "maintenance";
  launch_at: string;
  title: string;
  message: string;
  show_timer: boolean;
  auto_open: boolean;
  bypass_hash: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  designs_count: string;
  logo_dark_url: string;
  logo_light_url: string;
  favicon_url: string;
  phone_primary: string;
  phone_secondary: string;
  email_primary: string;
  email_secondary: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  working_hours: string;
  full_address: string;
  map_embed_url: string;
  map_lat: string | null;
  map_lng: string | null;
  social: SiteSettingsSocial;
  header: SiteSettingsHeader;
  footer: SiteSettingsFooter;
  analytics: SiteSettingsAnalytics;
  recaptcha: SiteSettingsRecaptcha;
  sound?: SiteSettingsSound;
  mobile_menu?: SiteSettingsMobileMenu;
  site_mode?: SiteSettingsSiteMode;
  applications?: { mobile_layout?: "grid2" | "grid1" | "grid1zoom" | "insta" };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_name: "Sanish Laminates",
  tagline: "Premium Decorative Surface Solutions",
  designs_count: "800+",
  logo_dark_url: "/assets/img/logo/black-logo.svg",
  logo_light_url: "/assets/img/logo/footer-black-logo.svg",
  favicon_url: "/favicon.ico",
  phone_primary: "+91 7027 777 032",
  phone_secondary: "",
  email_primary: "info@sanishlaminate.com",
  email_secondary: "sales@sanishlaminate.com",
  address_line1: "SAPPHIRE WOODS (INDIA) LLP",
  address_line2: "Regd. Office: 203 Aggarwal Chamber, Sainik Vihar",
  city: "Pitam Pura",
  state: "Delhi",
  pincode: "110034",
  working_hours: "Mon–Sat: 9 AM – 6 PM",
  full_address: "SAPPHIRE WOODS (INDIA) LLP, Regd. Office: 203 Aggarwal Chamber, Sainik Vihar, Pitam Pura, Delhi, 110034",
  map_embed_url: "",
  map_lat: "28.6895846",
  map_lng: "77.1227317",
  social: {
    instagram: "https://www.instagram.com/sanishlaminate/",
    facebook: "https://www.facebook.com/sanishlaminate/",
    youtube: "https://www.youtube.com/@SanishLaminate",
    pinterest: "",
    linkedin: "https://www.linkedin.com/company/sanish-laminate-company/",
    twitter: "",
    whatsapp: "+917027777032",
  },
  header: {
    topbar_badge: "Premium Surface Manufacturing",
    cta_label: "Download Catalogue",
    cta_url: "/collection",
  },
  footer: {
    description:
      "Crafting elegant laminate and decorative surface solutions for architects, interior designers, commercial projects, and modern living spaces across India.",
    copyright: "© 2026 SANISH Laminates. All Rights Reserved.",
    newsletter_text:
      "Subscribe for new collections, design inspiration, and exclusive dealer offers.",
  },
  analytics: {
    ga4_id: "",
    gtm_id: "",
    fb_pixel_id: "",
    clarity_id: "",
    gsc_verification: "",
  },
  recaptcha: {
    version: "off",
    site_key: "",
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/site-settings/`, {
      next: { revalidate: 300 }, // cache 5 min, revalidate in background
    });
    if (!res.ok) return DEFAULT_SITE_SETTINGS;
    const fetched = (await res.json()) as SiteSettings;
    // The DB row can exist with social links left blank (not yet filled in
    // via the dashboard) — fall back to defaults per-platform rather than
    // showing dead "#" links.
    const social = { ...DEFAULT_SITE_SETTINGS.social };
    for (const key of Object.keys(social) as (keyof SiteSettingsSocial)[]) {
      if (fetched.social?.[key]) social[key] = fetched.social[key];
    }
    const analytics = { ...DEFAULT_SITE_SETTINGS.analytics, ...fetched.analytics };
    const recaptcha = { ...DEFAULT_SITE_SETTINGS.recaptcha, ...fetched.recaptcha };
    return { ...fetched, social, analytics, recaptcha };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}


/** Accepts what editors usually paste from Google Maps: either the bare embed link or the whole <iframe ...> snippet. */
export function mapEmbedSrc(value: string | null | undefined): string {
  const v = (value || "").trim();
  if (!v) return "";
  const m = v.match(/src\s*=\s*["']([^"']+)["']/i);
  return (m ? m[1] : v).replace(/&amp;/g, "&");
}

/** Address as shown on the website, one line per row: street lines, then "City, State - Pincode". */
export function addressLines(s: SiteSettings): string[] {
  const place = [s.city, s.state].filter((x, i, a) => x && a.indexOf(x) === i).join(", ");
  const last = [place, s.pincode].filter(Boolean).join(" - ");
  return [s.address_line1, s.address_line2, last].filter(Boolean);
}
