/**
 * JWT signing, done in the visitor's own tab with WebCrypto.
 *
 * The key typed here is a private key or shared secret — anyone holding it can
 * mint tokens your systems accept. It is held in a React state variable, handed
 * to `crypto.subtle.importKey`, and dropped: never written to `localStorage`,
 * never in an analytics event, and there is no backend to receive it.
 *
 * Returns fault *codes*, never sentences: anything a visitor reads has to exist
 * in eight languages.
 *
 * `alg` in the header is always overwritten from the algorithm actually used to
 * sign. A header claiming `HS256` over an RS256 signature is the setup for the
 * best-known JWT vulnerability.
 */

import {
  base64UrlToBytes,
  bytesToBase64Url,
  importParams,
  operationParams,
  pemToBytes,
  specFor,
  textToBase64Url,
  type AlgorithmSpec,
  type SecretEncoding,
} from './algorithms';

export type EncodeFault =
  | 'bad-header-json'
  | 'bad-payload-json'
  | 'header-not-object'
  | 'payload-not-object'
  | 'unsupported'
  | 'no-key'
  | 'bad-key'
  | 'weak-secret'
  | 'error';

export type EncodeResult =
  | { ok: true; token: string; signingInput: string; unsecured: boolean }
  | { ok: false; fault: EncodeFault };

/**
 * The `alg: none` unsecured JWT of RFC 7519 §6. Offered because people need to
 * reproduce one, usually to check their own verifier rejects it. The UI says
 * loudly what it is.
 */
export const UNSECURED = 'none';

/**
 * WebCrypto permits HMAC keys shorter than the hash output; RFC 7518 §3.2 does
 * not. A four-character secret signs fine and is trivially brute-forced offline.
 */
const MINIMUM_SECRET_BYTES: Record<string, number> = { 'SHA-256': 32, 'SHA-384': 48, 'SHA-512': 64 };

export function minimumSecretBytes(algorithm: string): number | null {
  const spec = specFor(algorithm);
  if (!spec || spec.family !== 'HMAC') return null;
  return MINIMUM_SECRET_BYTES[spec.hash] ?? null;
}

/** How many bytes of key material a typed secret actually amounts to. */
export function secretByteLength(secret: string, encoding: SecretEncoding): number {
  if (secret === '') return 0;
  if (encoding === 'base64url') {
    try {
      return base64UrlToBytes(secret).length;
    } catch {
      return 0;
    }
  }
  return new TextEncoder().encode(secret).length;
}

/* --------------------------------------------------------------- header --- */

/**
 * The header this token will carry. Whatever the visitor typed is kept — `kid`,
 * `cty`, anything custom — but `alg` is overwritten from the chosen algorithm
 * and `typ` defaults to `JWT`.
 */
export function buildHeader(
  typed: Record<string, unknown>,
  algorithm: string,
): Record<string, unknown> {
  return { ...typed, alg: algorithm, typ: typeof typed.typ === 'string' ? typed.typ : 'JWT' };
}

function parseObject(
  text: string,
  badJson: EncodeFault,
  notObject: EncodeFault,
): { ok: true; value: Record<string, unknown> } | { ok: false; fault: EncodeFault } {
  const trimmed = text.trim();
  if (trimmed === '') return { ok: true, value: {} };

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { ok: false, fault: badJson };
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, fault: notObject };
  }
  return { ok: true, value: parsed as Record<string, unknown> };
}

/* ------------------------------------------------------------------ key --- */

interface Jwk {
  kty?: string;
  d?: string;
  [key: string]: unknown;
}

async function importSigningKey(
  keyText: string,
  spec: AlgorithmSpec,
  secretEncoding: SecretEncoding,
): Promise<{ key: CryptoKey } | { failure: EncodeFault }> {
  const trimmed = keyText.trim();
  if (trimmed === '') return { failure: 'no-key' };

  const usage: KeyUsage[] = ['sign'];

  try {
    if (spec.family === 'HMAC') {
      const raw =
        secretEncoding === 'base64url'
          ? base64UrlToBytes(trimmed)
          : new TextEncoder().encode(trimmed);
      const key = await crypto.subtle.importKey(
        'raw',
        raw as BufferSource,
        { name: 'HMAC', hash: spec.hash },
        false,
        usage,
      );
      return { key };
    }

    // A private JWK. Unlike verification there is no JWKS case: a key set is a
    // published list of *public* keys, so being handed one here means the
    // visitor pasted the wrong half of the pair.
    if (trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed) as Jwk | { keys?: Jwk[] };
      if (Array.isArray((parsed as { keys?: Jwk[] }).keys)) return { failure: 'bad-key' };

      const jwk = parsed as Jwk;
      // `d` is the private exponent for RSA and the private scalar for EC.
      // Without it this is a public key and cannot sign anything.
      if (typeof jwk.d !== 'string') return { failure: 'bad-key' };

      const { alg: _alg, use: _use, key_ops: _ops, ext: _ext, ...material } = jwk;
      const key = await crypto.subtle.importKey(
        'jwk',
        material as JsonWebKey,
        importParams(spec),
        false,
        usage,
      );
      return { key };
    }

    if (trimmed.includes('-----BEGIN')) {
      // WebCrypto imports PKCS#8 ("BEGIN PRIVATE KEY") and nothing else. PKCS#1
      // or a traditional EC key would need DER surgery, and guessing wrong
      // yields a key that imports and then signs garbage.
      if (!/-----BEGIN PRIVATE KEY-----/.test(trimmed)) return { failure: 'bad-key' };

      const key = await crypto.subtle.importKey(
        'pkcs8',
        pemToBytes(trimmed) as BufferSource,
        importParams(spec),
        false,
        usage,
      );
      return { key };
    }

    return { failure: 'bad-key' };
  } catch {
    // Malformed base64, a key that does not match the algorithm's curve or
    // modulus, corrupt JSON — all of it means the same thing to the visitor.
    return { failure: 'bad-key' };
  }
}

