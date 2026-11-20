import type { JSX } from "solid-js";
import "./Avatar.css";

export type AvatarTone =
  | "navy" | "blue" | "green" | "violet" | "amber" | "rose" | "pink" | "indigo";

export interface AvatarProps {
  initials: string;
  tone?: AvatarTone;
  variant?: "soft" | "solid";
  shape?: "rounded" | "circle";
  size?: string;
  class?: string;
  title?: string;
}

export function Avatar(props: AvatarProps): JSX.Element {
  const classes = () =>
    [
      "avatar",
      `avatar--${props.variant ?? "soft"}`,
      `avatar--${props.tone ?? "blue"}`,
      (props.shape ?? "rounded") === "circle" && "avatar--circle",
      props.class,
    ]
      .filter(Boolean)
      .join(" ");
  return (
    <span
      class={classes()}
      style={props.size ? { "--avatar-size": props.size } : undefined}
      title={props.title}
      aria-hidden="true"
    >
      {props.initials}
    </span>
  );
}
