import { createSignal, For, Show, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button, Select, type SelectOption } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import {
  categories,
  genres,
  products,
  type Badge,
  type GenreSlug,
  type Product,
  type ProductStatus,
} from "../data";

const plusIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const closeIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
const saveIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>`;
const uploadIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.6V4.4"/><path d="m7.4 9 4.6-4.6L16.6 9"/><path d="M4.6 15.6v2.6a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-2.6"/></svg>`;

export interface ProductFormData {
  name: string;
  category: string;
  genre: GenreSlug | "";
  sku: string;
  description: string;
  priceMin: number;
  priceMax: number;
  stock: number;
  lowStockThreshold: number;
  sizes: string[];
  colors: string[];
  status: ProductStatus;
  badge: Badge | "";
}

const EMPTY: ProductFormData = {
  name: "",
  category: categories[0]!.slug,
  genre: "",
  sku: "",
  description: "",
  priceMin: 0,
  priceMax: 0,
  stock: 0,
  lowStockThreshold: 20,
  sizes: [],
  colors: [],
  status: "Draft",
  badge: "",
};

const STATUS_OPTIONS: SelectOption[] = [
  { value: "Active", label: "Active", sub: "Published and selling" },
  { value: "Draft", label: "Draft", sub: "Hidden from store" },
  { value: "Out of Stock", label: "Out of Stock", sub: "Published but unavailable" },
  { value: "Archived", label: "Archived", sub: "Hidden and locked" },
];

const BADGE_OPTIONS: SelectOption[] = [
  { value: "", label: "No badge", sub: "Keep the card clean" },
  { value: "Bestseller", label: "Bestseller", sub: "Top sellers of the season", accent: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)" },
  { value: "New", label: "New", sub: "Fresh in the catalog", accent: "linear-gradient(135deg, #10b981 0%, #047857 100%)" },
  { value: "Limited", label: "Limited", sub: "Short-run capsule drop", accent: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)" },
  { value: "Restocked", label: "Restocked", sub: "Back by popular demand", accent: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)" },
];

const CATEGORY_OPTIONS: SelectOption[] = categories.map((c) => ({
  value: c.slug,
  label: c.label,
  sub: `${c.count} products`,
  accent: c.accent,
}));

const GENRE_OPTIONS: SelectOption[] = [
  { value: "", label: "No genre", sub: "Not tied to a theme yet" },
  ...genres.map((g) => ({
    value: g.slug,
    label: g.label,
    sub: g.sub,
    accent: g.accent,
  })),
];

const PRESET_COLORS = ["#F9F6EE", "#1A1A1A", "#0033FF", "#CCFF00", "#F472B6", "#F59E0B", "#10B981", "#A78BFA"];
const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export interface ProductFormProps {
  mode: "create" | "edit";
  initial?: Partial<ProductFormData>;
  productId?: string;
}

