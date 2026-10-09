/**
 * Carpenter testimonials carousel on /rewards — CMS-managed via Dashboard >
 * Testimonials. Mirrors the fetch pattern in ./blog (own local API_BASE /
 * absolutiseMedia, no bundled static fallback — an API failure just means no
 * testimonials render, same as "no posts yet" on the blog).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

function absolutiseMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export interface CarpenterTestimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  photo: string | null;
  /** Optional payment-proof screenshot, shown on the card in place of the quote icon. */
  proof: string | null;
}

interface ApiCarpenterTestimonial {
  id: number;
  name: string;
  role?: string;
  quote: string;
  photo?: string | null;
  proof?: string | null;
}

/** CMS-managed — Dashboard > Testimonials. Active entries only, in position order. */
export async function fetchCarpenterTestimonials(): Promise<CarpenterTestimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/testimonials/carpenters/`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const rows: ApiCarpenterTestimonial[] = await res.json();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role || "",
      quote: r.quote,
      photo: absolutiseMedia(r.photo || null),
      proof: absolutiseMedia(r.proof || null),
    }));
  } catch {
    return [];
  }
}

/** CMS-managed — Dashboard > Testimonials. Active entries of one category (name or slug), in position order. */
export async function fetchTestimonialsByCategory(category: string): Promise<CarpenterTestimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/testimonials/?category=${encodeURIComponent(category)}`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const rows: ApiCarpenterTestimonial[] = await res.json();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role || "",
      quote: r.quote,
      photo: absolutiseMedia(r.photo || null),
      proof: absolutiseMedia(r.proof || null),
    }));
  } catch {
    return [];
  }
}
