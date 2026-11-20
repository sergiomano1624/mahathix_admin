import { For, Show, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import {
  paymentMethodLabels,
  type Order,
  type OrderStatus,
  type PaymentMethod,
} from "../data";

const copyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`;
const printIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="3.6" width="12" height="6" rx="1.4"/><rect x="4" y="9.6" width="16" height="9" rx="2"/><rect x="7.4" y="14" width="9.2" height="6.4" rx="1.4"/></svg>`;
const mailIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const truckIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3Z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>`;
const refundIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v6h6"/><path d="M3.5 13a9 9 0 1 0 2.6-7.6L3 9"/></svg>`;
const cancelIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/></svg>`;
const checkIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const pinIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6.4-8 12-8 12s-8-5.6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/></svg>`;
const phoneIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.7-3.1 19.6 19.6 0 0 1-6-6A20 20 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>`;

function statusStyle(status: OrderStatus): JSX.CSSProperties {
  switch (status) {
    case "New":        return { background: "rgba(59, 130, 246, 0.14)",  color: "#1d4ed8" };
    case "Processing": return { background: "rgba(124, 58, 237, 0.14)",  color: "#6d28d9" };
    case "Shipped":    return { background: "rgba(245, 158, 11, 0.16)",  color: "#b45309" };
    case "Delivered":  return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Cancelled":  return { background: "rgba(100, 116, 139, 0.16)", color: "#334155" };
    case "Refunded":   return { background: "rgba(244, 63, 94, 0.14)",   color: "#be123c" };
  }
}

function paymentChip(method: PaymentMethod): JSX.CSSProperties {
  switch (method) {
    case "upi":    return { background: "rgba(124, 58, 237, 0.1)",  color: "#6d28d9" };
    case "card":   return { background: "rgba(59, 130, 246, 0.1)",  color: "#1d4ed8" };
    case "cod":    return { background: "rgba(245, 158, 11, 0.12)", color: "#b45309" };
    case "wallet": return { background: "rgba(16, 185, 129, 0.1)",  color: "#047857" };
  }
}

/** Compute the status timeline for the order based on its current status. */
function timelineFor(order: Order) {
  const steps: { label: string; detail: string; done: boolean; active?: boolean }[] = [
    { label: "Order placed", detail: order.placedAt, done: true },
    { label: "Payment confirmed", detail: order.paid ? "Captured" : "Pending (COD)", done: order.paid },
    { label: "Processing", detail: "Being packed at the studio", done: false },
    { label: "Shipped", detail: order.tracking ?? "Awaiting tracking", done: false },
    { label: "Out for delivery", detail: "Last-mile scan", done: false },
    { label: "Delivered", detail: "Handed off", done: false },
  ];
  const idx: Record<OrderStatus, number> = {
    "New": 1,
    "Processing": 2,
    "Shipped": 3,
    "Delivered": 5,
    "Cancelled": -1,
    "Refunded": -1,
  };
  const activeIndex = idx[order.status];
  if (activeIndex >= 0) {
    for (let i = 0; i <= activeIndex; i++) steps[i]!.done = true;
    steps[activeIndex]!.active = true;
  }
  return steps;
}

function primaryActionFor(status: OrderStatus): { label: string; icon: string } | null {
  switch (status) {
    case "New":        return { label: "Mark as Processing", icon: truckIcon };
    case "Processing": return { label: "Mark as Shipped", icon: truckIcon };
    case "Shipped":    return { label: "Mark as Delivered", icon: checkIcon };
    default: return null;
  }
}

export interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetails(props: OrderDetailsProps): JSX.Element {
  const o = props.order;
  const timeline = timelineFor(o);
  const primary = primaryActionFor(o.status);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(o.id);
      toast.success(`${o.id} copied to clipboard.`, "Copied");
    } catch {
      toast.info("Clipboard isn't available in this browser.", "Copy failed");
    }
  };

  return (
    <div class="order-drawer">
      <header class="order-drawer__head">
        <div class="order-drawer__title">
          <span class="order-drawer__eyebrow">Order</span>
          <h2>#{o.id}</h2>
          <div class="order-drawer__chips">
            <span class="status-pill" style={statusStyle(o.status)}>{o.status}</span>
            <span class="order-drawer__payment" style={paymentChip(o.payment)}>
              {paymentMethodLabels[o.payment]}
              <Show when={!o.paid}> · Unpaid</Show>
            </span>
            <span class="order-drawer__placed">{o.placedAt}</span>
          </div>
        </div>
        <div class="order-drawer__head-actions">
          <Button variant="ghost" size="sm" icon={copyIcon} onClick={copyId}>
            Copy ID
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={printIcon}
            onClick={() => toast.info("Invoice printing isn't wired up.", "Coming soon")}
          >
            Print
          </Button>
        </div>
      </header>

      <div class="order-drawer__body">
        <div class="order-drawer__grid">
          {/* -------------------------- Main column -------------------------- */}
          <div class="order-drawer__main">
            <section class="order-drawer__panel">
              <header class="order-drawer__panel-head">
                <h3>Items</h3>
                <span>{o.itemCount} total</span>
              </header>
              <ul class="order-items">
                <For each={o.items}>
                  {(it) => (
                    <li class="order-item">
                      <span class="order-item__thumb" style={{ background: it.accent }}>
                        {it.initials}
                      </span>
                      <div class="order-item__meta">
                        <strong>{it.name}</strong>
                        <em>₹{it.price.toLocaleString("en-IN")} each</em>
                      </div>
                      <span class="order-item__qty">× {it.quantity}</span>
                      <strong class="order-item__sub">
                        ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                      </strong>
                    </li>
                  )}
                </For>
              </ul>
            </section>

            <section class="order-drawer__panel">
              <header class="order-drawer__panel-head">
                <h3>Status timeline</h3>
                <Show when={o.tracking}>
                  <span class="order-drawer__tracking">
                    <span innerHTML={truckIcon} /> {o.tracking}
                  </span>
                </Show>
              </header>
              <ol class="order-timeline">
                <For each={timeline}>
                  {(step, i) => (
                    <li
                      class="order-timeline__step"
                      classList={{
                        "is-done": step.done,
                        "is-active": !!step.active,
                      }}
                    >
                      <span class="order-timeline__dot">
                        <Show when={step.done}>
                          <span innerHTML={checkIcon} />
                        </Show>
                      </span>
                      <div class="order-timeline__meta">
                        <strong>{step.label}</strong>
                        <em>{step.detail}</em>
                      </div>
                      <Show when={i() < timeline.length - 1}>
                        <span class="order-timeline__rail" />
                      </Show>
                    </li>
                  )}
                </For>
              </ol>
            </section>

            <section class="order-drawer__panel">
              <header class="order-drawer__panel-head">
                <h3>Internal notes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info("Notes aren't wired up.", "Coming soon")}
                >
                  Add note
                </Button>
              </header>
              <p class="order-notes__empty">
                No internal notes yet. Add handoff instructions, customer context, or packing tips
                — the team sees them next to the order.
              </p>
            </section>
          </div>

          {/* -------------------------- Side column -------------------------- */}
          <aside class="order-drawer__side">
            <section class="order-drawer__panel">
              <h3>Customer</h3>
              <div class="order-cust">
                <span class="order-cust__avatar" style={{ background: o.customer.accent }}>
                  {o.customer.initials}
                </span>
                <div class="order-cust__meta">
                  <strong>
                    {o.customer.name}
                    <Show when={o.customer.isReturning}>
                      <span class="order-cust__returning">Returning</span>
                    </Show>
                  </strong>
                  <em>{o.customer.email}</em>
                </div>
              </div>
              <div class="order-cust__actions">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={mailIcon}
                  block
                  onClick={() => toast.info("Email flow isn't wired up.", "Coming soon")}
                >
                  Email customer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={phoneIcon}
                  block
                  onClick={() => toast.info("Call flow isn't wired up.", "Coming soon")}
                >
                  Call
                </Button>
              </div>
            </section>

            <section class="order-drawer__panel">
              <h3>Shipping address</h3>
              <div class="order-address">
                <span class="order-address__icon" innerHTML={pinIcon} />
                <div>
                  <strong>{o.customer.name}</strong>
                  <em>
                    {o.customer.city}, {o.customer.state}
                    <br />
                    India
                  </em>
                </div>
              </div>
            </section>

            <section class="order-drawer__panel">
              <h3>Payment summary</h3>
              <ul class="order-summary">
                <li>
                  <span>Subtotal</span>
                  <strong>₹{o.subtotal.toLocaleString("en-IN")}</strong>
                </li>
                <li>
                  <span>Shipping</span>
                  <strong>{o.shipping === 0 ? "Free" : `₹${o.shipping}`}</strong>
                </li>
                <li class="order-summary__tax">
                  <span>Tax (incl.)</span>
                  <strong>₹{Math.round(o.subtotal * 0.18).toLocaleString("en-IN")}</strong>
                </li>
                <li class="order-summary__total">
                  <span>Total paid</span>
                  <strong>₹{o.total.toLocaleString("en-IN")}</strong>
                </li>
              </ul>
              <div class="order-summary__badges">
                <span class="order-summary__badge" style={paymentChip(o.payment)}>
                  {paymentMethodLabels[o.payment]}
                </span>
                <Show when={o.paid} fallback={
                  <span class="order-summary__badge order-summary__badge--unpaid">Payment pending</span>
                }>
                  <span class="order-summary__badge order-summary__badge--paid">
                    <span innerHTML={checkIcon} /> Paid
                  </span>
                </Show>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer class="order-drawer__footer">
        <div class="order-drawer__footer-left">
          <Button
            variant="ghost"
            icon={cancelIcon}
            onClick={() => toast.info("Cancel flow isn't wired up.", "Coming soon")}
          >
            Cancel order
          </Button>
          <Show when={o.paid}>
            <Button
              variant="ghost"
              icon={refundIcon}
              onClick={() => toast.info("Refund flow isn't wired up.", "Coming soon")}
            >
              Issue refund
            </Button>
          </Show>
        </div>
        <div class="order-drawer__footer-right">
          <Button variant="secondary" onClick={() => props.onClose()}>
            Close
          </Button>
          <Show when={primary}>
            <Button
              variant="primary"
              icon={primary!.icon}
              onClick={() => toast.success(`${o.id} marked.`, primary!.label)}
            >
              {primary!.label}
            </Button>
          </Show>
        </div>
      </footer>
    </div>
  );
}
