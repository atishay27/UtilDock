/**
 * Flattens a parsed JSON value into the linear row list the tree viewer renders.
 * The flat array (rather than nested components) is what makes windowing work:
 * a 200k-node document still renders only the ~40 rows on screen.
 */

export type NodeKind = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';

export interface Row {
  /** JSONPath-ish identity, also used as the expand/collapse key. */
  path: string;
  depth: number;
  /** Object key or array index; null for the root. */
  key: string | null;
  keyIsIndex: boolean;
  kind: NodeKind;
  /** Primitives only. */
  value?: string | number | boolean | null;
  /** Containers only. */
  childCount?: number;
  expandable: boolean;
  expanded: boolean;
}

export function kindOf(value: unknown): NodeKind {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  switch (typeof value) {
    case 'object':
      return 'object';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    default:
      return 'string';
  }
}

export function childPath(parent: string, key: string, isIndex: boolean): string {
  if (isIndex) return `${parent}[${key}]`;
  return /^[A-Za-z_$][\w$]*$/.test(key) ? `${parent}.${key}` : `${parent}[${JSON.stringify(key)}]`;
}

interface Frame {
  value: unknown;
  path: string;
  depth: number;
  key: string | null;
  keyIsIndex: boolean;
}

/**
 * Walk the value depth-first, emitting a row per visible node.
 * `expanded` holds the paths of containers whose children should be included.
 */
export function buildRows(root: unknown, expanded: Set<string>): Row[] {
  const rows: Row[] = [];
  const stack: Frame[] = [{ value: root, path: '$', depth: 0, key: null, keyIsIndex: false }];

  while (stack.length > 0) {
    const frame = stack.pop()!;
    const kind = kindOf(frame.value);
    const isContainer = kind === 'object' || kind === 'array';
    const entries = isContainer
      ? kind === 'array'
        ? (frame.value as unknown[]).map((item, index) => [String(index), item] as const)
        : Object.entries(frame.value as Record<string, unknown>)
      : [];
    const isExpanded = isContainer && expanded.has(frame.path);

    rows.push({
      path: frame.path,
      depth: frame.depth,
      key: frame.key,
      keyIsIndex: frame.keyIsIndex,
      kind,
      value: isContainer ? undefined : (frame.value as Row['value']),
      childCount: isContainer ? entries.length : undefined,
      expandable: isContainer && entries.length > 0,
      expanded: isExpanded,
    });

    if (isExpanded) {
      // Push in reverse so the stack pops them back in document order.
      for (let i = entries.length - 1; i >= 0; i--) {
        const [key, value] = entries[i]!;
        stack.push({
          value,
          path: childPath(frame.path, key, kind === 'array'),
          depth: frame.depth + 1,
          key,
          keyIsIndex: kind === 'array',
        });
      }
    }
  }

  return rows;
}

/** Every container path in the document, for "expand all". */
export function allContainerPaths(root: unknown, limit = 50_000): Set<string> {
  const paths = new Set<string>();
  const stack: Array<{ value: unknown; path: string }> = [{ value: root, path: '$' }];

  while (stack.length > 0 && paths.size < limit) {
    const { value, path } = stack.pop()!;
    const kind = kindOf(value);
    if (kind !== 'object' && kind !== 'array') continue;
    paths.add(path);

    const entries =
      kind === 'array'
        ? (value as unknown[]).map((item, index) => [String(index), item] as const)
        : Object.entries(value as Record<string, unknown>);
    for (const [key, child] of entries) {
      stack.push({ value: child, path: childPath(path, key, kind === 'array') });
    }
  }

  return paths;
}

/** Container paths down to `depth` levels, used for the default view. */
export function pathsToDepth(root: unknown, depth: number): Set<string> {
  const paths = new Set<string>();
  const stack: Array<{ value: unknown; path: string; level: number }> = [
    { value: root, path: '$', level: 0 },
  ];

  while (stack.length > 0) {
    const { value, path, level } = stack.pop()!;
    const kind = kindOf(value);
    if (kind !== 'object' && kind !== 'array') continue;
    if (level >= depth) continue;
    paths.add(path);

    const entries =
      kind === 'array'
        ? (value as unknown[]).map((item, index) => [String(index), item] as const)
        : Object.entries(value as Record<string, unknown>);
    for (const [key, child] of entries) {
      stack.push({ value: child, path: childPath(path, key, kind === 'array'), level: level + 1 });
    }
  }

  return paths;
}

export interface SearchOutcome {
  /** Paths of nodes that matched, plus every ancestor needed to reach them. */
  visible: Set<string>;
  /** Paths that matched the query itself, for highlighting. */
  matches: Set<string>;
  /** Ancestors to force open so matches are reachable. */
  expand: Set<string>;
}

/** Find nodes whose key or primitive value contains `query` (case-insensitive). */
export function search(root: unknown, query: string): SearchOutcome {
  const needle = query.trim().toLowerCase();
  const visible = new Set<string>();
  const matches = new Set<string>();
  const expand = new Set<string>();
  if (!needle) return { visible, matches, expand };

  const walk = (value: unknown, path: string, key: string | null, ancestors: string[]): boolean => {
    const kind = kindOf(value);
    const keyHit = key !== null && key.toLowerCase().includes(needle);
    const valueHit =
      kind !== 'object' && kind !== 'array' && String(value).toLowerCase().includes(needle);

    let hasMatchBelow = false;
    if (kind === 'object' || kind === 'array') {
      const entries =
        kind === 'array'
          ? (value as unknown[]).map((item, index) => [String(index), item] as const)
          : Object.entries(value as Record<string, unknown>);
      const nextAncestors = [...ancestors, path];
      for (const [childKey, child] of entries) {
        if (walk(child, childPath(path, childKey, kind === 'array'), childKey, nextAncestors)) {
          hasMatchBelow = true;
        }
      }
    }

    if (keyHit || valueHit) {
      matches.add(path);
    }
    if (keyHit || valueHit || hasMatchBelow) {
      visible.add(path);
      for (const ancestor of ancestors) {
        visible.add(ancestor);
        expand.add(ancestor);
      }
      if (hasMatchBelow) expand.add(path);
      return true;
    }
    return false;
  };

  walk(root, '$', null, []);
  return { visible, matches, expand };
}
