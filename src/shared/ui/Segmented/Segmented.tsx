import type { JSX } from "solid-js";
import { For, Show, createSignal, onMount } from "solid-js";
import "./Segmented.css";

export interface SegmentedOption {
  value: string;
  label: string;
  badge?: string;
}

export interface SegmentedProps {
  id: string;
  label: string;
  options: SegmentedOption[];
  value?: string;
  class?: string;
  onChange?: (value: string) => void;
}

export function Segmented(props: SegmentedProps): JSX.Element {
  const [active, setActive] = createSignal(props.value ?? props.options[0]?.value ?? "");
  let groupRef: HTMLDivElement | undefined;
  let thumbRef: HTMLSpanElement | undefined;

  const moveThumb = (btn: HTMLButtonElement | null) => {
    if (!btn || !thumbRef) return;
    thumbRef.style.width = `${btn.offsetWidth}px`;
    thumbRef.style.transform = `translateX(${btn.offsetLeft}px)`;
  };

  onMount(() => {
    const el = groupRef?.querySelector<HTMLButtonElement>(".segmented__option.is-active");
    requestAnimationFrame(() => moveThumb(el ?? null));
  });

  const select = (value: string, el: HTMLButtonElement) => {
    setActive(value);
    moveThumb(el);
    props.onChange?.(value);
  };

  return (
    <div
      class={`segmented${props.class ? ` ${props.class}` : ""}`}
      id={props.id}
      role="group"
      aria-label={props.label}
      ref={groupRef}
    >
      <span class="segmented__thumb" aria-hidden="true" ref={thumbRef} />
      <For each={props.options}>
        {(option) => (
          <button
            class={`segmented__option${option.value === active() ? " is-active" : ""}`}
            type="button"
            role="radio"
            aria-checked={option.value === active() ? "true" : "false"}
            data-value={option.value}
            onClick={(e) => select(option.value, e.currentTarget)}
          >
            {option.label}
            <Show when={option.badge}>
              <span class="segmented__badge">{option.badge}</span>
            </Show>
          </button>
        )}
      </For>
    </div>
  );
}
