"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useSiteSettings, useNavData } from "@/components/SiteSettingsProvider";

/* ─── Mega menu static data — exact Sanish structure ─────── */
const MEGA_COLLECTIONS = [
  { name: "S'Shades Premium",   slug: "sshades",      image: "/assets/img/material/shadesCollection.png",         accent: "#7B9EC4" },
  { name: "Thre3",              slug: "thre3",        image: "/assets/img/material/threeCollection.jpg",          accent: "#E8956D" },
  { name: "Cool Colour",        slug: "cool-colour",  image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#C97A92" },
  { name: "0.8mm Series",       slug: "08mm",         image: "/assets/img/material/shadesCollection.png",         accent: "#E8B49A" },
  { name: "Fluted",             slug: "fluted",       image: "/assets/img/material/flutedCollection.webp",        accent: "#9B8FC4" },
  { name: "Sanish Perspective", slug: "perspective",  image: "/assets/img/material/threeCollection.jpg",          accent: "#6BBFA0" },
];

const MEGA_FINISHES = [
  { label: "Matt Finish",   href: "/products?finish=matt"        },
  { label: "Glossy Finish", href: "/products?finish=glossy"      },
  { label: "Suede Finish",  href: "/products?finish=suede"       },
  { label: "Textured",      href: "/products?finish=textured"    },
  { label: "Ultra Matte",   href: "/products?finish=ultra-matte" },
  { label: "Metallic",      href: "/products?finish=metallic"    },
];

const MEGA_DESIGNS = [
  { label: "Wood",         href: "/products?design=wood"    },
  { label: "Stone",        href: "/products?design=stone"   },
  { label: "Fabric",       href: "/products?design=fabric"  },
  { label: "Solid Colors", href: "/products?design=solid"   },
];

/* ─── Products 2 mega menu — grouped categories ──────────── */
const MEGA2_CATEGORIES = [
  {
    label: "Laminates",
    accent: "#7B9EC4",
    items: MEGA_COLLECTIONS.map((c) => ({ label: c.name, href: `/product-2?collection=${c.slug}`, accent: c.accent })),
  },
  {
    label: "Louvers",
    accent: "#E8956D",
    items: [
      { label: "Louvers 1", href: "/product-2?category=louvers-1", accent: "#E8956D" },
      { label: "Louvers 2", href: "/product-2?category=louvers-2", accent: "#E8956D" },
      { label: "Louvers 3", href: "/product-2?category=louvers-3", accent: "#E8956D" },
    ],
  },
  {
    label: "Asa Sheets",
    accent: "#C97A92",
    items: [
      { label: "Asa Sheet 1", href: "/product-2?category=asa-sheet-1", accent: "#C97A92" },
      { label: "Asa Sheet 2", href: "/product-2?category=asa-sheet-2", accent: "#C97A92" },
      { label: "Asa Sheet 3", href: "/product-2?category=asa-sheet-3", accent: "#C97A92" },
    ],
  },
];

const navLinkCls =
  "text-[13px] font-medium text-[var(--text-primary)] pb-0.5 relative " +
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] " +
  "after:bg-[var(--accent-blue)] after:transition-all after:duration-300 hover:after:w-full";

