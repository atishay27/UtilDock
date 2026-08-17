import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor } from '../JsonEditor';
import { Button, CopyButton, FileButton, Gauge, Panel, Status, Toggle } from '../ui';
import { useDebounced, useFileDrop, usePersistentState } from '../../lib/hooks';
import { trackEvent } from '../../lib/analytics';
import {
  decodeToken,
  formatClaimValue,
  isTimeClaim,
  normalizeToken,
  readTimeClaim,
  splitClaims,
  windowState,
  type DecodedToken,
  type TimeReading,
  type WindowState,
} from '../../lib/jwt/decode';
import {
  isSymmetric,
  verifySignature,
  type SecretEncoding,
  type VerifyResult,
} from '../../lib/jwt/verify';
import { SAMPLE_EXPIRED_TOKEN, SAMPLE_SECRET, SAMPLE_TOKEN } from '../../lib/jwt/samples';
import { fill, parseRich, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type JwtStrings = IslandStrings['jwt'];

/** Renders the `**bold**` and `` `code` `` a few of these strings carry. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {parseRich(text).map((token, index) =>
        token.t === 'strong' ? (
          <strong key={index} className="text-chalk">
            {token.v}
          </strong>
        ) : token.t === 'code' ? (
          <code key={index} className="ud-force text-key">
            {token.v}
          </code>
        ) : (
          <span key={index}>{token.v}</span>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------ the tool --- */

export default function JwtDecoder({ lang, strings }: { lang: string; strings: IslandStrings }) {
  const s = strings.jwt;
  const c = strings.common;

  const [input, setInput] = usePersistentState('utildock:jwt-decoder:input', '');
  const [checking, setChecking] = usePersistentState('utildock:jwt-decoder:verify', false);
  const [secretIsBase64, setSecretIsBase64] = usePersistentState(
    'utildock:jwt-decoder:secret-b64',
    false,
  );

  /**
   * The verification key is the one input on this site held in memory only.
   *
   * `usePersistentState` would put a signing secret in `localStorage`, where it
   * would outlive the tab and survive into whatever else can read this origin.
   * The tool says as much in the panel; this line is what makes that true.
   */
  const [key, setKey] = useState('');

  const [verdict, setVerdict] = useState<VerifyResult | null>(null);
  const [verifying, setVerifying] = useState(false);

  /* Relative times ("expired 2 months ago") go stale as the page sits open.
     Zero until mounted, so the server render and the first client render agree. */
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const decoded = useMemo(() => decodeToken(input), [input]);
  const token: DecodedToken | null = decoded.ok ? decoded.token : null;

  /* One event, carrying the tool id and nothing else — the same contract the
     JSON tools get from `useJsonWorker`, which this tool does not use. */
  const reported = useRef(false);
  useEffect(() => {
    if (!token || reported.current) return;
    reported.current = true;
    trackEvent('tool_used', { tool_id: 'jwt-decoder' });
  }, [token]);

  const signingInput = useMemo(() => {
    if (!token) return '';
    return `${token.parts.header}.${token.parts.payload}`;
  }, [token]);

  const debouncedKey = useDebounced(key, 300);

  useEffect(() => {
    if (!checking || !token) {
      setVerdict(null);
      return;
    }

    let cancelled = false;
    setVerifying(true);

    void verifySignature({
      signingInput,
      signature: token.parts.signature,
      algorithm: token.algorithm,
      keyId: token.keyId,
      key: debouncedKey,
      secretEncoding: (secretIsBase64 ? 'base64url' : 'utf-8') satisfies SecretEncoding,
    }).then((result) => {
      if (cancelled) return;
      setVerdict(result);
      setVerifying(false);
    });

    return () => {
      cancelled = true;
    };
  }, [checking, token, signingInput, debouncedKey, secretIsBase64]);

  const { isOver, dropHandlers } = useFileDrop((text) => setInput(text));
  const isEmpty = !input.trim();

  const payloadClaims = token?.payload.claims ?? null;
  const validity: WindowState | null = payloadClaims ? windowState(payloadClaims, now || undefined) : null;

  /* The signature's colour in the token strip is a real state, not decoration:
     cold until it has been proven, then sound or crack. */
  const signatureTone: 'cold' | 'sound' | 'fault' =
    verdict?.status === 'valid' ? 'sound' : verdict?.status === 'invalid' ? 'fault' : 'cold';

  const tokenStatus = (() => {
    if (isEmpty) return { tone: 'idle' as const, text: s.idle };
    if (!decoded.ok) return { tone: 'error' as const, text: s.faults[decoded.fault] };
    const fault = token!.header.fault ?? token!.payload.fault;
    if (fault) return { tone: 'warn' as const, text: s.faults[fault] };
    return { tone: 'ok' as const, text: s.decoded };
  })();

  const usingSample = normalizeToken(input) === SAMPLE_TOKEN;

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[560px] lg:grid-cols-2">
      {/* Left: what was pasted, and whether it can be trusted. */}
      <div className="grid min-h-0 gap-4 lg:grid-rows-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Panel
          title={s.tokenTitle}
          highlighted={isOver}
          dropHandlers={dropHandlers}
          dropLabel={c.dropHere}
          className="min-h-[220px]"
          actions={
            <>
              <FileButton onText={(text) => setInput(text)} label={c.load} title={c.loadTitle} />
              <Button icon="sparkle" onClick={() => setInput(SAMPLE_TOKEN)} title={s.sampleTitle}>
                {c.sample}
              </Button>
              <Button onClick={() => setInput(SAMPLE_EXPIRED_TOKEN)} title={s.expiredTitle}>
                {s.expired}
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
              <SegmentLegend token={token} strings={s} lang={lang} signatureTone={signatureTone} />
              <Status tone={tokenStatus.tone}>{tokenStatus.text}</Status>
            </>
          }
        >
          <TokenInput
            value={input}
            onChange={setInput}
            label={s.tokenLabel}
            placeholder={s.placeholder}
            signatureTone={signatureTone}
          />
        </Panel>

        <Panel
          title={s.signatureTitle}
          className="min-h-[260px]"
          strikeKey={verdict?.status === 'valid' ? `valid-${signingInput.length}` : undefined}
          actions={
            <Toggle checked={checking} onChange={setChecking} title={s.verifyTitle}>
              {s.verify}
            </Toggle>
          }
          footer={
            <Status
              tone={
                !checking || !verdict
                  ? 'idle'
                  : verdict.status === 'valid'
                    ? 'ok'
                    : verdict.status === 'no-key'
                      ? 'idle'
                      : verdict.status === 'invalid'
                        ? 'error'
                        : 'warn'
              }
            >
              {!checking
                ? s.notChecked
                : verifying
                  ? s.checking
                  : verdict
                    ? fill(s.verdicts[verdict.status], { algorithm: verdict.algorithm ?? '' })
                    : s.notChecked}
            </Status>
          }
        >
          <SignaturePanel
            token={token}
            checking={checking}
            onCheckingChange={setChecking}
            keyText={key}
            onKeyChange={setKey}
            secretIsBase64={secretIsBase64}
            onSecretIsBase64Change={setSecretIsBase64}
            usingSample={usingSample}
            verdict={verdict}
            strings={s}
          />
        </Panel>
      </div>

      {/* Right: what the token actually says. */}
      <div className="grid min-h-0 gap-4 lg:grid-rows-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel
          title={s.claimsTitle}
          className="min-h-[280px]"
          footer={
            validity && (
              <Status
                tone={
                  validity === 'valid'
                    ? 'ok'
                    : validity === 'unbounded'
                      ? 'warn'
                      : 'error'
                }
              >
                {validity === 'expired'
                  ? s.windowExpired
                  : validity === 'not-yet-valid'
                    ? s.windowNotYet
                    : validity === 'unbounded'
                      ? s.windowUnbounded
                      : s.windowValid}
              </Status>
            )
          }
        >
          <ClaimsBody claims={payloadClaims} now={now} lang={lang} strings={s} />
        </Panel>

        <div className="grid min-h-0 gap-4 sm:grid-cols-2">
          <SegmentPanel
            title={s.headerTitle}
            label={s.headerLabel}
            segment={token?.header ?? null}
            strings={s}
            common={c}
            footer={
              token && (
                <>
                  {token.algorithm && <Gauge label={s.algorithm} value={token.algorithm} />}
                  {token.keyId && <Gauge label={s.keyId} value={token.keyId} />}
                </>
              )
            }
          />
          <SegmentPanel
            title={s.payloadTitle}
            label={s.payloadLabel}
            segment={token?.payload ?? null}
            strings={s}
            common={c}
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- token input --- */

/**
 * The pasted token, with its three parts coloured underneath a transparent
 * textarea.
 *
 * The two layers wrap identically only while their content boxes are exactly
 * the same width, so the textarea's scrollbar is suppressed (it would steal a
 * few pixels on platforms that reserve space for one) and its scroll position
 * is mirrored onto the layer below.
 */
const TOKEN_LAYER =
  'absolute inset-0 m-0 h-full w-full border-0 p-3 font-mono text-[0.8125rem] leading-[1.65] break-all whitespace-pre-wrap';

function TokenInput({
  value,
  onChange,
  label,
  placeholder,
  signatureTone,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  signatureTone: 'cold' | 'sound' | 'fault';
}) {
  const mirror = useRef<HTMLPreElement>(null);

  const syncScroll = useCallback((event: React.UIEvent<HTMLTextAreaElement>) => {
    const layer = mirror.current;
    if (!layer) return;
    layer.scrollTop = event.currentTarget.scrollTop;
  }, []);

  return (
    <div className="relative h-full">
      <pre ref={mirror} aria-hidden="true" className={`${TOKEN_LAYER} overflow-hidden text-chalk`}>
        {highlight(value, signatureTone)}
      </pre>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onScroll={syncScroll}
        aria-label={label}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        className={`${TOKEN_LAYER} ud-hide-scrollbar resize-none overflow-auto bg-transparent text-transparent caret-cherry placeholder:text-cold focus:outline-none`}
      />
    </div>
  );
}

/* Written out rather than derived, because Tailwind generates only the class
   names it can see in the source. A `.replace('text-', 'bg-')` at runtime
   produces a class that was never compiled. */
const SIGNATURE_COLOURS = {
  cold: 'text-cold',
  sound: 'text-sound',
  fault: 'text-fault',
} as const;

const SIGNATURE_MARKS = {
  cold: 'bg-cold',
  sound: 'bg-sound',
  fault: 'bg-fault',
} as const;

/**
 * Colour the raw text exactly as typed — the layer has to line up character for
 * character with the textarea above it, so nothing may be trimmed or rewritten
 * here. Whatever `normalizeToken` would strip is drawn faint instead, which is
 * also how the visitor learns their `Bearer ` prefix is being ignored rather
 * than misread.
 */
function highlight(raw: string, signatureTone: 'cold' | 'sound' | 'fault') {
  if (raw === '') return null;

  const lead = /^[\s"'`]*(?:[Bb][Ee][Aa][Rr][Ee][Rr][\s]+)?/.exec(raw)?.[0] ?? '';
  const rest = raw.slice(lead.length);
  const trail = /[\s"'`]*$/.exec(rest)?.[0] ?? '';
  const body = rest.slice(0, rest.length - trail.length);

  const kinds = ['text-cherry', 'text-chalk', SIGNATURE_COLOURS[signatureTone]];
  const nodes: React.ReactNode[] = [];

  if (lead) nodes.push(<span key="lead" className="text-faint">{lead}</span>);

  body.split('.').forEach((part, index) => {
    if (index > 0) {
      nodes.push(
        <span key={`dot-${index}`} className="text-faint">
          .
        </span>,
      );
    }
    nodes.push(
      <span key={index} className={kinds[index] ?? 'text-faint'}>
        {part}
      </span>,
    );
  });

  if (trail) nodes.push(<span key="trail" className="text-faint">{trail}</span>);
  // A trailing newline is swallowed by `pre`, which would scroll the mirror one
  // line short of the textarea while the caret sits on that empty last line.
  nodes.push(<span key="tail">{'\n'}</span>);
  return nodes;
}

function SegmentLegend({
  token,
  strings,
  lang,
  signatureTone,
}: {
  token: DecodedToken | null;
  strings: JwtStrings;
  lang: string;
  signatureTone: 'cold' | 'sound' | 'fault';
}) {
  if (!token) return null;

  const segments: { label: string; length: number; className: string }[] = [
    { label: strings.segHeader, length: token.parts.header.length, className: 'bg-cherry' },
    { label: strings.segPayload, length: token.parts.payload.length, className: 'bg-chalk' },
    {
      label: strings.segSignature,
      length: token.parts.signature.length,
      className: SIGNATURE_MARKS[signatureTone],
    },
  ];

  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {segments.map((segment) => (
        <span key={segment.label} className="inline-flex items-center gap-1.5">
          <span className={`size-1.5 shrink-0 ${segment.className}`} />
          {segment.label}
          <span className="ud-force text-xs text-faint">
            {plural(lang, strings.segChars, segment.length)}
          </span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------- claims --- */

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000_000],
  ['month', 2_592_000_000],
  ['day', 86_400_000],
  ['hour', 3_600_000],
  ['minute', 60_000],
  ['second', 1_000],
];

/** "in 6 years" / "2 months ago", in the page's language, via `Intl`. */
function relativeTime(delta: number, lang: string): string {
  try {
    const formatter = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    for (const [unit, size] of RELATIVE_UNITS) {
      if (Math.abs(delta) >= size) return formatter.format(Math.round(delta / size), unit);
    }
    return formatter.format(0, 'second');
  } catch {
    return '';
  }
}

function absoluteTime(ms: number, lang: string): string {
  try {
    return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(ms);
  } catch {
    return new Date(ms).toISOString();
  }
}

function ClaimsBody({
  claims,
  now,
  lang,
  strings,
}: {
  claims: Record<string, unknown> | null;
  now: number;
  lang: string;
  strings: JwtStrings;
}) {
  const { registered, custom } = splitClaims(claims);

  if (!claims) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <span className="mx-auto grid size-11 place-items-center border border-scribe bg-anvil-lit text-faint">
            <Icon name="key" size={20} />
          </span>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-temper">
            {strings.noClaims}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <ClaimGroup heading={strings.registeredHeading} empty={strings.noRegisteredClaims}>
        {registered.map(([name, value]) => (
          <ClaimRow
            key={name}
            name={name}
            label={strings.claimNames[name as keyof typeof strings.claimNames] ?? name}
            hint={strings.claimHints[name as keyof typeof strings.claimHints]}
            value={value}
            now={now}
            lang={lang}
          />
        ))}
      </ClaimGroup>

      <ClaimGroup heading={strings.customHeading} empty={strings.noCustomClaims}>
        {custom.map(([name, value]) => (
          <ClaimRow key={name} name={name} value={value} now={now} lang={lang} />
        ))}
      </ClaimGroup>
    </div>
  );
}

function ClaimGroup({
  heading,
  empty,
  children,
}: {
  heading: string;
  empty: string;
  children: React.ReactNode[];
}) {
  return (
    <section>
      <h3 className="ud-legend sticky top-0 z-10 border-b border-scribe bg-bench px-4 py-2 text-faint">
        {heading}
      </h3>
      {children.length > 0 ? (
        <dl>{children}</dl>
      ) : (
        <p className="px-4 py-3 text-xs leading-relaxed text-faint">{empty}</p>
      )}
    </section>
  );
}

const TIME_TONES: Record<string, string> = {
  expired: 'text-fault',
  'not-yet-valid': 'text-warn',
  expires: 'text-sound',
  active: 'text-sound',
  issued: 'text-temper',
};

function ClaimRow({
  name,
  label,
  hint,
  value,
  now,
  lang,
}: {
  name: string;
  label?: string;
  hint?: string;
  value: unknown;
  now: number;
  lang: string;
}) {
  const reading: TimeReading | null =
    isTimeClaim(name) && now > 0 ? readTimeClaim(name, value, now) : null;

  return (
    <div className="grid grid-cols-[minmax(7rem,auto)_minmax(0,1fr)] gap-x-4 border-b border-scribe px-4 py-2.5">
      <dt className="min-w-0">
        <span className="ud-force text-xs break-all text-key">{name}</span>
        {label && <span className="ud-legend mt-0.5 block text-faint">{label}</span>}
      </dt>
      <dd className="min-w-0">
        {reading ? (
          <>
            <span className="ud-force text-xs text-chalk">{absoluteTime(reading.ms, lang)}</span>
            <span className={`ud-legend mt-0.5 block ${TIME_TONES[reading.state] ?? 'text-temper'}`}>
              {relativeTime(reading.delta, lang)}
            </span>
          </>
        ) : (
          <span className="ud-force text-xs break-all text-chalk">{formatClaimValue(value)}</span>
        )}
        {hint && !reading && <span className="ud-legend mt-0.5 block text-faint">{hint}</span>}
        {hint && reading && <span className="sr-only">{hint}</span>}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------ decoded panels --- */

function SegmentPanel({
  title,
  label,
  segment,
  strings,
  common,
  footer,
}: {
  title: string;
  label: string;
  segment: DecodedToken['header'] | null;
  strings: JwtStrings;
  common: IslandStrings['common'];
  footer?: React.ReactNode;
}) {
  const text = segment?.text ?? '';

  return (
    <Panel
      title={title}
      className="min-h-[180px]"
      actions={
        <CopyButton
          text={text}
          disabled={!text}
          label={common.copy}
          copiedLabel={common.copied}
          title={common.copyTitle}
        />
      }
      footer={footer}
    >
      {segment?.fault ? (
        <div className="h-full overflow-auto p-4">
          <div className="flex items-start gap-3 border border-warn/40 bg-warn/8 p-3">
            <Icon name="x" size={16} className="mt-0.5 shrink-0 text-warn" />
            <p className="text-sm leading-relaxed text-chalk">{strings.faults[segment.fault]}</p>
          </div>
          {segment.text && (
            <pre className="mt-3 font-mono text-xs break-all whitespace-pre-wrap text-temper">
              {segment.text}
            </pre>
          )}
        </div>
      ) : (
        <JsonEditor label={label} value={text} readOnly wrap />
      )}
    </Panel>
  );
}

/* ----------------------------------------------------------- signature --- */

function SignaturePanel({
  token,
  checking,
  onCheckingChange,
  keyText,
  onKeyChange,
  secretIsBase64,
  onSecretIsBase64Change,
  usingSample,
  verdict,
  strings,
}: {
  token: DecodedToken | null;
  checking: boolean;
  onCheckingChange: (value: boolean) => void;
  keyText: string;
  onKeyChange: (value: string) => void;
  secretIsBase64: boolean;
  onSecretIsBase64Change: (value: boolean) => void;
  usingSample: boolean;
  verdict: VerifyResult | null;
  strings: JwtStrings;
}) {
  const symmetric = isSymmetric(token?.algorithm ?? null);

  return (
    <div className="h-full overflow-auto p-4">
      {/* The misconception this tool exists to correct, stated before the
          controls rather than after them. */}
      <p className="text-xs leading-relaxed text-temper">
        <Rich text={strings.decodeNotVerify} />
      </p>

      {!checking ? (
        <div className="mt-4">
          <Button icon="check-shield" variant="primary" onClick={() => onCheckingChange(true)}>
            {strings.verify}
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <label className="ud-legend block text-faint" htmlFor="jwt-key">
            {symmetric ? strings.secretLabel : strings.keyLabel}
          </label>
          <textarea
            id="jwt-key"
            value={keyText}
            onChange={(event) => onKeyChange(event.target.value)}
            aria-label={strings.keyAria}
            placeholder={symmetric ? strings.secretPlaceholder : strings.keyPlaceholder}
            spellCheck={false}
            autoComplete="off"
            className="mt-1.5 h-24 w-full resize-none border border-scribe-strong bg-ground p-2.5 font-mono text-[0.8125rem] leading-[1.6] break-all text-chalk placeholder:text-cold focus:border-cherry focus:outline-none"
          />

          {symmetric && (
            <div className="mt-2">
              <Toggle
                checked={secretIsBase64}
                onChange={onSecretIsBase64Change}
                title={strings.base64SecretTitle}
              >
                {strings.base64Secret}
              </Toggle>
            </div>
          )}

          {usingSample && symmetric && (
            <p className="mt-3 text-xs leading-relaxed text-faint">
              <Rich text={fill(strings.sampleSecretHint, { secret: SAMPLE_SECRET })} />
            </p>
          )}

          <p className="ud-legend mt-3 flex items-start gap-2 text-faint">
            <Icon name="lock" size={12} className="mt-0.5 shrink-0 text-sound" />
            {strings.keyNeverStored}
          </p>

          {verdict && verdict.status !== 'valid' && verdict.status !== 'no-key' && (
            <p className="mt-3 border-l-2 border-warn pl-3 text-xs leading-relaxed text-temper">
              <Rich
                text={fill(strings.verdicts[verdict.status], {
                  algorithm: verdict.algorithm ?? '',
                })}
              />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
