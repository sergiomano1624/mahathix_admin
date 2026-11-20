import type { JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import "./Button.css";

export type ButtonVariant = "primary" | "outline" | "provider";

export interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  href?: string;
  icon?: JSX.Element | string;
  iconEnd?: JSX.Element | string;
  loading?: boolean;
  block?: boolean;
  class?: string;
  disabled?: boolean;
  onClick?: JSX.EventHandler<HTMLButtonElement | HTMLAnchorElement, MouseEvent>;
  children?: JSX.Element;
  [key: string]: unknown;
}

const renderIcon = (icon: JSX.Element | string | undefined) =>
  typeof icon === "string" ? <span innerHTML={icon} /> : icon;

export function Button(allProps: ButtonProps): JSX.Element {
  const [local, rest] = splitProps(allProps, [
    "label", "variant", "type", "href", "icon", "iconEnd", "loading", "block", "class", "children",
  ]);
  const classes = () =>
    ["btn", `btn--${local.variant ?? "primary"}`, local.block && "btn--block", local.loading && "is-loading", local.class]
      .filter(Boolean).join(" ");
  const content = (
    <>
      <Show when={local.icon}>
        <span class="btn__logo">{renderIcon(local.icon)}</span>
      </Show>
      <span class="btn__spinner" aria-hidden="true" />
      <span class="btn__label">{local.children ?? local.label}</span>
      <Show when={local.iconEnd}>
        <span class="btn__logo btn__logo--end">{renderIcon(local.iconEnd)}</span>
      </Show>
    </>
  );
  return local.href ? (
    <a class={classes()} href={local.href} aria-busy={local.loading ? "true" : undefined} {...(rest as JSX.HTMLAttributes<HTMLAnchorElement>)}>
      {content}
    </a>
  ) : (
    <button
      class={classes()}
      type={local.type ?? "button"}
      aria-busy={local.loading ? "true" : undefined}
      disabled={(rest as { disabled?: boolean }).disabled || local.loading}
      {...(rest as JSX.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