export default function Header() {
  const settings = useSiteSettings();
  const nav = useNavData();

  // Dynamic nav data — main nav and topbar come from API; mega menu uses static MEGA_* arrays above
  const mainNavLinks = nav.navLinks.main;
  const topbarLinks  = nav.navLinks.topbar;

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mega2Open, setMega2Open] = useState(false);
  const [mega2HoveredCat, setMega2HoveredCat] = useState<number | null>(null);
  const [homeOpen, setHomeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [featured2Idx, setFeatured2Idx] = useState(0);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!megaOpen) return;
    const id = setInterval(() => setFeaturedIdx(i => (i + 1) % 4), 3000);
    return () => clearInterval(id);
  }, [megaOpen]);

  useEffect(() => {
    if (!mega2Open) return;
    const id = setInterval(() => setFeatured2Idx(i => (i + 1) % 4), 3000);
    return () => clearInterval(id);
  }, [mega2Open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menus on outside click ── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setMega2Open(false);
        setHomeOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <div className="relative z-[200] border-b border-[var(--color-border-subtle)]"
        style={{ backgroundColor: "var(--bg-secondary)", fontSize: 11, letterSpacing: "0.07em", fontWeight: 500 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-[9px]">
          <div className="hidden md:flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
            <div className="grid grid-cols-2 gap-[0.5px] mr-2">
              {["#7B9EC4","#E8956D","#C97A92","#E8B49A"].map((c) => (
                <span key={c} className="block w-[5px] h-[5px] rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="uppercase tracking-[0.12em] font-semibold" style={{ color: "var(--accent-blue)" }}>
              {settings.header.topbar_badge}
            </span>
          </div>
          <div className="flex items-center gap-5 ml-auto" style={{ fontFamily: "var(--font-jakarta)" }}>
            {[
              ...topbarLinks.slice(0, 2).map(l => ({ label: l.label, href: l.url })),
              { label: settings.email_primary, href: `mailto:${settings.email_primary}` },
              { label: settings.phone_primary, href: `tel:${settings.phone_primary.replace(/\s/g, "")}` },
            ].map((t) => (
              <a key={t.label} href={t.href}
                className="opacity-65 hover:opacity-100 transition-opacity"
                style={{ color: "var(--text-primary)" }}>
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        ref={megaRef}
        className={`fixed left-0 right-0 z-[190] transition-all duration-500 ${
          scrolled
            ? "top-0 py-3.5 border-b border-[var(--color-border-subtle)]"
            : "top-[38px] py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

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
                onClick={() => { setHomeOpen((p) => !p); setMegaOpen(false); }}
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
              <div
                className="absolute top-[calc(100%+14px)] left-0 transition-all duration-300"
                style={{
                  opacity: homeOpen ? 1 : 0,
                  visibility: homeOpen ? "visible" : "hidden",
                  transform: homeOpen ? "translateY(0)" : "translateY(8px)",
                  backgroundColor: "white",
                  borderRadius: "18px",
                  minWidth: "210px",
                  padding: "10px",
                  boxShadow: "0 20px 50px rgba(30,30,46,0.12)",
                  border: "1px solid rgba(30,30,46,0.07)",
                }}
              >
                <div className="px-3 pt-2 pb-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                  Pages
                </div>
                {[
                  { href: "/",      label: "Home",   sub: "Pastel luxury",            dot: "#7B9EC4" },
                  { href: "/home1", label: "Home 1", sub: "Classic dark slider",      dot: "#1E1E2E" },
                  { href: "/home2", label: "Home 2", sub: "Laminates industry",       dot: "#E8956D" },
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
            </div>

            {/* PRODUCTS — triggers full-width mega menu */}
            <div className="relative">
              <button
                className={`${navLinkCls} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                onClick={() => { setMegaOpen((p) => !p); setHomeOpen(false); }}
              >
                Products
                <svg
                  className="w-3 h-3 opacity-40 transition-transform duration-300"
                  style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* PRODUCTS 2 — triggers its own mega menu */}
            <div className="relative">
              <button
                className={`${navLinkCls} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                onClick={() => { setMega2Open((p) => !p); setMegaOpen(false); setHomeOpen(false); }}
              >
                Products 2
                <svg
                  className="w-3 h-3 opacity-40 transition-transform duration-300"
                  style={{ transform: mega2Open ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {mainNavLinks.map((l) => (
              <Link key={l.url} href={l.url} className={navLinkCls}
                target={l.open_new_tab ? "_blank" : undefined}
                rel={l.open_new_tab ? "noopener noreferrer" : undefined}>
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
                boxShadow: "0 6px 20px rgba(123,158,196,0.30)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 30px rgba(123,158,196,0.45)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(123,158,196,0.30)"; }}
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
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-10">
            <div className="grid grid-cols-[1.1fr_1fr_1.1fr] gap-10">

              {/* ── Col 1: Collections ── */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#7B9EC4" }} />
                  <span className="eyebrow">Collections</span>
                </div>
                <ul className="space-y-0.5">
                  {MEGA_COLLECTIONS.map((col) => (
                    <li key={col.slug}>
                      <Link
                        href={`/products?collection=${col.slug}`}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#F5F3F8]"
                        onClick={() => setMegaOpen(false)}
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
                  href="/products"
                  className="flex items-center gap-2 mt-5 px-3 text-[11.5px] font-semibold transition-colors duration-200"
                  style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}
                  onClick={() => setMegaOpen(false)}
                >
                  View All Collections
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* ── Col 2: Browse By (two sub-columns side by side) ── */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#E8956D" }} />
                  <span className="eyebrow">Browse By</span>
                </div>

                <div className="flex gap-4">
                  {/* Finish sub-column */}
                  <div className="flex-1">
                    <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                      Finish
                    </div>
                    <ul className="space-y-0.5">
                      {MEGA_FINISHES.map((f) => (
                        <li key={f.href}>
                          <Link href={f.href}
                            className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#FDF4EE]"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: "#E8956D" }} />
                            <span className="text-[13px] font-medium group-hover:text-[#E8956D] transition-colors"
                              style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                              {f.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Design Type sub-column */}
                  <div className="flex-1">
                    <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                      Design Type
                    </div>
                    <ul className="space-y-0.5">
                      {MEGA_DESIGNS.map((d) => (
                        <li key={d.href}>
                          <Link href={d.href}
                            className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#FDF4EE]"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: "#C97A92" }} />
                            <span className="text-[13px] font-medium group-hover:text-[#C97A92] transition-colors"
                              style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                              {d.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Col 3: Featured (auto-rotating card) ── */}
              <div className="relative overflow-hidden" style={{ borderRadius: "20px", minHeight: "320px" }}>
                {MEGA_COLLECTIONS.slice(0, 4).map((col, i) => (
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
                      {MEGA_COLLECTIONS[featuredIdx]?.name}
                    </div>
                    <div className="text-[12px] text-white/65 leading-[1.6]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Premium surface collection for architectural excellence
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Link
                      href={`/products?collection=${MEGA_COLLECTIONS[featuredIdx]?.slug ?? ""}`}
                      className="flex items-center gap-2 text-[11px] font-semibold text-white uppercase tracking-[0.14em] transition-opacity hover:opacity-80 w-fit"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                      onClick={() => setMegaOpen(false)}
                    >
                      Explore Collection
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <div className="flex gap-1.5">
                      {MEGA_COLLECTIONS.slice(0, 4).map((_, i) => (
                        <button key={i} onClick={(e) => { e.preventDefault(); setFeaturedIdx(i); }}
                          style={{
                            width: i === featuredIdx ? "18px" : "6px", height: "6px",
                            borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                            backgroundColor: i === featuredIdx ? (MEGA_COLLECTIONS[featuredIdx]?.accent ?? "#7B9EC4") : "rgba(255,255,255,0.3)",
                            transition: "width 350ms ease, background-color 300ms ease",
                          }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom bar ── */}
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
                  onClick={() => setMegaOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ══ PRODUCTS 2 MEGA MENU ══════════════════════════════ */}
        <div
          className="absolute left-0 right-0 transition-all duration-400 overflow-hidden"
          style={{
            top: "100%",
            opacity: mega2Open ? 1 : 0,
            visibility: mega2Open ? "visible" : "hidden",
            transform: mega2Open ? "translateY(0)" : "translateY(-12px)",
            backgroundColor: "white",
            borderTop: "1px solid rgba(30,30,46,0.06)",
            boxShadow: "0 30px 60px rgba(30,30,46,0.12)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-10">
            <div className="flex gap-8">

            {/* ── Col 1 + Col 2 wrapped together so mouse leave resets state ── */}
            <div className="flex gap-8 flex-1" onMouseLeave={() => setMega2HoveredCat(null)}>

              {/* ── Col 1: Main categories ── */}
              <div className="w-[200px] flex-shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#7B9EC4" }} />
                  <span className="eyebrow">Collections</span>
                </div>
                <ul className="space-y-0.5">
                  {MEGA2_CATEGORIES.map((cat, idx) => (
                    <li key={cat.label}>
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left"
                        style={{
                          backgroundColor: mega2HoveredCat === idx ? `${cat.accent}14` : "transparent",
                          fontFamily: "var(--font-jakarta)",
                        }}
                        onMouseEnter={() => setMega2HoveredCat(idx)}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.accent }} />
                        <span className="text-[13px] font-semibold leading-tight transition-colors flex-1"
                          style={{ color: mega2HoveredCat === idx ? cat.accent : "var(--text-primary)" }}>
                          {cat.label}
                        </span>
                        <svg className="w-3 h-3 flex-shrink-0 transition-opacity"
                          style={{ opacity: mega2HoveredCat === idx ? 1 : 0.25, color: cat.accent }}
                          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/product-2"
                  className="flex items-center gap-2 mt-5 px-3 text-[11.5px] font-semibold transition-colors duration-200"
                  style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}
                  onClick={() => setMega2Open(false)}
                >
                  View All
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* ── Col 2: Sub-items flyout OR Browse By ── */}
              <div className="min-h-[200px] flex-1">
                {mega2HoveredCat !== null ? (
                  /* Sub-items for hovered category */
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: MEGA2_CATEGORIES[mega2HoveredCat].accent }} />
                      <span className="eyebrow">{MEGA2_CATEGORIES[mega2HoveredCat].label}</span>
                    </div>
                    <div className={MEGA2_CATEGORIES[mega2HoveredCat].items.length > 3 ? "grid grid-cols-2 gap-x-4" : "flex flex-col"}>
                      {MEGA2_CATEGORIES[mega2HoveredCat].items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                          onClick={() => setMega2Open(false)}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${item.accent}12`)}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.accent }} />
                          <span className="text-[13px] font-medium group-hover:opacity-80 transition-opacity"
                            style={{ color: "var(--text-primary)" }}>
                            {item.label}
                          </span>
                          <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            style={{ color: item.accent }}>
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Default: Browse By */
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#E8956D" }} />
                      <span className="eyebrow">Browse By</span>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex-1">
                        <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                          Finish
                        </div>
                        <ul className="space-y-0.5">
                          {MEGA_FINISHES.map((f) => (
                            <li key={f.href}>
                              <Link href={f.href.replace("/products", "/product-2")}
                                className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#FDF4EE]"
                                onClick={() => setMega2Open(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: "#E8956D" }} />
                                <span className="text-[13px] font-medium group-hover:text-[#E8956D] transition-colors"
                                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                                  {f.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <div className="px-3 mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                          Design Type
                        </div>
                        <ul className="space-y-0.5">
                          {MEGA_DESIGNS.map((d) => (
                            <li key={d.href}>
                              <Link href={d.href.replace("/products", "/product-2")}
                                className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#FDF4EE]"
                                onClick={() => setMega2Open(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ backgroundColor: "#C97A92" }} />
                                <span className="text-[13px] font-medium group-hover:text-[#C97A92] transition-colors"
                                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>
                                  {d.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>{/* end Col1+Col2 wrapper */}

              {/* ── Col 3: Featured (auto-rotating card) ── */}
              <div className="relative overflow-hidden flex-shrink-0 w-[340px]" style={{ borderRadius: "20px", minHeight: "320px" }}>
                {MEGA_COLLECTIONS.slice(0, 4).map((col, i) => (
                  <div key={i} className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: featured2Idx === i ? 1 : 0 }}>
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
                      {MEGA_COLLECTIONS[featured2Idx]?.name}
                    </div>
                    <div className="text-[12px] text-white/65 leading-[1.6]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Premium surface collection for architectural excellence
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`/product-2?collection=${MEGA_COLLECTIONS[featured2Idx]?.slug ?? ""}`}
                      className="flex items-center gap-2 text-[11px] font-semibold text-white uppercase tracking-[0.14em] transition-opacity hover:opacity-80 w-fit"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                      onClick={() => setMega2Open(false)}
                    >
                      Explore Collection
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <div className="flex gap-1.5">
                      {MEGA_COLLECTIONS.slice(0, 4).map((_, i) => (
                        <button key={i} onClick={(e) => { e.preventDefault(); setFeatured2Idx(i); }}
                          style={{
                            width: i === featured2Idx ? "18px" : "6px", height: "6px",
                            borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                            backgroundColor: i === featured2Idx ? (MEGA_COLLECTIONS[featured2Idx]?.accent ?? "#7B9EC4") : "rgba(255,255,255,0.3)",
                            transition: "width 350ms ease, background-color 300ms ease",
                          }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom bar ── */}
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
                  onClick={() => setMega2Open(false)}
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

        <div className="grid grid-cols-2 gap-[1px] mb-8 w-fit">
          {["#7B9EC4","#E8956D","#C97A92","#E8B49A"].map((c) => (
            <span key={c} className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        <nav className="flex flex-col gap-1">
          {[
            { href: "/",             label: "Home",             sub: "Pastel luxury" },
            { href: "/home1",        label: "Home 1 — Classic", sub: "Dark slider" },
            { href: "/home2",        label: "Home 2 — Industry", sub: "Laminates focus" },
            { href: "/products",     label: "All Products",     sub: null },
            { href: "/applications", label: "Applications",     sub: null },
            { href: "/about-us",     label: "About Us",         sub: null },
            { href: "/contact-us",   label: "Contact",          sub: null },
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
