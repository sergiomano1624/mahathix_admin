/** Analytics data — Vibe Mode. */

const bagIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m6 15 4-4 3 3 5-6"/></svg>`;
const orderIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7.4h14l-1 13.2a1.6 1.6 0 0 1-1.6 1.4H7.6A1.6 1.6 0 0 1 6 20.6Z"/><path d="M8.4 7.4V5.6a3.6 3.6 0 0 1 7.2 0v1.8"/></svg>`;
const conversionIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="m7 17 10-10"/></svg>`;
const aovIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.6" fill="currentColor"/><circle cx="15" cy="10" r="0.6" fill="currentColor"/></svg>`;

export type KPITone = "purple" | "pink" | "green" | "amber";

export interface Insight {
  title: string;
  detail: string;
  tone: "positive" | "negative" | "neutral";
}

export interface BreakdownRow {
  label: string;
  value: number;
  sub?: string;
  color: string;
  pct: number;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  tone: KPITone;
  icon: string;
  sub: string;
  /** 30 day series for the drawer deep-dive chart. */
  series: number[];
  /** Previous 30 days for comparison overlay. */
  prev: number[];
  /** Big period total, daily avg, peak day used in the drawer summary row. */
  periodTotal: string;
  dailyAvg: string;
  peakDay: { date: string; value: string };
  prevPeriodTotal: string;
  byCategory: BreakdownRow[];
  byChannel: BreakdownRow[];
  insights: Insight[];
}

/* -------- 30-day arrays for the four KPI deep dives -------- */

const revenueSeries = [16, 22, 18, 26, 24, 32, 28, 38, 34, 42, 38, 48, 44, 52, 48, 56, 52, 62, 58, 68, 64, 72, 68, 78, 74, 82, 78, 88, 84, 94];
const revenuePrev   = [14, 18, 16, 20, 22, 24, 22, 28, 26, 30, 28, 34, 32, 38, 36, 40, 38, 44, 42, 48, 46, 50, 48, 54, 52, 56, 54, 60, 58, 64];
const ordersSeries  = [24, 32, 28, 38, 34, 44, 40, 52, 48, 58, 52, 64, 60, 72, 66, 78, 72, 84, 80, 92, 86, 98, 92, 108, 102, 114, 108, 124, 118, 132];
const ordersPrev    = [22, 28, 26, 32, 34, 36, 34, 42, 38, 46, 42, 52, 48, 58, 54, 62, 58, 68, 64, 72, 70, 76, 72, 82, 78, 86, 82, 92, 88, 96];
const convSeries    = [2.2, 2.4, 2.1, 2.6, 2.4, 2.8, 2.6, 3.0, 2.8, 3.1, 2.9, 3.2, 3.1, 3.4, 3.2, 3.5, 3.4, 3.7, 3.5, 3.8, 3.6, 3.9, 3.7, 4.0, 3.8, 4.1, 3.9, 4.2, 4.0, 4.3];
const convPrev      = [1.8, 2.0, 1.9, 2.1, 2.2, 2.3, 2.2, 2.5, 2.4, 2.6, 2.5, 2.7, 2.6, 2.8, 2.7, 2.9, 2.8, 3.0, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2, 3.4, 3.3, 3.5, 3.4, 3.6];
const aovSeries     = [1980, 2010, 2040, 2060, 2090, 2100, 2110, 2120, 2140, 2150, 2160, 2180, 2190, 2200, 2220, 2240, 2260, 2270, 2280, 2290, 2300, 2310, 2320, 2320, 2330, 2340, 2340, 2340, 2340, 2340];
const aovPrev       = [1920, 1940, 1950, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100, 2110, 2120, 2130, 2140, 2150, 2160, 2170, 2180, 2190, 2200, 2210, 2220, 2230];

