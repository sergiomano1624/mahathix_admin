/** Orders data — Vibe Mode. */

export type OrderStatus =
  | "New"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export type PaymentMethod = "upi" | "card" | "cod" | "wallet";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  accent: string;
  initials: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  initials: string;
  accent: string;
  city: string;
  state: string;
  isReturning?: boolean;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  payment: PaymentMethod;
  paid: boolean;
  status: OrderStatus;
  placedAt: string;
  placedAtIso: string;
  tracking?: string;
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
};

export const orders: Order[] = [
  {
    id: "VM-78412",
    customer: { name: "Aarav Mehta", email: "aarav.m@vibemode.in", initials: "AM", accent: C.violet, city: "Mumbai", state: "MH", isReturning: true },
    items: [
      { id: "p01", name: "Good Energy Tee", quantity: 2, price: 240, accent: C.violet, initials: "GE" },
      { id: "p03", name: "Vibe Mode Cap", quantity: 1, price: 220, accent: C.blue, initials: "VM" },
    ],
    itemCount: 3, subtotal: 700, shipping: 60, total: 760, payment: "upi", paid: true, status: "New",
    placedAt: "Today, 11:04 AM", placedAtIso: "2026-11-20T11:04:00Z",
  },
  {
    id: "VM-78411",
    customer: { name: "Riya Sharma", email: "riya.s@storez55.com", initials: "RS", accent: C.pink, city: "Delhi", state: "DL" },
    items: [
      { id: "p02", name: "Different People Hoodie", quantity: 1, price: 480, accent: C.slate, initials: "DP" },
    ],
    itemCount: 1, subtotal: 480, shipping: 0, total: 480, payment: "card", paid: true, status: "Processing",
    placedAt: "Today, 10:28 AM", placedAtIso: "2026-11-20T10:28:00Z",
  },
  {
    id: "VM-78410",
    customer: { name: "Luna K.", email: "luna@lunak.studio", initials: "LK", accent: C.indigo, city: "Bengaluru", state: "KA", isReturning: true },
    items: [
      { id: "p17", name: "Luna K. × Vibe Mode Tee", quantity: 3, price: 260, accent: C.indigo, initials: "LK" },
      { id: "p13", name: "Good Energy Poster", quantity: 2, price: 150, accent: C.violet, initials: "GP" },
    ],
    itemCount: 5, subtotal: 1080, shipping: 0, total: 1080, payment: "upi", paid: true, status: "Shipped",
    placedAt: "Today, 09:12 AM", placedAtIso: "2026-11-20T09:12:00Z", tracking: "DTDC198472",
  },
  {
    id: "VM-78409",
    customer: { name: "Rohan Iyer", email: "r.iyer@gmail.com", initials: "RI", accent: C.emerald, city: "Chennai", state: "TN" },
    items: [
      { id: "p06", name: "Smile Phone Case", quantity: 2, price: 160, accent: C.emerald, initials: "SM" },
    ],
    itemCount: 2, subtotal: 320, shipping: 40, total: 360, payment: "cod", paid: false, status: "New",
    placedAt: "Today, 08:46 AM", placedAtIso: "2026-11-20T08:46:00Z",
  },
  {
    id: "VM-78408",
    customer: { name: "Priya Nair", email: "priya.nair@outlook.com", initials: "PN", accent: C.rose, city: "Kochi", state: "KL", isReturning: true },
    items: [
      { id: "p05", name: "Butterfly Hoodie", quantity: 1, price: 480, accent: C.pink, initials: "BH" },
      { id: "p11", name: "Butterfly Season Tote", quantity: 1, price: 320, accent: C.amber, initials: "BS" },
    ],
    itemCount: 2, subtotal: 800, shipping: 0, total: 800, payment: "card", paid: true, status: "Delivered",
    placedAt: "Yesterday, 06:40 PM", placedAtIso: "2026-11-19T18:40:00Z", tracking: "BD298112",
  },
  {
    id: "VM-78407",
    customer: { name: "Kabir Sethi", email: "kabir@sethi.dev", initials: "KS", accent: C.blue, city: "Hyderabad", state: "TS" },
    items: [
      { id: "p04", name: "Chaotic Good Tee", quantity: 1, price: 240, accent: C.pink, initials: "CG" },
    ],
    itemCount: 1, subtotal: 240, shipping: 60, total: 300, payment: "upi", paid: true, status: "Delivered",
    placedAt: "Yesterday, 05:12 PM", placedAtIso: "2026-11-19T17:12:00Z", tracking: "DTDC198421",
  },
  {
    id: "VM-78406",
    customer: { name: "Zara Khan", email: "zara.khan@hey.com", initials: "ZK", accent: C.amber, city: "Jaipur", state: "RJ" },
    items: [
      { id: "p10", name: "Festival Vibes Cap", quantity: 2, price: 220, accent: C.rose, initials: "FV" },
    ],
    itemCount: 2, subtotal: 440, shipping: 0, total: 440, payment: "wallet", paid: true, status: "Shipped",
    placedAt: "Yesterday, 02:18 PM", placedAtIso: "2026-11-19T14:18:00Z", tracking: "BD298103",
  },
  {
    id: "VM-78405",
    customer: { name: "Dev Patel", email: "dev.patel@proton.me", initials: "DP", accent: C.slate, city: "Ahmedabad", state: "GJ" },
    items: [
      { id: "p07", name: "Studio Session Hoodie", quantity: 1, price: 480, accent: C.indigo, initials: "SS" },
      { id: "p03", name: "Vibe Mode Cap", quantity: 1, price: 220, accent: C.blue, initials: "VM" },
    ],
    itemCount: 2, subtotal: 700, shipping: 0, total: 700, payment: "card", paid: true, status: "Processing",
    placedAt: "Yesterday, 11:02 AM", placedAtIso: "2026-11-19T11:02:00Z",
  },
  {
    id: "VM-78404",
    customer: { name: "Saanvi Gupta", email: "saanvi@gupta.co", initials: "SG", accent: C.cyan, city: "Pune", state: "MH" },
    items: [
      { id: "p15", name: "Smile Mug", quantity: 4, price: 180, accent: C.amber, initials: "SM" },
    ],
    itemCount: 4, subtotal: 720, shipping: 60, total: 780, payment: "upi", paid: true, status: "Cancelled",
    placedAt: "Yesterday, 09:34 AM", placedAtIso: "2026-11-19T09:34:00Z",
  },
  {
    id: "VM-78403",
    customer: { name: "Arjun Rao", email: "arjun.rao@fastmail.com", initials: "AR", accent: C.orange, city: "Mysuru", state: "KA", isReturning: true },
    items: [
      { id: "p02", name: "Different People Hoodie", quantity: 2, price: 480, accent: C.slate, initials: "DP" },
    ],
    itemCount: 2, subtotal: 960, shipping: 0, total: 960, payment: "card", paid: true, status: "Delivered",
    placedAt: "Nov 18, 08:22 PM", placedAtIso: "2026-11-18T20:22:00Z", tracking: "DTDC198298",
  },
  {
    id: "VM-78402",
    customer: { name: "Meera Chawla", email: "meera.c@signal.org", initials: "MC", accent: C.violet, city: "Lucknow", state: "UP" },
    items: [
      { id: "p08", name: "Chaotic Good Poster", quantity: 1, price: 150, accent: C.pink, initials: "CG" },
      { id: "p13", name: "Good Energy Poster", quantity: 1, price: 150, accent: C.violet, initials: "GP" },
    ],
    itemCount: 2, subtotal: 300, shipping: 60, total: 360, payment: "upi", paid: true, status: "Delivered",
    placedAt: "Nov 18, 07:04 PM", placedAtIso: "2026-11-18T19:04:00Z", tracking: "BD298041",
  },
  {
    id: "VM-78401",
    customer: { name: "Nikhil Verma", email: "n.verma@icloud.com", initials: "NV", accent: C.emerald, city: "Kolkata", state: "WB" },
    items: [
      { id: "p01", name: "Good Energy Tee", quantity: 1, price: 240, accent: C.violet, initials: "GE" },
    ],
    itemCount: 1, subtotal: 240, shipping: 60, total: 300, payment: "cod", paid: false, status: "Refunded",
    placedAt: "Nov 18, 04:46 PM", placedAtIso: "2026-11-18T16:46:00Z",
  },
  {
    id: "VM-78400",
    customer: { name: "Tanya Kapoor", email: "tanya@kapoor.shop", initials: "TK", accent: C.pink, city: "Bengaluru", state: "KA", isReturning: true },
    items: [
      { id: "p16", name: "Chaotic Good Metal Print", quantity: 1, price: 1200, accent: C.slate, initials: "CG" },
    ],
    itemCount: 1, subtotal: 1200, shipping: 0, total: 1200, payment: "card", paid: true, status: "Shipped",
    placedAt: "Nov 18, 02:22 PM", placedAtIso: "2026-11-18T14:22:00Z", tracking: "BD298036",
  },
  {
    id: "VM-78399",
    customer: { name: "Ishaan Bose", email: "ishaan.b@hey.com", initials: "IB", accent: C.indigo, city: "Guwahati", state: "AS" },
    items: [
      { id: "p05", name: "Butterfly Hoodie", quantity: 1, price: 540, accent: C.pink, initials: "BH" },
    ],
    itemCount: 1, subtotal: 540, shipping: 80, total: 620, payment: "upi", paid: true, status: "Processing",
    placedAt: "Nov 18, 11:40 AM", placedAtIso: "2026-11-18T11:40:00Z",
  },
  {
    id: "VM-78398",
    customer: { name: "Diya Shah", email: "diya.s@tutanota.com", initials: "DS", accent: C.cyan, city: "Surat", state: "GJ" },
    items: [
      { id: "p18", name: "Different People Case", quantity: 2, price: 160, accent: C.slate, initials: "DP" },
    ],
    itemCount: 2, subtotal: 320, shipping: 40, total: 360, payment: "wallet", paid: true, status: "Delivered",
    placedAt: "Nov 17, 09:10 PM", placedAtIso: "2026-11-17T21:10:00Z", tracking: "DTDC198101",
  },
  {
    id: "VM-78397",
    customer: { name: "Vivaan Joshi", email: "vivaan.joshi@yahoo.co.in", initials: "VJ", accent: C.amber, city: "Nagpur", state: "MH" },
    items: [
      { id: "p11", name: "Butterfly Season Tote", quantity: 2, price: 320, accent: C.amber, initials: "BS" },
      { id: "p15", name: "Smile Mug", quantity: 1, price: 180, accent: C.amber, initials: "SM" },
    ],
    itemCount: 3, subtotal: 820, shipping: 0, total: 820, payment: "upi", paid: true, status: "Delivered",
    placedAt: "Nov 17, 05:08 PM", placedAtIso: "2026-11-17T17:08:00Z", tracking: "BD297998",
  },
  {
    id: "VM-78396",
    customer: { name: "Pooja Reddy", email: "pooja@reddy.media", initials: "PR", accent: C.rose, city: "Hyderabad", state: "TS" },
    items: [
      { id: "p04", name: "Chaotic Good Tee", quantity: 1, price: 240, accent: C.pink, initials: "CG" },
      { id: "p06", name: "Smile Phone Case", quantity: 1, price: 160, accent: C.emerald, initials: "SM" },
    ],
    itemCount: 2, subtotal: 400, shipping: 40, total: 440, payment: "card", paid: true, status: "Cancelled",
    placedAt: "Nov 17, 11:34 AM", placedAtIso: "2026-11-17T11:34:00Z",
  },
  {
    id: "VM-78395",
    customer: { name: "Raghav Sinha", email: "raghav@sinha.in", initials: "RS", accent: C.blue, city: "Patna", state: "BR" },
    items: [
      { id: "p10", name: "Festival Vibes Cap", quantity: 1, price: 220, accent: C.rose, initials: "FV" },
    ],
    itemCount: 1, subtotal: 220, shipping: 80, total: 300, payment: "cod", paid: true, status: "Delivered",
    placedAt: "Nov 17, 08:52 AM", placedAtIso: "2026-11-17T08:52:00Z", tracking: "DTDC197984",
  },
];

