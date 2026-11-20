import { For, Match, Show, Switch, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { platformIcons } from "@/shared/config/menu";
import { Button, Select, type SelectOption } from "@/shared/components";
import {
  drops,
  dropsHeadline,
  dropsSummary,
  type Drop,
  type DropStatus,
} from "../data";
import "../Drops.css";

const plusIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>`;
const gridIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/></svg>`;
const listIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`;
const bagIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7.4h14l-1 13.2a1.6 1.6 0 0 1-1.6 1.4H7.6A1.6 1.6 0 0 1 6 20.6Z"/><path d="M8.4 7.4V5.6a3.6 3.6 0 0 1 7.2 0v1.8"/></svg>`;
const rupeeIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12"/><path d="M6 8h12"/><path d="M6 12h6a4 4 0 0 1 0 8H6l12 0"/></svg>`;
const clockIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const editIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="m14 3-9 9v3h3l9-9Z"/></svg>`;

type FilterKey = "all" | DropStatus;
type SortKey = "recent" | "revenue" | "progress";
type ViewMode = "grid" | "list";

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: dropsSummary.total },
  { key: "Live", label: "Live", count: dropsSummary.live },
  { key: "Scheduled", label: "Scheduled", count: dropsSummary.scheduled },
  { key: "Sold Out", label: "Sold Out", count: dropsSummary.soldOut },
  { key: "Low Stock", label: "Low Stock", count: dropsSummary.lowStock },
  { key: "Draft", label: "Draft", count: dropsSummary.draft },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "recent", label: "Recent" },
  { value: "revenue", label: "Revenue" },
  { value: "progress", label: "Progress" },
];

function statusStyle(status: DropStatus): JSX.CSSProperties {
  switch (status) {
    case "Live":      return { background: "rgba(16, 185, 129, 0.15)", color: "#047857" };
    case "Scheduled": return { background: "rgba(59, 130, 246, 0.14)", color: "#1d4ed8" };
    case "Sold Out":  return { background: "rgba(124, 58, 237, 0.14)", color: "#6d28d9" };
    case "Low Stock": return { background: "rgba(245, 158, 11, 0.16)", color: "#b45309" };
    case "Draft":     return { background: "rgba(100, 116, 139, 0.16)", color: "#334155" };
  }
}

function progressPct(d: Drop): number {
  if (d.stock === 0) return 0;
  return Math.min(100, Math.round((d.sold / d.stock) * 100));
}

export default function Drops(): JSX.Element {
  const [filter, setFilter] = createSignal<FilterKey>("all");
  const [query, setQuery] = createSignal("");
  const [sort, setSort] = createSignal<SortKey>("recent");
  const [view, setView] = createSignal<ViewMode>("grid");
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 25);
  });

  const filtered = createMemo(() => {
    let out = drops.slice();
    const f = filter();
    if (f !== "all") out = out.filter((d) => d.status === f);
    const q = query().trim().toLowerCase();
    if (q) {
      out = out.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.capsule.toLowerCase().includes(q),
      );
    }
    const s = sort();
    if (s === "revenue") {
      out.sort((a, b) => {
        const aNum = Number(a.revenue.replace(/[^\d]/g, "")) || 0;
        const bNum = Number(b.revenue.replace(/[^\d]/g, "")) || 0;
        return bNum - aNum;
      });
    } else if (s === "progress") {
      out.sort((a, b) => progressPct(b) - progressPct(a));
    }
    return out;
  });

  const isEmpty = createMemo(() => filtered().length === 0);
  const isGrid = createMemo(() => view() === "grid");

  return (
    <div class="drops" ref={rootRef}>
      <header class="drops__header" data-reveal>
        <div>
          <h1>Drops</h1>
          <p>
            {dropsSummary.total} drops across the Vibe Mode catalog · {dropsSummary.live} live right
            now
          </p>
        </div>
        <Button
          variant="primary"
          icon={plusIcon}
          onClick={() =>
            toast.info("Drop launcher isn't wired up in this demo.", "Coming soon")
          }
        >
          Launch Drop
        </Button>
      </header>

      <section class="drops__stats" aria-label="Drops headline">
        <For each={dropsHeadline}>
          {(stat) => (
            <article class={`drops-stat drops-stat--${stat.tone}`} data-reveal>
              <strong>{stat.value}</strong>
              <span class="drops-stat__label">{stat.label}</span>
              <span class="drops-stat__delta">{stat.delta}</span>
            </article>
          )}
        </For>
      </section>

      <section class="drops__toolbar panel" data-reveal>
        <div class="drops__tabs" role="tablist">
          <For each={FILTERS}>
            {(tab) => (
              <button
                type="button"
                class="drops__tab"
                classList={{ "is-active": filter() === tab.key }}
                role="tab"
                aria-selected={filter() === tab.key ? "true" : "false"}
                onClick={() => setFilter(tab.key)}
              >
                <span>{tab.label}</span>
                <span class="drops__tab-count">{tab.count}</span>
              </button>
            )}
          </For>
        </div>
        <div class="drops__tools">
          <label class="drops__search">
            <span innerHTML={searchIcon} />
            <input
              type="search"
              placeholder="Search drops, capsule or category…"
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

          <div class="drops__view" role="group" aria-label="View mode">
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
          <section class="drops__empty panel" data-reveal>
            <strong>No drops match this filter.</strong>
            <p>Adjust the status or clear the search to see more.</p>
          </section>
        </Match>

        <Match when={isGrid()}>
          <section class="drops__grid" aria-label={`${filtered().length} drops`}>
            <For each={filtered()}>
              {(d) => {
                const pct = progressPct(d);
                return (
                  <article class="drop-card" data-reveal>
                    <div class="drop-card__thumb" style={{ background: d.accent }}>
                      <span class="drop-card__thumb-mark">{d.initials}</span>
                      <span class="drop-card__capsule">{d.capsule}</span>
                      <span class="status-pill drop-card__status" style={statusStyle(d.status)}>
                        {d.status}
                      </span>
                    </div>
                    <div class="drop-card__body">
                      <header class="drop-card__head">
                        <div class="drop-card__title">
                          <strong>{d.name}</strong>
                          <em>{d.category}</em>
                        </div>
                      </header>
                      <div class="drop-card__progress-row">
                        <span>{d.sold} / {d.stock || "—"}</span>
                        <span class="drop-card__progress-pct">{pct}%</span>
                      </div>
                      <span class="drop-card__progress">
                        <span
                          class="drop-card__progress-fill"
                          style={{ width: `${pct}%`, background: d.accent }}
                        />
                      </span>
                      <div class="drop-card__stats">
                        <span class="drop-card__stat">
                          <span class="drop-card__stat-icon" innerHTML={rupeeIcon} />
                          {d.revenue}
                        </span>
                        <span class="drop-card__stat">
                          <span class="drop-card__stat-icon" innerHTML={bagIcon} />
                          ₹{d.price}
                        </span>
                        <span class="drop-card__stat drop-card__stat--muted">
                          <span class="drop-card__stat-icon" innerHTML={clockIcon} />
                          {d.timeline}
                        </span>
                      </div>
                      <footer class="drop-card__footer">
                        <div class="drop-card__channels">
                          <Show
                            when={d.channels.length > 0}
                            fallback={<span class="drop-card__no-channels">No channels yet</span>}
                          >
                            <For each={d.channels}>
                              {(ch) => (
                                <span
                                  class={`drop-card__channel drop-card__channel--${ch}`}
                                  innerHTML={platformIcons[ch] ?? ""}
                                  title={ch}
                                />
                              )}
                            </For>
                          </Show>
                        </div>
                        <div class="drop-card__actions">
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={eyeIcon}
                            onClick={() => toast.info(`Opening ${d.name}…`, "Coming soon")}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={editIcon}
                            onClick={() => toast.info(`Editing ${d.name}…`, "Coming soon")}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconOnly
                            icon={moreIcon}
                            aria-label="More"
                            title="More"
                            onClick={() => toast.info("Drop actions aren't wired up.", "Coming soon")}
                          />
                        </div>
                      </footer>
                    </div>
                  </article>
                );
              }}
            </For>
          </section>
        </Match>

        <Match when={!isGrid()}>
          <section class="drops__list panel" aria-label={`${filtered().length} drops`}>
            <header class="drops__list-head">
              <span>Drop</span>
              <span>Capsule</span>
              <span>Status</span>
              <span>Progress</span>
              <span class="drops__list-right">Revenue</span>
              <span class="drops__list-right">Channels</span>
              <span />
            </header>
            <ul>
              <For each={filtered()}>
                {(d) => {
                  const pct = progressPct(d);
                  return (
                    <li class="drops__list-row" data-reveal>
                      <div class="drops__list-name">
                        <span class="drops__list-avatar" style={{ background: d.accent }}>{d.initials}</span>
                        <div>
                          <strong>{d.name}</strong>
                          <em>{d.category} · ₹{d.price}</em>
                        </div>
                      </div>
                      <span class="drops__list-capsule">{d.capsule}</span>
                      <span class="status-pill" style={statusStyle(d.status)}>{d.status}</span>
                      <span class="drops__list-progress">
                        <span class="drops__list-progress-bar">
                          <span style={{ width: `${pct}%`, background: d.accent }} />
                        </span>
                        <em>{d.sold} / {d.stock || "—"} · {pct}%</em>
                      </span>
                      <span class="drops__list-right drops__list-revenue">{d.revenue}</span>
                      <span class="drops__list-right drops__list-channels">
                        <Show when={d.channels.length > 0} fallback={<em>—</em>}>
                          <For each={d.channels}>
                            {(ch) => (
                              <span
                                class={`drop-card__channel drop-card__channel--${ch}`}
                                innerHTML={platformIcons[ch] ?? ""}
                                title={ch}
                              />
                            )}
                          </For>
                        </Show>
                      </span>
                      <div class="drops__list-actions">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          icon={eyeIcon}
                          aria-label="View"
                          title="View"
                          onClick={() => toast.info(`Opening ${d.name}…`, "Coming soon")}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          icon={editIcon}
                          aria-label="Edit"
                          title="Edit"
                          onClick={() => toast.info(`Editing ${d.name}…`, "Coming soon")}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          icon={moreIcon}
                          aria-label="More"
                          title="More"
                          onClick={() => toast.info("Drop actions aren't wired up.", "Coming soon")}
                        />
                      </div>
                    </li>
                  );
                }}
              </For>
            </ul>
          </section>
        </Match>
      </Switch>
    </div>
  );
}
