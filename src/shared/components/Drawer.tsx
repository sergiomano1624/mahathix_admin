import { createEffect, onCleanup, Show, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import "./Drawer.css";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** CSS width value — e.g. "75vw", "400px", "min(960px, 90vw)". Defaults to 75vw. */
  width?: string;
  side?: "left" | "right";
  class?: string;
  /** Optional id so the Drawer can be aria-labelled from outside. */
  id?: string;
  children?: JSX.Element;
}

const closeIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

export function Drawer(props: DrawerProps): JSX.Element {
  // Lock body scroll + listen for Escape while the drawer is open.
  createEffect(() => {
    if (!props.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", onKey);
    onCleanup(() => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    });
  });

  const side = () => props.side ?? "right";
  const width = () => props.width ?? "75vw";

  return (
    <Show when={props.open}>
      <Portal>
        <div class="ui-drawer-root" role="presentation">
          <div
            class="ui-drawer-backdrop"
            onClick={() => props.onClose()}
            aria-hidden="true"
          />
          <aside
            class={`ui-drawer ui-drawer--${side()} ${props.class ?? ""}`.trim()}
            style={{ width: width() }}
            role="dialog"
            aria-modal="true"
            id={props.id}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              class="ui-drawer__close"
              aria-label="Close drawer"
              onClick={() => props.onClose()}
              innerHTML={closeIcon}
            />
            {props.children}
          </aside>
        </div>
      </Portal>
    </Show>
  );
}
