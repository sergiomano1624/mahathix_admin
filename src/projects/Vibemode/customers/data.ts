/** Customers data — Vibe Mode. */

export type Segment = "VIP" | "Regular" | "New" | "At Risk" | "Churned";
export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface CustomerOrder {
  id: string;
  date: string;
  dateIso: string;
  total: number;
  itemCount: number;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled" | "Refunded";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  accent: string;
  segment: Segment;
  tier: Tier;
  city: string;
  state: string;
  joinedAt: string;
  joinedAtIso: string;
  lastOrderAt: string;
  lastOrderIso: string;
  totalSpent: number;
  orderCount: number;
  aov: number;
  loyaltyPoints: number;
  emailOptIn: boolean;
  smsOptIn: boolean;
  favoriteCategories: string[];
  favoriteGenres: string[];
  recentOrders: CustomerOrder[];
  /** LTV trend (last 12 months, ₹ thousands). */
  spark: number[];
  note?: string;
}

const C = {
  violet:  "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
  pink:    "linear-gradient(135deg, #f472b6 0%, #be185d 100%)",
  amber:   "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)",
  emerald: "linear-gradient(135deg, #34d399 0%, #047857 100%)",
  blue:    "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)",
  rose:    "linear-gradient(135deg, #fda4af 0%, #e11d48 100%)",
  indigo:  "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)",
  cyan:    "linear-gradient(135deg, #22d3ee 0%, #0e7490 100%)",
  slate:   "linear-gradient(135deg, #94a3b8 0%, #1e293b 100%)",
  orange:  "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)",
  teal:    "linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)",
  fuchsia: "linear-gradient(135deg, #e879f9 0%, #a21caf 100%)",
};

