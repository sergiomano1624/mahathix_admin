import { createSignal, type JSX } from "solid-js";
import { toast } from "@/shared/toast/toast";
import { Button, Select, type SelectOption } from "@/shared/components";

const plusIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`;
const calendarIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.4" y="4.8" width="17.2" height="15.4" rx="2.4"/><path d="M3.4 9.2h17.2"/><path d="M8.6 3v3.4"/><path d="M15.4 3v3.4"/></svg>`;

const RANGE_OPTIONS: SelectOption[] = [
  { value: "7d", label: "Last 7 days", sub: "Nov 14 – Nov 20, 2026", icon: calendarIcon },
  { value: "14d", label: "Last 14 days", sub: "Nov 7 – Nov 20, 2026", icon: calendarIcon },
  { value: "30d", label: "Last 30 days", sub: "Oct 22 – Nov 20, 2026", icon: calendarIcon },
  { value: "mtd", label: "Month to date", sub: "Nov 1 – Nov 20, 2026", icon: calendarIcon },
  { value: "lm", label: "Last month", sub: "Oct 1 – Oct 31, 2026", icon: calendarIcon },
  { value: "qtd", label: "Quarter to date", sub: "Oct 1 – Nov 20, 2026", icon: calendarIcon },
];

export interface HeroProps {
  name: string;
}

export function Hero(props: HeroProps): JSX.Element {
  const [range, setRange] = createSignal<string>("14d");

  return (
    <section class="dash-hero" data-reveal>
      <div class="dash-hero__greeting">
        <h1>
          Good Morning, {props.name}!{" "}
          <span class="dash-hero__wave" aria-hidden="true">👋</span>
        </h1>
        <p>Ship Vibe Mode drops, reels, remixes and community votes — across every channel, in one place.</p>
      </div>
      <div class="dash-hero__actions">
        <Select
          value={range()}
          onChange={(v) => {
            if (v) {
              setRange(v);
              const opt = RANGE_OPTIONS.find((o) => o.value === v);
              toast.info(`Range set to ${opt?.label}`, "Updated");
            }
          }}
          options={RANGE_OPTIONS}
          align="right"
          minWidth={190}
          menuMinWidth={240}
        />
        <Button
          variant="primary"
          icon={plusIcon}
          onClick={() => toast.info("Drop launcher isn't wired up in this demo.", "Coming soon")}
        >
          Launch Drop
        </Button>
      </div>
    </section>
  );
}
