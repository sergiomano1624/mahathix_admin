/** Settings page static data. */

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  accent: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  lastSeen: string;
}

export interface Invoice {
  id: string;
  period: string;
  issuedAt: string;
  amount: string;
  status: "Paid" | "Due";
}

export interface Session {
  id: string;
  device: string;
  location: string;
  browser: string;
  lastActive: string;
  current?: boolean;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string; // inline SVG
  status: "Connected" | "Not connected";
  accent: string;
}

export interface NotificationRow {
  id: string;
  label: string;
  detail: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "Manoj Kumar",   email: "manoj@medullatech.ai",   initials: "MK", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", role: "Owner",  lastSeen: "Online now" },
  { id: "u2", name: "Riya Sharma",   email: "riya.s@mahathix.com",    initials: "RS", accent: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", role: "Admin",  lastSeen: "Today, 11:12 AM" },
  { id: "u3", name: "Aarav Mehta",   email: "aarav.m@mahathix.com",   initials: "AM", accent: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)", role: "Editor", lastSeen: "Today, 09:04 AM" },
  { id: "u4", name: "Luna K.",       email: "luna@lunak.studio",      initials: "LK", accent: "linear-gradient(135deg, #818cf8 0%, #4338ca 100%)", role: "Editor", lastSeen: "Yesterday" },
  { id: "u5", name: "Priya Nair",    email: "priya.n@mahathix.com",   initials: "PN", accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)", role: "Viewer", lastSeen: "Nov 18, 2026" },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-11", period: "Nov 2026", issuedAt: "Nov 01, 2026", amount: "₹8,400", status: "Due"  },
  { id: "INV-2026-10", period: "Oct 2026", issuedAt: "Oct 01, 2026", amount: "₹8,400", status: "Paid" },
  { id: "INV-2026-09", period: "Sep 2026", issuedAt: "Sep 01, 2026", amount: "₹8,400", status: "Paid" },
  { id: "INV-2026-08", period: "Aug 2026", issuedAt: "Aug 01, 2026", amount: "₹8,400", status: "Paid" },
  { id: "INV-2026-07", period: "Jul 2026", issuedAt: "Jul 01, 2026", amount: "₹8,400", status: "Paid" },
];

export const sessions: Session[] = [
  { id: "s1", device: "MacBook Pro",     browser: "Safari 18",  location: "Mumbai, IN",     lastActive: "Active now", current: true },
  { id: "s2", device: "iPhone 16 Pro",   browser: "Safari",     location: "Mumbai, IN",     lastActive: "2 hours ago" },
  { id: "s3", device: "Windows Desktop", browser: "Chrome 141", location: "Bengaluru, IN",  lastActive: "Yesterday, 06:22 PM" },
  { id: "s4", device: "iPad Air",        browser: "Safari",     location: "Chennai, IN",    lastActive: "Nov 17, 2026" },
];

const igIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2.2c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.4a3.1 3.1 0 0 1 1.1.8c.4.4.6.7.8 1.1.2.4.3 1 .4 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.4 1.9-.2.4-.4.7-.8 1.1-.4.4-.7.6-1.1.8-.4.2-1 .3-1.9.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.4a3.1 3.1 0 0 1-1.1-.8 3.1 3.1 0 0 1-.8-1.1c-.2-.4-.3-1-.4-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.4-1.9.2-.4.4-.7.8-1.1.4-.4.7-.6 1.1-.8.4-.2 1-.3 1.9-.4C9 2.2 9.3 2.2 12 2.2Zm0 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm5.2-.5a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z"/></svg>`;
const ytIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.4 5 12 5 12 5s-6.4 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8c1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15.3V8.7l5.5 3.3Z"/></svg>`;
const stripeIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M13.7 10.2c0-.7.6-1 1.6-1 1.4 0 3.1.5 4.5 1.2V5.9a12 12 0 0 0-4.5-.9c-3.7 0-6.2 2-6.2 5.3 0 5.1 7 4.3 7 6.5 0 .8-.7 1-1.8 1-1.5 0-3.4-.6-4.9-1.5v4.6a13 13 0 0 0 4.9 1c3.8 0 6.4-1.9 6.4-5.3 0-5.5-7-4.6-7-6.6Z"/></svg>`;
const shopIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M19.6 7 16 3.6c-.2-.2-.4-.3-.7-.3H8.7c-.3 0-.5.1-.7.3L4.4 7c-.3.3-.4.7-.2 1l1.4 3.4V20a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1v-8.6L19.8 8c.2-.3.1-.7-.2-1ZM12 14c-1.5 0-2.8-1.3-2.8-2.8a.6.6 0 1 1 1.2 0c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6a.6.6 0 1 1 1.2 0C14.8 12.7 13.5 14 12 14Z"/></svg>`;
const whatsappIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2Zm4.9 13.2c-.2.5-1.2 1-1.7 1.1-.5 0-1.1 0-1.7-.3-.4-.2-.9-.3-1.6-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.6s.7-1.9.9-2.1c.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.9 2c.1.2 0 .3 0 .5-.1.2-.2.3-.4.4l-.3.4c-.1.1-.2.3 0 .5.1.2.6 1 1.3 1.7.9.7 1.6 1 1.9 1.1.2.1.4.1.5-.1l1-1.1c.2-.2.4-.2.6-.1l1.9 1c.2.1.4.2.5.3.1.2.1 1-.1 1.5Z"/></svg>`;
const mailchimpIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M22 14.3c-.1-.3-.4-.7-.9-1-.2-.1-.4-.2-.5-.4.1-.2.4-.5.4-1 .1-.9-1-1.3-2.1-1.3V8.5c.5-.3 1-1 1.4-1.9.5-1.4.2-2.7-.8-3-.7-.2-1.6.5-2.6 1.6a3.2 3.2 0 0 0-2.3-2.6C13.2 2 11.7 2 10 2.2A17 17 0 0 0 4 4c-1.3.8-1.9 1.8-1.2 2.6.2.3.6.4 1.1.3.3-.1.6-.2.9-.5.4-.3.8-.7 1.3-.9-1.1 1.4-1.9 3-2 4.8 0 .5 0 .9.3 1.1.2.3.5.5 1 .5.3 0 .6-.1.7-.1.2.2 0 .6-.3 1.2-.4.7-.4 1.3 0 2 .5.7 1.4 1.1 2.4 1 2.4-.1 4.5-1 7.4-1.5 1-.2 2-.4 2.9-.4 2 0 2.6 1.6 2.4 2.8-.2 1.3-1 2.1-2.4 2.1-2.8 0-3-2-3-2a.5.5 0 0 0-.9.3s.4 2.8 4.1 2.8c2.2 0 3.6-1.6 3.9-3.2.3-1.6-.4-3.4-2.3-4Z"/></svg>`;

