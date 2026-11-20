import { For, Match, Show, Switch, createMemo, createSignal, onMount, type JSX } from "solid-js";
import { revealOnMount } from "@/shared/lib/motion";
import { toast } from "@/shared/toast/toast";
import { Button, Drawer, Select, type SelectOption } from "@/shared/components";
import {
  creators,
  creatorsHeadline,
  creatorsSummary,
  type Creator,
  type CreatorStatus,
  type CreatorTier,
} from "../data";
import { CreatorDetails } from "../components/CreatorDetails";
import "../Creators.css";
import "../CreatorDetails.css";

const plusIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const searchIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.6"/><path d="m16 16 4.2 4.2"/></svg>`;
const chevronIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;
const mailIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="5.2" width="17.2" height="13.6" rx="2.2"/><path d="m4.4 6.4 7.6 5.4 7.6-5.4"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const moreIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`;

type FilterKey = "all" | CreatorStatus;
type SortKey = "recent" | "earnings" | "drops" | "name";

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all",     label: "All",      count: creatorsSummary.total },
  { key: "Active",  label: "Active",   count: creatorsSummary.active },
  { key: "Pending", label: "Pending",  count: creatorsSummary.pending },
  { key: "On Hold", label: "On Hold",  count: creatorsSummary.onHold },
  { key: "Archived",label: "Archived", count: creatorsSummary.archived },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "recent",   label: "Most recently joined" },
  { value: "earnings", label: "Top earnings (month)" },
  { value: "drops",    label: "Most drops" },
  { value: "name",     label: "Name A → Z" },
];

const TIER_OPTIONS: SelectOption[] = [
  { value: "",          label: "All tiers",  sub: "Signature through Guest" },
  { value: "Signature", label: "Signature",  sub: "Long-term partners",  accent: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)" },
  { value: "Partner",   label: "Partner",    sub: "Multi-drop commits",  accent: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
  { value: "Emerging",  label: "Emerging",   sub: "Rising collaborators", accent: "linear-gradient(135deg, #34d399 0%, #047857 100%)" },
  { value: "Guest",     label: "Guest",      sub: "One-drop capsule",    accent: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)" },
];

function statusStyle(status: CreatorStatus): JSX.CSSProperties {
  switch (status) {
    case "Active":   return { background: "rgba(16, 185, 129, 0.15)",  color: "#047857" };
    case "Pending":  return { background: "rgba(245, 158, 11, 0.16)",  color: "#b45309" };
    case "On Hold":  return { background: "rgba(59, 130, 246, 0.14)",  color: "#1d4ed8" };
    case "Archived": return { background: "rgba(100, 116, 139, 0.18)", color: "#334155" };
  }
}

function tierStyle(tier: CreatorTier): JSX.CSSProperties {
  switch (tier) {
    case "Signature": return { background: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)", color: "#ffffff" };
    case "Partner":   return { background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)", color: "#7c2d12" };
    case "Emerging":  return { background: "linear-gradient(135deg, #34d399 0%, #047857 100%)", color: "#ffffff" };
    case "Guest":     return { background: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)", color: "#ffffff" };
  }
}

export default function Creators(): JSX.Element {
  const [filter, setFilter] = createSignal<FilterKey>("all");
  const [tier, setTier] = createSignal<string>("");
  const [query, setQuery] = createSignal("");
  const [sort, setSort] = createSignal<SortKey>("recent");
  const [activeCreator, setActiveCreator] = createSignal<Creator | null>(null);
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 22);
  });

  const filtered = createMemo(() => {
    let out = creators.slice();
    const f = filter();
    if (f !== "all") out = out.filter((c) => c.status === f);
    const t = tier();
    if (t) out = out.filter((c) => c.tier === t);
    const q = query().trim().toLowerCase();
    if (q) {
      out = out.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.specialties.some((s) => s.toLowerCase().includes(q)) ||
          c.city.toLowerCase().includes(q),
      );
    }
    const s = sort();
    if (s === "recent")        out.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
    else if (s === "earnings") out.sort((a, b) => Number(b.earningsThisMonth.replace(/[^\d]/g, "")) - Number(a.earningsThisMonth.replace(/[^\d]/g, "")));
    else if (s === "drops")    out.sort((a, b) => b.dropsCount - a.dropsCount);
    else if (s === "name")     out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  });

  const isEmpty = createMemo(() => filtered().length === 0);
  const onOpen = (c: Creator) => setActiveCreator(c);
  const onCloseDrawer = () => setActiveCreator(null);

  return (
    <div class="creators" ref={rootRef}>
      <header class="creators__header" data-reveal>
        <div>
          <h1>Creators</h1>
          <p>
            {creatorsSummary.total} creators in-view · {creatorsSummary.pending} pending review · {creatorsSummary.active} actively shipping
          </p>
        </div>
        <div class="creators__header-actions">
          <Button
            variant="ghost"
            onClick={() => toast.info("Invite link copied — in demo this doesn't do anything.", "Coming soon")}
          >
            Invite via link
          </Button>
          <Button
            variant="primary"
            icon={plusIcon}
            onClick={() => toast.info("Creator onboarding form isn't wired up.", "Coming soon")}
          >
            Add Creator
          </Button>
        </div>
      </header>

      <section class="creators__stats" aria-label="Creators headline">
        <For each={creatorsHeadline}>
          {(s) => (
            <article class={`creators-stat creators-stat--${s.tone}`} data-reveal>
              <div class="creators-stat__top">
                <strong>{s.value}</strong>
                <span class="creators-stat__delta">{s.delta}</span>
              </div>
              <span class="creators-stat__label">{s.label}</span>
              <span class="creators-stat__sub">{s.sub}</span>
            </article>
          )}
        </For>
      </section>

      <section class="panel creators__toolbar" data-reveal>
        <div class="creators__tabs" role="tablist">
          <For each={FILTERS}>
            {(tab) => (
              <button
                type="button"
                class="creators__tab"
                classList={{ "is-active": filter() === tab.key }}
                role="tab"
                aria-selected={filter() === tab.key ? "true" : "false"}
                onClick={() => setFilter(tab.key)}
              >
                <span>{tab.label}</span>
                <span class="creators__tab-count">{tab.count}</span>
              </button>
            )}
          </For>
        </div>
        <div class="creators__tools">
          <Select
            value={tier()}
            onChange={(v) => setTier(v ?? "")}
            options={TIER_OPTIONS}
            align="left"
            minWidth={0}
            menuMinWidth={240}
          />
          <label class="creators__search">
            <span innerHTML={searchIcon} />
            <input
              type="search"
              placeholder="Search by name, handle, speciality or city…"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </label>
          <Select
            value={sort()}
            onChange={(v) => v && setSort(v as SortKey)}
            options={SORT_OPTIONS}
            prefix="Sort:"
            align="right"
            minWidth={210}
            menuMinWidth={220}
          />
        </div>
      </section>

      <Switch>
        <Match when={isEmpty()}>
          <section class="panel creators__empty" data-reveal>
            <strong>No creators match this filter.</strong>
            <p>Reset the status, change the tier, or try a different search.</p>
          </section>
        </Match>
        <Match when={!isEmpty()}>
          <section class="panel creators__list" aria-label={`${filtered().length} creators`}>
            <header class="creators__list-head">
              <span>Creator</span>
              <span>Status</span>
              <span>Tier</span>
              <span>Specialities</span>
              <span>Drops</span>
              <span class="creators__list-head-right">Month earnings</span>
              <span class="creators__list-head-actions">Actions</span>
            </header>
            <ul>
              <For each={filtered()}>
                {(c) => (
                  <li class="creators__row" data-reveal onClick={() => onOpen(c)}>
                    <div class="creators__cell creators__cell--cust">
                      <span class="creators__avatar" style={{ background: c.accent }}>
                        {c.initials}
                      </span>
                      <div>
                        <strong>
                          {c.name}
                          <Show when={c.isReturning}>
                            <span class="creators__returning" title="Long-term collaborator">★</span>
                          </Show>
                        </strong>
                        <em>{c.handle}</em>
                      </div>
                    </div>

                    <div class="creators__cell">
                      <span class="status-pill" style={statusStyle(c.status)}>{c.status}</span>
                    </div>

                    <div class="creators__cell">
                      <span class="creators__tier" style={tierStyle(c.tier)}>{c.tier}</span>
                    </div>

                    <div class="creators__cell creators__cell--specs">
                      <For each={c.specialties.slice(0, 3)}>
                        {(s) => <span class="creators__spec">{s}</span>}
                      </For>
                    </div>

                    <div class="creators__cell creators__cell--drops">
                      <strong>{c.dropsCount}</strong>
                      <em>{c.royaltyPercent > 0 ? `${c.royaltyPercent}% royalty` : "No royalty yet"}</em>
                    </div>

                    <div class="creators__cell creators__cell--earnings">
                      <strong>{c.earningsThisMonth}</strong>
                      <em>Lifetime · {c.earningsLifetime}</em>
                    </div>

                    <div class="creators__cell creators__cell--actions" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={eyeIcon}
                        aria-label="View profile"
                        title="View profile"
                        onClick={() => onOpen(c)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={mailIcon}
                        aria-label="Message"
                        title="Message"
                        onClick={() => toast.info(`Message to ${c.name}…`, "Coming soon")}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={moreIcon}
                        aria-label="More"
                        title="More"
                        onClick={() => toast.info("More actions…", "Coming soon")}
                      />
                      <span class="creators__row-chevron" innerHTML={chevronIcon} />
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </section>
        </Match>
      </Switch>

      <Drawer
        open={activeCreator() !== null}
        onClose={onCloseDrawer}
        width="75vw"
        id="creator-details-drawer"
      >
        <Show when={activeCreator()}>
          <CreatorDetails creator={activeCreator()!} onClose={onCloseDrawer} />
        </Show>
      </Drawer>
    </div>
  );
}
