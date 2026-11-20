import type { JSX } from "solid-js";
import { Show } from "solid-js";
import "./Base.css";

export interface BaseLayoutProps {
  children: JSX.Element;
  sidebar?: JSX.Element;
  header?: JSX.Element;
  footer?: JSX.Element;
  variant?: "app" | "plain";
  class?: string;
}

export function BaseLayout(props: BaseLayoutProps): JSX.Element {
  const classes = () =>
    ["layout", `layout--${props.variant ?? "app"}`, props.sidebar && "layout--with-sidebar", props.class]
      .filter(Boolean).join(" ");
  return (
    <div class={classes()}>
      {props.sidebar}
      <div class="layout__main">
        <Show when={props.header}>{props.header}</Show>
        <main class="layout__content">{props.children}</main>
        <Show when={props.footer}>{props.footer}</Show>
      </div>
    </div>
  );
}
