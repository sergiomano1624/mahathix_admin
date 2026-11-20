import { For, type JSX } from "solid-js";
import { toast } from "@/shared/toast/toast";
import { quickActions } from "@/projects/Vibemode/dashboard/data";

const boltIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="m13 2-9 12h6l-1 8 9-12h-6Z"/></svg>`;

export function QuickCreate(): JSX.Element {
  return (
    <section class="panel panel--quick" data-reveal>
      <header class="panel__head">
        <h2>
          <span class="panel__head-icon panel__head-icon--purple" innerHTML={boltIcon} />
          Quick Actions
        </h2>
      </header>
      <div class="quick-grid">
        <For each={quickActions}>
          {(action) => (
            <button
              type="button"
              class={`quick-tile quick-tile--${action.tone}`}
              onClick={() => toast.info(`${action.label} isn't wired up in this demo.`, "Coming soon")}
            >
              <span class="quick-tile__icon" innerHTML={action.icon} />
              <span class="quick-tile__label">{action.label}</span>
            </button>
          )}
        </For>
      </div>
    </section>
  );
}
