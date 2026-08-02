/**
 * Structural JSON comparison, rendered as one aligned document.
 *
 * The output is not a list of changes — it is a row model where both documents
 * are laid out side by side with the matching parts on the same line, so a
 * difference is something you *see* rather than something you look up. A row
 * carries a cell for each side; a missing cell is a genuine gap in that
 * document, which is what makes an addition or a removal legible at a glance.
 *
 * Both documents are parsed first, so key order, indentation and whitespace can
 * never appear as differences — only things that change what the JSON means.
 *
 * Two matching rules do the real work:
 *
 * - **Objects** are matched by key name, never by position. Reordering keys is
 *   not a change, so it must not produce one.
 * - **Arrays** are matched by a longest-common-subsequence over element
 *   identity, so inserting an element at the front reports one addition rather
 *   than rewriting every element after it. Elements carrying an `id`-like field
 *   are matched by it even across a reorder, and reported as moved.
 *
 * Equal subtrees larger than a few nodes collapse to a single summary row. That
 * is what keeps a 5 MB pair of documents to a few thousand rows: the tool's job
 * is the difference, and the untouched bulk only needs to be accounted for.
 */

import { childPath, kindOf } from './tree';

export type ChangeKind = 'added' | 'removed' | 'changed' | 'moved';

/** How a row reads: an unchanged line, or one side of a difference. */
export type RowKind = 'same' | 'added' | 'removed' | 'changed';

export type TokenType = 'key' | 'punct' | 'string' | 'number' | 'boolean' | 'null' | 'note';

export interface Token {
  t: TokenType;
  v: string;
}

export interface Cell {
  depth: number;
  tokens: Token[];
  /** On a changed row: the value that was replaced, or the one replacing it. */
  emphasis?: 'old' | 'new';
}

export interface DiffRow {
  /** Null where this document has nothing on this line. */
  left: Cell | null;
  right: Cell | null;
  kind: RowKind;
  /** Index into `blocks`, or -1 on an unchanged row. */
  block: number;
  /** Never fold this row away — it is a change, or the path down to one. */
  keep: boolean;
  /** A matched array element that also changed position. */
  moved?: boolean;
  path: string;
}

/** One difference, however many rows it spans. */
export interface DiffBlock {
  kind: ChangeKind;
  path: string;
  /** Index of the first row of the block. */
  row: number;
}

export interface DiffResult {
  rows: DiffRow[];
  blocks: DiffBlock[];
  counts: Record<ChangeKind, number>;
  identical: boolean;
  /** The row budget was hit; what is shown is a prefix of the comparison. */
  truncated: boolean;
}

/** Enough rows for any real review, and a hard stop on pathological input. */
const MAX_ROWS = 120_000;
/** Equal subtrees at or below this many nodes are shown in full, not summarised. */
const INLINE_EQUAL_NODES = 8;
/** Long strings are clipped: a row is one line tall, so it could not show them. */
const MAX_SCALAR = 200;
/** LCS table cap — 4M cells is a 16 MB Uint32Array. Beyond it, match by identity. */
const LCS_CELL_LIMIT = 4_000_000;

interface Frame {
  open: number;
  changed: boolean;
}

interface Ctx {
  rows: DiffRow[];
  blocks: DiffBlock[];
  frames: Frame[];
  truncated: boolean;
}

type Side = 'both' | 'left' | 'right';

function push(ctx: Ctx, row: DiffRow): void {
  if (ctx.rows.length >= MAX_ROWS) {
    ctx.truncated = true;
    return;
  }
  ctx.rows.push(row);
}

function emit(
  ctx: Ctx,
  side: Side,
  cell: Cell,
  kind: RowKind,
  block: number,
  path: string,
  moved = false,
): void {
  push(ctx, {
    left: side === 'right' ? null : cell,
    right: side === 'left' ? null : cell,
    kind,
    block,
    path,
    keep: kind !== 'same' || moved,
    moved: moved || undefined,
  });
}

/**
 * Open a difference. Every enclosing container is marked as containing a change
 * so its braces survive folding — that is what keeps the path to a difference
 * on screen instead of a bare hunk header.
 */
function openBlock(ctx: Ctx, kind: ChangeKind, path: string): number {
  const index = ctx.blocks.length;
  ctx.blocks.push({ kind, path, row: ctx.rows.length });
  for (const frame of ctx.frames) frame.changed = true;
  return index;
}

