import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationsGallery from "@/components/sections/ApplicationsGallery";

export const metadata = {
  title: "Laminate Applications | Interior Design Projects | Sanish",
  description:
    "Explore Sanish Laminate applications across kitchens, wardrobes, wall panels, commercial interiors and modular furniture.",
};

export default function ApplicationsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <ApplicationsGallery />
      <Footer />
    </main>
  );
}