export const ordersSummary = {
  total: orders.length,
  new: orders.filter((o) => o.status === "New").length,
  processing: orders.filter((o) => o.status === "Processing").length,
  shipped: orders.filter((o) => o.status === "Shipped").length,
  delivered: orders.filter((o) => o.status === "Delivered").length,
  cancelled: orders.filter((o) => o.status === "Cancelled").length,
  refunded: orders.filter((o) => o.status === "Refunded").length,
};

export const ordersHeadline = [
  { label: "Total Orders (30d)", value: "1,842", delta: "↑ +22%", sub: "vs 1,510 last month", tone: "purple" as const },
  { label: "Revenue (30d)",      value: "₹6.24L", delta: "↑ +22%",    sub: "AOV ₹2,340 · ↑ 8%",     tone: "green" as const },
  { label: "Pending Fulfillment", value: String(orders.filter((o) => o.status === "New" || o.status === "Processing").length), delta: `${orders.filter((o) => o.status === "Shipped").length} in transit`, sub: "Oldest · Today, 8:46 AM", tone: "pink" as const },
  { label: "Fulfillment Rate",   value: "94%",    delta: "↑ +2%",     sub: "Target: 96%",            tone: "amber" as const },
];

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  upi: "UPI",
  card: "Card",
  cod: "Cash on Delivery",
  wallet: "Wallet",
};
