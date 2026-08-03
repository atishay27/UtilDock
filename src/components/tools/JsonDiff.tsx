import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, FileButton, Panel, Status } from '../ui';
import { useCopy, useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError } from '../../lib/json/types';
import type { Cell, ChangeKind, DiffResult, DiffRow, Token } from '../../lib/json/diff';
import { SAMPLE_DIFF_LEFT, SAMPLE_DIFF_RIGHT } from '../../lib/json/samples';

type SideError = { side: 'left' | 'right'; error: JsonError } | null;

const ROW_HEIGHT = 22;
const OVERSCAN = 14;

/** Unchanged runs shorter than this are cheaper to read than to fold. */
const FOLD_MIN = 6;
/** Unchanged rows kept either side of a fold, so a change never starts cold. */
const CONTEXT = 2;

const SPLIT_COLUMNS = '1.5rem minmax(0,1fr) 1.5rem 1.5rem minmax(0,1fr)';
const UNIFIED_COLUMNS = '1.5rem minmax(0,1fr)';

export default function JsonDiff() {
  const [left, setLeft] = usePersistentState('utildock:json-diff:left', '');
  const [right, setRight] = usePersistentState('utildock:json-diff:right', '');
  const [result, setResult] = useState<DiffResult | null>(null);
  const [sideError, setSideError] = useState<SideError>(null);
  const [showEditors, setShowEditors] = usePersistentState('utildock:json-diff:editors', true);

  const run = useJsonWorker();
  const debouncedLeft = useDebounced(left, 220);
  const debouncedRight = useDebounced(right, 220);

  useEffect(() => {
    if (!debouncedLeft.trim() || !debouncedRight.trim()) {
      setResult(null);
      setSideError(null);
      return;
    }
    void run({ op: 'diff', left: debouncedLeft, right: debouncedRight }).then((response) => {
      if (response.ok) {
        setResult(response.result);
        setSideError(null);
      } else {
        setResult(null);
        setSideError({ side: response.side, error: response.error });
      }
    });
  }, [debouncedLeft, debouncedRight, run]);

  const leftMarkers = useMarkers(sideError, 'left', left);
  const rightMarkers = useMarkers(sideError, 'right', right);

  const leftDrop = useFileDrop((text) => setLeft(text));
  const rightDrop = useFileDrop((text) => setRight(text));

  const loadSample = () => {
    setLeft(SAMPLE_DIFF_LEFT);
    setRight(SAMPLE_DIFF_RIGHT);
  };

  const swap = () => {
    setLeft(right);
    setRight(left);
  };

  const totals = result
    ? result.counts.added + result.counts.removed + result.counts.changed + result.counts.moved
    : 0;

  return (
    <div className="flex flex-col gap-4">
      {showEditors && (
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
          <Panel
            title="Original"
            aligned
            highlighted={leftDrop.isOver}
            dropHandlers={leftDrop.dropHandlers}
            className="h-[26vh] min-h-[200px]"
            actions={
              <>
                <FileButton onText={(text) => setLeft(text)} />
                <Button icon="trash" variant="danger" onClick={() => setLeft('')} disabled={!left} />
              </>
            }
            footer={
              <>
                <span>{formatBytes(new Blob([left]).size)}</span>
                {sideError?.side === 'left' && (
                  <Status tone="error">
                    Line {sideError.error.line}, column {sideError.error.column} —{' '}
                    {sideError.error.message}
                  </Status>
                )}
              </>
            }
          >
            <JsonEditor
              label="Original JSON"
              value={left}
              onChange={setLeft}
              markers={leftMarkers}
              placeholder={'{\n  "the": "original document"\n}'}
            />
          </Panel>

          <Panel
            title="Changed"
            aligned
            highlighted={rightDrop.isOver}
            dropHandlers={rightDrop.dropHandlers}
            className="h-[26vh] min-h-[200px]"
            actions={
              <>
                <FileButton onText={(text) => setRight(text)} />
                <Button
                  icon="trash"
                  variant="danger"
                  onClick={() => setRight('')}
                  disabled={!right}
                />
              </>
            }
            footer={
              <>
                <span>{formatBytes(new Blob([right]).size)}</span>
                {sideError?.side === 'right' && (
                  <Status tone="error">
                    Line {sideError.error.line}, column {sideError.error.column} —{' '}
                    {sideError.error.message}
                  </Status>
                )}
              </>
            }
          >
            <JsonEditor
              label="Changed JSON"
              value={right}
              onChange={setRight}
              markers={rightMarkers}
              placeholder={'{\n  "the": "document to compare against"\n}'}
            />
          </Panel>
        </div>
      )}

      <DiffPanel
        left={left}
        right={right}
        result={result}
        sideError={sideError}
        strikeKey={`${totals}:${result?.rows.length ?? 0}`}
        header={
          <>
            <Button icon="sparkle" onClick={loadSample}>
              Sample
            </Button>
            <Button icon="convert" onClick={swap} disabled={!left && !right} title="Swap the two sides">
              Swap
            </Button>
            <Button
              icon={showEditors ? 'chevron-up' : 'chevron-down'}
              onClick={() => setShowEditors(!showEditors)}
              title={showEditors ? 'Hide the editors and give the comparison the page' : 'Show the editors again'}
            >
              {showEditors ? 'Hide input' : 'Edit input'}
            </Button>
          </>
        }
        tall={!showEditors}
      />
    </div>
  );
}

