import type { JSX } from "solid-js";
import { Show, createSignal, createEffect, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import "./Drawer.css";

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6.5 6.5 11 11" /><path d="m17.5 6.5-11 11" /></svg>`;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: JSX.Element;
  width?: string;
  side?: "right" | "left";
  class?: string;
  children?: JSX.Element;
}

export function Drawer(props: DrawerProps): JSX.Element {
  const [animOpen, setAnimOpen] = createSignal(false);
  const [mounted, setMounted] = createSignal(false);
  let panelRef: HTMLElement | undefined;
  let openerRef: HTMLElement | null = null;

  createEffect(() => {
    if (props.open) {
      openerRef = document.activeElement as HTMLElement | null;
      setMounted(true);
      document.body.classList.add("has-drawer");
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimOpen(true)));
      window.setTimeout(() => {
        const first = panelRef?.querySelector<HTMLElement>("[data-autofocus]") ??
          panelRef?.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus({ preventScroll: true });
      }, 220);
    } else if (mounted()) {
      setAnimOpen(false);
      document.body.classList.remove("has-drawer");
      window.setTimeout(() => {
        setMounted(false);
        openerRef?.focus({ preventScroll: true });
        openerRef = null;
      }, 500);
    }
  });

  createEffect(() => {
    if (!props.open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        props.onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef) return;
      const items = [...panelRef.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const activeEl = document.activeElement;
      if (event.shiftKey && (activeEl === first || !panelRef.contains(activeEl))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    onCleanup(() => document.removeEventListener("keydown", onKey));
  });

  const classes = () =>
    ["drawer", props.side === "left" && "drawer--left", animOpen() && "is-open", props.class].filter(Boolean).join(" ");

  return (
    <Show when={mounted()}>
      <Portal>
        <div class={classes()} data-drawer>
          <div class="drawer__scrim" onClick={props.onClose} />
          <section
            class="drawer__panel"
            role="dialog"
            aria-modal="true"
            style={props.width ? { "--drawer-w": props.width } : undefined}
            ref={panelRef}
          >
            <header class="drawer__head">
              <div class="drawer__titles">
                <h2>{props.title}</h2>
                <Show when={props.description}>
                  <p>{props.description}</p>
                </Show>
              </div>
              <button
                class="drawer__close"
                type="button"
                aria-label="Close panel"
                onClick={props.onClose}
                innerHTML={closeIcon}
              />
            </header>
            <div class="drawer__body" data-drawer-stagger>{props.children}</div>
            <Show when={props.footer}>
              <footer class="drawer__foot">{props.footer}</footer>
            </Show>
          </section>
        </div>
      </Portal>
    </Show>
  );
}
