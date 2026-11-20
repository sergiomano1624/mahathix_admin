import { For, Match, Show, Switch, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Drawer, Select, type SelectOption } from "@/shared/components";
import {
  customers,
  customersHeadline,
  customersSummary,
  type Customer,
  type Segment,
  type Tier,
} from "../data";
import { CustomerDetails } from "../components/CustomerDetails";
import "../Customers.css";
import "../CustomerDetails.css";

const plusIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const uploadIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.6V4.4"/><path d="m7.4 9 4.6-4.6L16.6 9"/><path d="M4.6 15.6v2.6a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-2.6"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`;
const mailIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const chevronIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;

type FilterKey = "all" | Segment;
type SortKey = "recent" | "ltv" | "ltv-asc" | "orders" | "name";

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all",      label: "All",      count: customersSummary.total },
  { key: "VIP",      label: "VIP",      count: customersSummary.vip },
  { key: "Regular",  label: "Regular",  count: customersSummary.regular },
  { key: "New",      label: "New",      count: customersSummary.new },
  { key: "At Risk",  label: "At Risk",  count: customersSummary.atRisk },
  { key: "Churned",  label: "Churned",  count: customersSummary.churned },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "recent",   label: "Most recent order" },
  { value: "ltv",      label: "Highest LTV" },
  { value: "ltv-asc",  label: "Lowest LTV" },
  { value: "orders",   label: "Most orders" },
  { value: "name",     label: "Name A → Z" },
];

