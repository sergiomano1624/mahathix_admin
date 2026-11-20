import type { JSX } from "solid-js";
import "./IconBadge.css";

export type IconBadgeTone = "blue" | "green" | "violet" | "amber" | "rose" | "indigo" | "plain";

export interface IconBadgeProps {
  icon: JSX.Element | string;
  tone?: IconBadgeTone;
  shape?: "rounded" | "circle";
  size?: string;
  radius?: string;
  iconSize?: string;
  class?: string;
  behind?: JSX.Element | string;
}

export function IconBadge(props: IconBadgeProps): JSX.Element {
  const classes = () =>
    ["icon-badge", (props.shape ?? "rounded") === "circle" && "icon-badge--circle", `is-${props.tone ?? "blue"}`, props.class]
      .filter(Boolean).join(" ");
  const style = () => {
    const s: Record<string, string> = {};
    if (props.size) s["--badge-size"] = props.size;
    if (props.radius) s["--badge-radius"] = props.radius;
    if (props.iconSize) s["--badge-icon"] = props.iconSize;
    return s;
  };
  return (
    <span class={classes()} style={style()}>
      {typeof props.behind === "string" ? <span innerHTML={props.behind} /> : props.behind}
      {typeof props.icon === "string" ? <span innerHTML={props.icon} /> : props.icon}
    </span>
  );
}