function useMarkers(sideError: SideError, side: 'left' | 'right', text: string): Marker[] {
  return useMemo(() => {
    if (!sideError || sideError.side !== side) return [];
    const { error } = sideError;
    const from = error.offset ?? positionToOffset(text, error.line, error.column);
    return [{ from: Math.max(0, from - 1), to: from + 1, message: error.message }];
  }, [sideError, side, text]);
}

// --- The comparison ---------------------------------------------------------

type ViewItem =
  | { type: 'row'; row: DiffRow; index: number; side: 'both' | 'left' | 'right' }
  | { type: 'fold'; id: number; count: number };

interface DiffPanelProps {
  left: string;
  right: string;
  result: DiffResult | null;
  sideError: SideError;
  header: React.ReactNode;
  strikeKey: string;
  tall: boolean;
}

function DiffPanel({ left, right, result, sideError, header, strikeKey, tall }: DiffPanelProps) {
  const [unified, setUnified] = useState(false);
  const [showUnchanged, setShowUnchanged] = useState(false);
  const [openFolds, setOpenFolds] = useState<Set<number>>(() => new Set());
  const [cursor, setCursor] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  // Two columns of JSON do not fit a phone, so the same rows are stacked
  // instead. The toggle stays available — this only picks the sensible start.
  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const apply = () => setUnified(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    setOpenFolds(new Set());
    setCursor(0);
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [result]);

  const items = useMemo(
    () => buildItems(result?.rows ?? [], openFolds, showUnchanged, unified),
    [result, openFolds, showUnchanged, unified],
  );

  const anchors = useMemo(() => {
    const found: number[] = new Array(result?.blocks.length ?? 0).fill(-1);
    items.forEach((item, index) => {
      if (item.type !== 'row') return;
      const block = item.row.block;
      if (block >= 0 && found[block] === -1) found[block] = index;
    });
    return found;
  }, [items, result]);

  const jumpTo = useCallback(
    (block: number) => {
      const element = scroller.current;
      const anchor = anchors[block];
      if (!element || anchor === undefined || anchor < 0) return;
      setCursor(block);
      element.scrollTo({
        top: Math.max(0, anchor * ROW_HEIGHT - element.clientHeight * 0.35),
        behavior: 'smooth',
      });
    },
    [anchors],
  );

  const step = useCallback(
    (delta: number) => {
      const total = result?.blocks.length ?? 0;
      if (total === 0) return;
      jumpTo((cursor + delta + total) % total);
    },
    [cursor, jumpTo, result],
  );

  const jumpKind = useCallback(
    (kind: ChangeKind) => {
      const blocks = result?.blocks ?? [];
      for (let offset = 1; offset <= blocks.length; offset++) {
        const index = (cursor + offset) % blocks.length;
        if (blocks[index]!.kind === kind) {
          jumpTo(index);
          return;
        }
      }
    },
    [cursor, jumpTo, result],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!event.altKey || (!event.key.startsWith('Arrow') && event.key !== 'n' && event.key !== 'p')) return;
      if (event.key === 'ArrowDown' || event.key === 'n') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowUp' || event.key === 'p') {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step]);

  const hasChanges = Boolean(result && !result.identical);

  return (
    <Panel
      title="Comparison"
      strikeKey={strikeKey}
      className={tall ? 'h-[calc(100vh-17rem)] min-h-[420px]' : 'h-[54vh] min-h-[360px]'}
      actions={
        <>
          {hasChanges && (
            <>
              <div className="flex items-center gap-1">
                <Tally kind="removed" count={result!.counts.removed} onJump={jumpKind} />
                <Tally kind="added" count={result!.counts.added} onJump={jumpKind} />
                <Tally kind="changed" count={result!.counts.changed} onJump={jumpKind} />
                <Tally kind="moved" count={result!.counts.moved} onJump={jumpKind} />
              </div>
              <div className="flex items-center gap-0.5 border border-scribe-strong">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  title="Previous difference (Alt + ↑)"
                  aria-label="Previous difference"
                  className="grid size-6 place-items-center text-temper hover:bg-anvil-lit hover:text-chalk"
                >
                  <Icon name="chevron-up" size={13} strokeWidth={2.5} />
                </button>
                <span className="ud-force min-w-11 text-center text-[11px] text-faint">
                  {cursor + 1}/{result!.blocks.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  title="Next difference (Alt + ↓)"
                  aria-label="Next difference"
                  className="grid size-6 place-items-center text-temper hover:bg-anvil-lit hover:text-chalk"
                >
                  <Icon name="chevron-down" size={13} strokeWidth={2.5} />
                </button>
              </div>
              <Button
                onClick={() => setShowUnchanged(!showUnchanged)}
                title="Show every unchanged line instead of folding them away"
              >
                {showUnchanged ? 'Fold same' : 'Show all'}
              </Button>
              <Button
                onClick={() => setUnified(!unified)}
                title={unified ? 'Show the two documents side by side' : 'Stack the two documents in one column'}
              >
                {unified ? 'Split' : 'Stack'}
              </Button>
            </>
          )}
          {header}
        </>
      }
      footer={
        result && !result.identical ? (
          <>
            <Legend />
            {result.truncated && (
              <Status tone="warn">Comparison truncated — the documents are very large</Status>
            )}
            {/* A keyboard hint is noise on a touch screen. */}
            <span className="ml-auto hidden text-faint sm:inline">
              Alt + <span className="ud-force">↑</span> / <span className="ud-force">↓</span> steps
              through differences
            </span>
          </>
        ) : undefined
      }
    >
      <Body
        left={left}
        right={right}
        result={result}
        sideError={sideError}
        items={items}
        anchors={anchors}
        unified={unified}
        scroller={scroller}
        onOpenFold={(id) => setOpenFolds((current) => new Set(current).add(id))}
        onJump={jumpTo}
      />
    </Panel>
  );
}

/**
 * Collapse long runs of untouched rows. `keep` rows are the braces on the path
 * to a difference, so a fold leaves an outline: every change, in place, with
 * the structure that locates it.
 */
function buildItems(
  rows: DiffRow[],
  openFolds: Set<number>,
  showUnchanged: boolean,
  unified: boolean,
): ViewItem[] {
  const folded: ViewItem[] = [];
  let index = 0;

  while (index < rows.length) {
    const row = rows[index]!;
    if (showUnchanged || row.kind !== 'same' || row.keep) {
      folded.push({ type: 'row', row, index, side: 'both' });
      index++;
      continue;
    }

    let end = index;
    while (end < rows.length && rows[end]!.kind === 'same' && !rows[end]!.keep) end++;
    const length = end - index;

    if (length < FOLD_MIN || openFolds.has(index)) {
      for (let i = index; i < end; i++) folded.push({ type: 'row', row: rows[i]!, index: i, side: 'both' });
    } else {
      const head = index === 0 ? 0 : CONTEXT;
      const tail = end === rows.length ? 0 : CONTEXT;
      for (let i = index; i < index + head; i++)
        folded.push({ type: 'row', row: rows[i]!, index: i, side: 'both' });
      folded.push({ type: 'fold', id: index, count: length - head - tail });
      for (let i = end - tail; i < end; i++)
        folded.push({ type: 'row', row: rows[i]!, index: i, side: 'both' });
    }
    index = end;
  }

  if (!unified) return folded;

  // Stacked: a changed row becomes the old line followed by the new one.
  const stacked: ViewItem[] = [];
  for (const item of folded) {
    if (item.type !== 'row') {
      stacked.push(item);
      continue;
    }
    if (item.row.kind === 'changed') {
      stacked.push({ ...item, side: 'left' }, { ...item, side: 'right' });
    } else {
      stacked.push({ ...item, side: item.row.kind === 'added' ? 'right' : 'left' });
    }
  }
  return stacked;
}

const KIND_TEXT: Record<ChangeKind, string> = {
  added: 'text-sound',
  removed: 'text-fault',
  changed: 'text-warn',
  moved: 'text-cherry',
};

const KIND_MARK: Record<ChangeKind, string> = {
  added: '+',
  removed: '−',
  changed: '→',
  moved: '⇅',
};

const KIND_LABEL: Record<ChangeKind, string> = {
  added: 'added',
  removed: 'removed',
  changed: 'changed',
  moved: 'moved',
};

function Tally({
  kind,
  count,
  onJump,
}: {
  kind: ChangeKind;
  count: number;
  onJump: (kind: ChangeKind) => void;
}) {
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={() => onJump(kind)}
      title={`Jump to the next ${KIND_LABEL[kind]} difference`}
      className={`ud-legend inline-flex items-center gap-1 border border-transparent px-1.5 py-1 transition-colors hover:border-scribe-strong ${KIND_TEXT[kind]}`}
    >
      <span aria-hidden="true" className="ud-force text-sm leading-none">
        {KIND_MARK[kind]}
      </span>
      <span className="ud-force tabular-nums">{count}</span>
    </button>
  );
}

