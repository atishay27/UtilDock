/**
 * Replaces `'unsafe-inline'` in the shipped script-src with a SHA-256 hash per
 * inline script, computed from the built output.
 *
 * Runs from npm's postbuild hook because the hashes cannot be written by hand:
 * Astro emits its own island-hydration loaders, whose contents change with most
 * builds. style-src is left alone — see the note in public/_headers.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const headersFile = join(dist, '_headers');
const PLACEHOLDER = '{{SCRIPT_HASHES}}';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (extname(entry.name) === '.html') out.push(path);
  }
  return out;
}

/** Every inline <script> body in the build, deduplicated. */
async function inlineScripts() {
  const bodies = new Set();
  for (const file of await htmlFiles(dist)) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      const [, attrs, body] = match;
      // Anything with a src is covered by 'self'; empty blocks need no hash.
      if (/\ssrc=/.test(attrs) || body.length === 0) continue;
      bodies.add(body);
    }
  }
  return bodies;
}

const bodies = await inlineScripts();
const hashes = [...bodies]
  .map((body) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  .sort();

let headers = await readFile(headersFile, 'utf8');

// Exactly one, or the substitution is ambiguous — a stray mention in a comment
// would silently take the hashes and leave the real directive unreplaced.
const occurrences = headers.split(PLACEHOLDER).length - 1;
if (occurrences !== 1) {
  console.error(
    `\n  csp-hashes: expected exactly one ${PLACEHOLDER} in public/_headers, found ${occurrences}.\n` +
      '  Refusing to continue — the shipped script-src would be wrong.\n',
  );
  process.exit(1);
}

headers = headers.replace(PLACEHOLDER, hashes.join(' '));
await writeFile(headersFile, headers);

console.log(`  csp-hashes: script-src pinned to ${hashes.length} inline hashes`);
