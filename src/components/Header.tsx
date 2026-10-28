"use client";

import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSiteSettings, useNavData } from "@/components/SiteSettingsProvider";
import BrandMonogram from "@/components/BrandMonogram";
import { ICON_INSTAGRAM, ICON_FACEBOOK, ICON_YOUTUBE, ICON_LINKEDIN } from "@/components/Footer";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import type { SiteSettingsMobileMenu } from "@/lib/siteSettings";

/* ─── Mega menu static data ─────────────────────────────── */
const MEGA_COLLECTIONS_LAMINATES = [
  { name: "S'Shades Premium",   slug: "sshades",      image: "/assets/img/material/shadesCollection.png",         accent: "#85addc" },
  { name: "Thre3",              slug: "thre3",        image: "/assets/img/material/threeCollection.jpg",          accent: "#ac8cc0" },
  { name: "Cool Colour",        slug: "cool-colour",  image: "/assets/img/material/cool_colour_Collection.webp",  accent: "#f39ba2" },
  { name: "Perspective V4",     slug: "08mm",         image: "/assets/img/material/shadesCollection.png",         accent: "#fabf7d" },
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
    label: "Thermo Laminates",
    accent: "#fabf7d",
    collections: MEGA_COLLECTIONS_ASA,
    featuredImage: "/assets/img/material/cool_colour_Collection.webp",
  },
};


const navLinkCls =
  "text-[13px] font-medium text-[var(--text-primary)] pb-0.5 relative transition-colors duration-200 " +
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] " +
  "after:bg-[var(--accent-blue)] after:transition-all after:duration-300 hover:after:w-full hover:text-[var(--accent-blue)]";

/* Small line icons an editor can pick per menu item (CMS > Menus > Mobile Menu). */
const MM_ICONS: Record<string, ReactNode> = {
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" /><path d="M4 19V5" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5-8 8" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v8h14v-8" /><path d="M12 8c-2-4-6-3-5 0 .5 1.5 3 1 5 0zm0 0c2-4 6-3 5 0-.5 1.5-3 1-5 0z" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.2" /></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
};
const mmIcon = (name: string | undefined, size = 18) =>
  name && MM_ICONS[name] ? (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{MM_ICONS[name]}</svg>
  ) : null;

const MM_BLOBS = [
  { cls: "mm-b1", color: "#85ADDC", dur: 14 },
  { cls: "mm-b2", color: "#AC8CC0", dur: 17 },
  { cls: "mm-b3", color: "#F4A0A8", dur: 19 },
  { cls: "mm-b4", color: "#FABF7D", dur: 15 },
];

