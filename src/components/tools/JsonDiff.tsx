import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonMergeEditor, type MergeHandle } from '../JsonMergeEditor';
import type { Marker } from '../JsonEditor';
import { Button, FileButton, Select, Status, Toggle } from '../ui';
import { useDebounced, usePersistentState, readFileAsText } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError } from '../../lib/json/types';
import type { IndentStyle } from '../../lib/json/format';
import type { ChangeKind, DiffResult } from '../../lib/json/diff';
import { SAMPLE_DIFF_LEFT, SAMPLE_DIFF_RIGHT } from '../../lib/json/samples';
import { fill, parseRich } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type Side = 'left' | 'right';
type SideError = { side: Side; error: JsonError } | null;

/** Renders the `**bold**` a couple of these strings carry. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {parseRich(text).map((token, index) =>
        token.t === 'strong' ? (
          <strong key={index} className="text-chalk">
            {token.v}
          </strong>
        ) : (
          <span key={index}>{token.v}</span>
        ),
      )}
    </>
  );
}

/**
 * The comparator: two live documents with the difference drawn between them.
 * One surface, not three — both sides stay editable, the seam copies a block
 * either way, and the toolbar re-indents, sorts and strips either document.
 *
 * Two comparisons run at once, and their disagreement is the point:
 *
 * - **The editor's** is textual. It is what you see, navigate, and what the
 *   seam control acts on, since a copied block is a run of characters.
 * - **The worker's** is structural. It parses both sides, so reordered keys and
 *   different indentation are not differences. It owns the counts and verdict.
 *
 * When the text differs but the data does not, the toolbar says so and offers
 * the action that resolves it.
 */
