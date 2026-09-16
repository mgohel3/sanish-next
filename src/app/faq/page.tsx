import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FaqGrid from "@/components/faq/FaqGrid";
import { fetchFaqs } from "@/lib/faq";

export const metadata = {
  title: "FAQs | Sanish Laminates",
  description:
    "Answers to common questions about laminates, veneers, plywood and surface finishes from Sanish Laminates.",
};

export const revalidate = 300;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600";

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/<[^>]+>/g, "") },
    })),
  };

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        image={HERO_IMAGE}
        imageFill
        description="Answers to the questions we hear most about laminates, veneers, plywood and surface finishes."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />

      <section className="home-section bg-[var(--bg-primary)]">
        <div className="site-container" style={{ maxWidth: 1280 }}>
          {faqs.length === 0 ? (
            <div className="py-24 text-center">
              <h2 className="font-serif text-[clamp(24px,3vw,32px)] text-[var(--text-primary)] mb-3">
                No FAQs yet
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)]">
                Check back soon.
              </p>
            </div>
          ) : (
            <FaqGrid faqs={faqs} />
          )}
        </div>
      </section>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
