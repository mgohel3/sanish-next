"use client";

import { useMemo, useState } from "react";
import type { Faq } from "@/lib/faq";

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

export default function FaqGrid({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        stripTags(f.answer).toLowerCase().includes(q),
    );
  }, [faqs, query]);

  return (
    <div>
      {/* Search */}
      <div className="max-w-[520px] mx-auto mb-4">
        <div
          className="flex items-center gap-3 rounded-full px-5 py-3.5 transition-colors duration-200 focus-within:bg-white"
          style={{ background: "#F1F2F4", border: "1.5px solid transparent" }}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "var(--text-secondary)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a question…"
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ background: "var(--color-border-subtle)" }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <p
        className="text-center text-[12.5px] mb-10"
        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}
      >
        {filtered.length === faqs.length
          ? `${faqs.length} questions answered`
          : `${filtered.length} of ${faqs.length} questions match “${query}”`}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <h3 className="font-serif text-[22px] text-[var(--text-primary)] mb-2">
            No matches
          </h3>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Try a different word, or{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="underline underline-offset-2"
              style={{ color: "var(--accent-blue)" }}
            >
              browse all questions
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="faq-columns">
          {filtered.map((f, i) => (
            <details key={f.id} className="faq-card group">
              <summary className="faq-card__question">
                <span className="faq-card__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-card__text">{f.question}</span>
                <svg
                  className="faq-card__chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="faq-card__body">
                <div
                  className="faq-card__answer"
                  dangerouslySetInnerHTML={{ __html: f.answer }}
                />
                {f.sourceSlug && (
                  <a href={`/blog/${f.sourceSlug}`} className="faq-card__source">
                    Read more in “{f.sourceTitle}”
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
