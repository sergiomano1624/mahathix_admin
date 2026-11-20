import { For, Show, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { categories, genres, type Badge, type Product, type ProductStatus } from "../data";

const editIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="m14 3-9 9v3h3l9-9Z"/></svg>`;
const duplicateIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`;
const archiveIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>`;
const starIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="m12 2 2.6 6.6L21 10l-5 4.4 1.6 6.6L12 17l-5.6 4 1.6-6.6-5-4.4 6.4-1.4Z"/></svg>`;

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

function sparkPath(values: number[], width = 260, height = 70): { line: string; area: string } {
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

export interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetails(props: ProductDetailsProps): JSX.Element {
  const navigate = useNavigate();
  const p = props.product;
  const spark = sparkPath(p.spark);
  const cat = categories.find((c) => c.slug === p.category);
  const genre = p.genre ? genres.find((g) => g.slug === p.genre) : undefined;
  const priceLabel = p.priceMin === p.priceMax ? `₹${p.priceMin}` : `₹${p.priceMin}–${p.priceMax}`;

  return (
    <div class="pv-drawer">
      <header class="pv-drawer__head">
        <div class="pv-drawer__title">
          <span class="pv-drawer__eyebrow">Product · SKU {p.id.toUpperCase()}</span>
          <div class="pv-drawer__title-row">
            <h2>{p.name}</h2>
            <span class="status-pill" style={statusStyle(p.status)}>{p.status}</span>
            <Show when={p.badge}>
              <span class="pv-drawer__badge" style={badgeStyle(p.badge!)}>{p.badge}</span>
            </Show>
          </div>
          <p class="pv-drawer__subtitle">{p.categoryLabel}</p>
        </div>
        <div class="pv-drawer__head-actions">
          <Button
            variant="ghost"
            size="sm"
            icon={archiveIcon}
            onClick={() => toast.info(`Archive ${p.name}…`, "Coming soon")}
          >
            Archive
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={duplicateIcon}
            onClick={() => toast.info(`Duplicating ${p.name}…`, "Coming soon")}
          >
            Duplicate
          </Button>
        </div>
      </header>

      <div class="pv-drawer__body">
        <section class="pv-drawer__hero">
          <div class="pv-drawer__gallery">
            <div class="pv-drawer__cover" style={{ background: p.accent }}>
              <span class="pv-drawer__cover-icon" innerHTML={p.icon} />
            </div>
            <div class="pv-drawer__thumbs">
              <For each={[0, 1, 2, 3]}>
                {(i) => (
                  <button
                    type="button"
                    class="pv-drawer__thumb"
                    classList={{ "is-active": i === 0 }}
                    style={{ background: p.accent, opacity: i === 0 ? 1 : 0.6 }}
                    aria-label={`View image ${i + 1}`}
                    onClick={() => toast.info("Gallery isn't wired up in this demo.", "Coming soon")}
                  >
                    <span class="pv-drawer__thumb-icon" innerHTML={p.icon} />
                  </button>
                )}
              </For>
            </div>
          </div>

          <div class="pv-drawer__summary">
            <span class="pv-drawer__category-eyebrow">{p.categoryLabel}</span>
            <h3>{p.name}</h3>
            <div class="pv-drawer__price-row">
              <strong class="pv-drawer__price">{priceLabel}</strong>
              <Show when={p.reviews > 0}>
                <span class="pv-drawer__rating">
                  <span class="pv-drawer__star" innerHTML={starIcon} />
                  <strong>{p.rating.toFixed(1)}</strong>
                  <em>({p.reviews} reviews)</em>
                </span>
              </Show>
            </div>
            <p class="pv-drawer__desc">
              Original Vibe Mode drop with hand-picked colorways. Printed on heavyweight 100%
              cotton with a boxy oversized fit. Ships worldwide — in-stock items leave the studio
              within 48 hours.
            </p>

            <Show when={genre}>
              <div class="pv-drawer__attr">
                <span class="pv-drawer__attr-label">Genre</span>
                <div class="pv-drawer__genre">
                  <span class="pv-drawer__genre-swatch" style={{ background: genre!.accent }} />
                  <strong>{genre!.label}</strong>
                  <em>{genre!.sub}</em>
                </div>
              </div>
            </Show>

            <Show when={p.sizes.length > 0}>
              <div class="pv-drawer__attr">
                <span class="pv-drawer__attr-label">Sizes</span>
                <div class="pv-drawer__chips">
                  <For each={p.sizes}>
                    {(s) => <span class="pv-drawer__chip">{s}</span>}
                  </For>
                </div>
              </div>
            </Show>

            <Show when={p.colors.length > 0}>
              <div class="pv-drawer__attr">
                <span class="pv-drawer__attr-label">Colorways</span>
                <div class="pv-drawer__chips">
                  <For each={p.colors}>
                    {(c) => (
                      <span class="pv-drawer__chip pv-drawer__chip--color">
                        <span class="pv-drawer__chip-swatch" style={{ background: c }} />
                        {c}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </section>

        <section class="pv-drawer__perf">
          <header class="pv-drawer__panel-head">
            <h3>Sales performance</h3>
            <span>Last 14 days</span>
          </header>
          <div class="pv-drawer__kpis">
            <div class="pv-drawer__kpi">
              <span>Units sold</span>
              <strong>{p.sold.toLocaleString()}</strong>
            </div>
            <div class="pv-drawer__kpi">
              <span>Revenue</span>
              <strong>{p.revenue}</strong>
            </div>
            <div class="pv-drawer__kpi">
              <span>Reviews</span>
              <strong>{p.reviews}</strong>
            </div>
            <div class="pv-drawer__kpi">
              <span>Rating</span>
              <strong>{p.rating > 0 ? p.rating.toFixed(1) : "—"}</strong>
            </div>
          </div>
          <svg
            class="pv-drawer__chart"
            viewBox="0 0 260 70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`pv-area-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#7c3aed" stop-opacity="0.35" />
                <stop offset="1" stop-color="#7c3aed" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d={spark.area} fill={`url(#pv-area-${p.id})`} />
            <path
              d={spark.line}
              fill="none"
              stroke="#7c3aed"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </section>

        <div class="pv-drawer__grid">
          <section class="pv-drawer__card">
            <h3>Inventory</h3>
            <div class="pv-drawer__meter">
              <span
                class="pv-drawer__meter-dot"
                classList={{
                  "is-ok": p.stock > 50,
                  "is-low": p.stock > 0 && p.stock <= 50,
                  "is-zero": p.stock === 0,
                }}
              />
              <strong>{p.stock === 0 ? "Out of stock" : `${p.stock} units`}</strong>
            </div>
            <Show when={p.stock > 0}>
              <em class="pv-drawer__hint">
                {p.stock <= 50 ? "Running low — consider a restock." : "Healthy stock level."}
              </em>
            </Show>
          </section>

          <Show when={cat}>
            <section class="pv-drawer__card">
              <h3>Category</h3>
              <div class="pv-drawer__cat">
                <span class="pv-drawer__cat-swatch" style={{ background: cat!.accent }} />
                <div>
                  <strong>{cat!.label}</strong>
                  <em>{cat!.count} products · {cat!.share}</em>
                </div>
              </div>
            </section>
          </Show>

          <section class="pv-drawer__card">
            <h3>Channels</h3>
            <div class="pv-drawer__channels">
              <span>Vibe Mode Shop · Live</span>
              <span>Instagram · Live</span>
              <span>YouTube Shopping · Draft</span>
            </div>
          </section>

          <section class="pv-drawer__card">
            <h3>Timeline</h3>
            <ul class="pv-drawer__timeline">
              <li>
                <strong>Created</strong>
                <em>Oct 24, 2026</em>
              </li>
              <li>
                <strong>Last restocked</strong>
                <em>Nov 12, 2026</em>
              </li>
              <li>
                <strong>Last sold</strong>
                <em>Today, 11:04 AM</em>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <footer class="pv-drawer__footer">
        <Button variant="ghost" onClick={() => props.onClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          icon={editIcon}
          onClick={() => {
            props.onClose();
            navigate(`/catalog/${p.id}/edit`);
          }}
        >
          Edit Product
        </Button>
      </footer>
    </div>
  );
}
