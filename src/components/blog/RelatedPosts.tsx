import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

/** "Recommended articles" grid shown at the end of a post. */
export default function RelatedPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (!posts.length) return null;

  return (
    <section
      className="home-section--compact border-t"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "rgba(30,30,46,0.07)" }}
    >
      <div className="site-container">
        <p
          className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}
        >
          Keep Reading
        </p>
        <h2 className="font-serif mb-10" style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "var(--text-primary)" }}>
          Recommended Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-[#f3f4f6]">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[12px] text-[#9A9A9A]">
                    Sanish Laminates
                  </div>
                )}
                {post.categories[0] && (
                  <span
                    className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#fabf7d" }}
                  >
                    {post.categories[0].name}
                  </span>
                )}
              </div>
              <p
                className="text-[10.5px] uppercase tracking-wider mb-2"
                style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
              >
                {formatBlogDate(post.date)}
              </p>
              <h3
                className="font-bold text-[16px] leading-[1.35] transition-colors duration-300 group-hover:text-[#fabf7d]"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
