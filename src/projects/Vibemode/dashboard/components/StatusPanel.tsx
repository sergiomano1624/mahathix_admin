import { For, type JSX } from "solid-js";
import { arrowRightIcon } from "@/projects/Vibemode/dashboard/icons";
import { productStatus } from "@/projects/Vibemode/dashboard/data";

const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatusPanel(): JSX.Element {
  const total = productStatus.reduce((sum, slice) => sum + slice.value, 0);
  let offset = 0;
  const slices = productStatus.map((slice, i) => {
    const fraction = slice.value / total;
    const length = fraction * CIRCUMFERENCE;
    const dash = `${length.toFixed(2)} ${(CIRCUMFERENCE - length).toFixed(2)}`;
    const rotation = (offset / CIRCUMFERENCE) * 360 - 90;
    offset += length;
    return { ...slice, length, dash, rotation, i };
  });

  return (
    <section class="panel panel--status" data-reveal>
      <header class="panel__head">
        <h2>Products by Status</h2>
        <a class="link-arrow" href="#catalog">View details <span innerHTML={arrowRightIcon} /></a>
      </header>
      <div class="status__body">
        <div class="donut">
          <svg viewBox="0 0 180 180" role="img" aria-label="Products by status">
            <g class="donut__ring">
              <For each={slices}>
                {(slice) => (
                  <circle
                    class="donut__slice"
                    style={{ "--i": slice.i, "--len": slice.length.toFixed(2) } as JSX.CSSProperties}
                    cx="90"
                    cy="90"
                    r={RADIUS}
                    stroke={slice.color}
                    stroke-dasharray={slice.dash}
                    transform={`rotate(${slice.rotation.toFixed(2)} 90 90)`}
                  />
                )}
              </For>
            </g>
          </svg>
          <div class="donut__center">
            <strong>{total.toLocaleString("en-US")}</strong>
            <em>Products</em>
          </div>
        </div>

        <ul class="legend">
          <For each={productStatus}>
            {(slice) => (
              <li>
                <i style={{ background: slice.color }} />
                <span>{slice.label}</span>
                <strong>{slice.value.toLocaleString("en-US")}</strong>
                <em>{slice.share}</em>
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}
