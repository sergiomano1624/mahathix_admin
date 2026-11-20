import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { applyTheme } from "./theme";

export type ThemeMode = "light" | "dark" | "system";
export type ColorPreset = "indigo" | "violet" | "emerald" | "amber" | "rose" | "cyan";
export type LayoutMode = "rail" | "vertical" | "horizontal";
export type SidebarStyle = "curved" | "pill" | "line" | "flat";
export type SurfaceEffect = "default" | "glass";

export interface CustomizationSettings {
  theme: ThemeMode;
  color: ColorPreset;
  layout: LayoutMode;
  sidebarStyle: SidebarStyle;
  surfaceEffect: SurfaceEffect;
}

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  theme: "light",
  color: "indigo",
  layout: "rail",
  sidebarStyle: "curved",
  surfaceEffect: "default",
};

export const COLOR_PRESET_METADATA: Record<ColorPreset, { name: string; hex: string; desc: string }> = {
  indigo: { name: "Mahathix Indigo", hex: "#1a6bf5", desc: "Classic high-focus blue" },
  violet: { name: "Royal Violet", hex: "#7c3aed", desc: "Sophisticated purple accent" },
  emerald: { name: "Emerald Mint", hex: "#059669", desc: "Fresh vibrant green" },
  amber: { name: "Amber Sunset", hex: "#d97706", desc: "Warm energetic gold" },
  rose: { name: "Crimson Rose", hex: "#e11d48", desc: "Bold high-contrast berry" },
  cyan: { name: "Electric Cyan", hex: "#0891b2", desc: "Modern ocean teal" },
};

export const LAYOUT_METADATA: Record<LayoutMode, { title: string; subtitle: string; badge?: string }> = {
  rail: { title: "Curved Rail", subtitle: "Compact 88px icon-rail with signature curved active tab", badge: "Default" },
  vertical: { title: "Expanded Sidebar", subtitle: "Classic 240px vertical sidebar with full menu titles & badges" },
  horizontal: { title: "Horizontal Navbar", subtitle: "Sidebar moves to topbar tabs for maximum canvas width" },
};

export const SIDEBAR_STYLE_METADATA: Record<SidebarStyle, { label: string; desc: string }> = {
  curved: { label: "Organic Notch", desc: "Signature Mahathix S-curve active tab" },
  pill: { label: "Floating Pill", desc: "Modern rounded capsule with subtle glow" },
  line: { label: "Enterprise Line", desc: "Left accent bar with soft background tint" },
  flat: { label: "Minimal Flat", desc: "Subtle typography tint without borders" },
};

const STORAGE_KEY = "mahathix:customization";
const getSystemDark = () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

const loadInitial = (): CustomizationSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const base = stored
      ? { ...DEFAULT_CUSTOMIZATION, ...JSON.parse(stored) }
      : { ...DEFAULT_CUSTOMIZATION };
    // The Header toggle writes mahathix:theme — treat it as the authoritative
    // light/dark preference so the two stores never disagree on first paint.
    const simple = localStorage.getItem("mahathix:theme");
    if (simple === "dark" || simple === "light") base.theme = simple;
    return base;
  } catch {
    return { ...DEFAULT_CUSTOMIZATION };
  }
};

const [customization, setCustomization] = createStore<CustomizationSettings>(loadInitial());

createEffect(() => {
  const root = document.documentElement;
  const resolved = customization.theme === "system" ? (getSystemDark() ? "dark" : "light") : customization.theme;
  // Single source of truth for data-theme lives in theme.ts — delegate so the
  // Header toggle and the drawer theme picker never fight for it.
  applyTheme(resolved);
  root.dataset["themeMode"] = customization.theme;
  root.dataset["colorPreset"] = customization.color;
  root.dataset["layout"] = customization.layout;
  root.dataset["sidebarStyle"] = customization.sidebarStyle;
  root.dataset["surfaceEffect"] = customization.surfaceEffect;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customization));
  } catch { /* ignore */ }
});

if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (customization.theme === "system") {
      applyTheme(getSystemDark() ? "dark" : "light");
    }
  });
}

export { customization };
export const applyCustomization = (partial: Partial<CustomizationSettings>) => setCustomization(partial);
export const resetCustomization = () => setCustomization(DEFAULT_CUSTOMIZATION);
export const getCustomization = () => ({ ...customization });
