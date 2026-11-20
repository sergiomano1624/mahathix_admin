import type { JSX } from "solid-js";
import { For, Show, createSignal } from "solid-js";
import "./Tabs.css";

export interface TabItem {
  key: string;
  label: string;
  icon?: JSX.Element | string;
  badge?: string | number;
  subtext?: string;
  step?: number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  variant?: "default" | "stepper";
  size?: "sm" | "md" | "lg";
  class?: string;
  id?: string;
  ariaLabel?: string;
  onChange?: (key: string) => void;
}

const renderIcon = (icon: JSX.Element | string | undefined) =>
  typeof icon === "string" ? <span innerHTML={icon} /> : icon;

export function Tabs(props: TabsProps): JSX.Element {
  const [active, setActive] = createSignal(props.activeKey ?? props.items[0]?.key ?? "");

  const classes = () =>
    [
      "tabs",
      props.variant === "stepper" && "tabs--stepper",
      props.size && props.size !== "md" && `tabs--${props.size}`,
      props.class,
    ].filter(Boolean).join(" ");

  const select = (item: TabItem) => {
    if (item.disabled) return;
    setActive(item.key);
    props.onChange?.(item.key);
  };

  return (
    <nav class={classes()} role="tablist" aria-label={props.ariaLabel ?? "Navigation tabs"} id={props.id}>
      <For each={props.items}>
        {(item, index) => {
          const isActive = () => item.key === active();
          const tabClasses = () =>
            ["tab", isActive() && "is-active", item.disabled && "is-disabled"].filter(Boolean).join(" ");
          return (
            <button
              class={tabClasses()}
              type="button"
              role="tab"
              aria-selected={isActive() ? "true" : "false"}
              data-tab={item.key}
              disabled={item.disabled}
              onClick={() => select(item)}
            >
              <Show
                when={props.variant === "stepper"}
                fallback={
                  <>
                    <Show when={item.icon}>
                      <span class="tab__icon">{renderIcon(item.icon)}</span>
                    </Show>
                    <span class="tab__label">{item.label}</span>
                    <Show when={item.badge !== undefined}>
                      <span class="tab__badge">{item.badge}</span>
                    </Show>
                  </>
                }
              >
                <span class="tab__step-num">{item.step ?? index() + 1}</span>
                <span class="tab__meta">
                  <strong class="tab__label">{item.label}</strong>
                  <Show when={item.subtext}>
                    <em class="tab__sub">{item.subtext}</em>
                  </Show>
                </span>
              </Show>
            </button>
          );
        }}
      </For>
    </nav>
  );
}
