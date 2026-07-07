import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import PageHero from "@/components/PageHero";

export default function Product2Page() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <PageHero
        eyebrow="Product Categories"
        title="Surface Solutions"
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000"
        description="Browse laminates, louvers and sheet solutions through one consistent product system."
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
