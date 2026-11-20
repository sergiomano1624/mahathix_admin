import { For, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { recentActivity, type ActivityTone } from "@/projects/Vibemode/dashboard/data";

const arrowIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>`;

const toneSurface: Record<ActivityTone, { bg: string; fg: string }> = {
  purple: { bg: "#ede4ff", fg: "#6d28d9" },
  pink:   { bg: "#fdeaf3", fg: "#be185d" },
  green:  { bg: "#dcf5e8", fg: "#047857" },
  amber:  { bg: "#fff1dc", fg: "#b45309" },
  blue:   { bg: "#dbeafe", fg: "#1d4ed8" },
};

export function RecentPosts(): JSX.Element {
  return (
    <section class="panel panel--recent" data-reveal>
      <header class="panel__head">
        <h2>Recent Activity</h2>
        <a class="panel__head-link" href="/analytics">
          View All <span innerHTML={arrowIcon} />
        </a>
      </header>
      <ul class="recent-list">
        <For each={recentActivity}>
          {(item) => {
            const tone = toneSurface[item.tone];
            return (
              <li class="recent-item">
                <div
                  class="recent-item__thumb"
                  style={{ background: tone.bg, color: tone.fg }}
                >
                  <span innerHTML={item.icon} />
                </div>
                <div class="recent-item__body">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span
                  class="status-pill"
                  style={{ background: tone.bg, color: tone.fg } as JSX.CSSProperties}
                >
                  {item.at}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  icon={moreIcon}
                  aria-label="More"
                  onClick={() => toast.info(`More actions for '${item.title}'`, "Coming soon")}
                />
              </li>
            );
          }}
        </For>
      </ul>
    </section>
  );
}
