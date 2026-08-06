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
