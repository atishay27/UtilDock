import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';

import { Icon } from '../Icon';
import { JsonEditor, type Marker } from '../JsonEditor';
import { Button, FileButton, Panel, Status, Toggle } from '../ui';
import { useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useJsonWorker } from '../../lib/useJsonWorker';
import { formatBytes, positionToOffset, type JsonError } from '../../lib/json/types';
import type { SchemaIssue, ValidationResult } from '../../lib/json/validate';
import { SAMPLE_BROKEN, SAMPLE_DOCUMENT, SAMPLE_SCHEMA } from '../../lib/json/samples';
import { fill, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

export default function JsonValidator({
  lang,
  strings,
}: {
  lang: string;
  strings: IslandStrings;
}) {
  const s = strings.validator;
  const c = strings.common;
  const [input, setInput] = usePersistentState('utildock:json-validator:input', '');
  const [schema, setSchema] = usePersistentState('utildock:json-validator:schema', '');
  const [useSchema, setUseSchema] = usePersistentState('utildock:json-validator:use-schema', false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const run = useJsonWorker('json-validator');
  const editor = useRef<ReactCodeMirrorRef>(null);
  const debouncedInput = useDebounced(input, 180);
  const debouncedSchema = useDebounced(schema, 300);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setResult(null);
      return;
    }
    void run({
      op: 'validate',
      text: debouncedInput,
      schema: useSchema ? debouncedSchema : undefined,
    }).then((response) => setResult(response.result));
  }, [debouncedInput, debouncedSchema, useSchema, run]);

  const syntaxError: JsonError | null =
    result && !result.syntax.ok ? result.syntax.error : null;
  const issues: SchemaIssue[] = result?.schema?.status === 'invalid' ? result.schema.issues : [];

  const markers: Marker[] = useMemo(() => {
    if (syntaxError) {
      const from = syntaxError.offset ?? positionToOffset(input, syntaxError.line, syntaxError.column);
      return [{ from: Math.max(0, from - 1), to: from + 1, message: syntaxError.message }];
    }
    return issues
      .filter((issue) => issue.from && issue.to)
      .map((issue) => ({
        from: issue.from!.offset,
        to: issue.to!.offset,
        message: `${issue.path} ${issue.message}`,
      }));
  }, [syntaxError, issues, input]);

  /** Jump the editor to an issue and put the cursor on it. */
  const revealIssue = useCallback((issue: SchemaIssue) => {
    const view = editor.current?.view;
    if (!view || !issue.from) return;
    const from = Math.min(issue.from.offset, view.state.doc.length);
    const to = Math.min(issue.to?.offset ?? from, view.state.doc.length);
    view.dispatch({
      selection: { anchor: from, head: to },
      effects: [],
      scrollIntoView: true,
    });
    view.focus();
  }, []);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  const isEmpty = !input.trim();

  const verdict = (() => {
    if (isEmpty) return { tone: 'idle' as const, text: s.idle };
    if (!result) return { tone: 'idle' as const, text: s.checking };
    if (syntaxError) {
      return {
        tone: 'error' as const,
        text: fill(s.invalidAt, {
          line: syntaxError.line,
          column: syntaxError.column,
          message: syntaxError.message,
        }),
      };
    }
    if (result.schema?.status === 'schema-error') {
      return { tone: 'warn' as const, text: result.schema.message };
    }
    if (result.schema?.status === 'invalid') {
      return {
        tone: 'error' as const,
        text: plural(lang, s.schemaViolations, issues.length),
      };
    }
    if (result.schema?.status === 'valid') {
      return { tone: 'ok' as const, text: s.validAndMatches };
    }
    return { tone: 'ok' as const, text: c.validJson };
  })();

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[460px] lg:grid-cols-2">
      <Panel
        title={s.documentTitle}
        highlighted={isOver}
        dropHandlers={dropHandlers}
        dropLabel={c.dropHere}
        className="min-h-[320px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
            <Button icon="sparkle" onClick={() => setInput(SAMPLE_DOCUMENT)} title={s.sampleValidTitle}>
              {c.sample}
            </Button>
            <Button onClick={() => setInput(SAMPLE_BROKEN)} title={s.brokenTitle}>
              {s.broken}
            </Button>
            <Button
              icon="trash"
              variant="danger"
              onClick={() => setInput('')}
              disabled={isEmpty}
              aria-label={c.clear}
              title={c.clear}
            />
          </>
        }
        footer={
          <>
            <span>{formatBytes(new Blob([input]).size)}</span>
            <Status tone={verdict.tone}>{verdict.text}</Status>
          </>
        }
      >
        <JsonEditor
          label={s.documentLabel}
          value={input}
          onChange={setInput}
          markers={markers}
          editorRef={editor}
          placeholder={s.placeholder}
        />
      </Panel>

      <div className="grid min-h-0 gap-4" style={{ gridTemplateRows: useSchema ? '1fr 1fr' : '1fr' }}>
        {useSchema && (
          <Panel
            title={s.schemaTitle}
            className="min-h-[220px]"
            actions={
              <>
                <FileButton onText={(text) => setSchema(text)} label={c.load} title={c.loadTitle} />
                <Button icon="sparkle" onClick={() => setSchema(SAMPLE_SCHEMA)} title={c.sampleTitle}>
                  {c.sample}
                </Button>
                <Button
                  icon="trash"
                  variant="danger"
                  onClick={() => setSchema('')}
                  disabled={!schema.trim()}
                  aria-label={c.clear}
                  title={c.clear}
                />
              </>
            }
          >
            <JsonEditor
              label={s.schemaTitle}
              value={schema}
              onChange={setSchema}
              placeholder={s.schemaPlaceholder}
            />
          </Panel>
        )}

        <Panel
          title={s.resultTitle}
          className="min-h-[220px]"
          actions={
            <Toggle checked={useSchema} onChange={setUseSchema} title={s.useSchemaTitle}>
              {s.useSchema}
            </Toggle>
          }
        >
          <ResultBody
            isEmpty={isEmpty}
            syntaxError={syntaxError}
            result={result}
            issues={issues}
            onSelectIssue={revealIssue}
            strings={s}
          />
        </Panel>
      </div>
    </div>
  );
}

