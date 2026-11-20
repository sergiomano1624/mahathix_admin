import { For, type JSX } from "solid-js";
import { Badge, type BadgeTone } from "@/shared/ui";
import { toast } from "@/shared/toast/toast";
import { arrowRightIcon, dotsVerticalIcon } from "@/projects/Vibemode/dashboard/icons";
import {
  amazonLogo,
  facebookLogo,
  flipkartLogo,
  googleLogo,
  metaLogo,
  shopifyLogo,
  whatsappLogo,
} from "@/shared/lib/logos";
import { marketplaceRows } from "@/projects/Vibemode/dashboard/data";

const channelLogos: Record<string, string> = {
  amazon: amazonLogo, google: googleLogo, meta: metaLogo, shopify: shopifyLogo,
  flipkart: flipkartLogo, whatsapp: whatsappLogo, instagram: facebookLogo,
};

const statusTone: Record<string, BadgeTone> = { Healthy: "green", Warning: "amber", Error: "rose" };

export function MarketplacePanel(): JSX.Element {
  return (
    <section class="panel panel--marketplaces" data-reveal>
      <header class="panel__head">
        <div>
          <h2>Marketplace Performance</h2>
          <p>Products published and sync status by channel.</p>
        </div>
        <a class="link-arrow" href="#marketplaces">View all <span innerHTML={arrowRightIcon} /></a>
      </header>
      <div class="table-wrap">
        <table class="table mini-table">
          <thead>
            <tr>
              <th>Marketplace</th>
              <th>Products</th>
              <th>Status</th>
              <th>Last Sync</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <For each={marketplaceRows}>
              {(row) => (
                <tr>
                  <td>
                    <span class="channel">
                      <i innerHTML={channelLogos[row.logo] ?? ""} />
                      {row.name}
                    </span>
                  </td>
                  <td class="cell-number">{row.products}</td>
                  <td>
                    <Badge label={row.status} tone={statusTone[row.status] ?? "green"} dot />
                  </td>
                  <td class="cell-muted">{row.lastSync}</td>
                  <td class="cell-actions">
                    <button
                      class="icon-btn"
                      type="button"
                      aria-label={`Options for ${row.name}`}
                      onClick={() => toast.info(`Options for ${row.name}.`, "Marketplace")}
                      innerHTML={dotsVerticalIcon}
                    />
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </section>
  );
}
