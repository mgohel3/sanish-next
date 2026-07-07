import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import PageHero from "@/components/PageHero";

export default function ProductsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="All Products"
        title="Our Product Range"
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
        description="Browse the complete Sanish range — laminates, louvers and ASA sheets — all in one place."
      />
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading products…
        </div>
      }>
        <ProductsClient />
      </Suspense>
      <Footer />
    </main>
  );
}
