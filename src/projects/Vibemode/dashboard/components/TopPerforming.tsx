import type { JSX } from "solid-js";
import { topDrop } from "@/projects/Vibemode/dashboard/data";

const arrowIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;
const heartIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 20.4s-7.6-4.4-7.6-10.2a4.3 4.3 0 0 1 7.6-2.8 4.3 4.3 0 0 1 7.6 2.8c0 5.8-7.6 10.2-7.6 10.2Z"/></svg>`;
const chatIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 15.6A2.4 2.4 0 0 1 17.6 18H8l-4 3V5.6A2.4 2.4 0 0 1 6.4 3.2h11.2A2.4 2.4 0 0 1 20 5.6Z"/></svg>`;
const shareIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12 16-8-5 16-3-7Z"/><path d="m12 13 3-5"/></svg>`;
const starIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m12 2 2.6 6.6L21 10l-5 4.4 1.6 6.6L12 17l-5.6 4 1.6-6.6-5-4.4 6.4-1.4Z"/></svg>`;

export function TopPerforming(): JSX.Element {
  return (
    <section class="panel panel--top" data-reveal>
      <header class="panel__head">
        <h2>Top Drop This Week</h2>
        <a class="panel__head-link" href="/posts">
          View All <span innerHTML={arrowIcon} />
        </a>
      </header>
      <article class="top-card">
        <div class="top-card__thumb">
          <div
            class="top-card__thumb-img"
            style={{
              background: `linear-gradient(135deg, ${topDrop.thumbStart} 0%, ${topDrop.thumbEnd} 100%)`,
            }}
            aria-hidden="true"
          >
            <span innerHTML={starIcon} />
          </div>
        </div>
        <div class="top-card__body">
          <strong class="top-card__title">{topDrop.title}</strong>
          <p class="top-card__meta">
            {topDrop.format} · {topDrop.views}
          </p>
          <div class="top-card__stats">
            <span class="top-card__stat">
              <span class="top-card__stat-icon" style={{ color: "#ef4444" }} innerHTML={heartIcon} />
              {topDrop.likes}
            </span>
            <span class="top-card__stat">
              <span class="top-card__stat-icon" style={{ color: "#2563eb" }} innerHTML={chatIcon} />
              {topDrop.comments}
            </span>
            <span class="top-card__stat">
              <span class="top-card__stat-icon" style={{ color: "#059669" }} innerHTML={shareIcon} />
              {topDrop.shares}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}
