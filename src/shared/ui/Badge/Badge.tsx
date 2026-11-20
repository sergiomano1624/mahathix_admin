import type { JSX } from "solid-js";
import { Show } from "solid-js";
import "./Badge.css";

export type BadgeTone = "green" | "gray" | "blue" | "amber" | "rose";

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
  class?: string;
}

export function Badge(props: BadgeProps): JSX.Element {
  const classes = () => ["badge", `badge--${props.tone ?? "green"}`, props.class].filter(Boolean).join(" ");
  return (
    <span class={classes()}>
      <Show when={props.dot}>
        <i class="badge__dot" />
      </Show>
      {props.label}
    </span>
  );
}
