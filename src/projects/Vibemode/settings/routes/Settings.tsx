import { For, Match, Show, Switch, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Select, type SelectOption } from "@/shared/components";
import { applyTheme, theme } from "@/shared/lib/theme";
import {
  integrations,
  invoices,
  notifications,
  plan,
  sessions,
  teamMembers,
  type Integration,
} from "../data";
import "../Settings.css";

/* ----------------------------- Icons ----------------------------- */
const saveIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>`;
const uploadIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.4V4.4"/><path d="m7.4 9 4.6-4.6L16.6 9"/><path d="M4.6 15.6v2.6a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-2.6"/></svg>`;
const downloadIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>`;
const copyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`;
const trashIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z"/><path d="M9 7V4h6v3"/></svg>`;
const plusIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const keyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2"/><path d="m16 7 3 3"/><path d="m20 3-3 3"/></svg>`;
const shieldIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.4 4 5.6V12c0 5 3.4 8.4 8 9.6 4.6-1.2 8-4.6 8-9.6V5.6Z"/><path d="m9 12 2 2 4-4"/></svg>`;
const linkIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13.4a3.6 3.6 0 0 0 5.4.4l2.6-2.6a3.6 3.6 0 1 0-5-5L12 7.5"/><path d="M14 10.6a3.6 3.6 0 0 0-5.4-.4L6 12.8a3.6 3.6 0 1 0 5 5l1-1"/></svg>`;
const unlinkIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 7h2a4 4 0 0 1 0 8h-1"/><path d="M9 17H7a4 4 0 0 1 0-8h1"/><path d="M8 12h8"/><path d="m3 3 18 18"/></svg>`;
const paletteIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.4A9.6 9.6 0 0 0 2.4 12c0 5.3 4.3 9.6 9.6 9.6 1 0 1.8-.8 1.8-1.7 0-.4-.2-.8-.4-1-.3-.3-.5-.7-.5-1.1a1.8 1.8 0 0 1 1.8-1.8h2.1c3 0 5.6-2.5 5.6-5.5 0-5.1-4.3-8.1-9.6-8.1Z"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="7" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/><circle cx="18" cy="11" r="1.2" fill="currentColor"/></svg>`;
const userIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M4 20c0-3.6 3.6-5.6 8-5.6s8 2 8 5.6"/></svg>`;
const buildingIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.6 20.6V5.2a1.8 1.8 0 0 1 1.8-1.8h7.2a1.8 1.8 0 0 1 1.8 1.8v15.4"/><path d="M15.4 9.4h2.8a1.8 1.8 0 0 1 1.8 1.8v9.4"/><path d="M3.2 20.6h17.6"/></svg>`;
const bellIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16S18 14 18 9Z"/><path d="M13.7 19.4a2 2 0 0 1-3.4 0"/></svg>`;
const cardIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.4" y="6" width="19.2" height="12.8" rx="2"/><path d="M2.4 10.4h19.2"/><path d="M6 15h3"/></svg>`;
const teamIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.5"/><path d="M2.4 20c0-3.6 2.9-6 6.6-6s6.6 2.4 6.6 6"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.4 20c0-2.6 1.9-4.6 4.4-4.6"/></svg>`;
const plugIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 7V3"/><path d="M15 7V3"/><path d="M7 7h10v5a5 5 0 0 1-10 0Z"/><path d="M12 17v4"/></svg>`;
const warnIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.2 3.6 2.6 17.4a2 2 0 0 0 1.7 3H19.8a2 2 0 0 0 1.7-3L13.8 3.6a2 2 0 0 0-3.6 0Z"/><path d="M12 9v4.4"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`;

