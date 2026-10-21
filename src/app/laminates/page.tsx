import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";
import { cmsPageMetadata } from "@/lib/seo";
import { fetchProducts, fetchCategoryMeta } from "@/lib/catalog";

export async function generateMetadata() {
  return cmsPageMetadata({
  title: "Decorative Laminates in India | Laminate Sheets | Sanish Laminates",
  description: "Explore the full Sanish Laminates range of decorative laminates — solid colours, wood, marble and stone designs in gloss, matte, suede and flute finishes.",
  path: "/laminates",
});
}

const FALLBACK = {
  eyebrow: "Surface Collection",
  image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  description: "Premium decorative laminates crafted for contemporary interiors — high-gloss, matte, metallic, wood, stone and fabric designs.",
};

export default async function LaminatesPage(
  { searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> },
) {
  // Reading searchParams makes this page render per request, so the H1 and the product grid are in the HTML crawlers receive
  // (instead of only a "Loading…" shell that the browser fills in afterwards).
  await searchParams;
  const [items, meta] = await Promise.all([
    fetchProducts("laminates"),
    fetchCategoryMeta("laminates"),
  ]);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <h2 className="sr-only">Browse decorative laminate designs by collection, finish and colour</h2>
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading laminates…
        </div>
      }>
        <ProductListClient
          category="Laminates"
          products={items}
          basePath="/laminates"
          categoryLabel="Laminates"
          heroEyebrow={meta?.eyebrow || FALLBACK.eyebrow}
          heroImage={meta?.image || FALLBACK.image}
          heroDescription={meta?.description || FALLBACK.description}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
