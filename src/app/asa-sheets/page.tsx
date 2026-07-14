import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListClient from "@/components/ProductListClient";

export const metadata: Metadata = {
  title: "ASA Sheets | Sanish Laminates — Weather-Resistant Surfaces",
  description: "Sanish ASA Sheets — durable acrylonitrile styrene acrylate surfaces engineered for outdoor and high-exposure applications.",
};

export default function AsaSheetsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="pt-[140px] pb-20 text-center text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Loading ASA Sheets…
        </div>
      }>
        <ProductListClient
          category="ASA Sheets"
          basePath="/asa-sheets"
          categoryLabel="ASA Sheets"
          heroEyebrow="Outdoor Surfaces"
          heroImage="https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2000"
          heroDescription="Weather-resistant ASA surface sheets engineered for outdoor furniture, cladding and high-exposure architectural applications."
        />
      </Suspense>
      <Footer />
    </main>
  );
}
