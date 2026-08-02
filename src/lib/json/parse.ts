import jsonMap from 'json-source-map';

import { offsetToPosition, positionToOffset, type JsonError, type JsonStats } from './types';

export type { JsonError, JsonStats } from './types';
export { offsetToPosition, positionToOffset, formatBytes } from './types';

/**
 * JSON parsing with error locations good enough to point at in an editor.
 *
 * `JSON.parse` is the fast path, but V8's newer SyntaxError messages
 * ("Unexpected token 'x', ..."snippet"... is not valid JSON") dropped the
 * character offset entirely, so a failure is re-run through json-source-map's
 * hand-written parser, which still reports a precise position.
 */

export type ParseResult<T = unknown> =
  | { ok: true; value: T }
  | { ok: false; error: JsonError };

function extractOffset(message: string, text: string): number | null {
  const atPosition = message.match(/at position (\d+)/i);
  if (atPosition) return Number(atPosition[1]);

  const lineColumn = message.match(/line (\d+) column (\d+)/i);
  if (lineColumn) return positionToOffset(text, Number(lineColumn[1]), Number(lineColumn[2]));

  // Both engines phrase a truncated document this way, which means "at the end".
  if (/unexpected end of (json )?input|end of (the )?data/i.test(message)) return text.length;

  return null;
}

/** Strip engine-specific prefixes and positional suffixes from a parser message. */
function cleanMessage(message: string): string {
  return message
    .replace(/^JSON\.parse:\s*/i, '')
    .replace(/^JSON Parse error:\s*/i, '')
    .replace(/\s*in JSON at position \d+(\s*\(line \d+ column \d+\))?/i, '')
    .replace(/,\s*"[\s\S]*?"\s*is not valid JSON\.?$/i, '')
    .replace(/\s*is not valid JSON\.?$/i, '')
    .replace(/\s*at line \d+ column \d+.*$/i, '')
    .trim();
}

/**
 * json-source-map still emits the classic "… at position N" message, so it is
 * the authority on *where* a document broke.
 */
function locateWithFallbackParser(text: string): JsonError | null {
  try {
    jsonMap.parse(text);
    return null; // Parsed fine here — nothing useful to add.
  } catch (cause) {
    const raw = cause instanceof Error ? cause.message : String(cause);
    const offset = extractOffset(raw, text);
    if (offset === null) return null;
    const { line, column } = offsetToPosition(text, offset);
    return { message: cleanMessage(raw) || 'Invalid JSON', offset, line, column };
  }
}

export function parseJson<T = unknown>(text: string): ParseResult<T> {
  try {
    return { ok: true, value: JSON.parse(text) as T };
  } catch (cause) {
    const raw = cause instanceof Error ? cause.message : String(cause);
    const message = cleanMessage(raw) || 'Invalid JSON';
    const offset = extractOffset(raw, text);

    if (offset !== null) {
      const { line, column } = offsetToPosition(text, offset);
      return { ok: false, error: { message, offset, line, column } };
    }

    const located = locateWithFallbackParser(text);
    if (located) return { ok: false, error: located };

    return { ok: false, error: { message, offset: null, line: 1, column: 1 } };
  }
}

/** Walk a parsed value once to collect the counts shown in tool status bars. */
export function collectStats(value: unknown): JsonStats {
  const stats: JsonStats = { keys: 0, values: 0, arrays: 0, objects: 0, depth: 0 };

  const walk = (node: unknown, depth: number): void => {
    if (depth > stats.depth) stats.depth = depth;

    if (Array.isArray(node)) {
      stats.arrays++;
      for (const item of node) walk(item, depth + 1);
      return;
    }
    if (node !== null && typeof node === 'object') {
      stats.objects++;
      for (const [, child] of Object.entries(node)) {
        stats.keys++;
        walk(child, depth + 1);
      }
      return;
    }
    stats.values++;
  };

  walk(value, 1);
  return stats;
}
