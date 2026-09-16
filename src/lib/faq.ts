/**
 * Live FAQ data from the CMS API (`/api/faqs/`). CMS-managed, seeded from
 * FAQs already written into blog posts. Mirrors the fetch pattern in
 * `./blog` — no static fallback, empty array on failure.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const REVALIDATE = 300;

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sourceSlug: string | null;
  sourceTitle: string | null;
}

interface ApiFaq {
  id: number;
  question: string;
  answer: string;
  source_slug: string | null;
  source_title: string | null;
}

function mapFaq(raw: ApiFaq): Faq {
  return {
    id: raw.id,
    question: raw.question,
    answer: raw.answer,
    sourceSlug: raw.source_slug,
    sourceTitle: raw.source_title,
  };
}

export async function fetchFaqs(): Promise<Faq[]> {
  try {
    const res = await fetch(`${API_BASE}/faqs/`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const rows: ApiFaq[] = Array.isArray(data) ? data : data.results ?? [];
    return rows.map(mapFaq);
  } catch {
    return [];
  }
}
