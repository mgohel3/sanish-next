"use client";

import { useState } from "react";
import Link from "next/link";
import { applications } from "@/lib/applications";

const FILTERS = ["All", "Kitchens", "Commercial", "Retail", "Residential"];

const ACCENT: Record<string, string> = {
  Kitchens:    "#f39ba2",
  Commercial:  "#85addc",
  Retail:      "#fabf7d",
  Residential: "#ac8cc0",
};

export default function ApplicationsGallery() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? applications : applications.filter((i) => i.category === active);

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Filter applications
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActive(f)}
                  className="filter-control text-[12px] font-semibold px-5 py-2.5 transition-all duration-200"
                  aria-pressed={active === f}
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    borderRadius: "999px",
                    border: `1.5px solid ${active === f ? (ACCENT[f] ?? "var(--accent-purple)") : "rgba(30,30,46,0.12)"}`,
                    backgroundColor: active === f ? (ACCENT[f] ?? "var(--accent-purple)") : "transparent",
                    color: active === f ? "white" : "var(--text-secondary)",
                  }}>
                  {f}
                  {active === f && f !== "All" && (
                    <span className="ml-2 text-[10px] opacity-70">
                      ({applications.filter((i) => i.category === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Masonry gallery ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item) => (
              <Link
                key={item.slug + active}
                href={`/applications/${item.slug}`}
                className="group relative overflow-hidden break-inside-avoid block"
                style={{ borderRadius: "16px" }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />

                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5"
                    style={{
                      backgroundColor: `${ACCENT[item.category] ?? "#fabf7d"}22`,
                      color: "#24262b",
                      borderRadius: "999px",
                      border: `1px solid ${ACCENT[item.category] ?? "#fabf7d"}66`,
                      fontFamily: "var(--font-jakarta)",
                      backdropFilter: "blur(8px)",
                    }}>
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(10,8,18,0.88) 0%, rgba(10,8,18,0.15) 60%)" }}>
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white text-[17px] font-bold mb-1"
                      style={{ fontFamily: "var(--font-jakarta)" }}>
                      {item.label}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[12px]"
                        style={{ color: ACCENT[item.category] ?? "#85addc", fontFamily: "var(--font-jakarta)" }}>
                        {item.finish}
                      </div>
                      <span className="text-[11px] font-semibold text-white/70 flex items-center gap-1"
                        style={{ fontFamily: "var(--font-jakarta)" }}>
                        View Case Study
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              No items in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="home-section--compact border-t border-[var(--color-border-subtle)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] text-[var(--text-primary)] mb-2">
              Ready to create your space?
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Explore 500+ premium surface designs or speak with our design consultants.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/laminates"
              className="flex items-center gap-2 text-white text-[12px] font-semibold px-7 py-3.5 transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--accent-blue)", borderRadius: "999px", fontFamily: "var(--font-jakarta)", letterSpacing: "0.06em" }}>
              Explore Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/contact-us"
              className="flex items-center gap-2 text-[12px] font-semibold px-7 py-3.5 border transition-all hover:-translate-y-0.5"
              style={{ color: "var(--accent-blue)", borderColor: "var(--accent-blue)", borderRadius: "999px", fontFamily: "var(--font-jakarta)", letterSpacing: "0.06em" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
