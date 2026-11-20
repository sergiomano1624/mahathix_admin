/** Navigation definitions shared by the layouts. */

export interface MenuItem {
  label: string;
  href: string;
  /** Highlight only on an exact path match (for section roots). */
  exact?: boolean;
  /** Inline SVG, used where the menu renders icons. */
  icon?: string;
  /** Marks a destructive entry, e.g. sign out. */
  danger?: boolean;
  /** Optional right-aligned badge (e.g. unread count). */
  badge?: string;
  /** Marks a feature that isn't shipped yet — renders a "Soon" chip. */
  comingSoon?: boolean;
}

const userIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.4" r="3.6"/><path d="M4.8 19.6c0-3.4 3.2-5.6 7.2-5.6s7.2 2.2 7.2 5.6"/></svg>`;
const settingsIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M19.2 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.2a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.2a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1v-.2a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.8 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.2a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.4.9Z"/></svg>`;
const logoutIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 16.5v1.8a2 2 0 0 1-2 2H6.4a2 2 0 0 1-2-2V5.7a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2v1.8"/><path d="M10.4 12h9.2"/><path d="m16.6 8.8 3.2 3.2-3.2 3.2"/></svg>`;

const icon = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const filledIcon = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${paths}</svg>`;

/** Header mainMenu is hidden in the current layout — kept for compat. */
export const mainMenu: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: icon('<path d="M4.2 10.6 12 4.2l7.8 6.4v8a1.8 1.8 0 0 1-1.8 1.8H6a1.8 1.8 0 0 1-1.8-1.8Z"/><path d="M9.6 20.4v-7h4.8v7"/>') },
];

/** User-avatar dropdown (header). */
export const userMenu: MenuItem[] = [
  { label: "Profile", href: "/settings", icon: userIcon },
  { label: "Account settings", href: "/settings", icon: settingsIcon },
  { label: "Sign out", href: "/login", icon: logoutIcon, danger: true },
];

/**
 * The sidebar menu now lives in `src/projects/<Project>/menu.json`.
 * Each project ships its own JSON; AdminShell loads it at the top of the tree.
 */

/** Social-media platform glyphs used in the dashboard. */
export const platformIcons: Record<string, string> = {
  instagram: filledIcon('<path d="M12 2.2c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.4a3.1 3.1 0 0 1 1.1.8c.4.4.6.7.8 1.1.2.4.3 1 .4 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.4 1.9-.2.4-.4.7-.8 1.1-.4.4-.7.6-1.1.8-.4.2-1 .3-1.9.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.4a3.1 3.1 0 0 1-1.1-.8 3.1 3.1 0 0 1-.8-1.1c-.2-.4-.3-1-.4-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.4-1.9.2-.4.4-.7.8-1.1.4-.4.7-.6 1.1-.8.4-.2 1-.3 1.9-.4C9 2.2 9.3 2.2 12 2.2Zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.3.2-1.7.3-.4.1-.7.3-.9.6a2 2 0 0 0-.6.9c-.1.4-.3.8-.3 1.7 0 1 0 1.3-.1 4s0 3 .1 4c0 .9.2 1.3.3 1.7.1.4.3.7.6.9.3.3.6.5.9.6.4.2.8.3 1.7.3 1 0 1.3.1 4 .1s3 0 4-.1c.9 0 1.3-.2 1.7-.3.4-.1.7-.3.9-.6.3-.3.5-.6.6-.9.1-.4.3-.8.3-1.7 0-1 .1-1.3.1-4s0-3-.1-4c0-.9-.2-1.3-.3-1.7-.1-.4-.3-.7-.6-.9a2 2 0 0 0-.9-.6c-.4-.1-.8-.3-1.7-.3-1-.1-1.3-.1-4-.1Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>'),
  facebook: filledIcon('<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.9c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z"/>'),
  youtube: filledIcon('<path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.4 5 12 5 12 5s-6.4 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8c1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM10 15.3V8.7l5.5 3.3Z"/>'),
  x: filledIcon('<path d="M18.9 3.2h3l-6.6 7.6 7.8 10h-6.1l-4.8-6.3-5.5 6.3H3.7l7-8-7.5-9.6h6.3l4.4 5.8 5-5.8Zm-1 15.9h1.7L7.2 4.8H5.4Z"/>'),
  linkedin: filledIcon('<path d="M4.4 3.4h15.2a1 1 0 0 1 1 1v15.2a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1Zm2.8 6.1h3v8.4h-3v-8.4Zm1.5-4.3a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm4.4 4.3h2.9v1.2a3.4 3.4 0 0 1 3-1.4c3.2 0 3.8 2.1 3.8 4.8v4.8h-3v-4.3c0-1-.1-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.4h-3v-9.4Z"/>'),
  tiktok: filledIcon('<path d="M20 8.6a7 7 0 0 1-4.2-1.4V15a5.8 5.8 0 1 1-5-5.8V12a3 3 0 1 0 2.1 2.9V2.8h2.9A4.1 4.1 0 0 0 20 5.7Z"/>'),
};

/** Small print links, rendered in the footer. */
export const footerMenu: MenuItem[] = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Support", href: "#support" },
];

export const helpLink: MenuItem = { label: "Help", href: "#support" };

export const currentUser = { name: "Manoj Kumar", initials: "MK", role: "Admin" };