/** Colours / sizing / effect for the phone menu, from CMS > Site Settings > Mobile Menu. */
function mobileMenuLook(mm?: SiteSettingsMobileMenu) {
  const style = mm?.style || "drawer_right";
  const theme = mm?.theme || "light";
  const isFull = style === "fullscreen";
  const effect: "plain" | "glass" | "liquid" | "image" =
    mm?.effect === "image" && !mm?.bg_image ? "plain" : mm?.effect || (mm?.bg_image ? "image" : "liquid");
  const THEMES = {
    light: { bg: "#ffffff", text: "var(--text-primary)", sub: "#5b5b70", line: "rgba(30,30,46,0.1)", dark: false },
    dark: { bg: "#1E1E2E", text: "#ffffff", sub: "rgba(255,255,255,0.66)", line: "rgba(255,255,255,0.16)", dark: true },
    brand: { bg: "linear-gradient(160deg, var(--theme-primary, #AC8CC0), var(--theme-secondary, #85ADDC))", text: "#ffffff", sub: "rgba(255,255,255,0.8)", line: "rgba(255,255,255,0.24)", dark: true },
  } as const;
  let t: { bg: string; text: string; sub: string; line: string; dark: boolean } = { ...THEMES[theme] };
  let rgb = theme === "dark" ? "30,30,46" : theme === "brand" ? "172,140,192" : "255,255,255";
  const hex = (mm?.bg_color || "").replace("#", "");
  if (/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(hex)) {
    const f = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const lum = (0.299 * parseInt(f.slice(0, 2), 16) + 0.587 * parseInt(f.slice(2, 4), 16) + 0.114 * parseInt(f.slice(4, 6), 16)) / 255;
    rgb = `${parseInt(f.slice(0, 2), 16)},${parseInt(f.slice(2, 4), 16)},${parseInt(f.slice(4, 6), 16)}`;
    t = lum < 0.55
      ? { bg: "#" + f, text: "#ffffff", sub: "rgba(255,255,255,0.68)", line: "rgba(255,255,255,0.18)", dark: true }
      : { bg: "#" + f, text: "#1E1E2E", sub: "#5b5b70", line: "rgba(30,30,46,0.1)", dark: false };
  }
  if (effect === "image") t = { bg: t.bg, text: "#ffffff", sub: "rgba(255,255,255,0.78)", line: "rgba(255,255,255,0.24)", dark: true };

  const panelStyle: CSSProperties = {};
  if (effect === "image") {
    const o = Math.min(90, Math.max(0, mm?.overlay ?? 60)) / 100;
    Object.assign(panelStyle, {
      backgroundImage: `linear-gradient(rgba(20,20,32,${(o * 0.8).toFixed(2)}), rgba(20,20,32,${Math.min(0.95, o * 1.25).toFixed(2)})), url(${mm?.bg_image})`,
      backgroundSize: "cover", backgroundPosition: "center",
    });
  } else if (effect === "glass") {
    Object.assign(panelStyle, { background: `rgba(${rgb},0.58)`, backdropFilter: "blur(26px) saturate(1.5)", WebkitBackdropFilter: "blur(26px) saturate(1.5)" });
  } else if (effect === "liquid") {
    panelStyle.background = !mm?.bg_color && theme === "light" ? "#f7f4fb" : t.bg;
  } else {
    panelStyle.background = t.bg;
  }
  if (style === "drawer_right") Object.assign(panelStyle, { borderTopLeftRadius: 24, borderBottomLeftRadius: 24 });
  if (style === "drawer_left") Object.assign(panelStyle, { borderTopRightRadius: 24, borderBottomRightRadius: 24 });

  const tile = t.dark ? "rgba(255,255,255,0.12)" : effect === "plain" ? "rgba(30,30,46,0.04)" : "rgba(255,255,255,0.55)";
  const motion = ({ off: 0, slow: 1.7, normal: 1, fast: 0.6 } as const)[mm?.motion || "normal"] ?? 1;
  const panelClass = (open: boolean) =>
    isFull
      ? `inset-0 w-screen h-dvh ${open ? "opacity-100 visible" : "opacity-0 invisible"}`
      : style === "drawer_left"
        ? `top-0 left-0 h-dvh w-[min(380px,100vw)] ${open ? "translate-x-0" : "-translate-x-full"}`
        : `top-0 right-0 h-dvh w-[min(380px,100vw)] ${open ? "translate-x-0" : "translate-x-full"}`;
  return { ...t, isFull, effect, tile, motion, tiles: mm?.layout === "tiles", panelStyle, panelClass };
}

