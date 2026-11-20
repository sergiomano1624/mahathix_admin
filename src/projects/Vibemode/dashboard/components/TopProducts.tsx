import { For, type JSX } from "solid-js";
import { topProducts } from "@/projects/Vibemode/dashboard/data";

const arrowIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;
const trophyIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6 3h12v2a4 4 0 0 1-4 4h-.6a3 3 0 0 1-2.8-2H10a4 4 0 0 1-4-4Zm6 10a5 5 0 0 0 5-5h2a3 3 0 0 1-3 3 5 5 0 0 1-3.6 4.6V18h2a1 1 0 0 1 1 1v2H8v-2a1 1 0 0 1 1-1h2v-2.4A5 5 0 0 1 7.4 11a3 3 0 0 1-3-3h2a5 5 0 0 0 5 5Z"/></svg>`;

function sparkPath(values: number[], width = 90, height = 26): string {
  const max = Math.max(...values);
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

export function TopProducts(): JSX.Element {
  return (
    <section class="panel panel--leaderboard" data-reveal>
      <header class="panel__head">
        <h2>
          <span class="panel__head-icon panel__head-icon--purple" innerHTML={trophyIcon} />
          Top Product Orders
        </h2>
        <a class="panel__head-link" href="/analytics">
          View All <span innerHTML={arrowIcon} />
        </a>
      </header>

      <ul class="leaderboard">
        <For each={topProducts}>
          {(p) => (
            <li class="leaderboard__row">
              <span class="leaderboard__rank">#{p.rank}</span>
              <span class="leaderboard__avatar" style={{ background: p.accent }}>{p.initials}</span>
              <span class="leaderboard__meta">
                <strong>{p.name}</strong>
                <em>{p.category}</em>
              </span>
              <svg class="leaderboard__spark" viewBox="0 0 90 26" preserveAspectRatio="none" aria-hidden="true">
                <path d={sparkPath(p.spark)} fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="leaderboard__orders">
                <strong>{p.orders}</strong>
                <em>orders</em>
              </span>
              <span class="leaderboard__revenue">{p.revenue}</span>
              <span class="leaderboard__delta">{p.delta}</span>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
