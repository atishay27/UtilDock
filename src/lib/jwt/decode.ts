/**
 * JWT decoding — dependency-free, and small enough to run on the main thread.
 *
 * The JSON tools push their work to `json/worker.ts` because a document can be
 * megabytes. A token cannot: a JWT that exceeds a few kilobytes has already
 * broken every header limit that would carry it, so the worker's cost buys
 * nothing here and the island imports this module directly.
 *
 * **This module returns fault *codes*, never sentences.** Anything a visitor
 * reads has to exist in eight languages, and a string baked in here could not.
 * The island maps each code onto its dictionary entry — which is also why the
 * codes are a closed union rather than free text.
 *
 * Decoding a JWT is not verifying one. This file does no cryptography at all;
 * it reads what the token says about itself. `verify.ts` is where a claim of
 * authenticity is actually tested, and the UI must never let the two blur.
 */

/** Why a token, or one segment of it, could not be read. */
export type JwtFault =
  | 'not-a-token'
  | 'encrypted'
  | 'too-few-parts'
  | 'too-many-parts'
  | 'bad-base64'
  | 'bad-json'
  | 'not-an-object';

/** The three wire segments, kept verbatim so the UI can colour the raw token. */
export interface TokenParts {
  header: string;
  payload: string;
  signature: string;
}

export interface Segment {
  /** Parsed claims, or null when this segment failed to decode. */
  claims: Record<string, unknown> | null;
  /** Pretty-printed JSON, ready for an editor. Empty when it failed. */
  text: string;
  fault: JwtFault | null;
}

export interface DecodedToken {
  parts: TokenParts;
  header: Segment;
  payload: Segment;
  /** Whatever the `alg` header says. Claimed, not proven — see `verify.ts`. */
  algorithm: string | null;
  /** `kid`, when present: which key the issuer says signed this. */
  keyId: string | null;
  /** `typ`, when present. */
  type: string | null;
  /** False for the `alg: none` unsecured JWT, which carries no signature. */
  signed: boolean;
}

export type DecodeResult =
  | { ok: true; token: DecodedToken }
  | { ok: false; fault: JwtFault; parts?: TokenParts };

/**
 * Strip the noise a token picks up in transit.
 *
 * Tokens are copied out of `Authorization` headers, curl commands, JSON bodies
 * and log lines, so they arrive wearing a `Bearer` prefix, wrapping quotes, or
 * the line breaks a terminal added. Every one of those is unambiguously not
 * part of a JWT — the alphabet is base64url and dots — so removing them is
 * safe, and it spares the visitor an error whose only fix is manual tidying.
 */