export default function JsonDiff({
  strings,
}: {
  /* Accepted so every tool island has the same signature. The comparator has
     no counted phrases left — the fold counter went with the row model — so
     nothing here needs `plural()`. */
  lang: string;
  strings: IslandStrings;
}) {
  const s = strings.diff;
  const f = strings.formatter;
  const c = strings.common;

  const [left, setLeft] = usePersistentState('utildock:json-diff:left', '');
  const [right, setRight] = usePersistentState('utildock:json-diff:right', '');

  /* Tidy settings live here rather than borrowing the formatter's storage
     keys: someone who likes tabs when formatting one document does not
     necessarily want tabs when lining two up. */
  const [indent, setIndent] = usePersistentState<IndentStyle>('utildock:json-diff:indent', '2');
  const [sortKeys, setSortKeys] = usePersistentState('utildock:json-diff:sort', false);
  const [removeNulls, setRemoveNulls] = usePersistentState('utildock:json-diff:nulls', false);
  const [autoTidy, setAutoTidy] = usePersistentState('utildock:json-diff:autotidy', true);
  const [collapseIdentical, setCollapseIdentical] = usePersistentState(
    'utildock:json-diff:collapse',
    true,
  );
  const [result, setResult] = useState<DiffResult | null>(null);
  const [sideError, setSideError] = useState<SideError>(null);

  const merge = useRef<MergeHandle>(null);
  const run = useJsonWorker('json-diff');
  const debouncedLeft = useDebounced(left, 220);
  const debouncedRight = useDebounced(right, 220);

  // --- Tidy ---------------------------------------------------------------

  /** Re-indent one document. Resolves null if it does not parse. */
  const tidyText = useCallback(
    async (text: string, force?: { sortKeys?: boolean }): Promise<string | null> => {
      if (!text.trim()) return null;
      const response = await run({
        op: 'format',
        text,
        indent,
        sortKeys: force?.sortKeys ?? sortKeys,
        removeNulls,
      });
      return response.ok ? response.output : null;
    },
    [run, indent, sortKeys, removeNulls],
  );

  /* Sequential, not parallel. The worker hook drops all but the newest reply
     for a given op, so firing both formats at once would leave the first
     unresolved and one side untidied. */
  const tidyBoth = useCallback(async () => {
    const tidiedLeft = await tidyText(left);
    if (tidiedLeft !== null) setLeft(tidiedLeft);
    const tidiedRight = await tidyText(right);
    if (tidiedRight !== null) setRight(tidiedRight);
  }, [left, right, tidyText, setLeft, setRight]);

  /**
   * Resolve a formatting-only difference. Tidying alone will not: two documents
   * can be indented identically and still order their keys differently, which
   * is most of what puts this state on screen. So sorting goes on — and stays
   * visibly on, rather than firing once and being undone by the next Tidy.
   */
  const alignSides = useCallback(async () => {
    setSortKeys(true);
    const alignedLeft = await tidyText(left, { sortKeys: true });
    if (alignedLeft !== null) setLeft(alignedLeft);
    const alignedRight = await tidyText(right, { sortKeys: true });
    if (alignedRight !== null) setRight(alignedRight);
  }, [left, right, tidyText, setLeft, setRight, setSortKeys]);

  const tidyOne = useCallback(
    async (side: Side) => {
      const tidied = await tidyText(side === 'left' ? left : right);
      if (tidied === null) return;
      (side === 'left' ? setLeft : setRight)(tidied);
    },
    [left, right, tidyText, setLeft, setRight],
  );

  /** A whole document landed in one side — dropped, or loaded from a file. */
  const receive = useCallback(
    (side: Side, text: string) => {
      (side === 'left' ? setLeft : setRight)(text);
      if (!autoTidy) return;
      void tidyText(text).then((tidied) => {
        if (tidied !== null) (side === 'left' ? setLeft : setRight)(tidied);
      });
    },
    [autoTidy, tidyText, setLeft, setRight],
  );

  /* Paste is the one arrival we cannot read directly: CodeMirror applies it
     itself, so the finished document exists only once the debounce settles.
     The paste handler leaves a note here and this picks it up. */
  const pendingTidy = useRef<Side | null>(null);

  useEffect(() => {
    const side = pendingTidy.current;
    if (!side) return;
    pendingTidy.current = null;
    if (!autoTidy) return;
    void tidyText(side === 'left' ? debouncedLeft : debouncedRight).then((tidied) => {
      if (tidied !== null) (side === 'left' ? setLeft : setRight)(tidied);
    });
    // A one-shot reaction to a paste, not a rule about the current options.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLeft, debouncedRight]);

  // --- The structural verdict ---------------------------------------------

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

  // --- Actions ------------------------------------------------------------

  const loadSample = () => {
    setLeft(SAMPLE_DIFF_LEFT);
    setRight(SAMPLE_DIFF_RIGHT);
  };

  const swap = () => {
    setLeft(right);
    setRight(left);
  };

  /* One frame, two documents: a dropped file belongs to whichever half it
     landed on. Anything else would make the visitor guess. */
  const frame = useRef<HTMLElement>(null);
  const [dropSide, setDropSide] = useState<Side | null>(null);

  const sideAt = (clientX: number): Side => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return 'left';
    return clientX < box.left + box.width / 2 ? 'left' : 'right';
  };

  const dropHandlers = {
    onDragOver: (event: React.DragEvent) => {
      if (!event.dataTransfer.types.includes('Files')) return;
      event.preventDefault();
      setDropSide(sideAt(event.clientX));
    },
    onDragLeave: (event: React.DragEvent) => {
      if (frame.current?.contains(event.relatedTarget as Node)) return;
      setDropSide(null);
    },
    onDrop: (event: React.DragEvent) => {
      const file = event.dataTransfer.files[0];
      const side = sideAt(event.clientX);
      setDropSide(null);
      if (!file) return;
      event.preventDefault();
      void readFileAsText(file).then((text) => receive(side, text));
    },
  };

  const isEmpty = !left.trim() && !right.trim();
  const bothPresent = Boolean(left.trim() && right.trim());
  const hasChanges = Boolean(result && !result.identical);
  /* Structurally the same document, written down two different ways. The text
     diff is showing chunks; the data has nothing to report. */
  const formattingOnly = Boolean(result?.identical) && left !== right;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-scribe-strong bg-bench px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button icon="sparkle" onClick={loadSample} title={c.sampleTitle}>
            {c.sample}
          </Button>
          <Button icon="convert" onClick={swap} disabled={isEmpty} title={s.swapTitle}>
            {s.swap}
          </Button>
          <Button
            icon="braces"
            onClick={() => void tidyBoth()}
            disabled={isEmpty}
            title={s.tidyTitle}
          >
            {s.tidy}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Select
            label={f.indent}
            value={indent}
            onChange={(event) => setIndent(event.target.value as IndentStyle)}
          >
            <option value="2">{fill(f.spaces, { count: 2 })}</option>
            <option value="3">{fill(f.spaces, { count: 3 })}</option>
            <option value="4">{fill(f.spaces, { count: 4 })}</option>
            <option value="tab">{f.tab}</option>
          </Select>
          <Toggle checked={sortKeys} onChange={setSortKeys} title={f.sortKeysTitle}>
            {f.sortKeys}
          </Toggle>
          <Toggle checked={removeNulls} onChange={setRemoveNulls} title={c.removeNullsTitle}>
            {c.removeNulls}
          </Toggle>
          <Toggle checked={autoTidy} onChange={setAutoTidy} title={s.autoTidyTitle}>
            {s.autoTidy}
          </Toggle>
        </div>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
          {hasChanges && (
            <div className="flex items-center gap-1">
              <Tally kind="removed" count={result!.counts.removed} strings={s} />
              <Tally kind="added" count={result!.counts.added} strings={s} />
              <Tally kind="changed" count={result!.counts.changed} strings={s} />
              <Tally kind="moved" count={result!.counts.moved} strings={s} />
            </div>
          )}

          <div className="flex items-center gap-0.5 border border-scribe-strong">
            <button
              type="button"
              onClick={() => merge.current?.step(-1)}
              disabled={!bothPresent}
              title={s.prevTitle}
              aria-label={s.prev}
              className="grid size-6 place-items-center text-temper hover:bg-anvil-lit hover:text-chalk disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="chevron-up" size={13} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => merge.current?.step(1)}
              disabled={!bothPresent}
              title={s.nextTitle}
              aria-label={s.next}
              className="grid size-6 place-items-center text-temper hover:bg-anvil-lit hover:text-chalk disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="chevron-down" size={13} strokeWidth={2.5} />
            </button>
          </div>

          <Button
            onClick={() => setCollapseIdentical(!collapseIdentical)}
            title={collapseIdentical ? s.showAllTitle : s.foldSameTitle}
          >
            {collapseIdentical ? s.showAll : s.foldSame}
          </Button>
        </div>
      </div>

      {/* Capped measure with a non-wrapping sibling action, not a `flex-wrap`
          row: German and Russian run half again the English, and wrapping put
          the button on a row of its own where it read as unrelated. */}
      {formattingOnly && (
        <div className="flex flex-col gap-2 border border-sound/40 bg-sound/8 px-3 py-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="min-w-0 max-w-prose">
            <Status tone="ok">{s.formattingOnly}</Status>
          </span>
          <Button
            icon="braces"
            className="shrink-0 self-start sm:ml-auto sm:self-auto"
            onClick={() => void alignSides()}
            title={s.alignSidesTitle}
          >
            {s.alignSides}
          </Button>
        </div>
      )}

      <section
        ref={frame}
        {...dropHandlers}
        className={`flex min-h-0 flex-col overflow-hidden border bg-anvil transition-colors lg:h-[calc(100vh-17rem)] lg:min-h-[440px] ${
          dropSide ? 'border-cherry' : 'border-scribe-strong'
        }`}
      >
        {/* The header splits at 50%, which is exactly where the seam between
            the two editors falls — so each title sits over its own document. */}
        <header className="grid shrink-0 grid-cols-2 border-b border-scribe bg-bench">
          <SideHeader
            title={s.firstTitle}
            text={left}
            onFile={(text) => receive('left', text)}
            onTidy={() => void tidyOne('left')}
            onClear={() => setLeft('')}
            strings={strings}
          />
          <SideHeader
            title={s.secondTitle}
            text={right}
            onFile={(text) => receive('right', text)}
            onTidy={() => void tidyOne('right')}
            onClear={() => setRight('')}
            strings={strings}
            divided
          />
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden" onPasteCapture={(event) => {
          /* Which document the paste landed in, decided by where the caret
             was rather than by the pointer — a paste can be a keystroke. */
          const target = event.target as HTMLElement;
          const editors = frame.current?.querySelectorAll('.cm-mergeViewEditor');
          pendingTidy.current = editors?.[1]?.contains(target) ? 'right' : 'left';
        }}>
          <JsonMergeEditor
            handleRef={merge}
            left={left}
            right={right}
            onLeftChange={setLeft}
            onRightChange={setRight}
            leftLabel={s.firstLabel}
            rightLabel={s.secondLabel}
            leftPlaceholder={s.firstPlaceholder}
            rightPlaceholder={s.secondPlaceholder}
            leftMarkers={leftMarkers}
            rightMarkers={rightMarkers}
            collapseIdentical={collapseIdentical}
            applyIntoRight={s.applyRightTitle}
            applyIntoLeft={s.applyLeftTitle}
          />

          {dropSide && (
            <div
              className={`ud-legend pointer-events-none absolute inset-y-0 grid place-items-center bg-ground/85 text-cherry ${
                dropSide === 'left' ? 'left-0 right-1/2' : 'left-1/2 right-0'
              }`}
            >
              {c.dropHere}
            </div>
          )}
        </div>

        <footer className="ud-legend grid shrink-0 grid-cols-2 border-t border-scribe bg-bench">
          <SideFooter
            text={left}
            error={sideError?.side === 'left' ? sideError.error : null}
            strings={strings}
          />
          <SideFooter
            text={right}
            error={sideError?.side === 'right' ? sideError.error : null}
            strings={strings}
            divided
          />
        </footer>
      </section>

      {/* Prose here is set in the body face, not the engraved legend one: the
          legend style is small caps for two-word labels, and a full sentence
          in it is a wall to read rather than a line. The legend row below
          keeps that style, because that is what it is for. */}
      {!bothPresent ? (
        <p className="max-w-prose text-sm leading-relaxed text-temper">
          <Rich text={s.idle} />
        </p>
      ) : result?.identical && !formattingOnly ? (
        <p className="max-w-prose text-sm leading-relaxed text-sound">{s.identicalBody}</p>
      ) : (
        <p className="ud-legend flex flex-wrap items-center gap-x-4 gap-y-1 text-faint">
          <Legend strings={s} />
          {result?.truncated && <Status tone="warn">{s.truncated}</Status>}
          <span className="ml-auto hidden sm:inline">{s.keyboardHint}</span>
        </p>
      )}
    </div>
  );
}

