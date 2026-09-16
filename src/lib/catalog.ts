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

const CATEGORY_SLUG_TO_ROUTE: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_TO_CATEGORY_SLUG).map(([route, slug]) => [slug, route]),
);

/** e.g. "thermo-laminates" -> "asa-sheets" (the listing page route). */
export function categoryRouteForSlug(categorySlug: string): string {
  return CATEGORY_SLUG_TO_ROUTE[categorySlug] ?? categorySlug;
}

/* ── collection display name -> the `?collection=` slug the listing pages
   filter on (ProductListClient's COLLECTION_SLUG_MAP, inverted) ── */
const COLLECTION_NAME_TO_SLUG: Record<string, string> = {
  "S'Shades": "sshades",
  "Thre3": "thre3",
  "Cool Colour": "cool-colour",
  "Perspective V4": "08mm",
  "Fluted": "fluted",
};

export function collectionSlugForName(name: string): string | null {
  return COLLECTION_NAME_TO_SLUG[name] ?? null;
}

/** Listing-page URL for a product's collection, e.g. /laminates?collection=sshades.
 * Falls back to the plain category listing page if the collection has no known slug. */
export function collectionHref(p: { category?: string; collection?: string }): string {
  const route = categoryRouteForSlug(toSlug(p.category || "") || "laminates");
  const colSlug = p.collection ? collectionSlugForName(p.collection) : null;
  return colSlug ? `/${route}?collection=${colSlug}` : `/${route}`;
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
  sku?: string;
  category_name?: string;
  collection_name?: string;
  short_description?: string;
  description?: string;
  finish?: string;
  thickness?: string;
  dimensions?: string;
  surface?: string;
  product_type?: string;
  surface_category?: string;
  application?: string;
  tech_specs?: Record<string, string>;
  show_surface?: boolean;
  show_product_type?: boolean;
  show_finish?: boolean;
  show_surface_category?: boolean;
  show_thickness?: boolean;
  show_dimensions?: boolean;
  show_application?: boolean;
  show_design_type?: boolean;
  design_type?: string;
  color?: string;
  badge?: string;
  accent_color?: string;
  features?: string[];
  image_urls?: string[];
  application_image?: string;
  texture_variants?: { label: string; image: string }[];
  related_slugs?: string[];
};

function mapApiProduct(raw: ApiProduct): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    sku: raw.sku || "",
    collection: raw.collection_name || "",
    finish: raw.finish || "",
    thickness: raw.thickness || "",
    dimensions: raw.dimensions || "",
    surface: raw.surface || "",
    productType: raw.product_type || "",
    surfaceCategory: raw.surface_category || "",
    application: raw.application || "",
    techSpecs: raw.tech_specs || {},
    showSurface: raw.show_surface ?? true,
    showProductType: raw.show_product_type ?? true,
    showFinish: raw.show_finish ?? true,
    showSurfaceCategory: raw.show_surface_category ?? true,
    showThickness: raw.show_thickness ?? true,
    showDimensions: raw.show_dimensions ?? true,
    showApplication: raw.show_application ?? true,
    showDesignType: raw.show_design_type ?? true,
    badge: (raw.badge || undefined) as Product["badge"],
    accentColor: raw.accent_color || "#85addc",
    shortDescription: raw.short_description || "",
    description: raw.description || "",
    features: raw.features || [],
    images: raw.image_urls || [],
    applicationImage: raw.application_image || "",
    textureVariants: raw.texture_variants || [],
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

/* ── collection PDF catalogues (CMS-managed, per Collection) ───────────── */
export interface CollectionMeta {
  id: number;
  name: string;
  slug: string;
  pdfUrl: string;
  pdfTitle: string;
}

export async function fetchCollections(): Promise<CollectionMeta[]> {
  try {
    const res = await fetch(`${API_BASE}/collections/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Array<{
      id: number;
      name: string;
      slug: string;
      pdf_catalog?: { url: string; title?: string } | null;
    }>;
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      pdfUrl: c.pdf_catalog?.url || "",
      pdfTitle: c.pdf_catalog?.title || "",
    }));
  } catch {
    return [];
  }
}

function normalizeCollectionName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Best-effort match between a storefront collection display name (e.g. "S'Shades
 * Premium") and a CMS Collection's `name`/`slug` — names don't always line up
 * exactly, so this falls back to a loose substring match. */
export function findCollectionPdfUrl(displayName: string, collections: CollectionMeta[]): string {
  const target = normalizeCollectionName(displayName);
  const match = collections.find((c) => {
    const n = normalizeCollectionName(c.name);
    return n === target || target.includes(n) || n.includes(target);
  });
  return match?.pdfUrl || "";
}

/* ── full category list (for the /products sidebar filter) ──────────── */
export interface CategoryOption {
  name: string;
  slug: string;
}

export async function fetchCategories(): Promise<CategoryOption[]> {
  try {
    const res = await fetch(`${API_BASE}/categories/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Array<{ name: string; slug: string }>;
    if (!Array.isArray(data)) throw new Error("bad payload");
    return data.map((c) => ({ name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
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
