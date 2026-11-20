import type { JSX } from "solid-js";
import "./Progress.css";

export type ProgressTone = "blue" | "green" | "violet" | "amber" | "rose";

export interface ProgressProps {
  value: number;
  max: number;
  tone?: ProgressTone;
  label: string;
  class?: string;
}

export function Progress(props: ProgressProps): JSX.Element {
  const pct = () => (props.max > 0 ? Math.min(100, Math.round((props.value / props.max) * 100)) : 0);
  return (
    <div
      class={`progress progress--${props.tone ?? "blue"}${props.class ? ` ${props.class}` : ""}`}
      role="progressbar"
      aria-label={props.label}
      aria-valuenow={props.value}
      aria-valuemin="0"
      aria-valuemax={props.max}
    >
      <span class="progress__bar" style={{ "--progress": `${pct()}%` }} />
    </div>
  );
}
