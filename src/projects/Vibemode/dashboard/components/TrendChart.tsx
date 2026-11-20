import { For, createSignal, type JSX } from "solid-js";
import { calendarIcon, chevronDownIcon } from "@/projects/Vibemode/dashboard/icons";
import { trend } from "@/projects/Vibemode/dashboard/data";

const W = 700;
const H = 232;
const PAD = { top: 14, right: 44, bottom: 26, left: 46 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const maxRevenue = 100;
const maxOrders = 200;

const xAt = (i: number, count: number) => PAD.left + (plotW / count) * i + plotW / count / 2;

export function TrendChart(): JSX.Element {
  const count = trend.revenue.length;
  const barW = Math.min(26, (plotW / count) * 0.52);

  const points: Array<[number, number]> = trend.orders.map((v, i) => [
    xAt(i, count),
    PAD.top + plotH - (v / maxOrders) * plotH,
  ]);
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  const [tipState, setTipState] = createSignal<{ left: number; top: number; date: string; revenue: string; orders: string } | null>(null);
  let chartRef: HTMLDivElement | undefined;

  const onEnter = (i: number) => (e: PointerEvent) => {
    const chart = chartRef;
    if (!chart) return;
    const hit = e.currentTarget as SVGRectElement;
    const box = chart.getBoundingClientRect();
    const point = hit.getBoundingClientRect();
    setTipState({
      left: point.left - box.left + point.width / 2,
      top: Math.max(8, point.top - box.top + 12),
      date: `${trend.labels[i]}, 2025`,
      revenue: `₹${((trend.revenue[i] ?? 0) * 1000).toLocaleString("en-IN")}`,
      orders: String(trend.orders[i] ?? 0),
    });
  };
  const onLeave = () => setTipState(null);

  return (
    <section class="panel panel--trend" data-reveal>
      <header class="panel__head">
        <div>
          <h2>Sales & Orders Trend</h2>
          <p>Track your business performance over time.</p>
        </div>
        <div class="panel__head-tools">
          <button class="range" type="button">
            <span innerHTML={calendarIcon} />
            <span>Last 30 days</span>
            <span innerHTML={chevronDownIcon} />
          </button>
        </div>
      </header>
      <div class="panel__legend">
        <span><i class="dot is-revenue" />Revenue (₹)</span>
        <span><i class="dot is-orders" />Orders</span>
      </div>

      <div class="chart" ref={chartRef} data-chart onPointerLeave={onLeave}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" class="chart__svg" role="img" aria-label="Revenue and orders over the last 30 days">
          {/* Grid lines */}
          <For each={[0, 0.25, 0.5, 0.75, 1]}>
            {(step) => (
              <line class="chart__grid" x1={PAD.left} y1={PAD.top + plotH - plotH * step} x2={W - PAD.right} y2={PAD.top + plotH - plotH * step} />
            )}
          </For>
          {/* Y-axis labels */}
          <For each={["₹100K", "₹75K", "₹50K", "₹25K", "0"]}>
            {(label, i) => (
              <text class="chart__label" x={PAD.left - 8} y={PAD.top + (plotH / 4) * i() + 4} text-anchor="end">{label}</text>
            )}
          </For>
          <For each={["200", "150", "100", "50", "0"]}>
            {(label, i) => (
              <text class="chart__label" x={W - PAD.right + 8} y={PAD.top + (plotH / 4) * i() + 4}>{label}</text>
            )}
          </For>
          {/* X-axis labels */}
          <For each={trend.labels}>
            {(label, i) => (
              <text class="chart__label" x={xAt(i(), count).toFixed(1)} y={H - 6} text-anchor="middle">{label}</text>
            )}
          </For>
          {/* Bars */}
          <g class="chart__bars">
            <For each={trend.revenue}>
              {(value, i) => {
                const h = (value / maxRevenue) * plotH;
                return (
                  <rect
                    class="chart__bar"
                    style={{ "--i": i() } as JSX.CSSProperties}
                    x={(xAt(i(), count) - barW / 2).toFixed(1)}
                    y={(PAD.top + plotH - h).toFixed(1)}
                    width={barW.toFixed(1)}
                    height={h.toFixed(1)}
                    rx="4"
                  />
                );
              }}
            </For>
          </g>
          {/* Line */}
          <path class="chart__line" d={linePath} fill="none" />
          {/* Dots */}
          <g class="chart__dots">
            <For each={points}>
              {([x, y], i) => (
                <circle class="chart__dot" style={{ "--i": i() } as JSX.CSSProperties} cx={x.toFixed(1)} cy={y.toFixed(1)} r="4" />
              )}
            </For>
          </g>
          {/* Hotspots */}
          <g class="chart__hits">
            <For each={trend.labels}>
              {(_label, i) => {
                const slot = plotW / count;
                return (
                  <rect
                    class="chart__hit"
                    data-point={i()}
                    x={(PAD.left + slot * i()).toFixed(1)}
                    y={PAD.top}
                    width={slot.toFixed(1)}
                    height={plotH}
                    onPointerEnter={onEnter(i())}
                  />
                );
              }}
            </For>
          </g>
        </svg>
        <div
          class="chart__tip"
          data-chart-tip
          hidden={!tipState()}
          style={tipState() ? { left: `${tipState()!.left}px`, top: `${tipState()!.top}px` } : {}}
        >
          <strong>{tipState()?.date ?? ""}</strong>
          <span><i class="chart__swatch is-revenue" />Revenue<b>{tipState()?.revenue ?? ""}</b></span>
          <span><i class="chart__swatch is-orders" />Orders<b>{tipState()?.orders ?? ""}</b></span>
        </div>
      </div>
    </section>
  );
}
