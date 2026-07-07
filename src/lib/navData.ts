export interface NavLinkItem {
  label: string;
  url: string;
  open_new_tab: boolean;
  position: number;
}

export interface NavData {
  main: NavLinkItem[];
  topbar: NavLinkItem[];
  mega_quick: NavLinkItem[];
  footer_company: NavLinkItem[];
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  mega_group: "none" | "finishes" | "panels";
  mega_icon: string;
  mega_description: string;
  mega_position: number;
  status: string;
}

export interface CollectionItem {
  id: number;
  name: string;
  slug: string;
  show_in_mega_menu: boolean;
  mega_accent_color: string;
  mega_position: number;
  images: { url: string }[];
  status: string;
}

export interface MegaNavData {
  navLinks: NavData;
  categories: CategoryItem[];
  collections: CollectionItem[];
}

// Static fallbacks — used when API is unreachable
export const DEFAULT_NAV: NavData = {
  main: [
    { label: "Applications", url: "/applications", open_new_tab: false, position: 1 },
    { label: "About Us",     url: "/about-us",     open_new_tab: false, position: 2 },
  ],
  topbar: [
    { label: "Dealer Network",     url: "#",                          open_new_tab: false, position: 1 },
    { label: "Download Catalogue", url: "#",                          open_new_tab: false, position: 2 },
  ],
  mega_quick: [
    { label: "Sustainability",    url: "#", open_new_tab: false, position: 1 },
    { label: "Find a Dealer",     url: "#", open_new_tab: false, position: 2 },
    { label: "Technical Support", url: "#", open_new_tab: false, position: 3 },
    { label: "Project Gallery",   url: "#", open_new_tab: false, position: 4 },
  ],
  footer_company: [],
};

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "High Gloss Laminates", slug: "high-gloss", mega_group: "finishes", mega_icon: "✦", mega_description: "Mirror-like premium surfaces",    mega_position: 0, status: "published" },
  { id: 2, name: "Ultra Matte Finish",   slug: "ultra-matte", mega_group: "finishes", mega_icon: "◈", mega_description: "Soft touch, zero reflectance",   mega_position: 1, status: "published" },
  { id: 3, name: "Textured Surfaces",    slug: "textured",    mega_group: "finishes", mega_icon: "◉", mega_description: "Natural grain authenticity",     mega_position: 2, status: "published" },
  { id: 4, name: "Acrylic Laminates",    slug: "acrylic",     mega_group: "finishes", mega_icon: "◇", mega_description: "Crystal clarity, deep colour",   mega_position: 3, status: "published" },
  { id: 5, name: "Metallic Series",      slug: "metallic",    mega_group: "finishes", mega_icon: "◆", mega_description: "Brushed & oxidised effects",     mega_position: 4, status: "published" },
  { id: 6, name: "Decorative Panels",   slug: "decorative",  mega_group: "panels",   mega_icon: "▣", mega_description: "Statement wall surfaces",        mega_position: 0, status: "published" },
  { id: 7, name: "Fluted Panels",        slug: "fluted",      mega_group: "panels",   mega_icon: "≡", mega_description: "Architectural texture ribs",     mega_position: 1, status: "published" },
  { id: 8, name: "Louvers",             slug: "louvers",     mega_group: "panels",   mega_icon: "⫼", mega_description: "Slatted ventilation décor",       mega_position: 2, status: "published" },
  { id: 9, name: "PVC Panels",           slug: "pvc",         mega_group: "panels",   mega_icon: "◫", mega_description: "Moisture-proof interiors",        mega_position: 3, status: "published" },
];

export const DEFAULT_COLLECTIONS: CollectionItem[] = [
  { id: 1, name: "S'Shades",    slug: "sshades",      show_in_mega_menu: true, mega_accent_color: "#ac8cc0", mega_position: 0, images: [{ url: "/assets/img/material/shadesCollection.png" }],         status: "published" },
  { id: 2, name: "Thre3",       slug: "thre3",        show_in_mega_menu: true, mega_accent_color: "#ac8cc0", mega_position: 1, images: [{ url: "/assets/img/material/threeCollection.jpg" }],          status: "published" },
  { id: 3, name: "Cool Colour", slug: "cool-colour",  show_in_mega_menu: true, mega_accent_color: "#ac8cc0", mega_position: 2, images: [{ url: "/assets/img/material/cool_colour_Collection.webp" }],  status: "published" },
  { id: 4, name: "Fluted",      slug: "fluted-col",   show_in_mega_menu: true, mega_accent_color: "#ac8cc0", mega_position: 3, images: [{ url: "/assets/img/material/flutedCollection.webp" }],        status: "published" },
];

export async function getMegaNavData(): Promise<MegaNavData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  const opts = { next: { revalidate: 300 } };

  const [navRes, catRes, colRes] = await Promise.allSettled([
    fetch(`${apiUrl}/nav-links/`,   opts),
    fetch(`${apiUrl}/categories/`,  opts),
    fetch(`${apiUrl}/collections/`, opts),
  ]);

  const navLinks: NavData = navRes.status === "fulfilled" && navRes.value.ok
    ? await navRes.value.json()
    : DEFAULT_NAV;

  const rawCats: CategoryItem[] = catRes.status === "fulfilled" && catRes.value.ok
    ? await catRes.value.json()
    : DEFAULT_CATEGORIES;

  const rawCols: CollectionItem[] = colRes.status === "fulfilled" && colRes.value.ok
    ? await colRes.value.json()
    : DEFAULT_COLLECTIONS;

  // Merge defaults: if API returns empty, use defaults
  const categories = rawCats.length > 0 ? rawCats.filter(c => c.status === "published" && c.mega_group !== "none") : DEFAULT_CATEGORIES;
  const collections = rawCols.length > 0 ? rawCols.filter(c => c.status === "published" && c.show_in_mega_menu) : DEFAULT_COLLECTIONS;

  // Merge nav defaults for any missing groups
  const navData: NavData = {
    main:           (navLinks.main          || []).length > 0 ? navLinks.main          : DEFAULT_NAV.main,
    topbar:         (navLinks.topbar        || []).length > 0 ? navLinks.topbar        : DEFAULT_NAV.topbar,
    mega_quick:     (navLinks.mega_quick    || []).length > 0 ? navLinks.mega_quick    : DEFAULT_NAV.mega_quick,
    footer_company: navLinks.footer_company || [],
  };

  return { navLinks: navData, categories, collections };
}
