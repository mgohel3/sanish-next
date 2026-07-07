export type ProductCategory = "Laminates" | "Louvers" | "ASA Sheets";
export type DesignType = "Wood" | "Stone" | "Fabric" | "Solid" | "Metallic";
export type ProductColor =
  | "White" | "Beige" | "Black" | "Blue" | "Brown" | "Green" | "Grey"
  | "Metallic" | "Multicolor" | "Orange" | "Pink" | "Purple" | "Red" | "Yellow";

export type Product = {
  id: number;
  slug: string;
  name: string;
  collection: string;
  finish: string;
  thickness: string;
  dimensions: string;
  surface: string;
  application: string;
  badge?: "New" | "Bestseller" | "Limited";
  accentColor: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  relatedSlugs: string[];
  category: ProductCategory;
  designType: DesignType;
  color: ProductColor;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "arctic-white",
    name: "Arctic White",
    collection: "S'Shades",
    finish: "High Gloss",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Cabinets, Wardrobes, Wall Panels",
    badge: "Bestseller",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Solid",
    color: "White",
    shortDescription: "A pure, reflective white surface that brings luminosity and the illusion of boundless space to any interior.",
    description: "Arctic White is the cornerstone of the S'Shades collection — a pristine, mirror-like high-gloss laminate that has become the go-to choice for architects and interior designers seeking clean, contemporary aesthetics. Its flawless white surface reflects ambient light beautifully, making smaller spaces feel open and airy while lending a timeless sophistication to larger rooms. Engineered with Sanish Laminates' proprietary surface technology, Arctic White resists fingerprints, moisture, and daily wear, maintaining its showroom brilliance for years.",
    features: ["Scratch Resistant", "Moisture Proof", "Anti-Fingerprint", "UV Stable", "Easy to Clean", "Fire Retardant"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    ],
    relatedSlugs: ["midnight-charcoal", "pearl-beige", "frosted-silver"],
  },
  {
    id: 2,
    slug: "midnight-charcoal",
    name: "Midnight Charcoal",
    collection: "S'Shades",
    finish: "Ultra Matte",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Kitchen, Wardrobes, Feature Walls",
    badge: "New",
    accentColor: "#1E1E2E",
    category: "Laminates",
    designType: "Solid",
    color: "Black",
    shortDescription: "Deep, absorbing charcoal with zero-reflection matte finish — the definitive choice for sophisticated, moody interiors.",
    description: "Midnight Charcoal draws inspiration from the quiet intensity of deep night skies. This ultra-matte laminate features a velvety, light-absorbing surface with absolutely zero reflectance, creating a depth of colour that feels almost three-dimensional. Perfect for creating drama in kitchen cabinetry or as a bold feature wall in commercial spaces, Midnight Charcoal pairs effortlessly with warm metallics, natural woods, and aged brass hardware. Its soft-touch matte finish is fingerprint-resistant and dust-repellent, ensuring it stays pristine even in the most active spaces.",
    features: ["Zero Reflectance", "Soft Touch", "Anti-Fingerprint", "Scratch Resistant", "Moisture Proof", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["arctic-white", "slate-grey", "oxidized-brass"],
  },
  {
    id: 3,
    slug: "oceanic-blue",
    name: "Oceanic Blue",
    collection: "Cool Colour",
    finish: "Suede",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Cabinetry, Furniture, Accent Walls",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Stone",
    color: "Blue",
    shortDescription: "A calming, muted blue inspired by deep waters — perfect for modern cabinetry and statement focal pieces.",
    description: "Oceanic Blue captures the serene depth of open water in a supremely tactile suede finish. Part of the Cool Colour collection, this nuanced blue laminate avoids the garish brightness of typical colour laminates — instead, it offers a sophisticated, dusty mid-tone that sits beautifully between teal and steel blue. The suede texture adds an organic warmth that balances the cool colour temperature, creating a surface that feels both calm and characterful. Ideal for bathroom vanities, bedroom wardrobes, and contemporary living room furniture.",
    features: ["Suede Texture", "Scratch Resistant", "Moisture Proof", "UV Stable", "Anti-Bacterial", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    ],
    relatedSlugs: ["emerald-forest", "dusty-rose", "arctic-white"],
  },
  {
    id: 4,
    slug: "oak-ribbon",
    name: "Oak Ribbon",
    collection: "Fluted",
    finish: "Textured",
    thickness: "1.25mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Architectural Laminate",
    application: "Wall Panels, Doors, Feature Surfaces",
    badge: "Bestseller",
    accentColor: "#85addc",
    category: "Louvers",
    designType: "Wood",
    color: "Brown",
    shortDescription: "Architectural fluted woodgrain texture that adds instant rhythm and warmth to wall panels and room dividers.",
    description: "Oak Ribbon is a statement architectural laminate from Sanish Laminates' Fluted collection — a line dedicated to surfaces that do more than cover a space, they define it. The synchronized flute pattern faithfully replicates the tactile depth of real wood ribbing, while the integrated oak woodgrain beneath adds warmth and authenticity. Whether used as a full feature wall in a living room, as wainscoting in a corridor, or as distinctive door skins, Oak Ribbon creates a rhythm of light and shadow that transforms ordinary surfaces into architectural gestures.",
    features: ["Synchronized Texture", "Deep Emboss", "Scratch Resistant", "Moisture Proof", "Fire Retardant", "Architectural Grade"],
    images: [
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
    ],
    relatedSlugs: ["walnut-flute", "teak-stripe", "desert-sand"],
  },
  {
    id: 5,
    slug: "desert-sand",
    name: "Desert Sand",
    collection: "Thre3",
    finish: "Matte",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Modular Kitchens, Furniture, Wardrobes",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Solid",
    color: "Beige",
    shortDescription: "A warm, earthy beige that serves as the perfect neutral canvas for layering contemporary design elements.",
    description: "Desert Sand is perhaps the most versatile laminate in the Thre3 collection. Its warm, sandy beige tone draws from the rich, golden palette of arid landscapes — a colour that feels simultaneously earthy and refined. In a matte finish, Desert Sand has an almost linen-like quality that pairs naturally with every style, from Scandinavian minimalism to warm Mediterranean interiors. It is the ideal background laminate that lets other design elements shine — a canvas for bold hardware, rich textiles, and architectural lighting.",
    features: ["Matte Finish", "Scratch Resistant", "Moisture Proof", "UV Stable", "Easy to Clean", "Anti-Bacterial"],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["pearl-beige", "arctic-white", "oak-ribbon"],
  },
  {
    id: 6,
    slug: "oxidized-brass",
    name: "Oxidized Brass",
    collection: "Thre3",
    finish: "Metallic",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Metallic Laminate",
    application: "Feature Walls, Reception Desks, Furniture",
    badge: "Limited",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Metallic",
    color: "Metallic",
    shortDescription: "A striking metallic laminate that mimics authentic oxidized brass — all the drama without the weight or maintenance.",
    description: "Oxidized Brass from the Metallic Series brings the timeless prestige of aged brass into the practical world of decorative laminates. The surface captures the natural patination process of real brass — warm golden undertones beneath a textured, slightly darkened surface — creating a look that feels genuinely aged rather than artificial. This is a laminate for spaces that demand attention: hotel lobbies, restaurant interiors, high-end retail environments, and residential feature walls where a touch of old-world glamour is the design brief.",
    features: ["Metallic Effect", "Deep Texture", "Scratch Resistant", "Anti-Tarnish", "Fire Retardant", "Architectural Grade"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    ],
    relatedSlugs: ["frosted-silver", "midnight-charcoal", "pearl-beige"],
  },
  {
    id: 7,
    slug: "slate-grey",
    name: "Slate Grey",
    collection: "0.8mm",
    finish: "Suede",
    thickness: "0.8mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Economy Laminate",
    application: "Budget Furniture, Office Interiors, Partitions",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Stone",
    color: "Grey",
    shortDescription: "Highly durable standard-grade laminate in a versatile industrial grey — maximum utility, minimum fuss.",
    description: "Slate Grey from the 0.8mm collection proves that practicality need not compromise on aesthetics. This economy-grade laminate is engineered for high-volume commercial and residential applications where durability and cost-efficiency are paramount. The industrial grey tone is infinitely versatile — professional enough for office environments, cool enough for modern residential spaces. Its suede-like finish masks minor scuffs and scratches, maintaining a presentable appearance even under heavy daily use. Available in large quantities for bulk projects.",
    features: ["Economy Grade", "Scratch Resistant", "Moisture Proof", "Easy to Clean", "High Durability", "Cost Effective"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["midnight-charcoal", "desert-sand", "arctic-white"],
  },
  {
    id: 8,
    slug: "emerald-forest",
    name: "Emerald Forest",
    collection: "Cool Colour",
    finish: "High Gloss",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Kitchen, Bar Units, Feature Walls",
    badge: "New",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Solid",
    color: "Green",
    shortDescription: "A rich, jewel-toned green with a mirror-like finish — designed for spaces that dare to make a statement.",
    description: "Emerald Forest is the bold, unapologetic hero of the Cool Colour collection. A deep, saturated emerald green in a high-gloss finish, it channels the lush vitality of ancient forests and the opulence of precious gemstones simultaneously. This is a colour laminate for designers who believe that interiors should have personality — kitchens that feel like jewellery boxes, bar units that command the room, statement walls that anchor an entire design narrative. Its high-gloss surface amplifies the colour's depth, creating a mirror-like quality that reflects light in captivating ways.",
    features: ["High Gloss", "Deep Colour", "Scratch Resistant", "Moisture Proof", "UV Stable", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["oceanic-blue", "dusty-rose", "oxidized-brass"],
  },
  {
    id: 9,
    slug: "pearl-beige",
    name: "Pearl Beige",
    collection: "S'Shades",
    finish: "Satin",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Wardrobes, Bedroom Furniture, Living Room",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Fabric",
    color: "Beige",
    shortDescription: "Warm, luminous beige with a silky satin sheen — the sophisticated middle ground between matte and gloss.",
    description: "Pearl Beige occupies that coveted space between matte restraint and gloss exuberance. Its satin finish catches light softly, creating a gentle luminosity that warms any room it inhabits. The pearl-toned beige is a masterclass in nuance — neither cold nor warm in isolation, it responds to its environment, appearing creamy in warm light and silvery in cooler tones. This chameleon quality makes Pearl Beige one of the most adaptable laminates in the S'Shades collection, equally at home in a coastal bedroom retreat or an urban apartment living room.",
    features: ["Satin Finish", "Scratch Resistant", "Moisture Proof", "UV Stable", "Anti-Fingerprint", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["arctic-white", "desert-sand", "frosted-silver"],
  },
  {
    id: 10,
    slug: "frosted-silver",
    name: "Frosted Silver",
    collection: "Thre3",
    finish: "Metallic",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Metallic Laminate",
    application: "Commercial Interiors, Cabinets, Furniture",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Metallic",
    color: "Metallic",
    shortDescription: "Cool, brushed silver with a frosted metallic quality — industrial refinement for contemporary commercial spaces.",
    description: "Frosted Silver delivers the cool precision of industrial design aesthetics in a highly practical laminate format. Its brushed metallic surface has a frosted quality that softens the typical harshness of silver finishes, resulting in a surface that feels refined rather than cold. The subtle directional texture of the brushing adds visual interest and tactile appeal, while practically masking minor surface imperfections. Frosted Silver is a natural choice for contemporary commercial environments, modern kitchens, and any space where a restrained metallic accent is desired.",
    features: ["Metallic Effect", "Brushed Texture", "Scratch Resistant", "Anti-Fingerprint", "Fire Retardant", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    ],
    relatedSlugs: ["oxidized-brass", "midnight-charcoal", "slate-grey"],
  },
  {
    id: 11,
    slug: "dusty-rose",
    name: "Dusty Rose",
    collection: "Cool Colour",
    finish: "Matte",
    thickness: "1.0mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Decorative Laminate",
    application: "Bedroom, Dressing Areas, Boutique Retail",
    accentColor: "#85addc",
    category: "Laminates",
    designType: "Solid",
    color: "Pink",
    shortDescription: "A muted, powdery rose with soft matte finish — feminine without being frivolous, romantic without being retro.",
    description: "Dusty Rose is the Cool Colour collection's most emotionally resonant offering. This muted, powdery pink avoids all the pitfalls of typical pink laminates — it is sophisticated, restrained, and utterly contemporary. Its matte finish gives the colour a chalky, almost mineral quality that recalls the soft pinks of Venetian plaster and French limestone. Whether used in a master bedroom wardrobe, a boutique retail interior, or a hospitality space targeting a design-conscious clientele, Dusty Rose creates spaces that feel intimate, curated, and quietly luxurious.",
    features: ["Matte Finish", "Scratch Resistant", "Moisture Proof", "UV Stable", "Anti-Bacterial", "Easy to Clean"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    ],
    relatedSlugs: ["oceanic-blue", "emerald-forest", "pearl-beige"],
  },
  {
    id: 12,
    slug: "walnut-flute",
    name: "Walnut Flute",
    collection: "Fluted",
    finish: "Textured",
    thickness: "1.25mm",
    dimensions: "8ft × 4ft (2440 × 1220mm)",
    surface: "Architectural Laminate",
    application: "Feature Walls, Headboards, Furniture Fronts",
    badge: "New",
    accentColor: "#85addc",
    category: "Louvers",
    designType: "Wood",
    color: "Brown",
    shortDescription: "Rich walnut woodgrain brought to life with architectural fluting — nature and geometry in perfect dialogue.",
    description: "Walnut Flute is where the warmth of natural walnut meets the precision of architectural geometry. The deep, rich brown tones of the woodgrain are amplified by the regular fluted pattern, creating an interplay of light and shadow that makes the surface appear almost three-dimensional. This is a laminate that works equally well as a headboard wall in a luxury bedroom suite, as door skins in a premium residential project, or as furniture fronts in a high-end hospitality setting. Walnut Flute embodies the enduring design truth that wood and geometry belong together.",
    features: ["Synchronized Texture", "Rich Woodgrain", "Scratch Resistant", "Moisture Proof", "Fire Retardant", "Architectural Grade"],
    images: [
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    ],
    relatedSlugs: ["oak-ribbon", "desert-sand", "oxidized-brass"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as Product[];
}

export const collections = ["All", "S'Shades", "Thre3", "Cool Colour", "Fluted", "0.8mm"];
export const finishes = ["All Finishes", "High Gloss", "Ultra Matte", "Matte", "Satin", "Suede", "Textured", "Metallic"];
export const designTypes: DesignType[] = ["Wood", "Stone", "Fabric", "Solid", "Metallic"];
export const productCategories: ProductCategory[] = ["Laminates", "Louvers", "ASA Sheets"];
export const colors: ProductColor[] = ["White", "Beige", "Black", "Blue", "Brown", "Green", "Grey", "Metallic", "Multicolor", "Orange", "Pink", "Purple", "Red", "Yellow"];
