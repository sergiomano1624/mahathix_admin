import { createSignal, createEffect } from "solid-js";

export type Theme = "light" | "dark";

const STORAGE_KEY = "mahathix:theme";

const read = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const [theme, setTheme] = createSignal<Theme>(read());

createEffect(() => {
  const t = theme();
  document.documentElement.dataset["theme"] = t;
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    /* ignore */
  }
});

export const currentTheme = () => theme();
export const applyTheme = (t: Theme) => setTheme(t);
export const toggleTheme = () => {
  const next: Theme = theme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
};
export { theme };
