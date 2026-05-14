"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

/* ─── Product category data for mega menu ─────────────── */
const megaMenu = {
  finishes: {
    label: "Surface Finishes",
    items: [
      { name: "High Gloss Laminates", desc: "Mirror-like premium surfaces", icon: "✦" },
      { name: "Ultra Matte Finish",   desc: "Soft touch, zero reflectance",  icon: "◈" },
      { name: "Textured Surfaces",    desc: "Natural grain authenticity",    icon: "◉" },
      { name: "Acrylic Laminates",    desc: "Crystal clarity, deep colour",  icon: "◇" },
      { name: "Metallic Series",      desc: "Brushed & oxidised effects",    icon: "◆" },
    ],
  },
  panels: {
    label: "Panels & Décor",
    items: [
      { name: "Decorative Panels",  desc: "Statement wall surfaces",      icon: "▣" },
      { name: "Fluted Panels",      desc: "Architectural texture ribs",   icon: "≡" },
      { name: "Louvers",            desc: "Slatted ventilation décor",    icon: "⫼" },
      { name: "PVC Panels",         desc: "Moisture-proof interiors",     icon: "◫" },
    ],
  },
  collections: [
    { name: "S'Shades",    image: "/assets/img/material/shadesCollection.png",          accent: "#7B9EC4" },
    { name: "Thre3",       image: "/assets/img/material/threeCollection.jpg",           accent: "#E8956D" },
    { name: "Cool Colour", image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#C97A92" },
    { name: "Fluted",      image: "/assets/img/material/flutedCollection.webp",         accent: "#7B9EC4" },
  ],
};

const navLinks = [
  { href: "/surface-explorer", label: "Surface Explorer" },
  { href: "#showcase",       label: "Applications" },
  { href: "/about-us",       label: "About Us" },
  { href: "/contact-us",     label: "Contact" },
];

const navLinkCls =
  "text-[13px] font-medium text-[var(--text-primary)] pb-0.5 relative " +
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] " +
  "after:bg-[var(--accent-blue)] after:transition-all after:duration-300 hover:after:w-full";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);

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
            <div className="grid grid-cols-2 gap-[2.5px] mr-2">
              {["#7B9EC4","#E8956D","#C97A92","#E8B49A"].map((c) => (
                <span key={c} className="block w-[5px] h-[5px] rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="uppercase tracking-[0.12em] font-semibold" style={{ color: "var(--accent-blue)" }}>
              Premium Surface Manufacturing
            </span>
          </div>
          <div className="flex items-center gap-5 ml-auto" style={{ fontFamily: "var(--font-jakarta)" }}>
            {[
              { label: "Dealer Network", href: "#" },
              { label: "Download Catalogue", href: "#" },
              { label: "info@sanishlaminate.com", href: "mailto:info@sanishlaminate.com" },
              { label: "(+91) 7027 777 032", href: "tel:+917027777032" },
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
            <img src="/assets/img/logo/black-logo.svg" alt="Sanish Laminates" className="h-9 w-auto object-contain" />
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
                  { href: "/",      label: "Home",   sub: "Current — Pastel luxury", dot: "#7B9EC4" },
                  { href: "/home1", label: "Home 1", sub: "Classic dark slider",      dot: "#1E1E2E" },
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

            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={navLinkCls}>{l.label}</Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/5 transition-colors"
              style={{ borderRadius: "50%" }} aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <Link
              href="#"
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
              <span className="relative z-10">Download Catalogue</span>
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
            <div className="grid grid-cols-[1fr_1fr_1.2fr_1.1fr] gap-10">

              {/* Col 1 — Surface Finishes */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#7B9EC4" }} />
                  <span className="eyebrow">{megaMenu.finishes.label}</span>
                </div>
                <ul className="space-y-0.5">
                  {megaMenu.finishes.items.map((item) => (
                    <li key={item.name}>
                      <Link href="#"
                        className="group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#F5F3F8]"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="text-[16px] leading-none mt-0.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: "#7B9EC4" }}>{item.icon}</span>
                        <div>
                          <div className="text-[13px] font-semibold leading-tight" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>{item.name}</div>
                          <div className="text-[11px] mt-0.5" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.desc}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2 — Panels & Décor */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#E8956D" }} />
                  <span className="eyebrow">{megaMenu.panels.label}</span>
                </div>
                <ul className="space-y-0.5">
                  {megaMenu.panels.items.map((item) => (
                    <li key={item.name}>
                      <Link href="#"
                        className="group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#FDF4EE]"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="text-[16px] leading-none mt-0.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: "#E8956D" }}>{item.icon}</span>
                        <div>
                          <div className="text-[13px] font-semibold leading-tight" style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>{item.name}</div>
                          <div className="text-[11px] mt-0.5" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.desc}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* View all link */}
                <Link href="#products"
                  className="flex items-center gap-2 mt-5 px-3 text-[11.5px] font-semibold transition-colors duration-200"
                  style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}
                  onClick={() => setMegaOpen(false)}
                >
                  View All Products
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Col 3 — Collections thumbnails */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: "#C97A92" }} />
                  <span className="eyebrow">Collections</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {megaMenu.collections.map((col, i) => (
                    <Link key={col.name} href="/surface-explorer"
                      className="group relative overflow-hidden block"
                      style={{ borderRadius: "14px", height: "100px" }}
                      onClick={() => setMegaOpen(false)}
                      onMouseEnter={() => setFeaturedIdx(i)}
                    >
                      <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-white text-[11px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>{col.name}</div>
                      </div>
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: col.accent }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Col 4 — Featured / CTA panel */}
              <div className="relative overflow-hidden" style={{ borderRadius: "20px", minHeight: "280px" }}>
                {/* Background image cycles with hovered collection */}
                {megaMenu.collections.map((col, i) => (
                  <div key={i} className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: featuredIdx === i ? 1 : 0 }}>
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.3) 100%)" }} />

                <div className="relative z-10 p-7 h-full flex flex-col justify-between" style={{ minHeight: "280px" }}>
                  <div>
                    <div className="text-[9.5px] uppercase tracking-[0.2em] font-semibold text-white/60 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Featured
                    </div>
                    <div className="text-[20px] font-bold text-white leading-tight mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {megaMenu.collections[featuredIdx].name}
                    </div>
                    <div className="text-[12px] text-white/65" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Premium surface collection for architectural excellence
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href="/surface-explorer"
                      className="flex items-center gap-2 text-[11px] font-semibold text-white uppercase tracking-[0.14em] transition-opacity hover:opacity-80"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                      onClick={() => setMegaOpen(false)}
                    >
                      Explore Collection
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                      {megaMenu.collections.map((_, i) => (
                        <button key={i} onClick={(e) => { e.preventDefault(); setFeaturedIdx(i); }}
                          style={{ width: i === featuredIdx ? "18px" : "6px", height: "6px", borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                            backgroundColor: i === featuredIdx ? megaMenu.collections[featuredIdx].accent : "rgba(255,255,255,0.3)",
                            transition: "width 350ms ease, background-color 300ms ease" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom quick links bar */}
            <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: "rgba(30,30,46,0.07)" }}>
              <div className="flex items-center gap-8">
                {["Sustainability", "Find a Dealer", "Technical Support", "Project Gallery"].map((l) => (
                  <Link key={l} href="#"
                    className="text-[11.5px] font-medium hover:text-[var(--accent-blue)] transition-colors"
                    style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
                    onClick={() => setMegaOpen(false)}
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>500+ designs available</span>
                <div className="flex gap-1">
                  {["#7B9EC4","#E8956D","#C97A92","#E8B49A"].map((c) => (
                    <span key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
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

        <div className="grid grid-cols-2 gap-[3px] mb-8 w-fit">
          {["#7B9EC4","#E8956D","#C97A92","#E8B49A"].map((c) => (
            <span key={c} className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        <nav className="flex flex-col gap-1">
          {[
            { href: "/",            label: "Home",            sub: "Pastel luxury" },
            { href: "/home1",       label: "Home 1 — Classic", sub: "Dark slider" },
            { href: "#products",    label: "Products",         sub: null },
            { href: "/surface-explorer", label: "Surface Explorer", sub: null },
            { href: "#showcase",    label: "Applications",     sub: null },
            { href: "/about-us",    label: "About Us",         sub: null },
            { href: "/contact-us",  label: "Contact",          sub: null },
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
          <a href="tel:+917027777032" className="btn-pill btn-pill-primary w-full justify-center flex">
            Call Us: +91 7027 777 032
          </a>
          <a href="mailto:info@sanishlaminate.com" className="btn-pill btn-pill-ghost w-full justify-center flex">
            Email Us
          </a>
        </div>
      </div>
    </>
  );
}
