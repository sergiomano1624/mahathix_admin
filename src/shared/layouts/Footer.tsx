import type { JSX } from "solid-js";
import { For } from "solid-js";
import { footerMenu, type MenuItem } from "@/shared/config/menu";
import "./Footer.css";

export interface FooterProps {
  menu?: MenuItem[];
  note?: string;
}

export function Footer(props: FooterProps = {}): JSX.Element {
  const items = () => props.menu ?? footerMenu;
  const note = () => props.note ?? `© ${new Date().getFullYear()} Mahathix Admin. One catalog. Every channel.`;
  return (
    <footer class="footer">
      <p>{note()}</p>
      <nav class="footer__links" aria-label="Legal">
        <For each={items()}>{(item) => <a href={item.href}>{item.label}</a>}</For>
      </nav>
    </footer>
  );
}
