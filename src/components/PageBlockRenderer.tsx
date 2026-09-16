import { Fragment } from "react";
import BlockBackground from "@/components/BlockBackground";
import PageHero from "@/components/PageHero";
import ContentSectionBlock from "@/components/sections/blocks/ContentSectionBlock";
import FeatureCardsBlock from "@/components/sections/blocks/FeatureCardsBlock";
import FaqBlock from "@/components/sections/blocks/FaqBlock";
import RichTextBlock from "@/components/sections/blocks/RichTextBlock";
import ImageTextBlock from "@/components/sections/blocks/ImageTextBlock";
import CtaBannerBlock from "@/components/sections/blocks/CtaBannerBlock";
import ContactDetailsBlock from "@/components/sections/blocks/ContactDetailsBlock";
import TestimonialsBlock from "@/components/sections/blocks/TestimonialsBlock";
import GalleryBlock from "@/components/sections/blocks/GalleryBlock";
import TeamBlock from "@/components/sections/blocks/TeamBlock";
import PricingBlock from "@/components/sections/blocks/PricingBlock";
import StatsBlock from "@/components/sections/blocks/StatsBlock";
import LogosStripBlock from "@/components/sections/blocks/LogosStripBlock";
import VideoEmbedBlock from "@/components/sections/blocks/VideoEmbedBlock";
import type { PageSectionData } from "@/lib/pages";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The single shared CMS block_type → component registry for any generic
 * SitePage (About Us, Contact Us, and every page created from
 * `/cms/pages/create/`). The Home page keeps its own copy in `app/page.tsx`
 * since a couple of its blocks (`applications`) need extra server-fetched
 * props (gallery tiles) that generic pages don't have.
 */
export const PAGE_BLOCK_REGISTRY: Record<string, (content: any) => React.ReactNode> = {
  page_hero: (c) => (
    <PageHero
      eyebrow={c.eyebrow}
      title={c.title}
      description={c.description}
      image={c.image}
      imageFill={c.image_fill}
    />
  ),
  content_section: (c) => <ContentSectionBlock content={c} />,
  feature_cards: (c) => <FeatureCardsBlock content={c} />,
  faq: (c) => <FaqBlock content={c} />,
  contact_details: (c) => <ContactDetailsBlock content={c} />,
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

/** Renders a CMS page's ordered sections. Unknown block types are skipped. */
export default function PageBlocks({ sections }: { sections: PageSectionData[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const render = PAGE_BLOCK_REGISTRY[s.block_type];
        if (!render) return null;
        return (
          <Fragment key={`${s.block_type}-${i}`}>
            <BlockBackground content={s.content}>{render(s.content)}</BlockBackground>
          </Fragment>
        );
      })}
    </>
  );
}
