/**
 * Programmatic "<Product> in <City>" landing pages served by the CMS
 * (`GET /api/city-pages/<slug>/`, e.g. `/api/city-pages/laminates-in-ahmedabad/`).
 *
 * These are a separate model from `SitePage` (see `lib/pages.ts`) — created in
 * bulk from `/cms/city-pages/` off a reusable `PageTemplate` with per-city
 * overrides. `getCityPage()` returns null when the slug doesn't match a
 * published city page (or the API is unreachable), so callers can fall back
 * to a 404.
 */

export interface CityPageFaq {
  q?: string;
  a?: string;
}

export interface CityPageFeature {
  title?: string;
  desc?: string;
}

export interface CityPageTestimonial {
  quote?: string;
  name?: string;
  role?: string;
  avatar?: string;
}

export interface CityPageResolved {
  slug: string;
  city: string;
  state: string;
  product_type: string;
  h1_title: string;
  hero_heading: string;
  hero_description: string;
  main_content: string;
  why_choose_us: CityPageFeature[];
  faqs: CityPageFaq[];
  testimonials: CityPageTestimonial[];
  schema_type: string;
  seo: {
    title: string;
    meta_description: string;
    meta_keywords: string;
    canonical_url: string;
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_title: string;
    twitter_description: string;
  };
}

export interface CityPageData {
  id: number;
  slug: string;
  /** Only populated by preview fetches — the public API only ever returns published pages. */
  status?: string;
  resolved_data: CityPageResolved;
  schema_json: Record<string, unknown>;
}

export interface CityPageListItem {
  slug: string;
  city: string;
  state: string;
  status: string;
}

export async function getCityPage(slug: string): Promise<CityPageData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/city-pages/${slug}/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as CityPageData;
  } catch {
    return null;
  }
}

/** CMS "Preview" — same shape as getCityPage but hits the preview-only
 * endpoint (any status, not just published), gated by a signed token minted
 * by the CMS. A bad/expired token reads as "not found". */
export async function getCityPagePreview(slug: string, token: string): Promise<CityPageData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(
      `${apiUrl}/city-pages/preview/${slug}/?token=${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as CityPageData;
  } catch {
    return null;
  }
}

/** Other published city pages, for the "also serving" internal-link strip. */
export async function getCityPageList(): Promise<CityPageListItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/city-pages/`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    // Paginated (DRF PageNumberPagination) unless the view opts out.
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}

/** Base URL of the Django dashboard (CMS), derived from the API URL — used to
 *  link an admin straight to this city page's edit form from the live site. */
export function getCmsBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  return apiUrl.replace(/\/api\/?$/, "");
}
