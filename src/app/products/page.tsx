import { Suspense } from "react";
import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import { fetchProducts, fetchCategories, fetchCollections } from "@/lib/catalog";

export async function generateMetadata() {
  return cmsPageMetadata({
  title: "All Decorative Laminates & Surfaces | Sanish Laminates",
  description: "Browse every Sanish Laminates surface in one place — filter by collection, design type, finish and colour across laminates and thermo laminates.",
  path: "/products",
});
}

export default async function ProductsPage(
  { searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> },
) {
  // Reading searchParams makes this page render per request, so the H1 and the product grid are in the HTML crawlers receive
  // (instead of only a "Loading…" shell that the browser fills in afterwards).
  await searchParams;
  const [items, categories, collections] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchCollections(),
  ]);
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <h2 className="sr-only">Browse all Sanish decorative laminates and surfaces</h2>
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading products…
        </div>
      }>
        <ProductsClient products={items} categories={categories} collections={collections} />
      </Suspense>
      <Footer />
    </main>
  );
}
