/**
 * The operation protocol shared between the UI and the JSON worker.
 *
 * All heavy work (parse, format, schema validation, diff) runs in the worker,
 * which keeps ajv, jsondiffpatch and json-source-map out of the main-thread
 * bundle entirely and stops multi-megabyte documents from freezing the page.
 */

import { collectStats, parseJson } from './parse';
import type { JsonError, JsonStats } from './types';
import { formatJson, minifyJson, type IndentStyle } from './format';
import { diffJson, type DiffResult } from './diff';
import { validate, type ValidationResult } from './validate';

export type Request =
  | { op: 'parse'; text: string }
  | { op: 'format'; text: string; indent: IndentStyle; sortKeys: boolean }
  | { op: 'minify'; text: string; sortKeys: boolean }
  | { op: 'validate'; text: string; schema?: string }
  | { op: 'diff'; left: string; right: string };

export type Response =
  | { op: 'parse'; ok: true; value: unknown; stats: JsonStats }
  | { op: 'parse'; ok: false; error: JsonError }
  | { op: 'format' | 'minify'; ok: true; output: string; stats: JsonStats }
  | { op: 'format' | 'minify'; ok: false; error: JsonError }
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
      return {
        op: 'format',
        ok: true,
        output: formatJson(parsed.value, { indent: request.indent, sortKeys: request.sortKeys }),
        stats: collectStats(parsed.value),
      };
    }

    case 'minify': {
      const parsed = parseJson(request.text);
      if (!parsed.ok) return { op: 'minify', ok: false, error: parsed.error };
      return {
        op: 'minify',
        ok: true,
        output: minifyJson(parsed.value, request.sortKeys),
        stats: collectStats(parsed.value),
      };
    }

    case 'validate':
      return { op: 'validate', ok: true, result: validate(request.text, request.schema) };

    case 'diff': {
      const left = parseJson(request.left);
      if (!left.ok) return { op: 'diff', ok: false, side: 'left', error: left.error };
      const right = parseJson(request.right);
      if (!right.ok) return { op: 'diff', ok: false, side: 'right', error: right.error };
      return { op: 'diff', ok: true, result: diffJson(left.value, right.value) };
    }
  }
}

/** Narrow a Response to the variant matching a given op. */
export type ResponseFor<O extends Request['op']> = Extract<Response, { op: O }>;
