/**
 * Live catalogue data from the CMS API (`/api/products/`, `/api/categories/`).
 *
 * Falls back to the bundled static data in `./products` whenever the API is
 * unreachable or returns nothing, so pages still render during local dev or an
 * outage. Mirrors the fetch/fallback pattern in `./siteSettings`.
 */
import {
  products as FALLBACK_PRODUCTS,
  type Product,
  type ProductCategory,
  type DesignType,
  type ProductColor,
} from "./products";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const REVALIDATE = 300;

export interface CategoryMeta {
  name: string;
  slug: string;
  eyebrow: string;
  image: string;
  description: string;
}

/* ── route -> API category slug ──────────────────────────── */
// The storefront routes (/laminates, /louvers, /asa-sheets) and the CMS
// category slugs don't always line up 1:1 — map the route to the API slug here.
const ROUTE_TO_CATEGORY_SLUG: Record<string, string> = {
  laminates: "laminates",
  louvers: "louvers",
  "asa-sheets": "thermo-laminates",
};

export function categorySlugForRoute(routeKey: string): string {
  return ROUTE_TO_CATEGORY_SLUG[routeKey] ?? routeKey;
}

/* ── product URL: /products/<category>/<collection>/<slug> ── */
// Mirrors Django's slugify for the names we use (spaces/underscores → "-").
export function toSlug(value: string): string {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function productHref(p: {
  slug: string;
  category?: string;
  collection?: string;
}): string {
  const cat = toSlug(p.category || "") || "laminates";
  const col = toSlug(p.collection || "") || "none";
  return `/products/${cat}/${col}/${p.slug}`;
}

/* ── mapping ─────────────────────────────────────────────── */
type ApiProduct = {
  id: number;
  slug: string;
  name: string;
  category_name?: string;
  collection_name?: string;
  short_description?: string;
  description?: string;
  finish?: string;
  thickness?: string;
  dimensions?: string;
  surface?: string;
  application?: string;
  design_type?: string;
  color?: string;
  badge?: string;
  accent_color?: string;
  features?: string[];
  image_urls?: string[];
  related_slugs?: string[];
};

function mapApiProduct(raw: ApiProduct): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    collection: raw.collection_name || "",
    finish: raw.finish || "",
    thickness: raw.thickness || "",
    dimensions: raw.dimensions || "",
    surface: raw.surface || "",
    application: raw.application || "",
    badge: (raw.badge || undefined) as Product["badge"],
    accentColor: raw.accent_color || "#85addc",
    shortDescription: raw.short_description || "",
    description: raw.description || "",
    features: raw.features || [],
    images: raw.image_urls || [],
    relatedSlugs: raw.related_slugs || [],
    category: (raw.category_name || "Laminates") as ProductCategory,
    designType: (raw.design_type || "Solid") as DesignType,
    color: (raw.color || "White") as ProductColor,
  };
}

/* ── fetchers ────────────────────────────────────────────── */
export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const qs = categorySlug ? `?category=${encodeURIComponent(categorySlug)}` : "";
    const res = await fetch(`${API_BASE}/products/${qs}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as ApiProduct[];
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
    return data.map(mapApiProduct);
  } catch {
    if (!categorySlug) return FALLBACK_PRODUCTS;
    // fall back to filtering the bundled set by display name
    return FALLBACK_PRODUCTS.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug,
    );
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    return mapApiProduct((await res.json()) as ApiProduct);
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  }
}

export async function fetchRelatedProducts(slugs: string[]): Promise<Product[]> {
  if (!slugs.length) return [];
  const all = await fetchProducts();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

export async function fetchCategoryMeta(slug: string): Promise<CategoryMeta | null> {
  try {
    const res = await fetch(`${API_BASE}/categories/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Array<{
      name: string; slug: string; hero_eyebrow?: string; hero_image?: string; description?: string;
    }>;
    const match = data.find((c) => c.slug === slug);
    if (!match) return null;
    return {
      name: match.name,
      slug: match.slug,
      eyebrow: match.hero_eyebrow || "",
      image: match.hero_image || "",
      description: match.description || "",
    };
  } catch {
    return null;
  }
}
