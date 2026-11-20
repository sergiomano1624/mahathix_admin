import { For, type JSX } from "solid-js";
import { userGrowth, userGrowthMeta } from "@/projects/Vibemode/dashboard/data";

const usersIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.5"/><path d="M2.4 20c0-3.6 2.9-6 6.6-6s6.6 2.4 6.6 6"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.4 20c0-2.6 1.9-4.6 4.4-4.6"/></svg>`;

export function UserGrowth(): JSX.Element {
  const max = Math.max(...userGrowth.map((b) => b.value));

  return (
    <section class="panel panel--growth" data-reveal>
      <header class="panel__head">
        <h2>
          <span class="panel__head-icon panel__head-icon--indigo" innerHTML={usersIcon} />
          User Growth
        </h2>
      </header>

      <div class="growth__summary">
        <strong>{userGrowthMeta.total}</strong>
        <span class="growth__delta">↑ {userGrowthMeta.delta}</span>
      </div>
      <p class="growth__caption">{userGrowthMeta.caption}</p>

      <div class="growth__bars" role="list">
        <For each={userGrowth}>
          {(b) => (
            <div class="growth__bar" role="listitem" title={`${b.day} · ${b.value} signups`}>
              <span class="growth__bar-value">{b.value}</span>
              <span class="growth__bar-track">
                <span
                  class="growth__bar-fill"
                  style={{ height: `${Math.round((b.value / max) * 100)}%` }}
                />
              </span>
              <span class="growth__bar-day">{b.day}</span>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
