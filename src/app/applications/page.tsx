import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationsGallery from "@/components/sections/ApplicationsGallery";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Laminate Applications | Interior Design Projects | Sanish",
  description:
    "Explore Sanish Laminate applications across kitchens, wardrobes, wall panels, commercial interiors and modular furniture.",
};

export default function ApplicationsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Inspiration Gallery"
        title="Applications"
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000"
        description="See Sanish surfaces in kitchens, workplaces, retail environments and modern homes."
      />
      <ApplicationsGallery />
      <Footer />
    </main>
  );
}
