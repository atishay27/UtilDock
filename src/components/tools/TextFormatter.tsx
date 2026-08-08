import { useCallback, useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { Button, CopyButton, FileButton, Panel, PlainEditor, Select, Status, Toggle } from '../ui';
import { useDebounced, useFileDrop, usePersistentState, downloadText } from '../../lib/hooks';
import { useTextWorker } from '../../lib/useTextWorker';
import { DEFAULT_OPTIONS, isIdentity, type FormatOptions } from '../../lib/text/format';
import { supportedRules } from '../../lib/text/typography';
import type { ChangeCounts } from '../../lib/text/ops';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type FormatterStrings = IslandStrings['textFormatter'];

/**
 * The switches, grouped the way someone reasons about them rather than the way
 * the options object is shaped. Declared as data so the panel is a map rather
 * than three hundred lines of near-identical JSX, and so the order is one thing
 * to change rather than several.
 */
const WHITESPACE_KEYS = [
  'trimLineEnds',
  'collapseSpaces',
  'collapseBlankLines',
  'removeBlankLines',
  'trimDocument',
  'tabsToSpaces',
] as const;

const WRITING_KEYS = [
  'fixRepeatedWords',
  'spaceAfterPunctuation',
  'removeSpaceBeforePunctuation',
  'smartQuotes',
] as const;

export default function TextFormatter({
  lang,
  strings,
  sample,
}: {
  lang: string;
  strings: IslandStrings;
  /** Damaged text carrying only faults this language's switches can fix. */
  sample: string;
}) {
  const s = strings.textFormatter;
  const c = strings.common;

  const [input, setInput] = usePersistentState('utildock:text-formatter:input', '');
  const [options, setOptions] = usePersistentState<FormatOptions>(
    'utildock:text-formatter:options',
    DEFAULT_OPTIONS,
  );

  const [output, setOutput] = useState('');
  const [changes, setChanges] = useState<ChangeCounts>({});
  const [unchanged, setUnchanged] = useState(false);
  const [working, setWorking] = useState(false);

  const run = useTextWorker('text-formatter');
  const debouncedInput = useDebounced(input, 180);

  /* Stored options are merged over the defaults rather than used as-is. A
     visitor who saved preferences before a new switch existed would otherwise
     get `undefined` for it, which reads as false and silently turns off
     something that ships on. */
  const effective: FormatOptions = { ...DEFAULT_OPTIONS, ...options };
  const nothingEnabled = isIdentity(effective);

  /* Which punctuation rules mean anything in this language. A rule that does
     not is disabled rather than hidden — someone looking for it should find it
     with a reason attached, not conclude the tool lost a feature. */
  const supported = supportedRules(lang);

  useEffect(() => {
    if (debouncedInput === '' || nothingEnabled) {
      setOutput('');
      setChanges({});
      setUnchanged(false);
      return;
    }

    setWorking(true);
    void run({ op: 'format', text: debouncedInput, options: effective, locale: lang }).then((response) => {
      setWorking(false);
      setOutput(response.output);
      setChanges(response.changes);
      setUnchanged(response.unchanged);
    });
    // `effective` is rebuilt every render, so the options are spread into the
    // dependency list by value rather than by identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput, nothingEnabled, run, lang, JSON.stringify(effective)]);

  const set = useCallback(
    <K extends keyof FormatOptions>(key: K, value: FormatOptions[K]) => {
      setOptions((previous) => ({ ...DEFAULT_OPTIONS, ...previous, [key]: value }));
    },
    [setOptions],
  );

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  const isEmpty = input.trim() === '';


  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)_minmax(0,1fr)]">
      <Panel
        title={s.inputTitle}
        highlighted={isOver}
        dropHandlers={dropHandlers}
        dropLabel={c.dropHere}
        className="min-h-[300px]"
        actions={
          <>
            <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
            <Button
              icon="sparkle"
              onClick={() => setInput(sample)}
              title={c.sampleTitle}
            >
              {c.sample}
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
      >
        <PlainEditor
          label={s.inputLabel}
          value={input}
          onChange={setInput}
          placeholder={s.placeholder}
          spellCheck
        />
      </Panel>

      {/* The switch panel sits between input and output, so the cause is
          physically between the two things it relates. */}
      <Panel
        title={s.optionsTitle}
        className="min-h-[300px]"
        actions={
          <Button onClick={() => setOptions(DEFAULT_OPTIONS)} title={s.resetTitle}>
            {s.reset}
          </Button>
        }
      >
        {/* Vertical only. `overflow-auto` allowed a horizontal bar that both
            stole a row of height and hid the counts sitting at the right edge. */}
        <div className="h-full overflow-x-hidden overflow-y-auto">
          <Group heading={s.whitespaceHeading}>
            {WHITESPACE_KEYS.map((key) => (
              <SwitchRow
                key={key}
                checked={effective[key]}
                onChange={(value) => set(key, value)}
                label={s[key]}
                title={s[`${key}Title` as keyof FormatterStrings] as string}
                count={changes[key]}
                flag={key === 'trimDocument'}
                /* "All blank lines" makes "extra blank lines" meaningless —
                   the stronger rule already removes what the weaker one
                   would have collapsed. */
                disabled={key === 'collapseBlankLines' && effective.removeBlankLines}
              />
            ))}
          </Group>

          <Group heading={s.linesHeading}>
            <SwitchRow
              checked={effective.removeDuplicateLines}
              onChange={(value) => set('removeDuplicateLines', value)}
              label={s.removeDuplicateLines}
              title={s.removeDuplicateLinesTitle}
              count={changes.removeDuplicateLines}
            />
            <div className="px-3 py-2">
              <Select
                label={s.sortLines}
                value={effective.sortLines}
                onChange={(event) =>
                  set('sortLines', event.target.value as FormatOptions['sortLines'])
                }
              >
                {(['none', 'asc', 'desc'] as const).map((mode) => (
                  <option key={mode} value={mode}>
                    {s.sortModes[mode]}
                  </option>
                ))}
              </Select>
            </div>
          </Group>

          <Group heading={s.caseHeading}>
            <div className="px-3 py-2">
              {/* The group heading above already says "Case", so repeating it
                  as the control's label added nothing and wrapped to three
                  lines in the 15rem column. The name survives for screen
                  readers via aria-label. */}
              <Select
                label=""
                aria-label={s.caseHeading}
                value={effective.caseMode}
                onChange={(event) =>
                  set('caseMode', event.target.value as FormatOptions['caseMode'])
                }
              >
                {(['none', 'lower', 'upper', 'title', 'sentence'] as const).map((mode) => (
                  <option key={mode} value={mode}>
                    {s.caseModes[mode]}
                  </option>
                ))}
              </Select>
            </div>
          </Group>

          {/* Rules with no meaning in this language are not rendered at all.
              They were shown disabled with a note explaining why, which was
              honest and also clutter — a switch you can never use is not worth
              the two lines it costs. The reasoning lives in the prose below
              the tool, where someone who wants it will look. */}
          <Group heading={s.writingHeading}>
            {WRITING_KEYS.filter((key) => supported[key]).map((key) => (
              <SwitchRow
                key={key}
                checked={effective[key]}
                onChange={(value) => set(key, value)}
                label={s[key]}
                title={s[`${key}Title` as keyof FormatterStrings] as string}
                count={changes[key]}
              />
            ))}
          </Group>
        </div>
      </Panel>

      <Panel
        title={s.outputTitle}
        className="min-h-[300px]"
        strikeKey={output}
        actions={
          <>
            <Button
              icon="arrow-right"
              onClick={() => setInput(output)}
              disabled={!output || unchanged}
              title={s.replaceInputTitle}
            >
              {s.replaceInput}
            </Button>
            <CopyButton text={output} label={c.copy} copiedLabel={c.copied} title={c.copyTitle} />
            <Button
              icon="download"
              onClick={() => downloadText(output, s.outputFile)}
              disabled={!output}
              title={c.download}
            />
          </>
        }
        /* The change receipt lives in the footer, not the body.
           Inside the body it was a variable-height block, so the editor
           visibly shrank the moment a rule fired — 21px for one rule, 84px
           for several. The footer is a fixed strip, so the editor now keeps
           its size no matter how much the formatter reports. */
        footer={
          <>
            <Status
              tone={
                nothingEnabled || isEmpty
                  ? 'idle'
                  : working
                    ? 'idle'
                    : unchanged
                      ? 'idle'
                      : 'ok'
              }
            >
              {isEmpty
                ? s.idle
                : nothingEnabled
                  ? s.nothingEnabled
                  : working
                    ? s.formatting
                    : unchanged
                      ? s.noChanges
                      : s.changesTitle}
            </Status>

          </>
        }
      >
        {output ? (
          <PlainEditor label={s.outputLabel} value={output} readOnly />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center">
            <div>
              <span className="mx-auto grid size-11 place-items-center border border-scribe bg-anvil-lit text-faint">
                <Icon name="plane" size={20} />
              </span>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-temper">
                {nothingEnabled ? s.nothingEnabled : s.emptyBody}
              </p>
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="ud-legend sticky top-0 z-10 border-b border-scribe bg-bench px-3 py-2 text-faint">
        {heading}
      </h3>
      <div className="border-b border-scribe py-1">{children}</div>
    </section>
  );
}

/**
 * A switch, and what it did.
 *
 * The count used to live in a summary strip under the output. That strip
 * changed height as rules fired — it wrapped to two lines, right-aligned
 * itself and clipped its last entry — and it put the report a long way from
 * the control that caused it. Here the number sits on the row it belongs to,
 * costs no layout, and cannot overflow.
 */
function SwitchRow({
  checked,
  onChange,
  label,
  title,
  disabled = false,
  count,
  flag = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  title?: string;
  disabled?: boolean;
  /** How many times this rule fired on the current input. */
  count?: number;
  /** True for rules that either happened or did not — no meaningful count. */
  flag?: boolean;
}) {
  const fired = (count ?? 0) > 0;
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-1.5">
      {/* `min-w-0` plus `whitespace-normal` let a long label wrap onto a second
          line instead of overflowing the 15rem column. Without them the panel
          grew a horizontal scrollbar and pushed the count out of sight, which
          is the one thing this readout exists to avoid.

          Centre-aligned, not top: on a label that wraps to two lines a
          top-aligned box sits against the first line and reads as misaligned
          rather than as a deliberate hang. */}
      <Toggle
        checked={checked}
        onChange={onChange}
        title={title}
        disabled={disabled}
        className="min-w-0 flex-1"
      >
        <span className="whitespace-normal">{label}</span>
      </Toggle>
      {fired &&
        (flag ? (
          <span className="size-1.5 shrink-0 bg-sound" aria-hidden="true" />
        ) : (
          <span className="ud-force shrink-0 text-xs tabular-nums text-sound">{count}</span>
        ))}
    </div>
  );
}
