import { Fragment } from "react";
import BlockBackground from "@/components/BlockBackground";
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
import TestimonialsBlock from "@/components/sections/blocks/TestimonialsBlock";
import GalleryBlock from "@/components/sections/blocks/GalleryBlock";
import TeamBlock from "@/components/sections/blocks/TeamBlock";
import PricingBlock from "@/components/sections/blocks/PricingBlock";
import StatsBlock from "@/components/sections/blocks/StatsBlock";
import LogosStripBlock from "@/components/sections/blocks/LogosStripBlock";
import VideoEmbedBlock from "@/components/sections/blocks/VideoEmbedBlock";
import Footer from "@/components/Footer";
import { getRandomGalleryTiles } from "@/lib/gallery";
import { getHomeSections, type HomeSectionData } from "@/lib/homepage";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function Home() {
  const applicationTiles = await getRandomGalleryTiles(5);
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
    testimonials: (c) => <TestimonialsBlock content={c} />,
    gallery: (c) => <GalleryBlock content={c} />,
    team: (c) => <TeamBlock content={c} />,
    pricing: (c) => <PricingBlock content={c} />,
    stats: (c) => <StatsBlock content={c} />,
    logos_strip: (c) => <LogosStripBlock content={c} />,
    video_embed: (c) => <VideoEmbedBlock content={c} />,
  };

  return (
    <main className="bg-[var(--bg-primary)]">
      <Header />
      {sections ? (
        sections.map((s: HomeSectionData, i) => {
          const render = registry[s.block_type];
          if (!render) return null;
          return (
            <Fragment key={`${s.block_type}-${i}`}>
              <BlockBackground content={s.content}>{render(s.content)}</BlockBackground>
            </Fragment>
          );
        })
      ) : (
        <StaticHome tiles={applicationTiles} />
      )}
      <Footer />
    </main>
  );
}

/** Original hard-coded layout — shown when the CMS home API is unavailable. */
function StaticHome({ tiles }: { tiles: Awaited<ReturnType<typeof getRandomGalleryTiles>> }) {
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
