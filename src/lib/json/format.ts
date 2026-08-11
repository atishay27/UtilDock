export type IndentStyle = '2' | '3' | '4' | 'tab';

export interface FormatOptions {
  indent: IndentStyle;
  /** Sort object keys alphabetically — makes diffs of generated JSON stable. */
  sortKeys: boolean;
}

export function indentFor(style: IndentStyle): string | number {
  return style === 'tab' ? '\t' : Number(style);
}

/** Recursively rebuild objects with their keys in alphabetical order. */
export function sortObjectKeys<T>(value: T): T {
  if (Array.isArray(value)) return value.map(sortObjectKeys) as T;
  if (value !== null && typeof value === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = sortObjectKeys((value as Record<string, unknown>)[key]);
    }
    return sorted as T;
  }
  return value;
}

/**
 * Drop every object property whose value is `null`.
 *
 * "Field" means object property, and only that. Nulls sitting in an array are
 * left where they are: removing one shifts every index after it, so a document
 * that used `data[3]` to mean something would quietly start meaning something
 * else. A tool that silently renumbers your data is worse than one that leaves
 * a null alone.
 *
 * Empty objects and arrays left behind by the strip are also kept — collapsing
 * them is a different rule, and guessing at it would be a second unannounced
 * edit to the document.
 */
export function stripNulls<T>(value: T): { value: T; removed: number } {
  let removed = 0;

  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(walk);
    if (node !== null && typeof node === 'object') {
      const kept: Record<string, unknown> = {};
      for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
        if (child === null) {
          removed++;
          continue;
        }
        kept[key] = walk(child);
      }
      return kept;
    }
    return node;
  };

  return { value: walk(value) as T, removed };
}

export function formatJson(value: unknown, options: FormatOptions): string {
  const prepared = options.sortKeys ? sortObjectKeys(value) : value;
  return JSON.stringify(prepared, null, indentFor(options.indent));
}

export function minifyJson(value: unknown, sortKeys = false): string {
  return JSON.stringify(sortKeys ? sortObjectKeys(value) : value);
}

/** Wrap a document as a JSON string literal — handy for embedding in configs. */
export function escapeToStringLiteral(text: string): string {
  return JSON.stringify(text);
}

/** Inverse of the above: turn a quoted/escaped literal back into raw text. */
export function unescapeFromStringLiteral(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    const parsed: unknown = JSON.parse(trimmed);
    if (typeof parsed === 'string') return parsed;
  }
  // Not a quoted literal — treat the whole thing as escaped content.
  const parsed: unknown = JSON.parse(`"${trimmed.replace(/"/g, '\\"')}"`);
  return typeof parsed === 'string' ? parsed : text;
}
