"use client";

import Link from "next/link";
import { applications, type ApplicationCategory } from "@/lib/applications";
import Button from "@/components/ui/Button";

export default function CategoryApplicationsGallery({ category }: { category: ApplicationCategory }) {
  const items = applications.filter((a) => a.category === category.label);

  return (
    <>
      {/* ── Masonry gallery ── */}
      <section className="home-section--compact bg-white">
        <div className="site-container">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/applications/${category.slug}/${item.slug}`}
                className="group relative overflow-hidden break-inside-avoid block"
                style={{ borderRadius: "16px" }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />

                {/* Post title badge — always visible, not hover-only */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5"
                    style={{
                      backgroundColor: "#fabf7d",
                      color: "#24262b",
                      borderRadius: "999px",
                      fontFamily: "var(--font-jakarta)",
                      boxShadow: "0 4px 12px rgba(250,191,125,0.45)",
                    }}>
                    {item.label}
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
                        style={{ color: category.accent, fontFamily: "var(--font-jakarta)" }}>
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

          {items.length === 0 && (
            <div className="py-24 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              No projects in this category yet.
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
            <Button href="/collection" variant="primary">
              Explore Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button href="/contact-us" variant="ghost">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