const TIMEZONE_OPTIONS: SelectOption[] = [
  { value: "IST",  label: "India Standard Time", sub: "UTC +05:30" },
  { value: "GMT",  label: "GMT",                 sub: "UTC +00:00" },
  { value: "EST",  label: "Eastern Time",        sub: "UTC -05:00" },
  { value: "PST",  label: "Pacific Time",        sub: "UTC -08:00" },
];

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "INR", label: "Indian Rupee (₹)",      sub: "INR · Default" },
  { value: "USD", label: "US Dollar ($)",         sub: "USD" },
  { value: "EUR", label: "Euro (€)",              sub: "EUR" },
  { value: "GBP", label: "British Pound (£)",     sub: "GBP" },
];

const LANG_OPTIONS: SelectOption[] = [
  { value: "en", label: "English (US)" },
  { value: "en-in", label: "English (India)" },
  { value: "hi", label: "Hindi" },
];

const ROLE_OPTIONS: SelectOption[] = [
  { value: "Owner",  label: "Owner",  sub: "Full access to everything" },
  { value: "Admin",  label: "Admin",  sub: "Manage team & settings" },
  { value: "Editor", label: "Editor", sub: "Publish drops & orders" },
  { value: "Viewer", label: "Viewer", sub: "Read-only analytics" },
];

const ACCENT_SWATCHES = [
  { id: "violet",  color: "#7c3aed", label: "Violet" },
  { id: "pink",    color: "#ec4899", label: "Pink" },
  { id: "blue",    color: "#2563eb", label: "Ocean" },
  { id: "green",   color: "#10b981", label: "Lime" },
  { id: "amber",   color: "#f59e0b", label: "Amber" },
  { id: "rose",    color: "#f43f5e", label: "Rose" },
];

type SectionKey =
  | "profile"
  | "workspace"
  | "appearance"
  | "notifications"
  | "billing"
  | "team"
  | "integrations"
  | "security"
  | "danger";

const SECTIONS: { key: SectionKey; label: string; description: string; icon: string }[] = [
  { key: "profile",       label: "Profile",        description: "Your personal account",       icon: userIcon },
  { key: "workspace",     label: "Workspace",      description: "Business + localisation",     icon: buildingIcon },
  { key: "appearance",    label: "Appearance",     description: "Theme + accent + density",    icon: paletteIcon },
  { key: "notifications", label: "Notifications",  description: "Email, SMS, push, in-app",    icon: bellIcon },
  { key: "billing",       label: "Billing & Plan", description: "Pro Plan · invoices",         icon: cardIcon },
  { key: "team",          label: "Team",           description: "Members + roles",             icon: teamIcon },
  { key: "integrations",  label: "Integrations",   description: "Connected apps + channels",   icon: plugIcon },
  { key: "security",      label: "Security",       description: "Password · 2FA · sessions",   icon: shieldIcon },
  { key: "danger",        label: "Danger zone",    description: "Export or delete workspace",  icon: warnIcon },
];

function roleStyle(role: string): JSX.CSSProperties {
  switch (role) {
    case "Owner":  return { background: "linear-gradient(135deg, #a78bfa 0%, #4338ca 100%)", color: "#ffffff" };
    case "Admin":  return { background: "rgba(124, 58, 237, 0.14)",  color: "#6d28d9" };
    case "Editor": return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Viewer": return { background: "rgba(100, 116, 139, 0.16)", color: "#334155" };
    default:       return { background: "rgba(100, 116, 139, 0.16)", color: "#334155" };
  }
}

