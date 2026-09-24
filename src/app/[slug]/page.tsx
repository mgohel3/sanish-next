import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBlocks from "@/components/PageBlockRenderer";
import CityPageView from "@/components/CityPageView";
import CityPageEditBar from "@/components/CityPageEditBar";
import { getSitePage } from "@/lib/pages";
import { getCityPage, getCityPagePreview, getCityPageList, getCmsBaseUrl } from "@/lib/cityPages";
import CmsPreviewBanner from "@/components/CmsPreviewBanner";

/**
 * Renders any page created from `/cms/pages/create/` at its own URL with no
 * developer involvement — the CMS-block equivalent of picking an Elementor
 * template and publishing. Next.js always prefers a literal route (e.g.
 * `/about-us/page.tsx`) over this catch-all for the same path, so none of
 * the site's existing static pages are affected.
 *
 * Also serves the programmatic "<Product> in <City>" pages from
 * `/cms/city-pages/` (a separate CMS model — see `lib/cityPages.ts`) when the
 * slug isn't a `SitePage`.
 */
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> };

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;

  // Same reasoning as the page body below: a preview token only ever targets
  // a CityPage, and a draft page has no metadata at all from the public
  // fetch (getCityPage only sees published pages) — without this, previewing
  // a draft city page showed the site's generic fallback title/description
  // instead of the page's own, which is exactly the kind of "doesn't look
  // right" a preview is supposed to catch before publishing.
  if (preview) {
    const cityPage = await getCityPagePreview(slug, preview);
    if (cityPage) {
      const { seo, h1_title } = cityPage.resolved_data;
      return {
        title: seo.title || h1_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords || undefined,
        // Never a canonical tag on a preview — it isn't the real URL yet.
      };
    }
    return {};
  }

  const page = await getSitePage(slug);
  if (page) {
    return {
      title: `${page.title} | Sanish Laminates`,
      description: page.title,
    };
  }

  const cityPage = await getCityPage(slug);
  if (cityPage) {
    const { seo, h1_title } = cityPage.resolved_data;
    return {
      title: seo.title || h1_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords || undefined,
      alternates: seo.canonical_url ? { canonical: seo.canonical_url } : undefined,
      openGraph: {
        title: seo.og_title || seo.title || h1_title,
        description: seo.og_description || seo.meta_description,
        images: seo.og_image ? [seo.og_image] : undefined,
      },
    };
  }

  return {};
}

export default async function DynamicSitePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;

  // A preview token is only ever minted for a CityPage (SitePage has no
  // preview flow) — check it first so a preview link can't be shadowed by a
  // published SitePage that happens to share the same slug.
  if (preview) {
    const cityPage = await getCityPagePreview(slug, preview);
    if (!cityPage) notFound();
    const siblingCities = await getCityPageList();
    return (
      <main style={{ backgroundColor: "var(--bg-primary)" }}>
        <CmsPreviewBanner status={cityPage.status} editHref={`${getCmsBaseUrl()}/cms/city-pages/${cityPage.id}/`} />
        <Header />
        <CityPageView page={cityPage} siblingCities={siblingCities} />
        <Footer />
      </main>
    );
  }

  const page = await getSitePage(slug);
  if (page) {
    return (
      <main style={{ backgroundColor: "var(--bg-primary)" }}>
        <Header />
        <PageBlocks sections={page.sections} />
        <Footer />
      </main>
    );
  }

  const cityPage = await getCityPage(slug);
  if (cityPage) {
    const siblingCities = await getCityPageList();
    return (
      <main style={{ backgroundColor: "var(--bg-primary)" }}>
        <Header />
        <CityPageView page={cityPage} siblingCities={siblingCities} />
        <Footer />
        <CityPageEditBar cmsBaseUrl={getCmsBaseUrl()} pageId={cityPage.id} />
      </main>
    );
  }

  notFound();
}