export function normalizeToken(input: string): string {
  return input
    .trim()
    .replace(/^["'`]|["'`]$/g, '')
    .replace(/^bearer\s+/i, '')
    .replace(/\s+/g, '')
    .trim();
}

/** base64url → bytes. Tolerates the padding a producer may have kept. */
function base64UrlToBytes(segment: string): Uint8Array {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** base64url → text. Throws on anything the alphabet does not allow. */
export function decodeSegmentText(segment: string): string {
  // `atob` is lenient about stray characters in ways that turn a typo into
  // mojibake rather than an error, so the alphabet is checked first.
  if (!/^[A-Za-z0-9_-]*={0,2}$/.test(segment)) throw new Error('bad-base64');
  return new TextDecoder('utf-8', { fatal: false }).decode(base64UrlToBytes(segment));
}

function decodeSegment(raw: string): Segment {
  if (raw === '') return { claims: null, text: '', fault: 'bad-base64' };

  let text: string;
  try {
    text = decodeSegmentText(raw);
  } catch {
    return { claims: null, text: '', fault: 'bad-base64' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // The bytes came back but they are not JSON. Showing them anyway is the
    // useful failure: it is usually the moment someone sees they pasted the
    // signature into the header slot, or that the token is not a JWT at all.
    return { claims: null, text, fault: 'bad-json' };
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { claims: null, text, fault: 'not-an-object' };
  }

  const claims = parsed as Record<string, unknown>;
  return { claims, text: JSON.stringify(claims, null, 2), fault: null };
}

function stringClaim(claims: Record<string, unknown> | null, name: string): string | null {
  const value = claims?.[name];
  return typeof value === 'string' && value !== '' ? value : null;
}

export function decodeToken(input: string): DecodeResult {
  const token = normalizeToken(input);
  if (token === '') return { ok: false, fault: 'not-a-token' };

  const segments = token.split('.');

  // A JWE has five segments and its payload is encrypted — there is nothing to
  // show and no amount of decoding will produce claims. Saying so is far more
  // use than reporting a base64 error on a segment that decoded fine.
  if (segments.length === 5) return { ok: false, fault: 'encrypted' };
  if (segments.length > 5) return { ok: false, fault: 'too-many-parts' };
  if (segments.length < 2) return { ok: false, fault: 'too-few-parts' };

  const [headerRaw, payloadRaw, signatureRaw = ''] = segments;
  const parts: TokenParts = {
    header: headerRaw,
    payload: payloadRaw,
    signature: signatureRaw,
  };

  const header = decodeSegment(headerRaw);
  const payload = decodeSegment(payloadRaw);

  // Neither half readable means this was never a token; one half readable is
  // worth showing, because that is how you find out which half is wrong.
  if (header.fault === 'bad-base64' && payload.fault === 'bad-base64') {
    return { ok: false, fault: 'not-a-token', parts };
  }

  const algorithm = stringClaim(header.claims, 'alg');

  return {
    ok: true,
    token: {
      parts,
      header,
      payload,
      algorithm,
      keyId: stringClaim(header.claims, 'kid'),
      type: stringClaim(header.claims, 'typ'),
      signed: algorithm !== null && algorithm.toLowerCase() !== 'none' && signatureRaw !== '',
    },
  };
}

/* ---------------------------------------------------------------- claims --- */

/** The registered claims of RFC 7519, in the order the spec introduces them. */
export const REGISTERED_CLAIMS = [
  'iss',
  'sub',
  'aud',
  'exp',
  'nbf',
  'iat',
  'jti',
] as const;

export type RegisteredClaim = (typeof REGISTERED_CLAIMS)[number];

/** Claims whose value is a NumericDate — seconds since the epoch, not millis. */
export const TIME_CLAIMS = ['exp', 'nbf', 'iat'] as const;

export type TimeClaim = (typeof TIME_CLAIMS)[number];

export function isTimeClaim(name: string): name is TimeClaim {
  return (TIME_CLAIMS as readonly string[]).includes(name);
}

/**
 * What a NumericDate claim means right now.
 *
 * `exp` and `nbf` are windows and can fail; `iat` is a statement of when the
 * token was minted and cannot. Keeping the distinction here stops the UI from
 * painting a perfectly ordinary `iat` as a problem.
 */
export type TimeState = 'expired' | 'expires' | 'not-yet-valid' | 'active' | 'issued' | 'invalid';

export interface TimeReading {
  claim: TimeClaim;
  /** Milliseconds, ready for `Date` and `Intl`. */
  ms: number;
  seconds: number;
  state: TimeState;
  /** Signed millisecond delta from now — negative is past. */
  delta: number;
}

/**
 * Read a NumericDate claim.
 *
 * Values are seconds by the spec, but tokens minted with `Date.now()` instead
 * of `Date.now() / 1000` are common enough that treating one as seconds would
 * date it to the year 56000. Anything that far out is read as milliseconds,
 * which is what its issuer meant, rather than reported as a bizarre date.
 */
export function readTimeClaim(
  claim: TimeClaim,
  value: unknown,
  now = Date.now(),
): TimeReading | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;

  const looksLikeMillis = Math.abs(value) > 1e11;
  const ms = looksLikeMillis ? value : value * 1000;
  const delta = ms - now;

  const state: TimeState =
    claim === 'iat'
      ? 'issued'
      : claim === 'exp'
        ? delta <= 0
          ? 'expired'
          : 'expires'
        : delta > 0
          ? 'not-yet-valid'
          : 'active';

  return { claim, ms, seconds: looksLikeMillis ? Math.floor(value / 1000) : value, state, delta };
}

/** Overall verdict on the token's validity window, independent of its signature. */
export type WindowState = 'expired' | 'not-yet-valid' | 'valid' | 'unbounded';

export function windowState(
  claims: Record<string, unknown> | null,
  now = Date.now(),
): WindowState {
  const exp = readTimeClaim('exp', claims?.exp, now);
  const nbf = readTimeClaim('nbf', claims?.nbf, now);

  if (exp?.state === 'expired') return 'expired';
  if (nbf?.state === 'not-yet-valid') return 'not-yet-valid';
  // A token with neither bound never stops being accepted, which is worth
  // saying out loud rather than reporting as simply "valid".
  if (!exp && !nbf) return 'unbounded';
  return 'valid';
}

/** Claims split into the registered ones and everything the issuer added. */
export function splitClaims(claims: Record<string, unknown> | null): {
  registered: [string, unknown][];
  custom: [string, unknown][];
} {
  if (!claims) return { registered: [], custom: [] };
  const entries = Object.entries(claims);
  const known = new Set<string>(REGISTERED_CLAIMS);
  return {
    registered: (REGISTERED_CLAIMS as readonly string[])
      .filter((name) => name in claims)
      .map((name) => [name, claims[name]] as [string, unknown]),
    custom: entries.filter(([name]) => !known.has(name)),
  };
}

/** A claim value rendered for a table cell — compact, never multi-line. */
export function formatClaimValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null) return 'null';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