export default function Settings(): JSX.Element {
  const [section, setSection] = createSignal<SectionKey>("profile");
  // Form signals ------------------------------------------------------------
  const [name, setName]         = createSignal("Manoj Kumar");
  const [email, setEmail]       = createSignal("manoj@medullatech.ai");
  const [phone, setPhone]       = createSignal("+91 98100 12345");
  const [role, setRole]         = createSignal("Owner");
  const [tz, setTz]             = createSignal("IST");
  const [lang, setLang]         = createSignal("en-in");
  const [workspace, setWorkspace] = createSignal("Mahathix");
  const [project, setProject]   = createSignal("Vibe Mode");
  const [site, setSite]         = createSignal("https://vibemode.in");
  const [bizEmail, setBizEmail] = createSignal("team@vibemode.in");
  const [currency, setCurrency] = createSignal("INR");
  const [accent, setAccent]     = createSignal("violet");
  const [density, setDensity]   = createSignal<"compact" | "comfortable">("comfortable");
  const [twoFA, setTwoFA]       = createSignal(true);
  const [inviteEmail, setInviteEmail] = createSignal("");
  const [inviteRole, setInviteRole]   = createSignal("Editor");
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 18);
  });

  const onSaveSection = (label: string) => {
    toast.success(`${label} saved successfully.`, "Settings");
  };

  return (
    <div class="settings" ref={rootRef}>
      <header class="settings__header" data-reveal>
        <div>
          <h1>Settings</h1>
          <p>Manage your profile, workspace preferences, team and billing — all in one place.</p>
        </div>
        <div class="settings__header-actions">
          <Button variant="ghost" onClick={() => toast.info("Discard flow isn't wired.", "Coming soon")}>
            Discard
          </Button>
          <Button
            variant="primary"
            icon={saveIcon}
            onClick={() => toast.success("All changes saved.", "Settings")}
          >
            Save changes
          </Button>
        </div>
      </header>

      <div class="settings__layout" data-reveal>
        {/* -------------- Left nav -------------- */}
        <aside class="settings__nav" aria-label="Settings sections">
          <ul>
            <For each={SECTIONS}>
              {(s) => (
                <li>
                  <button
                    type="button"
                    class="settings__nav-item"
                    classList={{
                      "is-active": section() === s.key,
                      "is-danger": s.key === "danger",
                    }}
                    onClick={() => setSection(s.key)}
                  >
                    <span class="settings__nav-icon" innerHTML={s.icon} />
                    <span class="settings__nav-meta">
                      <strong>{s.label}</strong>
                      <em>{s.description}</em>
                    </span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </aside>

        {/* -------------- Right content -------------- */}
        <div class="settings__content">
          <Switch>
            {/* =============================================================== PROFILE */}
            <Match when={section() === "profile"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Profile</h2>
                  <p>Your personal account used to sign in and receive notifications.</p>
                </header>
                <div class="settings-card__body">
                  <div class="settings-avatar">
                    <span class="settings-avatar__thumb">MK</span>
                    <div class="settings-avatar__meta">
                      <strong>{name()}</strong>
                      <em>{email()}</em>
                      <div class="settings-avatar__actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={uploadIcon}
                          onClick={() => toast.info("Upload isn't wired.", "Coming soon")}
                        >
                          Upload new photo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info("Removed avatar (demo).", "Done")}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div class="settings-row">
                    <label class="settings-field">
                      <span class="settings-label">Full name</span>
                      <input class="settings-input" type="text" value={name()} onInput={(e) => setName(e.currentTarget.value)} />
                    </label>
                    <label class="settings-field">
                      <span class="settings-label">Email address</span>
                      <input class="settings-input" type="email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />
                    </label>
                  </div>

                  <div class="settings-row">
                    <label class="settings-field">
                      <span class="settings-label">Phone</span>
                      <input class="settings-input" type="tel" value={phone()} onInput={(e) => setPhone(e.currentTarget.value)} />
                    </label>
                    <div class="settings-field">
                      <span class="settings-label">Role</span>
                      <Select
                        value={role()}
                        onChange={(v) => v && setRole(v)}
                        options={ROLE_OPTIONS}
                        align="left"
                        minWidth={0}
                        menuMinWidth={260}
                        class="settings-select"
                      />
                    </div>
                  </div>

                  <div class="settings-row">
                    <div class="settings-field">
                      <span class="settings-label">Timezone</span>
                      <Select
                        value={tz()}
                        onChange={(v) => v && setTz(v)}
                        options={TIMEZONE_OPTIONS}
                        align="left"
                        minWidth={0}
                        menuMinWidth={240}
                        class="settings-select"
                      />
                    </div>
                    <div class="settings-field">
                      <span class="settings-label">Language</span>
                      <Select
                        value={lang()}
                        onChange={(v) => v && setLang(v)}
                        options={LANG_OPTIONS}
                        align="left"
                        minWidth={0}
                        menuMinWidth={240}
                        class="settings-select"
                      />
                    </div>
                  </div>
                </div>
                <footer class="settings-card__foot">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="primary" icon={saveIcon} onClick={() => onSaveSection("Profile")}>
                    Save profile
                  </Button>
                </footer>
              </section>
            </Match>

            {/* =============================================================== WORKSPACE */}
            <Match when={section() === "workspace"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Workspace</h2>
                  <p>Business identity + default localisation for new drops and invoices.</p>
                </header>
                <div class="settings-card__body">
                  <div class="settings-row">
                    <label class="settings-field">
                      <span class="settings-label">Workspace name</span>
                      <input class="settings-input" type="text" value={workspace()} onInput={(e) => setWorkspace(e.currentTarget.value)} />
                    </label>
                    <label class="settings-field">
                      <span class="settings-label">Project name</span>
                      <input class="settings-input" type="text" value={project()} onInput={(e) => setProject(e.currentTarget.value)} />
                    </label>
                  </div>

                  <div class="settings-row">
                    <label class="settings-field">
                      <span class="settings-label">Website URL</span>
                      <input class="settings-input" type="url" value={site()} onInput={(e) => setSite(e.currentTarget.value)} />
                    </label>
                    <label class="settings-field">
                      <span class="settings-label">Business email</span>
                      <input class="settings-input" type="email" value={bizEmail()} onInput={(e) => setBizEmail(e.currentTarget.value)} />
                    </label>
                  </div>

                  <div class="settings-row">
                    <div class="settings-field">
                      <span class="settings-label">Default currency</span>
                      <Select
                        value={currency()}
                        onChange={(v) => v && setCurrency(v)}
                        options={CURRENCY_OPTIONS}
                        align="left"
                        minWidth={0}
                        menuMinWidth={240}
                        class="settings-select"
                      />
                    </div>
                    <div class="settings-field">
                      <span class="settings-label">Default timezone</span>
                      <Select
                        value={tz()}
                        onChange={(v) => v && setTz(v)}
                        options={TIMEZONE_OPTIONS}
                        align="left"
                        minWidth={0}
                        menuMinWidth={240}
                        class="settings-select"
                      />
                    </div>
                  </div>
                </div>
                <footer class="settings-card__foot">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="primary" icon={saveIcon} onClick={() => onSaveSection("Workspace")}>
                    Save workspace
                  </Button>
                </footer>
              </section>
            </Match>

            {/* =============================================================== APPEARANCE */}
            <Match when={section() === "appearance"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Appearance</h2>
                  <p>Customise the look of your admin — changes apply instantly.</p>
                </header>
                <div class="settings-card__body">
                  <div class="settings-group">
                    <span class="settings-label">Theme</span>
                    <div class="theme-grid">
                      <button
                        type="button"
                        class="theme-card"
                        classList={{ "is-active": theme() === "light" }}
                        onClick={() => applyTheme("light")}
                      >
                        <div class="theme-card__preview theme-card__preview--light" aria-hidden="true">
                          <span /><span /><span />
                        </div>
                        <strong>Light</strong>
                        <em>Default soft lavender</em>
                      </button>
                      <button
                        type="button"
                        class="theme-card"
                        classList={{ "is-active": theme() === "dark" }}
                        onClick={() => applyTheme("dark")}
                      >
                        <div class="theme-card__preview theme-card__preview--dark" aria-hidden="true">
                          <span /><span /><span />
                        </div>
                        <strong>Dark</strong>
                        <em>Night-mode operator</em>
                      </button>
                      <button
                        type="button"
                        class="theme-card"
                        onClick={() => toast.info("System-sync mode isn't wired.", "Coming soon")}
                      >
                        <div class="theme-card__preview theme-card__preview--system" aria-hidden="true">
                          <span /><span /><span />
                        </div>
                        <strong>System</strong>
                        <em>Follow OS preference</em>
                      </button>
                    </div>
                  </div>

                  <div class="settings-group">
                    <span class="settings-label">Accent colour</span>
                    <div class="accent-grid">
                      <For each={ACCENT_SWATCHES}>
                        {(sw) => (
                          <button
                            type="button"
                            class="accent-swatch"
                            classList={{ "is-active": accent() === sw.id }}
                            style={{ "--sw": sw.color }}
                            title={sw.label}
                            onClick={() => {
                              setAccent(sw.id);
                              toast.success(`Accent switched to ${sw.label}.`, "Updated");
                            }}
                          >
                            <span class="accent-swatch__dot" />
                            <span class="accent-swatch__label">{sw.label}</span>
                          </button>
                        )}
                      </For>
                    </div>
                  </div>

                  <div class="settings-group">
                    <span class="settings-label">Density</span>
                    <div class="density-row">
                      <button
                        type="button"
                        class="density-btn"
                        classList={{ "is-active": density() === "comfortable" }}
                        onClick={() => setDensity("comfortable")}
                      >
                        <strong>Comfortable</strong>
                        <em>Default spacing · more whitespace</em>
                      </button>
                      <button
                        type="button"
                        class="density-btn"
                        classList={{ "is-active": density() === "compact" }}
                        onClick={() => setDensity("compact")}
                      >
                        <strong>Compact</strong>
                        <em>Tighter rows · more data per screen</em>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </Match>

            {/* =============================================================== NOTIFICATIONS */}
            <Match when={section() === "notifications"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Notifications</h2>
                  <p>Pick where each event should reach you and the team.</p>
                </header>
                <div class="settings-card__body">
                  <div class="notif-matrix">
                    <div class="notif-matrix__head">
                      <span>Event</span>
                      <span>Email</span>
                      <span>SMS</span>
                      <span>Push</span>
                      <span>In-app</span>
                    </div>
                    <For each={notifications}>
                      {(n) => (
                        <div class="notif-row">
                          <div class="notif-row__label">
                            <strong>{n.label}</strong>
                            <em>{n.detail}</em>
                          </div>
                          <Toggle initial={n.email}  onToast={() => `Email · ${n.label}`} />
                          <Toggle initial={n.sms}    onToast={() => `SMS · ${n.label}`} />
                          <Toggle initial={n.push}   onToast={() => `Push · ${n.label}`} />
                          <Toggle initial={n.inApp}  onToast={() => `In-app · ${n.label}`} />
                        </div>
                      )}
                    </For>
                  </div>
                </div>
                <footer class="settings-card__foot">
                  <Button variant="ghost">Reset defaults</Button>
                  <Button variant="primary" icon={saveIcon} onClick={() => onSaveSection("Notifications")}>
                    Save notifications
                  </Button>
                </footer>
              </section>
            </Match>

            {/* =============================================================== BILLING */}
            <Match when={section() === "billing"}>
              <div class="settings-grid-two">
                <section class="settings-card plan-card">
                  <header class="settings-card__head">
                    <div>
                      <span class="plan-card__badge">Current plan</span>
                      <h2>{plan.name}</h2>
                      <p>{plan.tagline}</p>
                    </div>
                    <div class="plan-card__price">
                      <strong>{plan.price}</strong>
                      <em>{plan.cadence}</em>
                    </div>
                  </header>
                  <div class="settings-card__body">
                    <ul class="plan-features">
                      <For each={plan.features}>
                        {(f) => (
                          <li>
                            <span class="plan-features__tick" innerHTML={saveIcon} />
                            {f}
                          </li>
                        )}
                      </For>
                    </ul>
                    <p class="plan-renews">
                      Renews on <strong>{plan.renewsOn}</strong> · Payment method visa ending 4242.
                    </p>
                  </div>
                  <footer class="settings-card__foot">
                    <Button variant="ghost" onClick={() => toast.info("Downgrade flow isn't wired.", "Coming soon")}>
                      Downgrade
                    </Button>
                    <Button variant="primary" onClick={() => toast.info("Upgrade flow isn't wired.", "Coming soon")}>
                      Upgrade plan
                    </Button>
                  </footer>
                </section>

                <section class="settings-card usage-card">
                  <header class="settings-card__head">
                    <h2>Usage this cycle</h2>
                    <p>Resets on the renewal date.</p>
                  </header>
                  <div class="settings-card__body">
                    <ul class="usage-list">
                      <For each={plan.usage}>
                        {(u) => {
                          const pct = Math.min(100, Math.round((u.used / u.total) * 100));
                          return (
                            <li>
                              <div class="usage-row">
                                <strong>{u.label}</strong>
                                <em>
                                  {u.used.toLocaleString("en-IN")} / {u.total.toLocaleString("en-IN")}
                                  {u.format === "gb" ? " GB" : ""}
                                </em>
                              </div>
                              <span class="usage-track">
                                <span
                                  class="usage-fill"
                                  classList={{ "is-high": pct >= 80 }}
                                  style={{ width: `${pct}%` }}
                                />
                              </span>
                            </li>
                          );
                        }}
                      </For>
                    </ul>
                  </div>
                </section>
              </div>

              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Invoices</h2>
                  <p>Download receipts and manage payment history.</p>
                </header>
                <div class="settings-card__body">
                  <ul class="invoice-list">
                    <li class="invoice-row invoice-row--head">
                      <span>Invoice</span>
                      <span>Period</span>
                      <span>Issued</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span />
                    </li>
                    <For each={invoices}>
                      {(inv) => (
                        <li class="invoice-row">
                          <strong>#{inv.id}</strong>
                          <span>{inv.period}</span>
                          <em>{inv.issuedAt}</em>
                          <strong class="invoice-row__amount">{inv.amount}</strong>
                          <span
                            class="status-pill"
                            style={
                              inv.status === "Paid"
                                ? { background: "rgba(16, 185, 129, 0.15)", color: "#047857" }
                                : { background: "rgba(245, 158, 11, 0.16)", color: "#b45309" }
                            }
                          >
                            {inv.status}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconOnly
                            icon={downloadIcon}
                            aria-label="Download invoice"
                            title="Download invoice"
                            onClick={() => toast.success(`${inv.id} download started.`, "Downloading")}
                          />
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </section>
            </Match>

            {/* =============================================================== TEAM */}
            <Match when={section() === "team"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Team members</h2>
                  <p>Invite teammates and set their access level.</p>
                </header>
                <div class="settings-card__body">
                  <div class="invite-row">
                    <label class="settings-field">
                      <span class="settings-label">Invite by email</span>
                      <input
                        class="settings-input"
                        type="email"
                        placeholder="name@company.com"
                        value={inviteEmail()}
                        onInput={(e) => setInviteEmail(e.currentTarget.value)}
                      />
                    </label>
                    <div class="settings-field">
                      <span class="settings-label">Role</span>
                      <Select
                        value={inviteRole()}
                        onChange={(v) => v && setInviteRole(v)}
                        options={ROLE_OPTIONS.filter((o) => o.value !== "Owner")}
                        align="left"
                        minWidth={0}
                        menuMinWidth={240}
                        class="settings-select"
                      />
                    </div>
                    <Button
                      variant="primary"
                      icon={plusIcon}
                      onClick={() => {
                        if (!inviteEmail()) {
                          toast.info("Add an email first.", "Missing details");
                          return;
                        }
                        toast.success(`Invite sent to ${inviteEmail()}.`, "Sent");
                        setInviteEmail("");
                      }}
                    >
                      Invite
                    </Button>
                  </div>

                  <ul class="member-list">
                    <For each={teamMembers}>
                      {(m) => (
                        <li class="member-row">
                          <span class="member-row__avatar" style={{ background: m.accent }}>
                            {m.initials}
                          </span>
                          <div class="member-row__meta">
                            <strong>{m.name}</strong>
                            <em>{m.email}</em>
                          </div>
                          <span class="member-row__seen">{m.lastSeen}</span>
                          <span class="member-row__role" style={roleStyle(m.role)}>
                            {m.role}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconOnly
                            icon={trashIcon}
                            aria-label="Remove"
                            title="Remove"
                            onClick={() => toast.info(`Remove ${m.name}…`, "Coming soon")}
                          />
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </section>
            </Match>

            {/* =============================================================== INTEGRATIONS */}
            <Match when={section() === "integrations"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Integrations</h2>
                  <p>Connect the apps that power publishing, payments and messaging.</p>
                </header>
                <div class="settings-card__body">
                  <div class="int-grid">
                    <For each={integrations}>
                      {(it: Integration) => (
                        <article class="int-card" classList={{ "is-off": it.status === "Not connected" }}>
                          <span class="int-card__icon" style={{ background: it.accent }} innerHTML={it.icon} />
                          <div class="int-card__meta">
                            <div class="int-card__title">
                              <strong>{it.name}</strong>
                              <span
                                class="int-card__status"
                                classList={{ "is-on": it.status === "Connected" }}
                              >
                                {it.status}
                              </span>
                            </div>
                            <em>{it.description}</em>
                          </div>
                          <div class="int-card__action">
                            <Show
                              when={it.status === "Connected"}
                              fallback={
                                <Button
                                  variant="primary"
                                  size="sm"
                                  icon={linkIcon}
                                  onClick={() => toast.success(`${it.name} connected.`, "Connected")}
                                >
                                  Connect
                                </Button>
                              }
                            >
                              <Button
                                variant="secondary"
                                size="sm"
                                icon={unlinkIcon}
                                onClick={() => toast.info(`${it.name} disconnected.`, "Updated")}
                              >
                                Disconnect
                              </Button>
                            </Show>
                          </div>
                        </article>
                      )}
                    </For>
                  </div>
                </div>
              </section>
            </Match>

            {/* =============================================================== SECURITY */}
            <Match when={section() === "security"}>
              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Password</h2>
                  <p>Change your sign-in password. Use a mix of characters and at least 12 chars.</p>
                </header>
                <div class="settings-card__body">
                  <div class="settings-row">
                    <label class="settings-field">
                      <span class="settings-label">Current password</span>
                      <input class="settings-input" type="password" placeholder="••••••••" />
                    </label>
                    <label class="settings-field">
                      <span class="settings-label">New password</span>
                      <input class="settings-input" type="password" placeholder="At least 12 characters" />
                    </label>
                  </div>
                </div>
                <footer class="settings-card__foot">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="primary" icon={saveIcon} onClick={() => onSaveSection("Password")}>
                    Update password
                  </Button>
                </footer>
              </section>

              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Two-factor authentication</h2>
                  <p>Require a 6-digit code at every sign-in.</p>
                </header>
                <div class="settings-card__body">
                  <div class="tfa-row">
                    <span class="tfa-row__icon" innerHTML={shieldIcon} />
                    <div class="tfa-row__meta">
                      <strong>Authenticator app</strong>
                      <em>
                        {twoFA() ? "Enabled · Backup codes last generated Nov 2" : "Disabled · Enable to protect your account"}
                      </em>
                    </div>
                    <span
                      class="status-pill"
                      style={
                        twoFA()
                          ? { background: "rgba(16, 185, 129, 0.15)", color: "#047857" }
                          : { background: "rgba(244, 63, 94, 0.14)", color: "#be123c" }
                      }
                    >
                      {twoFA() ? "On" : "Off"}
                    </span>
                    <Toggle initial={twoFA()} onChange={setTwoFA} onToast={() => "Two-factor auth"} />
                  </div>
                </div>
              </section>

              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>Active sessions</h2>
                  <p>Signed-in devices. Sign out any you don't recognise.</p>
                </header>
                <div class="settings-card__body">
                  <ul class="session-list">
                    <For each={sessions}>
                      {(s) => (
                        <li class="session-row" classList={{ "is-current": !!s.current }}>
                          <div class="session-row__meta">
                            <strong>
                              {s.device}
                              <Show when={s.current}>
                                <span class="session-row__current">This device</span>
                              </Show>
                            </strong>
                            <em>{s.browser} · {s.location}</em>
                          </div>
                          <span class="session-row__time">{s.lastActive}</span>
                          <Show when={!s.current}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast.info(`Signed out ${s.device}.`, "Done")}
                            >
                              Sign out
                            </Button>
                          </Show>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
                <footer class="settings-card__foot">
                  <Button
                    variant="ghost"
                    onClick={() => toast.success("All other sessions signed out.", "Done")}
                  >
                    Sign out all other sessions
                  </Button>
                </footer>
              </section>

              <section class="settings-card">
                <header class="settings-card__head">
                  <h2>API keys</h2>
                  <p>Use these keys to connect Mahathix Admin to custom scripts.</p>
                </header>
                <div class="settings-card__body">
                  <div class="apikey-row">
                    <span class="apikey-row__icon" innerHTML={keyIcon} />
                    <div class="apikey-row__meta">
                      <strong>Live key</strong>
                      <code>sk_live_•••• •••• •••• 4a9f</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={copyIcon}
                      onClick={async () => {
                        await navigator.clipboard?.writeText("sk_live_demo_4a9f");
                        toast.success("API key copied.", "Copied");
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toast.info("Rotate flow isn't wired.", "Coming soon")}
                    >
                      Rotate
                    </Button>
                  </div>
                </div>
              </section>
            </Match>

            {/* =============================================================== DANGER */}
            <Match when={section() === "danger"}>
              <section class="settings-card settings-card--danger">
                <header class="settings-card__head">
                  <h2>Export data</h2>
                  <p>Download a ZIP of orders, customers, catalog, and analytics.</p>
                </header>
                <footer class="settings-card__foot">
                  <Button
                    variant="secondary"
                    icon={downloadIcon}
                    onClick={() => toast.success("Export queued — you'll get an email when it's ready.", "Queued")}
                  >
                    Request export
                  </Button>
                </footer>
              </section>

              <section class="settings-card settings-card--danger">
                <header class="settings-card__head">
                  <h2>Transfer workspace</h2>
                  <p>Pass ownership of this workspace to another admin.</p>
                </header>
                <footer class="settings-card__foot">
                  <Button
                    variant="ghost"
                    onClick={() => toast.info("Transfer flow isn't wired.", "Coming soon")}
                  >
                    Start transfer
                  </Button>
                </footer>
              </section>

              <section class="settings-card settings-card--danger settings-card--destructive">
                <header class="settings-card__head">
                  <h2>Delete workspace</h2>
                  <p>Removes every drop, order, customer and analytics record. This can't be undone.</p>
                </header>
                <footer class="settings-card__foot">
                  <Button
                    variant="danger"
                    icon={trashIcon}
                    onClick={() => toast.info("Deletion requires a confirmation code.", "Not done")}
                  >
                    Delete this workspace
                  </Button>
                </footer>
              </section>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Toggle --------------------------------- */

interface ToggleProps {
  initial: boolean;
  onChange?: (v: boolean) => void;
  onToast?: () => string;
}

function Toggle(props: ToggleProps): JSX.Element {
  const [on, setOn] = createSignal(props.initial);
  return (
    <button
      type="button"
      class="toggle"
      classList={{ "is-on": on() }}
      role="switch"
      aria-checked={on() ? "true" : "false"}
      onClick={() => {
        const next = !on();
        setOn(next);
        props.onChange?.(next);
        if (props.onToast) {
          toast.info(`${props.onToast()} ${next ? "enabled" : "disabled"}.`, "Updated");
        }
      }}
    >
      <span class="toggle__thumb" />
    </button>
  );
}
