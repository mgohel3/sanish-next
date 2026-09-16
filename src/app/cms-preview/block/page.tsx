"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlockBackground from "@/components/BlockBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import SpecialEdition from "@/components/sections/SpecialEdition";
import WhyUsCarousel from "@/components/sections/WhyUsCarousel";
import Applications from "@/components/sections/Applications";
import Blog from "@/components/sections/Blog";
import RewardsHighlight from "@/components/sections/RewardsHighlight";
import CTA from "@/components/sections/CTA";
import { getRandomGalleryTiles } from "@/lib/gallery";
import { PAGE_BLOCK_REGISTRY } from "@/components/PageBlockRenderer";

/* eslint-disable @typescript-eslint/no-explicit-any */

const MESSAGE_SOURCE = "sanish-cms-preview";

// Home-page-only blocks (not shared with generic Pages) + everything from
// the shared registry, so live preview covers every block type in the CMS.
function buildPreviewRegistry(applicationTiles: Awaited<ReturnType<typeof getRandomGalleryTiles>>) {
  const registry: Record<string, (content: any) => React.ReactNode> = {
    ...PAGE_BLOCK_REGISTRY,
    hero: (c) => <Hero content={c} />,
    about: (c) => <About content={c} />,
    horizontal_showcase: (c) => <HorizontalShowcase content={c} />,
    special_edition: (c) => <SpecialEdition content={c} />,
    why_us: (c) => <WhyUsCarousel content={c} />,
    applications: (c) => <Applications tiles={applicationTiles} content={c} />,
    rewards: (c) => <RewardsHighlight content={c} />,
    cta: (c) => <CTA content={c} />,
    blog_teaser: (c) => <Blog content={c} />,
  };
  return registry;
}

/**
 * Embedded (as an iframe) by the CMS block edit form — renders one block,
 * live, using the exact same React component the public site uses, so
 * editors see a pixel-accurate preview as they type instead of guessing
 * until they save. Content arrives via `postMessage` from the parent CMS
 * page; nothing here is reachable from the public site's own navigation.
 */
function BlockPreview() {
  const searchParams = useSearchParams();
  const blockType = searchParams.get("type") || "";
  const [content, setContent] = useState<Record<string, any>>({});
  const [applicationTiles, setApplicationTiles] = useState<Awaited<ReturnType<typeof getRandomGalleryTiles>>>([]);

  useEffect(() => {
    getRandomGalleryTiles(5).then(setApplicationTiles);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msg = e.data;
      if (!msg || msg.source !== MESSAGE_SOURCE || msg.type !== "content") return;
      setContent(msg.content || {});
    };
    window.addEventListener("message", onMessage);
    // Tell the parent we're ready to receive the current field values —
    // covers the race where the iframe loads after the parent's first post.
    window.parent?.postMessage({ source: MESSAGE_SOURCE, type: "ready" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const render = buildPreviewRegistry(applicationTiles)[blockType];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {render ? (
        <BlockBackground content={content}>{render(content)}</BlockBackground>
      ) : (
        <div className="site-container py-16 text-center text-[var(--text-secondary)] text-sm">
          {blockType ? `No preview available for "${blockType}" yet.` : "Waiting for content…"}
        </div>
      )}
    </div>
  );
}

export default function BlockPreviewPage() {
  return (
    <Suspense fallback={null}>
      <BlockPreview />
    </Suspense>
  );
}