interface ResultBodyProps {
  isEmpty: boolean;
  syntaxError: JsonError | null;
  result: ValidationResult | null;
  issues: SchemaIssue[];
  onSelectIssue: (issue: SchemaIssue) => void;
  strings: IslandStrings['validator'];
}

function ResultBody({
  isEmpty,
  syntaxError,
  result,
  issues,
  onSelectIssue,
  strings,
}: ResultBodyProps) {
  if (isEmpty) {
    return (
      <Empty icon="check-shield">{strings.emptyBody}</Empty>
    );
  }

  if (syntaxError) {
    return (
      <div className="h-full overflow-auto p-4">
        <div className="flex items-start gap-3 border border-fault/40 bg-fault/8 p-3">
          <Icon name="x" size={16} className="mt-0.5 shrink-0 text-fault" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-chalk">{syntaxError.message}</p>
            <p className="mt-1 font-mono text-xs text-temper">
              line {syntaxError.line}, column {syntaxError.column}
              {syntaxError.offset !== null && ` · offset ${syntaxError.offset}`}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-faint">
          {strings.firstProblem}
        </p>
      </div>
    );
  }

  if (result?.schema?.status === 'schema-error') {
    return (
      <div className="h-full overflow-auto p-4">
        <div className="flex items-start gap-3 border border-warn/40 bg-warn/8 p-3">
          <Icon name="x" size={16} className="mt-0.5 shrink-0 text-warn" />
          <p className="text-sm text-chalk">{result.schema.message}</p>
        </div>
      </div>
    );
  }

  if (issues.length > 0) {
    return (
      <ul className="h-full divide-y divide-scribe overflow-auto">
        {issues.map((issue, index) => (
          <li key={`${issue.pointer}-${issue.keyword}-${index}`}>
            <button
              type="button"
              onClick={() => onSelectIssue(issue)}
              disabled={!issue.from}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-anvil-lit disabled:cursor-default"
            >
              <Icon name="x" size={15} className="mt-0.5 shrink-0 text-fault" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs break-all text-key">{issue.path}</p>
                <p className="mt-1 text-sm text-chalk">{issue.message}</p>
              </div>
              {issue.from && (
                <span className="shrink-0 font-mono text-xs text-faint">
                  {fill(strings.atLine, { line: issue.from.line })}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Empty icon="check">
      {result?.schema?.status === 'valid' ? strings.okSchema : strings.okPlain}
    </Empty>
  );
}

function Empty({ icon, children }: { icon: 'check' | 'check-shield'; children: React.ReactNode }) {
  const ok = icon === 'check';
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <div>
        <span
          className={`mx-auto grid size-11 place-items-center border ${
            ok ? 'border-sound/40 bg-sound/10 text-sound' : 'border-scribe bg-anvil-lit text-faint'
          }`}
        >
          <Icon name={icon} size={20} />
        </span>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-temper">{children}</p>
      </div>
    </div>
  );
}
