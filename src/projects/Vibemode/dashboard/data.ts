/** Demo data for the Mahathix Admin dashboard — Vibe Mode project. */

const bagIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7.4h14l-1 13.2a1.6 1.6 0 0 1-1.6 1.4H7.6A1.6 1.6 0 0 1 6 20.6Z"/><path d="M8.4 7.4V5.6a3.6 3.6 0 0 1 7.2 0v1.8"/></svg>`;
const usersIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.5"/><path d="M2.4 20c0-3.6 2.9-6 6.6-6s6.6 2.4 6.6 6"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.4 20c0-2.6 1.9-4.6 4.4-4.6"/></svg>`;
const revenueIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m6 15 4-4 3 3 5-6"/></svg>`;
const boxIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.4 7.2 8.6-4.4 8.6 4.4v9.6l-8.6 4.4-8.6-4.4Z"/><path d="m3.4 7.2 8.6 4.4 8.6-4.4"/><path d="M12 11.6V20"/></svg>`;

export interface Stat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  tone: "purple" | "pink" | "green" | "amber";
  icon: string;
  spark: number[];
  sub: string;
}

export const stats: Stat[] = [
  { label: "Total Orders", value: "1,842", delta: "+22%", trend: "up", tone: "purple", icon: bagIcon, spark: [24, 32, 28, 44, 38, 56, 52, 68, 62, 82, 78, 94, 88, 108], sub: "vs 1,510 last month" },
  { label: "Total Users", value: "12,480", delta: "+18%", trend: "up", tone: "pink", icon: usersIcon, spark: [180, 220, 240, 260, 300, 340, 360, 410, 440, 470, 510, 560, 600, 650], sub: "+1,890 this month" },
  { label: "Revenue (30d)", value: "₹6.24L", delta: "+22%", trend: "up", tone: "green", icon: revenueIcon, spark: [14, 20, 18, 28, 24, 36, 32, 46, 42, 54, 50, 62, 58, 72], sub: "AOV ₹2,340 · ↑ 8%" },
  { label: "Live Drops", value: "12", delta: "+3", trend: "up", tone: "amber", icon: boxIcon, spark: [4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 12], sub: "4 scheduled · 2 low stock" },
];

/* ---------------------------------------------- Revenue & Orders trend */

export const revenueTrend = {
  range: "Last 14 days",
  dates: ["Nov 7", "Nov 8", "Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19", "Nov 20"],
  revenue: [28, 42, 38, 54, 48, 66, 58, 72, 68, 84, 78, 96, 88, 112], // ₹ thousands
  orders:  [38, 52, 46, 68, 58, 82, 72, 94, 88, 108, 98, 128, 112, 142],
  totalRevenue: "₹9.6L",
  totalOrders: "1,286",
  deltaRevenue: "+34%",
  deltaOrders: "+28%",
};

/* ---------------------------------------------- Top product orders */

export interface TopProduct {
  rank: number;
  name: string;
  category: string;
  initials: string;
  accent: string;
  orders: string;
  revenue: string;
  delta: string;
  spark: number[];
}

