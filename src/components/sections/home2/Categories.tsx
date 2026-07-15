import Link from "next/link";

const CATEGORIES = [
  {
    name: "High Gloss Laminates",
    desc: "Mirror-perfect surfaces with deep colour saturation. Ideal for modern kitchens and furniture.",
    image: "/assets/img/material/shadesCollection.png",
    tag: "Most Popular",
    accent: "#fabf7d",
  },
  {
    name: "Ultra Matte Finish",
    desc: "Soft-touch, zero-reflectance surfaces. The choice of premium interior designers.",
    image: "/assets/img/material/cool_colour_Collection.webp",
    tag: "Trending",
    accent: "#fabf7d",
  },
  {
    name: "Textured Laminates",
    desc: "Realistic wood grain and stone textures that fool the eye and please the touch.",
    image: "/assets/img/material/threeCollection.jpg",
    tag: "Natural Feel",
    accent: "#fabf7d",
  },
  {
    name: "Metallic Series",
    desc: "Brushed and oxidised metallic effects for contemporary commercial and hospitality spaces.",
    image: "/assets/img/material/shadesCollection.png",
    tag: "Commercial",
    accent: "#fabf7d",
  },
  {
    name: "Fluted Panels",
    desc: "Architectural slatted panels bringing depth and rhythm to feature walls and facades.",
    image: "/assets/img/material/flutedCollection.webp",
    tag: "Architectural",
    accent: "#fabf7d",
  },
  {
    name: "PVC Panels",
    desc: "100% waterproof panels for bathrooms, utility areas, and high-moisture environments.",
    image: "/assets/img/material/cool_colour_Collection.webp",
    tag: "Waterproof",
    accent: "#fabf7d",
  },
];

export default function Home2Categories() {
  return (
    <section className="home-section--compact" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="site-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: "#C4916A" }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
                style={{ color: "#C4916A", fontFamily: "var(--font-heebo)" }}>Product Range</span>
            </div>
            <h2 className="font-medium leading-[1.1]"
              style={{ fontSize: "clamp(34px,4vw,52px)", fontFamily: "var(--font-vogue)", color: "#1C1C1C", letterSpacing: "-0.01em" }}>
              Every Surface.<br /><em>Perfectly Finished.</em>
            </h2>
          </div>
          <Link href="/products"
            className="flex items-center gap-2 text-[13px] font-medium shrink-0 hover:-translate-x-1 transition-transform"
            style={{ color: "#C4916A", fontFamily: "var(--font-heebo)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View All Products
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href="/products"
              className="group relative overflow-hidden block"
              style={{ borderRadius: "24px", aspectRatio: "4/3" }}>
              <img src={cat.image} alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Gradient — navy overlay instead of black */}
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(44,62,80,0.85) 0%, rgba(44,62,80,0.10) 60%)" }} />
              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5"
                  style={{
                    backgroundColor: cat.accent + "22",
                    color: cat.accent,
                    borderRadius: "999px",
                    border: `1px solid ${cat.accent}44`,
                    fontFamily: "var(--font-heebo)",
                  }}>
                  {cat.tag}
                </span>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-[18px] font-bold text-white mb-2 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[13px] text-white/65 leading-[1.5] mb-4 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500"
                  style={{ fontFamily: "var(--font-jakarta)" }}>
                  {cat.desc}
                </p>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-5 h-[1px]" style={{ backgroundColor: cat.accent }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: cat.accent, fontFamily: "var(--font-jakarta)" }}>
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
