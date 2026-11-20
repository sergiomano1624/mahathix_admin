import type { JSX } from "solid-js";
import { For, Show, createSignal, onCleanup } from "solid-js";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { theme, applyTheme } from "@/shared/lib/theme";
import { useLocation } from "@solidjs/router";
import { currentUser, helpLink, mainMenu, userMenu, type MenuItem } from "@/shared/config/menu";
import { openCustomizationDrawer } from "./CustomizationDrawer";
import "./Header.css";

const helpIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2-2.4 3.4" /><path d="M12 17.1h.01" /></svg>`;
const backIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 5.5-6.5 6.5 6.5 6.5" /></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6" /><path d="m16 16 4.2 4.2" /></svg>`;
const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.6v2.2" /><path d="M12 19.2v2.2" /><path d="M4.4 4.4 6 6" /><path d="m18 18 1.6 1.6" /><path d="M2.6 12h2.2" /><path d="M19.2 12h2.2" /><path d="M4.4 19.6 6 18" /><path d="M18 6l1.6-1.6" /></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 14.6A8.8 8.8 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11Z" /></svg>`;
const chevronIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.5 5.5 5.5 5.5-5.5" /></svg>`;

export interface HeaderProps {
  menu?: MenuItem[];
  user?: { name: string; initials: string; role?: string };
  help?: boolean;
  back?: { label: string; href: string };
  project?: { name: string; subtitle?: string; initials?: string };
  search?: { placeholder: string; shortcut?: string };
  tools?: JSX.Element | string;
  theme?: boolean;
}

export function ThemeToggle(): JSX.Element {
  return (
    <div class="header__theme" role="group" aria-label="Theme">
      <button
        type="button"
        aria-label="Light theme"
        data-theme-option="light"
        classList={{ "is-active": theme() === "light" }}
        aria-pressed={theme() === "light" ? "true" : "false"}
        onClick={() => applyTheme("light")}
        innerHTML={sunIcon}
      />
      <button
        type="button"
        aria-label="Dark theme"
        data-theme-option="dark"
        classList={{ "is-active": theme() === "dark" }}
        aria-pressed={theme() === "dark" ? "true" : "false"}
        onClick={() => applyTheme("dark")}
        innerHTML={moonIcon}
      />
    </div>
  );
}

export function Header(props: HeaderProps = {}): JSX.Element {
  const menu = () => props.menu ?? mainMenu;
  const user = () => props.user ?? currentUser;
  const showHelp = () => props.help ?? true;
  const showTheme = () => props.theme ?? true;
  const [userMenuOpen, setUserMenuOpen] = createSignal(false);
  const location = useLocation();
  const isActive = (href: string): boolean => {
    const here = location.pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    return target !== "" && (here === target || here.startsWith(`${target}/`));
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (!t.closest(".header__user")) setUserMenuOpen(false);
  };
  const onDocKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setUserMenuOpen(false);
  };
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onDocKey);
  onCleanup(() => {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onDocKey);
  });

  return (
    <header class="header">
      <Show when={props.back}>
        <a class="header__back" href={props.back!.href}>
          <span innerHTML={backIcon} />
          <span>{props.back!.label}</span>
        </a>
      </Show>
      <Show when={props.project}>
        <div class="header__project" title={`${props.project!.name}${props.project!.subtitle ? " · " + props.project!.subtitle : ""}`}>
          <span class="header__project-mark">{props.project!.initials ?? props.project!.name.charAt(0).toUpperCase()}</span>
          <span class="header__project-meta">
            <em>Project</em>
            <strong>{props.project!.name}</strong>
          </span>
        </div>
      </Show>
      <Show when={props.search}>
        <form class="header__search" role="search" onSubmit={(e) => e.preventDefault()}>
          <span class="header__search-icon" innerHTML={searchIcon} />
          <input
            type="search"
            placeholder={props.search!.placeholder}
            aria-label={props.search!.placeholder}
            data-global-search
          />
          <Show when={props.search!.shortcut}>
            <kbd>{props.search!.shortcut}</kbd>
          </Show>
        </form>
      </Show>
      <nav class="header__nav" aria-label="Main">
        <For each={menu()}>
          {(item) => (
            <a
              class="header__link"
              classList={{ "is-active": isActive(item.href) }}
              href={item.href}
            >
              <Show when={item.icon}>
                <span innerHTML={item.icon!} />
              </Show>
              <span>{item.label}</span>
            </a>
          )}
        </For>
      </nav>
      <div class="header__actions">
        <Show when={showTheme()}>
          <ThemeToggle />
        </Show>
        <Show when={typeof props.tools === "string"} fallback={props.tools}>
          <div innerHTML={props.tools as string} />
        </Show>
        <Show when={showHelp()}>
          <a class="header__help" href={helpLink.href}>
            <span innerHTML={helpIcon} />
            <span>{helpLink.label}</span>
          </a>
          <span class="header__divider" />
        </Show>
        <div class="header__user">
          <button
            class="header__user-button"
            type="button"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen() ? "true" : "false"}
            data-user-menu
            onClick={(e) => {
              e.stopPropagation();
              setUserMenuOpen((o) => !o);
            }}
          >
            <Avatar initials={user().initials} tone="navy" variant="solid" shape="circle" size="38px" />
            <span class="header__user-text">
              <strong>{user().name}</strong>
              <Show when={user().role}>
                <em>{user().role}</em>
              </Show>
            </span>
            <i innerHTML={chevronIcon} />
          </button>
          <div
            class="menu"
            classList={{ "is-open": userMenuOpen() }}
            role="menu"
            hidden={!userMenuOpen()}
          >
            <For each={userMenu}>
              {(item) => (
                <a
                  class="menu__item"
                  classList={{ "is-danger": !!item.danger }}
                  role="menuitem"
                  href={item.href}
                >
                  <Show when={item.icon}>
                    <span innerHTML={item.icon!} />
                  </Show>
                  <span>{item.label}</span>
                </a>
              )}
            </For>
          </div>
        </div>
      </div>
    </header>
  );
}

