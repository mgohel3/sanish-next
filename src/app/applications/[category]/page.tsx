import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CategoryApplicationsGallery from "@/components/sections/CategoryApplicationsGallery";
import { CATEGORIES, getCategoryBySlug, getApplicationsByCategory } from "@/lib/applications";

const ARROW_LEFT = (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlugParam } = await params;
  const category = getCategoryBySlug(categorySlugParam);
  if (!category) return {};
  return {
    title: `${category.label} Applications | Sanish Laminates`,
    description: category.description,
  };
}

export default async function ApplicationCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlugParam } = await params;
  const category = getCategoryBySlug(categorySlugParam);
  if (!category) notFound();

  const projectCount = getApplicationsByCategory(category.label).length;

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Applications"
        title={category.label}
        image={category.image}
        description={category.description}
      />

      {/* ── Project count + back link ── */}
      <div className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {projectCount} {projectCount === 1 ? "Project" : "Projects"}
            </p>
            <Link
              href="/applications"
              className="inline-flex items-center gap-2 text-[12px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 hover:-translate-y-[1px] w-fit"
              style={{
                fontFamily: "var(--font-jakarta)",
                borderColor: category.accent,
                color: category.accent,
              }}>
              {ARROW_LEFT}
              Back to Applications
            </Link>
          </div>
        </div>
      </div>

      <CategoryApplicationsGallery category={category} />
      <Footer />
    </main>
  );
}
