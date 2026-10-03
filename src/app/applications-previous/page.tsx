import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationsCategories from "@/components/sections/ApplicationsCategories";
import PageHero from "@/components/PageHero";

// REVIEW-ONLY copy of the earlier /applications layout (the case-study category
// grid that was paused on 2026-08-19). Not linked anywhere, not indexed, and it
// does not touch the live /applications page — delete this folder when no
// longer needed.
export const metadata = {
  title: "Applications (previous layout — preview)",
  robots: { index: false, follow: false },
};

export default function ApplicationsPreviousLayoutPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Inspiration Gallery"
        title="Applications"
        image="/assets/img/applications-banner.jpg"
        imageFill
        description="See Sanish surfaces in kitchens, workplaces, retail environments and modern homes."
      />
      <ApplicationsCategories />
      <Footer />
    </main>
  );
}
