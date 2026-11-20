import type { JSX } from "solid-js";
import { createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";
import ToastHost from "@/shared/toast/ToastHost";
import { clearNotifications } from "@/shared/toast/toast";
// Side-effect imports — initialise the reactive stores + global <html> data-* attributes.
import "@/shared/lib/theme";
import "@/shared/lib/customization";

export default function App(props: { children?: JSX.Element }) {
  const location = useLocation();
  let last = location.pathname;
  createEffect(() => {
    const next = location.pathname;
    if (next !== last) {
      clearNotifications();
      last = next;
      window.scrollTo({ top: 0 });
    }
  });

  return (
    <>
      {props.children}
      <ToastHost />
    </>
  );
}
