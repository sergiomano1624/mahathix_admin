import { For, Show, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { platformIcons } from "@/shared/config/menu";
import type { Creator, CreatorStatus, CreatorTier, SocialPlatform } from "../data";

const mailIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const phoneIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.7-3.1 19.6 19.6 0 0 1-6-6A20 20 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>`;
const pinIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6.4-8 12-8 12s-8-5.6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/></svg>`;
const giftIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v9H5v-9"/><path d="M12 8c-2-3-6-3-6 0 0 2 2 2 6 0Zm0 0c2-3 6-3 6 0 0 2-2 2-6 0Z"/></svg>`;
const editIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="m14 3-9 9v3h3l9-9Z"/></svg>`;
const sendIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4.4 11.6 15.2-6.8L16 20l-5.2-5.2L4.4 11.6Z"/><path d="M10.8 14.8 16 4.8"/></svg>`;
const linkOutIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="m7 17 10-10"/></svg>`;
const trophyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6 3h12v2a4 4 0 0 1-4 4h-.6a3 3 0 0 1-2.8-2H10a4 4 0 0 1-4-4Zm6 10a5 5 0 0 0 5-5h2a3 3 0 0 1-3 3 5 5 0 0 1-3.6 4.6V18h2a1 1 0 0 1 1 1v2H8v-2a1 1 0 0 1 1-1h2v-2.4A5 5 0 0 1 7.4 11a3 3 0 0 1-3-3h2a5 5 0 0 0 5 5Z"/></svg>`;
const banIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/></svg>`;
const globeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.3c-.1-2-.6-3.8-1.2-5.2 2 .9 3.5 2.8 4.5 5.2ZM12 4c.8.9 1.7 3 1.9 7H10c.3-4 1.2-6.1 2-7Zm-3.4.8C7.9 6.2 7.5 8 7.4 11H4C5 8.6 6.5 6.8 8.6 4.8ZM4 13h3.4c.1 3 .5 4.8 1.2 6.2-2-.9-3.6-2.9-4.6-6.2Zm8 7c-.8-.9-1.7-3-1.9-7h3.8c-.2 4-1.1 6.1-1.9 7Zm3.4-.8c.7-1.4 1.1-3.2 1.2-6.2H20c-1 3.3-2.6 5.3-4.6 6.2Z"/></svg>`;
const behanceIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8.8 11.2c.6-.3 1.1-.7 1.4-1.1.3-.5.5-1 .5-1.7 0-.7-.1-1.3-.4-1.7-.2-.5-.6-.9-1-1.1-.5-.3-1-.5-1.6-.6C7 4.9 6.4 4.9 5.6 4.9H1v13.4h5.1c1.1 0 2-.1 2.9-.4a3.5 3.5 0 0 0 2.6-3.6c0-1 0-1.8-.4-2.3-.4-.6-1-1-2-1.3Zm-5.3-3.6h1.9c.3 0 .6 0 .9.1l.7.3c.3.3.4.7.4 1.2s-.2 1-.4 1.2c-.2.3-.5.4-1 .5-.3.1-.6.1-1 .1H3.5v-3.4Zm4.3 8.2c-.2.3-.4.4-.8.5-.3.1-.7.2-1.1.2H3.5v-3.8h2.6c.4 0 .9.1 1.2.2.3.1.6.3.8.5.2.3.3.6.3 1 0 .5-.1.8-.3 1Zm11.6-6c-.9-1-2-1.4-3.5-1.4-1.6 0-2.9.5-3.8 1.6-.9 1-1.4 2.4-1.4 4 0 1.8.5 3 1.4 3.9.9.9 2.2 1.3 3.9 1.3 1.1 0 2.1-.3 2.9-.8.8-.5 1.4-1.2 1.7-2.1h-2.5c-.1.2-.4.5-.8.6-.3.1-.7.2-1.1.2-.7 0-1.2-.2-1.6-.6-.4-.3-.6-.9-.7-1.6H23c0-1.8-.4-3.2-1.3-4.2Zm-5.6 2.5c.1-.6.3-1.1.7-1.4.4-.3.9-.5 1.5-.5s1.1.2 1.4.5c.3.4.5.8.6 1.4h-4.2ZM14.9 6h5.1v1.5h-5.1V6Z"/></svg>`;

function statusStyle(status: CreatorStatus): JSX.CSSProperties {
  switch (status) {
    case "Active":   return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Pending":  return { background: "rgba(245, 158, 11, 0.16)",  color: "#b45309" };
    case "On Hold":  return { background: "rgba(59, 130, 246, 0.14)",  color: "#1d4ed8" };
    case "Archived": return { background: "rgba(100, 116, 139, 0.18)", color: "#334155" };
  }
}

function tierStyle(tier: CreatorTier): JSX.CSSProperties {
  switch (tier) {
    case "Signature": return { background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)", color: "#ffffff" };
    case "Partner":   return { background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", color: "#7c2d12" };
    case "Emerging":  return { background: "linear-gradient(135deg, #34d399 0%, #047857 100%)", color: "#ffffff" };
    case "Guest":     return { background: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)", color: "#ffffff" };
  }
}

function dropStatusStyle(status: "Live" | "Sold Out" | "Scheduled" | "Draft"): JSX.CSSProperties {
  switch (status) {
    case "Live":      return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Sold Out":  return { background: "rgba(124, 58, 237, 0.14)",  color: "#6d28d9" };
    case "Scheduled": return { background: "rgba(59, 130, 246, 0.14)",  color: "#1d4ed8" };
    case "Draft":     return { background: "rgba(100, 116, 139, 0.18)", color: "#334155" };
  }
}

function socialIcon(platform: SocialPlatform): string {
  switch (platform) {
    case "instagram": return platformIcons.instagram ?? "";
    case "youtube":   return platformIcons.youtube   ?? "";
    case "x":         return platformIcons.x         ?? "";
    case "tiktok":    return platformIcons.tiktok    ?? "";
    case "behance":   return behanceIcon;
    case "website":   return globeIcon;
  }
}

function socialColor(platform: SocialPlatform): string {
  switch (platform) {
    case "instagram": return "#e11d48";
    case "youtube":   return "#ff0000";
    case "x":         return "#000000";
    case "tiktok":    return "#000000";
    case "behance":   return "#1769ff";
    case "website":   return "#7c3aed";
  }
}

export interface CreatorDetailsProps {
  creator: Creator;
  onClose: () => void;
}

export function CreatorDetails(props: CreatorDetailsProps): JSX.Element {
  const c = props.creator;

  return (
    <div class="cr-drawer">
      <header class="cr-drawer__head">
        <div class="cr-drawer__id">
          <span class="cr-drawer__avatar" style={{ background: c.accent }}>
            {c.initials}
          </span>
          <div class="cr-drawer__id-text">
            <span class="cr-drawer__eyebrow">Creator · {c.handle}</span>
            <h2>
              {c.name}
              <Show when={c.isReturning}>
                <span class="cr-drawer__returning" title="Long-term collaborator">★</span>
              </Show>
            </h2>
            <div class="cr-drawer__chips">
              <span class="status-pill" style={statusStyle(c.status)}>{c.status}</span>
              <span class="cr-drawer__tier" style={tierStyle(c.tier)}>
                <span innerHTML={trophyIcon} />
                {c.tier}
              </span>
              <span class="cr-drawer__since">Joined {c.joinedAt}</span>
            </div>
          </div>
        </div>
        <div class="cr-drawer__head-actions">
          <Button variant="secondary" size="sm" icon={mailIcon} onClick={() => toast.info(`Message to ${c.name}…`, "Coming soon")}>
            Message
          </Button>
          <Button variant="ghost" size="sm" icon={editIcon} onClick={() => toast.info(`Editing ${c.name}…`, "Coming soon")}>
            Edit
          </Button>
        </div>
      </header>

      <div class="cr-drawer__body">
        <section class="cr-drawer__kpis">
          <article class="cr-kpi cr-kpi--purple">
            <span>Royalty rate</span>
            <strong>{c.royaltyPercent}%</strong>
            <em>Current contract</em>
          </article>
          <article class="cr-kpi cr-kpi--green">
            <span>Earnings (month)</span>
            <strong>{c.earningsThisMonth}</strong>
            <em>Payout · {c.nextPayout}</em>
          </article>
          <article class="cr-kpi cr-kpi--pink">
            <span>Lifetime payout</span>
            <strong>{c.earningsLifetime}</strong>
            <em>Across {c.dropsCount} drops</em>
          </article>
          <article class="cr-kpi cr-kpi--amber">
            <span>Specialities</span>
            <strong>{c.specialties.length}</strong>
            <em>{c.specialties.slice(0, 2).join(" · ")}</em>
          </article>
        </section>

        <div class="cr-drawer__grid">
          {/* -------------------------- Main column -------------------------- */}
          <div class="cr-drawer__main">
            <section class="cr-drawer__panel">
              <header class="cr-drawer__panel-head">
                <h3>Bio</h3>
                <Show when={c.specialties.length > 0}>
                  <div class="cr-specs">
                    <For each={c.specialties}>
                      {(s) => <span class="cr-spec">{s}</span>}
                    </For>
                  </div>
                </Show>
              </header>
              <p class="cr-bio">{c.bio}</p>
            </section>

            <section class="cr-drawer__panel">
              <header class="cr-drawer__panel-head">
                <h3>Recent drops</h3>
                <span>{c.dropsCount} lifetime</span>
              </header>
              <Show
                when={c.recentDrops.length > 0}
                fallback={
                  <p class="cr-drawer__empty">
                    No drops yet — this creator hasn't shipped a collaboration.
                  </p>
                }
              >
                <ul class="cr-drops">
                  <For each={c.recentDrops}>
                    {(d) => (
                      <li class="cr-drop">
                        <div class="cr-drop__meta">
                          <strong>{d.name}</strong>
                          <em>{d.date} · {d.units.toLocaleString("en-IN")} units</em>
                        </div>
                        <strong class="cr-drop__revenue">{d.revenue}</strong>
                        <span class="status-pill" style={dropStatusStyle(d.status)}>{d.status}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </section>

            <section class="cr-drawer__panel">
              <header class="cr-drawer__panel-head">
                <h3>Social presence</h3>
                <span>{c.socials.length} channels</span>
              </header>
              <div class="cr-socials">
                <For each={c.socials}>
                  {(s) => (
                    <a
                      class="cr-social"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info(`Opening ${s.handle}…`, "Coming soon");
                      }}
                      style={{ "--social-color": socialColor(s.platform) }}
                    >
                      <span class="cr-social__icon" innerHTML={socialIcon(s.platform)} />
                      <div class="cr-social__meta">
                        <strong>{s.handle}</strong>
                        <em>{s.followers} followers</em>
                      </div>
                      <span class="cr-social__arrow" innerHTML={linkOutIcon} />
                    </a>
                  )}
                </For>
              </div>
            </section>
          </div>

          {/* -------------------------- Side column -------------------------- */}
          <aside class="cr-drawer__side">
            <section class="cr-drawer__panel">
              <h3>Contact</h3>
              <ul class="cr-contact">
                <li>
                  <span class="cr-contact__icon" innerHTML={mailIcon} />
                  <div>
                    <strong>{c.email}</strong>
                    <em>Primary email</em>
                  </div>
                </li>
                <li>
                  <span class="cr-contact__icon" innerHTML={phoneIcon} />
                  <div>
                    <strong>{c.phone}</strong>
                    <em>Mobile</em>
                  </div>
                </li>
                <li>
                  <span class="cr-contact__icon" innerHTML={pinIcon} />
                  <div>
                    <strong>{c.city}, {c.country}</strong>
                    <em>Based in</em>
                  </div>
                </li>
              </ul>
            </section>

            <section class="cr-drawer__panel cr-drawer__panel--earnings">
              <h3>Royalties & contract</h3>
              <div class="cr-earnings">
                <div class="cr-earnings__row">
                  <span>Royalty rate</span>
                  <strong>{c.royaltyPercent}%</strong>
                </div>
                <div class="cr-earnings__row">
                  <span>This month</span>
                  <strong>{c.earningsThisMonth}</strong>
                </div>
                <div class="cr-earnings__row">
                  <span>Lifetime</span>
                  <strong>{c.earningsLifetime}</strong>
                </div>
                <div class="cr-earnings__row cr-earnings__row--muted">
                  <span>Next payout</span>
                  <em>{c.nextPayout}</em>
                </div>
                <div class="cr-earnings__row cr-earnings__row--muted">
                  <span>Contract expires</span>
                  <em>{c.contractExpires}</em>
                </div>
              </div>
            </section>

            <section class="cr-drawer__panel">
              <h3>Top drop</h3>
              <div class="cr-top-drop">
                <span class="cr-top-drop__thumb" style={{ background: c.accent }}>{c.initials}</span>
                <div>
                  <strong>{c.topDrop}</strong>
                  <em>Highest-grossing collaboration</em>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer class="cr-drawer__footer">
        <div class="cr-drawer__footer-left">
          <Button
            variant="ghost"
            icon={banIcon}
            onClick={() => toast.info(`Pausing ${c.name}…`, "Coming soon")}
          >
            Pause collaboration
          </Button>
        </div>
        <div class="cr-drawer__footer-right">
          <Button variant="secondary" onClick={() => props.onClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            icon={giftIcon}
            onClick={() => toast.success(`Royalty payout queued for ${c.name}.`, "Scheduled")}
          >
            Pay royalty
          </Button>
        </div>
      </footer>
    </div>
  );
}