function closeFrame(ctx: Ctx, closeRow: number): void {
  const frame = ctx.frames.pop();
  if (!frame?.changed) return;
  const open = ctx.rows[frame.open];
  const close = ctx.rows[closeRow];
  if (open) open.keep = true;
  if (close) close.keep = true;
}

// --- Tokens ----------------------------------------------------------------

function keyTokens(key: string | null): Token[] {
  if (key === null) return [];
  return [
    { t: 'key', v: JSON.stringify(key) },
    { t: 'punct', v: ': ' },
  ];
}

function scalarTokens(value: unknown): Token[] {
  if (value === null) return [{ t: 'null', v: 'null' }];
  switch (typeof value) {
    case 'number':
      return [{ t: 'number', v: String(value) }];
    case 'boolean':
      return [{ t: 'boolean', v: String(value) }];
    case 'string': {
      const text = JSON.stringify(value);
      return [
        { t: 'string', v: text.length > MAX_SCALAR ? `${text.slice(0, MAX_SCALAR)}…"` : text },
      ];
    }
    default:
      return [{ t: 'null', v: String(value) }];
  }
}

function entriesOf(value: unknown, isArray: boolean): Array<readonly [string, unknown]> {
  return isArray
    ? (value as unknown[]).map((item, index) => [String(index), item] as const)
    : Object.entries(value as Record<string, unknown>);
}

// --- Whole-subtree emission ------------------------------------------------

/** Render a value and everything under it onto one side (or both). */
function emitValue(
  ctx: Ctx,
  value: unknown,
  key: string | null,
  depth: number,
  side: Side,
  kind: RowKind,
  block: number,
  path: string,
): void {
  const nodeKind = kindOf(value);
  const prefix = keyTokens(key);

  if (nodeKind !== 'object' && nodeKind !== 'array') {
    emit(ctx, side, { depth, tokens: [...prefix, ...scalarTokens(value)] }, kind, block, path);
    return;
  }

  const isArray = nodeKind === 'array';
  const [open, close] = isArray ? ['[', ']'] : ['{', '}'];
  const entries = entriesOf(value, isArray);

  if (entries.length === 0) {
    emit(ctx, side, { depth, tokens: [...prefix, { t: 'punct', v: open + close }] }, kind, block, path);
    return;
  }

  emit(ctx, side, { depth, tokens: [...prefix, { t: 'punct', v: open }] }, kind, block, path);
  for (const [childKey, child] of entries) {
    emitValue(
      ctx,
      child,
      isArray ? null : childKey,
      depth + 1,
      side,
      kind,
      block,
      childPath(path, childKey, isArray),
    );
  }
  emit(ctx, side, { depth, tokens: [{ t: 'punct', v: close }] }, kind, block, path);
}

/**
 * An equal value. Small ones are written out so the surrounding shape still
 * reads; anything larger becomes one summary row, because rendering thousands
 * of identical lines helps nobody and costs everybody.
 */
function emitEqual(
  ctx: Ctx,
  value: unknown,
  key: string | null,
  depth: number,
  path: string,
  moved: boolean,
): void {
  const nodeKind = kindOf(value);
  const isContainer = nodeKind === 'object' || nodeKind === 'array';
  const block = moved ? openBlock(ctx, 'moved', path) : -1;

  if (isContainer && countNodes(value, INLINE_EQUAL_NODES) > INLINE_EQUAL_NODES) {
    const isArray = nodeKind === 'array';
    const entries = entriesOf(value, isArray);
    const [open, close] = isArray ? ['[', ']'] : ['{', '}'];
    const unit = isArray
      ? `${entries.length} item${entries.length === 1 ? '' : 's'}`
      : `${entries.length} key${entries.length === 1 ? '' : 's'}`;
    emit(
      ctx,
      'both',
      {
        depth,
        tokens: [
          ...keyTokens(key),
          { t: 'punct', v: open },
          { t: 'note', v: ` … ${unit} ` },
          { t: 'punct', v: close },
        ],
      },
      'same',
      block,
      path,
      moved,
    );
    return;
  }

  if (moved) {
    // Mark only the first row of the moved subtree; the rest reads as unchanged.
    const before = ctx.rows.length;
    emitValue(ctx, value, key, depth, 'both', 'same', block, path);
    const first = ctx.rows[before];
    if (first) {
      first.moved = true;
      first.keep = true;
    }
    return;
  }

  emitValue(ctx, value, key, depth, 'both', 'same', -1, path);
}

// --- Pairing ---------------------------------------------------------------

