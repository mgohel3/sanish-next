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
  description: string;
  copyright: string;
  newsletter_text: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
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
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_name: "Sanish Laminates",
  tagline: "Premium Decorative Surface Solutions",
  logo_dark_url: "/assets/img/logo/black-logo.svg",
  logo_light_url: "/assets/img/logo/footer-black-logo.svg",
  favicon_url: "/favicon.ico",
  phone_primary: "+91 7027 777 032",
  phone_secondary: "",
  email_primary: "info@sanishlaminate.com",
  email_secondary: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  pincode: "",
  working_hours: "Mon–Sat: 9 AM – 6 PM",
  full_address: "",
  map_embed_url: "",
  map_lat: null,
  map_lng: null,
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
    pinterest: "#",
    linkedin: "#",
    twitter: "#",
    whatsapp: "+917027777032",
  },
  header: {
    topbar_badge: "Premium Surface Manufacturing",
    cta_label: "Download Catalogue",
    cta_url: "#",
  },
  footer: {
    description:
      "Crafting elegant laminate and decorative surface solutions for architects, interior designers, commercial projects, and modern living spaces across India.",
    copyright: "© 2026 SANISH Laminates. All Rights Reserved.",
    newsletter_text:
      "Subscribe for new collections, design inspiration, and exclusive dealer offers.",
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/site-settings/`, {
      next: { revalidate: 300 }, // cache 5 min, revalidate in background
    });
    if (!res.ok) return DEFAULT_SITE_SETTINGS;
    return (await res.json()) as SiteSettings;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
