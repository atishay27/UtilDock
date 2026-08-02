import { useEffect, useMemo, useState } from 'react';

import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, CopyButton, FileButton, Panel, Select, Status, Toggle } from '../ui';
import { useDebounced, useFileDrop, usePersistentState, useShortcut, downloadText } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError, type JsonStats } from '../../lib/json/types';
import type { IndentStyle } from '../../lib/json/format';
import { SAMPLE_DOCUMENT } from '../../lib/json/samples';

type Mode = 'pretty' | 'minified';

export default function JsonFormatter() {
  const [input, setInput] = usePersistentState('utildock:json-formatter:input', '');
  const [indent, setIndent] = usePersistentState<IndentStyle>('utildock:json-formatter:indent', '2');
  const [sortKeys, setSortKeys] = usePersistentState('utildock:json-formatter:sort', false);
  const [mode, setMode] = useState<Mode>('pretty');

  const [output, setOutput] = useState('');
  const [error, setError] = useState<JsonError | null>(null);
  const [stats, setStats] = useState<JsonStats | null>(null);

  const run = useJsonWorker();
  const debouncedInput = useDebounced(input, 180);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setOutput('');
      setError(null);
      setStats(null);
      return;
    }

    const request =
      mode === 'pretty'
        ? ({ op: 'format', text: debouncedInput, indent, sortKeys } as const)
        : ({ op: 'minify', text: debouncedInput, sortKeys } as const);

    void run(request).then((response) => {
      if (response.ok) {
        setOutput(response.output);
        setStats(response.stats);
        setError(null);
      } else {
        setOutput('');
        setStats(null);
        setError(response.error);
      }
    });
  }, [debouncedInput, indent, sortKeys, mode, run]);

  const markers: Marker[] = useMemo(() => {
    if (!error) return [];
    const from = error.offset ?? positionToOffset(input, error.line, error.column);
    return [{ from: Math.max(0, from - 1), to: from + 1, message: error.message }];
  }, [error, input]);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  useShortcut('Enter', () => setMode('pretty'));

  const isEmpty = !input.trim();

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[440px] lg:grid-cols-2">
      <Panel
        title="Input"
        highlighted={isOver}
        dropHandlers={dropHandlers}
        className="min-h-[300px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} />
            <Button icon="sparkle" onClick={() => setInput(SAMPLE_DOCUMENT)} title="Load a sample document">
              Sample
            </Button>
            <Button icon="trash" variant="danger" onClick={() => setInput('')} disabled={isEmpty}>
              Clear
            </Button>
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
              <Status tone="idle">Paste or drop JSON to begin</Status>
            ) : (
              <Status tone="ok">Valid JSON</Status>
            )}
          </>
        }
      >
        <JsonEditor
          label="JSON input"
          value={input}
          onChange={setInput}
          markers={markers}
          placeholder={'{\n  "paste": "your JSON here"\n}'}
        />
      </Panel>

      <Panel
        title={mode === 'pretty' ? 'Formatted' : 'Minified'}
        className="min-h-[300px]"
        actions={
          <>
            <Select
              label="Indent"
              value={indent}
              disabled={mode === 'minified'}
              onChange={(event) => setIndent(event.target.value as IndentStyle)}
            >
              <option value="2">2 spaces</option>
              <option value="3">3 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </Select>
            <Toggle checked={sortKeys} onChange={setSortKeys} title="Sort object keys alphabetically">
              Sort keys
            </Toggle>
            <div className="flex overflow-hidden rounded-lg border border-line">
              <button
                type="button"
                onClick={() => setMode('pretty')}
                className={`px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === 'pretty' ? 'bg-accent text-accent-contrast' : 'bg-surface-2 text-muted hover:text-content'
                }`}
              >
                Pretty
              </button>
              <button
                type="button"
                onClick={() => setMode('minified')}
                className={`border-l border-line px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === 'minified' ? 'bg-accent text-accent-contrast' : 'bg-surface-2 text-muted hover:text-content'
                }`}
              >
                Minify
              </button>
            </div>
            <CopyButton text={output} />
            <Button
              icon="download"
              onClick={() => downloadText(output, mode === 'pretty' ? 'formatted.json' : 'minified.json')}
              disabled={!output}
              title="Download"
            />
          </>
        }
        footer={
          <>
            <span>{formatBytes(new Blob([output]).size)}</span>
            {stats && (
              <span className="text-faint">
                {stats.objects} objects · {stats.arrays} arrays · {stats.keys} keys · depth{' '}
                {stats.depth}
              </span>
            )}
            {output && input && (
              <span className="ml-auto text-faint">
                {(() => {
                  const before = new Blob([input]).size;
                  const after = new Blob([output]).size;
                  const delta = Math.round(((after - before) / before) * 100);
                  return delta === 0 ? 'same size' : `${delta > 0 ? '+' : ''}${delta}%`;
                })()}
              </span>
            )}
          </>
        }
      >
        <JsonEditor label="Formatted JSON output" value={output} readOnly wrap={mode === 'minified'} />
      </Panel>
    </div>
  );
}
