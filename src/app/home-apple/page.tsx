import HeaderApple from "@/components/HeaderApple";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import SpecialEdition from "@/components/sections/SpecialEdition";
import WhyUsCarousel from "@/components/sections/WhyUsCarousel";
import Applications from "@/components/sections/Applications";
import Blog from "@/components/sections/Blog";
import RewardsHighlight from "@/components/sections/RewardsHighlight";
import CTA from "@/components/sections/CTA";
import FooterApple from "@/components/FooterApple";
import { getRandomGalleryTiles } from "@/lib/gallery";

export const metadata = {
  title: "Home - Apple | Sanish Laminates",
};

export default function HomeApple() {
  const applicationTiles = getRandomGalleryTiles(5);

  return (
    <main className="bg-[var(--bg-primary)]">
      <HeaderApple />
      <Hero />
      <About />
      <HorizontalShowcase />
      <SpecialEdition />
      <WhyUsCarousel />
      <Applications tiles={applicationTiles} />
      <Blog />
      <RewardsHighlight />
      <CTA />
      <FooterApple />
    </main>
  );
}
