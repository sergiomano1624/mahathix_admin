import { For, type JSX } from "solid-js";
import { Badge, IconBadge } from "@/shared/ui";
import { clockIcon, feedIcon, importIcon } from "@/projects/Vibemode/dashboard/icons";
import { syncStatus } from "@/projects/Vibemode/dashboard/data";

const syncIcons: Record<string, string> = { import: importIcon, feed: feedIcon, clock: clockIcon };

export function SyncPanel(): JSX.Element {
  return (
    <section class="panel panel--sync" data-reveal>
      <header class="panel__head">
        <h2>Sync Status</h2>
        <Badge label="All running" tone="green" dot />
      </header>
      <ul class="sync-list">
        <For each={syncStatus}>
          {(item) => (
            <li>
              <IconBadge icon={syncIcons[item.icon] ?? ""} tone={item.tone} size="38px" radius="11px" iconSize="19px" />
              <div class="sync-list__text">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
                <em>{item.note}</em>
              </div>
              <Badge
                label={item.badge}
                tone={item.tone === "green" ? "green" : "blue"}
                dot={item.tone === "green"}
              />
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
