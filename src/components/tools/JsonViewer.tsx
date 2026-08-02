import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, FileButton, Panel, Status } from '../ui';
import { useCopy, useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError, type JsonStats } from '../../lib/json/types';
import { allContainerPaths, buildRows, pathsToDepth, search, type Row } from '../../lib/json/tree';
import { SAMPLE_DOCUMENT } from '../../lib/json/samples';

const ROW_HEIGHT = 24;
const OVERSCAN = 12;

export default function JsonViewer() {
  const [input, setInput] = usePersistentState('utildock:json-viewer:input', '');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['$']));
  const [value, setValue] = useState<unknown>(undefined);
  const [error, setError] = useState<JsonError | null>(null);
  const [stats, setStats] = useState<JsonStats | null>(null);

  const run = useJsonWorker();
  const debouncedInput = useDebounced(input, 180);
  const debouncedQuery = useDebounced(query, 160);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setValue(undefined);
      setError(null);
      setStats(null);
      return;
    }
    void run({ op: 'parse', text: debouncedInput }).then((response) => {
      if (response.ok) {
        setValue(response.value);
        setStats(response.stats);
        setError(null);
        // Open the first two levels so the shape is visible immediately.
        setExpanded(pathsToDepth(response.value, 2));
      } else {
        setValue(undefined);
        setStats(null);
        setError(response.error);
      }
    });
  }, [debouncedInput, run]);

  const searchOutcome = useMemo(
    () => (value === undefined ? null : search(value, debouncedQuery)),
    [value, debouncedQuery],
  );

  const rows = useMemo(() => {
    if (value === undefined) return [];
    // While searching, force ancestors of matches open and hide everything else.
    const effective = searchOutcome?.expand.size
      ? new Set([...expanded, ...searchOutcome.expand])
      : expanded;
    const all = buildRows(value, effective);
    if (!debouncedQuery.trim() || !searchOutcome) return all;
    return all.filter((row) => searchOutcome.visible.has(row.path));
  }, [value, expanded, searchOutcome, debouncedQuery]);

  const toggle = useCallback((path: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const markers: Marker[] = useMemo(() => {
    if (!error) return [];
    const from = error.offset ?? positionToOffset(input, error.line, error.column);
    return [{ from: Math.max(0, from - 1), to: from + 1, message: error.message }];
  }, [error, input]);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  const isEmpty = !input.trim();

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[460px] lg:grid-cols-2">
      <Panel
        title="Source"
        highlighted={isOver}
        dropHandlers={dropHandlers}
        className="min-h-[320px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} />
            <Button icon="sparkle" onClick={() => setInput(SAMPLE_DOCUMENT)}>
              Sample
            </Button>
            <Button icon="trash" variant="danger" onClick={() => setInput('')} disabled={isEmpty} />
          </>
        }
        footer={
          <>
            <span>{formatBytes(new Blob([input]).size)}</span>
            {error ? (
              <Status tone="error">
                Line {error.line}, column {error.column} — {error.message}
              </Status>
            ) : isEmpty ? (
              <Status tone="idle">Paste or drop JSON to explore it</Status>
            ) : (
              <Status tone="ok">Valid JSON</Status>
            )}
          </>
        }
      >
        <JsonEditor
          label="JSON source"
          value={input}
          onChange={setInput}
          markers={markers}
          placeholder={'{\n  "paste": "the JSON you want to explore"\n}'}
        />
      </Panel>

      <Panel
        title="Tree"
        className="min-h-[320px]"
        actions={
          <>
            <div className="relative">
              <Icon
                name="search"
                size={14}
                className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter keys and values"
                aria-label="Filter the tree"
                disabled={value === undefined}
                className="w-44 rounded-lg border border-line bg-surface-2 py-1.5 pr-2 pl-8 text-[13px] text-content transition-colors placeholder:text-faint hover:border-line-strong focus:w-56"
              />
            </div>
            <Button
              onClick={() => value !== undefined && setExpanded(allContainerPaths(value))}
              disabled={value === undefined}
              title="Expand every node"
            >
              Expand all
            </Button>
            <Button
              onClick={() => setExpanded(new Set(['$']))}
              disabled={value === undefined}
              title="Collapse back to the root"
            >
              Collapse
            </Button>
          </>
        }
        footer={
          <>
            {stats ? (
              <>
                <span>
                  {stats.objects} objects · {stats.arrays} arrays · {stats.keys} keys · depth{' '}
                  {stats.depth}
                </span>
                {debouncedQuery.trim() && (
                  <span className="text-accent">
                    {searchOutcome?.matches.size ?? 0} matching{' '}
                    {searchOutcome?.matches.size === 1 ? 'node' : 'nodes'}
                  </span>
                )}
                <span className="ml-auto text-faint">{rows.length} rows shown</span>
              </>
            ) : (
              <span className="text-faint">Nothing to show yet</span>
            )}
          </>
        }
      >
        {value === undefined ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {error
                ? 'Fix the syntax error on the left and the tree will appear here.'
                : 'The tree appears here as soon as there is valid JSON on the left.'}
            </p>
          </div>
        ) : (
          <TreeRows rows={rows} matches={searchOutcome?.matches} onToggle={toggle} />
        )}
      </Panel>
    </div>
  );
}