export const integrations: Integration[] = [
  { id: "ig",    name: "Instagram",         description: "Auto-sync drops & catch comments as inbox messages.",  icon: igIcon,        status: "Connected",     accent: "linear-gradient(135deg, #f43f5e 0%, #c026d3 100%)" },
  { id: "yt",    name: "YouTube Shopping",  description: "List products in video descriptions and on live streams.", icon: ytIcon,       status: "Connected",     accent: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)" },
  { id: "stripe",name: "Stripe",            description: "Card & UPI payments, refunds, and dispute management.", icon: stripeIcon,   status: "Connected",     accent: "linear-gradient(135deg, #635bff 0%, #4338ca 100%)" },
  { id: "shop",  name: "Shopify",           description: "Mirror the Vibe Mode storefront catalog.",              icon: shopIcon,     status: "Not connected", accent: "linear-gradient(135deg, #95bf47 0%, #5e8e3e 100%)" },
  { id: "wa",    name: "WhatsApp Business", description: "Shipping notifications and order confirmations.",       icon: whatsappIcon, status: "Not connected", accent: "linear-gradient(135deg, #22c35e 0%, #128c7e 100%)" },
  { id: "mc",    name: "Mailchimp",         description: "Marketing automations & customer segments sync.",       icon: mailchimpIcon,status: "Connected",     accent: "linear-gradient(135deg, #fde68a 0%, #d97706 100%)" },
];

export const notifications: NotificationRow[] = [
  { id: "n1", label: "New orders placed",          detail: "Fire when a customer completes checkout.",        email: true,  sms: true,  push: true,  inApp: true },
  { id: "n2", label: "Low stock alerts",           detail: "Below 20 units on an active SKU.",                email: true,  sms: false, push: true,  inApp: true },
  { id: "n3", label: "Payment failures",           detail: "Card declines or UPI timeouts at checkout.",      email: true,  sms: true,  push: true,  inApp: true },
  { id: "n4", label: "Customer messages",          detail: "DMs, replies and tagged comments on channels.",   email: false, sms: false, push: true,  inApp: true },
  { id: "n5", label: "Drop launches",              detail: "Confirmations when a scheduled drop goes live.",  email: true,  sms: false, push: true,  inApp: true },
  { id: "n6", label: "Creator applications",       detail: "A creator submits an application to join.",       email: true,  sms: false, push: false, inApp: true },
  { id: "n7", label: "Weekly analytics digest",    detail: "Monday 9 AM recap of last week's KPIs.",          email: true,  sms: false, push: false, inApp: false },
];

export const plan = {
  name: "Pro Plan",
  tagline: "For growing brands shipping across channels",
  price: "₹8,400",
  cadence: "/month",
  renewsOn: "Dec 1, 2026",
  usage: [
    { label: "Connected accounts", used: 12,   total: 20,   format: "count"   },
    { label: "Team members",       used: 5,    total: 10,   format: "count"   },
    { label: "Monthly orders",     used: 1842, total: 5000, format: "count"   },
    { label: "Storage",            used: 36,   total: 100,  format: "gb"      },
  ],
  features: [
    "Unlimited drops & scheduled campaigns",
    "Multi-channel publishing with auto-sync",
    "Advanced analytics with drill-downs",
    "Priority email + chat support",
    "Custom roles for up to 10 team members",
  ],
};
