import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBlocks from "@/components/PageBlockRenderer";
import CityPageView from "@/components/CityPageView";
import CityPageEditBar from "@/components/CityPageEditBar";
import { getSitePage } from "@/lib/pages";
import { getCityPage, getCityPageList, getCmsBaseUrl } from "@/lib/cityPages";

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

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

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

export default async function DynamicSitePage({ params }: Props) {
  const { slug } = await params;

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