function useMarkers(sideError: SideError, side: Side, text: string): Marker[] {
  return useMemo(() => {
    if (!sideError || sideError.side !== side) return [];
    const { error } = sideError;
    const from = error.offset ?? positionToOffset(text, error.line, error.column);
    return [{ from: Math.max(0, from - 1), to: from + 1, message: error.message }];
  }, [sideError, side, text]);
}

/** One half of the frame's header: a title, and what you can do to that side. */
function SideHeader({
  title,
  text,
  onFile,
  onTidy,
  onClear,
  strings,
  divided = false,
}: {
  title: string;
  text: string;
  onFile: (text: string) => void;
  onTidy: () => void;
  onClear: () => void;
  strings: IslandStrings;
  divided?: boolean;
}) {
  const s = strings.diff;
  const c = strings.common;
  return (
    <div
      className={`flex min-h-12 flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 ${
        divided ? 'border-l border-scribe' : ''
      }`}
    >
      <h2 className="ud-legend text-chalk">{title}</h2>
      <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
        <FileButton onText={onFile} label={c.load} title={c.loadTitle} />
        <Button
          icon="braces"
          onClick={onTidy}
          disabled={!text.trim()}
          aria-label={s.tidyOne}
          title={s.tidyOne}
        />
        <Button
          icon="trash"
          variant="danger"
          onClick={onClear}
          disabled={!text}
          aria-label={c.clear}
          title={c.clear}
        />
      </div>
    </div>
  );
}

