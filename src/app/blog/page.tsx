import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { fetchBlogPosts, formatBlogDate } from "@/lib/blog";

export const metadata = {
  title: "Blog | Sanish Laminates",
  description:
    "Design trends, product guides and inspiration for decorative laminates, louvers and surface finishes from Sanish Laminates.",
};

// Revalidate the listing on the same cadence as the fetch layer.
export const revalidate = 300;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600";

// Posts shown per page before the numbered pager kicks in.
const PAGE_SIZE = 15;

// Build a compact page-number sequence with ellipsis gaps, e.g. 1 … 4 5 [6] 7 8 … 20
function buildPageList(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("gap");
    out.push(p);
    prev = p;
  }
  return out;
}

type Props = { searchParams: Promise<{ category?: string; page?: string }> };

export default async function BlogIndexPage({ searchParams }: Props) {
  const { category, page } = await searchParams;
  const all = await fetchBlogPosts();
  const filtered = category
    ? all.filter((p) => p.categories.some((c) => c.slug === category))
    : all;
  const activeCategory = category
    ? all.flatMap((p) => p.categories).find((c) => c.slug === category)?.name
    : null;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(page ?? "1", 10) || 1),
    totalPages,
  );
  const posts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const pageList = buildPageList(currentPage, totalPages);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Editorial"
        title={activeCategory ? `Blog — ${activeCategory}` : "Blog"}
        image={HERO_IMAGE}
        imageFill
        description="Design trends, product guides and inspiration for modern surfaces."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="home-section bg-[var(--bg-primary)]">
        <div className="site-container">
          {activeCategory && (
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[12px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All articles
              </Link>
            </div>
          )}
          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <h2 className="font-serif text-[clamp(24px,3vw,32px)] text-[var(--text-primary)] mb-3">
                {activeCategory ? `No articles in ${activeCategory}` : "No articles yet"}
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)]">
                Check back soon — new stories are on the way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block flex-col h-full"
                >
                  <div
                    className="relative mb-6 overflow-hidden bg-[#f3f4f6]"
                    style={{
                      height: "clamp(220px, 28vh, 300px)",
                      borderRadius: "20px",
                      boxShadow: "0 16px 40px rgba(30,30,46,0.07)",
                    }}
                  >
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[13px] text-[#9A9A9A]">
                        Sanish Laminates
                      </div>
                    )}
                    {post.categories[0] && (
                      <div
                        className="absolute top-4 left-4 px-3 py-1.5 text-white text-[9px] uppercase tracking-[0.16em] font-semibold"
                        style={{ backgroundColor: "#fabf7d", borderRadius: "999px" }}
                      >
                        {post.categories[0].name}
                      </div>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 text-[10.5px] uppercase tracking-wider mb-3"
                    style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: "#fabf7d" }}
                    />
                    <span>{formatBlogDate(post.date)}</span>
                  </div>

                  <h2
                    className="font-bold text-[18px] leading-[1.35] mb-4 transition-colors duration-300 group-hover:text-[#fabf7d]"
                    style={{ color: "#1E1E2E" }}
                  >
                    {post.title}
                  </h2>

                  <span
                    className="mt-auto inline-flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300 group-hover:text-[#fabf7d]"
                    style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
                  >
                    Read Article
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-16 flex items-center justify-center gap-2"
              aria-label="Blog pagination"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {currentPage > 1 && (
                <Link
                  href={hrefFor(currentPage - 1)}
                  rel="prev"
                  aria-label="Previous page"
                  className="inline-flex h-9 items-center justify-center rounded-full px-3 text-[12px] font-semibold text-[#6B6B80] transition-colors hover:text-[#fabf7d]"
                >
                  Prev
                </Link>
              )}

              {pageList.map((p, i) =>
                p === "gap" ? (
                  <span
                    key={`gap-${i}`}
                    className="inline-flex h-9 w-9 items-center justify-center text-[12px] text-[#9A9A9A]"
                  >
                    …
                  </span>
                ) : p === currentPage ? (
                  <span
                    key={p}
                    aria-current="page"
                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-[12px] font-bold text-white"
                    style={{ backgroundColor: "#fabf7d" }}
                  >
                    {p}
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={hrefFor(p)}
                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-[12px] font-semibold text-[#1E1E2E] transition-colors hover:bg-[#f3f4f6]"
                  >
                    {p}
                  </Link>
                ),
              )}

              {currentPage < totalPages && (
                <Link
                  href={hrefFor(currentPage + 1)}
                  rel="next"
                  aria-label="Next page"
                  className="inline-flex h-9 items-center justify-center rounded-full px-3 text-[12px] font-semibold text-[#6B6B80] transition-colors hover:text-[#fabf7d]"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
