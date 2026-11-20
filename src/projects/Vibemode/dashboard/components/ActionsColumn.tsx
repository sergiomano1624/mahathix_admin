import { For, type JSX } from "solid-js";
import { Button, IconBadge } from "@/shared/ui";
import { toast } from "@/shared/toast/toast";
import {
  arrowRightIcon,
  crownIcon,
  layersIcon,
  linkIcon,
  settingsIcon,
  uploadIcon,
} from "@/projects/Vibemode/dashboard/icons";
import { quickActions } from "@/projects/Vibemode/dashboard/data";

const actionIcons: Record<string, string> = {
  upload: uploadIcon, layers: layersIcon, link: linkIcon, settings: settingsIcon,
};

export function ActionsColumn(): JSX.Element {
  return (
    <div class="actions-column">
      <section class="panel panel--actions" data-reveal>
        <header class="panel__head"><h2>Quick Actions</h2></header>
        <div class="quick-grid">
          <For each={quickActions}>
            {(action) => (
              <button
                class="quick"
                type="button"
                onClick={() => toast.info(`${action.title} isn't wired up in this demo.`, "Coming soon")}
              >
                <IconBadge
                  icon={actionIcons[action.icon] ?? ""}
                  tone={action.tone}
                  size="40px"
                  radius="12px"
                  iconSize="19px"
                />
                <span>
                  <strong>{action.title}</strong>
                  <em>{action.copy}</em>
                </span>
              </button>
            )}
          </For>
        </div>
      </section>

      <section class="panel upsell" data-reveal>
        <div class="upsell__copy">
          <h2>
            <span innerHTML={crownIcon} />
            <span>Unlock more sales with Mahathix Admin</span>
          </h2>
          <p>Connect new marketplaces, optimize your feeds and reach more customers.</p>
          <Button
            label="Explore integrations"
            variant="outline"
            iconEnd={arrowRightIcon}
            onClick={() => toast.info("Explore integrations isn't wired up in this demo.", "Coming soon")}
          />
        </div>
        <div class="upsell__art" aria-hidden="true">
          <svg viewBox="0 0 200 120">
            <path d="M18 104h164" stroke="#c9dbf5" stroke-width="2" stroke-linecap="round" />
            <g class="upsell__bars">
              <rect x="34" y="76" width="14" height="26" rx="4" fill="#bcd3f8" style={{ "--i": 0 } as JSX.CSSProperties} />
              <rect x="54" y="62" width="14" height="40" rx="4" fill="#8fb6f6" style={{ "--i": 1 } as JSX.CSSProperties} />
              <rect x="74" y="48" width="14" height="54" rx="4" fill="#2f6ff0" style={{ "--i": 2 } as JSX.CSSProperties} />
            </g>
            <g class="upsell__shop">
              <rect x="104" y="58" width="70" height="10" rx="3" fill="#f2b23f" />
              <path d="M100 68h78l-5 9h-68Z" fill="#f7c66a" />
              <rect x="106" y="77" width="66" height="27" rx="4" fill="#eef4ff" stroke="#cfe0fb" />
              <rect x="114" y="84" width="16" height="14" rx="3" fill="#8fc4f4" />
              <rect x="148" y="84" width="16" height="14" rx="3" fill="#8fc4f4" />
              <rect x="134" y="82" width="12" height="22" rx="3" fill="#2f6ff0" />
            </g>
            <g class="upsell__leaves" fill="#8fd3c8">
              <path d="M182 96c6-8 5-18-2-23-5 8-4 18 2 23Z" />
              <path d="M24 98c-5-8-4-18 3-23 4 8 3 18-3 23Z" opacity=".7" />
            </g>
          </svg>
        </div>
      </section>
    </div>
  );
}
