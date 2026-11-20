import type { JSX } from "solid-js";
import { For, createSignal } from "solid-js";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import {
  COLOR_PRESET_METADATA,
  LAYOUT_METADATA,
  SIDEBAR_STYLE_METADATA,
  applyCustomization,
  customization,
  resetCustomization,
  type ColorPreset,
  type LayoutMode,
  type SidebarStyle,
  type SurfaceEffect,
  type ThemeMode,
} from "@/shared/lib/customization";
import { toast } from "@/shared/toast/toast";
import "./CustomizationDrawer.css";

const sunIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>`;
const monitorIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>`;
const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`;
const resetIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>`;
const sparkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>`;
const layoutIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>`;
const paletteIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>`;
const sidebarIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><line x1="9" x2="9" y1="3" y2="21" /></svg>`;

const [open, setOpen] = createSignal(false);
export const openCustomizationDrawer = () => setOpen(true);
export const closeCustomizationDrawer = () => setOpen(false);

export function CustomizationDrawer(): JSX.Element {
  return (
    <Drawer
      open={open()}
      onClose={() => setOpen(false)}
      title="Theme & Workspace Settings"
      description="Personalize your workspace colors, navigation layout, and theme."
      width="min(480px, 100vw)"
      side="right"
      class="customizer-drawer"
      footer={
        <div class="customizer-footer">
          <button
            type="button"
            class="customizer-reset-btn"
            title="Reset all appearance customizations"
            onClick={() => {
              resetCustomization();
              toast.success("Workspace appearance reset to defaults.", "Reset complete");
            }}
          >
            <span innerHTML={resetIcon} />
            <span>Reset to default</span>
          </button>
          <button
            type="button"
            class="customizer-done-btn"
            onClick={() => setOpen(false)}
          >
            Done
          </button>
        </div>
      }
    >
      <div class="customizer-body">
        <section class="customizer-section">
          <div class="customizer-section-head">
            <span class="customizer-section-title">
              <span innerHTML={sunIcon} /> Color Theme
            </span>
            <span class="customizer-section-subtitle">Light, dark, or system match</span>
          </div>
          <div class="customizer-theme-grid">
            <For each={["light", "dark", "system"] as ThemeMode[]}>
              {(mode) => (
                <button
                  type="button"
                  class="customizer-theme-card"
                  classList={{ "is-active": customization.theme === mode }}
                  data-theme-set={mode}
                  onClick={() => applyCustomization({ theme: mode })}
                >
                  <span class="customizer-theme-icon" innerHTML={mode === "light" ? sunIcon : mode === "dark" ? moonIcon : monitorIcon} />
                  <span class="customizer-theme-label">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                </button>
              )}
            </For>
          </div>
        </section>

        <section class="customizer-section">
          <div class="customizer-section-head">
            <span class="customizer-section-title">
              <span innerHTML={paletteIcon} /> Primary Accent Color
            </span>
            <span class="customizer-section-subtitle">Pervasive across buttons, highlights, &amp; rails</span>
          </div>
          <div class="customizer-color-grid">
            <For each={Object.keys(COLOR_PRESET_METADATA) as ColorPreset[]}>
              {(preset) => {
                const meta = COLOR_PRESET_METADATA[preset];
                return (
                  <button
                    type="button"
                    class="customizer-color-card"
                    classList={{ "is-active": customization.color === preset }}
                    data-color-set={preset}
                    onClick={() => {
                      applyCustomization({ color: preset });
                      toast.info(`Accent color switched to ${meta.name}`, "Color updated");
                    }}
                  >
                    <div class="customizer-color-swatch-row">
                      <span class="customizer-color-circle" style={{ "background-color": meta.hex }} />
                      <span class="customizer-color-check" innerHTML={checkIcon} />
                    </div>
                    <strong class="customizer-color-name">{meta.name}</strong>
                    <span class="customizer-color-desc">{meta.desc}</span>
                  </button>
                );
              }}
            </For>
          </div>
        </section>

        <section class="customizer-section">
          <div class="customizer-section-head">
            <span class="customizer-section-title">
              <span innerHTML={layoutIcon} /> Navigation Layout
            </span>
            <span class="customizer-section-subtitle">Switch how your workspace is structured</span>
          </div>
          <div class="customizer-layout-grid">
            <For each={["rail", "vertical", "horizontal"] as LayoutMode[]}>
              {(mode) => {
                const meta = LAYOUT_METADATA[mode];
                return (
                  <button
                    type="button"
                    class="customizer-layout-card"
                    classList={{ "is-active": customization.layout === mode }}
                    data-layout-set={mode}
                    onClick={() => {
                      applyCustomization({ layout: mode });
                      toast.success(`Layout changed to ${meta.title}`, "Layout updated");
                    }}
                  >
                    <div class="customizer-wireframe" style={mode === "horizontal" ? { "flex-direction": "column" } : undefined}>
                      {mode === "rail" && <div class="customizer-wireframe-rail" />}
                      {mode === "vertical" && <div class="customizer-wireframe-vertical" />}
                      <div class="customizer-wireframe-content">
                        <div class="customizer-wireframe-header" style={mode === "horizontal" ? { height: "10px", margin: "4px 4px 0" } : undefined} />
                        {mode === "horizontal" && <div class="customizer-wireframe-subnav" style={{ margin: "2px 4px 0" }} />}
                        <div class="customizer-wireframe-cards" style={mode === "horizontal" ? { margin: "4px", flex: "1" } : undefined}>
                          <div class="customizer-wireframe-box" />
                          <div class="customizer-wireframe-box" />
                        </div>
                      </div>
                    </div>
                    <div class="customizer-layout-info">
                      {meta.badge ? (
                        <div class="customizer-layout-title-row">
                          <strong class="customizer-layout-title">{meta.title}</strong>
                          <span class="customizer-layout-badge">{meta.badge}</span>
                        </div>
                      ) : (
                        <strong class="customizer-layout-title">{meta.title}</strong>
                      )}
                      <span class="customizer-layout-desc">{meta.subtitle}</span>
                    </div>
                  </button>
                );
              }}
            </For>
          </div>
        </section>

        <section class="customizer-section">
          <div class="customizer-section-head">
            <span class="customizer-section-title">
              <span innerHTML={sidebarIcon} /> Sidebar Active Style
            </span>
            <span class="customizer-section-subtitle">Visual treatment of active navigation item</span>
          </div>
          <div class="customizer-sidebar-style-grid">
            <For each={Object.keys(SIDEBAR_STYLE_METADATA) as SidebarStyle[]}>
              {(style) => {
                const meta = SIDEBAR_STYLE_METADATA[style];
                return (
                  <button
                    type="button"
                    class="customizer-style-card"
                    classList={{ "is-active": customization.sidebarStyle === style }}
                    data-sidebar-style-set={style}
                    onClick={() => {
                      applyCustomization({ sidebarStyle: style });
                      toast.info(`Active tab style set to ${meta.label}`, "Sidebar updated");
                    }}
                  >
                    <strong class="customizer-style-label">{meta.label}</strong>
                    <span class="customizer-style-desc">{meta.desc}</span>
                  </button>
                );
              }}
            </For>
          </div>
        </section>

        <section class="customizer-section">
          <div class="customizer-section-head">
            <span class="customizer-section-title">
              <span innerHTML={sparkIcon} /> Visual Flourishes
            </span>
          </div>
          <div
            class="customizer-toggle-row"
            classList={{ "is-active": customization.surfaceEffect === "glass" }}
            id="customizer-glass-toggle"
            onClick={() => {
              const next: SurfaceEffect = customization.surfaceEffect === "glass" ? "default" : "glass";
              applyCustomization({ surfaceEffect: next });
              toast.info(
                next === "glass" ? "Frosted glassmorphism enabled" : "Standard surfaces restored",
                "Surface effect",
              );
            }}
          >
            <div class="customizer-toggle-meta">
              <strong class="customizer-toggle-title">Frosted Glassmorphism</strong>
              <span class="customizer-toggle-subtitle">Translucent backdrop blur on headers and panels</span>
            </div>
            <div class="customizer-switch" />
          </div>
        </section>
      </div>
    </Drawer>
  );
}
