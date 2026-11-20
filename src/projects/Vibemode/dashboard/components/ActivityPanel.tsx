import { For, type JSX } from "solid-js";
import { IconBadge } from "@/shared/ui";
import {
  arrowRightIcon,
  boltIcon,
  cartIcon,
  checkCircleIcon,
  uploadIcon,
  warningIcon,
} from "@/projects/Vibemode/dashboard/icons";
import { activity } from "@/projects/Vibemode/dashboard/data";

const activityIcons: Record<string, string> = {
  check: checkCircleIcon, upload: uploadIcon, bolt: boltIcon, warning: warningIcon, cart: cartIcon,
};

export function ActivityPanel(): JSX.Element {
  return (
    <section class="panel panel--activity" data-reveal>
      <header class="panel__head">
        <h2>Recent Activity</h2>
        <a class="link-arrow" href="#activity">View all <span innerHTML={arrowRightIcon} /></a>
      </header>
      <ul class="activity-list">
        <For each={activity}>
          {(item) => (
            <li>
              <IconBadge
                icon={activityIcons[item.icon] ?? ""}
                tone={item.tone}
                shape="circle"
                size="34px"
                iconSize="17px"
              />
              <div class="activity-list__text">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
              <time>{item.time}</time>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
