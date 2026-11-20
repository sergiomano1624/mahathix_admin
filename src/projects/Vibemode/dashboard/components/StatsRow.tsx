import { For, type JSX } from "solid-js";
import { stats } from "@/projects/Vibemode/dashboard/data";

/** Smooth-ish SVG sparkline polyline. */
function sparkPath(values: number[], width = 120, height = 32): { line: string; area: string } {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y];
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

export function StatsRow(): JSX.Element {
  return (
    <section class="stats-row" aria-label="Headline metrics">
      <For each={stats}>
        {(stat, i) => {
          const { line, area } = sparkPath(stat.spark);
          const upColor = "var(--stat-ink)";
          return (
            <article
              class={`stat stat--${stat.tone}`}
              style={{ "--i": i() } as JSX.CSSProperties}
              data-reveal
            >
              <div class="stat__head">
                <span class="stat__icon" innerHTML={stat.icon} />
                <span class={`stat__delta stat__delta--${stat.trend}`}>
                  <span class="stat__delta-arrow">{stat.trend === "up" ? "↑" : "↓"}</span>
                  {stat.delta}
                </span>
              </div>
              <div class="stat__body">
                <strong class="stat__value">{stat.value}</strong>
                <span class="stat__label">{stat.label}</span>
                <span class="stat__sub">{stat.sub}</span>
              </div>
              <svg class="stat__spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`stat-grad-${i()}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color={upColor} stop-opacity="0.35" />
                    <stop offset="1" stop-color={upColor} stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path d={area} fill={`url(#stat-grad-${i()})`} />
                <path d={line} fill="none" stroke={upColor} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </article>
          );
        }}
      </For>
    </section>
  );
}
