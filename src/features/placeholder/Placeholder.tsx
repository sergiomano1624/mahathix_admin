import type { JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import { dashboardMenu } from "@/shared/config/menu";

export default function Placeholder(): JSX.Element {
  const location = useLocation();
  const label = () => {
    const match = dashboardMenu.find((m) => m.href === location.pathname);
    return match?.label ?? "Coming soon";
  };
  return (
    <div style={{ padding: "48px", "text-align": "center" }}>
      <h1 style={{ "font-size": "28px", "margin-bottom": "12px" }}>{label()}</h1>
      <p style={{ opacity: 0.6 }}>This section is coming soon in Mahathix Admin.</p>
    </div>
  );
}
