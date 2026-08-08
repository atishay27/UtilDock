// @ts-check
/**
 * IndexNow: tell the search engines that honour it which URLs just changed.
 *
 * A sitemap is a standing invitation — it says "here is everything, come back
 * whenever". IndexNow is a knock on the door. Bing, Yandex, Seznam, Naver and
 * Yep accept a pushed list of changed URLs and fetch them within hours instead
 * of whenever a crawler next wanders past. Google does not participate, so this
 * supplements the sitemap and never replaces it.
 *
 * The one rule that shapes this script: **submitting URLs that did not change
 * is the abuse pattern the protocol polices.** A host that pushes its whole
 * sitemap on every deploy gets throttled or ignored, which is worse than never
 * having submitted at all. So the default submits only what actually moved,
 * decided by the `lastmod` dates the sitemap already derives from git history
 * (see content-dates.mjs) compared against the last run. Deploying a stylesheet
 * change therefore submits nothing, which is the correct number.
 *
 * That comparison degrades safely. If git cannot answer — a shallow clone, no
 * history — the sitemap ships without `lastmod`, and this submits only URLs it
 * has never seen before. Under-submitting costs a few days of latency on one
 * engine; over-submitting costs the host's standing with all of them.
 *
 * There is no server here and there never will be. This runs on a machine that
 * already has the build, posts a list of public URLs read out of the public
 * sitemap, and exits. No visitor data of any kind is involved, so none of the
 * privacy guarantees in /privacy are touched by it.
 *
 *   node scripts/indexnow.mjs --init      generate the key file (once, ever)
 *   node scripts/indexnow.mjs             submit whatever changed
 *   node scripts/indexnow.mjs --dry-run   print what would be submitted
 *   node scripts/indexnow.mjs --all       submit every URL — rarely correct, see above
 */
import { randomBytes } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const PUBLIC = 'public';
const STATE_FILE = path.join('.indexnow', 'state.json');
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** The protocol allows 8–128 chars of [a-zA-Z0-9-]; we mint 32 hex. */
const KEY_FILENAME = /^[a-f0-9]{32}\.txt$/;

/** IndexNow caps a submission at 10,000 URLs. We are two orders of magnitude under. */
const MAX_URLS = 10_000;

/**
 * The key is not a credential. It is published at a public URL on purpose: it
 * proves only that whoever submitted the list can write to this host, which is
 * the entire security model. Leaking it lets someone tell Bing that our pages
 * changed. Nothing else. Do not treat its presence in public/ as a mistake.
 * @returns {Promise<string | null>}
 */
async function findKey() {
  const fromEnv = process.env.INDEXNOW_KEY;
  if (fromEnv) return fromEnv.trim();

  const entries = await readdir(PUBLIC);
  const match = entries.find((name) => KEY_FILENAME.test(name));
  if (!match) return null;

  // The filename is the key, and the file must contain it. A mismatch means the
  // file was hand-edited, and submitting against it would 403 without saying why.
  const key = match.slice(0, -'.txt'.length);
  const body = (await readFile(path.join(PUBLIC, match), 'utf8')).trim();
  if (body !== key) {
    throw new Error(`${PUBLIC}/${match} should contain exactly "${key}", but contains "${body}".`);
  }
  return key;
}

/** @returns {Promise<string>} the key that was created */
async function initKey() {
  const existing = await findKey();
  if (existing) {
    console.log(`A key already exists: ${existing}`);
    console.log('Rotating it would orphan the old one at the engines. Keeping it.');
    return existing;
  }

  const key = randomBytes(16).toString('hex');
  await writeFile(path.join(PUBLIC, `${key}.txt`), key, 'utf8');
  console.log(`Wrote ${PUBLIC}/${key}.txt`);
  console.log('Commit and deploy it before submitting — the engines fetch it to verify.');
  return key;
}

/**
 * Every `<url>` in the built sitemap, as loc → lastmod. Parsing our own
 * generated XML with a regex is fine; it is not parsing the open web.
 * @returns {Promise<Map<string, string>>}
 */
