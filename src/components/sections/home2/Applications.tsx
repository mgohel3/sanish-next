"use client";

import { useState } from "react";
import Link from "next/link";

const APPS = [
  {
    id: "kitchen",
    label: "Modular Kitchens",
    desc: "High-moisture, high-traffic environments demand the best. Our laminates are scratch-resistant, moisture-proof, and available in 200+ kitchen-friendly designs — from sleek gloss to warm woodgrain.",
    image: "/assets/img/material/shadesCollection.png",
    tags: ["High Gloss", "Matte", "Woodgrain"],
  },
  {
    id: "wardrobe",
    label: "Wardrobes & Furniture",
    desc: "Premium laminates that elevate every wardrobe shutter, bed panel, and living room cabinet. The wide format sheets minimise joints for a clean, seamless look.",
    image: "/assets/img/material/threeCollection.jpg",
    tags: ["Textured", "Matte", "Solid"],
  },
  {
    id: "office",
    label: "Office Interiors",
    desc: "Create professional, durable office environments with our commercial-grade laminates — workstations, cabinets, partitions, and reception counters.",
    image: "/assets/img/material/cool_colour_Collection.webp",
    tags: ["Metallic", "Wood", "Solid"],
  },
  {
    id: "walls",
    label: "Feature Walls",
    desc: "Fluted panels, decorative laminates, and louver boards that transform blank walls into architectural focal points in homes, hotels, and retail.",
    image: "/assets/img/material/flutedCollection.webp",
    tags: ["Fluted", "Panels", "Louvers"],
  },
  {
    id: "doors",
    label: "Doors & Shutters",
    desc: "Impact-resistant and dimensionally stable laminates for door skins and shutters — maintaining their look through thousands of open/close cycles.",
    image: "/assets/img/material/shadesCollection.png",
    tags: ["High Gloss", "Matte"],
  },
];

export default function Home2Applications() {
  const [active, setActive] = useState(0);
  const app = APPS[active];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="site-container">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: "#C4916A" }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
              style={{ color: "#C4916A", fontFamily: "var(--font-heebo)" }}>Applications</span>
          </div>
          <h2 className="font-medium leading-[1.1]"
            style={{ fontSize: "clamp(34px,4vw,52px)", fontFamily: "var(--font-vogue)", color: "#1C1C1C", letterSpacing: "-0.01em" }}>
            Right Surface for<br /><em>Every Space</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 md:gap-10">
          {/* Tab list */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {APPS.map((a, i) => (
              <button key={a.id} onClick={() => setActive(i)}
                className="shrink-0 lg:shrink text-left px-5 py-4 transition-all duration-200 border-0 cursor-pointer"
                style={{
                  borderRadius: "16px",
                  backgroundColor: i === active ? "#1C1C1C" : "transparent",
                  color: i === active ? "white" : "#5C5C5C",
                  fontFamily: "var(--font-heebo)",
                  fontSize: "14px",
                  fontWeight: i === active ? 600 : 400,
                  borderLeft: i === active ? "3px solid #C4916A" : "3px solid transparent",
                }}>
                {a.label}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6">
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 font-medium leading-tight"
                style={{ fontSize: "clamp(22px,3vw,32px)", fontFamily: "var(--font-heebo)", color: "#1C1C1C" }}>
                {app.label}
              </h3>
              <p className="text-[15px] leading-[1.75] mb-6"
                style={{ color: "#5C5C5C", fontFamily: "var(--font-heebo)" }}>
                {app.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {app.tags.map((t) => (
                  <span key={t} className="text-[11px] font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: "#EDE8E3",
                      color: "#1C1C1C",
                      borderRadius: "999px",
                      border: "1px solid #E5E0D8",
                      fontFamily: "var(--font-heebo)",
                    }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/products"
                className="flex items-center gap-2 text-[13px] font-medium w-fit"
                style={{ color: "#C4916A", fontFamily: "var(--font-heebo)" }}>
                Browse Suitable Designs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "24px", aspectRatio: "4/3" }}>
              <img src={app.image} alt={app.label} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
