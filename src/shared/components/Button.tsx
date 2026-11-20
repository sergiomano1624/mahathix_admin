import { Show, type JSX } from "solid-js";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  /** SVG string placed before the label. */
  icon?: string;
  /** SVG string placed after the label. */
  iconEnd?: string;
  /** Renders only the icon (square). Pair with `aria-label`. */
  iconOnly?: boolean;
  /** Stretches the button to the width of its container. */
  block?: boolean;
  disabled?: boolean;
  class?: string;
  onClick?: (e: MouseEvent) => void;
  children?: JSX.Element;
  "aria-label"?: string;
  title?: string;
}

export function Button(props: ButtonProps): JSX.Element {
  const variant = () => props.variant ?? "primary";
  const size = () => props.size ?? "md";

  const classes = () =>
    [
      "ui-btn",
      `ui-btn--${variant()}`,
      `ui-btn--${size()}`,
      props.iconOnly ? "ui-btn--icon-only" : "",
      props.block ? "ui-btn--block" : "",
      props.class ?? "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <button
      type={props.type ?? "button"}
      class={classes()}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      title={props.title}
      onClick={(e) => props.onClick?.(e)}
    >
      <Show when={props.icon}>
        <span class="ui-btn__icon" innerHTML={props.icon} />
      </Show>
      <Show when={!props.iconOnly && props.children}>
        <span class="ui-btn__label">{props.children}</span>
      </Show>
      <Show when={props.iconEnd}>
        <span class="ui-btn__icon ui-btn__icon--end" innerHTML={props.iconEnd} />
      </Show>
    </button>
  );
}