async function readSitemap() {
  const index = path.join(DIST, 'sitemap-index.xml');
  if (!existsSync(index)) {
    throw new Error(`No ${index}. Run \`npm run build\` first — this reads the built sitemap.`);
  }

  const children = [...(await readFile(index, 'utf8')).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => path.join(DIST, path.basename(match[1])),
  );

  /** @type {Map<string, string>} */
  const urls = new Map();
  for (const child of children) {
    const xml = await readFile(child, 'utf8');
    for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!loc) continue;
      urls.set(loc, block[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '');
    }
  }
  return urls;
}

/** @returns {Promise<Record<string, string>>} */
async function loadState() {
  if (!existsSync(STATE_FILE)) return {};
  try {
    return JSON.parse(await readFile(STATE_FILE, 'utf8'));
  } catch {
    // A corrupt state file must not wedge the script. Treating it as empty
    // resubmits everything once, which is noisy but recoverable.
    console.warn(`${STATE_FILE} is unreadable; treating every URL as new.`);
    return {};
  }
}

/** @param {Map<string, string>} urls */
async function saveState(urls) {
  await mkdir(path.dirname(STATE_FILE), { recursive: true });
  await writeFile(STATE_FILE, `${JSON.stringify(Object.fromEntries(urls), null, 2)}\n`, 'utf8');
}

/**
 * Refuse to submit until the key is actually reachable. The engines fetch it to
 * verify the submission, so posting before the deploy lands earns a 403 whose
 * message does not explain itself.
 * @param {string} origin
 * @param {string} key
 */
async function assertKeyIsLive(origin, key) {
  const location = `${origin}/${key}.txt`;
  let response;
  try {
    response = await fetch(location, { cache: 'no-store' });
  } catch (error) {
    throw new Error(`Could not reach ${location}: ${error instanceof Error ? error.message : error}`);
  }
  if (!response.ok) {
    throw new Error(`${location} returned ${response.status}. Deploy the key file first.`);
  }
  const body = (await response.text()).trim();
  if (body !== key) {
    throw new Error(`${location} serves "${body}", not the key. Is an old build deployed?`);
  }
  return location;
}

/**
 * @param {string} origin
 * @param {string} key
 * @param {string} keyLocation
 * @param {string[]} urlList
 */
async function submit(origin, key, keyLocation, urlList) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList }),
  });

  // 200 accepted, 202 accepted with the key still being validated. Both are wins.
  if (response.status === 200 || response.status === 202) {
    console.log(`Submitted ${urlList.length} URL${urlList.length === 1 ? '' : 's'} (HTTP ${response.status}).`);
    return true;
  }

  /** @type {Record<number, string>} */
  const explanations = {
    400: 'Malformed request — the URL list or key format was rejected.',
    403: 'Key rejected. The engines could not verify the key file at its published location.',
    422: 'URLs do not all belong to the submitted host, or the key does not match.',
    429: 'Rate limited. Too many submissions — this is what submitting unchanged URLs earns.',
  };
  console.error(`IndexNow refused the submission: HTTP ${response.status}`);
  console.error(explanations[response.status] ?? (await response.text()).slice(0, 400));
  return false;
}

async function main() {
  const args = new Set(process.argv.slice(2));

  if (args.has('--init')) {
    await initKey();
    return;
  }

  const key = await findKey();
  if (!key) {
    throw new Error('No key file found. Run `node scripts/indexnow.mjs --init` first.');
  }

  const urls = await readSitemap();
  const origin = new URL([...urls.keys()][0]).origin;

  const previous = await loadState();
  const changed = args.has('--all')
    ? [...urls.keys()]
    : [...urls].filter(([loc, lastmod]) => previous[loc] !== lastmod).map(([loc]) => loc);

  if (changed.length === 0) {
    console.log(`Nothing changed across ${urls.size} URLs. Not submitting.`);
    return;
  }
  if (changed.length > MAX_URLS) {
    throw new Error(`${changed.length} URLs exceeds the ${MAX_URLS} per-submission cap.`);
  }

  if (args.has('--dry-run')) {
    console.log(`Would submit ${changed.length} of ${urls.size} URLs to ${origin}:`);
    for (const url of changed) console.log(`  ${url}`);
    return;
  }

  const keyLocation = await assertKeyIsLive(origin, key);
  if (await submit(origin, key, keyLocation, changed)) {
    // Only record success. A failed submission must stay pending, or the next
    // run would consider these URLs done and they would never be submitted.
    await saveState(urls);
  } else {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
