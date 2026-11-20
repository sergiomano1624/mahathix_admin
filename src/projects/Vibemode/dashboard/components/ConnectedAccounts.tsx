import { For, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { liveDrops, type DropStatus } from "@/projects/Vibemode/dashboard/data";

const plusIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const dropIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.4 7.2 8.6-4.4 8.6 4.4v9.6l-8.6 4.4-8.6-4.4Z"/><path d="m3.4 7.2 8.6 4.4 8.6-4.4"/><path d="M12 11.6V20"/></svg>`;
const arrowIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;

function statusStyle(status: DropStatus): JSX.CSSProperties {
  switch (status) {
    case "Live":      return { background: "rgba(16, 185, 129, 0.15)", color: "#047857" };
    case "Scheduled": return { background: "rgba(59, 130, 246, 0.14)", color: "#1d4ed8" };
    case "Sold Out":  return { background: "rgba(124, 58, 237, 0.14)", color: "#6d28d9" };
    case "Low Stock": return { background: "rgba(245, 158, 11, 0.16)", color: "#b45309" };
  }
}

export function ConnectedAccounts(): JSX.Element {
  return (
    <section class="panel panel--drops" data-reveal>
      <header class="panel__head">
        <h2>
          <span class="panel__head-icon" innerHTML={dropIcon} />
          Live Drops <span class="panel__head-count">({liveDrops.length})</span>
        </h2>
        <div class="panel__head-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={plusIcon}
            onClick={() => toast.info("Drop launcher isn't wired up in this demo.", "Coming soon")}
          >
            Launch Drop
          </Button>
          <a class="panel__head-link" href="/drops">
            Manage Drops <span innerHTML={arrowIcon} />
          </a>
        </div>
      </header>

      <div class="drops-grid">
        <For each={liveDrops}>
          {(drop) => (
            <div class="drop-tile" data-reveal>
              <div class="drop-tile__top">
                <span class="drop-tile__avatar" style={{ background: drop.accent }}>
                  {drop.initials}
                </span>
                <span class="drop-tile__meta">
                  <strong>{drop.title}</strong>
                  <em>{drop.category}</em>
                </span>
                <span class="status-pill" style={statusStyle(drop.status)}>
                  {drop.status}
                </span>
              </div>
              <div class="drop-tile__progress-row">
                <span class="drop-tile__progress-label">{drop.progress}</span>
                <span class="drop-tile__progress-pct">{drop.progressPct}%</span>
              </div>
              <span class="drop-tile__progress">
                <span
                  class="drop-tile__progress-fill"
                  style={{ width: `${drop.progressPct}%`, background: drop.accent }}
                />
              </span>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
