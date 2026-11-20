/** Icons used by the project dashboard. */

const stroke = (paths: string, width = 1.9) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const boxIcon = stroke(
  '<path d="M20.4 7.9v8.2a1.8 1.8 0 0 1-1 1.6l-6.5 3.3a2 2 0 0 1-1.8 0l-6.5-3.3a1.8 1.8 0 0 1-1-1.6V7.9" /><path d="M3.9 7.4 12 3.3l8.1 4.1L12 11.6Z" /><path d="M12 11.6V20" />',
);

export const layersIcon = stroke(
  '<path d="m12 3.4 8.4 4.2-8.4 4.2-8.4-4.2Z" /><path d="m3.6 12 8.4 4.2 8.4-4.2" /><path d="m3.6 16.4 8.4 4.2 8.4-4.2" />',
);

export const cartIcon = stroke(
  '<path d="M2.6 3.4h2.6l2.2 10.4h9.6l2-7.2H6.2" /><circle cx="9.4" cy="19" r="1.7" /><circle cx="16.8" cy="19" r="1.7" />',
);

export const nodesIcon = stroke(
  '<circle cx="6.2" cy="17.4" r="2.4" /><circle cx="17.8" cy="17.4" r="2.4" /><circle cx="12" cy="6.4" r="2.4" /><path d="m10.4 8.4-2.6 6.8" /><path d="m13.6 8.4 2.6 6.8" />',
);

export const plusIcon = stroke('<path d="M12 5.5v13" /><path d="M5.5 12h13" />', 2.3);

export const chevronDownIcon = stroke('<path d="m6.5 9.5 5.5 5.5 5.5-5.5" />', 2);

export const linkIcon = stroke(
  '<path d="M10.2 13.8a4 4 0 0 0 5.8.3l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.5 1.5" /><path d="M13.8 10.2a4 4 0 0 0-5.8-.3l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.5-1.5" />',
);

export const uploadIcon = stroke(
  '<path d="M4.6 15.4v2.8a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-2.8" /><path d="M12 15.4V4.2" /><path d="m7.4 8.8 4.6-4.6 4.6 4.6" />',
);

export const settingsIcon = stroke(
  '<circle cx="12" cy="12" r="3.1" /><path d="M18.9 14.3a1.5 1.5 0 0 0 .3 1.7l.1.1a1.9 1.9 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.6 1v.2a1.9 1.9 0 1 1-3.8 0v-.1a1.5 1.5 0 0 0-2.6-1l-.1.1a1.9 1.9 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1-2.6h-.2a1.9 1.9 0 1 1 0-3.8h.1a1.5 1.5 0 0 0 1-2.6l-.1-.1a1.9 1.9 0 1 1 2.6-2.6l.1.1a1.5 1.5 0 0 0 2.6-1v-.2a1.9 1.9 0 1 1 3.8 0v.1a1.5 1.5 0 0 0 2.6 1l.1-.1a1.9 1.9 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0 1 2.6h.2a1.9 1.9 0 1 1 0 3.8h-.1a1.5 1.5 0 0 0-1.3.9Z" />',
);

export const boltIcon = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M13.6 2 5.4 13.1h5.2L9.9 22l8.7-11.6h-5.5Z" />
</svg>`;

export const checkCircleIcon = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="10" fill="currentColor" />
  <path d="m7.8 12.3 2.8 2.8 5.6-5.9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

export const warningIcon = stroke(
  '<path d="M10.3 3.9 2.6 17.4a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9.4v4.2" /><path d="M12 17h.01" />',
);

export const importIcon = stroke(
  '<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4" /><path d="M12 7.6v7.2" /><path d="m8.6 11.4 3.4 3.4 3.4-3.4" />',
);

export const feedIcon = stroke(
  '<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="3.4" /><path d="M3.4 9h17.2" /><path d="M7.4 13.4h6" />',
);

export const clockIcon = stroke('<circle cx="12" cy="12" r="8.6" /><path d="M12 7.4V12l3 1.8" />');

export const calendarIcon = stroke(
  '<rect x="3.4" y="5" width="17.2" height="15.6" rx="3" /><path d="M3.4 9.6h17.2" /><path d="M8.4 3.4v3.2" /><path d="M15.6 3.4v3.2" />',
);

export const arrowRightIcon = stroke('<path d="M4.5 12h15" /><path d="m13.5 6 6 6-6 6" />', 2.2);

export const dotsVerticalIcon = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <circle cx="12" cy="5.5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="18.5" r="1.8" />
</svg>`;

export const crownIcon = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M3.4 8.4a1.4 1.4 0 0 1 2.2-1.1l3 2.1 2.2-4.2a1.4 1.4 0 0 1 2.4 0l2.2 4.2 3-2.1a1.4 1.4 0 0 1 2.2 1.4l-1.8 7.6a1.6 1.6 0 0 1-1.6 1.2H6.8a1.6 1.6 0 0 1-1.6-1.2L3.4 8.7Z" />
  <rect x="5.6" y="18.6" width="12.8" height="2.4" rx="1.2" />
</svg>`;

export const bellIcon = stroke(
  '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16S18 14 18 9Z" /><path d="M13.7 19.4a2 2 0 0 1-3.4 0" />',
);

export const globeIcon = stroke(
  '<circle cx="12" cy="12" r="8.6" /><path d="M3.6 12h16.8" /><path d="M12 3.4c2.4 2.4 3.6 5.4 3.6 8.6S14.4 18.2 12 20.6c-2.4-2.4-3.6-5.4-3.6-8.6S9.6 5.8 12 3.4Z" />',
  1.8,
);

export const sunIcon = stroke(
  '<circle cx="12" cy="12" r="4.2" /><path d="M12 2.6v2.2" /><path d="M12 19.2v2.2" /><path d="M4.4 4.4 6 6" /><path d="m18 18 1.6 1.6" /><path d="M2.6 12h2.2" /><path d="M19.2 12h2.2" /><path d="M4.4 19.6 6 18" /><path d="M18 6l1.6-1.6" />',
  1.8,
);

export const moonIcon = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.4 14.6A8.8 8.8 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11Z" />
</svg>`;

export const trophyIcon = stroke(
  '<path d="M7.4 4.4h9.2v5a4.6 4.6 0 0 1-9.2 0Z" /><path d="M7.4 6h-2a2 2 0 0 0 2 3.4" /><path d="M16.6 6h2a2 2 0 0 1-2 3.4" /><path d="M12 14v3.4" /><path d="M8.8 20.2h6.4" /><path d="M9.6 17.4h4.8" />',
);

export const gearIcon = settingsIcon;
