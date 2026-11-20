import { For, Show, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Drawer, Select, type SelectOption } from "@/shared/components";
import {
  categoryMix,
  customerSegments,
  kpis,
  regions,
  salesByChannel,
  topProducts,
  type KPI,
} from "../data";
import { MetricDetails } from "../components/MetricDetails";
import "../Analytics.css";
import "../MetricDetails.css";

const calendarIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="4.8" width="17.2" height="15.4" rx="2.4"/><path d="M3.4 9.2h17.2"/><path d="M8.6 3v3.4"/><path d="M15.4 3v3.4"/></svg>`;
const downloadIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>`;
const arrowUpIcon = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>`;
const arrowDownIcon = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>`;
const chevronIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;
const trophyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6 3h12v2a4 4 0 0 1-4 4h-.6a3 3 0 0 1-2.8-2H10a4 4 0 0 1-4-4Zm6 10a5 5 0 0 0 5-5h2a3 3 0 0 1-3 3 5 5 0 0 1-3.6 4.6V18h2a1 1 0 0 1 1 1v2H8v-2a1 1 0 0 1 1-1h2v-2.4A5 5 0 0 1 7.4 11a3 3 0 0 1-3-3h2a5 5 0 0 0 5 5Z"/></svg>`;
const chartIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m6 15 4-4 3 3 5-6"/></svg>`;
const donutIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M12 3.6a8.4 8.4 0 0 1 7.1 12.9"/></svg>`;
const globeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`;
const usersIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.5"/><path d="M2.4 20c0-3.6 2.9-6 6.6-6s6.6 2.4 6.6 6"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.4 20c0-2.6 1.9-4.6 4.4-4.6"/></svg>`;

const RANGE_OPTIONS: SelectOption[] = [
  { value: "7d",  label: "Last 7 days",   sub: "Nov 14 – Nov 20, 2026", icon: calendarIcon },
  { value: "14d", label: "Last 14 days",  sub: "Nov 7 – Nov 20, 2026",  icon: calendarIcon },
  { value: "30d", label: "Last 30 days",  sub: "Oct 22 – Nov 20, 2026", icon: calendarIcon },
  { value: "mtd", label: "Month to date", sub: "Nov 1 – Nov 20, 2026",  icon: calendarIcon },
  { value: "qtd", label: "Quarter to date", sub: "Oct 1 – Nov 20, 2026", icon: calendarIcon },
];

const COMPARE_OPTIONS: SelectOption[] = [
  { value: "prev",     label: "vs previous period", sub: "Same # of days before" },
  { value: "year",     label: "vs same period last year", sub: "Nov 2025" },
  { value: "none",     label: "No comparison" },
];

