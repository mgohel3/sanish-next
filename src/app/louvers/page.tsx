import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";
import { cmsPageMetadata } from "@/lib/seo";
import { fetchProducts, fetchCategoryMeta } from "@/lib/catalog";

export async function generateMetadata() {
  return cmsPageMetadata({
  title: "Fluted Louvers & Architectural Panels | Sanish Laminates",
  description: "Architectural fluted louvers and panels from Sanish Laminates — slatted surfaces for walls, ceilings and interiors. Browse designs, finishes and sizes, and request samples.",
  path: "/louvers",
});
}

const FALLBACK = {
  eyebrow: "Architectural Surfaces",
  image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2000",
  description: "Fluted and architectural panel surfaces that transform ordinary walls into striking design statements.",
};

export default async function LouversPage(
  { searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> },
) {
  // Reading searchParams makes this page render per request, so the H1 and the product grid are in the HTML crawlers receive
  // (instead of only a "Loading…" shell that the browser fills in afterwards).
  await searchParams;
  const [items, meta] = await Promise.all([
    fetchProducts("louvers"),
    fetchCategoryMeta("louvers"),
  ]);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <h2 className="sr-only">Browse fluted louvers and architectural panels</h2>
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading louvers…
        </div>
      }>
        <ProductListClient
          category="Louvers"
          products={items}
          basePath="/louvers"
          categoryLabel="Louvers"
          heroEyebrow={meta?.eyebrow || FALLBACK.eyebrow}
          heroImage={meta?.image || FALLBACK.image}
          heroDescription={meta?.description || FALLBACK.description}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