const TIER_OPTIONS: SelectOption[] = [
  { value: "",         label: "All tiers",  sub: "Bronze through Platinum" },
  { value: "Platinum", label: "Platinum",   sub: "₹50K+ lifetime",      accent: "linear-gradient(135deg, #818cf8 0%, #1e293b 100%)" },
  { value: "Gold",     label: "Gold",       sub: "₹15K – ₹50K",         accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
  { value: "Silver",   label: "Silver",     sub: "₹5K – ₹15K",          accent: "linear-gradient(135deg, #cbd5e1 0%, #475569 100%)" },
  { value: "Bronze",   label: "Bronze",     sub: "Under ₹5K",           accent: "linear-gradient(135deg, #fbbf24 0%, #92400e 100%)" },
];

export function segmentStyle(segment: Segment): JSX.CSSProperties {
  switch (segment) {
    case "VIP":      return { background: "rgba(124, 58, 237, 0.14)",  color: "#6d28d9" };
    case "Regular":  return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "New":      return { background: "rgba(59, 130, 246, 0.14)",  color: "#1d4ed8" };
    case "At Risk":  return { background: "rgba(245, 158, 11, 0.18)",  color: "#b45309" };
    case "Churned":  return { background: "rgba(100, 116, 139, 0.18)", color: "#334155" };
  }
}

export function tierStyle(tier: Tier): JSX.CSSProperties {
  switch (tier) {
    case "Platinum": return { background: "linear-gradient(135deg, #818cf8 0%, #1e293b 100%)", color: "#ffffff" };
    case "Gold":     return { background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", color: "#7c2d12" };
    case "Silver":   return { background: "linear-gradient(135deg, #e2e8f0 0%, #64748b 100%)", color: "#1e293b" };
    case "Bronze":   return { background: "linear-gradient(135deg, #fbbf24 0%, #92400e 100%)", color: "#ffffff" };
  }
}

function sparkPath(values: number[], width = 100, height = 24): string {
  const max = Math.max(...values, 0.1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function Customers(): JSX.Element {
  const [filter, setFilter] = createSignal<FilterKey>("all");
  const [tier, setTier] = createSignal<string>("");
  const [query, setQuery] = createSignal("");
  const [sort, setSort] = createSignal<SortKey>("recent");
  const [activeCustomer, setActiveCustomer] = createSignal<Customer | null>(null);
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 22);
  });

  const filtered = createMemo(() => {
    let out = customers.slice();
    const f = filter();
    if (f !== "all") out = out.filter((c) => c.segment === f);
    const t = tier();
    if (t) out = out.filter((c) => c.tier === t);
    const q = query().trim().toLowerCase();
    if (q) {
      out = out.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.replace(/\s/g, "").toLowerCase().includes(q.replace(/\s/g, "")) ||
          c.city.toLowerCase().includes(q),
      );
    }
    const s = sort();
    if (s === "recent")   out.sort((a, b) => b.lastOrderIso.localeCompare(a.lastOrderIso));
    else if (s === "ltv")     out.sort((a, b) => b.totalSpent - a.totalSpent);
    else if (s === "ltv-asc") out.sort((a, b) => a.totalSpent - b.totalSpent);
    else if (s === "orders")  out.sort((a, b) => b.orderCount - a.orderCount);
    else if (s === "name")    out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  });

  const isEmpty = createMemo(() => filtered().length === 0);
  const onOpen = (c: Customer) => setActiveCustomer(c);
  const onCloseDrawer = () => setActiveCustomer(null);

  return (
    <div class="customers" ref={rootRef}>
      <header class="customers__header" data-reveal>
        <div>
          <h1>Customers</h1>
          <p>
            {customersSummary.total} customers in-view · {customersSummary.vip} VIP · {customersSummary.atRisk} at-risk — nurture now
          </p>
        </div>
        <div class="customers__header-actions">
          <Button
            variant="ghost"
            icon={uploadIcon}
            onClick={() => toast.info("Bulk import isn't wired up.", "Coming soon")}
          >
            Import CSV
          </Button>
          <Button
            variant="primary"
            icon={plusIcon}
            onClick={() => toast.info("Customer composer isn't wired up.", "Coming soon")}
          >
            Add Customer
          </Button>
        </div>
      </header>

      <section class="customers__stats" aria-label="Customers headline">
        <For each={customersHeadline}>
          {(s) => (
            <article class={`customers-stat customers-stat--${s.tone}`} data-reveal>
              <div class="customers-stat__top">
                <strong>{s.value}</strong>
                <span class="customers-stat__delta">{s.delta}</span>
              </div>
              <span class="customers-stat__label">{s.label}</span>
              <span class="customers-stat__sub">{s.sub}</span>
            </article>
          )}
        </For>
      </section>

      <section class="panel customers__toolbar" data-reveal>
        <div class="customers__tabs" role="tablist">
          <For each={FILTERS}>
            {(tab) => (
              <button
                type="button"
                class="customers__tab"
                classList={{ "is-active": filter() === tab.key }}
                role="tab"
                aria-selected={filter() === tab.key ? "true" : "false"}
                onClick={() => setFilter(tab.key)}
              >
                <span>{tab.label}</span>
                <span class="customers__tab-count">{tab.count}</span>
              </button>
            )}
          </For>
        </div>
        <div class="customers__tools">
          <Select
            value={tier()}
            onChange={(v) => setTier(v ?? "")}
            options={TIER_OPTIONS}
            align="left"
            minWidth={0}
            menuMinWidth={240}
          />
          <label class="customers__search">
            <span innerHTML={searchIcon} />
            <input
              type="search"
              placeholder="Search by name, email, phone or city…"
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
            minWidth={190}
            menuMinWidth={200}
          />
        </div>
      </section>

      <Switch>
        <Match when={isEmpty()}>
          <section class="panel customers__empty" data-reveal>
            <strong>No customers match this filter.</strong>
            <p>Reset the segment, change the tier, or try a different search.</p>
          </section>
        </Match>
        <Match when={!isEmpty()}>
          <section class="panel customers__list" aria-label={`${filtered().length} customers`}>
            <header class="customers__list-head">
              <span>Customer</span>
              <span>Segment</span>
              <span>Tier</span>
              <span>Orders</span>
              <span>Lifetime value</span>
              <span>Last order</span>
              <span class="customers__list-head-actions">Actions</span>
            </header>
            <ul>
              <For each={filtered()}>
                {(c) => (
                  <li
                    class="customers__row"
                    data-reveal
                    onClick={() => onOpen(c)}
                  >
                    <div class="customers__cell customers__cell--cust">
                      <span class="customers__avatar" style={{ background: c.accent }}>
                        {c.initials}
                      </span>
                      <div>
                        <strong>{c.name}</strong>
                        <em>{c.email}</em>
                        <span class="customers__city">
                          {c.city}, {c.state}
                        </span>
                      </div>
                    </div>

                    <div class="customers__cell">
                      <span class="status-pill" style={segmentStyle(c.segment)}>{c.segment}</span>
                    </div>

                    <div class="customers__cell">
                      <span class="customers__tier" style={tierStyle(c.tier)}>{c.tier}</span>
                    </div>

                    <div class="customers__cell customers__cell--orders">
                      <strong>{c.orderCount}</strong>
                      <em>AOV ₹{c.aov.toLocaleString("en-IN")}</em>
                    </div>

                    <div class="customers__cell customers__cell--ltv">
                      <div>
                        <strong>₹{c.totalSpent.toLocaleString("en-IN")}</strong>
                        <em>{c.loyaltyPoints.toLocaleString("en-IN")} pts</em>
                      </div>
                      <svg class="customers__spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
                        <path d={sparkPath(c.spark)} fill="none" stroke="#7c3aed" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>

                    <div class="customers__cell customers__cell--last">
                      <strong>{c.lastOrderAt.split(",")[0]}</strong>
                      <em>{c.lastOrderAt.split(",")[1]?.trim() ?? ""}</em>
                    </div>

                    <div class="customers__cell customers__cell--actions" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={eyeIcon}
                        aria-label="View profile"
                        title="View profile"
                        onClick={() => onOpen(c)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={mailIcon}
                        aria-label="Email"
                        title="Email"
                        onClick={() => toast.info(`Email to ${c.name}…`, "Coming soon")}
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
                      <span class="customers__row-chevron" innerHTML={chevronIcon} />
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </section>
        </Match>
      </Switch>

      <Drawer
        open={activeCustomer() !== null}
        onClose={onCloseDrawer}
        width="75vw"
        id="customer-details-drawer"
      >
        <Show when={activeCustomer()}>
          <CustomerDetails customer={activeCustomer()!} onClose={onCloseDrawer} />
        </Show>
      </Drawer>
    </div>
  );
}
