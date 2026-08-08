/**
 * Inline SVG icon paths, kept as raw strings so .astro (set:html) and React
 * (dangerouslySetInnerHTML) share one set with no library and no request.
 *
 * Drawn on a 24x24 grid; the consumer applies fill="none" stroke="currentColor".
 */

export const ICONS = {
  tree: '<rect x="9" y="2.5" width="6" height="5" rx="1.5"/><rect x="2.5" y="16.5" width="6" height="5" rx="1.5"/><rect x="15.5" y="16.5" width="6" height="5" rx="1.5"/><path d="M12 7.5v3.5M5.5 16.5v-3h13v3"/>',

  'check-shield':
    '<path d="M12 2.8 19 6v5.2c0 4.4-2.9 7.9-7 9.9-4.1-2-7-5.5-7-9.9V6l7-3.2Z"/><path d="m9 12 2.2 2.2L15.2 10"/>',

  diff: '<rect x="2.5" y="3.5" width="19" height="17" rx="2"/><path d="M12 3.5v17M5.5 12h3.5M15 12h3.5M16.75 10.25v3.5"/>',

  braces:
    '<path d="M8 3H7.2A2.2 2.2 0 0 0 5 5.2V9a2.2 2.2 0 0 1-2.2 2.2v1.6A2.2 2.2 0 0 1 5 15v3.8A2.2 2.2 0 0 0 7.2 21H8"/><path d="M16 3h.8A2.2 2.2 0 0 1 19 5.2V9a2.2 2.2 0 0 0 2.2 2.2v1.6A2.2 2.2 0 0 0 19 15v3.8a2.2 2.2 0 0 1-2.2 2.2H16"/>',

  key: '<circle cx="7.5" cy="15.5" r="4"/><path d="m10.4 12.6 8.1-8.1M16 5l3 3M13.5 7.5l3 3"/>',

  convert:
    '<path d="m16 3 4 4-4 4"/><path d="M20 7H8.5"/><path d="m8 21-4-4 4-4"/><path d="M4 17h11.5"/>',

  /* The decoder's key, turned the other way and stamping rather than opening —
     the encoder mints a token where the decoder reads one. */
  'key-stamp':
    '<circle cx="16.5" cy="8.5" r="4"/><path d="m13.6 11.4-8.1 8.1M8 15l3 3M10.5 12.5l3 3"/>',

  /* A rule with its graduations: the counter measures a piece of stock. */
  ruler:
    '<rect x="2.5" y="7" width="19" height="10" rx="1.5"/><path d="M7 7v3.5M11 7v5M15 7v3.5M19 7v5"/>',

  /* A plane taking a shaving off the surface — the formatter dresses text down
     to true rather than adding anything to it. */
  plane:
    '<path d="M3 15.5h18l-1.6 4a1.5 1.5 0 0 1-1.4 1H6a1.5 1.5 0 0 1-1.4-1L3 15.5Z"/><path d="M6.5 15.5V6a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 17.5 6v9.5"/><path d="M10 8.5h4"/>',

  /* --- UI icons --- */

  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',

  check: '<path d="m4.5 12.5 5 5 10-11"/>',

  download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M3.5 20.5h17"/>',

  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M3.5 20.5h17"/>',

  trash:
    '<path d="M3.5 6h17"/><path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"/><path d="M5.5 6.5 6.4 20a1.5 1.5 0 0 0 1.5 1.4h8.2a1.5 1.5 0 0 0 1.5-1.4l.9-13.5"/><path d="M10 10.5v6.5M14 10.5v6.5"/>',

  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',

  moon: '<path d="M20.5 14.3A8.7 8.7 0 0 1 9.7 3.5a8.7 8.7 0 1 0 10.8 10.8Z"/>',

  search: '<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16.2 16.2 4.3 4.3"/>',

  x: '<path d="m5.5 5.5 13 13M18.5 5.5l-13 13"/>',

  'arrow-right': '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',

  'chevron-right': '<path d="m9 5 7 7-7 7"/>',

  'chevron-down': '<path d="m5 9 7 7 7-7"/>',

  'chevron-up': '<path d="m5 15 7-7 7 7"/>',

  lock: '<rect x="4" y="10.5" width="16" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',

  zap: '<path d="M13.5 2.5 4 13.8h6.5L10 21.5 20 10.2h-6.5l0-7.7Z"/>',

  'ad-off':
    '<circle cx="12" cy="12" r="9.2"/><path d="m5.5 5.5 13 13"/>',

  sparkle:
    '<path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9l2-6.5Z"/>',

  menu: '<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>',

  github:
    '<path d="M9 19.5c-4.8 1.4-4.8-2.4-6.8-3M15.8 22v-3.6a3.1 3.1 0 0 0-.9-2.4c2.9-.3 6-1.4 6-6.4a5 5 0 0 0-1.4-3.4 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.5 0C6.8 2.4 5.7 2.7 5.7 2.7a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 4.2 9.7c0 4.9 3 6 5.9 6.4a3.1 3.1 0 0 0-.9 2.3V22"/>',
} as const;

export type IconKey = keyof typeof ICONS;
