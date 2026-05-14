"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Sample catalogue data based on the website's themes
const categories = ["All", "S'Shades", "Thre3", "Cool Colour", "Fluted", "0.8mm"];

const products = [
  { id: 1, name: "Arctic White", category: "S'Shades", finish: "High Gloss", thickness: "1.0mm", image: "/assets/img/material/shadesCollection.png", desc: "A pure, reflective white surface that brings incredible light and an illusion of space to any interior." },
  { id: 2, name: "Midnight Charcoal", category: "S'Shades", finish: "Ultra Matte", thickness: "1.0mm", image: "/assets/img/material/threeCollection.jpg", desc: "Deep, absorbing charcoal with a zero-reflection matte finish for sophisticated, moody spaces." },
  { id: 3, name: "Oceanic Blue", category: "Cool Colour", finish: "Suede", thickness: "1.0mm", image: "/assets/img/material/cool_colour_Collection.webp", desc: "A calming, muted blue inspired by deep waters, perfect for modern cabinetry and focal pieces." },
  { id: 4, name: "Oak Ribbon", category: "Fluted", finish: "Textured", thickness: "1.25mm", image: "/assets/img/material/flutedCollection.webp", desc: "Architectural fluted woodgrain texture that adds instant rhythm and warmth to wall panels." },
  { id: 5, name: "Desert Sand", category: "Thre3", finish: "Matte", thickness: "1.0mm", image: "/assets/img/material/08mmCollection.webp", desc: "A warm, earthy beige that serves as the perfect neutral canvas for contemporary designs." },
  { id: 6, name: "Brushed Brass", category: "Thre3", finish: "Metallic", thickness: "1.0mm", image: "/assets/img/material/shadesCollection.png", desc: "A striking metallic laminate that mimics authentic brushed brass without the weight or maintenance." },
  { id: 7, name: "Slate Grey", category: "0.8mm", finish: "Suede", thickness: "0.8mm", image: "/assets/img/material/threeCollection.jpg", desc: "Highly durable standard grade laminate in a versatile industrial grey." },
  { id: 8, name: "Emerald Forest", category: "Cool Colour", finish: "High Gloss", thickness: "1.0mm", image: "/assets/img/material/cool_colour_Collection.webp", desc: "A rich, jewel-toned green with a mirror-like finish for statement interiors." },
];

export default function SurfaceExplorerPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.finish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }} className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="pt-[160px] pb-[60px] bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4 font-semibold">
                Catalogue
              </div>
              <h1 className="font-serif text-[clamp(40px,5vw,64px)] text-[var(--text-primary)] leading-tight">
                Surface Explorer.
              </h1>
            </div>
            
            <div className="w-full md:w-[320px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  placeholder="Search finishes, colors..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] pl-12 pr-4 py-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors rounded-full shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Content */}
      <section className="py-[60px]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-[240px] flex-shrink-0">
            <div className="sticky top-[120px]">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-4 h-4 text-[var(--text-primary)]" />
                <h3 className="font-semibold text-[15px] text-[var(--text-primary)]">Collections</h3>
              </div>
              
              <ul className="space-y-1">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[14px] transition-all duration-200 ${
                        activeCategory === cat 
                          ? "bg-[var(--accent-blue)] text-white font-medium shadow-md" 
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 text-[13px] text-[var(--text-secondary)]">
              Showing <span className="font-medium text-[var(--text-primary)]">{filteredProducts.length}</span> surfaces
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="group cursor-pointer flex flex-col"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-xl bg-[#F5F5F5]">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full text-[var(--text-primary)]">
                          {product.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-[var(--text-primary)] px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Quick View
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-1">{product.name}</h3>
                      <p className="text-[13px] text-[var(--text-secondary)]">{product.finish} • {product.thickness}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-2xl">
                <p className="text-[var(--text-secondary)] text-[15px]">No surfaces found matching your criteria.</p>
                <button 
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="mt-4 text-[var(--accent-blue)] font-medium text-[14px] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[rgba(10,10,15,0.6)] backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative bg-white w-full max-w-[1000px] max-h-[90vh] rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-[#F5F5F5] relative">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 font-semibold">
                {selectedProduct.category} Collection
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,36px)] text-[var(--text-primary)] mb-6 leading-tight">
                {selectedProduct.name}
              </h2>
              
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-8">
                {selectedProduct.desc}
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Finish</span>
                  <span className="text-[14px] font-semibold text-[var(--text-primary)]">{selectedProduct.finish}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Thickness</span>
                  <span className="text-[14px] font-semibold text-[var(--text-primary)]">{selectedProduct.thickness}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Dimensions</span>
                  <span className="text-[14px] font-semibold text-[var(--text-primary)]">8ft x 4ft (2440mm x 1220mm)</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={`/contact-us?subject=Inquiry about ${selectedProduct.name}`}
                  className="w-full text-center py-4 bg-[var(--accent-blue)] text-white text-[13px] font-medium tracking-wide hover:bg-[var(--text-primary)] transition-colors rounded-lg shadow-lg shadow-blue-500/20"
                >
                  INQUIRE NOW
                </a>
                <button 
                  className="w-full text-center py-4 bg-transparent border border-[var(--border)] text-[var(--text-primary)] text-[13px] font-medium tracking-wide hover:bg-[var(--bg-secondary)] transition-colors rounded-lg"
                >
                  ORDER SAMPLE
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
