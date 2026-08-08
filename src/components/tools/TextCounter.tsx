import { useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { Button, FileButton, Metric, Panel, PlainEditor, Status } from '../ui';
import { useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { useTextWorker } from '../../lib/useTextWorker';
import { LIMITS } from '../../lib/text/count';
import type { CountPayload } from '../../lib/text/ops';
import { fill, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type CounterStrings = IslandStrings['counter'];

/**
 * Counts are formatted with `Intl.NumberFormat`, which is not decoration: a
 * German reader expects 1.234 where an English one expects 1,234, and a Hindi
 * or Japanese reader expects different grouping again. Hand-inserting commas
 * would be wrong in five of the eight languages this site publishes in.
 */
function useNumberFormat(lang: string) {
  const [format] = useState(() => {
    try {
      return new Intl.NumberFormat(lang);
    } catch {
      return new Intl.NumberFormat('en');
    }
  });
  return (value: number) => format.format(value);
}

/** Seconds as "3 min 20 s", or "under a minute" when there is barely any. */
function duration(seconds: number, strings: CounterStrings): string {
  if (seconds <= 0) return strings.underAMinute;
  if (seconds < 60) return fill(strings.justSeconds, { seconds: Math.max(1, Math.round(seconds)) });
  const minutes = Math.floor(seconds / 60);
  return fill(strings.minutesAndSeconds, { minutes, seconds: Math.round(seconds % 60) });
}

export default function TextCounter({
  lang,
  strings,
  sample,
}: {
  lang: string;
  strings: IslandStrings;
  /** Prose in this page's language, chosen at build time. */
  sample: string;
}) {
  const s = strings.counter;
  const c = strings.common;

  const [input, setInput] = usePersistentState('utildock:text-counter:input', '');
  const [result, setResult] = useState<CountPayload | null>(null);

  const run = useTextWorker('text-counter');
  const debouncedInput = useDebounced(input, 160);
  const number = useNumberFormat(lang);

  useEffect(() => {
    if (debouncedInput === '') {
      setResult(null);
      return;
    }
    void run({ op: 'count', text: debouncedInput, locale: lang }).then((response) => {
      setResult(response.result);
    });
  }, [debouncedInput, lang, run]);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  const isEmpty = input.trim() === '';
  const counts = result?.counts ?? null;

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[520px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <Panel
        title={s.inputTitle}
        highlighted={isOver}
        dropHandlers={dropHandlers}
        dropLabel={c.dropHere}
        className="min-h-[340px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
            <Button icon="sparkle" onClick={() => setInput(sample)} title={c.sampleTitle}>
              {c.sample}
            </Button>
            <Button icon="trash" variant="danger" onClick={() => setInput('')} disabled={isEmpty}>
              {c.clear}
            </Button>
          </>
        }
        footer={
          <>
            {counts && <span>{number(counts.bytes)} B</span>}
            <Status tone={isEmpty ? 'idle' : 'ok'}>
              {isEmpty
                ? s.idle
                : counts
                  ? `${number(counts.words)} · ${number(counts.characters)}`
                  : s.counting}
            </Status>
          </>
        }
      >
        {/* Spellcheck on: this is prose, and the browser's own checker is the
            one piece of language help available without a network request. */}
        <PlainEditor
          label={s.inputLabel}
          value={input}
          onChange={setInput}
          placeholder={s.placeholder}
          spellCheck
        />
      </Panel>

      <div className="min-h-0 overflow-auto">
        {!result ? (
          <EmptyState text={s.emptyBody} />
        ) : (
          <div className="grid gap-4">
            <Panel title={s.countsTitle}>
              <div className="grid grid-cols-2 sm:grid-cols-3">
                <Metric label={s.words} value={number(result.counts.words)} emphasis />
                <Metric label={s.characters} value={number(result.counts.characters)} emphasis />
                <Metric
                  label={s.charactersNoSpaces}
                  value={number(result.counts.charactersNoSpaces)}
                  emphasis
                />
                <Metric label={s.sentences} value={number(result.counts.sentences)} />
                <Metric label={s.paragraphs} value={number(result.counts.paragraphs)} />
                <Metric label={s.lines} value={number(result.counts.lines)} />
              </div>

              {/* Both notices are about the *quality of the number above*, so
                  they sit with it rather than in a footnote nobody reaches. */}
              {!result.precise && (
                <p className="flex items-start gap-2 px-3 py-2.5 text-xs leading-relaxed text-warn">
                  <Icon name="x" size={13} className="mt-0.5 shrink-0" />
                  {s.impreciseNotice}
                </p>
              )}
              {result.precise && result.script === 'cjk' && (
                <p className="flex items-start gap-2 px-3 py-2.5 text-xs leading-relaxed text-faint">
                  <Icon name="check" size={13} className="mt-0.5 shrink-0 text-sound" />
                  {s.cjkNotice}
                </p>
              )}
            </Panel>

            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title={s.timeTitle}>
                <dl className="text-sm">
                  <Row label={s.readingTime} value={duration(result.readingSeconds, s)} />
                  <Row label={s.speakingTime} value={duration(result.speakingSeconds, s)} />
                </dl>
              </Panel>

              <Panel title={s.averagesTitle}>
                <dl className="text-sm">
                  <Row
                    label={s.averageWordLength}
                    value={result.counts.averageWordLength.toFixed(1)}
                  />
                  <Row
                    label={s.averageSentenceLength}
                    value={result.counts.averageSentenceLength.toFixed(1)}
                  />
                  <Row
                    label={s.longestWord}
                    value={plural(lang, s.charsUnit, result.counts.longestWord)}
                  />
                </dl>
              </Panel>
            </div>

            <Panel title={s.limitsTitle} footer={<span className="text-faint">{s.limitsNote}</span>}>
              <div>
                {LIMITS.map((limit) => {
                  const used =
                    limit.unit === 'characters' ? result.counts.characters : result.counts.words;
                  const over = used - limit.max;
                  return (
                    <div
                      key={limit.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-scribe px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <div className="ud-legend text-temper">
                          {s.limitNames[limit.id as keyof typeof s.limitNames] ?? limit.id}
                        </div>
                        {/* The bar is the fast read; the figure beside it is
                            the exact one. Capped at 100% so an essay pasted
                            into the SMS row does not draw off the panel. */}
                        <div className="mt-1.5 h-1 w-full bg-scribe">
                          <div
                            className={`h-full ${over > 0 ? 'bg-fault' : 'bg-sound'}`}
                            style={{ width: `${Math.min(100, (used / limit.max) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`ud-force text-xs tabular-nums ${
                          over > 0 ? 'text-fault' : 'text-temper'
                        }`}
                      >
                        {over > 0
                          ? fill(s.over, { count: number(over) })
                          : fill(s.remaining, { count: number(-over) })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel title={s.frequencyTitle}>
              {result.frequency.length === 0 ? (
                <p className="px-3 py-3 text-xs leading-relaxed text-faint">{s.frequencyEmpty}</p>
              ) : (
                <ol>
                  {result.frequency.map((entry) => (
                    <li
                      key={entry.word}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-3 border-b border-scribe px-3 py-2"
                    >
                      <span className="ud-force truncate text-xs text-chalk">{entry.word}</span>
                      <span className="ud-legend text-faint">
                        {(entry.share * 100).toFixed(1)}%
                      </span>
                      <span className="ud-force text-xs tabular-nums text-temper">
                        {plural(lang, s.frequencyCount, entry.count)}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-scribe px-3 py-2.5">
      <dt className="ud-legend text-faint">{label}</dt>
      <dd className="ud-force text-xs tabular-nums text-chalk">{value}</dd>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="grid h-full min-h-[300px] place-items-center border border-scribe-strong bg-anvil p-6 text-center">
      <div>
        <span className="mx-auto grid size-11 place-items-center border border-scribe bg-anvil-lit text-faint">
          <Icon name="ruler" size={20} />
        </span>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-temper">{text}</p>
      </div>
    </div>
  );
}
