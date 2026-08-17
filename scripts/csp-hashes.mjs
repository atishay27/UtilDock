/**
 * Fills in the two parts of public/_headers that cannot be written by hand.
 *
 * `{{SCRIPT_HASHES}}` becomes a SHA-256 per inline script, computed from the
 * built output — Astro emits its own island-hydration loaders, whose contents
 * change with most builds. style-src is left alone; see the note in _headers.
 *
 * `{{FONT_PRELOAD}}` becomes a Link: header mirroring the font preloads in the
 * built <head>, which is what Cloudflare's Early Hints reads. It is derived
 * from the HTML rather than from the font manifest so the header and the markup
 * cannot disagree: whatever the page asks for is what gets hinted.
 *
 * Runs from npm's postbuild hook.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const headersFile = join(dist, '_headers');
const PLACEHOLDER = '{{SCRIPT_HASHES}}';
const FONT_PLACEHOLDER = '{{FONT_PRELOAD}}';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (extname(entry.name) === '.html') out.push(path);
  }
  return out;
}

/**
 * Script types the browser never executes.
 *
 * A <script> whose type is not a JavaScript MIME type is a *data block*: the
 * HTML spec abandons "prepare the script" before the CSP check is reached, so
 * script-src does not apply to it and a hash for it buys nothing.
 *
 * Skipping them is not a micro-optimisation. Every one of these is JSON-LD, and
 * JSON-LD is per page — it carries the tool's name and description, so it
 * differs in every language. Hashing them made script-src grow by six entries
 * per locale, which at eight locales is fifty-odd hashes shipped in a response
 * header on every request, to permit code that never runs.
 */
const DATA_BLOCK = /\stype\s*=\s*["']?(application\/(ld\+)?json)["']?/i;

/** Every executable inline <script> body in the build, deduplicated. */
async function inlineScripts() {
  const bodies = new Set();
  for (const file of await htmlFiles(dist)) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      const [, attrs, body] = match;
      // Anything with a src is covered by 'self'; empty blocks need no hash.
      if (/\ssrc=/.test(attrs) || body.length === 0) continue;
      if (DATA_BLOCK.test(attrs)) continue;
      bodies.add(body);
    }
  }
  return bodies;
}

/**
 * The font preloads the built <head> actually asks for, in document order.
 * One page is enough — BaseLayout emits the same set on every page.
 */
async function fontPreloads() {
  const [page] = await htmlFiles(dist);
  const html = await readFile(page, 'utf8');
  return [...html.matchAll(/<link\b([^>]*\brel=["']?preload["']?[^>]*)>/g)]
    .map(([, attrs]) => attrs)
    .filter((attrs) => /\bas=["']?font["']?/.test(attrs))
    .map((attrs) => attrs.match(/\bhref=["']([^"']+)["']/)?.[1])
    .filter((href) => typeof href === 'string');
}

const bodies = await inlineScripts();
const hashes = [...bodies]
  .map((body) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  .sort();

const fonts = await fontPreloads();
if (fonts.length === 0) {
  console.error(
    '\n  csp-hashes: no font preloads found in the built HTML.\n' +
      '  Refusing to continue — the Link: header would ship empty.\n',
  );
  process.exit(1);
}
// crossorigin is not decoration: a font is fetched in CORS mode, and a hint
// without it preloads into a cache entry the real request cannot use.
const link = fonts.map((href) => `<${href}>; rel=preload; as=font; crossorigin`).join(', ');

let headers = await readFile(headersFile, 'utf8');

// Exactly one each, or the substitution is ambiguous — a stray mention in a
// comment would silently take the value and leave the real directive
// unreplaced.
for (const [token, what] of [
  [PLACEHOLDER, 'script-src'],
  [FONT_PLACEHOLDER, 'Link'],
]) {
  const occurrences = headers.split(token).length - 1;
  if (occurrences !== 1) {
    console.error(
      `\n  csp-hashes: expected exactly one ${token} in public/_headers, found ${occurrences}.\n` +
        `  Refusing to continue — the shipped ${what} would be wrong.\n`,
    );
    process.exit(1);
  }
}

headers = headers.replace(PLACEHOLDER, hashes.join(' ')).replace(FONT_PLACEHOLDER, link);
await writeFile(headersFile, headers);

console.log(`  csp-hashes: script-src pinned to ${hashes.length} inline hashes`);
console.log(`  csp-hashes: Link: preloading ${fonts.length} fonts — ${fonts.join(', ')}`);
