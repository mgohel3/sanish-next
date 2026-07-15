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
  phone_secondary: "+91 9876 543 210",
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
    facebook: "https://www.facebook.com/p/Sanish-Laminate-100053535313070/",
    youtube: "",
    pinterest: "https://in.pinterest.com/sanishlaminate2026/",
    linkedin: "https://www.linkedin.com/company/sanish-laminate",
    twitter: "",
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
