import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import {
  fetchBlogPosts,
  fetchBlogPostBySlug,
  fetchBlogPostPreview,
  formatBlogDate,
  pickRelatedPosts,
} from "@/lib/blog";
import { getCmsBaseUrl } from "@/lib/cityPages";
import CmsPreviewBanner from "@/components/CmsPreviewBanner";

export const revalidate = 300;
export const dynamicParams = true;

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.seoTitle || post.title} | Sanish Laminates`,
    description: post.metaDescription || post.excerpt || undefined,
    keywords: post.metaKeywords || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.image ? [{ url: post.image }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const post = preview
    ? await fetchBlogPostPreview(slug, preview)
    : await fetchBlogPostBySlug(slug);
  if (!post) notFound();

  const withSidebar = post.layout === "sidebar";
  const related = post.showRelated
    ? pickRelatedPosts(await fetchBlogPosts(), post, 3)
    : [];

  const body = (
    <>
      <h1 className="blog-post-title">{post.title}</h1>
      {(post.excerpt || post.metaDescription) && (
        <p className="blog-post-description">{post.excerpt || post.metaDescription}</p>
      )}

      {/* meta row */}
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.14em] mb-8"
        style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
      >
        <span>{formatBlogDate(post.date)}</span>
        {post.categories.map((c) => (
          <span key={c.id} className="text-[#fabf7d]">
            {c.name}
          </span>
        ))}
      </div>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.faqs.length > 0 && <BlogFaqAccordion faqs={post.faqs} />}

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t.id}
              className="text-[11.5px] px-3.5 py-1.5 rounded-full"
              style={{
                color: "var(--text-primary)",
                border: "1px solid rgba(30,30,46,0.12)",
                backgroundColor: "var(--bg-secondary)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              #{t.name}
            </span>
          ))}
        </div>
      )}

      {/* Inline share for the full-width layout (sidebar layout shows it in the rail) */}
      {!withSidebar && post.showShare && (
        <div className="mt-10 max-w-[280px]">
          <ShareButtons title={post.title} />
        </div>
      )}

      <div className="mt-14 pt-8 border-t border-[var(--color-border-subtle)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[12px] font-semibold transition-opacity hover:opacity-70"
          style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </>
  );

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      {preview && (
        <CmsPreviewBanner status={post.status} editHref={`${getCmsBaseUrl()}/cms/blog/${post.id}/`} />
      )}
      <Header />
      <PageHero
        eyebrow={post.categories[0]?.name || "Editorial"}
        title={post.title}
        image={post.image || FALLBACK_HERO}
        imageFill
        breadcrumbOnly
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {post.autoFaqSchema && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}

      <div className="home-section bg-[var(--bg-primary)]">
        {withSidebar ? (
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 xl:gap-16">
              <article>{body}</article>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <BlogSidebar post={post} />
              </aside>
            </div>
          </div>
        ) : (
          <article className="site-container max-w-[820px]">{body}</article>
        )}
      </div>

      {post.showRelated && <RelatedPosts posts={related} />}

      <Footer />
    </main>
  );
}