function Legend() {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 bg-fault/35 ring-1 ring-fault/60" />
        only in original
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 bg-sound/35 ring-1 ring-sound/60" />
        only in changed
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="ud-force text-warn" aria-hidden="true">
          →
        </span>
        replaced
      </span>
    </span>
  );
}

interface BodyProps {
  left: string;
  right: string;
  result: DiffResult | null;
  sideError: SideError;
  items: ViewItem[];
  anchors: number[];
  unified: boolean;
  scroller: React.RefObject<HTMLDivElement | null>;
  onOpenFold: (id: number) => void;
  onJump: (block: number) => void;
}

function Body({
  left,
  right,
  result,
  sideError,
  items,
  anchors,
  unified,
  scroller,
  onOpenFold,
  onJump,
}: BodyProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry!.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, [scroller, result]);

  if (sideError) {
    return (
      <Centered>
        The {sideError.side === 'left' ? 'original' : 'changed'} document has a syntax error on line{' '}
        {sideError.error.line}. Fix it and the comparison will run.
      </Centered>
    );
  }

  if (!left.trim() || !right.trim()) {
    return (
      <Centered>
        Paste a document into each side — or press <strong className="text-chalk">Sample</strong> to
        try it with a pair that differs in a few interesting ways.
      </Centered>
    );
  }

  if (!result) return <Centered>Comparing…</Centered>;

  if (result.identical) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <span className="mx-auto grid size-11 place-items-center border border-sound/40 bg-sound/10 text-sound">
            <Icon name="check" size={20} />
          </span>
          <p className="mt-3 font-medium text-chalk">The two documents are equivalent</p>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-temper">
            Every value matches. Differences in key order, indentation and whitespace are ignored,
            since none of them change what the JSON means.
          </p>
        </div>
      </div>
    );
  }

  const columns = unified ? UNIFIED_COLUMNS : SPLIT_COLUMNS;
  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(items.length, Math.ceil((scrollTop + height) / ROW_HEIGHT) + OVERSCAN);

  return (
    <div className="flex h-full flex-col">
      <div
        className="ud-legend grid shrink-0 items-center border-b border-scribe bg-bench"
        style={{ gridTemplateColumns: columns }}
      >
        {unified ? (
          <div className="col-span-2 px-2 py-1.5">
            <span className="text-fault">− original</span>
            <span className="px-1.5 text-scribe-strong">/</span>
            <span className="text-sound">+ changed</span>
          </div>
        ) : (
          <>
            <div className="col-span-2 px-2 py-1.5 text-fault">Original</div>
            <div className="border-x border-scribe" />
            <div className="col-span-2 px-2 py-1.5 text-sound">Changed</div>
          </>
        )}
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scroller}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          className="h-full overflow-auto font-mono text-[12.5px] leading-none"
        >
          <div style={{ height: items.length * ROW_HEIGHT, position: 'relative' }}>
            <div style={{ transform: `translateY(${start * ROW_HEIGHT}px)` }}>
              {items.slice(start, end).map((item, offset) =>
                item.type === 'fold' ? (
                  <FoldRow
                    key={`fold-${item.id}`}
                    count={item.count}
                    columns={columns}
                    onClick={() => onOpenFold(item.id)}
                  />
                ) : (
                  <Line
                    key={`${item.index}-${item.side}-${start + offset}`}
                    row={item.row}
                    side={item.side}
                    unified={unified}
                    columns={columns}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <Ribbon
          blocks={result.blocks}
          anchors={anchors}
          total={items.length}
          scrollTop={scrollTop}
          viewportHeight={height}
          onJump={onJump}
        />
      </div>
    </div>
  );
}

/**
 * The change ribbon: the whole comparison compressed into one column, so the
 * distribution of differences is visible without scrolling and each is a click.
 */
function Ribbon({
  blocks,
  anchors,
  total,
  scrollTop,
  viewportHeight,
  onJump,
}: {
  blocks: DiffResult['blocks'];
  anchors: number[];
  total: number;
  scrollTop: number;
  viewportHeight: number;
  onJump: (block: number) => void;
}) {
  const contentHeight = total * ROW_HEIGHT;
  if (contentHeight <= viewportHeight) return null;

  const marks: Record<ChangeKind, string> = {
    added: 'bg-sound',
    removed: 'bg-fault',
    changed: 'bg-warn',
    moved: 'bg-cherry',
  };

  return (
    <div
      className="absolute inset-y-0 right-0 w-2.5 border-l border-scribe bg-bench"
      aria-hidden="true"
    >
      {blocks.map((block, index) => {
        const anchor = anchors[index];
        if (anchor === undefined || anchor < 0) return null;
        return (
          <button
            key={`${block.path}-${index}`}
            type="button"
            tabIndex={-1}
            onClick={() => onJump(index)}
            title={block.path}
            className={`absolute left-0 h-[3px] w-full ${marks[block.kind]}`}
            style={{ top: `${(anchor / total) * 100}%` }}
          />
        );
      })}
      <div
        className="pointer-events-none absolute left-0 w-full border border-chalk/30 bg-chalk/10"
        style={{
          top: `${(scrollTop / contentHeight) * 100}%`,
          height: `${Math.min(100, (viewportHeight / contentHeight) * 100)}%`,
        }}
      />
    </div>
  );
}

function FoldRow({
  count,
  columns,
  onClick,
}: {
  count: number;
  columns: string;
  onClick: () => void;
}) {
  return (
    <div className="grid" style={{ gridTemplateColumns: columns, height: ROW_HEIGHT }}>
      <button
        type="button"
        onClick={onClick}
        className="ud-legend col-span-full flex items-center gap-2 border-y border-scribe/60 bg-bench/60 px-2 text-faint transition-colors hover:bg-anvil-lit hover:text-chalk"
        title="Show these identical lines"
      >
        <Icon name="chevron-down" size={11} strokeWidth={2.5} />
        {count} identical {count === 1 ? 'line' : 'lines'}
      </button>
    </div>
  );
}

/** One line of the comparison — in split mode, both documents at once. */
function Line({
  row,
  side,
  unified,
  columns,
}: {
  row: DiffRow;
  side: 'both' | 'left' | 'right';
  unified: boolean;
  columns: string;
}) {
  const { copy, copied } = useCopy(1200);

  if (unified) {
    const cell = side === 'right' ? row.right : row.left;
    const kind = row.kind === 'changed' ? (side === 'right' ? 'added' : 'removed') : row.kind;
    return (
      <div
        className={`group relative grid ${TINT[kind]}`}
        style={{ gridTemplateColumns: columns, height: ROW_HEIGHT }}
      >
        <Gutter kind={kind} moved={row.moved} />
        <Content cell={cell} kind={kind} />
        <CopyPath path={row.path} copy={copy} copied={copied} />
      </div>
    );
  }

  const leftKind = row.kind === 'added' ? 'gap' : row.kind === 'changed' ? 'removed' : row.kind;
  const rightKind = row.kind === 'removed' ? 'gap' : row.kind === 'changed' ? 'added' : row.kind;

  return (
    <div
      className="group relative grid"
      style={{ gridTemplateColumns: columns, height: ROW_HEIGHT }}
    >
      <Gutter kind={leftKind} />
      <Content cell={row.left} kind={leftKind} />
      {/* Split view says "moved" once, in the spine — the gutters carry ± only. */}
      <Spine row={row} />
      <Gutter kind={rightKind} align="right" />
      <Content cell={row.right} kind={rightKind} />
      <CopyPath path={row.path} copy={copy} copied={copied} />
    </div>
  );
}

type LineKind = 'same' | 'added' | 'removed' | 'changed' | 'gap';

const TINT: Record<LineKind, string> = {
  same: '',
  added: 'bg-sound/12',
  removed: 'bg-fault/12',
  changed: 'bg-warn/12',
  gap: 'ud-void',
};

const SIGN: Record<LineKind, string> = {
  same: '',
  added: '+',
  removed: '−',
  changed: '~',
  gap: '',
};

function Gutter({
  kind,
  moved,
  align = 'left',
}: {
  kind: LineKind;
  moved?: boolean;
  align?: 'left' | 'right';
}) {
  const tone =
    kind === 'added'
      ? 'text-sound'
      : kind === 'removed'
        ? 'text-fault'
        : moved
          ? 'text-cherry'
          : 'text-faint';
  return (
    <span
      className={`ud-force grid place-items-center text-[13px] leading-none select-none ${TINT[kind]} ${tone} ${
        align === 'right' ? 'border-l border-scribe/40' : ''
      }`}
      aria-hidden="true"
    >
      {SIGN[kind] || (moved ? '⇅' : '')}
    </span>
  );
}

/** The centre column: what happened between the two sides, in one glyph. */
function Spine({ row }: { row: DiffRow }) {
  const glyph = row.kind === 'changed' ? '→' : row.moved ? '⇅' : '';
  const tone = row.kind === 'changed' ? 'text-warn' : 'text-cherry';
  return (
    <span
      className={`ud-force grid place-items-center border-x border-scribe text-[13px] leading-none select-none ${tone}`}
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
}

function Content({ cell, kind }: { cell: Cell | null; kind: LineKind }) {
  if (!cell) return <span className={`block h-full ${TINT.gap}`} />;
  return (
    <code
      className={`block h-full overflow-hidden text-ellipsis whitespace-pre ${TINT[kind]}`}
      style={{ paddingLeft: 6 + cell.depth * 12, paddingTop: 5 }}
    >
      {cell.tokens.map((token, index) => (
        <TokenSpan key={index} token={token} emphasis={cell.emphasis} />
      ))}
    </code>
  );
}

const TOKEN_CLASS: Record<Token['t'], string> = {
  key: 'text-key',
  punct: 'text-temper',
  string: 'text-string',
  number: 'text-number',
  boolean: 'text-boolean',
  null: 'text-nullish italic',
  note: 'text-faint',
};

function TokenSpan({ token, emphasis }: { token: Token; emphasis?: Cell['emphasis'] }) {
  const isValue = token.t !== 'key' && token.t !== 'punct' && token.t !== 'note';
  if (!emphasis || !isValue) return <span className={TOKEN_CLASS[token.t]}>{token.v}</span>;

  // The replaced value is struck through and the replacement is weighted, so
  // which way the arrow points needs no explaining.
  return emphasis === 'old' ? (
    <span className="text-fault line-through decoration-fault/70 decoration-[1.5px]">{token.v}</span>
  ) : (
    <span className="font-semibold text-sound">{token.v}</span>
  );
}

function CopyPath({
  path,
  copy,
  copied,
}: {
  path: string;
  copy: (text: string) => Promise<void>;
  copied: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => void copy(path)}
      title={`Copy path — ${path}`}
      className="ud-legend absolute top-0 right-4 hidden h-full items-center gap-1 bg-anvil px-2 text-faint group-hover:flex hover:text-chalk"
    >
      <Icon name={copied ? 'check' : 'copy'} size={11} />
      {copied ? 'copied' : 'path'}
    </button>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <p className="max-w-md text-sm leading-relaxed text-temper">{children}</p>
    </div>
  );
}