/** Smooth cubic-bezier area/line path. Shared chart helper. */
function smoothPath(values: number[], W: number, H: number, padL = 42, padR = 14, padT = 20, padB = 32) {
  const max = Math.max(...values) * 1.1;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const stepX = innerW / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = padL + i * stepX;
    const y = padT + innerH - (v / (max || 1)) * innerH;
    return [x, y] as [number, number];
  });
  const line = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p[0].toFixed(1)},${p[1].toFixed(1)}`;
    const p0 = pts[i - 1]!;
    const p1 = p;
    const p2 = pts[i + 1] ?? p1;
    const prev = pts[i - 2] ?? p0;
    const c1x = p0[0] + (p1[0] - prev[0]) / 6;
    const c1y = p0[1] + (p1[1] - prev[1]) / 6;
    const c2x = p1[0] - (p2[0] - p0[0]) / 6;
    const c2y = p1[1] - (p2[1] - p0[1]) / 6;
    return `${acc} C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`;
  }, "");
  const area = `${line} L${(padL + innerW).toFixed(1)},${(padT + innerH).toFixed(1)} L${padL},${(padT + innerH).toFixed(1)} Z`;
  const ticks = [0, 0.5, 1].map((t) => ({ y: padT + innerH - t * innerH, v: Math.round(max * t) }));
  return { line, area, pts, ticks, max, padL, padR, padT, padB };
}

function sparkPath(values: number[], width = 140, height = 36): { line: string; area: string } {
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

const DONUT_R = 54;
const DONUT_C = 2 * Math.PI * DONUT_R;

function donutSegments<T extends { value: number; color: string }>(items: T[]) {
  const total = items.reduce((s, it) => s + it.value, 0);
  let offset = 0;
  return items.map((it) => {
    const share = it.value / total;
    const length = share * DONUT_C;
    const seg = {
      ...it,
      share,
      strokeDasharray: `${length} ${DONUT_C - length}`,
      strokeDashoffset: -offset,
    };
    offset += length;
    return seg;
  });
}

type TrendMode = "revenue" | "orders";

export default function Analytics(): JSX.Element {
  const [range, setRange] = createSignal<string>("30d");
  const [compare, setCompare] = createSignal<string>("prev");
  const [trendMode, setTrendMode] = createSignal<TrendMode>("revenue");
  const [activeKpi, setActiveKpi] = createSignal<KPI | null>(null);
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 20);
  });

  const categoryTotal = createMemo(() => categoryMix.reduce((s, c) => s + c.value, 0));
  const categoryDonut = createMemo(() => donutSegments(categoryMix));
  const segmentTotal = createMemo(() => customerSegments.reduce((s, c) => s + c.value, 0));
  const segmentDonut = createMemo(() => donutSegments(customerSegments));

  /** Hero trend chart series — reuses the drawer's 30-day arrays. */
  const heroKpi = createMemo(() => kpis.find((k) => k.id === trendMode())!);
  const heroSeries = createMemo(() => heroKpi().series);
  const heroPrev = createMemo(() => heroKpi().prev);
  const heroPath = createMemo(() => smoothPath(heroSeries(), 820, 240));
  const heroPrevPath = createMemo(() => smoothPath(heroPrev(), 820, 240));
  const heroYLabel = (v: number) =>
    trendMode() === "revenue" ? `₹${v}K` : `${v}`;

  const onOpenKpi = (k: KPI) => setActiveKpi(k);
  const onCloseDrawer = () => setActiveKpi(null);

  return (
    <div class="analytics" ref={rootRef}>
      <header class="analytics__header" data-reveal>
        <div>
          <h1>Analytics</h1>
          <p>Measure every drop, channel and customer cohort — then double down on what's working.</p>
        </div>
        <div class="analytics__header-actions">
          <Select
            value={range()}
            onChange={(v) => v && setRange(v)}
            options={RANGE_OPTIONS}
            align="right"
            minWidth={190}
            menuMinWidth={240}
          />
          <Select
            value={compare()}
            onChange={(v) => v && setCompare(v)}
            options={COMPARE_OPTIONS}
            prefix="Compare:"
            align="right"
            minWidth={210}
            menuMinWidth={240}
          />
          <Button
            variant="primary"
            icon={downloadIcon}
            onClick={() => toast.success("Analytics report queued.", "Export")}
          >
            Export
          </Button>
        </div>
      </header>

      <section class="analytics__kpis" aria-label="Headline metrics">
        <For each={kpis}>
          {(k) => {
            const spark = sparkPath(k.series);
            return (
              <article
                class={`kpi-card kpi-card--${k.tone}`}
                data-reveal
                onClick={() => onOpenKpi(k)}
                tabindex="0"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenKpi(k);
                  }
                }}
              >
                <div class="kpi-card__head">
                  <span class="kpi-card__icon" innerHTML={k.icon} />
                  <span class={`kpi-card__delta kpi-card__delta--${k.trend}`}>
                    <span innerHTML={k.trend === "up" ? arrowUpIcon : arrowDownIcon} />
                    {k.delta}
                  </span>
                </div>
                <div class="kpi-card__body">
                  <strong class="kpi-card__value">{k.value}</strong>
                  <span class="kpi-card__label">{k.label}</span>
                  <span class="kpi-card__sub">{k.sub}</span>
                </div>
                <svg class="kpi-card__spark" viewBox="0 0 140 36" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`kpi-grad-${k.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stop-color="currentColor" stop-opacity="0.35" />
                      <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={spark.area} fill={`url(#kpi-grad-${k.id})`} />
                  <path d={spark.line} fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="kpi-card__chevron" innerHTML={chevronIcon} />
              </article>
            );
          }}
        </For>
      </section>

      {/* ----------------------- Hero trend chart ----------------------- */}
      <section class="panel analytics-hero" data-reveal>
        <header class="analytics-hero__head">
          <div class="analytics-hero__title">
            <span class="analytics-hero__eyebrow">
              <span innerHTML={chartIcon} /> Trend · Last 30 days
            </span>
            <h2>{heroKpi().label}</h2>
            <div class="analytics-hero__chips">
              <strong class="analytics-hero__value">{heroKpi().value}</strong>
              <span class={`analytics-hero__delta analytics-hero__delta--${heroKpi().trend}`}>
                <span innerHTML={heroKpi().trend === "up" ? arrowUpIcon : arrowDownIcon} />
                {heroKpi().delta}
              </span>
              <span class="analytics-hero__sub">{heroKpi().sub}</span>
            </div>
          </div>
          <div class="analytics-hero__tabs" role="tablist">
            <button
              type="button"
              class="analytics-hero__tab"
              classList={{ "is-active": trendMode() === "revenue" }}
              role="tab"
              aria-selected={trendMode() === "revenue" ? "true" : "false"}
              onClick={() => setTrendMode("revenue")}
            >
              Revenue
            </button>
            <button
              type="button"
              class="analytics-hero__tab"
              classList={{ "is-active": trendMode() === "orders" }}
              role="tab"
              aria-selected={trendMode() === "orders" ? "true" : "false"}
              onClick={() => setTrendMode("orders")}
            >
              Orders
            </button>
          </div>
        </header>
        <div class="analytics-hero__chart-wrap">
          <svg
            class="analytics-hero__chart"
            viewBox="0 0 820 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hero-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#7c3aed" stop-opacity="0.35" />
                <stop offset="1" stop-color="#7c3aed" stop-opacity="0" />
              </linearGradient>
            </defs>
            <For each={heroPath().ticks}>
              {(tick) => (
                <>
                  <line
                    x1={heroPath().padL}
                    x2={820 - heroPath().padR}
                    y1={tick.y}
                    y2={tick.y}
                    stroke="rgba(76, 29, 149, 0.08)"
                    stroke-dasharray="3 5"
                  />
                  <text x={heroPath().padL - 8} y={tick.y + 3} text-anchor="end" class="analytics-hero__axis">
                    {heroYLabel(tick.v)}
                  </text>
                </>
              )}
            </For>
            <path d={heroPrevPath().line} fill="none" stroke="#c4b5fd" stroke-width="1.8" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round" />
            <path d={heroPath().area} fill="url(#hero-grad)" />
            <path d={heroPath().line} fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            <circle
              cx={heroPath().pts[heroPath().pts.length - 1]![0]}
              cy={heroPath().pts[heroPath().pts.length - 1]![1]}
              r={5}
              fill="#5b21b6"
              stroke="#ffffff"
              stroke-width="2"
            />
            <For each={["Day 1", "Day 8", "Day 15", "Day 22", "Day 30"]}>
              {(label, i) => (
                <text
                  x={heroPath().padL + ((820 - heroPath().padL - heroPath().padR) / 4) * i()}
                  y={240 - heroPath().padB + 20}
                  text-anchor="middle"
                  class="analytics-hero__axis"
                >
                  {label}
                </text>
              )}
            </For>
          </svg>
          <div class="analytics-hero__legend">
            <span class="analytics-hero__legend-item">
              <span class="analytics-hero__legend-swatch" />
              This period
            </span>
            <span class="analytics-hero__legend-item">
              <span class="analytics-hero__legend-swatch analytics-hero__legend-swatch--dash" />
              Previous period
            </span>
          </div>
        </div>
      </section>

      {/* ----------------------- Row 2: Channels + Category ----------------------- */}
      <div class="analytics__row">
        <section class="panel analytics-panel" data-reveal>
          <header class="analytics-panel__head">
            <div>
              <span class="analytics-panel__eyebrow">
                <span innerHTML={chartIcon} /> Channels
              </span>
              <h2>Sales by channel</h2>
            </div>
            <span class="analytics-panel__meta">₹6.24L total</span>
          </header>
          <ul class="bar-list">
            <For each={salesByChannel}>
              {(ch) => (
                <li class="bar-list__row">
                  <div class="bar-list__meta">
                    <span class="bar-list__dot" style={{ background: ch.color }} />
                    <strong class="bar-list__label">{ch.label}</strong>
                    <em class="bar-list__sub">{ch.sub}</em>
                    <span class="bar-list__pct">{ch.value.toFixed(1)}%</span>
                  </div>
                  <span class="bar-list__track">
                    <span class="bar-list__fill" style={{ width: `${ch.value}%`, background: ch.color }} />
                  </span>
                </li>
              )}
            </For>
          </ul>
        </section>

        <section class="panel analytics-panel" data-reveal>
          <header class="analytics-panel__head">
            <div>
              <span class="analytics-panel__eyebrow">
                <span innerHTML={donutIcon} /> Mix
              </span>
              <h2>Category mix</h2>
            </div>
            <span class="analytics-panel__meta">Units · 30d</span>
          </header>
          <div class="donut">
            <div class="donut__chart-wrap">
              <svg viewBox="0 0 140 140" class="donut__chart" aria-hidden="true">
                <circle cx="70" cy="70" r={DONUT_R} fill="none" stroke="#efeaf9" stroke-width="18" />
                <g transform="rotate(-90 70 70)">
                  <For each={categoryDonut()}>
                    {(seg) => (
                      <circle
                        cx="70"
                        cy="70"
                        r={DONUT_R}
                        fill="none"
                        stroke={seg.color}
                        stroke-width="18"
                        stroke-dasharray={seg.strokeDasharray}
                        stroke-dashoffset={seg.strokeDashoffset}
                      />
                    )}
                  </For>
                </g>
                <text x="70" y="68" text-anchor="middle" class="donut__center-value">
                  {categoryTotal()}
                </text>
                <text x="70" y="86" text-anchor="middle" class="donut__center-label">
                  Units
                </text>
              </svg>
            </div>
            <ul class="donut__legend">
              <For each={categoryDonut()}>
                {(seg) => (
                  <li class="donut__legend-row">
                    <span class="donut__dot" style={{ background: seg.color }} />
                    <span class="donut__legend-label">{seg.label}</span>
                    <strong class="donut__legend-value">{seg.value}</strong>
                    <em class="donut__legend-pct">{(seg.share * 100).toFixed(1)}%</em>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </section>
      </div>

      {/* ----------------------- Row 3: Top products full width ----------------------- */}
      <section class="panel analytics-panel" data-reveal>
        <header class="analytics-panel__head">
          <div>
            <span class="analytics-panel__eyebrow">
              <span innerHTML={trophyIcon} /> Leaderboard
            </span>
            <h2>Top product performers</h2>
          </div>
          <a class="analytics-panel__link" href="/catalog">
            View catalog →
          </a>
        </header>
        <ul class="leader-list">
          <For each={topProducts}>
            {(p) => (
              <li class="leader-row">
                <span class="leader-row__rank">#{p.rank}</span>
                <span class="leader-row__avatar" style={{ background: p.accent }}>
                  {p.initials}
                </span>
                <div class="leader-row__meta">
                  <strong>{p.name}</strong>
                  <em>{p.category}</em>
                </div>
                <div class="leader-row__orders">
                  <strong>{p.orders}</strong>
                  <em>orders</em>
                </div>
                <div class="leader-row__revenue">
                  <strong>{p.revenue}</strong>
                  <em>revenue</em>
                </div>
                <span class="leader-row__delta">{p.delta}</span>
              </li>
            )}
          </For>
        </ul>
      </section>

      {/* ----------------------- Row 4: Regions + Segments ----------------------- */}
      <div class="analytics__row">
        <section class="panel analytics-panel" data-reveal>
          <header class="analytics-panel__head">
            <div>
              <span class="analytics-panel__eyebrow">
                <span innerHTML={globeIcon} /> Geography
              </span>
              <h2>Top regions</h2>
            </div>
            <span class="analytics-panel__meta">By orders · 30d</span>
          </header>
          <ul class="region-list">
            <For each={regions}>
              {(r) => (
                <li class="region-row">
                  <strong class="region-row__city">{r.city}</strong>
                  <span class="region-row__bar">
                    <span class="region-row__fill" style={{ width: `${r.pct}%` }} />
                  </span>
                  <span class="region-row__orders">{r.orders}</span>
                  <em class="region-row__revenue">{r.revenue}</em>
                </li>
              )}
            </For>
          </ul>
        </section>

        <section class="panel analytics-panel" data-reveal>
          <header class="analytics-panel__head">
            <div>
              <span class="analytics-panel__eyebrow">
                <span innerHTML={usersIcon} /> Audience
              </span>
              <h2>Customer segments</h2>
            </div>
            <span class="analytics-panel__meta">Active · 30d</span>
          </header>
          <div class="donut">
            <div class="donut__chart-wrap">
              <svg viewBox="0 0 140 140" class="donut__chart" aria-hidden="true">
                <circle cx="70" cy="70" r={DONUT_R} fill="none" stroke="#efeaf9" stroke-width="18" />
                <g transform="rotate(-90 70 70)">
                  <For each={segmentDonut()}>
                    {(seg) => (
                      <circle
                        cx="70"
                        cy="70"
                        r={DONUT_R}
                        fill="none"
                        stroke={seg.color}
                        stroke-width="18"
                        stroke-dasharray={seg.strokeDasharray}
                        stroke-dashoffset={seg.strokeDashoffset}
                      />
                    )}
                  </For>
                </g>
                <text x="70" y="68" text-anchor="middle" class="donut__center-value">
                  {segmentTotal().toLocaleString("en-IN")}
                </text>
                <text x="70" y="86" text-anchor="middle" class="donut__center-label">
                  Customers
                </text>
              </svg>
            </div>
            <ul class="donut__legend">
              <For each={segmentDonut()}>
                {(seg) => (
                  <li class="donut__legend-row">
                    <span class="donut__dot" style={{ background: seg.color }} />
                    <span class="donut__legend-label">{seg.label}</span>
                    <strong class="donut__legend-value">{seg.value}</strong>
                    <em class="donut__legend-pct">{(seg.share * 100).toFixed(1)}%</em>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </section>
      </div>

      <Drawer
        open={activeKpi() !== null}
        onClose={onCloseDrawer}
        width="75vw"
        id="metric-details-drawer"
      >
        <Show when={activeKpi()}>
          <MetricDetails kpi={activeKpi()!} onClose={onCloseDrawer} />
        </Show>
      </Drawer>
    </div>
  );
}
