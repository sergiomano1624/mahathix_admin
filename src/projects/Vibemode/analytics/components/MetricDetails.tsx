import { For, Show, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import type { KPI } from "../data";

const downloadIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-6"/><path d="M5 20h14"/></svg>`;
const arrowUpIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>`;
const arrowDownIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>`;
const infoIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8.2" r="1" fill="currentColor"/></svg>`;

const W = 760;
const H = 240;
const PAD_L = 42;
const PAD_R = 14;
const PAD_T = 20;
const PAD_B = 32;

/** Smooth cubic-bezier area/line path. */
function smoothPath(values: number[]): { line: string; area: string; pts: [number, number][] } {
  const max = Math.max(...values) * 1.1;
  const min = 0;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const stepX = innerW / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = PAD_L + i * stepX;
    const y = PAD_T + innerH - ((v - min) / (max - min || 1)) * innerH;
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
  const area = `${line} L${(PAD_L + innerW).toFixed(1)},${(PAD_T + innerH).toFixed(1)} L${PAD_L},${(PAD_T + innerH).toFixed(1)} Z`;
  return { line, area, pts };
}

function formatValue(id: string, value: number): string {
  switch (id) {
    case "revenue": return `₹${Math.round(value)}K`;
    case "orders":  return `${Math.round(value)}`;
    case "conversion": return `${value.toFixed(1)}%`;
    case "aov":     return `₹${Math.round(value).toLocaleString("en-IN")}`;
    default: return String(Math.round(value));
  }
}

export interface MetricDetailsProps {
  kpi: KPI;
  onClose: () => void;
}

export function MetricDetails(props: MetricDetailsProps): JSX.Element {
  const k = props.kpi;
  const current = smoothPath(k.series);
  const prev = smoothPath(k.prev);
  const max = Math.max(...k.series) * 1.1;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: PAD_T + (H - PAD_T - PAD_B) * (1 - t),
    value: formatValue(k.id, max * t),
  }));

  const xLabels = ["Day 1", "Day 8", "Day 15", "Day 22", "Day 30"].map((label, i) => ({
    label,
    x: PAD_L + ((W - PAD_L - PAD_R) / 4) * i,
  }));

  return (
    <div class="metric-drawer">
      <header class="metric-drawer__head">
        <div class="metric-drawer__title">
          <span class={`metric-drawer__icon metric-drawer__icon--${k.tone}`} innerHTML={k.icon} />
          <div>
            <span class="metric-drawer__eyebrow">Metric · Last 30 days</span>
            <h2>{k.label}</h2>
            <div class="metric-drawer__chips">
              <strong class="metric-drawer__value">{k.value}</strong>
              <span class={`metric-drawer__delta metric-drawer__delta--${k.trend}`}>
                <span innerHTML={k.trend === "up" ? arrowUpIcon : arrowDownIcon} />
                {k.delta}
              </span>
              <span class="metric-drawer__sub">{k.sub}</span>
            </div>
          </div>
        </div>
        <div class="metric-drawer__head-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={downloadIcon}
            onClick={() => toast.info("CSV export isn't wired up.", "Coming soon")}
          >
            Download CSV
          </Button>
        </div>
      </header>

      <div class="metric-drawer__body">
        {/* -------- Summary row -------- */}
        <section class="metric-drawer__summary">
          <div class="metric-sum">
            <span>Period total</span>
            <strong>{k.periodTotal}</strong>
          </div>
          <div class="metric-sum">
            <span>Daily average</span>
            <strong>{k.dailyAvg}</strong>
          </div>
          <div class="metric-sum">
            <span>Peak day</span>
            <strong>{k.peakDay.value}</strong>
            <em>{k.peakDay.date}</em>
          </div>
          <div class="metric-sum">
            <span>Previous 30 days</span>
            <strong>{k.prevPeriodTotal}</strong>
          </div>
        </section>

        {/* -------- Main chart -------- */}
        <section class="metric-drawer__panel">
          <header class="metric-drawer__panel-head">
            <h3>Trend</h3>
            <div class="metric-drawer__legend">
              <span class="metric-drawer__legend-item">
                <span class="metric-drawer__legend-swatch" style={{ background: "#7c3aed" }} />
                This period
              </span>
              <span class="metric-drawer__legend-item">
                <span
                  class="metric-drawer__legend-swatch metric-drawer__legend-swatch--dash"
                  style={{ "border-color": "#c4b5fd" }}
                />
                Previous period
              </span>
            </div>
          </header>
          <svg
            class="metric-drawer__chart"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`metric-grad-${k.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#7c3aed" stop-opacity="0.35" />
                <stop offset="1" stop-color="#7c3aed" stop-opacity="0" />
              </linearGradient>
            </defs>

            <For each={ticks}>
              {(tick) => (
                <>
                  <line
                    x1={PAD_L}
                    x2={W - PAD_R}
                    y1={tick.y}
                    y2={tick.y}
                    stroke="rgba(76, 29, 149, 0.08)"
                    stroke-dasharray="3 5"
                  />
                  <text
                    x={PAD_L - 8}
                    y={tick.y + 3}
                    text-anchor="end"
                    class="metric-drawer__axis"
                  >
                    {tick.value}
                  </text>
                </>
              )}
            </For>

            <path d={prev.line} fill="none" stroke="#c4b5fd" stroke-width="1.8" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round" />
            <path d={current.area} fill={`url(#metric-grad-${k.id})`} />
            <path d={current.line} fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />

            <circle
              cx={current.pts[current.pts.length - 1]![0]}
              cy={current.pts[current.pts.length - 1]![1]}
              r={5}
              fill="#5b21b6"
              stroke="#ffffff"
              stroke-width="2"
            />

            <For each={xLabels}>
              {(l) => (
                <text x={l.x} y={H - PAD_B + 20} text-anchor="middle" class="metric-drawer__axis">
                  {l.label}
                </text>
              )}
            </For>
          </svg>
        </section>

        {/* -------- Two-column breakdowns -------- */}
        <div class="metric-drawer__grid">
          <section class="metric-drawer__panel">
            <header class="metric-drawer__panel-head">
              <h3>Breakdown by category</h3>
              <span>{k.byCategory.length} categories</span>
            </header>
            <ul class="metric-bars">
              <For each={k.byCategory}>
                {(row) => (
                  <li class="metric-bar">
                    <div class="metric-bar__head">
                      <span class="metric-bar__dot" style={{ background: row.color }} />
                      <strong>{row.label}</strong>
                      <em>
                        {k.id === "revenue"
                          ? `₹${row.value.toLocaleString("en-IN")}`
                          : k.id === "orders"
                          ? row.value.toLocaleString("en-IN")
                          : k.id === "conversion"
                          ? `${row.value.toFixed(1)}%`
                          : `₹${row.value.toLocaleString("en-IN")}`}
                      </em>
                      <span class="metric-bar__pct">{row.pct.toFixed(1)}%</span>
                    </div>
                    <span class="metric-bar__track">
                      <span
                        class="metric-bar__fill"
                        style={{ width: `${Math.min(100, row.pct)}%`, background: row.color }}
                      />
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </section>

          <section class="metric-drawer__panel">
            <header class="metric-drawer__panel-head">
              <h3>Breakdown by channel</h3>
              <span>{k.byChannel.length} channels</span>
            </header>
            <ul class="metric-bars">
              <For each={k.byChannel}>
                {(row) => (
                  <li class="metric-bar">
                    <div class="metric-bar__head">
                      <span class="metric-bar__dot" style={{ background: row.color }} />
                      <strong>{row.label}</strong>
                      <Show when={row.sub}>
                        <em class="metric-bar__sub">{row.sub}</em>
                      </Show>
                      <span class="metric-bar__pct">{row.pct.toFixed(1)}%</span>
                    </div>
                    <span class="metric-bar__track">
                      <span
                        class="metric-bar__fill"
                        style={{ width: `${Math.min(100, row.pct)}%`, background: row.color }}
                      />
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </section>
        </div>

        {/* -------- Insights -------- */}
        <section class="metric-drawer__panel">
          <header class="metric-drawer__panel-head">
            <h3>Insights</h3>
            <span innerHTML={infoIcon} />
          </header>
          <ul class="metric-insights">
            <For each={k.insights}>
              {(insight) => (
                <li class={`metric-insight metric-insight--${insight.tone}`}>
                  <span class="metric-insight__dot" />
                  <div>
                    <strong>{insight.title}</strong>
                    <em>{insight.detail}</em>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
      </div>

      <footer class="metric-drawer__footer">
        <Button
          variant="ghost"
          onClick={() => toast.info("Compare flow isn't wired.", "Coming soon")}
        >
          Compare periods
        </Button>
        <div class="metric-drawer__footer-right">
          <Button variant="secondary" onClick={() => props.onClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            icon={downloadIcon}
            onClick={() => toast.success(`${k.label} report generated.`, "Report ready")}
          >
            Export full report
          </Button>
        </div>
      </footer>
    </div>
  );
}