export const customers: Customer[] = [
  {
    id: "c01", name: "Aarav Mehta", email: "aarav.m@vibemode.in", phone: "+91 98100 12345",
    initials: "AM", accent: C.violet, segment: "VIP", tier: "Platinum", city: "Mumbai", state: "MH",
    joinedAt: "Jan 12, 2025", joinedAtIso: "2025-01-12",
    lastOrderAt: "Today, 11:04 AM", lastOrderIso: "2026-11-20T11:04:00Z",
    totalSpent: 68420, orderCount: 28, aov: 2444, loyaltyPoints: 3420,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["T-Shirts", "Hoodies", "Caps"],
    favoriteGenres: ["Typography", "Streetwear"],
    recentOrders: [
      { id: "VM-78412", date: "Today, 11:04 AM", dateIso: "2026-11-20T11:04:00Z", total: 760, itemCount: 3, status: "Processing" },
      { id: "VM-77984", date: "Nov 14, 2026", dateIso: "2026-11-14T15:20:00Z", total: 1240, itemCount: 4, status: "Delivered" },
      { id: "VM-77612", date: "Nov 2, 2026", dateIso: "2026-11-02T10:00:00Z", total: 1980, itemCount: 5, status: "Delivered" },
      { id: "VM-76881", date: "Oct 18, 2026", dateIso: "2026-10-18T19:40:00Z", total: 840, itemCount: 2, status: "Delivered" },
    ],
    spark: [1.2, 1.8, 2.4, 2.1, 3.2, 3.8, 4.1, 5.2, 6.4, 7.2, 8.4, 9.6],
  },
  {
    id: "c02", name: "Riya Sharma", email: "riya.s@storez55.com", phone: "+91 98102 44210",
    initials: "RS", accent: C.pink, segment: "VIP", tier: "Gold", city: "Delhi", state: "DL",
    joinedAt: "Mar 4, 2025", joinedAtIso: "2025-03-04",
    lastOrderAt: "Today, 10:28 AM", lastOrderIso: "2026-11-20T10:28:00Z",
    totalSpent: 42180, orderCount: 18, aov: 2343, loyaltyPoints: 2110,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["Hoodies", "Totes"],
    favoriteGenres: ["Nature", "Abstract"],
    recentOrders: [
      { id: "VM-78411", date: "Today, 10:28 AM", dateIso: "2026-11-20T10:28:00Z", total: 480, itemCount: 1, status: "Processing" },
      { id: "VM-78002", date: "Nov 11, 2026", dateIso: "2026-11-11T14:00:00Z", total: 1600, itemCount: 3, status: "Delivered" },
    ],
    spark: [0.4, 0.8, 1.2, 1.4, 2.0, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4, 6.0],
  },
  {
    id: "c03", name: "Luna K.", email: "luna@lunak.studio", phone: "+91 97400 88812",
    initials: "LK", accent: C.indigo, segment: "VIP", tier: "Platinum", city: "Bengaluru", state: "KA",
    joinedAt: "Oct 24, 2024", joinedAtIso: "2024-10-24",
    lastOrderAt: "Today, 09:12 AM", lastOrderIso: "2026-11-20T09:12:00Z",
    totalSpent: 98640, orderCount: 42, aov: 2349, loyaltyPoints: 4930,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["T-Shirts", "Posters", "Hoodies"],
    favoriteGenres: ["Music", "Typography", "Abstract"],
    recentOrders: [
      { id: "VM-78410", date: "Today, 09:12 AM", dateIso: "2026-11-20T09:12:00Z", total: 1080, itemCount: 5, status: "Shipped" },
      { id: "VM-78098", date: "Nov 15, 2026", dateIso: "2026-11-15T20:12:00Z", total: 3280, itemCount: 8, status: "Delivered" },
      { id: "VM-77801", date: "Nov 6, 2026", dateIso: "2026-11-06T11:00:00Z", total: 2140, itemCount: 4, status: "Delivered" },
    ],
    spark: [2.4, 3.2, 4.1, 5.2, 6.4, 7.8, 8.6, 9.2, 10.1, 11.4, 12.6, 14.2],
    note: "Collab artist. Comp drops before public launch.",
  },
  {
    id: "c04", name: "Rohan Iyer", email: "r.iyer@gmail.com", phone: "+91 96444 10021",
    initials: "RI", accent: C.emerald, segment: "New", tier: "Bronze", city: "Chennai", state: "TN",
    joinedAt: "Nov 18, 2026", joinedAtIso: "2026-11-18",
    lastOrderAt: "Today, 08:46 AM", lastOrderIso: "2026-11-20T08:46:00Z",
    totalSpent: 360, orderCount: 1, aov: 360, loyaltyPoints: 18,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["Cases"],
    favoriteGenres: [],
    recentOrders: [
      { id: "VM-78409", date: "Today, 08:46 AM", dateIso: "2026-11-20T08:46:00Z", total: 360, itemCount: 2, status: "Processing" },
    ],
    spark: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4],
  },
  {
    id: "c05", name: "Priya Nair", email: "priya.nair@outlook.com", phone: "+91 98466 00142",
    initials: "PN", accent: C.rose, segment: "Regular", tier: "Silver", city: "Kochi", state: "KL",
    joinedAt: "Jun 8, 2025", joinedAtIso: "2025-06-08",
    lastOrderAt: "Yesterday, 06:40 PM", lastOrderIso: "2026-11-19T18:40:00Z",
    totalSpent: 12840, orderCount: 7, aov: 1835, loyaltyPoints: 642,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["Hoodies", "Totes"],
    favoriteGenres: ["Nature"],
    recentOrders: [
      { id: "VM-78408", date: "Yesterday, 06:40 PM", dateIso: "2026-11-19T18:40:00Z", total: 800, itemCount: 2, status: "Delivered" },
      { id: "VM-77612", date: "Nov 8, 2026", dateIso: "2026-11-08T12:00:00Z", total: 2200, itemCount: 3, status: "Delivered" },
    ],
    spark: [0, 0, 0, 0.4, 0.8, 1.2, 1.6, 1.8, 2.0, 2.2, 2.4, 2.8],
  },
  {
    id: "c06", name: "Kabir Sethi", email: "kabir@sethi.dev", phone: "+91 98214 55012",
    initials: "KS", accent: C.blue, segment: "Regular", tier: "Silver", city: "Hyderabad", state: "TS",
    joinedAt: "Apr 22, 2025", joinedAtIso: "2025-04-22",
    lastOrderAt: "Yesterday, 05:12 PM", lastOrderIso: "2026-11-19T17:12:00Z",
    totalSpent: 8420, orderCount: 5, aov: 1684, loyaltyPoints: 421,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["T-Shirts"],
    favoriteGenres: ["Abstract"],
    recentOrders: [
      { id: "VM-78407", date: "Yesterday, 05:12 PM", dateIso: "2026-11-19T17:12:00Z", total: 300, itemCount: 1, status: "Delivered" },
      { id: "VM-77202", date: "Oct 24, 2026", dateIso: "2026-10-24T09:12:00Z", total: 1240, itemCount: 2, status: "Delivered" },
    ],
    spark: [0.2, 0.6, 1.0, 1.4, 1.8, 2.0, 2.2, 2.4, 2.4, 2.6, 2.8, 3.0],
  },
  {
    id: "c07", name: "Zara Khan", email: "zara.khan@hey.com", phone: "+91 96812 03442",
    initials: "ZK", accent: C.amber, segment: "Regular", tier: "Silver", city: "Jaipur", state: "RJ",
    joinedAt: "Jul 2, 2025", joinedAtIso: "2025-07-02",
    lastOrderAt: "Yesterday, 02:18 PM", lastOrderIso: "2026-11-19T14:18:00Z",
    totalSpent: 7200, orderCount: 6, aov: 1200, loyaltyPoints: 360,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["Caps", "Totes"],
    favoriteGenres: ["Streetwear"],
    recentOrders: [
      { id: "VM-78406", date: "Yesterday, 02:18 PM", dateIso: "2026-11-19T14:18:00Z", total: 440, itemCount: 2, status: "Shipped" },
    ],
    spark: [0.3, 0.7, 1.1, 1.3, 1.5, 1.7, 1.9, 2.0, 2.1, 2.2, 2.3, 2.5],
  },
  {
    id: "c08", name: "Dev Patel", email: "dev.patel@proton.me", phone: "+91 90088 12210",
    initials: "DP", accent: C.slate, segment: "VIP", tier: "Gold", city: "Ahmedabad", state: "GJ",
    joinedAt: "Feb 14, 2025", joinedAtIso: "2025-02-14",
    lastOrderAt: "Yesterday, 11:02 AM", lastOrderIso: "2026-11-19T11:02:00Z",
    totalSpent: 32420, orderCount: 14, aov: 2316, loyaltyPoints: 1621,
    emailOptIn: false, smsOptIn: true,
    favoriteCategories: ["Hoodies", "Caps"],
    favoriteGenres: ["Minimal", "Music"],
    recentOrders: [
      { id: "VM-78405", date: "Yesterday, 11:02 AM", dateIso: "2026-11-19T11:02:00Z", total: 700, itemCount: 2, status: "Processing" },
    ],
    spark: [0.8, 1.2, 1.6, 2.0, 2.6, 3.2, 3.8, 4.4, 4.8, 5.2, 5.8, 6.4],
  },
  {
    id: "c09", name: "Saanvi Gupta", email: "saanvi@gupta.co", phone: "+91 98210 99012",
    initials: "SG", accent: C.cyan, segment: "At Risk", tier: "Silver", city: "Pune", state: "MH",
    joinedAt: "Nov 10, 2024", joinedAtIso: "2024-11-10",
    lastOrderAt: "Sep 12, 2026", lastOrderIso: "2026-09-12T09:34:00Z",
    totalSpent: 9420, orderCount: 6, aov: 1570, loyaltyPoints: 471,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["Mugs", "Posters"],
    favoriteGenres: ["Typography"],
    recentOrders: [
      { id: "VM-74012", date: "Sep 12, 2026", dateIso: "2026-09-12T09:34:00Z", total: 780, itemCount: 4, status: "Delivered" },
    ],
    spark: [0.4, 0.8, 1.2, 1.4, 1.6, 1.8, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9],
  },
  {
    id: "c10", name: "Arjun Rao", email: "arjun.rao@fastmail.com", phone: "+91 91234 55018",
    initials: "AR", accent: C.orange, segment: "VIP", tier: "Platinum", city: "Mysuru", state: "KA",
    joinedAt: "Sep 2, 2024", joinedAtIso: "2024-09-02",
    lastOrderAt: "Nov 18, 2026", lastOrderIso: "2026-11-18T20:22:00Z",
    totalSpent: 72840, orderCount: 32, aov: 2276, loyaltyPoints: 3642,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["Hoodies", "T-Shirts"],
    favoriteGenres: ["Streetwear", "Music"],
    recentOrders: [
      { id: "VM-78403", date: "Nov 18, 2026", dateIso: "2026-11-18T20:22:00Z", total: 960, itemCount: 2, status: "Delivered" },
      { id: "VM-78189", date: "Nov 12, 2026", dateIso: "2026-11-12T16:20:00Z", total: 2680, itemCount: 5, status: "Delivered" },
    ],
    spark: [1.4, 2.0, 2.6, 3.2, 3.8, 4.4, 5.0, 5.6, 6.4, 7.2, 8.0, 8.8],
  },
  {
    id: "c11", name: "Meera Chawla", email: "meera.c@signal.org", phone: "+91 98201 44120",
    initials: "MC", accent: C.violet, segment: "Regular", tier: "Silver", city: "Lucknow", state: "UP",
    joinedAt: "May 18, 2025", joinedAtIso: "2025-05-18",
    lastOrderAt: "Nov 18, 2026", lastOrderIso: "2026-11-18T19:04:00Z",
    totalSpent: 6420, orderCount: 4, aov: 1605, loyaltyPoints: 321,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["Posters"],
    favoriteGenres: ["Typography", "Abstract"],
    recentOrders: [
      { id: "VM-78402", date: "Nov 18, 2026", dateIso: "2026-11-18T19:04:00Z", total: 360, itemCount: 2, status: "Delivered" },
    ],
    spark: [0.2, 0.4, 0.8, 1.2, 1.4, 1.6, 1.8, 2.0, 2.0, 2.0, 2.0, 2.2],
  },
  {
    id: "c12", name: "Nikhil Verma", email: "n.verma@icloud.com", phone: "+91 94410 55012",
    initials: "NV", accent: C.emerald, segment: "Churned", tier: "Bronze", city: "Kolkata", state: "WB",
    joinedAt: "Dec 20, 2024", joinedAtIso: "2024-12-20",
    lastOrderAt: "Mar 2, 2026", lastOrderIso: "2026-03-02T14:00:00Z",
    totalSpent: 2400, orderCount: 3, aov: 800, loyaltyPoints: 120,
    emailOptIn: false, smsOptIn: false,
    favoriteCategories: ["T-Shirts"],
    favoriteGenres: [],
    recentOrders: [
      { id: "VM-71001", date: "Mar 2, 2026", dateIso: "2026-03-02T14:00:00Z", total: 300, itemCount: 1, status: "Refunded" },
    ],
    spark: [0.4, 0.8, 1.0, 1.2, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3],
    note: "Multiple refunds. Investigate before any outreach.",
  },
  {
    id: "c13", name: "Tanya Kapoor", email: "tanya@kapoor.shop", phone: "+91 98422 44100",
    initials: "TK", accent: C.pink, segment: "VIP", tier: "Gold", city: "Bengaluru", state: "KA",
    joinedAt: "Jan 28, 2025", joinedAtIso: "2025-01-28",
    lastOrderAt: "Nov 18, 2026", lastOrderIso: "2026-11-18T14:22:00Z",
    totalSpent: 28640, orderCount: 11, aov: 2604, loyaltyPoints: 1432,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["Metal Prints", "Posters"],
    favoriteGenres: ["Typography", "Minimal"],
    recentOrders: [
      { id: "VM-78400", date: "Nov 18, 2026", dateIso: "2026-11-18T14:22:00Z", total: 1200, itemCount: 1, status: "Shipped" },
    ],
    spark: [0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.8, 5.2],
  },
  {
    id: "c14", name: "Ishaan Bose", email: "ishaan.b@hey.com", phone: "+91 98302 10100",
    initials: "IB", accent: C.indigo, segment: "New", tier: "Bronze", city: "Guwahati", state: "AS",
    joinedAt: "Nov 10, 2026", joinedAtIso: "2026-11-10",
    lastOrderAt: "Nov 18, 2026", lastOrderIso: "2026-11-18T11:40:00Z",
    totalSpent: 620, orderCount: 1, aov: 620, loyaltyPoints: 31,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["Hoodies"],
    favoriteGenres: [],
    recentOrders: [
      { id: "VM-78399", date: "Nov 18, 2026", dateIso: "2026-11-18T11:40:00Z", total: 620, itemCount: 1, status: "Processing" },
    ],
    spark: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6],
  },
  {
    id: "c15", name: "Diya Shah", email: "diya.s@tutanota.com", phone: "+91 98412 88102",
    initials: "DS", accent: C.teal, segment: "Regular", tier: "Silver", city: "Surat", state: "GJ",
    joinedAt: "Aug 15, 2025", joinedAtIso: "2025-08-15",
    lastOrderAt: "Nov 17, 2026", lastOrderIso: "2026-11-17T21:10:00Z",
    totalSpent: 5440, orderCount: 4, aov: 1360, loyaltyPoints: 272,
    emailOptIn: true, smsOptIn: true,
    favoriteCategories: ["Cases"],
    favoriteGenres: ["Y2K"],
    recentOrders: [
      { id: "VM-78398", date: "Nov 17, 2026", dateIso: "2026-11-17T21:10:00Z", total: 360, itemCount: 2, status: "Delivered" },
    ],
    spark: [0.2, 0.4, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 1.9, 2.0, 2.1, 2.2],
  },
  {
    id: "c16", name: "Pooja Reddy", email: "pooja@reddy.media", phone: "+91 90120 44182",
    initials: "PR", accent: C.fuchsia, segment: "At Risk", tier: "Silver", city: "Hyderabad", state: "TS",
    joinedAt: "Oct 2, 2024", joinedAtIso: "2024-10-02",
    lastOrderAt: "Sep 2, 2026", lastOrderIso: "2026-09-02T11:34:00Z",
    totalSpent: 8820, orderCount: 7, aov: 1260, loyaltyPoints: 441,
    emailOptIn: true, smsOptIn: false,
    favoriteCategories: ["T-Shirts", "Cases"],
    favoriteGenres: ["Abstract"],
    recentOrders: [
      { id: "VM-78396", date: "Nov 17, 2026", dateIso: "2026-11-17T11:34:00Z", total: 440, itemCount: 2, status: "Cancelled" },
    ],
    spark: [0.4, 0.8, 1.2, 1.4, 1.6, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
  },
];

export const customersSummary = {
  total: customers.length,
  vip:      customers.filter((c) => c.segment === "VIP").length,
  regular:  customers.filter((c) => c.segment === "Regular").length,
  new:      customers.filter((c) => c.segment === "New").length,
  atRisk:   customers.filter((c) => c.segment === "At Risk").length,
  churned:  customers.filter((c) => c.segment === "Churned").length,
};

export const customersHeadline = [
  { label: "Total Customers",   value: "12,480", delta: "↑ +18%",   sub: "+1,890 this month",    tone: "purple" as const },
  { label: "VIP Customers",     value: "142",    delta: "↑ +12",    sub: "Platinum & Gold tier", tone: "amber"  as const },
  { label: "Lifetime Value",    value: "₹8,420", delta: "↑ +22%",   sub: "Avg LTV across base",  tone: "green"  as const },
  { label: "Returning Rate",    value: "58%",    delta: "↑ +4%",    sub: "2+ orders in 90 days", tone: "pink"   as const },
];
