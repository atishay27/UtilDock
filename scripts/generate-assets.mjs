/**
 * Renders the static image assets (PWA icons, apple-touch-icon, OG card).
 *
 * Backgrounds are inline SVG so no binary needs keeping in sync with the design
 * tokens; lettering is composited separately because librsvg cannot reach the
 * self-hosted faces. Run `npm run fonts` first — the TTFs under scripts/.fonts/
 * are build-only and never served.
 *
 * Run `npm run assets` after changing the palette.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const sharp = (await import('sharp')).default;

const GROUND = '#0a0a0c';
const ANVIL = '#1b1d21';
const SCRIBE = '#454a52';
const COLD = '#5a5f66';
const DULL = '#7a1e12';
const CHERRY = '#ff4b00';
const HEAT = '#ffb400';
const WHITE_HOT = '#fff7f0';
const CHALK = '#f2ede6';
const TEMPER = '#a8a49d';

/**
 * The mark: three bars racked on the anvil, the top one at working heat.
 * Keeps the dock's three-slot silhouette, re-struck in iron.
 */
function markSvg(size, { background = ANVIL, plate = true } = {}) {
  const pad = size * 0.19;
  const bar = size * 0.14;
  const gap = size * 0.075;
  const width = size - pad * 2;
  const top = (size - (bar * 3 + gap * 2)) / 2;
  const stroke = size * 0.05;

  return `
    ${plate ? `<rect x="${stroke / 2}" y="${stroke / 2}" width="${size - stroke}" height="${size - stroke}" fill="${background}" stroke="${SCRIBE}" stroke-width="${stroke}"/>` : ''}
    <defs>
      <linearGradient id="heatbar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${DULL}"/>
        <stop offset="55%" stop-color="${CHERRY}"/>
        <stop offset="100%" stop-color="${HEAT}"/>
      </linearGradient>
    </defs>
    <rect x="${pad}" y="${top}" width="${width}" height="${bar}" fill="url(#heatbar)"/>
    <rect x="${pad}" y="${top + bar + gap}" width="${width}" height="${bar}" fill="${CHALK}" opacity="0.3"/>
    <rect x="${pad}" y="${top + (bar + gap) * 2}" width="${width * 0.62}" height="${bar}" fill="${CHALK}" opacity="0.16"/>
  `;
}

function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${markSvg(size)}</svg>`;
}

/** Maskable icons keep their content inside the inner safe zone. */
function maskableSvg(size) {
  const inner = size * 0.6;
  const offset = (size - inner) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${GROUND}"/>
    <g transform="translate(${offset} ${offset})">${markSvg(inner, { plate: false })}</g>
  </svg>`;
}

/** The OG card ground: forge black, scale flecks, and the billet across it. */
function ogGroundSvg(w, h) {
  let flecks = '';
  // Deterministic scatter — the same card every run.
  let seed = 7;
  const random = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  for (let i = 0; i < 260; i++) {
    const x = random() * w;
    const y = random() * h;
    const r = 0.5 + random() * 1.3;
    flecks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#000" opacity="${(0.25 + random() * 0.4).toFixed(2)}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="billet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${COLD}"/>
        <stop offset="26%" stop-color="${DULL}"/>
        <stop offset="52%" stop-color="${CHERRY}"/>
        <stop offset="72%" stop-color="${HEAT}"/>
        <stop offset="86%" stop-color="${WHITE_HOT}"/>
        <stop offset="100%" stop-color="${HEAT}"/>
      </linearGradient>
    </defs>

    <rect width="${w}" height="${h}" fill="${GROUND}"/>
    ${flecks}

    <g transform="translate(80 74)">${markSvg(56)}</g>

    <!-- The bar, struck across the lower third. -->
    <rect x="0" y="${h - 132}" width="${w}" height="64" fill="url(#billet)"/>
    <rect x="0" y="${h - 68}" width="${w}" height="68" fill="${ANVIL}"/>
    <rect x="0" y="${h - 68}" width="${w}" height="2" fill="${SCRIBE}"/>
  </svg>`;
}

async function render(svg, filename, width, height = width) {
  await sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toFile(join(publicDir, filename));
  console.log(`  ${filename}  ${width}x${height}`);
}

await mkdir(publicDir, { recursive: true });

await writeFile(
  join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${markSvg(32)}</svg>\n`,
);
console.log('  favicon.svg');

await render(iconSvg(180), 'apple-touch-icon.png', 180);
await render(iconSvg(192), 'icon-192.png', 192);
await render(iconSvg(512), 'icon-512.png', 512);
await render(maskableSvg(512), 'icon-maskable-512.png', 512);

/* The share card is not drawn here. It is a real page (src/pages/og.astro)
   rendered by the site's own CSS and self-hosted fonts, then captured to
   public/og-default.png — see the capture recipe in that file. Redrawing it in
   a build script guarantees drift; rendering the page cannot. */

console.log('\nAssets written to public/  (og-default.png is captured from /og)');
