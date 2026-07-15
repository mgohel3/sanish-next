"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, collections, finishes, designTypes, colors, COLOR_SWATCH, type Product, type ProductCategory } from "@/lib/products";
import PageHero from "@/components/PageHero";

/* ── URL slug → display name mappings ── */
const COLLECTION_SLUG_MAP: Record<string, string> = {
  sshades:       "S'Shades",
  thre3:         "Thre3",
  "cool-colour": "Cool Colour",
  "08mm":        "0.8mm",
  fluted:        "Fluted",
  perspective:   "All",
};

const FINISH_SLUG_MAP: Record<string, string> = {
  matt:          "Matte",
  glossy:        "High Gloss",
  "ultra-matte": "Ultra Matte",
  satin:         "Satin",
  suede:         "Suede",
  textured:      "Textured",
  metallic:      "Metallic",
};

const COLOR_SLUG_MAP: Record<string, string> = {
  white: "White",
  beige: "Beige",
  black: "Black",
  blue: "Blue",
  brown: "Brown",
  green: "Green",
  grey: "Grey",
  metallic: "Metallic",
  multicolor: "Multicolor",
  orange: "Orange",
  pink: "Pink",
  purple: "Purple",
  red: "Red",
  yellow: "Yellow",
};


/* ── Quick View Modal ── */
function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const code = `SL-${String(product.id).padStart(4, "0")}`;
  const waText = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${code}) from the ${product.collection} collection. Could you provide more details?`
  );
  const waLink = `https://wa.me/917027777032?text=${waText}`;
  const enquiryLink = `/contact-us?product=${product.slug}&name=${encodeURIComponent(product.name)}`;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[5px]" />
      <div
        className="relative bg-white rounded-[24px] w-full max-w-[840px] max-h-[90vh] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.28)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "qvIn 0.3s cubic-bezier(0.34,1.36,0.64,1) both" }}
      >
        <style>{`@keyframes qvIn { from { opacity:0; transform:scale(0.94) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/15 transition-colors">
          <X className="w-4 h-4 text-[#3A3A4A]" />
        </button>
        <div className="w-full md:w-[45%] flex-shrink-0 bg-[#f3f4f6] relative" style={{ minHeight: 280 }}>
          <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-3 left-3 text-[9.5px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: "#fabf7d" }}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-7 md:p-9 overflow-y-auto flex flex-col">
          <p className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}>
            {product.collection} Collection
          </p>
          <h2 className="font-serif mb-1" style={{ fontSize: "clamp(24px,3vw,30px)", color: "var(--text-primary)" }}>
            {product.name}
          </h2>
          <p className="text-[11.5px] tracking-[0.1em] uppercase mb-4" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>{code}</p>
          <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: "#5A5A6A", fontFamily: "var(--font-jakarta)" }}>{product.shortDescription}</p>
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(30,30,46,0.08)" }}>
            {[
              { label: "Finish",     value: product.finish },
              { label: "Thickness",  value: product.thickness },
              { label: "Size",       value: product.dimensions },
              { label: "Design",     value: product.designType },
            ].map((row, i) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3 border-t first:border-t-0"
                style={{ borderColor: "rgba(30,30,46,0.07)", backgroundColor: i % 2 === 0 ? "white" : "#FAFAF9" }}>
                <span className="text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{row.label}</span>
                <span className="text-[12.5px] font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-auto">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[12.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px]"
              style={{ background: "linear-gradient(135deg,#25D366,#1DAE52)", boxShadow: "0 6px 18px rgba(37,211,102,0.30)", fontFamily: "var(--font-jakarta)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a href={enquiryLink}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[12.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px]"
              style={{ background: "#85addc", boxShadow: "0 6px 18px rgba(133,173,220,0.35)", fontFamily: "var(--font-jakarta)" }}>
              Enquire Now
            </a>
          </div>
          <Link href={`/products/${product.slug}`} className="mt-3 text-center text-[12px] font-semibold transition-opacity hover:opacity-60"
            style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}>
            View Full Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Shared Client Component ── */
interface Props {
  category: ProductCategory | null;
  basePath: string;
  categoryLabel: string;
  heroEyebrow: string;
  heroImage: string;
  heroDescription?: string;
}

export default function ProductListClient({ category, basePath, categoryLabel, heroEyebrow, heroImage, heroDescription }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCollection, setActiveCollection] = useState("All");
  const [activeFinish, setActiveFinish] = useState("All Finishes");
  const [activeDesign, setActiveDesign] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState("All Colours");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);

  /* ── Base products pre-filtered by category ── */
  const baseProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  /* ── Dynamic page title from active filters ── */
  const pageTitle = (() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");
    if (colParam && COLLECTION_SLUG_MAP[colParam] && COLLECTION_SLUG_MAP[colParam] !== "All")
      return `${COLLECTION_SLUG_MAP[colParam]} ${categoryLabel}`;
    if (finParam && FINISH_SLUG_MAP[finParam]) return `${FINISH_SLUG_MAP[finParam]} ${categoryLabel}`;
    if (desParam) return `${desParam} Design ${categoryLabel}`;
    return `${categoryLabel}.`;
  })();

  const breadcrumbLabel = (() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");
    if (colParam && COLLECTION_SLUG_MAP[colParam] && COLLECTION_SLUG_MAP[colParam] !== "All")
      return COLLECTION_SLUG_MAP[colParam];
    if (finParam && FINISH_SLUG_MAP[finParam]) return FINISH_SLUG_MAP[finParam];
    if (desParam) return `${desParam} Design`;
    return null;
  })();

  /* ── Sync URL params → filter state ── */
  useEffect(() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");
    const colorParam = searchParams.get("color");

    setActiveCollection(colParam && COLLECTION_SLUG_MAP[colParam] !== "All" ? (COLLECTION_SLUG_MAP[colParam] ?? "All") : "All");

    setActiveDesign(desParam ? desParam : null);
    setActiveFinish(finParam ? (FINISH_SLUG_MAP[finParam] ?? "All Finishes") : "All Finishes");
    setActiveColor(colorParam ? (COLOR_SLUG_MAP[colorParam] ?? "All Colours") : "All Colours");
  }, [searchParams]);

  /* ── URL builder ── */
  const buildUrl = (col: string, fin: string, design: string | null, color = activeColor) => {
    const params = new URLSearchParams();
    const colSlug = Object.entries(COLLECTION_SLUG_MAP).find(([, v]) => v === col)?.[0];
    const finSlug = Object.entries(FINISH_SLUG_MAP).find(([, v]) => v === fin)?.[0];
    const colorSlug = Object.entries(COLOR_SLUG_MAP).find(([, v]) => v === color)?.[0];
    if (design) params.set("design", design.toLowerCase());
    if (col !== "All" && colSlug) params.set("collection", colSlug);
    if (fin !== "All Finishes" && finSlug) params.set("finish", finSlug);
    if (color !== "All Colours" && colorSlug) params.set("color", colorSlug);
    const q = params.toString();
    return q ? `${basePath}?${q}` : basePath;
  };

  const applyCollection = useCallback((col: string) => {
    setActiveCollection(col);
    router.replace(buildUrl(col, activeFinish, activeDesign), { scroll: false });
  }, [router, activeFinish, activeDesign, activeColor, basePath]);

  const applyFinish = useCallback((fin: string) => {
    setActiveFinish(fin);
    router.replace(buildUrl(activeCollection, fin, activeDesign), { scroll: false });
  }, [router, activeCollection, activeDesign, activeColor, basePath]);

  const applyDesign = useCallback((design: string | null) => {
    setActiveDesign(design);
    if (design) {
      router.replace(buildUrl(activeCollection, activeFinish, design), { scroll: false });
    } else {
      router.replace(buildUrl(activeCollection, activeFinish, null), { scroll: false });
    }
  }, [router, activeCollection, activeFinish, activeColor, basePath]);

  const applyColor = useCallback((color: string) => {
    setActiveColor(color);
    router.replace(buildUrl(activeCollection, activeFinish, activeDesign, color), { scroll: false });
  }, [router, activeCollection, activeFinish, activeDesign, basePath]);

  /* ── Filter products ── */
  const filtered = baseProducts.filter((p) => {
    const matchCol = activeCollection === "All" || p.collection === activeCollection;
    const matchFin = activeFinish === "All Finishes" || p.finish === activeFinish;
    const matchDesign = !activeDesign || p.designType.toLowerCase() === activeDesign.toLowerCase();
    const matchColor = activeColor === "All Colours" || p.color === activeColor;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.finish.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q) || p.designType.toLowerCase().includes(q) || p.color.toLowerCase().includes(q);
    return matchCol && matchFin && matchDesign && matchColor && matchSearch;
  });

  const clearAll = () => {
    setActiveCollection("All");
    setActiveFinish("All Finishes");
    setActiveDesign(null);
    setActiveColor("All Colours");
    setSearchQuery("");
    router.replace(basePath, { scroll: false });
  };

  const hasFilter = activeCollection !== "All" || activeFinish !== "All Finishes" || !!activeDesign || activeColor !== "All Colours";
  const waCatalogueLink = `https://wa.me/917027777032?text=${encodeURIComponent("Hi, I'd like to request a copy of the Sanish Laminate catalogue.")}`;

  /* ── Available collections within this category ── */
  const availableCollections = ["All", ...Array.from(new Set(baseProducts.map((p) => p.collection)))];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryLabel, href: basePath },
    ...(breadcrumbLabel ? [{ label: breadcrumbLabel }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={pageTitle}
        image={heroImage}
        description={heroDescription}
        breadcrumb={breadcrumbItems}
        rightSlot={
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B6B80" }} />
            <input
              type="text"
              placeholder="Search finishes, colours…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-[13.5px] outline-none transition-colors rounded-full shadow-sm"
              style={{ background: "white", border: "1px solid rgba(30,30,46,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#f39ba2")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,30,46,0.1)")}
            />
          </div>
        }
      />

      {/* Content */}
      <section className="home-section--compact">
        <div className="site-container flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <aside className="w-full lg:w-[220px] flex-shrink-0">
            <div className="lg:sticky lg:top-[110px] space-y-8">

              {/* Collections */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "var(--text-primary)" }} />
                  <h3 className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>Collections</h3>
                </div>
                <ul className="space-y-0.5">
                  {availableCollections.map((c) => (
                    <li key={c}>
                      <button onClick={() => applyCollection(c)} className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] transition-all duration-200"
                        style={{
                          backgroundColor: activeCollection === c ? "#ac8cc0" : "transparent",
                          color: activeCollection === c ? "white" : "#6B6B80",
                          fontWeight: activeCollection === c ? 600 : 400,
                          fontFamily: "var(--font-jakarta)",
                        }}>
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Design Type — new filter */}
              <div>
                <h3 className="font-semibold text-[13px] mb-4" style={{ color: "var(--text-primary)" }}>Design Type</h3>
                <ul className="space-y-0.5">
                  {(["All Designs", ...designTypes] as string[]).map((d) => {
                    const isAll = d === "All Designs";
                    const isActive = isAll ? !activeDesign : activeDesign?.toLowerCase() === d.toLowerCase();
                    return (
                      <li key={d}>
                        <button
                          onClick={() => applyDesign(isAll ? null : d)}
                          className="w-full text-left px-4 py-2 rounded-xl text-[13px] transition-all duration-200"
                          style={{
                            backgroundColor: isActive ? "rgba(123,158,196,0.12)" : "transparent",
                            color: isActive ? "#ac8cc0" : "#6B6B80",
                            fontWeight: isActive ? 600 : 400,
                            fontFamily: "var(--font-jakarta)",
                          }}>
                          {d}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Finish */}
              <div>
                <h3 className="font-semibold text-[13px] mb-4" style={{ color: "var(--text-primary)" }}>Finish</h3>
                <ul className="space-y-0.5">
                  {finishes.map((f) => (
                    <li key={f}>
                      <button onClick={() => applyFinish(f)} className="w-full text-left px-4 py-2 rounded-xl text-[13px] transition-all duration-200"
                        style={{
                          backgroundColor: activeFinish === f ? "rgba(123,158,196,0.12)" : "transparent",
                          color: activeFinish === f ? "#ac8cc0" : "#6B6B80",
                          fontWeight: activeFinish === f ? 600 : 400,
                          fontFamily: "var(--font-jakarta)",
                        }}>
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colour */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>Colour</h3>
                  {activeColor !== "All Colours" && (
                    <button onClick={() => applyColor("All Colours")} className="text-[11px] hover:underline"
                      style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((color) => {
                    const isActive = activeColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => applyColor(color)}
                        title={color}
                        aria-label={color}
                        aria-pressed={isActive}
                        className="rounded-full transition-transform duration-200 hover:scale-110"
                        style={{
                          width: 26,
                          height: 26,
                          background: COLOR_SWATCH[color] ?? "#ccc",
                          border: color === "White" ? "1px solid rgba(30,30,46,0.15)" : "1px solid rgba(30,30,46,0.08)",
                          boxShadow: isActive ? "0 0 0 2px white, 0 0 0 4px #85addc" : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Active filter chips */}
              {hasFilter && (
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>Active filters</div>
                  {activeCollection !== "All" && (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px]" style={{ backgroundColor: "rgba(123,158,196,0.10)", border: "1px solid rgba(123,158,196,0.2)" }}>
                      <span className="font-semibold" style={{ color: "#ac8cc0", fontFamily: "var(--font-jakarta)" }}>{activeCollection}</span>
                      <button onClick={() => applyCollection("All")} className="text-[13px] hover:opacity-60" style={{ color: "#9B9BB0" }}>×</button>
                    </div>
                  )}
                  {activeDesign && (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px]" style={{ backgroundColor: "rgba(123,158,196,0.10)", border: "1px solid rgba(123,158,196,0.2)" }}>
                      <span className="font-semibold" style={{ color: "#ac8cc0", fontFamily: "var(--font-jakarta)" }}>{activeDesign} Design</span>
                      <button onClick={() => applyDesign(null)} className="text-[13px] hover:opacity-60" style={{ color: "#9B9BB0" }}>×</button>
                    </div>
                  )}
                  {activeFinish !== "All Finishes" && (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px]" style={{ backgroundColor: "rgba(123,158,196,0.10)", border: "1px solid rgba(123,158,196,0.2)" }}>
                      <span className="font-semibold" style={{ color: "#ac8cc0", fontFamily: "var(--font-jakarta)" }}>{activeFinish}</span>
                      <button onClick={() => applyFinish("All Finishes")} className="text-[13px] hover:opacity-60" style={{ color: "#9B9BB0" }}>×</button>
                    </div>
                  )}
                  <button onClick={clearAll} className="text-[11px] w-full text-left hover:underline mt-1" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>Clear all ×</button>
                </div>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-7 text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
              Showing <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{filtered.length}</span> of {baseProducts.length} surfaces
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((product) => (
                  <div key={product.id} className="group block">
                    <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl bg-[#f3f4f6]">
                      <Link href={`/products/${product.slug}`} className="absolute inset-0 block w-full h-full z-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </Link>
                      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                        <span className="text-[9.5px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          {product.collection}
                        </span>
                      </div>
                      {product.badge && (
                        <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                          <span className="text-[9.5px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-full text-white"
                            style={{ backgroundColor: "#fabf7d", fontFamily: "var(--font-jakarta)" }}>
                            {product.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
                        <Link href={`/products/${product.slug}`} className="pointer-events-auto bg-white px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          View Product
                        </Link>
                        <div className="flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto" style={{ transitionDelay: "40ms" }}>
                          <button onClick={() => setQuickView(product)}
                            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white rounded-full px-3.5 py-2 text-[10.5px] font-semibold tracking-wide transition-all border border-white/30"
                            style={{ fontFamily: "var(--font-jakarta)" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            Quick View
                          </button>
                          <a href={waCatalogueLink} target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full transition-all border border-white/30" title="Download Catalogue">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link href={`/products/${product.slug}`} className="block">
                      <h3 className="text-[18px] font-bold mb-1 group-hover:text-[#f39ba2] transition-colors" style={{ color: "var(--text-primary)" }}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{product.finish} · {product.thickness}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed rounded-2xl" style={{ borderColor: "rgba(30,30,46,0.12)" }}>
                <p className="text-[15px] mb-4" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>No surfaces match your filters.</p>
                <button onClick={clearAll} className="text-[13px] font-semibold transition-opacity hover:opacity-70" style={{ color: "#ac8cc0", fontFamily: "var(--font-jakarta)" }}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </>
  );
}
