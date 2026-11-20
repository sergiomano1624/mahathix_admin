import { For, createMemo, createSignal, type JSX } from "solid-js";
import { revenueTrend } from "@/projects/Vibemode/dashboard/data";

const arrowIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;

const W = 760;
const H = 220;
const PAD_L = 42;
const PAD_R = 14;
const PAD_T = 18;
const PAD_B = 32;

type Mode = "revenue" | "orders";

export function RevenueTrend(): JSX.Element {
  const [mode, setMode] = createSignal<Mode>("revenue");

  const series = createMemo(() => (mode() === "revenue" ? revenueTrend.revenue : revenueTrend.orders));
  const label = () => (mode() === "revenue" ? "Revenue" : "Orders");
  const prefix = () => (mode() === "revenue" ? "₹" : "");
  const suffix = () => (mode() === "revenue" ? "K" : "");

  const path = createMemo(() => {
    const data = series();
    const max = Math.max(...data) * 1.1;
    const min = 0;
    const range = max - min || 1;
    const innerW = W - PAD_L - PAD_R;
    const innerH = H - PAD_T - PAD_B;
    const stepX = innerW / (data.length - 1);
    const pts = data.map((v, i) => {
      const x = PAD_L + i * stepX;
      const y = PAD_T + innerH - ((v - min) / range) * innerH;
      return [x, y] as [number, number];
    });

    // Smooth with Catmull-Rom → cubic Bezier
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

    const ticks = [0, 0.5, 1].map((t) => {
      const v = max * t;
      const y = PAD_T + innerH - t * innerH;
      return { v: Math.round(v), y };
    });

    return { line, area, pts, ticks, max, innerH };
  });

  const stepLabels = () => {
    const d = revenueTrend.dates;
    // show every 2nd date for density
    return d.map((label, i) => ({ label, show: i === 0 || i === d.length - 1 || i % 2 === 1 }));
  };

  const mainStat = () => (mode() === "revenue" ? revenueTrend.totalRevenue : revenueTrend.totalOrders);
  const delta = () => (mode() === "revenue" ? revenueTrend.deltaRevenue : revenueTrend.deltaOrders);

  return (
    <section class="panel panel--trend" data-reveal>
      <header class="panel__head">
        <div class="trend__title">
          <h2>Revenue & Orders</h2>
          <span class="trend__range">{revenueTrend.range}</span>
        </div>
        <div class="trend__switcher" role="tablist">
          <button
            type="button"
            class="trend__tab"
            classList={{ "is-active": mode() === "revenue" }}
            onClick={() => setMode("revenue")}
            role="tab"
            aria-selected={mode() === "revenue" ? "true" : "false"}
          >
            Revenue
          </button>
          <button
            type="button"
            class="trend__tab"
            classList={{ "is-active": mode() === "orders" }}
            onClick={() => setMode("orders")}
            role="tab"
            aria-selected={mode() === "orders" ? "true" : "false"}
          >
            Orders
          </button>
        </div>
      </header>

      <div class="trend__summary">
        <div class="trend__summary-metric">
          <em>{label()}</em>
          <strong>{mainStat()}</strong>
          <span class="trend__summary-delta">
            <span innerHTML={arrowIcon} /> {delta()} vs prev period
          </span>
        </div>
        <div class="trend__summary-legend">
          <span class="trend__legend-dot" style={{ background: "#7c3aed" }} />
          <span>{label()}</span>
        </div>
      </div>

      <div class="trend__chart-wrap">
        <svg
          class="trend__chart"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trend-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#7c3aed" stop-opacity="0.35" />
              <stop offset="1" stop-color="#7c3aed" stop-opacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid + y-axis labels */}
          <For each={path().ticks}>
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
                  class="trend__axis"
                >
                  {prefix()}{tick.v}{suffix()}
                </text>
              </>
            )}
          </For>

          <path d={path().area} fill="url(#trend-area)" />
          <path d={path().line} fill="none" stroke="#7c3aed" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />

          <For each={path().pts}>
            {(p, i) => (
              <circle
                cx={p[0]}
                cy={p[1]}
                r={i() === path().pts.length - 1 ? 4 : 2.5}
                fill={i() === path().pts.length - 1 ? "#5b21b6" : "#7c3aed"}
                stroke="#ffffff"
                stroke-width="1.5"
              />
            )}
          </For>

          <For each={stepLabels()}>
            {(d, i) => d.show ? (
              <text
                x={PAD_L + ((W - PAD_L - PAD_R) / (revenueTrend.dates.length - 1)) * i()}
                y={H - PAD_B + 20}
                text-anchor="middle"
                class="trend__axis"
              >
                {d.label}
              </text>
            ) : null}
          </For>
        </svg>
      </div>
    </section>
  );
}
