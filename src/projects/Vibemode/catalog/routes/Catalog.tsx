import { For, Match, Show, Switch, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Drawer, Select, type SelectOption } from "@/shared/components";
import { ProductDetails } from "../components/ProductDetails";
import "../ProductDetails.css";
import {
  categories,
  catalogHeadline,
  catalogSummary,
  products,
  type Badge,
  type Product,
  type ProductStatus,
} from "../data";
import "../Catalog.css";

const plusIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>`;
const gridIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/></svg>`;
const listIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`;
const starIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m12 2 2.6 6.6L21 10l-5 4.4 1.6 6.6L12 17l-5.6 4 1.6-6.6-5-4.4 6.4-1.4Z"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`;
const gridCatIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const editIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="m14 3-9 9v3h3l9-9Z"/></svg>`;
const duplicateIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`;
const rocketIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2c3 2 5 5.5 5 9s-2 7-5 9c-3-2-5-5.5-5-9s2-7 5-9Z"/><circle cx="12" cy="10" r="2"/><path d="m7 19-2 2 2-2M17 19l2 2-2-2"/></svg>`;
const archiveIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>`;

type FilterKey = "all" | ProductStatus;
type SortKey = "popular" | "rating" | "revenue" | "stock";
type ViewMode = "grid" | "list";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Active", label: "Active" },
  { key: "Out of Stock", label: "Out of Stock" },
  { key: "Draft", label: "Draft" },
  { key: "Archived", label: "Archived" },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "popular", label: "Most Sold" },
  { value: "rating", label: "Top Rated" },
  { value: "revenue", label: "Revenue" },
  { value: "stock", label: "Stock" },
];

function statusStyle(status: ProductStatus): JSX.CSSProperties {
  switch (status) {
    case "Active":       return { background: "rgba(16, 185, 129, 0.15)", color: "#047857" };
    case "Out of Stock": return { background: "rgba(245, 158, 11, 0.16)", color: "#b45309" };
    case "Draft":        return { background: "rgba(100, 116, 139, 0.16)", color: "#334155" };
    case "Archived":     return { background: "rgba(203, 213, 225, 0.4)",   color: "#64748b" };
  }
}

function badgeStyle(badge: Badge): JSX.CSSProperties {
  switch (badge) {
    case "Bestseller": return { background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", color: "#ffffff" };
    case "New":        return { background: "linear-gradient(135deg, #10b981 0%, #047857 100%)", color: "#ffffff" };
    case "Limited":    return { background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)", color: "#ffffff" };
    case "Restocked":  return { background: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)", color: "#ffffff" };
  }
}

function sparkPath(values: number[], width = 110, height = 28): { line: string; area: string } {
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

export default function Catalog(): JSX.Element {
  const navigate = useNavigate();
  const [filter, setFilter] = createSignal<FilterKey>("all");
  const [activeProduct, setActiveProduct] = createSignal<Product | null>(null);
  const [category, setCategory] = createSignal<string | null>(null);
  const [query, setQuery] = createSignal("");
  const [sort, setSort] = createSignal<SortKey>("popular");
  const [view, setView] = createSignal<ViewMode>("grid");
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 22);
  });

  const filtered = createMemo(() => {
    let out = products.slice();
    const f = filter();
    if (f !== "all") out = out.filter((p) => p.status === f);
    const c = category();
    if (c) out = out.filter((p) => p.category === c);
    const q = query().trim().toLowerCase();
    if (q) out = out.filter((p) => p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q));

    const s = sort();
    if (s === "popular") out.sort((a, b) => b.sold - a.sold);
    else if (s === "rating") out.sort((a, b) => b.rating - a.rating);
    else if (s === "revenue") out.sort((a, b) => Number(b.revenue.replace(/[^\d]/g, "")) - Number(a.revenue.replace(/[^\d]/g, "")));
    else if (s === "stock") out.sort((a, b) => b.stock - a.stock);

    return out;
  });

  const isEmpty = createMemo(() => filtered().length === 0);
  const isGrid = createMemo(() => view() === "grid");
  const priceLabel = (p: Product) =>
    p.priceMin === p.priceMax ? `₹${p.priceMin}` : `₹${p.priceMin}–${p.priceMax}`;

  const categoryOptions = (): SelectOption[] =>
    categories.map((c) => ({
      value: c.slug,
      label: c.label,
      sub: `${c.count} products · ${c.share}`,
      accent: c.accent,
    }));

  return (
    <div class="catalog" ref={rootRef}>
      <header class="catalog__header" data-reveal>
        <div class="catalog__header-text">
          <h1>Catalog</h1>
          <p>
            {catalogSummary.total} products across {categories.length} categories — {catalogSummary.active}{" "}
            active, {catalogSummary.draft} drafts
          </p>
        </div>
        <Button
          variant="primary"
          icon={plusIcon}
          onClick={() => navigate("/catalog/new")}
        >
          Add Product
        </Button>
      </header>

      <section class="catalog__stats" aria-label="Catalog headline">
        <For each={catalogHeadline}>
          {(s) => (
            <article class={`catalog-stat catalog-stat--${s.tone}`} data-reveal>
              <strong>{s.value}</strong>
              <span class="catalog-stat__label">{s.label}</span>
              <span class="catalog-stat__delta">{s.delta}</span>
            </article>
          )}
        </For>
      </section>

      <section class="panel catalog__toolbar" data-reveal>
        <div class="catalog__tabs" role="tablist">
          <For each={FILTERS}>
            {(tab) => (
              <button
                type="button"
                class="catalog__tab"
                classList={{ "is-active": filter() === tab.key }}
                role="tab"
                aria-selected={filter() === tab.key ? "true" : "false"}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            )}
          </For>
        </div>

        <div class="catalog__tools">
          <Select
            value={category()}
            onChange={setCategory}
            options={categoryOptions()}
            placeholder="All categories"
            placeholderIcon={gridCatIcon}
            placeholderSub={`${catalogSummary.total} products`}
            allowClear
            align="left"
          />

          <label class="catalog__search">
            <span innerHTML={searchIcon} />
            <input
              type="search"
              placeholder="Search products…"
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
            menuMinWidth={170}
          />

          <div class="catalog__view" role="group" aria-label="View mode">
            <button
              type="button"
              aria-label="Grid view"
              classList={{ "is-active": isGrid() }}
              onClick={() => setView("grid")}
              innerHTML={gridIcon}
            />
            <button
              type="button"
              aria-label="List view"
              classList={{ "is-active": !isGrid() }}
              onClick={() => setView("list")}
              innerHTML={listIcon}
            />
          </div>
        </div>
      </section>

      <Switch>
        <Match when={isEmpty()}>
          <section class="panel catalog__empty" data-reveal>
            <strong>No products match your filters.</strong>
            <p>Adjust the status, change the category, or try a different search.</p>
          </section>
        </Match>

        <Match when={isGrid()}>
          <section class="catalog__grid" aria-label={`${filtered().length} products`}>
            <For each={filtered()}>
              {(p) => {
                const { line, area } = sparkPath(p.spark);
                return (
                  <article class="product-card" data-reveal>
                    <div class="product-card__thumb" style={{ background: p.accent }}>
                      <span class="product-card__icon" innerHTML={p.icon} />
                      <Show when={p.badge}>
                        <span class="product-card__badge" style={badgeStyle(p.badge!)}>{p.badge}</span>
                      </Show>
                      <span class="status-pill product-card__status" style={statusStyle(p.status)}>
                        {p.status}
                      </span>
                    </div>
                    <div class="product-card__body">
                      <header class="product-card__head">
                        <div class="product-card__title">
                          <strong>{p.name}</strong>
                          <em>{p.categoryLabel} · {p.sizes.length ? `${p.sizes.length} ${p.sizes.length === 1 ? "size" : "sizes"}` : "—"}</em>
                        </div>
                      </header>

                      <div class="product-card__price-row">
                        <strong class="product-card__price">{priceLabel(p)}</strong>
                        <Show
                          when={p.reviews > 0}
                          fallback={<span class="product-card__rating product-card__rating--none">No reviews yet</span>}
                        >
                          <span class="product-card__rating">
                            <span class="product-card__star" innerHTML={starIcon} />
                            <strong>{p.rating.toFixed(1)}</strong>
                            <em>({p.reviews})</em>
                          </span>
                        </Show>
                      </div>

                      <div class="product-card__detail-row">
                        <Show
                          when={p.colors.length > 0}
                          fallback={<span class="product-card__colors-empty">No colorways</span>}
                        >
                          <div class="product-card__colors" title={`${p.colors.length} colors`}>
                            <For each={p.colors.slice(0, 4)}>
                              {(c) => <span class="product-card__color" style={{ background: c }} />}
                            </For>
                            <Show when={p.colors.length > 4}>
                              <span class="product-card__color-more">+{p.colors.length - 4}</span>
                            </Show>
                          </div>
                        </Show>
                        <span class="product-card__stock">
                          <span classList={{ "is-ok": p.stock > 50, "is-low": p.stock > 0 && p.stock <= 50, "is-zero": p.stock === 0 }} />
                          {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                        </span>
                      </div>

                      <div class="product-card__perf">
                        <div class="product-card__perf-text">
                          <strong>{p.sold.toLocaleString()}</strong>
                          <em>sold · {p.revenue}</em>
                        </div>
                        <svg class="product-card__spark" viewBox="0 0 110 28" preserveAspectRatio="none" aria-hidden="true">
                          <defs>
                            <linearGradient id={`pc-grad-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stop-color="#7c3aed" stop-opacity="0.35" />
                              <stop offset="1" stop-color="#7c3aed" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                          <path d={area} fill={`url(#pc-grad-${p.id})`} />
                          <path d={line} fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>

                      <div class="product-card__actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={eyeIcon}
                          onClick={() => setActiveProduct(p)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={editIcon}
                          class="product-card__edit"
                          onClick={() => navigate(`/catalog/${p.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Show when={p.status === "Draft"}>
                          <Button
                            variant="secondary"
                            size="sm"
                            iconOnly
                            icon={rocketIcon}
                            aria-label="Publish"
                            title="Publish"
                            onClick={() => toast.info(`Publishing ${p.name}…`, "Coming soon")}
                          />
                        </Show>
                        <Show when={p.status !== "Draft"}>
                          <Button
                            variant="secondary"
                            size="sm"
                            iconOnly
                            icon={duplicateIcon}
                            aria-label="Duplicate"
                            title="Duplicate"
                            onClick={() => toast.info(`Duplicating ${p.name}…`, "Coming soon")}
                          />
                        </Show>
                      </div>
                    </div>
                  </article>
                );
              }}
            </For>
          </section>
        </Match>

        <Match when={!isGrid()}>
          <section class="panel catalog__list" aria-label={`${filtered().length} products`}>
            <header class="catalog__list-head">
              <span>Product</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Sold</span>
              <span class="catalog__list-right">Revenue</span>
              <span class="catalog__list-right">Rating</span>
              <span />
            </header>
            <ul>
              <For each={filtered()}>
                {(p) => (
                  <li class="catalog__list-row" data-reveal>
                    <div class="catalog__list-name">
                      <span class="catalog__list-avatar" style={{ background: p.accent }}>
                        <span class="catalog__list-icon" innerHTML={p.icon} />
                      </span>
                      <div>
                        <strong>{p.name}</strong>
                        <em>
                          {p.categoryLabel}
                          {p.badge ? ` · ${p.badge}` : ""}
                        </em>
                        <span class="status-pill catalog__list-status" style={statusStyle(p.status)}>{p.status}</span>
                      </div>
                    </div>
                    <span class="catalog__list-price">{priceLabel(p)}</span>
                    <span class="catalog__list-stock" classList={{ "is-zero": p.stock === 0, "is-low": p.stock > 0 && p.stock <= 50 }}>
                      {p.stock === 0 ? "Out of stock" : `${p.stock}`}
                    </span>
                    <span>{p.sold.toLocaleString()}</span>
                    <span class="catalog__list-right catalog__list-revenue">{p.revenue}</span>
                    <span class="catalog__list-right catalog__list-rating">
                      <Show when={p.reviews > 0} fallback={<em>—</em>}>
                        <span innerHTML={starIcon} />
                        <strong>{p.rating.toFixed(1)}</strong>
                        <em>({p.reviews})</em>
                      </Show>
                    </span>
                    <div class="catalog__list-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={eyeIcon}
                        aria-label="View"
                        title="View"
                        onClick={() => setActiveProduct(p)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={editIcon}
                        aria-label="Edit"
                        title="Edit"
                        onClick={() => navigate(`/catalog/${p.id}/edit`)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={archiveIcon}
                        aria-label={p.status === "Archived" ? "Restore" : "Archive"}
                        title={p.status === "Archived" ? "Restore" : "Archive"}
                        onClick={() => toast.info(`${p.status === "Archived" ? "Restore" : "Archive"} ${p.name}…`, "Coming soon")}
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
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </section>
        </Match>
      </Switch>

      <Drawer
        open={activeProduct() !== null}
        onClose={() => setActiveProduct(null)}
        width="75vw"
        id="product-details-drawer"
      >
        <Show when={activeProduct()}>
          <ProductDetails
            product={activeProduct()!}
            onClose={() => setActiveProduct(null)}
          />
        </Show>
      </Drawer>
    </div>
  );
}
