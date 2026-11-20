import { For, createMemo, type JSX } from "solid-js";
import { productMix } from "@/projects/Vibemode/dashboard/data";

const infoIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8.2" r="1" fill="currentColor"/></svg>`;
const mixIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M12 3.6a8.4 8.4 0 0 1 7.1 12.9"/></svg>`;

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ContentOverview(): JSX.Element {
  const total = createMemo(() => productMix.reduce((sum, s) => sum + s.value, 0));

  const segments = createMemo(() => {
    let offset = 0;
    return productMix.map((slice) => {
      const share = slice.value / total();
      const length = share * CIRCUMFERENCE;
      const seg = {
        ...slice,
        share: Math.round(share * 1000) / 10,
        strokeDasharray: `${length} ${CIRCUMFERENCE - length}`,
        strokeDashoffset: -offset,
      };
      offset += length;
      return seg;
    });
  });

  return (
    <section class="panel panel--overview" data-reveal>
      <header class="panel__head">
        <h2>
          <span class="panel__head-icon panel__head-icon--indigo" innerHTML={mixIcon} />
          Product Mix <span class="panel__head-info" innerHTML={infoIcon} />
        </h2>
      </header>
      <div class="overview">
        <div class="overview__chart" aria-hidden="true">
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#efeaf9" stroke-width="18" />
            <g transform="rotate(-90 80 80)">
              <For each={segments()}>
                {(seg) => (
                  <circle
                    cx="80"
                    cy="80"
                    r={RADIUS}
                    fill="none"
                    stroke={seg.color}
                    stroke-width="18"
                    stroke-dasharray={seg.strokeDasharray}
                    stroke-dashoffset={seg.strokeDashoffset}
                    stroke-linecap="butt"
                  />
                )}
              </For>
            </g>
          </svg>
          <div class="overview__chart-center">
            <strong>{total().toLocaleString()}</strong>
            <span>Products</span>
          </div>
        </div>
        <ul class="overview__legend">
          <For each={segments()}>
            {(seg) => (
              <li class="overview__legend-row">
                <span class="overview__dot" style={{ background: seg.color }} />
                <span class="overview__legend-label">{seg.label}</span>
                <span class="overview__legend-value">
                  <strong>{seg.value}</strong>
                  <em>({seg.share}%)</em>
                </span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}
