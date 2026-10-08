/**
 * Applications photos for the new mixed-collage page (/applications-new) — every enabled photo from every
 * catalogue in one flat list, each with its SKU, catalogue and space tags. CMS-managed: Applications >
 * Spaces & Tags / Bulk tag upload (CSV). Mirrors the fetch pattern in ./gallery and ./testimonials.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

function absolutiseMedia(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  // Legacy /assets/… photos are served by the storefront itself and stay relative; CMS uploads (/media/…)
  // live on the API origin.
  return url.startsWith("/media/") ? `${API_ORIGIN}${url}` : url;
}

export interface PhotoSpace {
  slug: string;
  name: string;
}

export interface Photo {
  id: number;
  src: string;
  sku: string;
  filename: string;
  catalogue: { slug: string; name: string };
  spaces: PhotoSpace[];
  width: number | null;
  height: number | null;
}

function normalise(p: Photo): Photo {
  return { ...p, src: absolutiseMedia(p.src) };
}

export async function getPhotos(): Promise<Photo[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery/photos/`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const rows: Photo[] = await res.json();
    return rows.map(normalise);
  } catch {
    return [];
  }
}

export async function getPhoto(id: string): Promise<Photo | null> {
  if (!/^\d+$/.test(id)) return null;
  try {
    const res = await fetch(`${API_BASE}/gallery/photos/${id}/`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return normalise((await res.json()) as Photo);
  } catch {
    return null;
  }
}

export async function getSpaces(): Promise<PhotoSpace[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery/spaces/`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return (await res.json()) as PhotoSpace[];
  } catch {
    return [];
  }
}

/**
 * Mix the catalogues instead of showing them one after another: take one photo from each catalogue in turn
 * (stable — same order every render, so the page caches and doesn't reshuffle on refresh).
 */
export function interleaveByCatalogue(photos: Photo[]): Photo[] {
  const queues = new Map<string, Photo[]>();
  for (const p of photos) {
    const q = queues.get(p.catalogue.slug);
    if (q) q.push(p);
    else queues.set(p.catalogue.slug, [p]);
  }
  const lists = Array.from(queues.values());
  const out: Photo[] = [];
  const longest = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < longest; i++) {
    for (const l of lists) if (i < l.length) out.push(l[i]);
  }
  return out;
}

export function photoLabel(p: Photo): string {
  return p.sku ? `Laminate ${p.sku}` : "Application photo";
}