export const topProducts: TopProduct[] = [
  { rank: 1, name: "Good Energy Tee", category: "T-Shirts", initials: "GE", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", orders: "412", revenue: "₹98,880", delta: "+38%", spark: [8, 12, 14, 18, 22, 28, 34, 44] },
  { rank: 2, name: "Different People Hoodie", category: "Hoodies", initials: "DP", accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", orders: "320", revenue: "₹1,53,600", delta: "+24%", spark: [6, 10, 12, 16, 18, 22, 26, 32] },
  { rank: 3, name: "Vibe Mode Cap", category: "Caps", initials: "VM", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", orders: "248", revenue: "₹54,560", delta: "+18%", spark: [4, 6, 10, 12, 14, 16, 20, 24] },
  { rank: 4, name: "Chaotic Good Poster", category: "Posters", initials: "CG", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", orders: "186", revenue: "₹27,900", delta: "+12%", spark: [3, 5, 7, 9, 10, 13, 15, 18] },
  { rank: 5, name: "Butterfly Tote", category: "Totes", initials: "BT", accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", orders: "142", revenue: "₹21,300", delta: "+9%", spark: [2, 4, 6, 8, 9, 11, 12, 14] },
];

/* ---------------------------------------------- User growth (daily) */

export interface GrowthBar {
  day: string;
  value: number;
}

export const userGrowth: GrowthBar[] = [
  { day: "M", value: 128 },
  { day: "T", value: 180 },
  { day: "W", value: 152 },
  { day: "T", value: 214 },
  { day: "F", value: 268 },
  { day: "S", value: 312 },
  { day: "S", value: 286 },
];

export const userGrowthMeta = {
  total: "1,540",
  delta: "+23%",
  caption: "New signups · last 7 days",
};

/* ---------------------------------------------- Live Drops */

export type DropStatus = "Live" | "Scheduled" | "Sold Out" | "Low Stock";

export interface LiveDrop {
  id: string;
  title: string;
  category: string;
  initials: string;
  accent: string;
  progress: string;
  progressPct: number;
  status: DropStatus;
}

export const liveDrops: LiveDrop[] = [
  { id: "d1", title: "Good Energy Tee", category: "Drop 03 · Tees", initials: "GE", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", progress: "412 / 500", progressPct: 82, status: "Live" },
  { id: "d2", title: "Different People Hoodie", category: "Drop 03 · Hoodies", initials: "DP", accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", progress: "320 / 320", progressPct: 100, status: "Sold Out" },
  { id: "d3", title: "Butterfly Season Tote", category: "Drop 04 · Totes", initials: "BS", accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", progress: "Launches Fri", progressPct: 0, status: "Scheduled" },
  { id: "d4", title: "Vibe Mode Cap", category: "Drop 02 · Caps", initials: "VM", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", progress: "48 left", progressPct: 92, status: "Low Stock" },
  { id: "d5", title: "Chaotic Good Poster", category: "Drop 03 · Posters", initials: "CG", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", progress: "186 / 250", progressPct: 74, status: "Live" },
  { id: "d6", title: "Smile Phone Case", category: "Drop 03 · Cases", initials: "SM", accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)", progress: "92 / 200", progressPct: 46, status: "Live" },
];

/* ----------------------------------------------------------- Quick Actions */

const dropIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.4 20 7v10l-8 4.6L4 17V7Z"/><path d="M4 7l8 4.6L20 7"/><path d="M12 11.6V21"/></svg>`;
const designIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 20 10-10 4 4L8 24"/><path d="m14 10 4 4"/><path d="M17.4 4.4 19.6 2.2a2 2 0 0 1 2.8 2.8l-2.2 2.2"/></svg>`;
const voteIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="4.8" width="17.2" height="12.4" rx="2"/><path d="M8 9.6h8"/><path d="M8 13h5"/><path d="M12 17.2v3.4"/></svg>`;
const approveIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.5"/><path d="M2.4 20c0-3.6 2.9-6 6.6-6"/><path d="m14 16 2.4 2.4L22 12.8"/></svg>`;
const payoutIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.4" y="6" width="19.2" height="12.8" rx="2"/><circle cx="12" cy="12.4" r="2.6"/><path d="M6 10.4v4"/><path d="M18 10.4v4"/></svg>`;
const bulkIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.6V4.4"/><path d="m7.4 9 4.6-4.6L16.6 9"/><path d="M4.6 15.6v2.6a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-2.6"/></svg>`;

export interface QuickAction {
  label: string;
  tone: "purple" | "pink" | "orange" | "indigo" | "rose" | "blue";
  icon: string;
}

export const quickActions: QuickAction[] = [
  { label: "Launch Drop", tone: "purple", icon: dropIcon },
  { label: "New Design", tone: "pink", icon: designIcon },
  { label: "Open Vote", tone: "orange", icon: voteIcon },
  { label: "Approve Creator", tone: "indigo", icon: approveIcon },
  { label: "Pay Royalties", tone: "rose", icon: payoutIcon },
  { label: "Bulk Upload", tone: "blue", icon: bulkIcon },
];

/* ----------------------------------------------------------- Product Mix */

export interface OverviewSlice {
  label: string;
  value: number;
  color: string;
}

export const productMix: OverviewSlice[] = [
  { label: "T-Shirts", value: 68, color: "#a78bfa" },
  { label: "Hoodies", value: 42, color: "#ec4899" },
  { label: "Caps", value: 18, color: "#f59e0b" },
  { label: "Totes", value: 14, color: "#10b981" },
  { label: "Posters", value: 8, color: "#60a5fa" },
  { label: "Cases", value: 6, color: "#94a3b8" },
];

/* ----------------------------------------------------------- Top Drop */

export const topDrop = {
  title: "Good Energy Tee — Drop 03",
  format: "Tees · Live now",
  views: "412 / 500 sold",
  likes: "62K",
  comments: "3.4K",
  shares: "11K",
  thumbStart: "#a78bfa",
  thumbEnd: "#5b21b6",
};

/* ----------------------------------------------------------- Drop Schedule */

export const calendarMonth = {
  year: 2026,
  month: 10, // November (0-indexed)
  today: 20,
  label: "Nov 2026",
};

export interface CalendarEvent {
  day: number;
  color: string;
}

export const calendarEvents: CalendarEvent[] = [
  { day: 3, color: "#a78bfa" },
  { day: 5, color: "#ec4899" },
  { day: 7, color: "#a78bfa" },
  { day: 7, color: "#10b981" },
  { day: 10, color: "#ec4899" },
  { day: 12, color: "#a78bfa" },
  { day: 12, color: "#f59e0b" },
  { day: 15, color: "#ec4899" },
  { day: 18, color: "#10b981" },
  { day: 20, color: "#a78bfa" },
  { day: 20, color: "#ec4899" },
  { day: 20, color: "#f59e0b" },
  { day: 24, color: "#10b981" },
  { day: 27, color: "#a78bfa" },
  { day: 29, color: "#ec4899" },
];

/* ----------------------------------------------------------- Recent Activity */

export type ActivityTone = "purple" | "pink" | "green" | "amber" | "blue";

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  at: string;
  tone: ActivityTone;
  icon: string;
}

const checkActIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const remixIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 7 4-4 4 4"/><path d="M8 3v8a4 4 0 0 0 4 4h4"/><path d="m20 17-4 4-4-4"/><path d="M16 21v-8a4 4 0 0 0-4-4H8"/></svg>`;
const voteActIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="4.8" width="17.2" height="12.4" rx="2"/><path d="M8 9.6h8"/><path d="M8 13h5"/><path d="M12 17.2v3.4"/></svg>`;
const creatorIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M4 20c0-3.6 3.6-5.6 8-5.6S20 16.4 20 20"/></svg>`;
const orderIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7.4h14l-1 13.2a1.6 1.6 0 0 1-1.6 1.4H7.6A1.6 1.6 0 0 1 6 20.6Z"/><path d="M8.4 7.4V5.6a3.6 3.6 0 0 1 7.2 0v1.8"/></svg>`;

export const recentActivity: ActivityItem[] = [
  { id: "a1", title: "Drop sold out", detail: "'Different People' hoodie · 320 units", at: "6 min ago", tone: "green", icon: checkActIcon },
  { id: "a2", title: "Design remixed", detail: "Luna K. remixed 'Good Energy' · 14 variants", at: "42 min ago", tone: "purple", icon: remixIcon },
  { id: "a3", title: "Community vote closed", detail: "'Butterfly Season' wins 68% · goes live Fri", at: "1 hour ago", tone: "pink", icon: voteActIcon },
  { id: "a4", title: "New creator applied", detail: "Aarav M. · 6 portfolio pieces", at: "2 hours ago", tone: "amber", icon: creatorIcon },
  { id: "a5", title: "Order spike detected", detail: "+42 orders in last 15 min · Good Energy Tee", at: "3 hours ago", tone: "blue", icon: orderIcon },
];