interface TreeRowsProps {
  rows: Row[];
  matches?: Set<string>;
  onToggle: (path: string) => void;
}

/**
 * Windowed row list. Every row is exactly ROW_HEIGHT tall, so the visible slice
 * is pure arithmetic — no measurement, no per-row observers.
 */
function TreeRows({ rows, matches, onToggle }: TreeRowsProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry!.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(rows.length, Math.ceil((scrollTop + height) / ROW_HEIGHT) + OVERSCAN);
  const slice = rows.slice(start, end);

  if (rows.length === 0) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <p className="text-sm text-muted">No keys or values match that filter.</p>
      </div>
    );
  }

  return (
    <div
      ref={scroller}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      className="h-full overflow-auto font-mono text-[13px]"
      role="tree"
      aria-label="JSON tree"
    >
      <div style={{ height: rows.length * ROW_HEIGHT, position: 'relative' }}>
        <div style={{ transform: `translateY(${start * ROW_HEIGHT}px)` }}>
          {slice.map((row) => (
            <TreeRow
              key={row.path}
              row={row}
              isMatch={matches?.has(row.path) ?? false}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TreeRow({
  row,
  isMatch,
  onToggle,
}: {
  row: Row;
  isMatch: boolean;
  onToggle: (path: string) => void;
}) {
  const { copy, copied } = useCopy(1200);
  const isContainer = row.kind === 'object' || row.kind === 'array';

  return (
    <div
      className={`group flex items-center pr-3 whitespace-nowrap hover:bg-surface-2 ${
        isMatch ? 'bg-accent/10' : ''
      }`}
      style={{ height: ROW_HEIGHT, paddingLeft: 8 + row.depth * 14 }}
      role="treeitem"
      aria-expanded={row.expandable ? row.expanded : undefined}
    >
      {row.expandable ? (
        <button
          type="button"
          onClick={() => onToggle(row.path)}
          className="mr-1 grid size-4 shrink-0 place-items-center rounded text-faint hover:text-content"
          aria-label={row.expanded ? 'Collapse' : 'Expand'}
        >
          <Icon name={row.expanded ? 'chevron-down' : 'chevron-right'} size={12} />
        </button>
      ) : (
        <span className="mr-1 size-4 shrink-0" />
      )}

      {row.key !== null && (
        <>
          <span className={row.keyIsIndex ? 'text-faint' : 'text-key'}>
            {row.keyIsIndex ? row.key : `"${row.key}"`}
          </span>
          <span className="mr-1 text-muted">:</span>
        </>
      )}

      {isContainer ? <Container row={row} /> : <Value row={row} />}

      <button
        type="button"
        onClick={() => void copy(row.path)}
        title={`Copy path — ${row.path}`}
        className="ml-2 hidden shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-faint group-hover:inline-flex hover:bg-surface-3 hover:text-content"
      >
        <Icon name={copied ? 'check' : 'copy'} size={11} />
        {copied ? 'copied' : 'path'}
      </button>
    </div>
  );
}

/** `{` when open; `{ … 5 }` when collapsed, so the size stays visible. */
function Container({ row }: { row: Row }) {
  const [open, close] = row.kind === 'array' ? ['[', ']'] : ['{', '}'];
  if (row.expanded) return <span className="text-muted">{open}</span>;
  return (
    <span className="text-muted">
      {open}
      {row.childCount === 0 ? '' : <span className="text-faint"> … {row.childCount} </span>}
      {close}
    </span>
  );
}

function Value({ row }: { row: Row }) {
  switch (row.kind) {
    case 'string':
      return <span className="text-string">"{String(row.value)}"</span>;
    case 'number':
      return <span className="text-number">{String(row.value)}</span>;
    case 'boolean':
      return <span className="text-boolean">{String(row.value)}</span>;
    default:
      return <span className="text-nullish italic">null</span>;
  }
}
