/** Catalog data — Vibe Mode products. */

export type ProductStatus = "Active" | "Out of Stock" | "Draft" | "Archived";
export type Badge = "Bestseller" | "New" | "Limited" | "Restocked";

export type GenreSlug =
  | "anime"
  | "superheroes"
  | "gaming"
  | "music"
  | "movies"
  | "minimal"
  | "streetwear"
  | "y2k"
  | "vintage"
  | "nature"
  | "abstract"
  | "typography";

export interface GenreMeta {
  slug: GenreSlug;
  label: string;
  sub: string;
  accent: string;
}

export const genres: GenreMeta[] = [
  { slug: "anime",       label: "Anime",        sub: "Manga panels, Shōnen energy",      accent: "linear-gradient(135deg, #f472b6 0%, #e11d48 100%)" },
  { slug: "superheroes", label: "Superheroes",  sub: "Capes, comics, hero drops",         accent: "linear-gradient(135deg, #ef4444 0%, #1d4ed8 100%)" },
  { slug: "gaming",      label: "Gaming",       sub: "Pixel art, loot, speedruns",        accent: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" },
  { slug: "music",       label: "Music",        sub: "Lyrics, tour merch, cassettes",     accent: "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)" },
  { slug: "movies",      label: "Movies",       sub: "Posters, quotes, cult classics",    accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
  { slug: "streetwear",  label: "Streetwear",   sub: "Boxy fits, oversized graphics",     accent: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)" },
  { slug: "y2k",         label: "Y2K",          sub: "Chrome, sparkles, early 2000s",     accent: "linear-gradient(135deg, #22d3ee 0%, #e879f9 100%)" },
  { slug: "vintage",     label: "Vintage",      sub: "Faded hues, nostalgia, retro",      accent: "linear-gradient(135deg, #d97706 0%, #78350f 100%)" },
  { slug: "nature",      label: "Nature",       sub: "Flora, fauna, earth tones",         accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)" },
  { slug: "minimal",     label: "Minimal",      sub: "Clean lines, mono palettes",         accent: "linear-gradient(135deg, #94a3b8 0%, #1e293b 100%)" },
  { slug: "abstract",    label: "Abstract",     sub: "Shapes, color plays, non-figurative", accent: "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%)" },
  { slug: "typography",  label: "Typography",   sub: "Letterforms, slogans, type art",    accent: "linear-gradient(135deg, #1a1a1a 0%, #525252 100%)" },
];

const teeIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10 7 18l5 3 3-3v18h18V18l3 3 5-3-7-8h-6a4 4 0 0 1-8 0Z"/></svg>`;
const hoodieIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 11 7 20l5 4 3-3v15h18V21l3 3 5-4-7-9h-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2Z"/><path d="M19 18c0 3 2.5 5 5 5s5-2 5-5"/></svg>`;
const sweatIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10h18l6 10-4 3v13H13V23l-4-3Z"/><path d="M21 10c0 2 1.5 3 3 3s3-1 3-3"/></svg>`;
const capIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 30c0-10 7-18 16-18s16 8 16 18Z"/><path d="M5 30h38a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2Z"/><circle cx="24" cy="18" r="2" fill="currentColor"/></svg>`;
const toteIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16h28l-2 24H12Z"/><path d="M18 16v-2a6 6 0 0 1 12 0v2"/></svg>`;
const caseIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="5" width="20" height="38" rx="4"/><circle cx="24" cy="38" r="1.5" fill="currentColor"/><path d="M20 10h8"/></svg>`;
const posterIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="28" height="36" rx="3"/><path d="m15 32 6-9 7 8 4-5 6 8"/><circle cx="20" cy="16" r="2.5"/></svg>`;
const mugIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14h22v22a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4Z"/><path d="M32 20h3a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-3"/></svg>`;
const metalIcon = `<svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="10" width="32" height="28" rx="3"/><path d="M8 20h32"/><path d="m14 14 2 2"/><path d="m32 14 2 2"/><circle cx="24" cy="30" r="4"/></svg>`;

export interface CategoryMeta {
  slug: string;
  label: string;
  count: number;
  share: string;
  icon: string;
  accent: string;
}

export const categories: CategoryMeta[] = [
  { slug: "tees",        label: "T-Shirts",    count: 128, share: "28%", icon: teeIcon,    accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" },
  { slug: "hoodies",     label: "Hoodies",     count: 86,  share: "22%", icon: hoodieIcon, accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)" },
  { slug: "sweatshirts", label: "Sweatshirts", count: 42,  share: "9%",  icon: sweatIcon,  accent: "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)" },
  { slug: "caps",        label: "Caps",        count: 28,  share: "6%",  icon: capIcon,    accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)" },
  { slug: "totes",       label: "Totes",       count: 36,  share: "11%", icon: toteIcon,   accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
  { slug: "cases",       label: "Cases",       count: 54,  share: "8%",  icon: caseIcon,   accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)" },
  { slug: "posters",     label: "Posters",     count: 68,  share: "9%",  icon: posterIcon, accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)" },
  { slug: "mugs",        label: "Mugs",        count: 12,  share: "4%",  icon: mugIcon,    accent: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)" },
  { slug: "metal",       label: "Metal Prints", count: 8,  share: "3%",  icon: metalIcon,  accent: "linear-gradient(135deg, #94a3b8 0%, #334155 100%)" },
];

export interface Product {
  id: string;
  name: string;
  category: string; // slug
  categoryLabel: string;
  icon: string;
  accent: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  sizes: string[];
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  revenue: string;
  spark: number[];
  status: ProductStatus;
  badge?: Badge;
  genre?: GenreSlug;
}

export const products: Product[] = [
  { id: "p01", name: "Good Energy Tee",         category: "tees",        categoryLabel: "T-Shirts",    icon: teeIcon,    accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", priceMin: 240, priceMax: 280, colors: ["#F9F6EE", "#1A1A1A", "#0033FF"], sizes: ["S","M","L","XL"], stock: 182, sold: 1248, rating: 4.8, reviews: 320, revenue: "₹3,09,120", spark: [12, 18, 14, 26, 22, 34, 30, 42, 48, 52, 64, 72, 68, 84], status: "Active", badge: "Bestseller", genre: "typography" },
  { id: "p02", name: "Different People Hoodie", category: "hoodies",     categoryLabel: "Hoodies",     icon: hoodieIcon, accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", priceMin: 480, priceMax: 540, colors: ["#1A1A1A", "#F9F6EE"], sizes: ["S","M","L","XL"], stock: 0, sold: 842, rating: 4.7, reviews: 210, revenue: "₹4,07,520", spark: [18, 24, 28, 36, 42, 48, 52, 58, 62, 66, 70, 76, 82, 88], status: "Out of Stock", badge: "Bestseller", genre: "streetwear" },
  { id: "p03", name: "Vibe Mode Cap",            category: "caps",        categoryLabel: "Caps",        icon: capIcon,    accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", priceMin: 220, priceMax: 240, colors: ["#1A1A1A", "#F9F6EE", "#CCFF00"], sizes: ["Free size"], stock: 48, sold: 952, rating: 4.9, reviews: 130, revenue: "₹2,10,880", spark: [8, 12, 14, 18, 22, 26, 30, 34, 38, 44, 50, 58, 64, 72], status: "Active", badge: "Bestseller" },
  { id: "p04", name: "Chaotic Good Tee",         category: "tees",        categoryLabel: "T-Shirts",    icon: teeIcon,    accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", priceMin: 240, priceMax: 240, colors: ["#1A1A1A"], sizes: ["S","M","L","XL"], stock: 312, sold: 386, rating: 4.6, reviews: 85, revenue: "₹92,640", spark: [4, 6, 10, 14, 16, 20, 24, 28, 32, 38, 44, 48, 54, 62], status: "Active", badge: "New", genre: "abstract" },
  { id: "p05", name: "Butterfly Hoodie",         category: "hoodies",     categoryLabel: "Hoodies",     icon: hoodieIcon, accent: "linear-gradient(135deg, #fbcfe8 0%, #db2777 100%)", priceMin: 480, priceMax: 540, colors: ["#F9F6EE", "#1A1A1A"], sizes: ["S","M","L","XL"], stock: 164, sold: 428, rating: 4.8, reviews: 164, revenue: "₹2,05,440", spark: [10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62], status: "Active", genre: "nature" },
  { id: "p06", name: "Smile Phone Case",         category: "cases",       categoryLabel: "Cases",       icon: caseIcon,   accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)", priceMin: 160, priceMax: 180, colors: ["#F9F6EE", "#1A1A1A", "#0033FF"], sizes: ["iPhone","Pixel","Galaxy"], stock: 240, sold: 568, rating: 4.7, reviews: 68, revenue: "₹90,880", spark: [6, 8, 10, 12, 16, 18, 22, 26, 30, 34, 38, 42, 44, 50], status: "Active", badge: "Bestseller", genre: "y2k" },
  { id: "p07", name: "Studio Session Hoodie",    category: "hoodies",     categoryLabel: "Hoodies",     icon: hoodieIcon, accent: "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)", priceMin: 480, priceMax: 520, colors: ["#4338ca", "#1A1A1A"], sizes: ["M","L","XL"], stock: 72, sold: 278, rating: 4.9, reviews: 92, revenue: "₹1,33,440", spark: [4, 6, 8, 12, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70], status: "Active", genre: "music" },
  { id: "p08", name: "Chaotic Good Poster",      category: "posters",     categoryLabel: "Posters",     icon: posterIcon, accent: "linear-gradient(135deg, #f472b6 0%, #9d174d 100%)", priceMin: 150, priceMax: 350, colors: [], sizes: ["A3","A2","A1"], stock: 420, sold: 186, rating: 4.5, reviews: 42, revenue: "₹27,900", spark: [2, 4, 6, 8, 10, 12, 14, 18, 22, 26, 30, 34, 38, 44], status: "Active", genre: "typography" },
  { id: "p09", name: "Night Owl Sweatshirt",     category: "sweatshirts", categoryLabel: "Sweatshirts", icon: sweatIcon,  accent: "linear-gradient(135deg, #64748b 0%, #1e293b 100%)", priceMin: 420, priceMax: 460, colors: ["#1e293b", "#F9F6EE"], sizes: ["S","M","L","XL"], stock: 0, sold: 0, rating: 0, reviews: 0, revenue: "—", spark: [0,0,0,0,0,0,0,0,0,0,0,0,0,0], status: "Draft" },
  { id: "p10", name: "Festival Vibes Cap",       category: "caps",        categoryLabel: "Caps",        icon: capIcon,    accent: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)", priceMin: 220, priceMax: 240, colors: ["#be123c", "#F9F6EE", "#CCFF00"], sizes: ["Free size"], stock: 86, sold: 342, rating: 4.7, reviews: 58, revenue: "₹75,240", spark: [6, 10, 12, 16, 18, 22, 24, 28, 30, 34, 36, 40, 44, 48], status: "Active" },
  { id: "p11", name: "Butterfly Season Tote",    category: "totes",       categoryLabel: "Totes",       icon: toteIcon,   accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", priceMin: 320, priceMax: 320, colors: ["#F9F6EE", "#1A1A1A"], sizes: ["Standard"], stock: 300, sold: 48, rating: 4.4, reviews: 18, revenue: "₹15,360", spark: [1, 2, 3, 5, 6, 8, 10, 12, 14, 16, 18, 22, 26, 32], status: "Active", badge: "New" },
  { id: "p12", name: "Different People Tote",    category: "totes",       categoryLabel: "Totes",       icon: toteIcon,   accent: "linear-gradient(135deg, #a3a3a3 0%, #404040 100%)", priceMin: 280, priceMax: 280, colors: ["#404040"], sizes: ["Standard"], stock: 0, sold: 0, rating: 0, reviews: 0, revenue: "—", spark: [0,0,0,0,0,0,0,0,0,0,0,0,0,0], status: "Draft" },
  { id: "p13", name: "Good Energy Poster",       category: "posters",     categoryLabel: "Posters",     icon: posterIcon, accent: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)", priceMin: 150, priceMax: 350, colors: [], sizes: ["A3","A2","A1"], stock: 180, sold: 128, rating: 4.6, reviews: 36, revenue: "₹19,200", spark: [2, 3, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28], status: "Active" },
  { id: "p14", name: "Dusshera Mega Tote",       category: "totes",       categoryLabel: "Totes",       icon: toteIcon,   accent: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)", priceMin: 300, priceMax: 320, colors: ["#c2410c", "#fde68a", "#F9F6EE"], sizes: ["Standard","Large"], stock: 500, sold: 0, rating: 0, reviews: 0, revenue: "—", spark: [0,0,0,0,0,0,0,0,0,0,0,0,0,0], status: "Draft", badge: "Limited" },
  { id: "p15", name: "Smile Mug",                category: "mugs",        categoryLabel: "Mugs",        icon: mugIcon,    accent: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)", priceMin: 180, priceMax: 220, colors: ["#F9F6EE", "#1A1A1A"], sizes: ["330ml","450ml"], stock: 96, sold: 212, rating: 4.6, reviews: 48, revenue: "₹42,400", spark: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32], status: "Active" },
  { id: "p16", name: "Chaotic Good Metal Print", category: "metal",       categoryLabel: "Metal Prints", icon: metalIcon,  accent: "linear-gradient(135deg, #94a3b8 0%, #334155 100%)", priceMin: 1200, priceMax: 2400, colors: [], sizes: ["12×18","18×24","24×36"], stock: 32, sold: 24, rating: 4.9, reviews: 12, revenue: "₹38,400", spark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18], status: "Active", badge: "Restocked" },
  { id: "p17", name: "Luna K. × Vibe Mode Tee",  category: "tees",        categoryLabel: "T-Shirts",    icon: teeIcon,    accent: "linear-gradient(135deg, #c084fc 0%, #7e22ce 100%)", priceMin: 260, priceMax: 320, colors: ["#7e22ce", "#F9F6EE"], sizes: ["S","M","L","XL"], stock: 400, sold: 0, rating: 0, reviews: 0, revenue: "—", spark: [0,0,0,0,0,0,0,0,0,0,0,0,0,0], status: "Draft", badge: "Limited" },
  { id: "p18", name: "Different People Case",    category: "cases",       categoryLabel: "Cases",       icon: caseIcon,   accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", priceMin: 160, priceMax: 180, colors: ["#1A1A1A"], sizes: ["iPhone","Pixel"], stock: 128, sold: 86, rating: 4.5, reviews: 24, revenue: "₹13,760", spark: [1, 2, 3, 4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 24], status: "Active" },
];

export const catalogSummary = {
  total: products.length,
  active: products.filter((p) => p.status === "Active").length,
  draft: products.filter((p) => p.status === "Draft").length,
  oos: products.filter((p) => p.status === "Out of Stock").length,
  archived: products.filter((p) => p.status === "Archived").length,
};

export const catalogHeadline = [
  { label: "Total Products", value: String(catalogSummary.total), delta: `${categories.length} categories`, tone: "purple" as const },
  { label: "Active", value: String(catalogSummary.active), delta: "live on store", tone: "green" as const },
  { label: "Stock Value", value: "₹18.4L", delta: "across all SKUs", tone: "pink" as const },
  { label: "Avg. Rating", value: "4.7", delta: "across 1,420 reviews", tone: "amber" as const },
];
