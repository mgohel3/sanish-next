"use client";

import { useEffect, useState } from "react";
import CarpenterTestimonials from "@/components/sections/CarpenterTestimonials";
import { fetchTestimonialsByCategory, type CarpenterTestimonial } from "@/lib/testimonials";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * "Client Testimonials" carousel — usable on any page from the Pages builder.
 * The people come from Dashboard > Testimonials (one shared list: add, hide,
 * reorder there); the block only controls the heading / sub copy. PageBlocks
 * (server) passes the list in as `__testimonials` so it is server-rendered; in
 * the CMS live preview (client only) it fetches the list itself.
 */
export default function ClientTestimonialsBlock({ content = {} }: { content?: Record<string, any> }) {
  const [list, setList] = useState<CarpenterTestimonial[] | null>(content.__testimonials ?? null);

  // Server-rendered pages pass the list in; the CMS live preview (client only) fetches it,
  // and re-fetches when the editor switches category.
  useEffect(() => {
    if (content.__testimonials) return;
    fetchTestimonialsByCategory(String(content.category ?? "")).then(setList);
  }, [content.category, content.__testimonials]);

  return <CarpenterTestimonials testimonials={list || []} heading={content.heading} sub={content.sub} />;
}