export const kpis: KPI[] = [
  {
    id: "revenue",
    label: "Revenue (30d)",
    value: "₹6.24L",
    delta: "+22%",
    trend: "up",
    tone: "green",
    icon: bagIcon,
    sub: "vs ₹5.10L prev 30d",
    series: revenueSeries,
    prev: revenuePrev,
    periodTotal: "₹6,24,780",
    dailyAvg: "₹20,826",
    peakDay: { date: "Nov 17", value: "₹48,200" },
    prevPeriodTotal: "₹5,10,320",
    byCategory: [
      { label: "T-Shirts",  value: 184200, pct: 29.5, color: "#a78bfa" },
      { label: "Hoodies",   value: 164400, pct: 26.3, color: "#ec4899" },
      { label: "Caps",      value:  84200, pct: 13.5, color: "#f59e0b" },
      { label: "Posters",   value:  64200, pct: 10.3, color: "#10b981" },
      { label: "Totes",     value:  58800, pct:  9.4, color: "#60a5fa" },
      { label: "Cases",     value:  48800, pct:  7.8, color: "#94a3b8" },
      { label: "Other",     value:  20180, pct:  3.2, color: "#cbd5e1" },
    ],
    byChannel: [
      { label: "Vibe Mode Shop", value: 342000, pct: 54.8, color: "#7c3aed", sub: "Direct" },
      { label: "Instagram",      value: 148000, pct: 23.7, color: "#ec4899", sub: "Storefront" },
      { label: "YouTube",        value:  68000, pct: 10.9, color: "#ef4444", sub: "Shopping" },
      { label: "Amazon",         value:  36000, pct:  5.8, color: "#f59e0b", sub: "Marketplace" },
      { label: "Wholesale",      value:  30780, pct:  4.9, color: "#10b981", sub: "B2B" },
    ],
    insights: [
      { title: "Hoodie launches drove 38% of revenue", detail: "Drop 03 'Different People' sold out in 42h — the strongest hoodie debut this quarter.", tone: "positive" },
      { title: "Peak revenue on Nov 17",               detail: "Highest daily total of the window — spike correlated with a Luna K. remix teaser.", tone: "positive" },
      { title: "COD cancellations up 8%",              detail: "Pre-paid conversion has grown faster. Consider moving COD behind a confirmation step.", tone: "negative" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    value: "1,842",
    delta: "+22%",
    trend: "up",
    tone: "purple",
    icon: orderIcon,
    sub: "vs 1,510 prev 30d",
    series: ordersSeries,
    prev: ordersPrev,
    periodTotal: "1,842 orders",
    dailyAvg: "61 / day",
    peakDay: { date: "Nov 18", value: "132 orders" },
    prevPeriodTotal: "1,510 orders",
    byCategory: [
      { label: "T-Shirts",  value: 612, pct: 33.2, color: "#a78bfa" },
      { label: "Hoodies",   value: 428, pct: 23.2, color: "#ec4899" },
      { label: "Caps",      value: 288, pct: 15.6, color: "#f59e0b" },
      { label: "Cases",     value: 196, pct: 10.6, color: "#10b981" },
      { label: "Posters",   value: 168, pct:  9.1, color: "#60a5fa" },
      { label: "Totes",     value: 112, pct:  6.1, color: "#94a3b8" },
      { label: "Other",     value:  38, pct:  2.1, color: "#cbd5e1" },
    ],
    byChannel: [
      { label: "Vibe Mode Shop", value: 1082, pct: 58.7, color: "#7c3aed", sub: "Direct" },
      { label: "Instagram",      value:  412, pct: 22.4, color: "#ec4899", sub: "Storefront" },
      { label: "YouTube",        value:  184, pct: 10.0, color: "#ef4444", sub: "Shopping" },
      { label: "Amazon",         value:   98, pct:  5.3, color: "#f59e0b", sub: "Marketplace" },
      { label: "Wholesale",      value:   66, pct:  3.6, color: "#10b981", sub: "B2B" },
    ],
    insights: [
      { title: "Repeat-buyer share climbed to 48%",  detail: "Returning customers now drive nearly half of orders.", tone: "positive" },
      { title: "Weekend orders flat week-over-week", detail: "Promo scheduling could shift to Sat/Sun to capture spill-over demand.", tone: "neutral" },
      { title: "Caps gain share from T-Shirts",      detail: "Festival Vibes Cap and Vibe Mode Cap both in the top 5.", tone: "positive" },
    ],
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "3.8%",
    delta: "+0.6pp",
    trend: "up",
    tone: "pink",
    icon: conversionIcon,
    sub: "3.2% prev 30d",
    series: convSeries,
    prev: convPrev,
    periodTotal: "3.8% avg",
    dailyAvg: "3.8% (30d)",
    peakDay: { date: "Nov 18", value: "4.3%" },
    prevPeriodTotal: "3.2% avg",
    byCategory: [
      { label: "Drop pages",  value: 5.6, pct: 5.6, color: "#a78bfa" },
      { label: "Category",    value: 4.2, pct: 4.2, color: "#ec4899" },
      { label: "Search",      value: 3.9, pct: 3.9, color: "#f59e0b" },
      { label: "Product",     value: 3.1, pct: 3.1, color: "#10b981" },
      { label: "Homepage",    value: 2.4, pct: 2.4, color: "#60a5fa" },
    ],
    byChannel: [
      { label: "Email",      value: 6.8, pct: 68, color: "#7c3aed", sub: "Highest intent" },
      { label: "Direct",     value: 4.4, pct: 44, color: "#ec4899", sub: "Known brand" },
      { label: "Instagram",  value: 3.2, pct: 32, color: "#ef4444", sub: "Storefront" },
      { label: "Organic",    value: 2.8, pct: 28, color: "#f59e0b", sub: "SEO" },
      { label: "Paid social",value: 2.1, pct: 21, color: "#10b981", sub: "Ads" },
    ],
    insights: [
      { title: "Drop pages hit a new ceiling",  detail: "5.6% average — shoppers are landing on drops with higher intent than any other surface.", tone: "positive" },
      { title: "Checkout drop-off at step 2",   detail: "17% of carts abandon at address entry. Pre-fill from account profile could recover ~4%.", tone: "negative" },
      { title: "Email conversion continues to lead", detail: "Segmented flows beat broad blasts by 2.3×. Keep investing in the drop-reminder flow.", tone: "positive" },
    ],
  },
  {
    id: "aov",
    label: "Average Order Value",
    value: "₹2,340",
    delta: "+8%",
    trend: "up",
    tone: "amber",
    icon: aovIcon,
    sub: "₹2,166 prev 30d",
    series: aovSeries,
    prev: aovPrev,
    periodTotal: "₹2,340 avg",
    dailyAvg: "₹2,340 (30d)",
    peakDay: { date: "Nov 14", value: "₹3,180" },
    prevPeriodTotal: "₹2,166 avg",
    byCategory: [
      { label: "Metal Prints", value: 2800, pct: 100, color: "#94a3b8", sub: "Highest ticket" },
      { label: "Hoodies",      value: 2100, pct:  75, color: "#ec4899" },
      { label: "T-Shirts",     value: 1860, pct:  66, color: "#a78bfa" },
      { label: "Sweatshirts",  value: 1760, pct:  63, color: "#818cf8" },
      { label: "Totes",        value: 1440, pct:  51, color: "#f59e0b" },
      { label: "Caps",         value: 1120, pct:  40, color: "#60a5fa" },
      { label: "Cases",        value:  820, pct:  29, color: "#10b981" },
    ],
    byChannel: [
      { label: "Wholesale",      value: 4620, pct: 100, color: "#10b981", sub: "Bulk B2B" },
      { label: "Email",          value: 2940, pct:  64, color: "#7c3aed", sub: "Segmented" },
      { label: "Vibe Mode Shop", value: 2320, pct:  50, color: "#ec4899", sub: "Direct" },
      { label: "Instagram",      value: 1880, pct:  41, color: "#ef4444", sub: "Storefront" },
      { label: "Amazon",         value: 1620, pct:  35, color: "#f59e0b", sub: "Marketplace" },
    ],
    insights: [
      { title: "Hoodie + Cap bundle lifts AOV 23%", detail: "Customers who add a cap to a hoodie cart spend ₹620 more on average.", tone: "positive" },
      { title: "Free shipping threshold working",   detail: "Orders ≥₹600 now make up 71% of volume (was 58% two months ago).", tone: "positive" },
      { title: "Entry-point products below target", detail: "Cases AOV at ₹820 lags the ₹1K target — pair them with stickers or posters.", tone: "neutral" },
    ],
  },
];

/* -------------------- Page-level breakdowns -------------------- */

export const salesByChannel = [
  { label: "Vibe Mode Shop", value: 54.8, color: "#7c3aed", sub: "₹3,42,000" },
  { label: "Instagram",      value: 23.7, color: "#ec4899", sub: "₹1,48,000" },
  { label: "YouTube",        value: 10.9, color: "#ef4444", sub: "₹68,000" },
  { label: "Amazon",         value:  5.8, color: "#f59e0b", sub: "₹36,000" },
  { label: "Wholesale",      value:  4.9, color: "#10b981", sub: "₹30,780" },
];

export const categoryMix = [
  { label: "T-Shirts", value: 68, color: "#a78bfa" },
  { label: "Hoodies",  value: 42, color: "#ec4899" },
  { label: "Caps",     value: 28, color: "#f59e0b" },
  { label: "Totes",    value: 36, color: "#10b981" },
  { label: "Cases",    value: 54, color: "#60a5fa" },
  { label: "Posters",  value: 68, color: "#94a3b8" },
];

export const topProducts = [
  { rank: 1, name: "Good Energy Tee",         category: "T-Shirts", initials: "GE", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", orders: 412, revenue: "₹98,880", delta: "+38%" },
  { rank: 2, name: "Different People Hoodie", category: "Hoodies",  initials: "DP", accent: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", orders: 320, revenue: "₹1,53,600", delta: "+24%" },
  { rank: 3, name: "Vibe Mode Cap",            category: "Caps",     initials: "VM", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", orders: 248, revenue: "₹54,560",  delta: "+18%" },
  { rank: 4, name: "Chaotic Good Poster",      category: "Posters",  initials: "CG", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", orders: 186, revenue: "₹27,900",  delta: "+12%" },
  { rank: 5, name: "Butterfly Tote",           category: "Totes",    initials: "BT", accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", orders: 142, revenue: "₹21,300",  delta: "+9%" },
];

export const regions = [
  { city: "Mumbai",     orders: 342, revenue: "₹1,24,800", pct: 100 },
  { city: "Bengaluru",  orders: 288, revenue: "₹1,02,400", pct:  82 },
  { city: "Delhi",      orders: 212, revenue: "₹82,300",    pct:  66 },
  { city: "Hyderabad",  orders: 178, revenue: "₹64,600",    pct:  52 },
  { city: "Chennai",    orders: 148, revenue: "₹56,200",    pct:  43 },
  { city: "Pune",       orders: 120, revenue: "₹44,100",    pct:  35 },
  { city: "Kolkata",    orders:  96, revenue: "₹32,800",    pct:  28 },
  { city: "Ahmedabad",  orders:  82, revenue: "₹28,400",    pct:  24 },
];

export const customerSegments = [
  { label: "VIP",     value: 142,   color: "#7c3aed" },
  { label: "Regular", value: 520,   color: "#10b981" },
  { label: "New",     value: 368,   color: "#60a5fa" },
  { label: "At Risk", value: 148,   color: "#f59e0b" },
  { label: "Churned", value:  84,   color: "#94a3b8" },
];
