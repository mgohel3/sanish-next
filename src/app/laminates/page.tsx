import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";

export const metadata: Metadata = {
  title: "Laminates | Sanish Laminates — Premium Decorative Surfaces",
  description: "Explore Sanish Laminates' full range of decorative laminates — from high-gloss solids to woodgrain, stone, fabric and metallic finishes.",
};

export default function LaminatesPage() {
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
          basePath="/laminates"
          categoryLabel="Laminates"
          heroEyebrow="Surface Collection"
          heroImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
          heroDescription="Premium decorative laminates crafted for contemporary interiors — high-gloss, matte, metallic, wood, stone and fabric designs."
        />
      </Suspense>
      <Footer />
    </main>
  );
}
