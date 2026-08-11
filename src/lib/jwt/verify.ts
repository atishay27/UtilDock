/**
 * JWT signature verification, done in the visitor's own tab with WebCrypto.
 *
 * The key is held in a React state variable, passed to
 * `crypto.subtle.importKey`, and dropped. Unlike every other input on this
 * site it is deliberately *not* persisted to `localStorage`, never sent
 * anywhere, and never in an analytics event.
 *
 * Returns codes rather than sentences; the island holds the eight translations.
 */

import { decodeSegmentText } from './decode';
import {
  base64UrlToBytes,
  importParams,
  isSupportedAlgorithm,
  operationParams,
  pemToBytes,
  specFor,
  type AlgorithmSpec,
  type SecretEncoding,
} from './algorithms';

/* The table itself lives in `algorithms.ts` so signing and verifying cannot
   drift apart. Re-exported for callers that reach for it through this module. */
export {
  isSupportedAlgorithm,
  isSymmetric,
  SUPPORTED_ALGORITHMS,
  type SecretEncoding,
} from './algorithms';

export type VerifyStatus =
  | 'valid'
  | 'invalid'
  | 'unsecured'
  | 'unsupported'
  | 'bad-key'
  | 'no-key'
  | 'no-signature'
  | 'kid-mismatch'
  | 'error';

export interface VerifyResult {
  status: VerifyStatus;
  /** The algorithm actually used, once resolved from the header. */
  algorithm?: string;
  /** For a JWKS, which key was selected. */
  keyId?: string;
}

/* ------------------------------------------------------------------ key --- */

interface Jwk {
  kty?: string;
  kid?: string;
  alg?: string;
  use?: string;
  [key: string]: unknown;
}

/**
 * Pick the key to check against out of whatever was pasted. A JWKS is accepted
 * whole, since that is the shape people have — a `/.well-known/jwks.json` body
 * copied entire. The token's `kid` chooses; a single-key set needs no `kid`.
 */
function selectJwk(set: Jwk[], kid: string | null): Jwk | null {
  if (set.length === 0) return null;
  if (kid) {
    const match = set.find((key) => key.kid === kid);
    if (match) return match;
    // A named key missing from the set is the answer, not a reason to fall
    // back: another key would give a confident "invalid" that means nothing.
    return null;
  }
  return set.length === 1 ? set[0] : null;
}

async function importVerificationKey(
  keyText: string,
  spec: AlgorithmSpec,
  algorithm: string,
  kid: string | null,
  secretEncoding: SecretEncoding,
): Promise<{ key: CryptoKey; keyId?: string } | { failure: VerifyStatus }> {
  const trimmed = keyText.trim();
  if (trimmed === '') return { failure: 'no-key' };

  const usage: KeyUsage[] = ['verify'];

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

    // A JWK, or a whole JWK Set.
    if (trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed) as Jwk | { keys?: Jwk[] };
      const set = Array.isArray((parsed as { keys?: Jwk[] }).keys)
        ? (parsed as { keys: Jwk[] }).keys
        : [parsed as Jwk];

      const chosen = selectJwk(set, kid);
      if (!chosen) return { failure: set.length > 1 ? 'kid-mismatch' : 'bad-key' };

      // `alg` and `key_ops` in the JWK can contradict what we are importing
      // for; strip them so the import is governed by the token's header, and
      // let a genuine mismatch surface as a failed verification.
      const { alg: _alg, use: _use, key_ops: _ops, ext: _ext, ...material } = chosen;

      const key = await crypto.subtle.importKey(
        'jwk',
        material as JsonWebKey,
        importParams(spec),
        false,
        usage,
      );
      return { key, keyId: chosen.kid };
    }

    if (trimmed.includes('-----BEGIN')) {
      // WebCrypto imports SPKI ("BEGIN PUBLIC KEY") and nothing else. A PKCS#1
      // key or an X.509 certificate would need DER surgery to get there, and
      // guessing wrong would produce a misleading verdict.
      if (!/-----BEGIN PUBLIC KEY-----/.test(trimmed)) return { failure: 'bad-key' };

      const key = await crypto.subtle.importKey(
        'spki',
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
    void algorithm;
    return { failure: 'bad-key' };
  }
}

/* --------------------------------------------------------------- verify --- */

export interface VerifyRequest {
  /** The `header.payload` substring — exactly the bytes that were signed. */
  signingInput: string;
  /** The third segment, still base64url. */
  signature: string;
  /** The `alg` from the header. */
  algorithm: string | null;
  /** The `kid` from the header, used to pick out of a JWK Set. */
  keyId?: string | null;
  key: string;
  secretEncoding?: SecretEncoding;
}

export async function verifySignature({
  signingInput,
  signature,
  algorithm,
  keyId = null,
  key,
  secretEncoding = 'utf-8',
}: VerifyRequest): Promise<VerifyResult> {
  if (algorithm && algorithm.toLowerCase() === 'none') return { status: 'unsecured' };
  if (!algorithm || !isSupportedAlgorithm(algorithm)) {
    return { status: 'unsupported', algorithm: algorithm ?? undefined };
  }
  if (signature === '') return { status: 'no-signature', algorithm };
  if (key.trim() === '') return { status: 'no-key', algorithm };

  const spec = specFor(algorithm)!;
  const imported = await importVerificationKey(key, spec, algorithm, keyId, secretEncoding);
  if ('failure' in imported) return { status: imported.failure, algorithm };

  try {
    const ok = await crypto.subtle.verify(
      operationParams(spec),
      imported.key,
      base64UrlToBytes(signature) as BufferSource,
      new TextEncoder().encode(signingInput) as BufferSource,
    );

    return { status: ok ? 'valid' : 'invalid', algorithm, keyId: imported.keyId };
  } catch {
    return { status: 'error', algorithm };
  }
}

/**
 * Whether the signature segment is well-formed base64url. Checked separately so
 * a truncated token — the commonest way a JWT arrives broken — does not report
 * as a failed signature and send people after the wrong bug.
 */
export function signatureLooksWellFormed(signature: string): boolean {
  if (signature === '') return false;
  try {
    decodeSegmentText(signature);
    return true;
  } catch {
    return false;
  }
}
