"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/** The Finish/Texture and Design filter lists, managed in the CMS (Products > any product > Manage options).
 *  Laminates and Thermo have separate lists, so there is no hard-coded copy to drift out of sync. */
export type FilterOptions = { texture: string[]; thermo_texture: string[]; design_type: string[]; thermo_design_type: string[] };
const EMPTY: FilterOptions = { texture: [], thermo_texture: [], design_type: [], thermo_design_type: [] };

let cache: Promise<FilterOptions> | null = null;

export function useFilterOptions(): FilterOptions {
  const [opts, setOpts] = useState<FilterOptions>(EMPTY);
  useEffect(() => {
    cache ??= fetch(`${API_BASE}/attribute-options/`).then((r) => (r.ok ? r.json() : EMPTY)).catch(() => EMPTY);
    cache.then(setOpts);
  }, []);
  return opts;
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const unionList = (a: string[], b: string[]) => [...a, ...b.filter((x) => !a.includes(x))];

// Links created before the lists came from the CMS (?finish=glossy, ?design=solid) keep working.
const ALIAS: Record<string, string> = { glossy: "gloss", matt: "matte", "high-gloss": "gloss", solid: "solid-colour" };

/** URL slug -> the list entry it names, or null. */
export const matchSlug = (slug: string | null, list: string[]) => {
  if (!slug) return null;
  const s = ALIAS[slug.toLowerCase()] ?? slugify(slug);
  return list.find((l) => slugify(l) === s) ?? null;
};