export default function Header() {
  const settings = useSiteSettings();
  const nav = useNavData();
  const mm = settings.mobile_menu;
  const look = mobileMenuLook(mm);
  const mobileItems = nav.navLinks.mobile;

  // Dynamic main navigation comes from the API; mega-menu presentation stays consistent here.
  const mainNavLinks = nav.navLinks.main;

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaType | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [openKey, setOpenKey] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
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

            {mainNavLinks
              .filter(l => normPath(l.url) !== "/contact-us")
              .map((l) => {
                const kids = l.children ?? [];
                if (kids.length === 0) {
                  return (
                    <Link key={l.label + l.url} href={l.url || "#"} className={navLinkCls}
                      style={isActive(l.url) ? activeStyle : undefined}
                      target={l.open_new_tab ? "_blank" : undefined}
                      rel={l.open_new_tab ? "noopener noreferrer" : undefined}
                      onClick={() => { setActiveMega(null); setProductsOpen(false); }}>
                      {l.label}
                    </Link>
                  );
                }
                // a link with sub-links: dropdown. Sub-links with a description are cards, those without sit below as a footer link.
                const cards = kids.filter(k => k.subtitle);
                const foot = kids.filter(k => !k.subtitle);
                const dots = ["#85addc", "#ac8cc0", "#fabf7d", "#f39ba2"];
                const open = productsOpen && openKey === l.label;
                return (
                  <div key={l.label} className="relative" style={{ isolation: "isolate" }}>
                    <button
                      className={`${navLinkCls} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                      style={kids.some(k => isActive(k.url)) || (l.url && isActive(l.url)) ? activeStyle : undefined}
                      onClick={() => { setProductsOpen(prev => !(prev && openKey === l.label)); setOpenKey(l.label); setActiveMega(null); }}
                    >
                      {l.label}
                      <svg className="w-3 h-3 opacity-40 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {open && (
                      <div
                        className="absolute left-0"
                        style={{ top: "calc(100% + 14px)", backgroundColor: "white", borderRadius: "18px", minWidth: "230px", padding: "10px", boxShadow: "0 20px 50px rgba(30,30,46,0.14)", border: "1px solid rgba(30,30,46,0.07)", zIndex: 9999, animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
                      >
                        <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
                        {cards.length > 0 && (
                          <div className="px-3 pt-2 pb-1.5 text-[12px] md:text-[9px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                            {l.label === "Products" ? "Product Range" : l.label}
                          </div>
                        )}
                        {cards.map((item, i) => (
                          <Link key={item.url + item.label} href={item.url}
                            className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                            style={{ borderRadius: "12px" }}
                            target={item.open_new_tab ? "_blank" : undefined}
                            onClick={() => setProductsOpen(false)}
                          >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pathname.startsWith(item.url) ? dots[i % dots.length] : "rgba(30,30,46,0.15)" }} />
                            <div>
                              <div className="text-[13px] font-semibold leading-none mb-0.5" style={{ color: pathname.startsWith(item.url) ? "var(--accent-blue)" : "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}>{item.label}</div>
                              <div className="text-[12px] md:text-[10.5px]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>{item.subtitle}</div>
                            </div>
                          </Link>
                        ))}
                        {cards.length > 0 && foot.length > 0 && <div className="h-px mx-3 my-1" style={{ backgroundColor: "rgba(30,30,46,0.06)" }} />}
                        {foot.map((item) => (
                          <Link key={item.url + item.label} href={item.url}
                            className="flex items-center px-3 py-2.5 transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                            style={{ borderRadius: "12px" }}
                            target={item.open_new_tab ? "_blank" : undefined}
                            onClick={() => setProductsOpen(false)}
                          >
                            <span className="text-[12px] font-semibold" style={{ color: "var(--accent-blue)", fontFamily: "var(--font-jakarta)" }}>{item.label} →</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              className="hidden lg:flex"
              href={settings.header.cta_url}
            >
              {settings.header.cta_label}
            </Button>
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
                  className="flex items-center gap-2 mt-5 px-3 text-[12px] md:text-[11.5px] font-semibold transition-colors duration-200"
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
                    <div className="px-3 mb-2 text-[12px] md:text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
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
                    <div className="px-3 mb-2 text-[12px] md:text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
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
                    <div className="inline-block text-[12px] md:text-[9.5px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 mb-4"
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
                      className="flex items-center gap-2 text-[12px] md:text-[11px] font-semibold text-white uppercase tracking-[0.14em] transition-opacity hover:opacity-80 w-fit"
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
              <span className="text-[12px] md:text-[11px] font-semibold" style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}>
                {settings.designs_count || "800+"} Designs Available
              </span>
              <span className="text-[12px] md:text-[11px] text-gray-200">•</span>
              {[
                { label: "Find a Dealer", href: "/find-a-dealer" },
                { label: "Applications",  href: "/applications"  },
              ].map((l) => (
                <Link key={l.label} href={l.href}
                  className="text-[12px] md:text-[11.5px] font-medium hover:text-[var(--accent-blue)] transition-colors"
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

      {/* ── Mobile menu (items, style, theme, background effect, layout and logo all come from the CMS) ── */}
      <div
        className={`fixed inset-0 z-[1100] transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        style={{ backgroundColor: look.effect === "glass" ? "rgba(30,30,46,0.12)" : "rgba(30,30,46,0.35)", backdropFilter: look.effect === "glass" ? "blur(3px)" : "blur(6px)" }}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed z-[1110] overflow-hidden transition-all duration-500 ${look.panelClass(mobileOpen)}`}
        style={look.panelStyle}
        aria-hidden={!mobileOpen}
      >
        {look.effect === "liquid" && (
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
            {MM_BLOBS.map((bl) => (
              <span
                key={bl.cls}
                className={`mm-blob ${bl.cls}`}
                style={{ background: bl.color, opacity: look.dark ? 0.55 : 0.85, ...(look.motion ? { animationDuration: `${(bl.dur * look.motion).toFixed(1)}s` } : { animationName: "none" }) }}
              />
            ))}
            <span className="absolute inset-0" style={{ background: look.dark ? "rgba(20,20,32,0.28)" : "rgba(255,255,255,0.28)" }} />
          </div>
        )}

        <div className={`relative z-10 h-full overflow-y-auto flex flex-col px-5 pt-4 pb-5 ${look.isFull ? "max-w-[520px] mx-auto w-full" : ""}`}>
          <div className="flex items-center justify-between mb-3 shrink-0">
            {mm?.logo_url || settings.logo_dark_url
              ? <img src={mm?.logo_url || settings.logo_dark_url} alt={settings.site_name} className="h-8 w-auto"
                  style={look.dark && !mm?.logo_url ? { filter: "brightness(0) invert(1)" } : undefined} />
              : <BrandMonogram size={18} />}
            <IconButton size="sm" variant={look.dark ? "glass" : "default"} aria-label="Close menu" onClick={() => setMobileOpen(false)}
              style={{ color: look.text, borderColor: look.line }}>
              <X className="w-4 h-4" />
            </IconButton>
          </div>

          {look.tiles ? (
            <nav className="grid grid-cols-2 gap-2 my-auto py-2">
              {mobileItems.map((item, i) => (
                <Link key={`${item.url}-${item.label}`} href={item.url || "#"}
                  target={item.open_new_tab ? "_blank" : undefined}
                  rel={item.open_new_tab ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`${mobileOpen ? "mm-item" : ""} rounded-2xl p-3 flex flex-col justify-center min-h-[64px] ${mobileItems.length % 2 === 1 && i === mobileItems.length - 1 ? "col-span-2" : ""}`}
                  style={{ "--d": `${80 + i * 45}ms`, background: look.tile, border: `1px solid ${look.line}`, color: look.text } as CSSProperties}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="opacity-80">{mmIcon(item.icon, 16)}</span>}
                    <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>{item.label}</span>
                    {item.badge && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide text-white" style={{ background: "#AC8CC0" }}>{item.badge}</span>}
                  </span>
                  {item.subtitle && <span className="text-[11px] mt-0.5" style={{ color: look.sub, fontFamily: "var(--font-jakarta)" }}>{item.subtitle}</span>}
                </Link>
              ))}
            </nav>
          ) : (
            <nav className="flex flex-col my-auto py-1">
              {mobileItems.map((item, i) => {
                const key = `${item.url}-${item.label}`;
                const kids = item.children || [];
                const expanded = subOpen === key;
                return (
                  <div key={key} className={mobileOpen ? "mm-item" : ""} style={{ "--d": `${80 + i * 45}ms` } as CSSProperties}>
                    <div className="flex items-center border-b" style={{ borderColor: look.line }}>
                      <Link href={item.url || "#"}
                        target={item.open_new_tab ? "_blank" : undefined}
                        rel={item.open_new_tab ? "noopener noreferrer" : undefined}
                        onClick={(e) => { if (kids.length && !item.url) { e.preventDefault(); setSubOpen(expanded ? null : key); } else setMobileOpen(false); }}
                        className="flex flex-1 items-center py-2.5 min-w-0"
                      >
                        {item.icon && (
                          <span className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mr-3" style={{ background: look.tile, border: `1px solid ${look.line}`, color: look.text }}>
                            {mmIcon(item.icon, 17)}
                          </span>
                        )}
                        <span className="flex flex-col min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-jakarta)", color: look.text }}>{item.label}</span>
                            {item.badge && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide text-white" style={{ background: "#AC8CC0" }}>{item.badge}</span>}
                          </span>
                          {item.subtitle && <span className="text-[11.5px] mt-0.5" style={{ color: look.sub, fontFamily: "var(--font-jakarta)" }}>{item.subtitle}</span>}
                        </span>
                      </Link>
                      {kids.length > 0 ? (
                        <button type="button" aria-label={expanded ? "Collapse" : "Expand"} aria-expanded={expanded} onClick={() => setSubOpen(expanded ? null : key)}
                          className="shrink-0 w-9 h-9 flex items-center justify-center" style={{ color: look.text }}>
                          <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} style={{ opacity: 0.5 }} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      ) : (
                        <svg className="w-4 h-4 shrink-0 mr-2" style={{ color: look.text, opacity: 0.3 }} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {kids.length > 0 && expanded && (
                      <div className="flex flex-col py-1.5 pl-4 ml-1 border-l" style={{ borderColor: look.line }}>
                        {kids.map((c) => (
                          <Link key={`${c.url}-${c.label}`} href={c.url || "#"}
                            target={c.open_new_tab ? "_blank" : undefined}
                            rel={c.open_new_tab ? "noopener noreferrer" : undefined}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-[14px]" style={{ color: look.text, fontFamily: "var(--font-jakarta)" }}>
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {mm?.show_contact !== false && (
            <div className="grid grid-cols-3 gap-2 mt-3 shrink-0">
              {[
                { href: `tel:${settings.phone_primary.replace(/\s/g, "")}`, label: "Call", icon: mmIcon("phone") },
                { href: `https://wa.me/${(settings.social.whatsapp || "").replace(/\D/g, "")}`, label: "WhatsApp", icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1a7.9 7.9 0 0 1-3.9-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.9 3.4.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2z" /></svg>
                ) },
                { href: `mailto:${settings.email_primary}`, label: "Email", icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                ) },
              ].map((a) => (
                <a key={a.label} href={a.href} target={a.label === "WhatsApp" ? "_blank" : undefined} rel={a.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-1 py-2.5 rounded-2xl text-[11px] font-semibold"
                  style={{ background: look.tile, border: `1px solid ${look.line}`, color: look.text, fontFamily: "var(--font-jakarta)" }}>
                  {a.icon}{a.label}
                </a>
              ))}
            </div>
          )}

          {mm?.show_catalogue !== false && (
            <Link href={settings.header?.cta_url || "/collection"} onClick={() => setMobileOpen(false)} className="btn-pill btn-pill-primary w-full justify-center flex mt-2.5 shrink-0">
              {settings.header?.cta_label || "Download Catalogue"}
            </Link>
          )}

          {mm?.show_social !== false && (() => {
            const links = [
              { href: settings.social.instagram, icon: ICON_INSTAGRAM, label: "Instagram" },
              { href: settings.social.facebook, icon: ICON_FACEBOOK, label: "Facebook" },
              { href: settings.social.linkedin, icon: ICON_LINKEDIN, label: "LinkedIn" },
              { href: settings.social.youtube, icon: ICON_YOUTUBE, label: "YouTube" },
            ].filter((l) => l.href && l.href !== "#");
            return links.length ? (
              <div className="flex items-center justify-center gap-2.5 mt-3.5 shrink-0">
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center p-2.5"
                    style={{ background: look.tile, border: `1px solid ${look.line}`, color: look.text }}>
                    {l.icon}
                  </a>
                ))}
              </div>
            ) : null;
          })()}
        </div>
      </div>
    </>
  );
}
