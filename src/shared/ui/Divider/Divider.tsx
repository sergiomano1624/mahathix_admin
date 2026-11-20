import type { JSX } from "solid-js";
import "./Divider.css";

export function Divider(props: { label: string; class?: string }): JSX.Element {
  return (
    <div class={`divider${props.class ? ` ${props.class}` : ""}`}>
      <span>{props.label}</span>
    </div>
  );
}
