"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, getApplicationsByCategory } from "@/lib/applications";

// CSS columns fill top-to-bottom, column by column, in DOM order — so the
// tallest tile (Commercial's portrait image) is placed last, pushing it
// into the rightmost column instead of the first (leftmost) one.
const DISPLAY_ORDER = ["Kitchens", "Retail", "Residential", "Hospitality", "Commercial"];

export default function ApplicationsCategories() {
  const [active, setActive] = useState("All");

  const tiles = active === "All"
    ? [...CATEGORIES].sort((a, b) => DISPLAY_ORDER.indexOf(a.label) - DISPLAY_ORDER.indexOf(b.label))
    : CATEGORIES.filter((c) => c.label === active);

  return (
    <>
      {/* ── Filter bar — data-driven off CATEGORIES, so it scales as more get added ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Filter applications
            </p>
            <div className="flex flex-wrap gap-2">
              {["All", ...CATEGORIES.map((c) => c.label)].map((label) => {
                const category = CATEGORIES.find((c) => c.label === label);
                const accent = category?.accent ?? "var(--accent-purple)";
                const isActive = active === label;
                return (
                  <button key={label} onClick={() => setActive(label)}
                    className="filter-control text-[12px] font-semibold px-5 py-2.5 transition-all duration-200"
                    aria-pressed={isActive}
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      borderRadius: "999px",
                      border: `1.5px solid ${isActive ? accent : "rgba(30,30,46,0.12)"}`,
                      backgroundColor: isActive ? accent : "transparent",
                      color: isActive ? "white" : "var(--text-secondary)",
                    }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Category tile grid ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 ${tiles.length >= 8 ? "xl:columns-4" : ""}`}>
            {tiles.map((category) => {
              const count = getApplicationsByCategory(category.label).length;
              return (
                <Link
                  key={category.slug}
                  href={`/applications/${category.slug}`}
                  className="group relative overflow-hidden rounded-[20px] block break-inside-avoid"
                >
                  <img src={category.image} alt={category.label} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />

                  {/* Permanent category badge — always visible, not hover-only */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5"
                      style={{
                        backgroundColor: "#fabf7d",
                        color: "#24262b",
                        borderRadius: "999px",
                        fontFamily: "var(--font-jakarta)",
                        boxShadow: "0 4px 12px rgba(250,191,125,0.45)",
                      }}>
                      {category.label} · {count}
                    </span>
                  </div>

                  {/* Gradient + label always visible at the bottom */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(10,8,18,0.75) 0%, rgba(10,8,18,0.05) 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white font-serif text-xl tracking-wide">{category.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {tiles.length === 0 && (
            <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              No categories match this filter yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
