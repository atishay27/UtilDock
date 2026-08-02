/**
 * Renders the static image assets (PWA icons, apple-touch-icon, OG card) from
 * inline SVG so there are no binary source files to keep in sync with the
 * design tokens. Run with `npm run assets` after changing the brand colours.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const BG = '#0a0e14';
const SURFACE = '#18212c';
const LINE = '#26323f';
const ACCENT = '#22d3ee';
const TEXT = '#e4ecf3';
const MUTED = '#8a9bad';

/** The dock mark: three stacked slots, the top one lit. */
function markSvg(size, { rounded = true, background = SURFACE } = {}) {
  const r = rounded ? size * 0.22 : 0;
  const pad = size * 0.22;
  const slotHeight = size * 0.125;
  const gap = size * 0.078;
  const width = size - pad * 2;
  const top = (size - (slotHeight * 3 + gap * 2)) / 2;
  return `
    <rect width="${size}" height="${size}" rx="${r}" fill="${background}"/>
    <rect x="${pad}" y="${top}" width="${width}" height="${slotHeight}" rx="${slotHeight / 2}" fill="${ACCENT}"/>
    <rect x="${pad}" y="${top + slotHeight + gap}" width="${width}" height="${slotHeight}" rx="${slotHeight / 2}" fill="${TEXT}" opacity="0.35"/>
    <rect x="${pad}" y="${top + (slotHeight + gap) * 2}" width="${width * 0.62}" height="${slotHeight}" rx="${slotHeight / 2}" fill="${TEXT}" opacity="0.2"/>
  `;
}

function iconSvg(size, background) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${markSvg(size, { background })}</svg>`;
}

/** Maskable icons need their content inside the inner 80% safe zone. */
function maskableSvg(size) {
  const inner = size * 0.62;
  const offset = (size - inner) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${BG}"/>
    <g transform="translate(${offset} ${offset})">${markSvg(inner, { background: 'transparent' })}</g>
  </svg>`;
}

function ogSvg() {
  const w = 1200;
  const h = 630;
  const tools = ['JSON Viewer', 'JSON Validator', 'JSON Comparator', 'JSON Formatter'];
  const chipWidth = 246;
  const chips = tools
    .map((name, index) => {
      const x = 80 + index * (chipWidth + 16);
      return `
        <rect x="${x}" y="470" width="${chipWidth}" height="56" rx="12" fill="${SURFACE}" stroke="${LINE}"/>
        <text x="${x + chipWidth / 2}" y="505" text-anchor="middle" fill="${MUTED}"
              font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
              font-size="21">${name}</text>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="0%" r="70%">
        <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M56 0H0V56" fill="none" stroke="${LINE}" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="${w}" height="${h}" fill="${BG}"/>
    <rect width="${w}" height="${h}" fill="url(#grid)" opacity="0.55"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>

    <g transform="translate(80 96)">${markSvg(72)}</g>
    <text x="172" y="148" fill="${TEXT}"
          font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          font-size="46" font-weight="600">UtilDock</text>

    <text x="80" y="290" fill="${TEXT}"
          font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          font-size="72" font-weight="700">Your dock for</text>
    <text x="80" y="372" fill="${ACCENT}"
          font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          font-size="72" font-weight="700">developer utilities.</text>

    <text x="80" y="424" fill="${MUTED}"
          font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          font-size="26">Free, ad-free, and running entirely in your browser.</text>

    ${chips}
  </svg>`;
}

async function render(svg, filename, width, height = width) {
  const target = join(publicDir, filename);
  await sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toFile(target);
  console.log(`  ${filename}  ${width}x${height}`);
}

await mkdir(publicDir, { recursive: true });

// The favicon stays vector — crisp at every size and a fraction of the bytes.
await writeFile(
  join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${markSvg(32)}</svg>\n`,
);
console.log('  favicon.svg');

await render(iconSvg(180, SURFACE), 'apple-touch-icon.png', 180);
await render(iconSvg(192, SURFACE), 'icon-192.png', 192);
await render(iconSvg(512, SURFACE), 'icon-512.png', 512);
await render(maskableSvg(512), 'icon-maskable-512.png', 512);
await render(ogSvg(), 'og-default.png', 1200, 630);

console.log('Assets written to public/');