/** The project-shell tools (language / settings / notifications). */
export function HeaderTools(props: { onLanguage?: () => void; onNotifications?: () => void }): JSX.Element {
  const globeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6" /><path d="M3.6 12h16.8" /><path d="M12 3.4c2.4 2.4 3.6 5.4 3.6 8.6S14.4 18.2 12 20.6c-2.4-2.4-3.6-5.4-3.6-8.6S9.6 5.8 12 3.4Z" /></svg>`;
  const gearIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.1" /><path d="M18.9 14.3a1.5 1.5 0 0 0 .3 1.7l.1.1a1.9 1.9 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.6 1v.2a1.9 1.9 0 1 1-3.8 0v-.1a1.5 1.5 0 0 0-2.6-1l-.1.1a1.9 1.9 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1-2.6h-.2a1.9 1.9 0 1 1 0-3.8h.1a1.5 1.5 0 0 0 1-2.6l-.1-.1a1.9 1.9 0 1 1 2.6-2.6l.1.1a1.5 1.5 0 0 0 2.6-1v-.2a1.9 1.9 0 1 1 3.8 0v.1a1.5 1.5 0 0 0 2.6 1l.1-.1a1.9 1.9 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0 1 2.6h.2a1.9 1.9 0 1 1 0 3.8h-.1a1.5 1.5 0 0 0-1.3.9Z" /></svg>`;
  const bellIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16S18 14 18 9Z" /><path d="M13.7 19.4a2 2 0 0 1-3.4 0" /></svg>`;
  const chevronDownIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.5 5.5 5.5 5.5-5.5" /></svg>`;
  return (
    <div class="header__tools">
      <button
        class="header__tool header__tool--wide"
        type="button"
        data-tool="language"
        onClick={() => props.onLanguage?.()}
      >
        <span innerHTML={globeIcon} />
        <span>English</span>
        <span innerHTML={chevronDownIcon} />
      </button>
      <button
        class="header__tool"
        type="button"
        aria-label="Settings"
        data-tool="settings"
        onClick={() => openCustomizationDrawer()}
        innerHTML={gearIcon}
      />
      <button
        class="header__tool"
        type="button"
        aria-label="Notifications"
        data-tool="notifications"
        onClick={() => props.onNotifications?.()}
      >
        <span innerHTML={bellIcon} />
        <span class="header__tool-dot" />
      </button>
    </div>
  );
}

export function NotificationsOnlyTools(): JSX.Element {
  const bellIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16S18 14 18 9Z" /><path d="M13.7 19.4a2 2 0 0 1-3.4 0" /></svg>`;
  return (
    <div class="header__tools">
      <button class="header__tool" type="button" aria-label="Notifications" data-tool="notifications">
        <span innerHTML={bellIcon} />
        <span class="header__tool-dot" />
      </button>
    </div>
  );
}
