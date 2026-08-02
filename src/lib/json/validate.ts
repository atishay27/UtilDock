import { Validator, type OutputUnit, type SchemaDraft } from '@cfworker/json-schema';
import jsonMap from 'json-source-map';

import { parseJson } from './parse';
import type { JsonError } from './types';

/**
 * JSON Schema validation with source positions.
 *
 * The validator interprets the schema rather than compiling it to JavaScript.
 * That matters here: it means the site works under a Content-Security-Policy
 * with no 'unsafe-eval', which is a load-bearing part of the promise that a
 * pasted document cannot escape the tab.
 *
 * Errors come back addressed by JSON Pointer; json-source-map tells us the
 * character range each pointer occupies, so every violation can be underlined
 * where it actually appears.
 */

export interface SchemaIssue {
  /** JSON Pointer into the instance, `''` for the root. */
  pointer: string;
  /** Human-readable path, e.g. `users[0].email`. */
  path: string;
  message: string;
  keyword: string;
  /** 1-based source range in the instance document, when it could be located. */
  from?: { line: number; column: number; offset: number };
  to?: { line: number; column: number; offset: number };
}

export type SchemaValidation =
  | { status: 'valid'; issues: [] }
  | { status: 'invalid'; issues: SchemaIssue[] }
  | { status: 'schema-error'; message: string; issues: [] };

/** Pick the dialect from $schema, defaulting to the current draft. */
function draftFor(schema: unknown): SchemaDraft {
  const dialect =
    schema && typeof schema === 'object'
      ? String((schema as Record<string, unknown>).$schema ?? '')
      : '';
  if (dialect.includes('2019-09')) return '2019-09';
  if (dialect.includes('draft-07')) return '7';
  if (dialect.includes('draft-04')) return '4';
  return '2020-12';
}

/**
 * Wrapper keywords report "Property X does not match schema" alongside the
 * specific child failure. Drop the wrapper when the specific one is present.
 */
const WRAPPER_KEYWORDS = new Set([
  'properties',
  'items',
  'prefixItems',
  'patternProperties',
  'dependentSchemas',
]);

/** `#/users/0/email` → `/users/0/email` */
function toPointer(instanceLocation: string): string {
  return instanceLocation.replace(/^#/, '');
}

export function pointerToPath(pointer: string): string {
  if (!pointer) return '(root)';
  return pointer
    .slice(1)
    .split('/')
    .map((segment) => segment.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce((path, segment) => {
      if (/^\d+$/.test(segment)) return `${path}[${segment}]`;
      if (!path) return segment;
      return /^[A-Za-z_$][\w$]*$/.test(segment)
        ? `${path}.${segment}`
        : `${path}[${JSON.stringify(segment)}]`;
    }, '');
}

/** Reword the library's sentences into the "<path> <message>" style the UI uses. */
function describe(unit: OutputUnit): string {
  const raw = unit.error.replace(/\.$/, '');
  const required = raw.match(/does not have required property "(.+)"$/);
  if (required) return `is missing required property "${required[1]}"`;

  const additional = raw.match(/should not have additional propert(?:y|ies) "(.+)"$/i);
  if (additional) return `has unexpected property "${additional[1]}"`;

  return raw.replace(/^Instance\s+/i, '').replace(/^String\s+/, '');
}

type Pointers = Record<
  string,
  {
    key?: { line: number; column: number; pos: number };
    keyEnd?: { line: number; column: number; pos: number };
    value?: { line: number; column: number; pos: number };
    valueEnd?: { line: number; column: number; pos: number };
  }
>;

/**
 * Build the source pointer map for an instance document. Returns null when the
 * document isn't parseable — the caller will have reported the syntax error.
 */
export function buildPointerMap(text: string): Pointers | null {
  try {
    return (jsonMap.parse(text) as { pointers: Pointers }).pointers;
  } catch {
    return null;
  }
}

function locate(pointers: Pointers | null, pointer: string, keyword: string) {
  if (!pointers) return {};
  const entry = pointers[pointer];
  if (!entry) return {};

  // A missing or unexpected property reads best underlined at the container's
  // key; everything else points at the offending value.
  const preferKey = keyword === 'required' || keyword === 'additionalProperties';
  const start = (preferKey && entry.key) || entry.value || entry.key;
  const end = (preferKey && entry.keyEnd) || entry.valueEnd || entry.keyEnd;
  if (!start || !end) return {};

  // json-source-map counts lines and columns from 0; we surface them 1-based.
  return {
    from: { line: start.line + 1, column: start.column + 1, offset: start.pos },
    to: { line: end.line + 1, column: end.column + 1, offset: end.pos },
  };
}

export interface ValidationResult {
  syntax: { ok: true } | { ok: false; error: JsonError };
  schema?: SchemaValidation;
}

export function validate(instanceText: string, schemaText?: string): ValidationResult {
  const parsed = parseJson(instanceText);
  if (!parsed.ok) return { syntax: { ok: false, error: parsed.error } };
  if (!schemaText || !schemaText.trim()) return { syntax: { ok: true } };

  const parsedSchema = parseJson(schemaText);
  if (!parsedSchema.ok) {
    return {
      syntax: { ok: true },
      schema: {
        status: 'schema-error',
        message: `The schema itself is not valid JSON — ${parsedSchema.error.message} (line ${parsedSchema.error.line})`,
        issues: [],
      },
    };
  }

  let output;
  try {
    // shortCircuit: false so every violation is reported, not just the first.
    const validator = new Validator(
      parsedSchema.value as object,
      draftFor(parsedSchema.value),
      false,
    );
    output = validator.validate(parsed.value);
  } catch (cause) {
    return {
      syntax: { ok: true },
      schema: {
        status: 'schema-error',
        message: cause instanceof Error ? cause.message : 'Could not evaluate the schema',
        issues: [],
      },
    };
  }

  if (output.valid) return { syntax: { ok: true }, schema: { status: 'valid', issues: [] } };

  const units = output.errors ?? [];
  const locations = new Set(units.map((unit) => toPointer(unit.instanceLocation)));

  const meaningful = units.filter((unit) => {
    if (!WRAPPER_KEYWORDS.has(unit.keyword)) return true;
    // Keep the wrapper only if nothing deeper explains the failure.
    const pointer = toPointer(unit.instanceLocation);
    for (const other of locations) {
      if (other !== pointer && other.startsWith(pointer === '' ? '/' : `${pointer}/`)) return false;
    }
    return true;
  });

  const pointers = buildPointerMap(instanceText);
  const issues: SchemaIssue[] = meaningful.map((unit) => {
    const pointer = toPointer(unit.instanceLocation);
    return {
      pointer,
      path: pointerToPath(pointer),
      message: describe(unit),
      keyword: unit.keyword,
      ...locate(pointers, pointer, unit.keyword),
    };
  });

  return { syntax: { ok: true }, schema: { status: 'invalid', issues } };
}
