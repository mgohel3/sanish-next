import Header from "@/components/Header";
import Footer from "@/components/Footer";
// TEMPORARY (2026-08-19, client instruction): the case-study category grid
// (ApplicationsCategories, importable from the same path below) is paused in
// favor of the catalogue-grouped Design Gallery. Nothing about the case-study
// feature was removed — /applications/[category]/[slug] pages still work,
// they're just not linked from this index page for now. To reactivate: swap
// <DesignGallery /> below back for <ApplicationsCategories />.
// import ApplicationsCategories from "@/components/sections/ApplicationsCategories";
import DesignGallery from "@/components/sections/DesignGallery";
import PageHero from "@/components/PageHero";
import { getGalleryCatalogues } from "@/lib/gallery";

export const metadata = {
  title: "Laminate Applications | Interior Design Projects | Sanish",
  description:
    "Explore Sanish Laminate applications across kitchens, wardrobes, wall panels, commercial interiors and modular furniture.",
};

export default function ApplicationsPage() {
  const catalogues = getGalleryCatalogues();

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
      <DesignGallery catalogues={catalogues} />
      <Footer />
    </main>
  );
}
