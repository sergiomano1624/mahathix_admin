import { For, Show } from "solid-js";
import { toastsSignal, dismissToast, type ToastEntry } from "./toast";
import "./toast.css";

const icons: Record<ToastEntry["tone"], string> = {
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="m7.8 12.3 2.8 2.8 5.6-5.9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="m9 9 6 6M15 9l-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" /></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="M12 7.4v5.2" stroke="#fff" stroke-width="2.2" stroke-linecap="round" /><path d="M12 16.4h.01" stroke="#fff" stroke-width="2.4" stroke-linecap="round" /></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="M12 11.2v5.2" stroke="#fff" stroke-width="2.2" stroke-linecap="round" /><path d="M12 7.8h.01" stroke="#fff" stroke-width="2.4" stroke-linecap="round" /></svg>`,
};

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6.5 6.5 11 11" /><path d="m17.5 6.5-11 11" /></svg>`;

export default function ToastHost() {
  return (
    <div class="toast-stack" aria-live="polite" aria-atomic="false">
      <For each={toastsSignal()}>
        {(t) => (
          <div
            class={`toast toast--${t.tone} is-open`}
            role={t.tone === "error" ? "alert" : "status"}
          >
            <span class="toast__icon" innerHTML={icons[t.tone]} />
            <div class="toast__text">
              <Show when={t.title}>
                <strong>{t.title}</strong>
              </Show>
              <p>{t.message}</p>
            </div>
            <button
              class="toast__close"
              type="button"
              aria-label="Dismiss"
              onClick={() => dismissToast(t.id)}
              innerHTML={closeIcon}
            />
            <Show when={t.duration > 0}>
              <span class="toast__timer" style={{ "--toast-duration": `${t.duration}ms` }} />
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}
