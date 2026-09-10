import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";
import { fetchProducts, fetchCategoryMeta } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Louvers | Sanish Laminates — Architectural Fluted Panels",
  description: "Discover Sanish Louvers — fluted and architectural panel surfaces that bring rhythm, depth and texture to walls, doors and room dividers.",
};

const FALLBACK = {
  eyebrow: "Architectural Surfaces",
  image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2000",
  description: "Fluted and architectural panel surfaces that transform ordinary walls into striking design statements.",
};

export default async function LouversPage() {
  const [items, meta] = await Promise.all([
    fetchProducts("louvers"),
    fetchCategoryMeta("louvers"),
  ]);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
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
