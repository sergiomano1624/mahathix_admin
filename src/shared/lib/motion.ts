/** Motion helpers shared by every view. */

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts every `[data-count-to]` element up from zero. */
export function animateCounters(root: ParentNode): void {
  const targets = root.querySelectorAll<HTMLElement>("[data-count-to]");
  const reduced = prefersReducedMotion();

  const format = (el: HTMLElement, value: number) => {
    const group = el.dataset["countGroup"] === "true";
    const suffix = el.dataset["countSuffix"] ?? "";
    el.textContent = (group ? value.toLocaleString("en-US") : String(value)) + suffix;
  };

  for (const el of targets) {
    const to = Number(el.dataset["countTo"] ?? 0);

    if (reduced) {
      format(el, to);
      continue;
    }

    const duration = 1400;
    const start = performance.now() + 350;

    const step = (now: number) => {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      format(el, Math.round(to * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    format(el, 0);
    requestAnimationFrame(step);
  }
}

/** Staggers the entrance animation of every `[data-reveal]` block. */
export function revealOnMount(root: ParentNode, step = 55): void {
  const blocks = root.querySelectorAll<HTMLElement>("[data-reveal]");
  blocks.forEach((block, index) => {
    block.style.setProperty("--reveal-delay", `${60 + index * step}ms`);
  });
  requestAnimationFrame(() => {
    for (const block of blocks) block.classList.add("is-revealed");
  });
}
