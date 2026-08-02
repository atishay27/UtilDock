import { useEffect, useMemo, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, FileButton, Panel, Status } from '../ui';
import { useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError } from '../../lib/json/types';
import type { Change, ChangeKind, DiffResult } from '../../lib/json/diff';
import { SAMPLE_DIFF_LEFT, SAMPLE_DIFF_RIGHT } from '../../lib/json/samples';

type SideError = { side: 'left' | 'right'; error: JsonError } | null;

export default function JsonDiff() {
  const [left, setLeft] = usePersistentState('utildock:json-diff:left', '');
  const [right, setRight] = usePersistentState('utildock:json-diff:right', '');
  const [result, setResult] = useState<DiffResult | null>(null);
  const [sideError, setSideError] = useState<SideError>(null);
  const [filter, setFilter] = useState<ChangeKind | 'all'>('all');

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

  const visibleChanges = useMemo(() => {
    if (!result) return [];
    return filter === 'all' ? result.changes : result.changes.filter((c) => c.kind === filter);
  }, [result, filter]);

  const loadSample = () => {
    setLeft(SAMPLE_DIFF_LEFT);
    setRight(SAMPLE_DIFF_RIGHT);
  };

  const swap = () => {
    setLeft(right);
    setRight(left);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <Panel
          title="Original"
          aligned
          highlighted={leftDrop.isOver}
          dropHandlers={leftDrop.dropHandlers}
          className="h-[38vh] min-h-[260px]"
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
          className="h-[38vh] min-h-[260px]"
          actions={
            <>
              <FileButton onText={(text) => setRight(text)} />
              <Button icon="trash" variant="danger" onClick={() => setRight('')} disabled={!right} />
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

      <Panel
        title="Differences"
        className="min-h-[280px]"
        actions={
          <>
            {result && !result.identical && (
              <div className="mr-1 flex items-center gap-1">
                <FilterChip kind="all" active={filter} onSelect={setFilter} count={result.changes.length} />
                <FilterChip kind="added" active={filter} onSelect={setFilter} count={result.counts.added} />
                <FilterChip kind="removed" active={filter} onSelect={setFilter} count={result.counts.removed} />
                <FilterChip kind="changed" active={filter} onSelect={setFilter} count={result.counts.changed} />
                {result.counts.moved > 0 && (
                  <FilterChip kind="moved" active={filter} onSelect={setFilter} count={result.counts.moved} />
                )}
              </div>
            )}
            <Button icon="sparkle" onClick={loadSample}>
              Sample
            </Button>
            <Button icon="convert" onClick={swap} disabled={!left && !right} title="Swap the two sides">
              Swap
            </Button>
          </>
        }
      >
        <DiffBody
          left={left}
          right={right}
          result={result}
          sideError={sideError}
          changes={visibleChanges}
        />
      </Panel>
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

const KIND_LABEL: Record<ChangeKind | 'all', string> = {
  all: 'All',
  added: 'Added',
  removed: 'Removed',
  changed: 'Changed',
  moved: 'Moved',
};

function FilterChip({
  kind,
  active,
  onSelect,
  count,
}: {
  kind: ChangeKind | 'all';
  active: ChangeKind | 'all';
  onSelect: (kind: ChangeKind | 'all') => void;
  count: number;
}) {
  const isActive = active === kind;
  return (
    <button
      type="button"
      onClick={() => onSelect(kind)}
      disabled={count === 0 && kind !== 'all'}
      className={`ud-legend border px-2 py-1 transition-colors disabled:opacity-35 ${
        isActive
          ? 'border-cherry bg-cherry text-on-cherry'
          : 'border-transparent text-temper hover:border-scribe-strong hover:text-chalk'
      }`}
    >
      {KIND_LABEL[kind]} <span className="tabular-nums">{count}</span>
    </button>
  );
}

function DiffBody({
  left,
  right,
  result,
  sideError,
  changes,
}: {
  left: string;
  right: string;
  result: DiffResult | null;
  sideError: SideError;
  changes: Change[];
}) {
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

  if (changes.length === 0) {
    return <Centered>No differences of that kind.</Centered>;
  }

  return (
    <ul className="h-full divide-y divide-scribe overflow-auto">
      {changes.map((change, index) => (
        <ChangeRow key={`${change.path}-${change.kind}-${index}`} change={change} />
      ))}
    </ul>
  );
}

const KIND_STYLE: Record<ChangeKind, { badge: string; icon: 'arrow-right' | 'x' | 'check' | 'convert' }> = {
  added: { badge: 'border-sound/40 bg-sound/10 text-sound', icon: 'check' },
  removed: { badge: 'border-fault/40 bg-fault/10 text-fault', icon: 'x' },
  changed: { badge: 'border-warn/40 bg-warn/10 text-warn', icon: 'arrow-right' },
  moved: { badge: 'border-scribe-strong bg-bench text-temper', icon: 'convert' },
};

function ChangeRow({ change }: { change: Change }) {
  const style = KIND_STYLE[change.kind];
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <span
        className={`mt-0.5 inline-flex shrink-0 items-center gap-1 border px-1.5 py-0.5 text-[11px] font-medium ${style.badge}`}
      >
        <Icon name={style.icon} size={11} />
        {KIND_LABEL[change.kind]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs break-all text-key">{change.path || '(root)'}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-xs">
          {change.kind === 'moved' ? (
            <span className="text-temper">moved to index {change.toIndex}</span>
          ) : (
            <>
              {change.kind !== 'added' && <ValueChip value={change.left} tone="removed" />}
              {change.kind === 'changed' && <Icon name="arrow-right" size={13} className="text-faint" />}
              {change.kind !== 'removed' && <ValueChip value={change.right} tone="added" />}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

function ValueChip({ value, tone }: { value: unknown; tone: 'added' | 'removed' }) {
  const text = preview(value);
  return (
    <code
      className={`max-w-full truncate border px-1.5 py-0.5 ${
        tone === 'added'
          ? 'border-sound/30 bg-sound/8 text-sound'
          : 'border-fault/30 bg-fault/8 text-fault'
      }`}
      title={text}
    >
      {text}
    </code>
  );
}

function preview(value: unknown, limit = 120): string {
  let text: string;
  try {
    text = JSON.stringify(value) ?? String(value);
  } catch {
    text = String(value);
  }
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <p className="max-w-md text-sm leading-relaxed text-temper">{children}</p>
    </div>
  );
}
