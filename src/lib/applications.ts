export type ApplicationProject = {
  slug: string;
  label: string;
  category: string;
  finish: string;
  src: string;
  tall: boolean;
  // Case study details
  description: string;
  location: string;
  year: string;
  designer?: string;
  area?: string;
  productsUsed: {
    name: string;
    collection: string;
    finish: string;
    usage: string;
    productSlug?: string;
  }[];
  gallery: string[];
  highlights: string[];
};

export const applications: ApplicationProject[] = [
  {
    slug: "modern-kitchen-gloss",
    label: "Modern Kitchen",
    category: "Kitchens",
    finish: "High Gloss White",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400",
    tall: false,
    description: "A complete kitchen transformation for a family home in Delhi NCR. The brief called for a clean, contemporary aesthetic that felt premium yet liveable. Sanish High Gloss White laminates on the cabinet fronts reflect natural light beautifully, making the relatively compact kitchen feel expansive and airy.",
    location: "Delhi NCR, India",
    year: "2025",
    designer: "Studio Forma",
    area: "320 sq ft",
    productsUsed: [
      { name: "S'Shades Pearl White", collection: "S'Shades", finish: "High Gloss", usage: "Upper and lower cabinet shutters", productSlug: "sshades-pearl-white" },
      { name: "Cool Colour Linen Grey", collection: "Cool Colour", finish: "Ultra Matte", usage: "Island countertop fascia and open shelving", productSlug: "cool-colour-linen-grey" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900",
    ],
    highlights: ["Light-reflective High Gloss finish", "Scratch & moisture resistant", "Delivered in 3 working days"],
  },
  {
    slug: "retail-space-stone",
    label: "Retail Space",
    category: "Retail",
    finish: "Textured Stone",
    src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1400",
    tall: true,
    description: "A luxury fragrance boutique in a high-footfall mall required wall cladding that conveyed heritage and sophistication. The Textured Stone laminate from Thre3 was selected for its natural mineral depth — it anchors the space and provides a dramatic backdrop for the product display.",
    location: "Select Citywalk, New Delhi",
    year: "2025",
    designer: "Axis Design Co.",
    area: "650 sq ft",
    productsUsed: [
      { name: "Thre3 Slate Noir", collection: "Thre3", finish: "Textured Stone", usage: "Feature wall behind display shelves and cash counter", productSlug: "thre3-slate-noir" },
      { name: "S'Shades Warm White", collection: "S'Shades", finish: "Matte", usage: "Ceiling coves and side wall panels", productSlug: "sshades-warm-white" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1400",
    ],
    highlights: ["IS:848 fire-retardant grade", "Anti-scuff coating", "Custom cut-to-size panels"],
  },
  {
    slug: "corporate-office-matte",
    label: "Corporate Office",
    category: "Commercial",
    finish: "Ultra Matte",
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400",
    tall: false,
    description: "A 4,000 sq ft co-working office for a fintech startup required a palette that felt calm and focused without being sterile. Ultra Matte laminates in warm charcoal and off-white tones were used across workstation dividers, reception cladding, and break-room cabinetry — achieving a cohesive, brand-aligned environment.",
    location: "Bangalore, Karnataka",
    year: "2024",
    designer: "Workhaus Studio",
    area: "4,000 sq ft",
    productsUsed: [
      { name: "Cool Colour Charcoal", collection: "Cool Colour", finish: "Ultra Matte", usage: "Workstation panel cladding and reception desk", productSlug: "cool-colour-charcoal" },
      { name: "0.8mm Warm White", collection: "0.8mm Series", finish: "Matte", usage: "Break-room cabinets and storage walls", productSlug: "08mm-warm-white" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900",
    ],
    highlights: ["Anti-fingerprint Ultra Matte surface", "Glare-free for screen-heavy workspaces", "Full office fit-out in 6 days"],
  },
  {
    slug: "luxury-living-room",
    label: "Luxury Living Room",
    category: "Residential",
    finish: "Acrylic Pearl",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400",
    tall: false,
    description: "A high-net-worth residential project in Mumbai's Juhu neighbourhood called for a living room that exuded understated luxury. The TV unit and display wall use S'Shades Acrylic Pearl — its luminous, slightly reflective surface catches the evening light and creates a jewel-like focal point without overwhelming the room.",
    location: "Juhu, Mumbai",
    year: "2025",
    designer: "De Sousa Hughes",
    area: "800 sq ft",
    productsUsed: [
      { name: "S'Shades Acrylic Pearl", collection: "S'Shades", finish: "High Gloss", usage: "TV unit shutters and display wall niches", productSlug: "sshades-acrylic-pearl" },
      { name: "Thre3 Warm Linen", collection: "Thre3", finish: "Suede", usage: "Sofa backdrop wall cladding", productSlug: "thre3-warm-linen" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=900",
    ],
    highlights: ["Depth and luminosity from 1mm thickness", "UV stable — no yellowing over time", "Paired with brass inlay detailing"],
  },
  {
    slug: "boutique-hotel-metallic",
    label: "Boutique Hotel",
    category: "Commercial",
    finish: "Metallic Bronze",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
    tall: true,
    description: "A 22-room boutique hotel in Jaipur's heritage zone needed interiors that honoured the city's artisan tradition while appealing to international travellers. Metallic Bronze laminates were specified for corridor accent walls and room headboard panels, creating a warm, gilded atmosphere that complements the property's hand-blocked textile collection.",
    location: "Jaipur, Rajasthan",
    year: "2024",
    designer: "Studio Aapro",
    area: "12,000 sq ft",
    productsUsed: [
      { name: "S'Shades Oxidised Brass", collection: "S'Shades", finish: "Metallic", usage: "Corridor accent wall panels and headboards", productSlug: "oxidized-brass" },
      { name: "Thre3 Terracotta Matte", collection: "Thre3", finish: "Matte", usage: "Wardrobe and minibar unit fronts", productSlug: "thre3-terracotta" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900",
    ],
    highlights: ["Fire-retardant IS:848 certified", "Anti-tarnish metallic coating", "Custom 22-room specification"],
  },
  {
    slug: "premium-kitchen-suede",
    label: "Premium Kitchen",
    category: "Kitchens",
    finish: "Suede Greige",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400",
    tall: false,
    description: "A villa kitchen in Hyderabad's Jubilee Hills required a palette that could bridge a warm, earthy aesthetic with modern European appliances. Suede Greige from the Thre3 collection provided the ideal muted tone — natural-feeling to the touch, highly practical in a busy cooking environment, and compatible with brushed stainless hardware.",
    location: "Jubilee Hills, Hyderabad",
    year: "2025",
    designer: "Patel & Rao Interiors",
    area: "450 sq ft",
    productsUsed: [
      { name: "Thre3 Suede Greige", collection: "Thre3", finish: "Suede", usage: "All cabinet fronts, including pantry unit", productSlug: "thre3-suede-greige" },
      { name: "0.8mm Pale Sage", collection: "0.8mm Series", finish: "Matte", usage: "Island base fascia and overhead storage", productSlug: "08mm-pale-sage" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=900",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900",
    ],
    highlights: ["Soft-touch Suede texture", "Steam and humidity resistant", "Seamless colour match across 68 shutters"],
  },
  {
    slug: "showroom-display",
    label: "Showroom Display",
    category: "Retail",
    finish: "High Gloss Anthracite",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400",
    tall: false,
    description: "A luxury automobile accessories showroom in Pune required display plinths and wall backdrops that let the product take centre stage. High Gloss Anthracite laminates deliver a dramatic, gallery-like backdrop while the reflective surface doubles the visual impact of the displayed merchandise.",
    location: "Koregaon Park, Pune",
    year: "2024",
    designer: "Praxis Design Studio",
    area: "900 sq ft",
    productsUsed: [
      { name: "S'Shades Anthracite Gloss", collection: "S'Shades", finish: "High Gloss", usage: "Feature wall, display plinths, and reception counter", productSlug: "sshades-anthracite" },
      { name: "Cool Colour Arctic White", collection: "Cool Colour", finish: "Ultra Matte", usage: "Ceiling and secondary wall panels", productSlug: "cool-colour-arctic" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900",
    ],
    highlights: ["Mirror-like reflective surface", "Dust and smudge repellent coating", "Installed in a single weekend"],
  },
  {
    slug: "open-plan-office",
    label: "Open Plan Office",
    category: "Commercial",
    finish: "Woodgrain Walnut",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
    tall: false,
    description: "A media agency in Chennai's Nungambakkam district wanted an open-plan studio that balanced creative energy with warmth. Woodgrain Walnut laminates on the acoustic partition panels and library wall add organic texture to an otherwise industrial space with polished concrete floors and exposed ducting.",
    location: "Nungambakkam, Chennai",
    year: "2024",
    designer: "Collective Works",
    area: "2,800 sq ft",
    productsUsed: [
      { name: "Thre3 Walnut Natural", collection: "Thre3", finish: "Textured", usage: "Acoustic partition panels and library wall feature", productSlug: "thre3-walnut" },
      { name: "Cool Colour Slate Grey", collection: "Cool Colour", finish: "Matte", usage: "Modular workstation surfaces", productSlug: "cool-colour-slate" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900",
    ],
    highlights: ["Wood texture without the maintenance", "Abrasion class AC4 rated", "6,000 sq ft of panels specified"],
  },
  {
    slug: "master-bedroom-linen",
    label: "Master Bedroom",
    category: "Residential",
    finish: "Soft Linen Matte",
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400",
    tall: true,
    description: "A penthouse master bedroom in Gurugram's Golf Course Road required wardrobe and headboard finishes that felt calm, tactile, and timeless. Soft Linen Matte from the Cool Colour range was specified for the full-height wardrobe wall. Its chalky, breathable appearance complements the custom upholstered bed and the natural light from floor-to-ceiling windows.",
    location: "Golf Course Road, Gurugram",
    year: "2025",
    designer: "Saakaar Collective",
    area: "600 sq ft",
    productsUsed: [
      { name: "Cool Colour Soft Linen", collection: "Cool Colour", finish: "Matte", usage: "Full-height 14-door wardrobe", productSlug: "cool-colour-soft-linen" },
      { name: "S'Shades Ivory Satin", collection: "S'Shades", finish: "Satin", usage: "Bed headboard panel and side units", productSlug: "sshades-ivory-satin" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1400",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=900",
    ],
    highlights: ["Zero-glare matte surface", "14-door bespoke wardrobe", "Paired with PU lacquer interior linings"],
  },
  {
    slug: "island-kitchen-calacatta",
    label: "Island Kitchen",
    category: "Kitchens",
    finish: "Calacatta Gloss",
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400",
    tall: false,
    description: "An architect's own residence in Ahmedabad's Satellite neighbourhood served as the testing ground for a bold kitchen concept. Calacatta Gloss laminates — with their bold marble-like veining — were used on the island and upper cabinet faces, creating a dramatic tension with the raw concrete ceiling and industrial pendant lighting.",
    location: "Satellite, Ahmedabad",
    year: "2025",
    designer: "Bimal Shah Architects",
    area: "380 sq ft",
    productsUsed: [
      { name: "Thre3 Calacatta Oro", collection: "Thre3", finish: "High Gloss", usage: "Kitchen island faces and upper cabinet shutters", productSlug: "thre3-calacatta" },
      { name: "0.8mm Concrete Grey", collection: "0.8mm Series", finish: "Textured", usage: "Lower cabinet unit base", productSlug: "08mm-concrete" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=900",
    ],
    highlights: ["Stone look without stone weight", "Easy to clean gloss surface", "Featured in Architectural Digest India"],
  },
  {
    slug: "restaurant-interior-fluted",
    label: "Restaurant Interior",
    category: "Commercial",
    finish: "Fluted Oak",
    src: "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1400",
    tall: false,
    description: "A 60-cover farm-to-table restaurant in Bengaluru's Indiranagar used Sanish Fluted laminates to create a warm, textured dining environment that references artisan woodwork without the cost or fragility of real timber. The vertical fluting draws the eye upward, making the compact space feel taller.",
    location: "Indiranagar, Bengaluru",
    year: "2024",
    designer: "The Third Row Studio",
    area: "1,800 sq ft",
    productsUsed: [
      { name: "Fluted Oak Natural", collection: "Fluted", finish: "Textured", usage: "Perimeter wall panels, bar back, and column cladding", productSlug: "fluted-oak-natural" },
      { name: "Thre3 Burnt Umber", collection: "Thre3", finish: "Matte", usage: "Banquette seating panels and host stand", productSlug: "thre3-burnt-umber" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
      "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=900",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900",
    ],
    highlights: ["3D fluted profile adds depth", "Food-safe wipe-clean surface", "60-cover install completed in 4 days"],
  },
  {
    slug: "wardrobe-pure-white",
    label: "Wardrobe & Closet",
    category: "Residential",
    finish: "Pure White Matte",
    src: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1400",
    tall: false,
    description: "A children's bedroom in a Kolkata townhouse was designed around a full-wall wardrobe system using Pure White Matte laminates. The brief prioritised a timeless, adaptable finish that could grow with the child — bright enough to reflect light in the north-facing room, while being forgiving of the inevitable marks and knocks of daily use.",
    location: "Ballygunge, Kolkata",
    year: "2025",
    designer: "Saha & Partners",
    area: "220 sq ft",
    productsUsed: [
      { name: "Cool Colour Pure White", collection: "Cool Colour", finish: "Ultra Matte", usage: "All wardrobe shutter and drawer fronts", productSlug: "cool-colour-pure-white" },
      { name: "0.8mm Blush Pink", collection: "0.8mm Series", finish: "Satin", usage: "Study desk and open shelf inserts", productSlug: "08mm-blush-pink" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=900",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900",
    ],
    highlights: ["Scratch-resistant for children's rooms", "Non-toxic, formaldehyde-free", "White stays white — UV stable"],
  },
];

export function getApplication(slug: string): ApplicationProject | undefined {
  return applications.find((a) => a.slug === slug);
}

export function getRelatedApplications(current: ApplicationProject, limit = 3): ApplicationProject[] {
  return applications
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, limit);
}
