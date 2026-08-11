import { useEffect, useMemo, useState } from 'react';

import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, CopyButton, FileButton, Panel, Select, Status, Toggle } from '../ui';
import { useDebounced, useFileDrop, usePersistentState, downloadText } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError, type JsonStats } from '../../lib/json/types';
import type { IndentStyle } from '../../lib/json/format';
import { SAMPLE_DOCUMENT } from '../../lib/json/samples';
import { fill, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type Mode = 'pretty' | 'minified';

/**
 * `strings` arrives as a prop rather than being imported.
 *
 * An import here would pull a dictionary — and through it, every locale's
 * dictionary — into this island's chunk, which is the one cost this whole
 * approach exists to avoid. As a prop, the JavaScript is byte-identical in
 * every language and only the handful of strings this tool uses are serialised
 * into the page.
 */
export default function JsonFormatter({
  lang,
  strings,
}: {
  lang: string;
  strings: IslandStrings;
}) {
  const s = strings.formatter;
  const c = strings.common;
  const [input, setInput] = usePersistentState('utildock:json-formatter:input', '');
  const [indent, setIndent] = usePersistentState<IndentStyle>('utildock:json-formatter:indent', '2');
  const [sortKeys, setSortKeys] = usePersistentState('utildock:json-formatter:sort', false);
  const [removeNulls, setRemoveNulls] = usePersistentState(
    'utildock:json-formatter:nulls',
    false,
  );
  const [mode, setMode] = useState<Mode>('pretty');

  const [output, setOutput] = useState('');
  const [error, setError] = useState<JsonError | null>(null);
  const [stats, setStats] = useState<JsonStats | null>(null);
  const [nullsRemoved, setNullsRemoved] = useState(0);

  const run = useJsonWorker('json-formatter');
  const debouncedInput = useDebounced(input, 180);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setOutput('');
      setError(null);
      setStats(null);
      setNullsRemoved(0);
      return;
    }

    const request =
      mode === 'pretty'
        ? ({ op: 'format', text: debouncedInput, indent, sortKeys, removeNulls } as const)
        : ({ op: 'minify', text: debouncedInput, sortKeys, removeNulls } as const);

    void run(request).then((response) => {
      if (response.ok) {
        setOutput(response.output);
        setStats(response.stats);
        setNullsRemoved(response.nullsRemoved);
        setError(null);
      } else {
        setOutput('');
        setStats(null);
        setNullsRemoved(0);
        setError(response.error);
      }
    });
  }, [debouncedInput, indent, sortKeys, removeNulls, mode, run]);

  const markers: Marker[] = useMemo(() => {
    if (!error) return [];
    const from = error.offset ?? positionToOffset(input, error.line, error.column);
    return [{ from: Math.max(0, from - 1), to: from + 1, message: error.message }];
  }, [error, input]);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));

  const isEmpty = !input.trim();

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[440px] lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
      <Panel
        title={s.inputTitle}
        aligned
        highlighted={isOver}
        dropHandlers={dropHandlers}
        dropLabel={c.dropHere}
        className="min-h-[300px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
            <Button icon="sparkle" onClick={() => setInput(SAMPLE_DOCUMENT)} title={c.sampleTitle}>
              {c.sample}
            </Button>
            <Button icon="trash" variant="danger" onClick={() => setInput('')} disabled={isEmpty}>
              {c.clear}
            </Button>
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
          label={s.inputLabel}
          value={input}
          onChange={setInput}
          markers={markers}
          placeholder={s.placeholder}
        />
      </Panel>

      <Panel
        title={mode === 'pretty' ? s.formattedTitle : s.minifiedTitle}
        aligned
        strikeKey={output}
        className="min-h-[300px]"
        actions={
          <>
            <Select
              label={s.indent}
              value={indent}
              disabled={mode === 'minified'}
              onChange={(event) => setIndent(event.target.value as IndentStyle)}
            >
              <option value="2">{fill(s.spaces, { count: 2 })}</option>
              <option value="3">{fill(s.spaces, { count: 3 })}</option>
              <option value="4">{fill(s.spaces, { count: 4 })}</option>
              <option value="tab">{s.tab}</option>
            </Select>
            <Toggle checked={sortKeys} onChange={setSortKeys} title={s.sortKeysTitle}>
              {s.sortKeys}
            </Toggle>
            <Toggle checked={removeNulls} onChange={setRemoveNulls} title={c.removeNullsTitle}>
              {c.removeNulls}
            </Toggle>
            <div className="flex border border-scribe-strong">
              {(['pretty', 'minified'] as const).map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  aria-pressed={mode === option}
                  className={`ud-legend px-3 py-1.5 transition-colors ${index > 0 ? 'border-l border-scribe-strong' : ''} ${
                    mode === option
                      ? 'bg-cherry text-on-cherry'
                      : 'bg-anvil text-temper hover:text-chalk'
                  }`}
                >
                  {option === 'pretty' ? s.pretty : s.minify}
                </button>
              ))}
            </div>
          </>
        }
        /* Copy and Download live in the footer: keeping them out of the header
           stops it wrapping to two rows at intermediate widths, which used to
           push this editor's first line out of step with the input's. */
        footer={
          <>
            <span>{formatBytes(new Blob([output]).size)}</span>
            {stats && (
              <span className="text-faint">
                {fill(c.stats, {
                  objects: stats.objects,
                  arrays: stats.arrays,
                  keys: stats.keys,
                  depth: stats.depth,
                })}
              </span>
            )}
            {nullsRemoved > 0 && (
              <span className="text-sound">{plural(lang, c.nullsRemoved, nullsRemoved)}</span>
            )}
            {output && input && (
              <span className="text-faint">
                {(() => {
                  const before = new Blob([input]).size;
                  const after = new Blob([output]).size;
                  const delta = Math.round(((after - before) / before) * 100);
                  return delta === 0
                    ? s.sameSize
                    : fill(s.sizeDelta, { delta: `${delta > 0 ? '+' : ''}${delta}` });
                })()}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1.5">
              <CopyButton
                text={output}
                label={c.copy}
                copiedLabel={c.copied}
                title={c.copyTitle}
              />
              <Button
                icon="download"
                onClick={() =>
                  downloadText(output, mode === 'pretty' ? s.prettyFile : s.minifiedFile)
                }
                disabled={!output}
                title={c.download}
              />
            </span>
          </>
        }
      >
        <JsonEditor label={s.outputLabel} value={output} readOnly wrap={mode === 'minified'} />
      </Panel>
    </div>
  );
}
