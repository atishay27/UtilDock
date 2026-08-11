/**
 * The operation protocol shared between the UI and the JSON worker.
 *
 * All heavy work (parse, format, schema validation, diff) runs in the worker,
 * which keeps the schema validator, the diff engine and json-source-map out of
 * the main-thread bundle entirely and stops multi-megabyte documents from
 * freezing the page.
 */

import { collectStats, parseJson } from './parse';
import type { JsonError, JsonStats } from './types';
import { formatJson, minifyJson, stripNulls, type IndentStyle } from './format';
import { diffJson, type DiffResult } from './diff';
import { validate, type ValidationResult } from './validate';

export type Request =
  | { op: 'parse'; text: string }
  | { op: 'format'; text: string; indent: IndentStyle; sortKeys: boolean; removeNulls?: boolean }
  | { op: 'minify'; text: string; sortKeys: boolean; removeNulls?: boolean }
  | { op: 'validate'; text: string; schema?: string }
  /* `withRows` asks for the full aligned row model. The comparator draws its
     own comparison in CodeMirror and wants only the verdict and the counts, so
     it leaves this off — on a large pair the rows are tens of thousands of
     objects to structured-clone back across the worker boundary for nothing. */
  | { op: 'diff'; left: string; right: string; withRows?: boolean };

export type Response =
  | { op: 'parse'; ok: true; value: unknown; stats: JsonStats }
  | { op: 'parse'; ok: false; error: JsonError }
  /* `format` and `minify` are spelled out separately rather than shared as one
     `op: 'format' | 'minify'` member. `ResponseFor` extracts by op, and a
     member whose own op is a union only matches a request asking for that same
     union — so a caller running a lone `format` would narrow the reply to
     `never`. Two members, one op each, and every caller narrows correctly. */
  | { op: 'format'; ok: true; output: string; stats: JsonStats; nullsRemoved: number }
  | { op: 'format'; ok: false; error: JsonError }
  | { op: 'minify'; ok: true; output: string; stats: JsonStats; nullsRemoved: number }
  | { op: 'minify'; ok: false; error: JsonError }
  | { op: 'validate'; ok: true; result: ValidationResult }
  | { op: 'diff'; ok: true; result: DiffResult }
  | { op: 'diff'; ok: false; side: 'left' | 'right'; error: JsonError };

export function runOperation(request: Request): Response {
  switch (request.op) {
    case 'parse': {
      const parsed = parseJson(request.text);
      if (!parsed.ok) return { op: 'parse', ok: false, error: parsed.error };
      return { op: 'parse', ok: true, value: parsed.value, stats: collectStats(parsed.value) };
    }

    case 'format': {
      const parsed = parseJson(request.text);
      if (!parsed.ok) return { op: 'format', ok: false, error: parsed.error };
      /* The strip runs before the sort and before the stats, so the counts in
         the footer describe the document you are looking at rather than the
         one you pasted. */
      const cleaned = request.removeNulls
        ? stripNulls(parsed.value)
        : { value: parsed.value, removed: 0 };
      return {
        op: 'format',
        ok: true,
        output: formatJson(cleaned.value, { indent: request.indent, sortKeys: request.sortKeys }),
        stats: collectStats(cleaned.value),
        nullsRemoved: cleaned.removed,
      };
    }

    case 'minify': {
      const parsed = parseJson(request.text);
      if (!parsed.ok) return { op: 'minify', ok: false, error: parsed.error };
      const cleaned = request.removeNulls
        ? stripNulls(parsed.value)
        : { value: parsed.value, removed: 0 };
      return {
        op: 'minify',
        ok: true,
        output: minifyJson(cleaned.value, request.sortKeys),
        stats: collectStats(cleaned.value),
        nullsRemoved: cleaned.removed,
      };
    }

    case 'validate':
      return { op: 'validate', ok: true, result: validate(request.text, request.schema) };

    case 'diff': {
      const left = parseJson(request.left);
      if (!left.ok) return { op: 'diff', ok: false, side: 'left', error: left.error };
      const right = parseJson(request.right);
      if (!right.ok) return { op: 'diff', ok: false, side: 'right', error: right.error };
      const result = diffJson(left.value, right.value);
      return {
        op: 'diff',
        ok: true,
        result: request.withRows ? result : { ...result, rows: [] },
      };
    }
  }
}

/** Narrow a Response to the variant matching a given op. */
export type ResponseFor<O extends Request['op']> = Extract<Response, { op: O }>;
