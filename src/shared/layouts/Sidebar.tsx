import type { JSX } from "solid-js";
import { For, Show, createSignal, createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import type { MenuItem } from "@/shared/config/menu";
import { mainMenu } from "@/shared/config/menu";
import "./Sidebar.css";

export interface WorkspaceGroup {
  label: string;
  items: { label: string; href: string; initials?: string; active?: boolean }[];
}

export interface SidebarProps {
  menu?: MenuItem[];
  back?: { label: string; href: string };
  workspace?: {
    title: string;
    subtitle: string;
    initials: string;
    groups: WorkspaceGroup[];
  };
  plan?: {
    name: string;
    used: number;
    total: number;
    label?: string;
    upgradeHref?: string;
  };
}

const chevronIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
const collapseIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>`;
const expandIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;
const backIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>`;
const crownIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M3 7.5 7 11l5-7 5 7 4-3.5L19 18H5Z"/></svg>`;
const arrowRightIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;

const brandLogo = `
<svg viewBox="0 0 28 28" width="28" height="28" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="nav-brand-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#5b21b6"/>
    </linearGradient>
  </defs>
  <rect width="28" height="28" rx="8" fill="url(#nav-brand-grad)"/>
  <path d="M10 8 L19 14 L10 20 Z" fill="#ffffff"/>
  <circle cx="21" cy="9" r="1.6" fill="#ffffff" opacity="0.85"/>
  <circle cx="21" cy="19" r="1.6" fill="#ffffff" opacity="0.6"/>
</svg>`;

const STORAGE_KEY = "mahathix:sidebar_expanded";

const loadExpanded = (): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
};

export function Sidebar(props: SidebarProps = {}): JSX.Element {
  const items = () => props.menu ?? mainMenu;
  const [expanded, setExpanded] = createSignal(loadExpanded());
  const [workspaceOpen, setWorkspaceOpen] = createSignal(false);
  const location = useLocation();

  createEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(expanded()));
    } catch { /* ignore */ }
    const layoutEl = document.querySelector(".layout--app");
    if (layoutEl) layoutEl.classList.toggle("layout--sidebar-expanded", expanded());
  });

  const isCurrent = (item: MenuItem) => {
    const here = location.pathname.replace(/\/$/, "");
    const target = item.href.replace(/\/$/, "");
    if (item.exact) return here === target;
    return target !== "" && (here === target || here.startsWith(`${target}/`));
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (!t.closest(".nav-sidebar__workspace-popover") && !t.closest(".nav-sidebar__workspace-btn")) {
      setWorkspaceOpen(false);
    }
  };
  const onDocKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setWorkspaceOpen(false);
  };
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onDocKey);
  onCleanup(() => {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onDocKey);
  });

  const planPercent = () => {
    if (!props.plan) return 0;
    return Math.min(100, Math.round((props.plan.used / props.plan.total) * 100));
  };

  return (
    <aside class="nav-sidebar" classList={{ "is-expanded": expanded() }}>
      <div class="nav-sidebar__head">
        <a class="nav-sidebar__brand" href="/" aria-label="Mahathix Admin home">
          <span class="nav-sidebar__brand-mark" innerHTML={brandLogo} />
          <span class="nav-sidebar__brand-text">
            <strong>Mahathix Admin</strong>
            <em>Social Media Feed Manager</em>
          </span>
        </a>
        <button
          type="button"
          class="nav-sidebar__collapse"
          aria-label={expanded() ? "Collapse sidebar" : "Expand sidebar"}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          innerHTML={expanded() ? collapseIcon : expandIcon}
        />
      </div>

      <Show when={props.workspace}>
        <div class="nav-sidebar__workspace">
          <button
            class="nav-sidebar__workspace-btn"
            type="button"
            aria-haspopup="menu"
            aria-expanded={workspaceOpen() ? "true" : "false"}
            title={`${props.workspace!.title} · ${props.workspace!.subtitle}`}
            onClick={(e) => {
              e.stopPropagation();
              setWorkspaceOpen((o) => !o);
            }}
          >
            <span class="nav-sidebar__workspace-avatar">{props.workspace!.initials}</span>
            <span class="nav-sidebar__workspace-meta">
              <strong>{props.workspace!.title}</strong>
              <em>{props.workspace!.subtitle}</em>
            </span>
            <span class="nav-sidebar__workspace-chevron" innerHTML={chevronIcon} />
            <span class="nav-sidebar__tooltip">{props.workspace!.title}</span>
          </button>

          <div
            class="nav-sidebar__workspace-popover"
            classList={{ "is-open": workspaceOpen() }}
            role="menu"
            hidden={!workspaceOpen()}
          >
            <div class="nav-sidebar__workspace-pop-head">
              <strong>{props.workspace!.title}</strong>
              <span>{props.workspace!.subtitle}</span>
            </div>
            <div class="nav-sidebar__workspace-pop-list">
              <For each={props.workspace!.groups}>
                {(group) => (
                  <>
                    <div class="nav-sidebar__workspace-group-title">{group.label}</div>
                    <For each={group.items}>
                      {(item) => (
                        <a
                          class="nav-sidebar__workspace-item"
                          classList={{ "is-active": !!item.active }}
                          role="menuitem"
                          href={item.href}
                        >
                          <Show when={item.initials}>
                            <span class="nav-sidebar__workspace-initials">{item.initials}</span>
                          </Show>
                          <span>{item.label}</span>
                        </a>
                      )}
                    </For>
                  </>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>

      <Show when={props.back}>
        <a class="nav-sidebar__back" href={props.back!.href} title={props.back!.label}>
          <span innerHTML={backIcon} />
          <span class="nav-sidebar__back-label">{props.back!.label}</span>
          <span class="nav-sidebar__tooltip">{props.back!.label}</span>
        </a>
      </Show>

      <nav class="nav-sidebar__nav" aria-label="Sections">
        <For each={items()}>
          {(item) => (
            <a
              class="nav-sidebar__item"
              classList={{ "is-active": isCurrent(item), "is-danger": !!item.danger }}
              href={item.href}
              data-nav={item.label.toLowerCase()}
            >
              <span class="nav-sidebar__item-icon" innerHTML={item.icon ?? ""} />
              <span class="nav-sidebar__item-label">{item.label}</span>
              <Show when={item.badge && !item.comingSoon}>
                <span class="nav-sidebar__item-badge">{item.badge}</span>
              </Show>
              <Show when={item.comingSoon}>
                <span class="nav-sidebar__item-badge nav-sidebar__item-badge--soon">Soon</span>
              </Show>
              <span class="nav-sidebar__tooltip">{item.label}</span>
            </a>
          )}
        </For>
      </nav>

      <Show when={props.plan}>
        <div class="nav-sidebar__plan">
          <div class="nav-sidebar__plan-head">
            <span class="nav-sidebar__plan-badge" innerHTML={crownIcon} />
            <span class="nav-sidebar__plan-name">{props.plan!.name}</span>
          </div>
          <p class="nav-sidebar__plan-usage">
            {props.plan!.used} / {props.plan!.total} {props.plan!.label ?? "used"}
          </p>
          <div class="nav-sidebar__plan-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={planPercent()}>
            <span style={{ width: `${planPercent()}%` }} />
          </div>
          <a class="nav-sidebar__plan-cta" href={props.plan!.upgradeHref ?? "#upgrade"}>
            <span>Upgrade Plan</span>
            <span innerHTML={arrowRightIcon} />
          </a>
        </div>
      </Show>
    </aside>
  );
}
