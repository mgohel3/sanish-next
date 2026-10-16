"use client";

import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

/**
 * Numbered pagination for /applications (40 photos a page). The page number lives in the URL (?page=2, next
 * to ?space=…) so a shared link opens the same page of the same filtered view; this just builds that URL.
 */
export default function CollagePager({ page, totalPages, space }: { page: number; totalPages: number; space: string }) {
  const router = useRouter();

  const go = (p: number) => {
    const qs = new URLSearchParams();
    if (space) qs.set("space", space);
    if (p > 1) qs.set("page", String(p));
    const q = qs.toString();
    router.push(q ? `/applications?${q}` : "/applications", { scroll: false });
    document.getElementById("collage-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <Pagination page={page} totalPages={totalPages} onChange={go} />;
}
