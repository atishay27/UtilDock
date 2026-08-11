// @ts-check
/**
 * Per-page `lastmod` dates for the sitemap, read out of git history.
 *
 * The sitemap used to stamp every URL with `new Date()`, which told Google that
 * all 64 URLs changed every time the site was deployed — including deploys that
 * touched nothing but a stylesheet. Google only honours `lastmod` while it
 * matches what actually changed; a feed that cries wolf gets the signal dropped
 * for the whole site. So the date now comes from the last commit that touched
 * the files a page is actually built from.
 *
 * "Built from" deliberately means the page's own copy — its component, the tool
 * registry behind it, and the dictionary for its language. It does not mean the
 * header, the footer or the layout: retouching site chrome is not a change to
 * the page, and folding it in would collapse every date back to one again.
 *
 * If git cannot answer honestly — not a repository, no history, or a shallow
 * clone where every file appears to have been written in the same commit — this
 * returns null and the sitemap ships with no `lastmod` at all. Absent is a
 * weaker signal than accurate; it is a much better one than wrong.
 */
import { execFileSync } from 'node:child_process';

const REGISTRY = 'src/lib/tools.ts';

const HUB = 'src/components/pages/CategoryHub.astro';

/**
 * Root path (language stripped) → the files whose content that page renders.
 *
 * **Extend this when a tool or a category ships.** A route missing from here
 * gets no `lastmod`, which reads as "never changed" to `indexnow.mjs` and keeps
 * the page out of every submission from then on. The JWT encoder and both text
 * tools sat unlisted from the day they launched for exactly that reason.
 */
const PAGE_SOURCES = {
  '/': ['src/components/pages/Home.astro', REGISTRY],
  '/json': [HUB, REGISTRY],
  '/jwt': [HUB, REGISTRY],
  '/text': [HUB, REGISTRY],
  '/json/formatter': ['src/components/pages/tools/Formatter.astro', REGISTRY],
  '/json/viewer': ['src/components/pages/tools/Viewer.astro', REGISTRY],
  '/json/validator': ['src/components/pages/tools/Validator.astro', REGISTRY],
  '/json/diff': ['src/components/pages/tools/Diff.astro', REGISTRY],
  '/jwt/decoder': ['src/components/pages/tools/JwtDecoder.astro', REGISTRY],
  '/jwt/encoder': ['src/components/pages/tools/JwtEncoder.astro', REGISTRY],
  '/text/counter': ['src/components/pages/tools/TextCounter.astro', REGISTRY],
  '/text/formatter': ['src/components/pages/tools/TextFormatter.astro', REGISTRY],
  '/about': ['src/components/pages/About.astro'],
  '/privacy': ['src/components/pages/Privacy.astro'],
};

/**
 * English tool copy lives inline in the registry, so `en` adds only its UI
 * strings; every other language adds both of its override files.
 * @param {string} locale
 */
function dictionaries(locale) {
  const ui = `src/lib/i18n/ui/${locale}.ts`;
  return locale === 'en' ? [ui] : [ui, `src/lib/i18n/tools/${locale}.ts`];
}

/** @param {string[]} args */
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

/**
 * path → ISO date of the newest commit that touched it, or null if git history
 * is unavailable or too shallow to be believed.
 * @returns {Map<string, string> | null}
 */
function commitDates() {
  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') return null;

    /** @type {Map<string, string>} */
    const dates = new Map();
    let current = '';
    // Newest first, so the first time a path appears is its latest change.
    for (const line of git(['log', '--pretty=format:@%cI', '--name-only']).split('\n')) {
      if (line.startsWith('@')) current = line.slice(1);
      else if (line && !dates.has(line)) dates.set(line, current);
    }
    return dates.size > 0 ? dates : null;
  } catch {
    return null;
  }
}

/**
 * @returns {(rootPath: string, locale: string) => string | undefined}
 *   Resolves a page to its `lastmod`, or to undefined when it has none — an
 *   uncommitted file, an unmapped route, or git having declined to answer.
 */
export function lastmodLookup() {
  const dates = commitDates();
  if (!dates) {
    console.warn(
      '[sitemap] no usable git history (shallow clone?) — shipping without lastmod',
    );
    return () => undefined;
  }

  return (rootPath, locale) => {
    const sources = PAGE_SOURCES[/** @type {keyof typeof PAGE_SOURCES} */ (rootPath)];
    if (!sources) return undefined;

    const stamps = [...sources, ...dictionaries(locale)]
      .map((file) => dates.get(file))
      .filter(/** @returns {value is string} */ (value) => Boolean(value));

    // Sorting ISO-8601 strings sorts the instants they name.
    return stamps.length > 0 ? stamps.sort().at(-1) : undefined;
  };
}