function emitPair(
  ctx: Ctx,
  left: unknown,
  right: unknown,
  key: string | null,
  depth: number,
  path: string,
  moved = false,
): void {
  if (deepEqual(left, right)) {
    emitEqual(ctx, left, key, depth, path, moved);
    return;
  }

  const leftKind = kindOf(left);
  const rightKind = kindOf(right);

  if (leftKind === 'object' && rightKind === 'object') {
    emitObjectPair(ctx, left as Record<string, unknown>, right as Record<string, unknown>, key, depth, path, moved);
    return;
  }

  if (leftKind === 'array' && rightKind === 'array') {
    emitArrayPair(ctx, left as unknown[], right as unknown[], key, depth, path, moved);
    return;
  }

  const block = openBlock(ctx, 'changed', path);

  // A value that changed shape — object to string, array to object — has no
  // line-for-line correspondence, so show the old block leaving and the new
  // block arriving rather than pretending they align.
  if (leftKind === 'object' || leftKind === 'array' || rightKind === 'object' || rightKind === 'array') {
    emitValue(ctx, left, key, depth, 'left', 'removed', block, path);
    emitValue(ctx, right, key, depth, 'right', 'added', block, path);
    return;
  }

  push(ctx, {
    left: { depth, tokens: [...keyTokens(key), ...scalarTokens(left)], emphasis: 'old' },
    right: { depth, tokens: [...keyTokens(key), ...scalarTokens(right)], emphasis: 'new' },
    kind: 'changed',
    block,
    path,
    keep: true,
    moved: moved || undefined,
  });
}

function emitObjectPair(
  ctx: Ctx,
  left: Record<string, unknown>,
  right: Record<string, unknown>,
  key: string | null,
  depth: number,
  path: string,
  moved: boolean,
): void {
  const openRow = ctx.rows.length;
  emit(ctx, 'both', { depth, tokens: [...keyTokens(key), { t: 'punct', v: '{' }] }, 'same', -1, path, moved);
  ctx.frames.push({ open: openRow, changed: false });

  // Left order leads, so a shared key never moves. Keys only the right document
  // has follow, since JSON objects have no order to insert them into.
  for (const childKey of Object.keys(left)) {
    const target = childPath(path, childKey, false);
    if (Object.prototype.hasOwnProperty.call(right, childKey)) {
      emitPair(ctx, left[childKey], right[childKey], childKey, depth + 1, target);
    } else {
      const block = openBlock(ctx, 'removed', target);
      emitValue(ctx, left[childKey], childKey, depth + 1, 'left', 'removed', block, target);
    }
  }

  for (const childKey of Object.keys(right)) {
    if (Object.prototype.hasOwnProperty.call(left, childKey)) continue;
    const target = childPath(path, childKey, false);
    const block = openBlock(ctx, 'added', target);
    emitValue(ctx, right[childKey], childKey, depth + 1, 'right', 'added', block, target);
  }

  const closeRow = ctx.rows.length;
  emit(ctx, 'both', { depth, tokens: [{ t: 'punct', v: '}' }] }, 'same', -1, path);
  closeFrame(ctx, closeRow);
}

function emitArrayPair(
  ctx: Ctx,
  left: unknown[],
  right: unknown[],
  key: string | null,
  depth: number,
  path: string,
  moved: boolean,
): void {
  const openRow = ctx.rows.length;
  emit(ctx, 'both', { depth, tokens: [...keyTokens(key), { t: 'punct', v: '[' }] }, 'same', -1, path, moved);
  ctx.frames.push({ open: openRow, changed: false });

  for (const pair of alignArray(left, right)) {
    if (pair.l !== null && pair.r !== null) {
      emitPair(ctx, left[pair.l], right[pair.r], null, depth + 1, childPath(path, String(pair.r), true), pair.moved);
    } else if (pair.l !== null) {
      const target = childPath(path, String(pair.l), true);
      const block = openBlock(ctx, 'removed', target);
      emitValue(ctx, left[pair.l], null, depth + 1, 'left', 'removed', block, target);
    } else if (pair.r !== null) {
      const target = childPath(path, String(pair.r), true);
      const block = openBlock(ctx, 'added', target);
      emitValue(ctx, right[pair.r], null, depth + 1, 'right', 'added', block, target);
    }
  }

  const closeRow = ctx.rows.length;
  emit(ctx, 'both', { depth, tokens: [{ t: 'punct', v: ']' }] }, 'same', -1, path);
  closeFrame(ctx, closeRow);
}

