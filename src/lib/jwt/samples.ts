/**
 * Sample tokens behind the JWT decoder's buttons.
 *
 * Both are genuinely signed with `SAMPLE_SECRET` using HS256, so pressing
 * **Sample** and then pasting the secret produces a real "signature verified" —
 * not a staged one. A demo that faked its own verdict would undermine the only
 * thing the panel is for.
 *
 * The secret is published here on purpose. It protects nothing, and a visitor
 * needs it to try the verifier without reaching for a token of their own.
 */

/** HS256, valid until 2033, carrying a full set of registered claims. */
export const SAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNoZWNrb3V0LTIwMjYtMDgifQ.' +
  'eyJpc3MiOiJodHRwczovL2F1dGgudXRpbGRvY2suZGV2Iiwic3ViIjoidXNlcl84ZjE0ZTQ1' +
  'ZmNlZWEiLCJhdWQiOiJjaGVja291dC1hcGkiLCJleHAiOjIwMDAwMDAwMDAsIm5iZiI6MTc1' +
  'NDQwMDAwMCwiaWF0IjoxNzU0NDAwMDAwLCJqdGkiOiJiM2YxYzJhNC05ZDc3LTRlMjEtOGEw' +
  'My0xZjJlNWM3ZDliNDAiLCJuYW1lIjoiQWRhIExvdmVsYWNlIiwiZW1haWwiOiJhZGFAZXhh' +
  'bXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiYWRtaW4iLCJiaWxs' +
  'aW5nIl0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgY2hlY2tvdXQ6d3JpdGUiLCJwbGFuIjoi' +
  'dGVhbSJ9.ehmQ19jR5-PbgDTaLGVoXf5iYmXth7wQOboChq7bUbA';

/** The same issuer, but `exp` fell in June 2024 — the everyday 401. */
export const SAMPLE_EXPIRED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJodHRwczovL2F1dGgudXRpbGRvY2suZGV2Iiwic3ViIjoidXNlcl84ZjE0ZTQ1' +
  'ZmNlZWEiLCJhdWQiOiJjaGVja291dC1hcGkiLCJleHAiOjE3MTcyNDMyMDAsImlhdCI6MTcx' +
  'NzIzOTYwMCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.' +
  'SMTfv8TxnNJ7arXSjB9_eBl4WZ5UP3mnfZ-jdKBB4WE';

/** Signs both samples. Public by design — see the note above. */
export const SAMPLE_SECRET = 'utildock-demo-secret';

/* ---------------------------------------------------------------- encoder --- */

/**
 * The encoder needs its own secret, and the reason is worth stating.
 *
 * `SAMPLE_SECRET` is twenty bytes. RFC 7518 §3.2 requires an HMAC key at least
 * as long as the hash — thirty-two bytes for HS256 — and the encoder enforces
 * that by default. Reusing the decoder's secret would mean the sample tripped
 * the tool's own warning the moment it loaded, which teaches exactly the wrong
 * lesson. This one is a real 32-byte secret. Also public, also protecting
 * nothing.
 */
export const SAMPLE_SIGNING_SECRET = 'utildock-demo-signing-secret-2026';

/** What the encoder opens with: a header, minus the `alg` it writes itself. */
export const SAMPLE_ENCODER_HEADER = `{
  "typ": "JWT",
  "kid": "checkout-2026-08"
}`;

/** A payload with the claims a real access token carries, and nothing secret. */
export const SAMPLE_ENCODER_PAYLOAD = `{
  "iss": "https://auth.utildock.dev",
  "sub": "user_8f14e45fceea",
  "aud": "checkout-api",
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "roles": ["admin", "billing"],
  "scope": "openid profile checkout:write"
}`;
