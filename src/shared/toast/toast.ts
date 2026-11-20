import { createSignal } from "solid-js";

export type ToastTone = "success" | "error" | "warning" | "info";

export interface ToastEntry {
  id: number;
  message: string;
  tone: ToastTone;
  title?: string;
  duration: number;
}

const [toasts, setToasts] = createSignal<ToastEntry[]>([]);
let seq = 0;

export const toastsSignal = toasts;

export interface NotifyOptions {
  message: string;
  tone?: ToastTone;
  title?: string;
  duration?: number;
}

export function notify({ message, tone = "info", title, duration = 4200 }: NotifyOptions): () => void {
  const id = ++seq;
  const entry: ToastEntry = { id, message, tone, duration, ...(title ? { title } : {}) };
  setToasts((prev) => [...prev, entry]);
  const dismiss = () => setToasts((prev) => prev.filter((t) => t.id !== id));
  if (duration > 0) window.setTimeout(dismiss, duration);
  return dismiss;
}

export const toast = {
  success: (message: string, title?: string) => notify({ message, tone: "success", ...(title ? { title } : {}) }),
  error: (message: string, title?: string) => notify({ message, tone: "error", ...(title ? { title } : {}) }),
  warning: (message: string, title?: string) => notify({ message, tone: "warning", ...(title ? { title } : {}) }),
  info: (message: string, title?: string) => notify({ message, tone: "info", ...(title ? { title } : {}) }),
};

export function clearNotifications(): void {
  setToasts([]);
}

export function dismissToast(id: number): void {
  setToasts((prev) => prev.filter((t) => t.id !== id));
}
