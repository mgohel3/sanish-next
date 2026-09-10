import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import ShareButtons from "./ShareButtons";

/**
 * WordPress-style right rail for the article layout: author card, share links,
 * categories, tags and publish date. Rendered only when
 * `post.layout === "sidebar"`. Individual blocks are toggled from the CMS.
 */
export default function BlogSidebar({ post }: { post: BlogPost }) {
  const { author, categories, tags } = post;

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "var(--font-jakarta)" }}>
      {/* Author */}
      {post.showAuthor && author && (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--color-border-subtle)" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "#6B6B80" }}>
            Written by
          </p>
          <div className="flex items-center gap-3">
            <span
              className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-[15px] font-bold text-white"
              style={{ backgroundColor: "#85addc" }}
            >
              {author.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                author.name.charAt(0).toUpperCase()
              )}
            </span>
            <div>
              <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                {author.name}
              </p>
              {author.role && (
                <p className="text-[12px]" style={{ color: "#6B6B80" }}>
                  {author.role}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Publish date */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--color-border-subtle)" }}
      >
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#6B6B80" }}>
          Published
        </p>
        <p className="text-[14px]" style={{ color: "var(--text-primary)" }}>
          {formatBlogDate(post.date)}
        </p>
      </div>

      {/* Share */}
      {post.showShare && <ShareButtons title={post.title} />}

      {/* Categories */}
      {categories.length > 0 && (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--color-border-subtle)" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#6B6B80" }}>
            Categories
          </p>
          <ul className="flex flex-col gap-1.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/blog?category=${c.slug}`}
                  className="text-[13.5px] transition-colors hover:text-[#fabf7d]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--color-border-subtle)" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#6B6B80" }}>
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t.id}
                className="text-[11.5px] px-3 py-1 rounded-full"
                style={{ color: "var(--text-primary)", border: "1px solid rgba(30,30,46,0.12)" }}
              >
                #{t.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
