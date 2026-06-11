"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, collections, finishes, type Product } from "@/lib/products";

const COLLECTION_SLUG_MAP: Record<string, string> = {
  sshades:     "S'Shades",
  thre3:       "Thre3",
  "cool-colour": "Cool Colour",
  "08mm":      "0.8mm",
  fluted:      "Fluted",
  perspective: "All",
};

const COLLECTION_TITLE_MAP: Record<string, string> = {
  sshades:     "S'Shades Premium Collection",
  thre3:       "Thre3 Collection",
  "cool-colour": "Cool Colour Collection",
  "08mm":      "0.8mm Series",
  fluted:      "Fluted Collection",
  perspective: "Sanish Perspective Collection",
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

const FINISH_TITLE_MAP: Record<string, string> = {
  matt:          "Matt Finish Laminates",
  glossy:        "Glossy Finish Laminates",
  "ultra-matte": "Ultra Matte Laminates",
  satin:         "Satin Finish Laminates",
  suede:         "Suede Finish Laminates",
  textured:      "Textured Laminates",
  metallic:      "Metallic Laminates",
};

const DESIGN_FINISH_MAP: Record<string, string[]> = {
  wood:   ["Textured"],
  stone:  ["Suede"],
  fabric: ["Satin"],
  solid:  ["High Gloss", "Ultra Matte", "Matte"],
};

const DESIGN_TITLE_MAP: Record<string, string> = {
  wood:   "Wood Design Laminates",
  stone:  "Stone Design Laminates",
  fabric: "Fabric Design Laminates",
  solid:  "Solid Colour Laminates",
};

const BASE = "/product-2";

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
        <div className="w-full md:w-[45%] flex-shrink-0 bg-[#F0EDE8] relative" style={{ minHeight: 280 }}>
          <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-3 left-3 text-[9.5px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: product.badge === "New" ? "#C97A92" : product.badge === "Bestseller" ? "#7B9EC4" : "#E8956D" }}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-7 md:p-9 overflow-y-auto flex flex-col">
          <p className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
            {product.collection} Collection
          </p>
          <h2 className="font-serif mb-1" style={{ fontSize: "clamp(24px,3vw,30px)", color: "var(--text-primary)" }}>
            {product.name}
          </h2>
          <p className="text-[11.5px] tracking-[0.1em] uppercase mb-4" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>{code}</p>
          <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: "#5A5A6A", fontFamily: "var(--font-jakarta)" }}>{product.shortDescription}</p>
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(30,30,46,0.08)" }}>
            {[{ label: "Finish", value: product.finish }, { label: "Thickness", value: product.thickness }, { label: "Size", value: product.dimensions }].map((row, i) => (
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
              style={{ background: "linear-gradient(135deg,#7B9EC4,#5F85AD)", boxShadow: "0 6px 18px rgba(123,158,196,0.35)", fontFamily: "var(--font-jakarta)" }}>
              Enquire Now
            </a>
          </div>
          <Link href={`/products/${product.slug}`} className="mt-3 text-center text-[12px] font-semibold transition-opacity hover:opacity-60"
            style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
            View Full Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCollection, setActiveCollection] = useState("All");
  const [activeFinish, setActiveFinish] = useState("All Finishes");
  const [activeDesign, setActiveDesign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const pageTitle = (() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");
    if (colParam && COLLECTION_TITLE_MAP[colParam]) return COLLECTION_TITLE_MAP[colParam];
    if (finParam && FINISH_TITLE_MAP[finParam]) return FINISH_TITLE_MAP[finParam];
    if (desParam && DESIGN_TITLE_MAP[desParam]) return DESIGN_TITLE_MAP[desParam];
    return "Surface Explorer.";
  })();

  const breadcrumbLabel = (() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");
    if (colParam && COLLECTION_TITLE_MAP[colParam]) return COLLECTION_TITLE_MAP[colParam].replace(" Collection", "").replace(" Series", "");
    if (finParam && FINISH_TITLE_MAP[finParam]) return FINISH_TITLE_MAP[finParam].replace(" Laminates", "");
    if (desParam && DESIGN_TITLE_MAP[desParam]) return DESIGN_TITLE_MAP[desParam].replace(" Laminates", "");
    return null;
  })();

  useEffect(() => {
    const colParam = searchParams.get("collection");
    const finParam = searchParams.get("finish");
    const desParam = searchParams.get("design");

    if (colParam) {
      const colName = COLLECTION_SLUG_MAP[colParam];
      setActiveCollection(colName && colName !== "All" ? colName : "All");
    } else {
      setActiveCollection("All");
    }

    if (desParam) {
      setActiveDesign(desParam);
      setActiveFinish("All Finishes");
    } else {
      setActiveDesign(null);
      if (finParam) {
        const finName = FINISH_SLUG_MAP[finParam];
        setActiveFinish(finName ?? "All Finishes");
      } else {
        setActiveFinish("All Finishes");
      }
    }
  }, [searchParams]);

  const buildUrl = (col: string, fin: string, design: string | null) => {
    const params = new URLSearchParams();
    if (design) { params.set("design", design); return `${BASE}?${params}`; }
    const colSlug = Object.entries(COLLECTION_SLUG_MAP).find(([, v]) => v === col)?.[0];
    const finSlug = Object.entries(FINISH_SLUG_MAP).find(([, v]) => v === fin)?.[0];
    if (col !== "All" && colSlug) params.set("collection", colSlug);
    if (fin !== "All Finishes" && finSlug) params.set("finish", finSlug);
    const q = params.toString();
    return q ? `${BASE}?${q}` : BASE;
  };

  const applyCollection = useCallback((col: string) => {
    setActiveCollection(col);
    setActiveDesign(null);
    router.replace(buildUrl(col, activeFinish, null), { scroll: false });
  }, [router, activeFinish]);

  const applyFinish = useCallback((fin: string) => {
    setActiveFinish(fin);
    setActiveDesign(null);
    router.replace(buildUrl(activeCollection, fin, null), { scroll: false });
  }, [router, activeCollection]);

  const filtered = products.filter((p) => {
    const matchCol = activeCollection === "All" || p.collection === activeCollection;
    const matchFin = activeFinish === "All Finishes" || p.finish === activeFinish;
    const matchDesign = !activeDesign || (DESIGN_FINISH_MAP[activeDesign] ?? []).includes(p.finish);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.finish.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q);
    return matchCol && matchFin && matchDesign && matchSearch;
  });

  const clearAll = () => {
    setActiveCollection("All");
    setActiveFinish("All Finishes");
    setActiveDesign(null);
    setSearchQuery("");
    router.replace(BASE, { scroll: false });
  };

  const hasFilter = activeCollection !== "All" || activeFinish !== "All Finishes" || !!activeDesign;
  const waCatalogueLink = `https://wa.me/917027777032?text=${encodeURIComponent("Hi, I'd like to request a copy of the Sanish Laminate catalogue.")}`;

  return (
    <>
      <section className="pt-[140px] pb-[52px] border-b" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "rgba(30,30,46,0.07)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-6 text-[11px]" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>
            <Link href="/" className="hover:text-[#7B9EC4] transition-colors">Home</Link>
            <span>/</span>
            <Link href={BASE} className="hover:text-[#7B9EC4] transition-colors">Products 2</Link>
            {breadcrumbLabel && (
              <>
                <span>/</span>
                <span style={{ color: "#7B9EC4" }}>{breadcrumbLabel}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(38px,5vw,60px)", color: "var(--text-primary)" }}>
                {pageTitle}
              </h1>
              <p className="mt-2 text-[14px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                {filtered.length} surfaces
                {hasFilter && <span className="ml-2">· <button onClick={clearAll} className="text-[#7B9EC4] hover:underline">Clear filter</button></span>}
              </p>
            </div>

            <div className="w-full md:w-[320px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B6B80" }} />
                <input
                  type="text"
                  placeholder="Search finishes, colours…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 text-[13.5px] outline-none transition-colors rounded-full shadow-sm"
                  style={{ background: "white", border: "1px solid rgba(30,30,46,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7B9EC4")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,30,46,0.1)")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">

          <aside className="w-full lg:w-[220px] flex-shrink-0">
            <div className="lg:sticky lg:top-[110px] space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "var(--text-primary)" }} />
                  <h3 className="font-semibold text-[13px]" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>Collections</h3>
                </div>
                <ul className="space-y-0.5">
                  {collections.map((c) => (
                    <li key={c}>
                      <button onClick={() => applyCollection(c)} className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] transition-all duration-200"
                        style={{
                          backgroundColor: activeCollection === c && !activeDesign ? "#7B9EC4" : "transparent",
                          color: activeCollection === c && !activeDesign ? "white" : "#6B6B80",
                          fontWeight: activeCollection === c && !activeDesign ? 600 : 400,
                          fontFamily: "var(--font-jakarta)",
                        }}>
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[13px] mb-4" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>Finish</h3>
                <ul className="space-y-0.5">
                  {finishes.map((f) => (
                    <li key={f}>
                      <button onClick={() => applyFinish(f)} className="w-full text-left px-4 py-2 rounded-xl text-[13px] transition-all duration-200"
                        style={{
                          backgroundColor: activeFinish === f && !activeDesign ? "rgba(123,158,196,0.12)" : "transparent",
                          color: activeFinish === f && !activeDesign ? "#7B9EC4" : "#6B6B80",
                          fontWeight: activeFinish === f && !activeDesign ? 600 : 400,
                          fontFamily: "var(--font-jakarta)",
                        }}>
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {activeDesign && (
                <div className="px-4 py-3 rounded-xl text-[13px]" style={{ backgroundColor: "rgba(123,158,196,0.08)", border: "1px solid rgba(123,158,196,0.2)" }}>
                  <div className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>Active filter</div>
                  <div className="font-semibold" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
                    {DESIGN_TITLE_MAP[activeDesign!] ?? activeDesign}
                  </div>
                  <button onClick={clearAll} className="text-[11px] mt-1 hover:underline" style={{ color: "#9B9BB0", fontFamily: "var(--font-jakarta)" }}>Clear ×</button>
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-7 text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
              Showing <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{filtered.length}</span> of {products.length} surfaces
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                    <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl bg-[#F0EDE8]">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="text-[9.5px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          {product.collection}
                        </span>
                      </div>
                      {product.badge && (
                        <div className="absolute top-3.5 right-3.5">
                          <span className="text-[9.5px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-full text-white"
                            style={{ backgroundColor: product.badge === "New" ? "#C97A92" : product.badge === "Bestseller" ? "#7B9EC4" : "#E8956D", fontFamily: "var(--font-jakarta)" }}>
                            {product.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                        <span className="bg-white px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transform translate-y-3 group-hover:translate-y-0 transition-all duration-300"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          View Product
                        </span>
                        <div className="flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: "40ms" }}>
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickView(product); }}
                            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white rounded-full px-3.5 py-2 text-[10.5px] font-semibold tracking-wide transition-all border border-white/30"
                            style={{ fontFamily: "var(--font-jakarta)" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            Quick View
                          </button>
                          <a href={waCatalogueLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className="w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full transition-all border border-white/30" title="Download Catalogue">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-[18px] font-bold mb-1 group-hover:text-[#7B9EC4] transition-colors" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                      {product.name}
                    </h3>
                    <p className="text-[12.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{product.finish} · {product.thickness}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed rounded-2xl" style={{ borderColor: "rgba(30,30,46,0.12)" }}>
                <p className="text-[15px] mb-4" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>No surfaces match your filters.</p>
                <button onClick={clearAll} className="text-[13px] font-semibold transition-opacity hover:opacity-70" style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}>
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
