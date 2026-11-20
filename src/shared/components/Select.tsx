import { For, Show, createSignal, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
  /** Secondary text shown under the label. */
  sub?: string;
  /** Inline SVG string rendered inside the swatch. */
  icon?: string;
  /** CSS background (gradient or color) for the option's swatch. */
  accent?: string;
}

export interface SelectProps {
  value: string | null;
  onChange: (v: string | null) => void;
  options: SelectOption[];
  /** Label shown when `value === null`. */
  placeholder?: string;
  /** SVG string for the placeholder swatch. */
  placeholderIcon?: string;
  /** Sub text shown on the "clear" row in the menu. */
  placeholderSub?: string;
  /** Adds a clear-selection row at the top of the menu. */
  allowClear?: boolean;
  /** Prefix text rendered inside the trigger (e.g. "Sort:"). */
  prefix?: string;
  /** Which edge of the trigger the menu anchors to. */
  align?: "left" | "right";
  /** Trigger's minimum width in px. */
  minWidth?: number;
  /** Menu's minimum width in px (defaults to 260). */
  menuMinWidth?: number;
  class?: string;
  "aria-label"?: string;
}

const chevronIcon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

export function Select(props: SelectProps): JSX.Element {
  const [open, setOpen] = createSignal(false);
  const [pos, setPos] = createSignal({ top: 0, left: 0, right: 0 });
  let btnRef: HTMLButtonElement | undefined;

  const align = () => props.align ?? "left";
  const selected = () => props.options.find((o) => o.value === props.value) ?? null;

  const toggle = () => {
    if (open()) {
      setOpen(false);
      return;
    }
    if (btnRef) {
      const r = btnRef.getBoundingClientRect();
      setPos({
        top: r.bottom + 6,
        left: r.left,
        right: window.innerWidth - r.right,
      });
    }
    setOpen(true);
  };

  const renderSwatch = (opt: SelectOption | null, isPlaceholder = false) => {
    if (isPlaceholder || !opt) {
      if (!props.placeholderIcon) return null;
      return (
        <span class="ui-select__swatch ui-select__swatch--empty" innerHTML={props.placeholderIcon} />
      );
    }
    if (opt.accent) {
      return (
        <span class="ui-select__swatch" style={{ background: opt.accent }}>
          <Show when={opt.icon}>
            <span innerHTML={opt.icon} />
          </Show>
        </span>
      );
    }
    if (opt.icon) {
      return <span class="ui-select__swatch ui-select__swatch--empty" innerHTML={opt.icon} />;
    }
    return null;
  };

  return (
    <div class={`ui-select ${props.class ?? ""}`.trim()}>
      <button
        ref={btnRef}
        type="button"
        class="ui-select__trigger"
        classList={{ "is-open": open(), "is-active": props.value !== null }}
        aria-haspopup="listbox"
        aria-expanded={open() ? "true" : "false"}
        aria-label={props["aria-label"]}
        style={{ "min-width": `${props.minWidth ?? 170}px` }}
        onClick={toggle}
      >
        <Show when={props.prefix}>
          <span class="ui-select__prefix">{props.prefix}</span>
        </Show>
        {renderSwatch(selected(), selected() === null)}
        <span class="ui-select__label">{selected()?.label ?? props.placeholder ?? "Select…"}</span>
        <span class="ui-select__chevron" classList={{ "is-open": open() }} innerHTML={chevronIcon} />
      </button>

      <Show when={open()}>
        <Portal>
          <div class="ui-select__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            class="ui-select__menu"
            role="listbox"
            style={{
              top: `${pos().top}px`,
              left: align() === "left" ? `${pos().left}px` : "auto",
              right: align() === "right" ? `${pos().right}px` : "auto",
              "min-width": `${props.menuMinWidth ?? 260}px`,
            }}
          >
            <Show when={props.allowClear}>
              <>
                <button
                  type="button"
                  class="ui-select__option"
                  classList={{ "is-active": props.value === null }}
                  role="option"
                  aria-selected={props.value === null ? "true" : "false"}
                  onClick={() => {
                    props.onChange(null);
                    setOpen(false);
                  }}
                >
                  {renderSwatch(null, true)}
                  <span class="ui-select__option-text">
                    <strong>{props.placeholder ?? "Clear"}</strong>
                    <Show when={props.placeholderSub}>
                      <em>{props.placeholderSub}</em>
                    </Show>
                  </span>
                </button>
                <div class="ui-select__divider" />
              </>
            </Show>
            <For each={props.options}>
              {(opt) => (
                <button
                  type="button"
                  class="ui-select__option"
                  classList={{ "is-active": props.value === opt.value }}
                  role="option"
                  aria-selected={props.value === opt.value ? "true" : "false"}
                  onClick={() => {
                    props.onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {renderSwatch(opt)}
                  <span class="ui-select__option-text">
                    <strong>{opt.label}</strong>
                    <Show when={opt.sub}>
                      <em>{opt.sub}</em>
                    </Show>
                  </span>
                </button>
              )}
            </For>
          </div>
        </Portal>
      </Show>
    </div>
  );
}
