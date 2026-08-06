// @ts-check
/**
 * Deepen the clone before building, so the sitemap can date its pages.
 *
 * Cloudflare Pages checks the repo out with `--depth 1`. In a shallow clone
 * every file looks as though it was written in the single commit that was
 * fetched, so `scripts/content-dates.mjs` refuses to answer and the sitemap
 * ships with no `lastmod` at all. One fetch buys back the history it needs.
 *
 * Nothing here is load-bearing. A clone that is already complete — every local
 * build — exits before touching the network, and a fetch that fails for any
 * reason is swallowed: the build continues and the sitemap simply omits the
 * dates, which is what it did before this script existed.
 */
import { execFileSync } from 'node:child_process';

/** @param {string[]} args */
const git = (args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

try {
  if (git(['rev-parse', '--is-shallow-repository']).trim() !== 'true') process.exit(0);

  git(['fetch', '--unshallow', '--quiet']);
  console.log('  unshallow: fetched full history for sitemap lastmod');
} catch {
  console.warn('  unshallow: could not deepen the clone — sitemap will omit lastmod');
}
