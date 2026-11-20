/** Drop catalog — Vibe Mode admin. */

export type DropStatus = "Live" | "Scheduled" | "Sold Out" | "Low Stock" | "Draft";
export type DropChannel = "instagram" | "facebook" | "youtube" | "x" | "linkedin" | "tiktok";

export interface Drop {
  id: string;
  name: string;
  category: string;
  capsule: string;
  initials: string;
  accent: string;
  status: DropStatus;
  price: number;
  sold: number;
  stock: number;
  revenue: string;
  launchedAt?: string;
  scheduledFor?: string;
  timeline: string;
  channels: DropChannel[];
}

export const drops: Drop[] = [
  { id: "d01", name: "Good Energy Tee", category: "T-Shirts", capsule: "Drop 03", initials: "GE", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", status: "Live", price: 240, sold: 412, stock: 500, revenue: "₹98,880", launchedAt: "Nov 14", timeline: "88 left · 3 days live", channels: ["instagram", "facebook", "youtube"] },
  { id: "d02", name: "Different People Hoodie", category: "Hoodies", capsule: "Drop 03", initials: "DP", accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", status: "Sold Out", price: 480, sold: 320, stock: 320, revenue: "₹1,53,600", launchedAt: "Nov 10", timeline: "Sold out in 42h", channels: ["instagram", "facebook"] },
  { id: "d03", name: "Butterfly Season Tote", category: "Totes", capsule: "Drop 04", initials: "BS", accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", status: "Scheduled", price: 320, sold: 0, stock: 300, revenue: "—", scheduledFor: "Nov 22", timeline: "Launches Fri · 2 days", channels: ["instagram", "tiktok"] },
  { id: "d04", name: "Vibe Mode Cap", category: "Caps", capsule: "Drop 02", initials: "VM", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", status: "Low Stock", price: 220, sold: 452, stock: 500, revenue: "₹99,440", launchedAt: "Nov 5", timeline: "48 left · restock soon", channels: ["instagram", "facebook", "tiktok"] },
  { id: "d05", name: "Chaotic Good Poster", category: "Posters", capsule: "Drop 03", initials: "CG", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", status: "Live", price: 150, sold: 186, stock: 250, revenue: "₹27,900", launchedAt: "Nov 14", timeline: "64 left · 3 days live", channels: ["instagram"] },
  { id: "d06", name: "Smile Phone Case", category: "Cases", capsule: "Drop 03", initials: "SM", accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)", status: "Live", price: 160, sold: 92, stock: 200, revenue: "₹14,720", launchedAt: "Nov 14", timeline: "108 left · 3 days live", channels: ["instagram", "tiktok"] },
  { id: "d07", name: "Luna K. × Vibe Mode Tee", category: "T-Shirts", capsule: "Drop 04", initials: "LK", accent: "linear-gradient(135deg, #c084fc 0%, #7e22ce 100%)", status: "Scheduled", price: 260, sold: 0, stock: 400, revenue: "—", scheduledFor: "Nov 28", timeline: "Launches in 8 days", channels: ["instagram", "youtube", "tiktok"] },
  { id: "d08", name: "Studio Session Hoodie", category: "Hoodies", capsule: "Drop 02", initials: "SS", accent: "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)", status: "Live", price: 480, sold: 278, stock: 350, revenue: "₹1,33,440", launchedAt: "Nov 5", timeline: "72 left · 12 days live", channels: ["instagram", "facebook", "linkedin"] },
  { id: "d09", name: "Dusshera Mega Tote", category: "Totes", capsule: "Drop 04", initials: "DM", accent: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)", status: "Scheduled", price: 300, sold: 0, stock: 500, revenue: "—", scheduledFor: "Nov 25", timeline: "Launches in 5 days", channels: ["instagram", "facebook"] },
  { id: "d10", name: "Night Owl Sweatshirt", category: "Sweatshirts", capsule: "Drop 05", initials: "NO", accent: "linear-gradient(135deg, #64748b 0%, #1e293b 100%)", status: "Draft", price: 420, sold: 0, stock: 0, revenue: "—", timeline: "Draft · 72% ready", channels: [] },
  { id: "d11", name: "Festival Vibes Cap", category: "Caps", capsule: "Drop 01", initials: "FV", accent: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)", status: "Sold Out", price: 220, sold: 250, stock: 250, revenue: "₹55,000", launchedAt: "Oct 24", timeline: "Sold out in 18h", channels: ["instagram", "tiktok"] },
  { id: "d12", name: "Good Energy Poster", category: "Posters", capsule: "Drop 03", initials: "GP", accent: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)", status: "Live", price: 150, sold: 128, stock: 200, revenue: "₹19,200", launchedAt: "Nov 14", timeline: "72 left · 3 days live", channels: ["instagram", "facebook"] },
  { id: "d13", name: "Different People Tote", category: "Totes", capsule: "Drop 05", initials: "DT", accent: "linear-gradient(135deg, #a3a3a3 0%, #404040 100%)", status: "Draft", price: 280, sold: 0, stock: 0, revenue: "—", timeline: "Draft · 48% ready", channels: [] },
  { id: "d14", name: "Butterfly Phone Case", category: "Cases", capsule: "Drop 04", initials: "BP", accent: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)", status: "Live", price: 160, sold: 48, stock: 150, revenue: "₹7,680", launchedAt: "Nov 17", timeline: "102 left · 3 hours left?", channels: ["instagram"] },
];

export const dropsSummary = {
  total: drops.length,
  live: drops.filter((d) => d.status === "Live").length,
  scheduled: drops.filter((d) => d.status === "Scheduled").length,
  soldOut: drops.filter((d) => d.status === "Sold Out").length,
  lowStock: drops.filter((d) => d.status === "Low Stock").length,
  draft: drops.filter((d) => d.status === "Draft").length,
};

export const dropsHeadline = [
  { label: "Live Drops", value: String(dropsSummary.live), delta: "+3 this week", tone: "purple" as const },
  { label: "Scheduled", value: String(dropsSummary.scheduled), delta: "next in 2 days", tone: "pink" as const },
  { label: "Revenue (30d)", value: "₹6.24L", delta: "↑ +22%", tone: "green" as const },
  { label: "Sell-through", value: "72%", delta: "↑ +8%", tone: "amber" as const },
];
