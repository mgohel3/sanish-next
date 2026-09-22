"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Numbered page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 12 — never more
 * than ~7 controls wide so it doesn't wrap on mobile. */
function pageWindow(page: number, totalPages: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  const add = (p: number | "…") => pages.push(p);
  const window = 1; // neighbours shown on each side of the current page

  add(1);
  if (page - window > 2) add("…");
  for (let p = Math.max(2, page - window); p <= Math.min(totalPages - 1, page + window); p++) add(p);
  if (page + window < totalPages - 1) add("…");
  if (totalPages > 1) add(totalPages);
  return pages;
}

/** Shared numbered pagination for product listing grids — 30/page, "1 2 3 4…" style. */
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  return (
    <nav className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-14" aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:enabled:bg-black/5"
        style={{ borderColor: "rgba(30,30,46,0.12)", color: "var(--text-primary)" }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageWindow(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[13px]" style={{ color: "#9B9BB0" }}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[13px] font-semibold transition-all"
            style={
              p === page
                ? { backgroundColor: "var(--text-primary)", color: "white" }
                : { color: "var(--text-primary)" }
            }
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:enabled:bg-black/5"
        style={{ borderColor: "rgba(30,30,46,0.12)", color: "var(--text-primary)" }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
