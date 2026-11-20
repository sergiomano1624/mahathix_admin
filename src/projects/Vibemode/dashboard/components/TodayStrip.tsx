import { createSignal, onCleanup, onMount, type JSX } from "solid-js";
import { boltIcon } from "@/projects/Vibemode/dashboard/icons";

export function TodayStrip(): JSX.Element {
  const dateFormat = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

  const [date, setDate] = createSignal("");
  const [time, setTime] = createSignal("");
  let interval: number | undefined;

  const tick = () => {
    const now = new Date();
    setDate(dateFormat.format(now));
    setTime(timeFormat.format(now));
  };

  const onVisibility = () => {
    if (!document.hidden) tick();
  };

  onMount(() => {
    tick();
    interval = window.setInterval(tick, 20_000);
    document.addEventListener("visibilitychange", onVisibility);
  });

  onCleanup(() => {
    if (interval !== undefined) window.clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisibility);
  });

  return (
    <div class="today" data-today>
      <span class="today__date" data-today-date>{date()}</span>
      <i class="today__sep" aria-hidden="true" />
      <span class="today__time" data-today-time>{time()}</span>
      <span class="today__chip">
        <span innerHTML={boltIcon} />
        <span>All systems normal</span>
      </span>
    </div>
  );
}