// --- Array alignment -------------------------------------------------------

interface Pairing {
  l: number | null;
  r: number | null;
  moved?: boolean;
}

/**
 * An element's identity for matching purposes.
 *
 * An `id`-like field is a strong identity: the same record across both
 * documents, wherever it sits. Failing that, an object's key signature matches
 * records of the same shape, so a list of similar objects pairs up positionally
 * and the diff lands on the fields that actually differ.
 */
function hashOf(item: unknown): string {
  if (Array.isArray(item)) return `[${item.length}`;
  if (item !== null && typeof item === 'object') {
    const record = item as Record<string, unknown>;
    for (const idKey of ['id', '_id', 'uuid', 'key', 'slug', 'name']) {
      const candidate = record[idKey];
      if (typeof candidate === 'string' || typeof candidate === 'number') {
        return `#${idKey}:${candidate}`;
      }
    }
    return `{${Object.keys(record).sort().join(',')}`;
  }
  return `=${JSON.stringify(item)}`;
}

function alignArray(left: unknown[], right: unknown[]): Pairing[] {
  const leftHashes = left.map(hashOf);
  const rightHashes = right.map(hashOf);

  // The subsequence is the better alignment, but its table is quadratic. Past
  // the cap, match on identity instead — linear, and on the arrays that get
  // that large (records with ids) it lands in the same place anyway.
  const pairs =
    left.length * right.length > LCS_CELL_LIMIT
      ? anchorPairs(leftHashes, rightHashes)
      : recoverMoves(lcsPairs(leftHashes, rightHashes), leftHashes, rightHashes);

  return pairReplacedScalars(pairs, left, right);
}

/**
 * A dropped value immediately followed by an arriving one, both plain values,
 * is a replacement — `[1, 2, 3]` against `[1, 5, 3]` changed an element, it did
 * not delete one and add another. Zipping the two together puts them on one row
 * with the arrow between, which is the truth and the shorter read.
 *
 * Containers are left alone: pairing two unrelated objects would turn a clean
 * "this left, that arrived" into a misleading field-by-field comparison.
 */
function pairReplacedScalars(pairs: Pairing[], left: unknown[], right: unknown[]): Pairing[] {
  const isScalar = (value: unknown) => value === null || typeof value !== 'object';
  const out: Pairing[] = [];
  let index = 0;

  while (index < pairs.length) {
    let afterRemovals = index;
    while (afterRemovals < pairs.length && pairs[afterRemovals]!.l !== null && pairs[afterRemovals]!.r === null) {
      afterRemovals++;
    }
    let afterAdditions = afterRemovals;
    while (afterAdditions < pairs.length && pairs[afterAdditions]!.l === null && pairs[afterAdditions]!.r !== null) {
      afterAdditions++;
    }

    const removals = pairs.slice(index, afterRemovals);
    const additions = pairs.slice(afterRemovals, afterAdditions);

    if (removals.length === 0 && additions.length === 0) {
      out.push(pairs[index]!);
      index++;
      continue;
    }

    let zipped = 0;
    const shared = Math.min(removals.length, additions.length);
    while (
      zipped < shared &&
      isScalar(left[removals[zipped]!.l!]) &&
      isScalar(right[additions[zipped]!.r!])
    ) {
      out.push({ l: removals[zipped]!.l, r: additions[zipped]!.r });
      zipped++;
    }
    for (let i = zipped; i < removals.length; i++) out.push(removals[i]!);
    for (let i = zipped; i < additions.length; i++) out.push(additions[i]!);
    index = afterAdditions;
  }

  return out;
}

/**
 * Linear alignment for large arrays: pair each element on the right with the
 * first unclaimed element on the left that has the same identity, then read the
 * result out in the changed document's order, flushing elements the original
 * had and the change dropped as they are passed.
 *
 * This is the path that matters for real data — a 20k-record export compared
 * against the same export with one record removed has to report one removal,
 * not twenty thousand edits.
 */
