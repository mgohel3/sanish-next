/**
 * Generic inner-page block data served by the CMS (`GET /api/pages/<slug>/`).
 *
 * Mirrors `src/lib/homepage.ts`: the endpoint returns the enabled sections in
 * display order with `content` already merged over the block type's defaults.
 * When the API is unreachable (or the page has no CMS sections yet)
 * `getSitePage()` returns `null` and the page falls back to its hard-coded
 * static layout.
 */

export type PageBlockType =
  | "page_hero"
  | "content_section"
  | "feature_cards"
  | "contact_details"
  | "faq"
  | "rich_text"
  | "image_text"
  | "cta_banner"
  | "testimonials"
  | "gallery"
  | "team"
  | "pricing"
  | "stats"
  | "logos_strip"
  | "video_embed";

export interface PageHeroContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  image_fill?: boolean;
}

export interface ContentSectionContent {
  eyebrow?: string;
  heading?: string;
  body?: string; // HTML
  image?: string;
  image_side?: "left" | "right" | "none";
}

export interface FeatureCard {
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  accent?: string;
}
export interface FeatureCardsContent {
  heading?: string;
  sub?: string;
  columns?: "2" | "3" | "4";
  cards?: FeatureCard[];
}

export interface ContactPhone {
  label?: string;
  value?: string;
}
export interface ContactEmail {
  value?: string;
}
export interface ContactDetailsContent {
  heading?: string;
  address?: string;
  phones?: ContactPhone[];
  emails?: ContactEmail[];
  map_embed_url?: string;
  form_heading?: string;
  form_sub?: string;
  /** Optional CMS Forms slug — when set, renders that dynamic form instead of the built-in enquiry form. */
  form_slug?: string;
}

export interface FaqItem {
  q?: string;
  a?: string;
}
export interface FaqContent {
  heading?: string;
  items?: FaqItem[];
}

export type PageBlockContent =
  | PageHeroContent
  | ContentSectionContent
  | FeatureCardsContent
  | ContactDetailsContent
  | FaqContent
  | Record<string, unknown>;

export interface PageSectionData {
  block_type: PageBlockType;
  anchor_id: string;
  content: PageBlockContent;
}

export interface SitePageData {
  slug: string;
  title: string;
  path: string;
  sections: PageSectionData[];
}

/**
 * Returns null only when the page truly doesn't exist (or the API is
 * unreachable) — NOT when it exists with zero sections (a freshly-created
 * "Blank Page" template, say). Callers that need a hard-coded fallback for a
 * specific slug (About Us, Contact Us) should check `sections.length` on the
 * result themselves; the generic `[slug]/page.tsx` route renders whatever
 * comes back, including an empty page.
 */
export async function getSitePage(slug: string): Promise<SitePageData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/pages/${slug}/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SitePageData;
    return { ...data, sections: data.sections || [] };
  } catch {
    return null;
  }
}
