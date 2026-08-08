import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '../Icon';
import { JsonEditor } from '../JsonEditor';
import { Button, CopyButton, Panel, Select, Status, Toggle } from '../ui';
import { useDebounced, usePersistentState, downloadText } from '../../lib/hooks';
import { trackEvent } from '../../lib/analytics';
import {
  EXPIRY_PRESETS,
  formatClaims,
  minimumSecretBytes,
  secretByteLength,
  signToken,
  stampTimeClaims,
  UNSECURED,
  type EncodeFault,
  type ExpiryPresetId,
} from '../../lib/jwt/encode';
import { isSymmetric, SUPPORTED_ALGORITHMS, type SecretEncoding } from '../../lib/jwt/algorithms';
import {
  SAMPLE_ENCODER_HEADER,
  SAMPLE_ENCODER_PAYLOAD,
  SAMPLE_SIGNING_SECRET,
} from '../../lib/jwt/samples';
import { fill, parseRich, plainText, plural } from '../../lib/i18n/format';
import type { IslandStrings } from '../../lib/i18n/ui/en';

type EncoderStrings = IslandStrings['jwtEncoder'];

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

export default function JwtEncoder({ lang, strings }: { lang: string; strings: IslandStrings }) {
  const s = strings.jwtEncoder;
  const c = strings.common;

  const [header, setHeader] = usePersistentState('utildock:jwt-encoder:header', '');
  const [payload, setPayload] = usePersistentState('utildock:jwt-encoder:payload', '');
  const [algorithm, setAlgorithm] = usePersistentState('utildock:jwt-encoder:alg', 'HS256');
  const [secretIsBase64, setSecretIsBase64] = usePersistentState(
    'utildock:jwt-encoder:secret-b64',
    false,
  );
  const [allowWeak, setAllowWeak] = usePersistentState('utildock:jwt-encoder:allow-weak', false);
  const [expiresIn, setExpiresIn] = usePersistentState<ExpiryPresetId>(
    'utildock:jwt-encoder:expires',
    '1h',
  );
  const [includeNotBefore, setIncludeNotBefore] = usePersistentState(
    'utildock:jwt-encoder:nbf',
    false,
  );

  /**
   * The signing key, held in memory only.
   *
   * The decoder makes this exception for a *verification* key. Here the same
   * line protects a private key or a shared secret — material that mints
   * tokens rather than merely checking them — so `usePersistentState` would be
   * a considerably worse idea than it already was there.
   */
  const [key, setKey] = useState('');

  const [token, setToken] = useState('');
  const [fault, setFault] = useState<EncodeFault | null>(null);
  const [signing, setSigning] = useState(false);
  const [unsecured, setUnsecured] = useState(false);
  const [stamped, setStamped] = useState(false);

  const debouncedHeader = useDebounced(header, 200);
  const debouncedPayload = useDebounced(payload, 200);
  const debouncedKey = useDebounced(key, 300);

  const symmetric = isSymmetric(algorithm);
  const isUnsecured = algorithm === UNSECURED;

  /* One event carrying the tool id and nothing else — never the claims, and
     certainly never the key. The same contract `useJsonWorker` applies. */
  const reported = useRef(false);
  useEffect(() => {
    if (token === '' || reported.current) return;
    reported.current = true;
    trackEvent('tool_used', { tool_id: 'jwt-encoder' });
  }, [token]);

  useEffect(() => {
    // Nothing to sign until there is a payload. An empty header is fine — the
    // encoder writes `alg` and `typ` itself.
    if (!debouncedPayload.trim() && !debouncedHeader.trim()) {
      setToken('');
      setFault(null);
      setUnsecured(false);
      return;
    }

    let cancelled = false;
    setSigning(true);

    void signToken({
      header: debouncedHeader,
      payload: debouncedPayload,
      algorithm,
      key: debouncedKey,
      secretEncoding: (secretIsBase64 ? 'base64url' : 'utf-8') satisfies SecretEncoding,
      enforceSecretLength: !allowWeak,
    }).then((result) => {
      if (cancelled) return;
      setSigning(false);
      if (result.ok) {
        setToken(result.token);
        setFault(null);
        setUnsecured(result.unsecured);
      } else {
        setToken('');
        setFault(result.fault);
        setUnsecured(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedHeader, debouncedPayload, algorithm, debouncedKey, secretIsBase64, allowWeak]);

  /** Write iat / exp / nbf into the payload from a single instant. */
  const stampClaims = useCallback(() => {
    const preset = EXPIRY_PRESETS.find((option) => option.id === expiresIn);
    let claims: Record<string, unknown> = {};
    try {
      const parsed = JSON.parse(payload.trim() || '{}');
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        claims = parsed as Record<string, unknown>;
      }
    } catch {
      // A payload that is not JSON yet cannot be stamped into; the fault is
      // already on screen, and silently discarding what was typed would be
      // worse than doing nothing.
      return;
    }
    setPayload(
      formatClaims(
        stampTimeClaims(claims, {
          expiresIn: preset?.seconds,
          includeNotBefore,
        }),
      ),
    );
    setStamped(true);
    setTimeout(() => setStamped(false), 1800);
  }, [payload, expiresIn, includeNotBefore, setPayload]);

  const loadSample = useCallback(() => {
    setHeader(SAMPLE_ENCODER_HEADER);
    setPayload(SAMPLE_ENCODER_PAYLOAD);
    setAlgorithm('HS256');
    setKey(SAMPLE_SIGNING_SECRET);
    setSecretIsBase64(false);
  }, [setHeader, setPayload, setAlgorithm, setSecretIsBase64]);

  const clearAll = useCallback(() => {
    setHeader('');
    setPayload('');
    setToken('');
    setFault(null);
  }, [setHeader, setPayload]);

  const isEmpty = !header.trim() && !payload.trim();
  const usingSample = key === SAMPLE_SIGNING_SECRET;

  /* The weak-secret message names the actual shortfall rather than the rule in
     the abstract — "32 bytes required, this one is 12" is actionable where
     "secret too short" sends people to the RFC. */
  const faultText = useMemo(() => {
    if (!fault) return '';
    if (fault === 'weak-secret') {
      return fill(s.faults['weak-secret'], {
        algorithm,
        required: minimumSecretBytes(algorithm) ?? 0,
        actual: secretByteLength(key.trim(), secretIsBase64 ? 'base64url' : 'utf-8'),
      });
    }
    return s.faults[fault];
  }, [fault, s.faults, algorithm, key, secretIsBase64]);

  const status = (() => {
    if (isEmpty) return { tone: 'idle' as const, text: s.idle };
    if (fault) {
      // A missing key is the ordinary state of a half-filled form, not an error.
      // `plainText` because the status line is a plain string: several of these
      // messages carry `**bold**` and `` `code` `` for the panel that also
      // shows them, and here the marks would print literally.
      return {
        tone: fault === 'no-key' ? ('idle' as const) : ('error' as const),
        text: plainText(faultText),
      };
    }
    if (signing) return { tone: 'idle' as const, text: s.signing };
    if (unsecured) return { tone: 'warn' as const, text: s.signedUnsecured };
    if (token) return { tone: 'ok' as const, text: s.signed };
    return { tone: 'idle' as const, text: s.idle };
  })();

  return (
    <div className="grid gap-4 lg:h-[calc(100vh-19rem)] lg:min-h-[560px] lg:grid-cols-2">
      {/* Left: what goes into the token. */}
      <div className="grid min-h-0 gap-4 lg:grid-rows-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Panel
          title={s.headerTitle}
          className="min-h-[180px]"
          actions={
            <>
              <Select
                label={s.algorithm}
                value={algorithm}
                title={s.algorithmTitle}
                onChange={(event) => setAlgorithm(event.target.value)}
              >
                {SUPPORTED_ALGORITHMS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value={UNSECURED}>{s.unsecured}</option>
              </Select>
              <Button icon="sparkle" onClick={loadSample} title={c.sampleTitle}>
                {c.sample}
              </Button>
              <Button
                icon="trash"
                variant="danger"
                onClick={clearAll}
                disabled={isEmpty}
                aria-label={c.clear}
                title={c.clear}
              />
            </>
          }
        >
          <JsonEditor
            label={s.headerLabel}
            value={header}
            onChange={setHeader}
            placeholder={s.headerPlaceholder}
          />
        </Panel>

        <Panel
          title={s.payloadTitle}
          className="min-h-[260px]"
          actions={
            <>
              <Select
                label={s.expiresIn}
                value={expiresIn}
                onChange={(event) => setExpiresIn(event.target.value as ExpiryPresetId)}
              >
                {EXPIRY_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {s.expiryPresets[preset.id]}
                  </option>
                ))}
              </Select>
              <Toggle
                checked={includeNotBefore}
                onChange={setIncludeNotBefore}
                title={s.includeNotBeforeTitle}
              >
                {s.includeNotBefore}
              </Toggle>
              <Button icon="check" onClick={stampClaims} title={s.stampTitle}>
                {s.stamp}
              </Button>
            </>
          }
          footer={stamped ? <Status tone="ok">{s.stamped}</Status> : undefined}
        >
          <JsonEditor
            label={s.payloadLabel}
            value={payload}
            onChange={setPayload}
            placeholder={s.payloadPlaceholder}
          />
        </Panel>
      </div>

      {/* Right: the key, and what comes out. */}
      <div className="grid min-h-0 gap-4 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title={s.signingTitle} className="min-h-[260px]">
          <SigningPanel
            algorithm={algorithm}
            symmetric={symmetric}
            isUnsecured={isUnsecured}
            keyText={key}
            onKeyChange={setKey}
            secretIsBase64={secretIsBase64}
            onSecretIsBase64Change={setSecretIsBase64}
            allowWeak={allowWeak}
            onAllowWeakChange={setAllowWeak}
            usingSample={usingSample}
            strings={s}
          />
        </Panel>

        <Panel
          title={s.tokenTitle}
          className="min-h-[240px]"
          strikeKey={token}
          actions={
            <>
              <CopyButton
                text={token}
                label={c.copy}
                copiedLabel={c.copied}
                title={c.copyTitle}
              />
              <Button
                icon="download"
                onClick={() => downloadText(token, s.tokenFile)}
                disabled={!token}
                title={c.download}
              />
            </>
          }
          footer={
            <>
              {token && <SegmentLegend token={token} strings={s} lang={lang} />}
              <Status tone={status.tone}>{status.text}</Status>
            </>
          }
        >
          <TokenOutput token={token} strings={s} unsecured={unsecured} />
        </Panel>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- token output --- */

function TokenOutput({
  token,
  strings,
  unsecured,
}: {
  token: string;
  strings: EncoderStrings;
  unsecured: boolean;
}) {
  if (!token) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <span className="mx-auto grid size-11 place-items-center border border-scribe bg-anvil-lit text-faint">
            <Icon name="key-stamp" size={20} />
          </span>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-temper">
            {strings.emptyToken}
          </p>
        </div>
      </div>
    );
  }

  const [header, payload, signature = ''] = token.split('.');

  return (
    <div className="h-full overflow-auto p-3">
      {unsecured && (
        <p className="mb-3 border-l-2 border-warn pl-3 text-xs leading-relaxed text-temper">
          <Rich text={strings.unsecuredWarning} />
        </p>
      )}
      {/* The same three colours the decoder uses, so a token carries its
          anatomy across both tools rather than being re-learned on each. */}
      <p className="font-mono text-[0.8125rem] leading-[1.65] break-all">
        <span className="text-cherry">{header}</span>
        <span className="text-faint">.</span>
        <span className="text-chalk">{payload}</span>
        <span className="text-faint">.</span>
        <span className={unsecured ? 'text-faint' : 'text-sound'}>{signature}</span>
      </p>
    </div>
  );
}

function SegmentLegend({
  token,
  strings,
  lang,
}: {
  token: string;
  strings: EncoderStrings;
  lang: string;
}) {
  const [header = '', payload = '', signature = ''] = token.split('.');
  const segments = [
    { label: strings.segHeader, length: header.length, className: 'bg-cherry' },
    { label: strings.segPayload, length: payload.length, className: 'bg-chalk' },
    { label: strings.segSignature, length: signature.length, className: 'bg-sound' },
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

/* ------------------------------------------------------------- the key --- */

function SigningPanel({
  algorithm,
  symmetric,
  isUnsecured,
  keyText,
  onKeyChange,
  secretIsBase64,
  onSecretIsBase64Change,
  allowWeak,
  onAllowWeakChange,
  usingSample,
  strings,
}: {
  algorithm: string;
  symmetric: boolean;
  isUnsecured: boolean;
  keyText: string;
  onKeyChange: (value: string) => void;
  secretIsBase64: boolean;
  onSecretIsBase64Change: (value: boolean) => void;
  allowWeak: boolean;
  onAllowWeakChange: (value: boolean) => void;
  usingSample: boolean;
  strings: EncoderStrings;
}) {
  if (isUnsecured) {
    return (
      <div className="h-full overflow-auto p-4">
        <p className="border-l-2 border-warn pl-3 text-xs leading-relaxed text-temper">
          <Rich text={strings.unsecuredWarning} />
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4">
      <label className="ud-legend block text-faint" htmlFor="jwt-signing-key">
        {symmetric ? strings.secretLabel : strings.keyLabel}
      </label>
      <textarea
        id="jwt-signing-key"
        value={keyText}
        onChange={(event) => onKeyChange(event.target.value)}
        aria-label={strings.keyAria}
        placeholder={symmetric ? strings.secretPlaceholder : strings.keyPlaceholder}
        spellCheck={false}
        autoComplete="off"
        /* h-20 rather than h-28: the two assurances below — that the key is
           never stored, and that a signing key mints tokens — are the most
           important lines on this page, and at h-28 they fell below the
           panel's scroll fold on a 1280-wide window. */
        className="mt-1.5 h-20 w-full resize-none border border-scribe-strong bg-ground p-2.5 font-mono text-[0.8125rem] leading-[1.6] break-all text-chalk placeholder:text-cold focus:border-cherry focus:outline-none"
      />

      {symmetric && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Toggle
            checked={secretIsBase64}
            onChange={onSecretIsBase64Change}
            title={strings.base64SecretTitle}
          >
            {strings.base64Secret}
          </Toggle>
          <Toggle checked={allowWeak} onChange={onAllowWeakChange} title={strings.allowWeakTitle}>
            {strings.allowWeak}
          </Toggle>
        </div>
      )}

      {usingSample && symmetric && (
        <p className="mt-3 text-xs leading-relaxed text-faint">
          <Rich text={fill(strings.sampleSecretHint, { secret: SAMPLE_SIGNING_SECRET })} />
        </p>
      )}

      <p className="ud-legend mt-3 flex items-start gap-2 text-faint">
        <Icon name="lock" size={12} className="mt-0.5 shrink-0 text-sound" />
        {strings.keyNeverStored}
      </p>
      <p className="ud-legend mt-2 flex items-start gap-2 text-faint">
        <Icon name="check-shield" size={12} className="mt-0.5 shrink-0 text-warn" />
        {strings.keyIsDangerous}
      </p>

      <p className="sr-only">{algorithm}</p>
    </div>
  );
}
