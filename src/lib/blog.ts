/**
 * Live blog data from the CMS API (`/api/blog/`, `/api/blog/<slug>/`).
 *
 * The blog has no bundled static fallback (unlike `./catalog`), so on any API
 * failure the fetchers return an empty list / null and the pages render an
 * "no posts yet" state. Mirrors the fetch pattern in `./catalog`.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
// Origin of the Django server (API_BASE without the trailing "/api") — media
// assets come back as root-relative paths like "/media/…" and must be resolved
// against the backend, not the Next.js host.
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");
const REVALIDATE = 300;

/** Absolutise a backend-relative "/media/…" URL; pass through anything else. */
function absolutiseMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export interface BlogImage {
  url: string;
  alt_text?: string;
  width?: number;
  height?: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export type BlogLayout = "sidebar" | "full";

export interface BlogAuthor {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  categories: BlogCategory[];
  date: string; // ISO — published_at ?? created
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost extends BlogPostSummary {
  layout: BlogLayout;
  content: string; // CKEditor HTML
  tags: BlogTag[];
  author: BlogAuthor | null;
  showAuthor: boolean;
  showShare: boolean;
  showRelated: boolean;
  seoTitle: string;
  metaDescription: string;
  metaKeywords: string;
  updated: string;
  faqs: BlogFaq[];
  autoFaqSchema: boolean;
}

/* ── API shapes ──────────────────────────────────────────── */
type ApiImage = { url?: string; original_url?: string; alt_text?: string; width?: number; height?: number } | null;

interface ApiPostList {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  image: string | null;
  featured_image: ApiImage;
  categories: BlogCategory[];
  status: string;
  published_at: string | null;
  created: string;
}

interface ApiPostDetail extends ApiPostList {
  layout: BlogLayout;
  content: string;
  tags: BlogTag[];
  author: BlogAuthor | null;
  show_author?: boolean;
  show_share?: boolean;
  show_related?: boolean;
  seo_title: string;
  meta_description: string;
  meta_keywords: string;
  updated: string;
  faqs?: { question: string; answer: string }[];
  auto_faq_schema?: boolean;
}

/* ── mapping ─────────────────────────────────────────────── */
function imgUrl(raw: ApiPostList): string | null {
  return absolutiseMedia(
    raw.image || raw.featured_image?.url || raw.featured_image?.original_url || null,
  );
}

function mapSummary(raw: ApiPostList): BlogPostSummary {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt || "",
    image: imgUrl(raw),
    imageAlt: raw.featured_image?.alt_text || raw.title,
    categories: raw.categories || [],
    date: raw.published_at || raw.created,
  };
}

function mapDetail(raw: ApiPostDetail): BlogPost {
  return {
    ...mapSummary(raw),
    layout: raw.layout === "full" ? "full" : "sidebar",
    content: raw.content || "",
    tags: raw.tags || [],
    author: raw.author
      ? { ...raw.author, avatar: absolutiseMedia(raw.author.avatar) }
      : null,
    showAuthor: raw.show_author !== false,
    showShare: raw.show_share !== false,
    showRelated: raw.show_related !== false,
    seoTitle: raw.seo_title || "",
    metaDescription: raw.meta_description || "",
    metaKeywords: raw.meta_keywords || "",
    updated: raw.updated,
    faqs: raw.faqs || [],
    autoFaqSchema: raw.auto_faq_schema || false,
  };
}

/* ── fetchers ────────────────────────────────────────────── */
export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/blog/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    // Blog list uses DRF pagination -> { count, results: [...] }
    const rows: ApiPostList[] = Array.isArray(data) ? data : data.results ?? [];
    return rows.map(mapSummary);
  } catch {
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}/`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(String(res.status));
    return mapDetail((await res.json()) as ApiPostDetail);
  } catch {
    return null;
  }
}

/**
 * Recommended articles for the end of a post: same-category posts first
 * (most recent), then topped up with other recent posts. Current post excluded.
 */
export function pickRelatedPosts(
  all: BlogPostSummary[],
  current: { slug: string; categories: BlogCategory[] },
  limit = 3,
): BlogPostSummary[] {
  const pool = all.filter((p) => p.slug !== current.slug);
  const catSlugs = new Set(current.categories.map((c) => c.slug));
  const sameCat = pool.filter((p) => p.categories.some((c) => catSlugs.has(c.slug)));
  const rest = pool.filter((p) => !sameCat.includes(p));
  return [...sameCat, ...rest].slice(0, limit);
}

/* ── helpers ─────────────────────────────────────────────── */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
