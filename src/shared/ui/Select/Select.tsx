import type { JSX } from "solid-js";
import { For, splitProps } from "solid-js";
import "./Select.css";

const chevron = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.5 5.5 5.5 5.5-5.5" /></svg>`;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value?: string;
  name?: string;
  labelHidden?: boolean;
  class?: string;
  onChange?: JSX.EventHandler<HTMLSelectElement, Event>;
}

export function Select(allProps: SelectProps): JSX.Element {
  const [local, rest] = splitProps(allProps, ["id", "label", "options", "value", "name", "labelHidden", "class"]);
  return (
    <div class={`field field--select${local.class ? ` ${local.class}` : ""}`}>
      <label class={`field__label${local.labelHidden ? " is-hidden" : ""}`} for={local.id}>{local.label}</label>
      <div class="control control--select">
        <select
          class="control__select"
          id={local.id}
          name={local.name ?? local.id}
          value={local.value}
          {...(rest as JSX.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <For each={local.options}>{(o) => <option value={o.value}>{o.label}</option>}</For>
        </select>
        <span class="control__chevron" innerHTML={chevron} />
      </div>
    </div>
  );
}
