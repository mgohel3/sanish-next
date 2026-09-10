import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import { fetchProducts } from "@/lib/catalog";

export default async function Product2Page() {
  const items = await fetchProducts();
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading products…
        </div>
      }>
        <ProductsClient products={items} />
      </Suspense>
      <Footer />
    </main>
  );
}