export function ProductForm(props: ProductFormProps): JSX.Element {
  const navigate = useNavigate();
  const initial: ProductFormData = { ...EMPTY, ...(props.initial ?? {}) };

  const [name, setName] = createSignal(initial.name);
  const [category, setCategory] = createSignal(initial.category);
  const [genre, setGenre] = createSignal<GenreSlug | "">(initial.genre);
  const [sku, setSku] = createSignal(initial.sku);
  const [description, setDescription] = createSignal(initial.description);
  const [priceMin, setPriceMin] = createSignal(initial.priceMin);
  const [priceMax, setPriceMax] = createSignal(initial.priceMax);
  const [stock, setStock] = createSignal(initial.stock);
  const [lowStockThreshold, setLowStockThreshold] = createSignal(initial.lowStockThreshold);
  const [sizes, setSizes] = createSignal<string[]>(initial.sizes);
  const [colors, setColors] = createSignal<string[]>(initial.colors);
  const [status, setStatus] = createSignal<ProductStatus>(initial.status);
  const [badge, setBadge] = createSignal<Badge | "">(initial.badge);
  const [newSize, setNewSize] = createSignal("");
  const [newColor, setNewColor] = createSignal("#7c3aed");

  const addSize = (s: string) => {
    const trimmed = s.trim().toUpperCase();
    if (!trimmed) return;
    if (sizes().includes(trimmed)) return;
    setSizes([...sizes(), trimmed]);
    setNewSize("");
  };
  const removeSize = (s: string) => setSizes(sizes().filter((x) => x !== s));

  const addColor = (c: string) => {
    if (!c) return;
    if (colors().includes(c)) return;
    setColors([...colors(), c]);
  };
  const removeColor = (c: string) => setColors(colors().filter((x) => x !== c));

  const onCancel = () => {
    navigate(props.mode === "edit" && props.productId ? `/catalog/${props.productId}` : "/catalog");
  };

  const onSaveDraft = () => {
    toast.info("Draft saved locally (not persisted in this demo).", "Saved");
    navigate("/catalog");
  };

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!name().trim()) {
      toast.info("Give your product a name before saving.", "Missing name");
      return;
    }
    if (priceMin() <= 0) {
      toast.info("Set a starting price above ₹0.", "Missing price");
      return;
    }
    const verb = props.mode === "create" ? "created" : "updated";
    toast.success(`${name()} ${verb} successfully.`, props.mode === "create" ? "Created" : "Updated");
    navigate("/catalog");
  };

  return (
    <form class="product-form" onSubmit={onSubmit} novalidate>
      <div class="product-form__grid">
        {/* ---------------------------- Main column ---------------------------- */}
        <div class="product-form__main">
          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>General</h2>
              <p>The basics shoppers see first — name, category, description.</p>
            </header>

            <div class="product-form__row">
              <label class="product-form__field product-form__field--grow">
                <span class="product-form__label">Product name *</span>
                <input
                  class="product-form__input"
                  type="text"
                  placeholder="Good Energy Tee"
                  value={name()}
                  onInput={(e) => setName(e.currentTarget.value)}
                  required
                />
              </label>
              <div class="product-form__field">
                <span class="product-form__label">SKU</span>
                <input
                  class="product-form__input"
                  type="text"
                  placeholder="VM-GE-TEE-01"
                  value={sku()}
                  onInput={(e) => setSku(e.currentTarget.value)}
                />
              </div>
            </div>

            <div class="product-form__row">
              <div class="product-form__field product-form__field--grow">
                <span class="product-form__label">Category *</span>
                <Select
                  value={category()}
                  onChange={(v) => v && setCategory(v)}
                  options={CATEGORY_OPTIONS}
                  align="left"
                  minWidth={0}
                  menuMinWidth={280}
                  class="product-form__select"
                />
              </div>
              <div class="product-form__field product-form__field--grow">
                <span class="product-form__label">Genre</span>
                <Select
                  value={genre()}
                  onChange={(v) => setGenre((v ?? "") as GenreSlug | "")}
                  options={GENRE_OPTIONS}
                  align="left"
                  minWidth={0}
                  menuMinWidth={280}
                  class="product-form__select"
                />
              </div>
              <div class="product-form__field product-form__field--grow">
                <span class="product-form__label">Badge</span>
                <Select
                  value={badge()}
                  onChange={(v) => setBadge((v ?? "") as Badge | "")}
                  options={BADGE_OPTIONS}
                  align="left"
                  minWidth={0}
                  menuMinWidth={260}
                  class="product-form__select"
                />
              </div>
            </div>

            <label class="product-form__field">
              <span class="product-form__label">Description</span>
              <textarea
                class="product-form__input product-form__textarea"
                rows="4"
                placeholder="Tell shoppers why this drop matters…"
                value={description()}
                onInput={(e) => setDescription(e.currentTarget.value)}
              />
            </label>
          </section>

          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>Pricing</h2>
              <p>Set a single price or a range — we'll show both in the catalog.</p>
            </header>
            <div class="product-form__row">
              <label class="product-form__field product-form__field--grow">
                <span class="product-form__label">From (₹) *</span>
                <input
                  class="product-form__input"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="240"
                  value={priceMin()}
                  onInput={(e) => setPriceMin(Number(e.currentTarget.value) || 0)}
                  required
                />
              </label>
              <label class="product-form__field product-form__field--grow">
                <span class="product-form__label">To (₹)</span>
                <input
                  class="product-form__input"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="280"
                  value={priceMax()}
                  onInput={(e) => setPriceMax(Number(e.currentTarget.value) || 0)}
                />
              </label>
            </div>
          </section>

          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>Variants</h2>
              <p>Pick which sizes and colorways will ship with this drop.</p>
            </header>

            <div class="product-form__field">
              <span class="product-form__label">Sizes</span>
              <div class="chip-input">
                <For each={sizes()}>
                  {(s) => (
                    <span class="chip">
                      <strong>{s}</strong>
                      <button
                        type="button"
                        class="chip__close"
                        aria-label={`Remove size ${s}`}
                        onClick={() => removeSize(s)}
                        innerHTML={closeIcon}
                      />
                    </span>
                  )}
                </For>
                <input
                  class="chip-input__input"
                  type="text"
                  placeholder="Type a size + Enter"
                  value={newSize()}
                  onInput={(e) => setNewSize(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSize(newSize());
                    }
                  }}
                />
              </div>
              <div class="chip-input__presets">
                <span class="chip-input__hint">Quick add:</span>
                <For each={PRESET_SIZES}>
                  {(s) => (
                    <button
                      type="button"
                      class="chip-preset"
                      classList={{ "is-active": sizes().includes(s) }}
                      onClick={() => (sizes().includes(s) ? removeSize(s) : addSize(s))}
                    >
                      {s}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class="product-form__field">
              <span class="product-form__label">Colorways</span>
              <div class="chip-input">
                <For each={colors()}>
                  {(c) => (
                    <span class="chip chip--color">
                      <span class="chip__swatch" style={{ background: c }} />
                      <strong>{c}</strong>
                      <button
                        type="button"
                        class="chip__close"
                        aria-label={`Remove colorway ${c}`}
                        onClick={() => removeColor(c)}
                        innerHTML={closeIcon}
                      />
                    </span>
                  )}
                </For>
                <div class="color-add">
                  <input
                    type="color"
                    class="color-add__picker"
                    value={newColor()}
                    onInput={(e) => setNewColor(e.currentTarget.value.toUpperCase())}
                    aria-label="Pick a color"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={plusIcon}
                    onClick={() => addColor(newColor())}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div class="chip-input__presets">
                <span class="chip-input__hint">Vibe Mode palette:</span>
                <For each={PRESET_COLORS}>
                  {(c) => (
                    <button
                      type="button"
                      class="color-preset"
                      classList={{ "is-active": colors().includes(c) }}
                      style={{ "--c": c }}
                      aria-label={`Toggle ${c}`}
                      title={c}
                      onClick={() => (colors().includes(c) ? removeColor(c) : addColor(c))}
                    />
                  )}
                </For>
              </div>
            </div>
          </section>

          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>Media</h2>
              <p>Upload up to 6 photos. Drag to reorder. The first image is the hero.</p>
            </header>
            <button
              type="button"
              class="media-drop"
              onClick={() => toast.info("Media uploader isn't wired up in this demo.", "Coming soon")}
            >
              <span class="media-drop__icon" innerHTML={uploadIcon} />
              <strong>Click to upload or drag &amp; drop</strong>
              <em>PNG, JPG, or WebP · up to 8 MB each</em>
            </button>
          </section>
        </div>

        {/* ---------------------------- Sidebar ---------------------------- */}
        <aside class="product-form__side">
          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>Status</h2>
              <p>Where this product sits right now.</p>
            </header>
            <div class="product-form__field">
              <span class="product-form__label">Visibility</span>
              <Select
                value={status()}
                onChange={(v) => v && setStatus(v as ProductStatus)}
                options={STATUS_OPTIONS}
                align="left"
                minWidth={0}
                menuMinWidth={240}
                class="product-form__select"
              />
            </div>
          </section>

          <section class="panel product-form__section">
            <header class="product-form__section-head">
              <h2>Inventory</h2>
              <p>Track stock levels and alerts.</p>
            </header>
            <label class="product-form__field">
              <span class="product-form__label">Stock on hand</span>
              <input
                class="product-form__input"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={stock()}
                onInput={(e) => setStock(Number(e.currentTarget.value) || 0)}
              />
            </label>
            <label class="product-form__field">
              <span class="product-form__label">Low stock alert at</span>
              <input
                class="product-form__input"
                type="number"
                min="0"
                step="1"
                placeholder="20"
                value={lowStockThreshold()}
                onInput={(e) => setLowStockThreshold(Number(e.currentTarget.value) || 0)}
              />
            </label>
            <div class="inventory-meter">
              <Show when={stock() === 0}>
                <span class="inventory-meter__dot inventory-meter__dot--zero" />
                Out of stock
              </Show>
              <Show when={stock() > 0 && stock() <= lowStockThreshold()}>
                <span class="inventory-meter__dot inventory-meter__dot--low" />
                Low stock — reorder soon
              </Show>
              <Show when={stock() > lowStockThreshold()}>
                <span class="inventory-meter__dot inventory-meter__dot--ok" />
                Healthy stock
              </Show>
            </div>
          </section>

          <section class="panel product-form__section product-form__preview">
            <header class="product-form__section-head">
              <h2>Preview</h2>
              <p>How this product will look on the catalog card.</p>
            </header>
            <div class="preview-card">
              <div
                class="preview-card__thumb"
                style={{ background: categories.find((c) => c.slug === category())?.accent ?? "#7c3aed" }}
              >
                {name() ? name().charAt(0).toUpperCase() : "?"}
              </div>
              <div class="preview-card__body">
                <strong>{name() || "Untitled product"}</strong>
                <em>
                  {categories.find((c) => c.slug === category())?.label ?? "Category"}
                  <Show when={genre()}> · {genres.find((g) => g.slug === genre())?.label}</Show>
                  <Show when={badge()}> · {badge()}</Show>
                </em>
                <span class="preview-card__price">
                  {priceMin() > 0 ? `₹${priceMin()}` : "₹0"}
                  <Show when={priceMax() > priceMin()}> – ₹{priceMax()}</Show>
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <footer class="product-form__footer">
        <Button variant="ghost" onClick={onCancel} type="button">
          Cancel
        </Button>
        <div class="product-form__footer-right">
          <Button variant="secondary" onClick={onSaveDraft} type="button">
            Save as draft
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={saveIcon}
          >
            {props.mode === "create" ? "Create Product" : "Save Changes"}
          </Button>
        </div>
      </footer>
    </form>
  );
}

/** Convert a Product record into form-ready data (used by Edit). */
export function productToFormData(p: Product): ProductFormData {
  return {
    name: p.name,
    category: p.category,
    genre: p.genre ?? "",
    sku: p.id.toUpperCase(),
    description: "",
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    stock: p.stock,
    lowStockThreshold: 20,
    sizes: p.sizes,
    colors: p.colors,
    status: p.status,
    badge: p.badge ?? "",
  };
}

export function findProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