function anchorPairs(leftHashes: string[], rightHashes: string[]): Pairing[] {
  const unclaimed = new Map<string, number[]>();
  leftHashes.forEach((hash, index) => {
    const bucket = unclaimed.get(hash);
    if (bucket) bucket.push(index);
    else unclaimed.set(hash, [index]);
  });

  const matchOf = new Int32Array(rightHashes.length).fill(-1);
  const claimed = new Uint8Array(leftHashes.length);
  rightHashes.forEach((hash, index) => {
    const bucket = unclaimed.get(hash);
    const match = bucket?.shift();
    if (match === undefined) return;
    matchOf[index] = match;
    claimed[match] = 1;
  });

  const pairs: Pairing[] = [];
  let cursor = 0;
  let highWater = -1;

  const flushTo = (limit: number) => {
    while (cursor < limit) {
      if (!claimed[cursor]) pairs.push({ l: cursor, r: null });
      cursor++;
    }
  };

  for (let index = 0; index < rightHashes.length; index++) {
    const match = matchOf[index]!;
    if (match < 0) {
      pairs.push({ l: null, r: index });
      continue;
    }
    flushTo(match);
    if (cursor === match) cursor++;
    // An element that jumped backwards past one already read is out of order.
    const moved = match < highWater;
    if (!moved) highWater = match;
    pairs.push({ l: match, r: index, moved });
  }
  flushTo(leftHashes.length);

  return pairs;
}

function lcsPairs(a: string[], b: string[]): Pairing[] {
  const n = a.length;
  const m = b.length;
  const width = m + 1;
  const dp = new Uint32Array((n + 1) * width);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * width + j] =
        a[i] === b[j]
          ? dp[(i + 1) * width + j + 1]! + 1
          : Math.max(dp[(i + 1) * width + j]!, dp[i * width + j + 1]!);
    }
  }

  const pairs: Pairing[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      pairs.push({ l: i, r: j });
      i++;
      j++;
    } else if (dp[(i + 1) * width + j]! >= dp[i * width + j + 1]!) {
      pairs.push({ l: i, r: null });
      i++;
    } else {
      pairs.push({ l: null, r: j });
      j++;
    }
  }
  while (i < n) pairs.push({ l: i++, r: null });
  while (j < m) pairs.push({ l: null, r: j++ });
  return pairs;
}

/**
 * An element with a strong identity that the subsequence could not keep in
 * place has not left the document — it moved. Rejoining the two halves turns
 * "one deletion and one addition" back into the smaller truth: same record,
 * different position, and possibly an edited field.
 */
function recoverMoves(pairs: Pairing[], leftHashes: string[], rightHashes: string[]): Pairing[] {
  const removals = new Map<string, number[]>();
  pairs.forEach((pair, index) => {
    if (pair.l === null || pair.r !== null) return;
    const hash = leftHashes[pair.l]!;
    if (!hash.startsWith('#')) return;
    const bucket = removals.get(hash);
    if (bucket) bucket.push(index);
    else removals.set(hash, [index]);
  });
  if (removals.size === 0) return pairs;

  const merged = new Set<number>();
  pairs.forEach((pair, index) => {
    if (pair.l !== null || pair.r === null) return;
    const bucket = removals.get(rightHashes[pair.r]!);
    const from = bucket?.shift();
    if (from === undefined) return;
    merged.add(from);
    pairs[index] = { l: pairs[from]!.l, r: pair.r, moved: true };
  });

  return merged.size === 0 ? pairs : pairs.filter((_, index) => !merged.has(index));
}

// --- Value helpers ---------------------------------------------------------

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;

  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;

  if (aIsArray) {
    const left = a as unknown[];
    const right = b as unknown[];
    if (left.length !== right.length) return false;
    return left.every((item, index) => deepEqual(item, right[index]));
  }

  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every(
    (key) => Object.prototype.hasOwnProperty.call(right, key) && deepEqual(left[key], right[key]),
  );
}

/** Node count, abandoned as soon as it passes `cap` — the exact total is never needed. */
function countNodes(value: unknown, cap: number): number {
  let count = 0;
  const stack: unknown[] = [value];

  while (stack.length > 0 && count <= cap) {
    const current = stack.pop();
    count++;
    if (Array.isArray(current)) {
      for (const item of current) stack.push(item);
    } else if (current !== null && typeof current === 'object') {
      for (const item of Object.values(current as Record<string, unknown>)) stack.push(item);
    }
  }

  return count;
}

export function diffJson(left: unknown, right: unknown): DiffResult {
  const ctx: Ctx = { rows: [], blocks: [], frames: [], truncated: false };
  emitPair(ctx, left, right, null, 0, '$');

  const counts: Record<ChangeKind, number> = { added: 0, removed: 0, changed: 0, moved: 0 };
  for (const block of ctx.blocks) counts[block.kind]++;

  return {
    rows: ctx.rows,
    blocks: ctx.blocks,
    counts,
    identical: ctx.blocks.length === 0,
    truncated: ctx.truncated,
  };
}
