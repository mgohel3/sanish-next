/**
 * Home-page block data served by the CMS (`GET /api/homepage/`).
 *
 * The endpoint returns the enabled sections in display order, each with its
 * `content` already merged over the block type's defaults on the server. When
 * the API is unreachable `getHomeSections()` returns `null` and the page falls
 * back to its hard-coded static layout — mirrors `src/lib/siteSettings.ts`.
 */

export type HomeBlockType =
  | "hero"
  | "about"
  | "horizontal_showcase"
  | "special_edition"
  | "why_us"
  | "applications"
  | "rewards"
  | "cta"
  | "blog_teaser"
  | "rich_text"
  | "image_text"
  | "cta_banner";

export interface HeroSlideContent {
  image?: string;
  mobile_image?: string;
  tag?: string;
  line1?: string;
  line2?: string;
  sub?: string;
  cta_label?: string;
  cta_url?: string;
  image_only?: boolean;
}

export interface HeroContent {
  slides?: HeroSlideContent[];
}

export interface AboutContent {
  heading?: string;
  body?: string; // HTML
  cta_label?: string;
  cta_url?: string;
  media_url?: string;
}

export interface ShowcaseCollection {
  name?: string;
  sub?: string;
  category?: string;
  image?: string;
}
export interface HorizontalShowcaseContent {
  heading?: string;
  filters?: { label?: string }[];
  collections?: ShowcaseCollection[];
}

export interface SpecialEditionContent {
  heading?: string;
  body?: string;
  tags?: { label?: string }[];
  cta_label?: string;
  cta_url?: string;
  image?: string;
  image_kicker?: string;
  image_title?: string;
}

export interface WhyUsCard {
  title?: string;
  desc?: string;
  icon?: string;
}
export interface WhyUsContent {
  heading?: string;
  cards?: WhyUsCard[];
}

export interface HeadingLinkContent {
  heading?: string;
  cta_label?: string;
  cta_url?: string;
}

export interface RewardPerk {
  label?: string;
  desc?: string;
  icon?: string;
}
export interface RewardsContent {
  heading?: string;
  body?: string;
  cta_label?: string;
  cta_url?: string;
  perks?: RewardPerk[];
}

export interface CtaContent {
  heading?: string;
  body?: string;
  bg_image?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

export interface RichTextContent {
  heading?: string;
  body?: string; // HTML
  align?: "left" | "center";
}

export interface ImageTextContent {
  heading?: string;
  body?: string; // HTML
  image?: string;
  image_side?: "left" | "right";
  cta_label?: string;
  cta_url?: string;
}

export interface CtaBannerContent {
  heading?: string;
  sub?: string;
  bg_image?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

export type HomeBlockContent =
  | HeroContent
  | AboutContent
  | HorizontalShowcaseContent
  | SpecialEditionContent
  | WhyUsContent
  | HeadingLinkContent
  | RewardsContent
  | CtaContent
  | RichTextContent
  | ImageTextContent
  | CtaBannerContent
  | Record<string, unknown>;

export interface HomeSectionData {
  block_type: HomeBlockType;
  anchor_id: string;
  content: HomeBlockContent;
}

export async function getHomeSections(): Promise<HomeSectionData[] | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/homepage/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { sections?: HomeSectionData[] };
    if (!data.sections || data.sections.length === 0) return null;
    return data.sections;
  } catch {
    return null;
  }
}
