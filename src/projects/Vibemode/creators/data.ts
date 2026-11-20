/** Creators data — Vibe Mode collaborators. */

export type CreatorStatus = "Active" | "Pending" | "On Hold" | "Archived";
export type CreatorTier = "Signature" | "Partner" | "Emerging" | "Guest";
export type SocialPlatform = "instagram" | "youtube" | "x" | "tiktok" | "behance" | "website";

export interface CreatorSocial {
  platform: SocialPlatform;
  handle: string;
  followers: string;
}

export interface CreatorDrop {
  id: string;
  name: string;
  date: string;
  units: number;
  revenue: string;
  status: "Live" | "Sold Out" | "Scheduled" | "Draft";
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  initials: string;
  accent: string;
  status: CreatorStatus;
  tier: CreatorTier;
  joinedAt: string;
  specialties: string[];
  bio: string;
  city: string;
  country: string;
  socials: CreatorSocial[];
  royaltyPercent: number;
  earningsThisMonth: string;
  earningsLifetime: string;
  dropsCount: number;
  topDrop: string;
  recentDrops: CreatorDrop[];
  nextPayout: string;
  contractExpires: string;
  isReturning?: boolean;
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

export const creators: Creator[] = [
  {
    id: "cr01", name: "Luna K.", handle: "@luna-k", email: "luna@lunak.studio", phone: "+91 97400 88812",
    initials: "LK", accent: C.indigo, status: "Active", tier: "Signature", joinedAt: "Oct 24, 2024",
    specialties: ["Illustration", "Typography", "Streetwear"],
    bio: "Illustrator from Bengaluru. Known for maximalist streetwear graphics with handwritten type — brought us the Good Energy and Different People collections.",
    city: "Bengaluru", country: "India",
    socials: [
      { platform: "instagram", handle: "@luna.k.art",    followers: "128K" },
      { platform: "youtube",   handle: "@lunakstudio",   followers: "22K"  },
      { platform: "behance",   handle: "lunakstudio",    followers: "8.4K" },
      { platform: "website",   handle: "lunak.studio",   followers: "—"    },
    ],
    royaltyPercent: 18,
    earningsThisMonth: "₹92,400",
    earningsLifetime: "₹6,82,100",
    dropsCount: 12,
    topDrop: "Good Energy Tee — Drop 03",
    recentDrops: [
      { id: "d1", name: "Good Energy Tee",         date: "Nov 14, 2026", units: 412, revenue: "₹98,880",   status: "Live" },
      { id: "d2", name: "Different People Hoodie", date: "Nov 10, 2026", units: 320, revenue: "₹1,53,600", status: "Sold Out" },
      { id: "d3", name: "Luna K. × Vibe Mode Tee", date: "Nov 28, 2026", units: 0,   revenue: "—",         status: "Scheduled" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Apr 2027",
    isReturning: true,
  },
  {
    id: "cr02", name: "Aarav Mehta", handle: "@aarav.m", email: "aarav.m@makers.studio", phone: "+91 98100 12345",
    initials: "AM", accent: C.violet, status: "Active", tier: "Partner", joinedAt: "Jan 12, 2025",
    specialties: ["Type Design", "Minimal"],
    bio: "Type designer from Mumbai. Lettering + minimal compositions. Delivered the Chaotic Good capsule.",
    city: "Mumbai", country: "India",
    socials: [
      { platform: "instagram", handle: "@aarav.type",  followers: "42K" },
      { platform: "x",         handle: "@aarav_type",  followers: "6.8K" },
      { platform: "behance",   handle: "aaravmehta",   followers: "3.1K" },
    ],
    royaltyPercent: 15,
    earningsThisMonth: "₹41,200",
    earningsLifetime: "₹2,48,400",
    dropsCount: 6,
    topDrop: "Chaotic Good Tee",
    recentDrops: [
      { id: "d4", name: "Chaotic Good Tee",    date: "Nov 1, 2026",  units: 386, revenue: "₹92,640", status: "Live" },
      { id: "d5", name: "Chaotic Good Poster", date: "Nov 14, 2026", units: 186, revenue: "₹27,900", status: "Live" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Jan 2027",
  },
  {
    id: "cr03", name: "Riya Sharma", handle: "@riya.vibes", email: "riya@visuals.shop", phone: "+91 98102 44210",
    initials: "RS", accent: C.pink, status: "Active", tier: "Partner", joinedAt: "Mar 4, 2025",
    specialties: ["Photography", "Nature", "Brand"],
    bio: "Photographer + art director. Shot the Butterfly Season campaign and produced the Nov hero lookbook.",
    city: "Delhi", country: "India",
    socials: [
      { platform: "instagram", handle: "@riya.vibes",   followers: "86K"  },
      { platform: "youtube",   handle: "@riyavibes",    followers: "14K"  },
      { platform: "website",   handle: "riya.studio",   followers: "—"    },
    ],
    royaltyPercent: 12,
    earningsThisMonth: "₹28,800",
    earningsLifetime: "₹1,42,000",
    dropsCount: 5,
    topDrop: "Butterfly Hoodie",
    recentDrops: [
      { id: "d6", name: "Butterfly Hoodie",        date: "Oct 24, 2026", units: 428, revenue: "₹2,05,440", status: "Live" },
      { id: "d7", name: "Butterfly Season Tote",   date: "Nov 22, 2026", units: 0,   revenue: "—",         status: "Scheduled" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Mar 2027",
  },
  {
    id: "cr04", name: "Kabir Sethi", handle: "@kabir.studio", email: "kabir@sethi.dev", phone: "+91 98214 55012",
    initials: "KS", accent: C.blue, status: "Pending", tier: "Emerging", joinedAt: "Nov 18, 2026",
    specialties: ["3D", "Y2K", "Posters"],
    bio: "3D artist from Hyderabad exploring Y2K aesthetics. 6 pieces in portfolio — awaiting review.",
    city: "Hyderabad", country: "India",
    socials: [
      { platform: "instagram", handle: "@kabir.studio", followers: "18K" },
      { platform: "behance",   handle: "kabirsethi",    followers: "2.4K" },
      { platform: "x",         handle: "@kabir_3d",     followers: "1.1K" },
    ],
    royaltyPercent: 0,
    earningsThisMonth: "₹0",
    earningsLifetime: "₹0",
    dropsCount: 0,
    topDrop: "—",
    recentDrops: [],
    nextPayout: "Not scheduled",
    contractExpires: "—",
  },
  {
    id: "cr05", name: "Priya Nair", handle: "@priya.nair", email: "priya.nair@outlook.com", phone: "+91 98466 00142",
    initials: "PN", accent: C.rose, status: "Active", tier: "Partner", joinedAt: "Jun 8, 2025",
    specialties: ["Illustration", "Nature", "Abstract"],
    bio: "Botanical illustrator from Kochi. Works with watercolour + risograph textures. Nature-forward palettes.",
    city: "Kochi", country: "India",
    socials: [
      { platform: "instagram", handle: "@priya.in.print", followers: "56K" },
      { platform: "tiktok",    handle: "@priya.in.print", followers: "22K" },
      { platform: "behance",   handle: "priyanair",       followers: "4.6K" },
    ],
    royaltyPercent: 14,
    earningsThisMonth: "₹18,400",
    earningsLifetime: "₹88,200",
    dropsCount: 4,
    topDrop: "Butterfly Season Tote",
    recentDrops: [
      { id: "d8", name: "Butterfly Season Tote", date: "Nov 22, 2026", units: 0,  revenue: "—",       status: "Scheduled" },
      { id: "d9", name: "Good Energy Poster",    date: "Nov 14, 2026", units: 128, revenue: "₹19,200", status: "Live" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Jun 2027",
  },
  {
    id: "cr06", name: "Zara Khan", handle: "@zara.vibes", email: "zara.khan@hey.com", phone: "+91 96812 03442",
    initials: "ZK", accent: C.amber, status: "Pending", tier: "Guest", joinedAt: "Nov 15, 2026",
    specialties: ["Streetwear", "Y2K"],
    bio: "Fashion stylist from Jaipur. Applying for a one-drop guest capsule.",
    city: "Jaipur", country: "India",
    socials: [
      { platform: "instagram", handle: "@zara.fits",  followers: "34K" },
      { platform: "tiktok",    handle: "@zara.fits",  followers: "68K" },
    ],
    royaltyPercent: 0,
    earningsThisMonth: "₹0",
    earningsLifetime: "₹0",
    dropsCount: 0,
    topDrop: "—",
    recentDrops: [],
    nextPayout: "Not scheduled",
    contractExpires: "—",
  },
  {
    id: "cr07", name: "Dev Patel", handle: "@dev.3d", email: "dev.patel@proton.me", phone: "+91 90088 12210",
    initials: "DP", accent: C.slate, status: "Active", tier: "Signature", joinedAt: "Feb 14, 2025",
    specialties: ["3D", "Music", "Minimal"],
    bio: "3D motion artist from Ahmedabad. Studio Session hoodie illustrations and the hero loop for Drop 03.",
    city: "Ahmedabad", country: "India",
    socials: [
      { platform: "instagram", handle: "@dev.renders", followers: "112K" },
      { platform: "youtube",   handle: "@devrenders",  followers: "48K"  },
      { platform: "x",         handle: "@dev_renders", followers: "14K"  },
      { platform: "behance",   handle: "devpatel3d",   followers: "6.8K" },
    ],
    royaltyPercent: 18,
    earningsThisMonth: "₹68,800",
    earningsLifetime: "₹4,12,000",
    dropsCount: 9,
    topDrop: "Studio Session Hoodie",
    recentDrops: [
      { id: "d10", name: "Studio Session Hoodie", date: "Oct 24, 2026", units: 278, revenue: "₹1,33,440", status: "Live" },
      { id: "d11", name: "Smile Mug",             date: "Oct 2, 2026",  units: 212, revenue: "₹42,400",   status: "Live" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Feb 2027",
    isReturning: true,
  },
  {
    id: "cr08", name: "Arjun Rao", handle: "@arjun.rao", email: "arjun.rao@fastmail.com", phone: "+91 91234 55018",
    initials: "AR", accent: C.orange, status: "Active", tier: "Partner", joinedAt: "Sep 2, 2024",
    specialties: ["Streetwear", "Music"],
    bio: "Graphic designer + music producer from Mysuru. Designed the Different People Hoodie typography.",
    city: "Mysuru", country: "India",
    socials: [
      { platform: "instagram", handle: "@arjun.graphs", followers: "48K" },
      { platform: "x",         handle: "@arjun_graphs", followers: "3.2K" },
    ],
    royaltyPercent: 14,
    earningsThisMonth: "₹32,100",
    earningsLifetime: "₹2,18,800",
    dropsCount: 7,
    topDrop: "Different People Hoodie",
    recentDrops: [
      { id: "d12", name: "Different People Hoodie", date: "Nov 10, 2026", units: 320, revenue: "₹1,53,600", status: "Sold Out" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Sep 2026",
  },
  {
    id: "cr09", name: "Meera Chawla", handle: "@meera.types", email: "meera.c@signal.org", phone: "+91 98201 44120",
    initials: "MC", accent: C.fuchsia, status: "Active", tier: "Emerging", joinedAt: "May 18, 2025",
    specialties: ["Typography", "Abstract"],
    bio: "Independent type designer. Crafted the eyebrow typefaces for Vibe Mode Drop 02.",
    city: "Lucknow", country: "India",
    socials: [
      { platform: "instagram", handle: "@meera.types", followers: "22K" },
      { platform: "behance",   handle: "meerachawla",  followers: "4.8K" },
    ],
    royaltyPercent: 10,
    earningsThisMonth: "₹8,400",
    earningsLifetime: "₹42,000",
    dropsCount: 2,
    topDrop: "Chaotic Good Poster",
    recentDrops: [
      { id: "d13", name: "Chaotic Good Poster", date: "Nov 14, 2026", units: 186, revenue: "₹27,900", status: "Live" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "May 2026",
  },
  {
    id: "cr10", name: "Ishaan Bose", handle: "@ishaan.bose", email: "ishaan.b@hey.com", phone: "+91 98302 10100",
    initials: "IB", accent: C.cyan, status: "On Hold", tier: "Emerging", joinedAt: "Jul 1, 2025",
    specialties: ["Illustration", "Anime"],
    bio: "Anime-inspired illustrator from Guwahati. Current collaboration on pause while a licensing question resolves.",
    city: "Guwahati", country: "India",
    socials: [
      { platform: "instagram", handle: "@ishaan.ink", followers: "68K" },
      { platform: "youtube",   handle: "@ishaanink",  followers: "11K" },
    ],
    royaltyPercent: 0,
    earningsThisMonth: "₹0",
    earningsLifetime: "₹24,800",
    dropsCount: 2,
    topDrop: "Butterfly Hoodie",
    recentDrops: [],
    nextPayout: "On hold",
    contractExpires: "Jul 2026",
  },
  {
    id: "cr11", name: "Tanya Kapoor", handle: "@tanya.metal", email: "tanya@kapoor.shop", phone: "+91 98422 44100",
    initials: "TK", accent: C.teal, status: "Active", tier: "Guest", joinedAt: "Jan 28, 2025",
    specialties: ["Metal Prints", "Minimal"],
    bio: "One-drop guest creator. Brought the Chaotic Good Metal Print — her largest-ticket item in the catalog.",
    city: "Bengaluru", country: "India",
    socials: [
      { platform: "instagram", handle: "@tanyakapoor", followers: "92K" },
      { platform: "website",   handle: "kapoor.shop",  followers: "—"   },
    ],
    royaltyPercent: 20,
    earningsThisMonth: "₹14,600",
    earningsLifetime: "₹38,400",
    dropsCount: 1,
    topDrop: "Chaotic Good Metal Print",
    recentDrops: [
      { id: "d14", name: "Chaotic Good Metal Print", date: "Nov 2, 2026", units: 24, revenue: "₹38,400", status: "Live" },
    ],
    nextPayout: "Dec 1, 2026",
    contractExpires: "Feb 2026",
  },
  {
    id: "cr12", name: "Vivaan Joshi", handle: "@vivaan.j", email: "vivaan.joshi@yahoo.co.in", phone: "+91 90120 44182",
    initials: "VJ", accent: C.emerald, status: "Archived", tier: "Guest", joinedAt: "Nov 2, 2024",
    specialties: ["Vintage", "Posters"],
    bio: "Former guest creator — previously delivered the Vintage Mode poster set. Not currently collaborating.",
    city: "Nagpur", country: "India",
    socials: [
      { platform: "instagram", handle: "@vivaan.vintage", followers: "28K" },
    ],
    royaltyPercent: 0,
    earningsThisMonth: "₹0",
    earningsLifetime: "₹18,200",
    dropsCount: 2,
    topDrop: "Vintage Mode Poster",
    recentDrops: [],
    nextPayout: "—",
    contractExpires: "Expired",
  },
];

export const creatorsSummary = {
  total: creators.length,
  active:   creators.filter((c) => c.status === "Active").length,
  pending:  creators.filter((c) => c.status === "Pending").length,
  onHold:   creators.filter((c) => c.status === "On Hold").length,
  archived: creators.filter((c) => c.status === "Archived").length,
};

export const creatorsHeadline = [
  { label: "Active creators",      value: String(creatorsSummary.active), delta: "↑ +2 this month",  sub: "Signature · Partner · Emerging", tone: "purple" as const },
  { label: "Pending applications", value: String(creatorsSummary.pending), delta: "6 to review",       sub: "Oldest submitted 2 days ago",     tone: "amber"  as const },
  { label: "Avg royalty",          value: "14.8%",                         delta: "↑ +0.4pp",         sub: "Weighted by drop revenue",        tone: "green"  as const },
  { label: "Payouts (Dec 1)",      value: "₹3.04L",                         delta: "9 creators",       sub: "Processing in 11 days",           tone: "pink"   as const },
];
