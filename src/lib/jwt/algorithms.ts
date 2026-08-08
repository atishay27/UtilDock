/**
 * The JWA algorithm table, and the byte plumbing that surrounds it.
 *
 * This was private to `verify.ts` until there was a second tool that had to
 * agree with it. Signing and verifying must never disagree about what `PS384`
 * means — the salt length, the curve, the hash — so the table is stated once
 * and both sides import it. Two copies would be two chances to drift, and the
 * failure that produces is a token that this site mints and this site then
 * refuses, which is the worst possible bug for a pair of tools sitting one
 * click apart.
 *
 * Everything here maps onto a WebCrypto primitive every current browser
 * implements. An algorithm absent from the table is reported as unsupported
 * rather than approximated: a signature that is nearly right is worse than one
 * that declines to answer.
 */

export type Family = 'HMAC' | 'RSASSA-PKCS1-v1_5' | 'RSA-PSS' | 'ECDSA';

export interface AlgorithmSpec {
  family: Family;
  hash: 'SHA-256' | 'SHA-384' | 'SHA-512';
  /** The curve an EC algorithm pins. JWT fixes one curve per algorithm. */
  curve?: 'P-256' | 'P-384' | 'P-521';
}

export const ALGORITHMS: Record<string, AlgorithmSpec> = {
  HS256: { family: 'HMAC', hash: 'SHA-256' },
  HS384: { family: 'HMAC', hash: 'SHA-384' },
  HS512: { family: 'HMAC', hash: 'SHA-512' },
  RS256: { family: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
  RS384: { family: 'RSASSA-PKCS1-v1_5', hash: 'SHA-384' },
  RS512: { family: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512' },
  PS256: { family: 'RSA-PSS', hash: 'SHA-256' },
  PS384: { family: 'RSA-PSS', hash: 'SHA-384' },
  PS512: { family: 'RSA-PSS', hash: 'SHA-512' },
  ES256: { family: 'ECDSA', hash: 'SHA-256', curve: 'P-256' },
  ES384: { family: 'ECDSA', hash: 'SHA-384', curve: 'P-384' },
  ES512: { family: 'ECDSA', hash: 'SHA-512', curve: 'P-521' },
};

export const SUPPORTED_ALGORITHMS = Object.keys(ALGORITHMS);

export function isSupportedAlgorithm(alg: string | null): boolean {
  return alg !== null && alg.toUpperCase() in ALGORITHMS;
}

/** True when the algorithm takes a shared secret rather than a key pair. */
export function isSymmetric(alg: string | null): boolean {
  if (!alg) return false;
  return ALGORITHMS[alg.toUpperCase()]?.family === 'HMAC';
}

export function specFor(alg: string): AlgorithmSpec | null {
  return ALGORITHMS[alg.toUpperCase()] ?? null;
}

/** How a typed HMAC secret should be read before it becomes key material. */
export type SecretEncoding = 'utf-8' | 'base64url';

/* --------------------------------------------------------- import params --- */

/**
 * The parameters `importKey` needs for this algorithm. Shared so that a key
 * imported for signing and the same key imported for verification are described
 * to WebCrypto identically.
 */
export function importParams(spec: AlgorithmSpec): RsaHashedImportParams | EcKeyImportParams {
  return spec.family === 'ECDSA'
    ? { name: 'ECDSA', namedCurve: spec.curve! }
    : { name: spec.family, hash: spec.hash };
}

/**
 * The parameters `sign` and `verify` need. RSA-PSS is the one that carries an
 * extra term: RFC 7518 §3.5 fixes the salt length at the hash length, so PS256
 * salts with 32 bytes, PS384 with 48 and PS512 with 64.
 */
export function operationParams(
  spec: AlgorithmSpec,
): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
  if (spec.family === 'ECDSA') return { name: 'ECDSA', hash: spec.hash };
  if (spec.family === 'RSA-PSS') {
    return { name: 'RSA-PSS', saltLength: Number(spec.hash.slice(4)) / 8 };
  }
  return { name: spec.family };
}

/* ------------------------------------------------------------- encoding --- */

export function base64UrlToBytes(segment: string): Uint8Array {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Bytes → base64url, unpadded.
 *
 * The padding matters: RFC 7515 §2 defines base64url encoding for JWS *with the
 * trailing `=` removed*, and a token carrying padding is rejected by strict
 * verifiers even though `atob` would read it back happily.
 */
export function bytesToBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  // Chunked: `String.fromCharCode(...view)` blows the argument limit somewhere
  // around 100k bytes, which an RSA signature never reaches but a caller with
  // a larger payload might.
  const CHUNK = 0x8000;
  for (let i = 0; i < view.length; i += CHUNK) {
    binary += String.fromCharCode(...view.subarray(i, i + CHUNK));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** UTF-8 text → base64url, which is how a JWT's header and payload are carried. */
export function textToBase64Url(text: string): string {
  return bytesToBase64Url(new TextEncoder().encode(text));
}

export function pemToBytes(pem: string): Uint8Array {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
