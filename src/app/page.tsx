import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import SpecialEdition from "@/components/sections/SpecialEdition";
import WhyUsCarousel from "@/components/sections/WhyUsCarousel";
import Applications from "@/components/sections/Applications";
import Blog from "@/components/sections/Blog";
import RewardsHighlight from "@/components/sections/RewardsHighlight";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import { getRandomGalleryTiles } from "@/lib/gallery";

export default function Home() {
  const applicationTiles = getRandomGalleryTiles(5);

  return (
    <main className="bg-[var(--bg-primary)]">
      <Header />
      <Hero />
      <About />
      <HorizontalShowcase />
      <SpecialEdition />
      <WhyUsCarousel />
      <Applications tiles={applicationTiles} />
      {/* Editorial section hidden for now — re-enable <Blog /> when ready */}
      <div className="home-section-divider" />
      <RewardsHighlight />
      <CTA />
      <Footer />
    </main>
  );
}