/* ----------------------------------------------------------------- sign --- */

export interface EncodeRequest {
  /** The header as typed. `alg` is overwritten; everything else is kept. */
  header: string;
  payload: string;
  algorithm: string;
  key: string;
  secretEncoding?: SecretEncoding;
  /**
   * Refuse to sign an HS token with a secret shorter than RFC 7518 requires.
   * On by default; the UI lets it be turned off, because reproducing a weak
   * token is sometimes exactly the task.
   */
  enforceSecretLength?: boolean;
}

export async function signToken({
  header,
  payload,
  algorithm,
  key,
  secretEncoding = 'utf-8',
  enforceSecretLength = true,
}: EncodeRequest): Promise<EncodeResult> {
  const parsedHeader = parseObject(header, 'bad-header-json', 'header-not-object');
  if (!parsedHeader.ok) return { ok: false, fault: parsedHeader.fault };

  const parsedPayload = parseObject(payload, 'bad-payload-json', 'payload-not-object');
  if (!parsedPayload.ok) return { ok: false, fault: parsedPayload.fault };

  const headerObject = buildHeader(parsedHeader.value, algorithm);
  const signingInput = `${textToBase64Url(JSON.stringify(headerObject))}.${textToBase64Url(
    JSON.stringify(parsedPayload.value),
  )}`;

  // The unsecured JWT: three parts, the third empty. A specified token type
  // that proves nothing, not a shortcut around a missing key.
  if (algorithm.toLowerCase() === UNSECURED) {
    return { ok: true, token: `${signingInput}.`, signingInput, unsecured: true };
  }

  const spec = specFor(algorithm);
  if (!spec) return { ok: false, fault: 'unsupported' };

  if (spec.family === 'HMAC' && enforceSecretLength && key.trim() !== '') {
    const required = MINIMUM_SECRET_BYTES[spec.hash];
    if (secretByteLength(key.trim(), secretEncoding) < required) {
      return { ok: false, fault: 'weak-secret' };
    }
  }

  const imported = await importSigningKey(key, spec, secretEncoding);
  if ('failure' in imported) return { ok: false, fault: imported.failure };

  try {
    const signature = await crypto.subtle.sign(
      operationParams(spec),
      imported.key,
      new TextEncoder().encode(signingInput) as BufferSource,
    );
    return {
      ok: true,
      token: `${signingInput}.${bytesToBase64Url(signature)}`,
      signingInput,
      unsecured: false,
    };
  } catch {
    return { ok: false, fault: 'error' };
  }
}

/* ---------------------------------------------------------- claim helpers --- */

/** Seconds since the epoch — the NumericDate of RFC 7519 §2. */
export function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export const EXPIRY_PRESETS = [
  { id: '15m', seconds: 900 },
  { id: '1h', seconds: 3600 },
  { id: '24h', seconds: 86_400 },
  { id: '7d', seconds: 604_800 },
  { id: '30d', seconds: 2_592_000 },
] as const;

export type ExpiryPresetId = (typeof EXPIRY_PRESETS)[number]['id'];

/**
 * Re-stamp the time claims: `iat` and `nbf` to now, `exp` to now plus the span.
 * A whole-object rewrite rather than three edits, so the claims cannot disagree
 * about what "now" was and strand an `nbf` a second after its `iat`.
 */
export function stampTimeClaims(
  payload: Record<string, unknown>,
  options: { expiresIn?: number; includeNotBefore?: boolean },
): Record<string, unknown> {
  const issued = nowInSeconds();
  const next: Record<string, unknown> = { ...payload, iat: issued };
  if (options.expiresIn !== undefined) next.exp = issued + options.expiresIn;
  if (options.includeNotBefore) next.nbf = issued;
  return next;
}

/** Pretty-print a claims object for the editor, stable and two-space indented. */
export function formatClaims(claims: Record<string, unknown>): string {
  return JSON.stringify(claims, null, 2);
}
