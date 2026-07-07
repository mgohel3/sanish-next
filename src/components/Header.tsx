"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useSiteSettings, useNavData } from "@/components/SiteSettingsProvider";
import BrandMonogram from "@/components/BrandMonogram";

/* ─── Mega menu static data ─────────────────────────────── */
const MEGA_COLLECTIONS_LAMINATES = [
  { name: "S'Shades Premium",   slug: "sshades",      image: "/assets/img/material/shadesCollection.png",         accent: "#85addc" },
  { name: "Thre3",              slug: "thre3",        image: "/assets/img/material/threeCollection.jpg",          accent: "#ac8cc0" },
  { name: "Cool Colour",        slug: "cool-colour",  image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#f39ba2" },
  { name: "0.8mm Series",       slug: "08mm",         image: "/assets/img/material/shadesCollection.png",         accent: "#fabf7d" },
];

const MEGA_COLLECTIONS_LOUVERS = [
  { name: "Fluted",             slug: "fluted",       image: "/assets/img/material/flutedCollection.webp",        accent: "#85addc" },
  { name: "Sanish Perspective", slug: "perspective",  image: "/assets/img/material/threeCollection.jpg",          accent: "#ac8cc0" },
];

const MEGA_COLLECTIONS_ASA = [
  { name: "Outdoor Series",     slug: "outdoor",      image: "/assets/img/material/shadesCollection.png",         accent: "#fabf7d" },
  { name: "Weather Guard",      slug: "weather",      image: "/assets/img/material/threeCollection.jpg",          accent: "#f39ba2" },
];

const MEGA_DESIGNS = [
  { label: "Wood Design",    slug: "wood"    },
  { label: "Stone Design",   slug: "stone"   },
  { label: "Fabric Design",  slug: "fabric"  },
  { label: "Solid Colours",  slug: "solid"   },
  { label: "Metallic",       slug: "metallic"},
];

const MEGA_FINISHES = [
  { label: "High Gloss",   slug: "glossy"      },
  { label: "Ultra Matte",  slug: "ultra-matte" },
  { label: "Matte",        slug: "matt"        },
  { label: "Satin",        slug: "satin"       },
  { label: "Suede",        slug: "suede"       },
  { label: "Textured",     slug: "textured"    },
];

type MegaType = "laminates" | "louvers" | "asa-sheets";

const MEGA_CONFIG: Record<MegaType, {
  basePath: string;
  label: string;
  accent: string;
  collections: typeof MEGA_COLLECTIONS_LAMINATES;
  featuredImage: string;
}> = {
  laminates: {
    basePath: "/laminates",
    label: "Laminates",
    accent: "#85addc",
    collections: MEGA_COLLECTIONS_LAMINATES,
    featuredImage: "/assets/img/material/shadesCollection.png",
  },
  louvers: {
    basePath: "/louvers",
    label: "Louvers",
    accent: "#ac8cc0",
    collections: MEGA_COLLECTIONS_LOUVERS,
    featuredImage: "/assets/img/material/flutedCollection.webp",
  },
  "asa-sheets": {
    basePath: "/asa-sheets",
    label: "ASA Sheets",
    accent: "#fabf7d",
    collections: MEGA_COLLECTIONS_ASA,
    featuredImage: "/assets/img/material/cool_colour_Collection.webp",
  },
};


const navLinkCls =
  "text-[13px] font-medium text-[var(--text-primary)] pb-0.5 relative transition-colors duration-200 " +
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] " +
  "after:bg-[var(--accent-blue)] after:transition-all after:duration-300 hover:after:w-full hover:text-[var(--accent-blue)]";