function SideFooter({
  text,
  error,
  strings,
  divided = false,
}: {
  text: string;
  error: JsonError | null;
  strings: IslandStrings;
  divided?: boolean;
}) {
  const c = strings.common;
  return (
    <div
      className={`flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1 px-3 py-1.5 ${
        divided ? 'border-l border-scribe' : ''
      }`}
    >
      <span>{formatBytes(new Blob([text]).size)}</span>
      {error && (
        <Status tone="error">
          {fill(c.errorAt, { line: error.line, column: error.column, message: error.message })}
        </Status>
      )}
    </div>
  );
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

/**
 * A structural count. Not a button: these come from the parsed data, and the
 * navigation beside them walks the text — sending one to the other would be
 * quietly wrong on any document where the two disagree.
 */
function Tally({
  kind,
  count,
  strings,
}: {
  kind: ChangeKind;
  count: number;
  strings: IslandStrings['diff'];
}) {
  if (count === 0) return null;
  return (
    <span
      title={fill(strings.tallyTitle, { kind: strings.kinds[kind] })}
      className={`ud-legend inline-flex items-center gap-1 px-1 py-1 ${KIND_TEXT[kind]}`}
    >
      <span aria-hidden="true" className="ud-force text-sm leading-none">
        {KIND_MARK[kind]}
      </span>
      <span className="ud-force tabular-nums">{count}</span>
      <span className="sr-only">{strings.kinds[kind]}</span>
    </span>
  );
}

function Legend({ strings }: { strings: IslandStrings['diff'] }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 bg-fault/35 ring-1 ring-fault/60" />
        {strings.onlyFirst}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 bg-sound/35 ring-1 ring-sound/60" />
        {strings.onlySecond}
      </span>
    </span>
  );
}
