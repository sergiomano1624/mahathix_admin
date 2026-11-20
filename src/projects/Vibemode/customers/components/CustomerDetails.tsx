import { For, Show, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { segmentStyle, tierStyle } from "../routes/Customers";
import type { Customer, CustomerOrder } from "../data";

const mailIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const phoneIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.7-3.1 19.6 19.6 0 0 1-6-6A20 20 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>`;
const copyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`;
const pinIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6.4-8 12-8 12s-8-5.6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/></svg>`;
const starIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="m12 2 2.6 6.6L21 10l-5 4.4 1.6 6.6L12 17l-5.6 4 1.6-6.6-5-4.4 6.4-1.4Z"/></svg>`;
const trophyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6 3h12v2a4 4 0 0 1-4 4h-.6a3 3 0 0 1-2.8-2H10a4 4 0 0 1-4-4Zm6 10a5 5 0 0 0 5-5h2a3 3 0 0 1-3 3 5 5 0 0 1-3.6 4.6V18h2a1 1 0 0 1 1 1v2H8v-2a1 1 0 0 1 1-1h2v-2.4A5 5 0 0 1 7.4 11a3 3 0 0 1-3-3h2a5 5 0 0 0 5 5Z"/></svg>`;
const giftIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v9H5v-9"/><path d="M12 8c-2-3-6-3-6 0 0 2 2 2 6 0Zm0 0c2-3 6-3 6 0 0 2-2 2-6 0Z"/></svg>`;
const banIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/></svg>`;

function orderStatusStyle(status: CustomerOrder["status"]): JSX.CSSProperties {
  switch (status) {
    case "Processing": return { background: "rgba(124, 58, 237, 0.14)",  color: "#6d28d9" };
    case "Shipped":    return { background: "rgba(245, 158, 11, 0.16)",  color: "#b45309" };
    case "Delivered":  return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Cancelled":  return { background: "rgba(100, 116, 139, 0.18)", color: "#334155" };
    case "Refunded":   return { background: "rgba(244, 63, 94, 0.14)",   color: "#be123c" };
  }
}

export interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetails(props: CustomerDetailsProps): JSX.Element {
  const c = props.customer;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(c.email);
      toast.success(`${c.email} copied.`, "Copied");
    } catch {
      toast.info("Clipboard isn't available in this browser.", "Copy failed");
    }
  };

  return (
    <div class="cust-drawer">
      <header class="cust-drawer__head">
        <div class="cust-drawer__id">
          <span class="cust-drawer__avatar" style={{ background: c.accent }}>
            {c.initials}
          </span>
          <div class="cust-drawer__id-text">
            <span class="cust-drawer__eyebrow">Customer · {c.id.toUpperCase()}</span>
            <h2>{c.name}</h2>
            <div class="cust-drawer__chips">
              <span class="status-pill" style={segmentStyle(c.segment)}>{c.segment}</span>
              <span class="cust-drawer__tier" style={tierStyle(c.tier)}>
                <span innerHTML={trophyIcon} />
                {c.tier}
              </span>
              <span class="cust-drawer__since">Member since {c.joinedAt}</span>
            </div>
          </div>
        </div>
        <div class="cust-drawer__head-actions">
          <Button variant="secondary" size="sm" icon={mailIcon} onClick={() => toast.info("Email flow isn't wired.", "Coming soon")}>
            Email
          </Button>
          <Button variant="ghost" size="sm" icon={phoneIcon} onClick={() => toast.info("Call flow isn't wired.", "Coming soon")}>
            Call
          </Button>
        </div>
      </header>

      <div class="cust-drawer__body">
        <section class="cust-drawer__kpis">
          <article class="cust-kpi cust-kpi--purple">
            <span>Lifetime value</span>
            <strong>₹{c.totalSpent.toLocaleString("en-IN")}</strong>
            <em>₹{c.aov.toLocaleString("en-IN")} AOV</em>
          </article>
          <article class="cust-kpi cust-kpi--pink">
            <span>Orders</span>
            <strong>{c.orderCount}</strong>
            <em>Last · {c.lastOrderAt}</em>
          </article>
          <article class="cust-kpi cust-kpi--amber">
            <span>Loyalty points</span>
            <strong>{c.loyaltyPoints.toLocaleString("en-IN")}</strong>
            <em>Worth ₹{Math.round(c.loyaltyPoints * 0.5).toLocaleString("en-IN")}</em>
          </article>
          <article class="cust-kpi cust-kpi--green">
            <span>Preferences</span>
            <strong>{c.emailOptIn ? "Email" : "—"}{c.emailOptIn && c.smsOptIn ? " · " : ""}{c.smsOptIn ? "SMS" : ""}</strong>
            <em>{c.emailOptIn || c.smsOptIn ? "Opted in" : "Opted out of all marketing"}</em>
          </article>
        </section>

        <div class="cust-drawer__grid">
          {/* -------------------------- Main column -------------------------- */}
          <div class="cust-drawer__main">
            <section class="cust-drawer__panel">
              <header class="cust-drawer__panel-head">
                <h3>Recent orders</h3>
                <span>{c.recentOrders.length} shown · {c.orderCount} lifetime</span>
              </header>
              <Show
                when={c.recentOrders.length > 0}
                fallback={
                  <p class="cust-drawer__empty">
                    No orders in the last 90 days.
                  </p>
                }
              >
                <ul class="cust-orders">
                  <For each={c.recentOrders}>
                    {(o) => (
                      <li class="cust-order">
                        <span class="cust-order__id">#{o.id}</span>
                        <span class="cust-order__date">{o.date}</span>
                        <span class="cust-order__items">{o.itemCount} items</span>
                        <strong class="cust-order__total">₹{o.total.toLocaleString("en-IN")}</strong>
                        <span class="status-pill" style={orderStatusStyle(o.status)}>{o.status}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </section>

            <section class="cust-drawer__panel">
              <header class="cust-drawer__panel-head">
                <h3>Favorites</h3>
                <span>Based on {c.orderCount} orders</span>
              </header>
              <div class="cust-fav">
                <div class="cust-fav__group">
                  <span class="cust-fav__label">Categories</span>
                  <Show when={c.favoriteCategories.length > 0} fallback={<em class="cust-drawer__empty cust-drawer__empty--inline">Still learning what they like.</em>}>
                    <div class="cust-fav__chips">
                      <For each={c.favoriteCategories}>
                        {(cat) => (
                          <span class="cust-fav__chip">
                            <span class="cust-fav__dot" style={{ background: c.accent }} />
                            {cat}
                          </span>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
                <div class="cust-fav__group">
                  <span class="cust-fav__label">Genres</span>
                  <Show when={c.favoriteGenres.length > 0} fallback={<em class="cust-drawer__empty cust-drawer__empty--inline">No genre affinity yet.</em>}>
                    <div class="cust-fav__chips">
                      <For each={c.favoriteGenres}>
                        {(g) => (
                          <span class="cust-fav__chip cust-fav__chip--genre">
                            <span class="cust-fav__star" innerHTML={starIcon} />
                            {g}
                          </span>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
              </div>
            </section>

            <section class="cust-drawer__panel">
              <header class="cust-drawer__panel-head">
                <h3>Internal notes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info("Notes aren't wired up.", "Coming soon")}
                >
                  Add note
                </Button>
              </header>
              <Show
                when={c.note}
                fallback={
                  <p class="cust-drawer__empty">
                    No internal notes yet. Add handoff context, preferences or watch-outs — the team sees them next to this customer.
                  </p>
                }
              >
                <blockquote class="cust-note">
                  “{c.note}”
                </blockquote>
              </Show>
            </section>
          </div>

          {/* -------------------------- Side column -------------------------- */}
          <aside class="cust-drawer__side">
            <section class="cust-drawer__panel">
              <h3>Contact</h3>
              <ul class="cust-contact">
                <li>
                  <span class="cust-contact__icon" innerHTML={mailIcon} />
                  <div>
                    <strong>{c.email}</strong>
                    <em>Primary email</em>
                  </div>
                  <button
                    type="button"
                    class="cust-contact__copy"
                    aria-label="Copy email"
                    onClick={copyEmail}
                    innerHTML={copyIcon}
                  />
                </li>
                <li>
                  <span class="cust-contact__icon" innerHTML={phoneIcon} />
                  <div>
                    <strong>{c.phone}</strong>
                    <em>Mobile</em>
                  </div>
                </li>
                <li>
                  <span class="cust-contact__icon" innerHTML={pinIcon} />
                  <div>
                    <strong>{c.city}, {c.state}</strong>
                    <em>India</em>
                  </div>
                </li>
              </ul>
            </section>

            <section class="cust-drawer__panel">
              <h3>Marketing preferences</h3>
              <ul class="cust-prefs">
                <li classList={{ "is-on": c.emailOptIn }}>
                  <span class="cust-prefs__label">Email marketing</span>
                  <span class="cust-prefs__state">{c.emailOptIn ? "Opted in" : "Opted out"}</span>
                </li>
                <li classList={{ "is-on": c.smsOptIn }}>
                  <span class="cust-prefs__label">SMS updates</span>
                  <span class="cust-prefs__state">{c.smsOptIn ? "Opted in" : "Opted out"}</span>
                </li>
              </ul>
            </section>

            <section class="cust-drawer__panel">
              <h3>Loyalty</h3>
              <div class="cust-loyalty">
                <span class="cust-loyalty__icon" innerHTML={giftIcon} />
                <div>
                  <strong>{c.loyaltyPoints.toLocaleString("en-IN")} points</strong>
                  <em>Worth ₹{Math.round(c.loyaltyPoints * 0.5).toLocaleString("en-IN")} off next order</em>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                block
                onClick={() => toast.info("Points gifting isn't wired.", "Coming soon")}
              >
                Gift bonus points
              </Button>
            </section>
          </aside>
        </div>
      </div>

      <footer class="cust-drawer__footer">
        <div class="cust-drawer__footer-left">
          <Button
            variant="ghost"
            icon={banIcon}
            onClick={() => toast.info("Suspension flow isn't wired.", "Coming soon")}
          >
            Suspend account
          </Button>
        </div>
        <div class="cust-drawer__footer-right">
          <Button variant="secondary" onClick={() => props.onClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            icon={mailIcon}
            onClick={() => toast.success(`Thank-you email queued for ${c.name}.`, "Scheduled")}
          >
            Send thank-you
          </Button>
        </div>
      </footer>
    </div>
  );
}
