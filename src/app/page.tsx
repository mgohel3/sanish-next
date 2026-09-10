import { Fragment } from "react";
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
import RichTextBlock from "@/components/sections/blocks/RichTextBlock";
import ImageTextBlock from "@/components/sections/blocks/ImageTextBlock";
import CtaBannerBlock from "@/components/sections/blocks/CtaBannerBlock";
import Footer from "@/components/Footer";
import { getRandomGalleryTiles } from "@/lib/gallery";
import { getHomeSections, type HomeSectionData } from "@/lib/homepage";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function Home() {
  const applicationTiles = getRandomGalleryTiles(5);
  const sections = await getHomeSections();

  // Registry: CMS block_type → rendered section. Unknown types are skipped.
  const registry: Record<string, (c: any) => React.ReactNode> = {
    hero: (c) => <Hero content={c} />,
    about: (c) => <About content={c} />,
    horizontal_showcase: (c) => <HorizontalShowcase content={c} />,
    special_edition: (c) => <SpecialEdition content={c} />,
    why_us: (c) => <WhyUsCarousel content={c} />,
    applications: (c) => <Applications tiles={applicationTiles} content={c} />,
    rewards: (c) => <RewardsHighlight content={c} />,
    cta: (c) => <CTA content={c} />,
    blog_teaser: (c) => <Blog content={c} />,
    rich_text: (c) => <RichTextBlock content={c} />,
    image_text: (c) => <ImageTextBlock content={c} />,
    cta_banner: (c) => <CtaBannerBlock content={c} />,
  };

  return (
    <main className="bg-[var(--bg-primary)]">
      <Header />
      {sections ? (
        sections.map((s: HomeSectionData, i) => {
          const render = registry[s.block_type];
          if (!render) return null;
          return <Fragment key={`${s.block_type}-${i}`}>{render(s.content)}</Fragment>;
        })
      ) : (
        <StaticHome tiles={applicationTiles} />
      )}
      <Footer />
    </main>
  );
}

/** Original hard-coded layout — shown when the CMS home API is unavailable. */
function StaticHome({ tiles }: { tiles: ReturnType<typeof getRandomGalleryTiles> }) {
  return (
    <>
      <Hero />
      <About />
      <HorizontalShowcase />
      <SpecialEdition />
      <WhyUsCarousel />
      <Applications tiles={tiles} />
      {/* Editorial section hidden for now — re-enable <Blog /> when ready */}
      <div className="home-section-divider" />
      <RewardsHighlight />
      <CTA />
    </>
  );
}
