import Header from "@/components/Header";
import HeroClassic from "@/components/sections/HeroClassic";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import EliteCollection from "@/components/sections/EliteCollection";
import SpecialEdition from "@/components/sections/SpecialEdition";
import Trust from "@/components/sections/Trust";
import Infrastructure from "@/components/sections/Infrastructure";
import Applications from "@/components/sections/Applications";
import Blog from "@/components/sections/Blog";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import { getRandomGalleryTiles } from "@/lib/gallery";

export const metadata = {
  title: "Sanish Laminates | Home Classic — Premium Decorative Surfaces",
  description: "Classic homepage experience for Sanish Laminates — premium decorative surfaces and architectural laminates.",
};

export default function Home1() {
  const applicationTiles = getRandomGalleryTiles(5);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <HeroClassic />
      <About />
      <HorizontalShowcase />
      <EliteCollection />
      <SpecialEdition />
      <Trust />
      <Infrastructure />
      <Applications tiles={applicationTiles} />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}
