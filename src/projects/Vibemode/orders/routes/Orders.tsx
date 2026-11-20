import { For, Match, Show, Switch, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Drawer, Select, type SelectOption } from "@/shared/components";
import {
  orders,
  ordersHeadline,
  ordersSummary,
  paymentMethodLabels,
  type Order,
  type OrderStatus,
  type PaymentMethod,
} from "../data";
import { OrderDetails } from "../components/OrderDetails";
import "../Orders.css";
import "../OrderDetails.css";

const downloadIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>`;
const printerIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="3.6" width="12" height="6" rx="1.4"/><rect x="4" y="9.6" width="16" height="9" rx="2"/><rect x="7.4" y="14" width="9.2" height="6.4" rx="1.4"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const truckIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3Z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>`;
const chevronIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;
const repeatIcon = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`;

type FilterKey = "all" | OrderStatus;
type SortKey = "recent" | "oldest" | "value" | "value-asc";

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: ordersSummary.total },
  { key: "New", label: "New", count: ordersSummary.new },
  { key: "Processing", label: "Processing", count: ordersSummary.processing },
  { key: "Shipped", label: "Shipped", count: ordersSummary.shipped },
  { key: "Delivered", label: "Delivered", count: ordersSummary.delivered },
  { key: "Cancelled", label: "Cancelled", count: ordersSummary.cancelled },
  { key: "Refunded", label: "Refunded", count: ordersSummary.refunded },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "recent", label: "Most recent" },
  { value: "oldest", label: "Oldest first" },
  { value: "value", label: "Highest value" },
  { value: "value-asc", label: "Lowest value" },
];

const PAYMENT_OPTIONS: SelectOption[] = [
  { value: "", label: "All payment methods", sub: "Any way they paid" },
  { value: "upi",    label: "UPI",      sub: "Direct bank transfer", accent: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" },
  { value: "card",   label: "Card",     sub: "Credit / debit",       accent: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)" },
  { value: "cod",    label: "COD",      sub: "Cash on delivery",     accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
  { value: "wallet", label: "Wallet",   sub: "Paytm, Amazon Pay…",   accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)" },
];

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

export default function Orders(): JSX.Element {
  const [filter, setFilter] = createSignal<FilterKey>("all");
  const [query, setQuery] = createSignal("");
  const [sort, setSort] = createSignal<SortKey>("recent");
  const [paymentFilter, setPaymentFilter] = createSignal<PaymentMethod | "">("");
  const [activeOrder, setActiveOrder] = createSignal<Order | null>(null);
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 22);
  });

  const filtered = createMemo(() => {
    let out = orders.slice();
    const f = filter();
    if (f !== "all") out = out.filter((o) => o.status === f);
    const pm = paymentFilter();
    if (pm) out = out.filter((o) => o.payment === pm);
    const q = query().trim().toLowerCase();
    if (q) {
      out = out.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          o.items.some((it) => it.name.toLowerCase().includes(q)),
      );
    }
    const s = sort();
    if (s === "recent") out.sort((a, b) => b.placedAtIso.localeCompare(a.placedAtIso));
    else if (s === "oldest") out.sort((a, b) => a.placedAtIso.localeCompare(b.placedAtIso));
    else if (s === "value") out.sort((a, b) => b.total - a.total);
    else if (s === "value-asc") out.sort((a, b) => a.total - b.total);
    return out;
  });

  const isEmpty = createMemo(() => filtered().length === 0);
  const onOpen = (o: Order) => setActiveOrder(o);
  const onCloseDrawer = () => setActiveOrder(null);

  return (
    <div class="orders" ref={rootRef}>
      <header class="orders__header" data-reveal>
        <div>
          <h1>Orders</h1>
          <p>
            {ordersSummary.total} recent orders · {ordersSummary.new} new · {ordersSummary.processing + ordersSummary.shipped} in motion
          </p>
        </div>
        <div class="orders__header-actions">
          <Button
            variant="ghost"
            icon={printerIcon}
            onClick={() => toast.info("Invoice printing isn't wired up.", "Coming soon")}
          >
            Print Today
          </Button>
          <Button
            variant="secondary"
            icon={downloadIcon}
            onClick={() => toast.info("Export isn't wired up in this demo.", "Coming soon")}
          >
            Export CSV
          </Button>
        </div>
      </header>

      <section class="orders__stats" aria-label="Orders headline">
        <For each={ordersHeadline}>
          {(s) => (
            <article class={`orders-stat orders-stat--${s.tone}`} data-reveal>
              <div class="orders-stat__top">
                <strong>{s.value}</strong>
                <span class="orders-stat__delta">{s.delta}</span>
              </div>
              <span class="orders-stat__label">{s.label}</span>
              <span class="orders-stat__sub">{s.sub}</span>
            </article>
          )}
        </For>
      </section>

      <section class="panel orders__toolbar" data-reveal>
        <div class="orders__tabs" role="tablist">
          <For each={FILTERS}>
            {(tab) => (
              <button
                type="button"
                class="orders__tab"
                classList={{ "is-active": filter() === tab.key }}
                role="tab"
                aria-selected={filter() === tab.key ? "true" : "false"}
                onClick={() => setFilter(tab.key)}
              >
                <span>{tab.label}</span>
                <span class="orders__tab-count">{tab.count}</span>
              </button>
            )}
          </For>
        </div>
        <div class="orders__tools">
          <Select
            value={paymentFilter()}
            onChange={(v) => setPaymentFilter((v ?? "") as PaymentMethod | "")}
            options={PAYMENT_OPTIONS}
            align="left"
            minWidth={0}
            menuMinWidth={240}
          />
          <label class="orders__search">
            <span innerHTML={searchIcon} />
            <input
              type="search"
              placeholder="Search by order ID, customer or item…"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </label>
          <Select
            value={sort()}
            onChange={(v) => v && setSort(v as SortKey)}
            options={SORT_OPTIONS}
            prefix="Sort:"
            align="right"
            minWidth={170}
            menuMinWidth={180}
          />
        </div>
      </section>

      <Switch>
        <Match when={isEmpty()}>
          <section class="panel orders__empty" data-reveal>
            <strong>No orders match this filter.</strong>
            <p>Reset the status, clear the search, or try a different payment method.</p>
          </section>
        </Match>
        <Match when={!isEmpty()}>
          <section class="panel orders__list" aria-label={`${filtered().length} orders`}>
            <header class="orders__list-head">
              <span>Order</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Payment</span>
              <span>Total</span>
              <span>Status</span>
              <span>Placed</span>
              <span class="orders__list-head-actions">Actions</span>
            </header>
            <ul>
              <For each={filtered()}>
                {(o) => (
                  <li
                    class="orders__row"
                    classList={{ "is-unpaid": !o.paid }}
                    data-reveal
                    onClick={() => onOpen(o)}
                  >
                    <div class="orders__cell orders__cell--id">
                      <strong>#{o.id}</strong>
                      <Show when={!o.paid}>
                        <em class="orders__unpaid">Unpaid · COD pending</em>
                      </Show>
                      <Show when={o.paid && o.tracking}>
                        <em class="orders__tracking">
                          <span innerHTML={truckIcon} />
                          {o.tracking}
                        </em>
                      </Show>
                    </div>

                    <div class="orders__cell orders__cell--cust">
                      <span class="orders__avatar" style={{ background: o.customer.accent }}>
                        {o.customer.initials}
                      </span>
                      <div>
                        <strong>
                          {o.customer.name}
                          <Show when={o.customer.isReturning}>
                            <span
                              class="orders__returning"
                              title="Returning customer"
                              innerHTML={repeatIcon}
                            />
                          </Show>
                        </strong>
                        <em>{o.customer.email}</em>
                        <span class="orders__city">
                          {o.customer.city}, {o.customer.state}
                        </span>
                      </div>
                    </div>

                    <div class="orders__cell orders__cell--items">
                      <span class="orders__items-count">{o.itemCount}×</span>
                      <div>
                        <strong>{o.items[0]!.name}</strong>
                        <Show when={o.items.length > 1}>
                          <em>+{o.items.length - 1} more items</em>
                        </Show>
                      </div>
                    </div>

                    <div class="orders__cell orders__cell--pay">
                      <span class="orders__payment" style={paymentChip(o.payment)}>
                        {paymentMethodLabels[o.payment]}
                      </span>
                    </div>

                    <div class="orders__cell orders__cell--total">
                      <strong>₹{o.total.toLocaleString("en-IN")}</strong>
                      <em>Sub ₹{o.subtotal.toLocaleString("en-IN")} · Ship ₹{o.shipping}</em>
                    </div>

                    <div class="orders__cell">
                      <span class="status-pill" style={statusStyle(o.status)}>{o.status}</span>
                    </div>

                    <div class="orders__cell orders__cell--placed">
                      <strong>{o.placedAt.split(",")[0]}</strong>
                      <em>{o.placedAt.split(",")[1]?.trim() ?? ""}</em>
                    </div>

                    <div class="orders__cell orders__cell--actions" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={eyeIcon}
                        aria-label="View"
                        title="View"
                        onClick={() => onOpen(o)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={truckIcon}
                        aria-label="Update status"
                        title="Update status"
                        onClick={() => toast.info(`Status update for ${o.id}…`, "Coming soon")}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={moreIcon}
                        aria-label="More"
                        title="More"
                        onClick={() => toast.info("More actions…", "Coming soon")}
                      />
                      <span class="orders__row-chevron" innerHTML={chevronIcon} />
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </section>
        </Match>
      </Switch>

      <Drawer
        open={activeOrder() !== null}
        onClose={onCloseDrawer}
        width="75vw"
        id="order-details-drawer"
      >
        <Show when={activeOrder()}>
          <OrderDetails order={activeOrder()!} onClose={onCloseDrawer} />
        </Show>
      </Drawer>
    </div>
  );
}
