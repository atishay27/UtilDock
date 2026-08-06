/**
 * The three primitives every localised string goes through.
 *
 * Kept in its own module with no dictionary imports, because the React islands
 * import it. Anything that reaches for a dictionary here would drag all eight
 * of them into the client bundle, which is the one thing this whole design
 * exists to avoid.
 */

export interface PluralForms {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  /** Required: every language has this category, and it is the fallback. */
  other: string;
}

/** Identity, but it pins the type so `typeof en` reports PluralForms. */
export const p = (forms: PluralForms): PluralForms => forms;

export type Vars = Record<string, string | number>;

/**
 * Replace `{name}` with a value. An unknown placeholder is left standing rather
 * than blanked — a visible `{count}` in a translation is a bug report; a silent
 * empty string is a mystery.
 */
export function fill(template: string, vars: Vars = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(vars, key) ? String(vars[key]) : match,
  );
}

/**
 * Pick the plural form the language actually uses, via `Intl.PluralRules` —
 * built into the browser, so correct Russian (one/few/many/other) and correct
 * Japanese (other, always) cost nothing.
 */
export function plural(lang: string, forms: PluralForms, count: number, vars: Vars = {}): string {
  let category: Intl.LDMLPluralRule = 'other';
  try {
    category = new Intl.PluralRules(lang).select(count);
  } catch {
    /* An unknown tag falls back to `other`, which is always present. */
  }
  return fill(forms[category] ?? forms.other, { count, ...vars });
}

// --- Inline markup ----------------------------------------------------------

export type RichToken =
  | { t: 'text'; v: string }
  | { t: 'strong'; v: string }
  | { t: 'code'; v: string }
  | { t: 'link'; v: string; href: string };

const RICH = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * The whole markup vocabulary: `**bold**`, `` `code` `` and `[label](href)`.
 *
 * Prose has to carry emphasis and links, and the alternatives were both worse:
 * splitting every sentence into fragments around its markup makes a translation
 * unreadable and ungrammatical in languages that reorder clauses, and handing
 * raw HTML from a dictionary to `set:html` puts an injection point in a file
 * that will be edited by whoever is translating. This parses to tokens, and the
 * renderers emit elements — so a stray `<script>` in a translation is text.
 */
export function parseRich(input: string): RichToken[] {
  const tokens: RichToken[] = [];
  let last = 0;

  for (const match of input.matchAll(RICH)) {
    const at = match.index;
    if (at > last) tokens.push({ t: 'text', v: input.slice(last, at) });

    const [, bold, code, label, href] = match;
    if (bold !== undefined) tokens.push({ t: 'strong', v: bold });
    else if (code !== undefined) tokens.push({ t: 'code', v: code });
    else if (label !== undefined && href !== undefined) tokens.push({ t: 'link', v: label, href });

    last = at + match[0].length;
  }

  if (last < input.length) tokens.push({ t: 'text', v: input.slice(last) });
  return tokens;
}
