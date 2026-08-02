import { create, type Delta } from 'jsondiffpatch';

/**
 * Structural JSON diffing.
 *
 * jsondiffpatch does the hard part (LCS matching on arrays, so an element
 * inserted at index 0 doesn't report every later element as changed). We then
 * flatten its nested delta into a flat, path-addressed change list, which is
 * what the UI actually renders.
 *
 * Object key order never appears in a delta, so "ignore key order" is the
 * default behaviour rather than an option.
 */

export type ChangeKind = 'added' | 'removed' | 'changed' | 'moved';

export interface Change {
  /** Dotted/bracketed path, e.g. `user.roles[2].name`. */
  path: string;
  kind: ChangeKind;
  left?: unknown;
  right?: unknown;
  /** For `moved`: the destination index. */
  toIndex?: number;
}

export interface DiffResult {
  changes: Change[];
  counts: Record<ChangeKind, number>;
  identical: boolean;
}

const differ = create({
  // Match array elements by a stable identity when one is available, so
  // reordered records are reported as moves rather than wholesale rewrites.
  objectHash: (item: unknown, index?: number) => {
    if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>;
      for (const key of ['id', '_id', 'key', 'uuid', 'name', 'slug']) {
        const candidate = record[key];
        if (typeof candidate === 'string' || typeof candidate === 'number') {
          return `${key}:${candidate}`;
        }
      }
    }
    return `$$index:${index}`;
  },
  arrays: { detectMove: true, includeValueOnMove: false },
  textDiff: { minLength: Number.MAX_SAFE_INTEGER, diffMatchPatch: undefined as never },
});

function joinPath(parent: string, segment: string, isArrayIndex: boolean): string {
  if (isArrayIndex) return `${parent}[${segment}]`;
  if (!parent) return segment;
  return /^[A-Za-z_$][\w$]*$/.test(segment) ? `${parent}.${segment}` : `${parent}[${JSON.stringify(segment)}]`;
}

function flatten(delta: Delta, parent: string, out: Change[]): void {
  if (!delta || typeof delta !== 'object') return;

  // A leaf delta is an array: [new] | [old, new] | [old, 0, 0] | ['', to, 3]
  if (Array.isArray(delta)) {
    if (delta.length === 1) out.push({ path: parent, kind: 'added', right: delta[0] });
    else if (delta.length === 2) out.push({ path: parent, kind: 'changed', left: delta[0], right: delta[1] });
    else if (delta[2] === 0) out.push({ path: parent, kind: 'removed', left: delta[0] });
    else if (delta[2] === 3) out.push({ path: parent, kind: 'moved', toIndex: delta[1] as number });
    return;
  }

  const record = delta as Record<string, Delta>;
  const isArray = record['_t'] === ('a' as unknown as Delta);

  for (const [key, child] of Object.entries(record)) {
    if (key === '_t') continue;
    // In an array delta, removals and moves are keyed with a leading underscore
    // and refer to indices in the *left* document.
    const isLeftIndex = isArray && key.startsWith('_');
    const segment = isLeftIndex ? key.slice(1) : key;
    flatten(child, joinPath(parent, segment, isArray), out);
  }
}

export function diffJson(left: unknown, right: unknown): DiffResult {
  const delta = differ.diff(left, right);
  const changes: Change[] = [];
  if (delta) flatten(delta, '', changes);

  // Stable, readable ordering: by path, then by kind.
  changes.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));

  const counts: Record<ChangeKind, number> = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const change of changes) counts[change.kind]++;

  return { changes, counts, identical: changes.length === 0 };
}
