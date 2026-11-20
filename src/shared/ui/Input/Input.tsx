import type { JSX } from "solid-js";
import { Show, createSignal, splitProps } from "solid-js";
import "./Input.css";

const eyeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3.2" /></svg>`;
const eyeOffIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 5.9A9.6 9.6 0 0 1 12 5.8c6 0 9.5 6.2 9.5 6.2a17 17 0 0 1-3.3 4.1" /><path d="M6.5 7.9A16.8 16.8 0 0 0 2.5 12S6 18.2 12 18.2a9.4 9.4 0 0 0 4-.9" /><path d="M9.8 9.9a3.2 3.2 0 0 0 4.4 4.6" /><path d="m3.6 3.6 16.8 16.8" /></svg>`;

export interface InputProps {
  id: string;
  label: string;
  name?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  placeholder?: string;
  icon?: JSX.Element | string;
  autocomplete?: string;
  inputmode?: JSX.InputHTMLAttributes<HTMLInputElement>["inputmode"];
  spellcheck?: boolean;
  required?: boolean;
  value?: string;
  labelHidden?: boolean;
  class?: string;
  error?: string;
  onInput?: JSX.InputEventHandler<HTMLInputElement, InputEvent>;
  onBlur?: JSX.FocusEventHandler<HTMLInputElement, FocusEvent>;
}

const renderIcon = (icon: JSX.Element | string | undefined) =>
  typeof icon === "string" ? <span innerHTML={icon} /> : icon;

export function Input(allProps: InputProps): JSX.Element {
  const [local, rest] = splitProps(allProps, ["id", "label", "name", "type", "icon", "labelHidden", "class", "error"]);
  const errorId = () => `${local.id}-error`;
  const fieldClass = () => ["field", local.error && "has-error", local.class].filter(Boolean).join(" ");
  return (
    <div class={fieldClass()}>
      <label class={`field__label${local.labelHidden ? " is-hidden" : ""}`} for={local.id}>{local.label}</label>
      <div class="control">
        <Show when={local.icon}>
          <span class="control__icon">{renderIcon(local.icon)}</span>
        </Show>
        <input
          class="control__input"
          id={local.id}
          name={local.name ?? local.id}
          type={local.type ?? "text"}
          aria-describedby={errorId()}
          aria-invalid={local.error ? "true" : "false"}
          {...(rest as JSX.InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
      <p class="field__error" id={errorId()}>{local.error ?? ""}</p>
    </div>
  );
}

export function PasswordInput(props: InputProps): JSX.Element {
  const [reveal, setReveal] = createSignal(false);
  const [local, rest] = splitProps(props, ["id", "label", "name", "icon", "labelHidden", "class", "error"]);
  const errorId = () => `${local.id}-error`;
  const fieldClass = () => ["field", local.error && "has-error", local.class].filter(Boolean).join(" ");
  return (
    <div class={fieldClass()}>
      <label class={`field__label${local.labelHidden ? " is-hidden" : ""}`} for={local.id}>{local.label}</label>
      <div class="control">
        <Show when={local.icon}>
          <span class="control__icon">{renderIcon(local.icon)}</span>
        </Show>
        <input
          class="control__input"
          id={local.id}
          name={local.name ?? local.id}
          type={reveal() ? "text" : "password"}
          aria-describedby={errorId()}
          aria-invalid={local.error ? "true" : "false"}
          {...(rest as JSX.InputHTMLAttributes<HTMLInputElement>)}
        />
        <button
          class={`control__toggle${reveal() ? " is-revealed" : ""}`}
          type="button"
          aria-label={reveal() ? "Hide password" : "Show password"}
          aria-pressed={reveal() ? "true" : "false"}
          onClick={() => setReveal((r) => !r)}
        >
          <span class="control__toggle-on" innerHTML={eyeIcon} />
          <span class="control__toggle-off" innerHTML={eyeOffIcon} />
        </button>
      </div>
      <p class="field__error" id={errorId()}>{local.error ?? ""}</p>
    </div>
  );
}

export interface TextareaProps extends Omit<InputProps, "type" | "icon"> {
  rows?: number;
}

export function Textarea(props: TextareaProps): JSX.Element {
  const [local, rest] = splitProps(props, ["id", "label", "name", "labelHidden", "class", "error", "rows"]);
  const errorId = () => `${local.id}-error`;
  const fieldClass = () => ["field", local.error && "has-error", local.class].filter(Boolean).join(" ");
  return (
    <div class={fieldClass()}>
      <label class={`field__label${local.labelHidden ? " is-hidden" : ""}`} for={local.id}>{local.label}</label>
      <div class="control control--textarea">
        <textarea
          class="control__input control__textarea"
          id={local.id}
          name={local.name ?? local.id}
          rows={local.rows ?? 3}
          aria-describedby={errorId()}
          aria-invalid={local.error ? "true" : "false"}
          {...(rest as JSX.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
      <p class="field__error" id={errorId()}>{local.error ?? ""}</p>
    </div>
  );
}
