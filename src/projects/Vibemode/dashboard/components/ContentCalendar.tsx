import { For, type JSX } from "solid-js";
import { Button } from "@/shared/components";
import { toast } from "@/shared/toast/toast";
import { calendarEvents, calendarMonth } from "@/projects/Vibemode/dashboard/data";

const chevronLeft = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>`;
const chevronRight = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ContentCalendar(): JSX.Element {
  // Build 6 weeks x 7 day grid for calendarMonth
  const firstDow = (new Date(calendarMonth.year, calendarMonth.month, 1)).getDay();
  const daysInMonth = new Date(calendarMonth.year, calendarMonth.month + 1, 0).getDate();
  const prevDays = new Date(calendarMonth.year, calendarMonth.month, 0).getDate();

  const cells: { day: number; outside: boolean; today?: boolean }[] = [];
  for (let i = 0; i < firstDow; i++) cells.push({ day: prevDays - firstDow + 1 + i, outside: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, outside: false, today: d === calendarMonth.today });
  while (cells.length < 42) cells.push({ day: cells.length - firstDow - daysInMonth + 1, outside: true });

  const eventsByDay = new Map<number, string[]>();
  calendarEvents.forEach((ev) => {
    if (!eventsByDay.has(ev.day)) eventsByDay.set(ev.day, []);
    eventsByDay.get(ev.day)!.push(ev.color);
  });

  return (
    <section class="panel panel--calendar" data-reveal>
      <header class="panel__head">
        <h2>Drop Schedule</h2>
        <div class="calendar__nav">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={chevronLeft}
            aria-label="Previous month"
            onClick={() => toast.info("Prev month isn't wired up in this demo.", "Coming soon")}
          />
          <span class="calendar__nav-label">{calendarMonth.label}</span>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={chevronRight}
            aria-label="Next month"
            onClick={() => toast.info("Next month isn't wired up in this demo.", "Coming soon")}
          />
        </div>
      </header>

      <div class="calendar">
        <div class="calendar__weekdays">
          <For each={WEEKDAYS}>{(w) => <span>{w}</span>}</For>
        </div>
        <div class="calendar__grid">
          <For each={cells}>
            {(cell) => (
              <div
                class="calendar__cell"
                classList={{
                  "is-outside": cell.outside,
                  "is-today": !!cell.today,
                }}
              >
                <span class="calendar__day">{cell.day}</span>
                {!cell.outside && eventsByDay.has(cell.day) && (
                  <div class="calendar__dots">
                    <For each={eventsByDay.get(cell.day)!.slice(0, 3)}>
                      {(color) => <span class="calendar__dot" style={{ background: color }} />}
                    </For>
                  </div>
                )}
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
