import type { JSX } from "solid-js";
import { arrowRightIcon, cartIcon, trophyIcon, warningIcon } from "@/projects/Vibemode/dashboard/icons";

/* Vector glyphs identical to the vanilla widgets.ts */
const sunCloud = `<svg class="weather-art" viewBox="0 0 72 56" aria-hidden="true"><g class="weather-art__sun"><circle cx="28" cy="22" r="10" fill="#f9c74f" /><g stroke="#f9c74f" stroke-width="2.6" stroke-linecap="round"><path d="M28 4v5" /><path d="M28 35v5" /><path d="M10 22h5" /><path d="M41 22h5" /><path d="m15.4 9.4 3.5 3.5" /><path d="m37.1 31.1 3.5 3.5" /><path d="m40.6 9.4-3.5 3.5" /><path d="m18.9 31.1-3.5 3.5" /></g></g><g class="weather-art__cloud"><path d="M30 46a8.5 8.5 0 0 1 .8-17 12 12 0 0 1 22.4 3.3A7.4 7.4 0 0 1 52 46Z" fill="#dbe8ff" stroke="#b9d2f7" stroke-width="1.6" /></g></svg>`;
const shoeThumb = `<span class="product-thumb" aria-hidden="true"><svg viewBox="0 0 80 56"><ellipse cx="40" cy="47" rx="26" ry="3" fill="#93b0dc" opacity=".3" /><path d="M12 38C11 30 15 24 22 21c8-3 14 1 20 5 5 3 11 5 18 6 4 1 6 2 6 4v2Z" fill="#cfe0fb" /><path d="M12 38c-1-7 2-13 8-16 3 3 4 9 4 16Z" fill="#fff" opacity=".9" /><path d="M24 34c8-3 18-8 27-12 3-1 5 0 4 2s-4 3-8 5c-9 4-17 6-22 6-3 0-3-1-1-1Z" fill="#f98a76" /><path d="M14 34h52c2 0 3 1 3 3 0 4-3 6-8 6H20c-6 0-9-2-9-6 0-2 1-3 3-3Z" fill="#eef3fb" stroke="#cfdcef" stroke-width=".9" /></svg></span>`;

const sparkline = (values: number[]): string => {
  const max = Math.max(...values);
  const points = values.map((value, i) => {
    const x = (i / (values.length - 1)) * 108;
    const y = 30 - (value / max) * 26;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `<svg class="spark" viewBox="0 0 108 32" preserveAspectRatio="none" aria-hidden="true"><polyline class="spark__area" points="0,32 ${points.join(" ")} 108,32" /><polyline class="spark__line" points="${points.join(" ")}" /></svg>`;
};

/* Data from the vanilla file */
const weather = {
  city: "Bengaluru, IN",
  temperature: 29,
  condition: "Partly cloudy",
  high: 31,
  low: 22,
  note: "Good for same-day delivery",
};
const ordersToday = {
  count: 42,
  revenue: "₹1,24,500",
  delta: "+18%",
  spark: [12, 18, 14, 26, 22, 34, 30, 42],
};
const health = { score: 96, needsAttention: 1200 };
const topProduct = { name: "Running Shoes", units: 128, revenue: "₹42,300", channel: "Amazon" };

export function Widgets(): JSX.Element {
  return (
    <section class="widgets" aria-label="Today at a glance">
      <article class="widget widget--weather" data-reveal>
        <div class="widget__body">
          <p class="widget__label">{weather.city}</p>
          <p class="widget__value">
            <strong>{weather.temperature}°</strong>
            <em>{weather.condition}</em>
          </p>
          <p class="widget__note">H {weather.high}° · L {weather.low}° — {weather.note}</p>
        </div>
        <span innerHTML={sunCloud} />
      </article>

      <article class="widget widget--orders" data-reveal>
        <div class="widget__body">
          <p class="widget__label">
            <span innerHTML={cartIcon} />
            <span>Orders today</span>
          </p>
          <p class="widget__value">
            <strong data-count-to={ordersToday.count}>0</strong>
            <em class="widget__delta">{ordersToday.delta}</em>
          </p>
          <p class="widget__note">{ordersToday.revenue} in revenue so far</p>
        </div>
        <span innerHTML={sparkline(ordersToday.spark)} />
      </article>

      <article class="widget widget--top" data-reveal>
        <div class="widget__body">
          <p class="widget__label">
            <span innerHTML={trophyIcon} />
            <span>Top product today</span>
          </p>
          <p class="widget__value">
            <strong data-count-to={topProduct.units}>0</strong>
            <em>units sold</em>
          </p>
          <p class="widget__note">{topProduct.name} · {topProduct.revenue} on {topProduct.channel}</p>
        </div>
        <span innerHTML={shoeThumb} />
      </article>

      <article class="widget widget--health" data-reveal>
        <div class="widget__body">
          <p class="widget__label">
            <span innerHTML={warningIcon} />
            <span>Needs attention</span>
          </p>
          <p class="widget__value">
            <strong data-count-to={health.needsAttention} data-count-group="true">0</strong>
            <em>products</em>
          </p>
          <p class="widget__note">{health.score}% catalog health · missing images</p>
        </div>
        <a class="widget__action" href="#catalog">Review <span innerHTML={arrowRightIcon} /></a>
      </article>
    </section>
  );
}
