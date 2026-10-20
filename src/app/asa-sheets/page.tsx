import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";
import { pageMetadata } from "@/lib/seo";
import { fetchProducts, fetchCategoryMeta } from "@/lib/catalog";

export const metadata: Metadata = pageMetadata({
  title: "Thermo Laminates | Weather-Resistant ASA Sheets | Sanish Laminates",
  description: "Sanish Thermo Laminates — durable, weather-resistant ASA surfaces for outdoor cladding and high-exposure architectural applications. Explore colours and request samples.",
  path: "/asa-sheets",
});

const FALLBACK = {
  eyebrow: "Outdoor Surfaces",
  image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2000",
  description: "Weather-resistant Thermo Laminate surfaces engineered for outdoor furniture, cladding and high-exposure architectural applications.",
};

export default async function AsaSheetsPage(
  { searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> },
) {
  // Reading searchParams makes this page render per request, so the H1 and the product grid are in the HTML crawlers receive
  // (instead of only a "Loading…" shell that the browser fills in afterwards).
  await searchParams;
  const [items, meta] = await Promise.all([
    fetchProducts("thermo-laminates"),
    fetchCategoryMeta("thermo-laminates"),
  ]);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <h2 className="sr-only">Browse Thermo Laminates for outdoor and facade use</h2>
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading Thermo Laminates…
        </div>
      }>
        <ProductListClient
          category="Thermo Laminates"
          products={items}
          basePath="/asa-sheets"
          categoryLabel="Thermo Laminates"
          heroEyebrow={meta?.eyebrow || FALLBACK.eyebrow}
          heroImage={meta?.image || FALLBACK.image}
          heroDescription={meta?.description || FALLBACK.description}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
