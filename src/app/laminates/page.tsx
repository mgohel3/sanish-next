import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";
import { fetchProducts, fetchCategoryMeta } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Laminates | Sanish Laminates — Premium Decorative Surfaces",
  description: "Explore Sanish Laminates' full range of decorative laminates — from high-gloss solids to woodgrain, stone, fabric and metallic finishes.",
};

const FALLBACK = {
  eyebrow: "Surface Collection",
  image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  description: "Premium decorative laminates crafted for contemporary interiors — high-gloss, matte, metallic, wood, stone and fabric designs.",
};

export default async function LaminatesPage() {
  const [items, meta] = await Promise.all([
    fetchProducts("laminates"),
    fetchCategoryMeta("laminates"),
  ]);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
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
