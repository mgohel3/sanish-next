import { products } from "@/lib/products";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  fetchProducts,
  productHref,
  collectionHref,
  toSlug,
} from "@/lib/catalog";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import TextureSwatches from "./TextureSwatches";
import InquireButton from "@/components/InquireButton";

/* ── Page ────────────────────────────────────────────────── */
export function generateStaticParams() {
  return products.map((p) => ({
    category: toSlug(p.category) || "laminates",
    collection: toSlug(p.collection) || "none",
    slug: p.slug,
  }));
}

type Props = {
  params: Promise<{ category: string; collection: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, collection, slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  // Canonicalise the URL — keep /products/<category>/<collection>/<slug> honest.
  const canonical = productHref(product);
  if (`/products/${category}/${collection}/${slug}` !== canonical) {
    redirect(canonical);
  }

  // Related = other products in the same category
  const categorySlug = toSlug(product.category);
  const sameCategory = await fetchProducts(categorySlug);
  let related = sameCategory.filter((p) => p.slug !== product.slug).slice(0, 3);
  if (related.length === 0) {
    related = await fetchRelatedProducts(product.relatedSlugs).then((r) => r.slice(0, 3));
  }
  const code         = product.sku || "";
  const productType  = product.productType || "";
  const surfaceCat   = product.surfaceCategory || "";
  const designType   = product.designType || "";

  const waText = encodeURIComponent(
    `Hi, I'm interested in ${product.name}${code ? ` (${code})` : ""} from the ${product.collection} collection. Could you please provide more details and a quotation?`
  );
  const waLink     = `https://wa.me/917027777032?text=${waText}`;
  const enquiryLink = `/contact-us?product=${product.slug}&name=${encodeURIComponent(product.name)}`;

  const badgeColor =
    "#fabf7d";

  // Only show rows the admin has both filled in AND left toggled on in the CMS.
  const standardSpecs = [
    { label: "Design / Surface",  value: product.surface,     show: product.showSurface },
    { label: "Product Type",      value: productType,         show: product.showProductType },
    { label: "Finish / Texture",  value: product.finish,      show: product.showFinish },
    { label: "Surface Category",  value: surfaceCat,          show: product.showSurfaceCategory },
    { label: "Thickness",         value: product.thickness,   show: product.showThickness },
    { label: "Standard Size",     value: product.dimensions,  show: product.showDimensions },
    { label: "Applications",      value: product.application, show: product.showApplication },
  ].filter((row) => row.show !== false && row.value && row.value.trim() !== "");

  // Custom key/value pairs added via the CMS "Technical Specs" repeater — shown
  // when present, but skipped if a standard row above already covers the same
  // information. The bulk import seeded almost every product with the same
  // four generic keys (Thickness / Sheet Size / Surface / Range), which just
  // restate the dedicated Thickness / Standard Size / Design-Surface fields
  // and the collection shown elsewhere on the page — so those labels are
  // always redundant here regardless of exact value formatting.
  const REDUNDANT_TECH_SPEC_LABELS = new Set(["thickness", "sheet size", "surface", "range"]);
  const standardValues = new Set(standardSpecs.map((row) => row.value.trim().toLowerCase()));
  const customSpecs = Object.entries(product.techSpecs || {})
    .filter(([label, value]) =>
      value && value.trim() !== "" &&
      !REDUNDANT_TECH_SPEC_LABELS.has(label.trim().toLowerCase()) &&
      !standardValues.has(value.trim().toLowerCase())
    )
    .map(([label, value]) => ({ label, value }));

  const specs = [...standardSpecs, ...customSpecs];
  const textureVariants = (product.textureVariants || []).filter((t) => t.image);

  const categoryTags = [
    { value: productType, show: product.showProductType },
    { value: surfaceCat,  show: product.showSurfaceCategory },
    { value: designType,  show: product.showDesignType },
  ].filter((tag) => tag.show !== false && tag.value).map((tag) => tag.value);
  const collectionListHref = collectionHref(product);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />

      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="border-b" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "rgba(30,30,46,0.07)" }}>
        <div className="site-container py-3.5">
          <nav className="flex items-center gap-2 text-[11.5px]" style={{ fontFamily: "var(--font-jakarta)", color: "#6B6B80" }}>
            <Link href="/" className="hover:text-[#f39ba2] transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/collection" className="hover:text-[#f39ba2] transition-colors">Collection</Link>
            {product.collection && (
              <>
                <span className="opacity-40">/</span>
                <Link href="/collection" className="hover:text-[#f39ba2] transition-colors">
                  {product.collection}
                </Link>
              </>
            )}
            <span className="opacity-40">/</span>
            <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main product section ────────────────────────── */}
      <section className="site-container home-section--compact">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-20 items-start">

          {/* LEFT — Image Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* RIGHT — Product Info */}
          <div className="lg:pt-2">

            {/* Row 1: Collection + product badge */}
            <div className="flex items-center gap-3 mb-3">
              {product.collection && (
                <span className="text-[10.5px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}>
                  {product.collection} Collection
                </span>
              )}
              {product.badge && (
                <span className="text-[9.5px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: badgeColor, fontFamily: "var(--font-jakarta)" }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Row 2: Category tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryTags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(30,30,46,0.06)",
                    color: "#6B6B80",
                    border: "1px solid rgba(30,30,46,0.1)",
                    fontFamily: "var(--font-jakarta)",
                    letterSpacing: "0.05em",
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Product name */}
            <h1 className="font-serif leading-[1.05] mb-2" style={{ fontSize: "clamp(36px, 4vw, 54px)", color: "var(--text-primary)" }}>
              {product.name}
            </h1>

            {/* Product code + collection link (same row) */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {code && (
                <p className="text-[12px] tracking-[0.12em] uppercase" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                  Product Code: {code}
                </p>
              )}
              {product.collection && (
                <Link
                  href={collectionListHref}
                  className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}
                >
                  Part of the {product.collection} Collection
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#5A5A6A", fontFamily: "var(--font-jakarta)" }}>
              {product.shortDescription}
            </p>
            )}

            {/* ── Application image — the finish applied in a room, shown
                 below the title rather than mixed into the swatch gallery ── */}
            {product.applicationImage && (
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#f3f4f6] ring-1 ring-inset ring-black/[0.06]">
              <img
                src={product.applicationImage}
                alt={`${product.name} applied in an interior`}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
            )}

            {/* ── Texture variants — labeled reference swatches for the other
                 finishes this shade is available in; click to zoom ── */}
            {textureVariants.length > 0 && (
              <TextureSwatches variants={textureVariants} name={product.name} />
            )}

            {/* ── Specs table ── */}
            {specs.length > 0 && (
            <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid rgba(30,30,46,0.08)" }}>
              <div className="grid grid-cols-2 px-5 py-3" style={{ backgroundColor: "#1E1E2E" }}>
                <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Specification</span>
                <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Details</span>
              </div>
              {specs.map((row, i) => (
                <div key={row.label} className="grid grid-cols-2 px-5 py-3.5 border-t"
                  style={{ borderColor: "rgba(30,30,46,0.07)", backgroundColor: i % 2 === 0 ? "white" : "#FAFAF9" }}>
                  <span className="text-[13px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                  <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>{row.value}</span>
                </div>
              ))}
            </div>
            )}

            {/* ── Features ── */}
            {product.features.length > 0 && (
            <div className="mb-10">
              <p className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                Key Features
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((f) => (
                  <span key={f} className="text-[11.5px] px-3.5 py-1.5 rounded-full"
                    style={{ color: "var(--text-primary)", border: "1px solid rgba(30,30,46,0.12)", backgroundColor: "var(--bg-secondary)", fontFamily: "var(--font-jakarta)" }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            )}

            {/* ── CTA Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="btn-pill flex-1 justify-center text-white"
                style={{ background: "linear-gradient(135deg, #25D366, #1DAE52)", boxShadow: "0 8px 24px rgba(37,211,102,0.32)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
              <div className="flex-1"><InquireButton /></div>
            </div>

            <p className="text-center text-[11px] mt-3" style={{ color: "#A0A0B0", fontFamily: "var(--font-jakarta)" }}>
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Related Products ───────────────────────────── */}
      {related.length > 0 && (
        <section className="home-section--compact border-t" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "rgba(30,30,46,0.07)" }}>
          <div className="site-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}>
                  You May Also Like
                </p>
                <h2 className="font-serif" style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "var(--text-primary)" }}>
                  Related Products
                </h2>
              </div>
              <Link href="/collection" className="hidden sm:flex items-center gap-2 text-[12px] font-semibold transition-colors hover:opacity-70"
                style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}>
                View All
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rp) => (
                <Link key={rp.slug} href={productHref(rp)} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-[#f3f4f6] ring-1 ring-inset ring-black/[0.06]">
                    <img src={rp.images[0]} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {rp.badge && (
                      <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: "#fabf7d" }}>
                        {rp.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-white text-[12px] font-semibold tracking-wide" style={{ fontFamily: "var(--font-jakarta)" }}>View Details →</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-[19px] mb-1" style={{ color: "var(--text-primary)" }}>{rp.name}</h3>
                  <p className="text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{[rp.collection, rp.finish].filter(Boolean).join(" · ")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