export default function Header() {
  const settings = useSiteSettings();
  const nav = useNavData();

  // Dynamic main navigation comes from the API; mega-menu presentation stays consistent here.
  const mainNavLinks = nav.navLinks.main;

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaType | null>(null);
  const [homeOpen, setHomeOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);

  const megaOpen = activeMega !== null;
  const megaConfig = activeMega ? MEGA_CONFIG[activeMega] : null;

  // Normalise full URLs (from API) to pathname only
  const normPath = (href: string) => {
    if (!href.startsWith("http")) return href;
    try { return new URL(href).pathname; } catch { return href; }
  };

  const isActive = (href: string) => {
    const p = normPath(href);
    return pathname === p || (p !== "/" && pathname.startsWith(p + "/"));
  };
  const isActiveCategory = (type: MegaType) => pathname.startsWith(`/${type}`);

  // Inline style applied to active links — overrides Tailwind utilities with certainty
  const activeStyle = { color: "var(--accent-blue)" };

  useEffect(() => {
    if (!activeMega) return;
    const cols = megaConfig?.collections ?? [];
    if (cols.length === 0) return;
    const id = setInterval(() => setFeaturedIdx(i => (i + 1) % Math.min(cols.length, 4)), 3000);
    return () => clearInterval(id);
  }, [activeMega]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menus on outside click ── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setActiveMega(null);
        setHomeOpen(false);
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      {/* ── Main header ── */}
      <header
        ref={megaRef}
        className={`fixed top-0 left-0 right-0 z-[190] transition-all duration-500 ${
          scrolled ? "py-3.5 border-b border-[var(--color-border-subtle)]" : "py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.86)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="site-container flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src={settings.logo_dark_url} alt={settings.site_name} className="h-9 w-auto object-contain" />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-8">

            {/* HOME dropdown */}
            <div className="relative">
              <button
                className={`${navLinkCls} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                onClick={() => { setHomeOpen((p) => !p); setActiveMega(null); }}
              >
                Home
                <svg
                  className="w-3 h-3 opacity-40 transition-transform duration-300"
                  style={{ transform: homeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Home sub-dropdown */}
              {homeOpen && (
              <div
                className="absolute left-0"
                style={{
                  top: "calc(100% + 14px)",
                  backgroundColor: "white",
                  borderRadius: "18px",
                  minWidth: "210px",
                  padding: "10px",
                  boxShadow: "0 20px 50px rgba(30,30,46,0.12)",
                  border: "1px solid rgba(30,30,46,0.07)",
                  zIndex: 9999,
                  animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both",
                }}
              >
                <div className="px-3 pt-2 pb-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                  Pages
                </div>
                {[
                  { href: "/",      label: "Home",   sub: "Pastel luxury",            dot: "#85addc" },
                  { href: "/home1", label: "Home 1", sub: "Classic dark slider",      dot: "#1E1E2E" },
                  { href: "/home2", label: "Home 2", sub: "Laminates industry",       dot: "#85addc" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                    style={{ borderRadius: "12px" }}
                    onClick={() => setHomeOpen(false)}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pathname === item.href ? item.dot : "rgba(30,30,46,0.15)" }} />
                    <div>
                      <div className="text-[13px] font-semibold leading-none mb-0.5"
                        style={{ color: pathname === item.href ? "var(--accent-blue)" : "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                        {item.label}
                      </div>
                      <div className="text-[10.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
              )}
            </div>

            {/* PRODUCTS — simple dropdown */}
            <div className="relative" style={{ isolation: "isolate" }}>
              <button
                className={`${navLinkCls} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                style={["/laminates", "/louvers", "/asa-sheets", "/products"].some(p => pathname.startsWith(p)) ? activeStyle : undefined}
                onClick={() => { setProductsOpen(prev => !prev); setActiveMega(null); setHomeOpen(false); }}
              >
                Products
                <svg
                  className="w-3 h-3 opacity-40 transition-transform duration-300"
                  style={{ transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {productsOpen && (
                <div
                  className="absolute left-0"
                  style={{
                    top: "calc(100% + 14px)",
                    backgroundColor: "white",
                    borderRadius: "18px",
                    minWidth: "230px",
                    padding: "10px",
                    boxShadow: "0 20px 50px rgba(30,30,46,0.14)",
                    border: "1px solid rgba(30,30,46,0.07)",
                    zIndex: 9999,
                    animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                >
                  <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
                  <div className="px-3 pt-2 pb-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                    Product Range
                  </div>
                  {[
                    { href: "/laminates",  label: "Laminates",  sub: "Decorative surface sheets", dot: "#85addc" },
                    { href: "/louvers",    label: "Louvers",    sub: "Architectural panels",       dot: "#ac8cc0" },
                    { href: "/asa-sheets", label: "ASA Sheets", sub: "Outdoor surfaces",           dot: "#fabf7d" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                      style={{ borderRadius: "12px" }}
                      onClick={() => setProductsOpen(false)}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pathname.startsWith(item.href) ? item.dot : "rgba(30,30,46,0.15)" }} />
                      <div>
                        <div className="text-[13px] font-semibold leading-none mb-0.5"
                          style={{ color: pathname.startsWith(item.href) ? "var(--accent-blue)" : "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          {item.label}
                        </div>
                        <div className="text-[10.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.sub}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="h-px mx-3 my-1" style={{ backgroundColor: "rgba(30,30,46,0.06)" }} />
                  <Link href="/products"
                    className="flex items-center px-3 py-2.5 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                    style={{ borderRadius: "12px" }}
                    onClick={() => setProductsOpen(false)}
                  >
                    <span className="text-[12px] font-semibold" style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>View All Products →</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/collection" className={navLinkCls}
              style={isActive("/collection") ? activeStyle : undefined}
              onClick={() => { setActiveMega(null); setProductsOpen(false); setHomeOpen(false); }}>
              Collection
            </Link>

            {mainNavLinks
              .filter(l => normPath(l.url) !== "/contact-us")
              .map((l) => (
                <Link key={l.url} href={l.url} className={navLinkCls}
                  style={isActive(l.url) ? activeStyle : undefined}
                  target={l.open_new_tab ? "_blank" : undefined}
                  rel={l.open_new_tab ? "noopener noreferrer" : undefined}
                  onClick={() => { setActiveMega(null); setProductsOpen(false); setHomeOpen(false); }}>
                  {l.label}
                </Link>
              ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/5 transition-colors"
              style={{ borderRadius: "50%" }} aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <Link
              href={settings.header.cta_url}
              className="group hidden lg:flex relative overflow-hidden items-center gap-2 text-white text-[11px] font-semibold px-6 py-2.5 transition-all duration-400"
              style={{
                backgroundColor: "var(--accent-blue)", borderRadius: "999px",
                fontFamily: "var(--font-jakarta)", letterSpacing: "0.07em",
                boxShadow: "0 6px 20px rgba(133,173,220,0.30)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-pink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-blue)"; }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/20 skew-x-12" />
              <span className="relative z-10">{settings.header.cta_label}</span>
            </Link>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
            </button>
          </div>
        </div>

        {/* ══ FULL-WIDTH MEGA MENU ══════════════════════════════ */}
        <div
          className="absolute left-0 right-0 transition-all duration-400 overflow-hidden"
          style={{
            top: "100%",
            opacity: megaOpen ? 1 : 0,
            visibility: megaOpen ? "visible" : "hidden",
            transform: megaOpen ? "translateY(0)" : "translateY(-12px)",
            backgroundColor: "white",
            borderTop: "1px solid rgba(30,30,46,0.06)",
            boxShadow: "0 30px 60px rgba(30,30,46,0.12)",
          }}
        >
          <div className="site-container py-10">
            {megaConfig && (
            <div className="grid grid-cols-[1.1fr_1fr_1.1fr] gap-10">

              {/* Col 1: Collections */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: megaConfig.accent }} />
                  <span className="eyebrow">Collections</span>
                </div>
                <ul className="space-y-0.5">
                  {megaConfig.collections.map((col) => (
                    <li key={col.slug}>
                      <Link
                        href={`${megaConfig.basePath}?collection=${col.slug}`}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#F5F3F8]"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: col.accent }} />
                        <span className="text-[13px] font-semibold leading-tight group-hover:text-[var(--accent-blue)] transition-colors"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                          {col.name}
                        </span>
                        <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={megaConfig.basePath}
                  className="flex items-center gap-2 mt-5 px-3 text-[11.5px] font-semibold transition-colors duration-200"
                  style={{ color: megaConfig.accent, fontFamily: "var(--font-jakarta)" }}
                  onClick={() => setActiveMega(null)}
                >
                  View All {megaConfig.label}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Col 2: Browse By */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: megaConfig.accent }} />
                  <span className="eyebrow">Browse By</span>
                </div>
                <div className="flex gap-4">
                  {/* Design Type */}
                  <div className="flex-1">
                    <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                      Design Type
                    </div>
                    <ul className="space-y-0.5">
                      {MEGA_DESIGNS.map((d) => (
                        <li key={d.slug}>
                          <Link href={`${megaConfig.basePath}?design=${d.slug}`}
                            className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#f3f4f6]"
                            onClick={() => setActiveMega(null)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: megaConfig.accent }} />
                            <span className="text-[13px] font-medium group-hover:text-[#f39ba2] transition-colors"
                              style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                              {d.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Finish */}
                  <div className="flex-1">
                    <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                      Finish
                    </div>
                    <ul className="space-y-0.5">
                      {MEGA_FINISHES.map((f) => (
                        <li key={f.slug}>
                          <Link href={`${megaConfig.basePath}?finish=${f.slug}`}
                            className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#f3f4f6]"
                            onClick={() => setActiveMega(null)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: megaConfig.accent }} />
                            <span className="text-[13px] font-medium group-hover:text-[#f39ba2] transition-colors"
                              style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                              {f.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Col 3: Featured rotating card */}
              <div className="relative overflow-hidden" style={{ borderRadius: "20px", minHeight: "320px" }}>
                {megaConfig.collections.slice(0, 4).map((col, i) => (
                  <div key={i} className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: featuredIdx === i ? 1 : 0 }}>
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.25) 100%)" }} />

                <div className="relative z-10 p-7 h-full flex flex-col justify-between" style={{ minHeight: "320px" }}>
                  <div>
                    <div className="inline-block text-[9.5px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 mb-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", borderRadius: "999px", fontFamily: "var(--font-jakarta)" }}>
                      FEATURED
                    </div>
                    <div className="text-[22px] font-bold text-white leading-tight mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {megaConfig.collections[featuredIdx]?.name ?? megaConfig.label}
                    </div>
                    <div className="text-[12px] text-white/65 leading-[1.6]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Premium surface collection for architectural excellence
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`${megaConfig.basePath}?collection=${megaConfig.collections[featuredIdx]?.slug ?? ""}`}
                      className="flex items-center gap-2 text-[11px] font-semibold text-white uppercase tracking-[0.14em] transition-opacity hover:opacity-80 w-fit"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                      onClick={() => setActiveMega(null)}
                    >
                      Explore Collection
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <div className="flex gap-1.5">
                      {megaConfig.collections.slice(0, 4).map((_, i) => (
                        <button key={i} onClick={(e) => { e.preventDefault(); setFeaturedIdx(i); }}
                          style={{
                            width: i === featuredIdx ? "18px" : "6px", height: "6px",
                            borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                            backgroundColor: i === featuredIdx ? megaConfig.accent : "rgba(255,255,255,0.3)",
                            transition: "width 350ms ease, background-color 300ms ease",
                          }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

            {/* Bottom bar */}
            <div className="mt-8 pt-6 border-t flex items-center gap-6 flex-wrap" style={{ borderColor: "rgba(30,30,46,0.07)" }}>
              <span className="text-[11px] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                500+ Designs Available
              </span>
              <span className="text-[11px] text-gray-200">•</span>
              {[
                { label: "Find a Dealer", href: "/find-a-dealer" },
                { label: "Applications",  href: "/applications"  },
              ].map((l) => (
                <Link key={l.label} href={l.href}
                  className="text-[11.5px] font-medium hover:text-[var(--accent-blue)] transition-colors"
                  style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
                  onClick={() => setActiveMega(null)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[299] transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        style={{ backgroundColor: "rgba(30,30,46,0.35)", backdropFilter: "blur(6px)" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed top-0 right-0 h-screen w-[min(380px,100vw)] z-[300] p-8 pt-14 overflow-y-auto transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: "white", borderTopLeftRadius: "24px", borderBottomLeftRadius: "24px" }}
      >
        <button className="absolute top-5 right-5 p-2 hover:bg-black/5 transition-colors"
          style={{ borderRadius: "50%" }} onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
        </button>

        <BrandMonogram size={18} className="mb-8" />

        <nav className="flex flex-col gap-1">
          {[
            { href: "/",             label: "Home",              sub: null },
            { href: "/laminates",    label: "Laminates",         sub: "Decorative surfaces" },
            { href: "/louvers",      label: "Louvers",           sub: "Architectural panels" },
            { href: "/asa-sheets",   label: "ASA Sheets",        sub: "Outdoor surfaces" },
            { href: "/products",     label: "View All Products",  sub: "Full product catalogue" },
            { href: "/collection",   label: "Collection",        sub: "All collections" },
            { href: "/applications", label: "Applications",      sub: null },
            { href: "/about-us",     label: "About Us",          sub: null },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-start justify-between py-3.5 border-b hover:pl-2 transition-all duration-300"
              style={{ borderColor: "rgba(30,30,46,0.07)" }}
              onClick={() => setMobileOpen(false)}
            >
              <div>
                <div className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-jakarta)", color: "var(--text-primary)" }}>{item.label}</div>
                {item.sub && <div className="text-[11px] mt-0.5" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.sub}</div>}
              </div>
              <svg className="w-4 h-4 mt-1 opacity-25" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-3">
          <a href={`tel:${settings.phone_primary.replace(/\s/g, "")}`} className="btn-pill btn-pill-primary w-full justify-center flex">
            Call Us: {settings.phone_primary}
          </a>
          <a href={`mailto:${settings.email_primary}`} className="btn-pill btn-pill-ghost w-full justify-center flex">
            Email Us
          </a>
        </div>
      </div>
    </>
  );
}
