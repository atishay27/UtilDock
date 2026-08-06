import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, FileButton, Panel, Status } from '../ui';
import { useCopy, useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError, type JsonStats } from '../../lib/json/types';
import { allContainerPaths, buildRows, pathsToDepth, search, type Row } from '../../lib/json/tree';
import { SAMPLE_DOCUMENT } from '../../lib/json/samples';
import { fill, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

const ROW_HEIGHT = 24;
const OVERSCAN = 12;

/** `lang` is the BCP 47 tag; `plural()` needs it for the count phrases. */
export default function JsonViewer({ lang, strings }: { lang: string; strings: IslandStrings }) {
  const s = strings.viewer;
  const c = strings.common;
  const [input, setInput] = usePersistentState('utildock:json-viewer:input', '');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['$']));
  const [value, setValue] = useState<unknown>(undefined);
  const [error, setError] = useState<JsonError | null>(null);
  const [stats, setStats] = useState<JsonStats | null>(null);

  const run = useJsonWorker('json-viewer');
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
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[460px] lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
      <Panel
        title={s.sourceTitle}
        aligned
        highlighted={isOver}
        dropHandlers={dropHandlers}
        dropLabel={c.dropHere}
        className="min-h-[320px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
            <Button icon="sparkle" onClick={() => setInput(SAMPLE_DOCUMENT)} title={c.sampleTitle}>
              {c.sample}
            </Button>
            <Button icon="trash" variant="danger" onClick={() => setInput('')} disabled={isEmpty} />
          </>
        }
        footer={
          <>
            <span>{formatBytes(new Blob([input]).size)}</span>
            {error ? (
              <Status tone="error">
                {fill(c.errorAt, {
                  line: error.line,
                  column: error.column,
                  message: error.message,
                })}
              </Status>
            ) : isEmpty ? (
              <Status tone="idle">{s.idle}</Status>
            ) : (
              <Status tone="ok">{c.validJson}</Status>
            )}
          </>
        }
      >
        <JsonEditor
          label={s.sourceLabel}
          value={input}
          onChange={setInput}
          markers={markers}
          placeholder={s.placeholder}
        />
      </Panel>

      <Panel
        title={s.treeTitle}
        aligned
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
                placeholder={s.filter}
                aria-label={s.filterAria}
                disabled={value === undefined}
                /* w-44 cut the placeholder off mid-word at every width. */
                className="w-52 border border-scribe bg-anvil-lit py-1.5 pr-2 pl-8 text-[13px] text-chalk transition-colors placeholder:text-faint hover:border-scribe-strong focus:w-64"
              />
            </div>
            <Button
              onClick={() => value !== undefined && setExpanded(allContainerPaths(value))}
              disabled={value === undefined}
              title={s.expandAllTitle}
            >
              {s.expandAll}
            </Button>
            <Button
              onClick={() => setExpanded(new Set(['$']))}
              disabled={value === undefined}
              title={s.collapseTitle}
            >
              {s.collapse}
            </Button>
          </>
        }
        footer={
          <>
            {stats ? (
              <>
                <span>
                  {fill(c.stats, {
                    objects: stats.objects,
                    arrays: stats.arrays,
                    keys: stats.keys,
                    depth: stats.depth,
                  })}
                </span>
                {debouncedQuery.trim() && (
                  <span className="text-cherry">
                    {plural(lang, s.matching, searchOutcome?.matches.size ?? 0)}
                  </span>
                )}
                <span className="ml-auto text-faint">
                  {fill(s.rowsShown, { count: rows.length })}
                </span>
              </>
            ) : (
              <span className="text-faint">{s.nothingYet}</span>
            )}
          </>
        }
      >
        {value === undefined ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <p className="max-w-xs text-sm leading-relaxed text-temper">
              {/* Named panels rather than sides: below lg the two stack, and
                  "on the left" then points at nothing. */}
              {error ? s.emptyError : s.emptyValid}
            </p>
          </div>
        ) : (
          <TreeRows
            rows={rows}
            matches={searchOutcome?.matches}
            onToggle={toggle}
            strings={s}
            common={c}
          />
        )}
      </Panel>
    </div>
  );
}

interface TreeRowsProps {
  rows: Row[];
  matches?: Set<string>;
  onToggle: (path: string) => void;
  strings: IslandStrings['viewer'];
  common: IslandStrings['common'];
}

/**
 * Windowed row list. Every row is exactly ROW_HEIGHT tall, so the visible slice
 * is pure arithmetic — no measurement, no per-row observers.
 */
function TreeRows({ rows, matches, onToggle, strings, common }: TreeRowsProps) {
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
        <p className="text-sm text-temper">{strings.noFilterMatch}</p>
      </div>
    );
  }

  return (
    <div
      ref={scroller}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      className="h-full overflow-auto font-mono text-[13px]"
      role="tree"
      aria-label={strings.treeAria}
    >
      <div style={{ height: rows.length * ROW_HEIGHT, position: 'relative' }}>
        <div style={{ transform: `translateY(${start * ROW_HEIGHT}px)` }}>
          {slice.map((row) => (
            <TreeRow
              key={row.path}
              row={row}
              isMatch={matches?.has(row.path) ?? false}
              onToggle={onToggle}
              strings={strings}
              common={common}
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
  strings,
  common,
}: {
  row: Row;
  isMatch: boolean;
  onToggle: (path: string) => void;
  strings: IslandStrings['viewer'];
  common: IslandStrings['common'];
}) {
  const { copy, copied } = useCopy(1200);
  const isContainer = row.kind === 'object' || row.kind === 'array';

  return (
    <div
      className={`group flex items-center pr-3 whitespace-nowrap hover:bg-anvil-lit ${
        isMatch ? 'bg-cherry/10' : ''
      }`}
      style={{ height: ROW_HEIGHT, paddingLeft: 8 + row.depth * 14 }}
      role="treeitem"
      aria-expanded={row.expandable ? row.expanded : undefined}
    >
      {row.expandable ? (
        <button
          type="button"
          onClick={() => onToggle(row.path)}
          className="mr-1 grid size-4 shrink-0 place-items-center text-faint hover:text-chalk"
          aria-label={row.expanded ? strings.collapse : strings.expand}
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
          <span className="mr-1 text-temper">:</span>
        </>
      )}

      {isContainer ? <Container row={row} /> : <Value row={row} />}

      <button
        type="button"
        onClick={() => void copy(row.path)}
        title={fill(common.copyPathTitle, { path: row.path })}
        className="ml-2 hidden shrink-0 items-center gap-1 px-1.5 py-0.5 text-[11px] text-faint group-hover:inline-flex hover:bg-bench hover:text-chalk"
      >
        <Icon name={copied ? 'check' : 'copy'} size={11} />
        {copied ? common.pathCopied : common.path}
      </button>
    </div>
  );
}

/** `{` when open; `{ … 5 }` when collapsed, so the size stays visible. */
function Container({ row }: { row: Row }) {
  const [open, close] = row.kind === 'array' ? ['[', ']'] : ['{', '}'];
  if (row.expanded) return <span className="text-temper">{open}</span>;
  return (
    <span className="text-temper">
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
