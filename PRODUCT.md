# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: developers at organizations with strict data-handling policies — finance, health,
government, and enterprises where pasting a payload into an unknown website is a policy violation,
not just a bad habit. They are mid-task, holding a real request body, log line, or API response,
and the question they need answered before using any tool is "am I allowed to put this here?"

UtilDock's job for them is to be the tool they are permitted to use.

A secondary audience follows from the same work: any developer debugging real payloads who would
rather not send them to a stranger. They benefit from the same guarantee without needing to think
about it.

## Product Purpose

A dock of small developer utilities that run entirely in the browser, so that using one is never a
data-disclosure decision.

The category's incumbents are ad-supported, and most post what you paste to a server. UtilDock
exists to remove that trade: the same everyday tasks — read this JSON, check it, compare it,
reshape it — with nothing transmitted and nothing to consent to.

Success is a dependable utility that stays fast, stays correct, and does not rot. There are no
growth or traffic targets. Quality and longevity outrank reach.

## Positioning

Competitors *claim* client-side processing. UtilDock is architecturally incapable of doing anything
else, and can prove it three ways a security reviewer accepts:

- there is no backend to receive data;
- the shipped Content-Security-Policy (`default-src 'self'`, `connect-src 'self'`) makes an
  outbound request impossible even from a compromised dependency;
- the whole site works with the network disconnected, which no server-backed tool can fake.

The differentiator is verifiability, not the claim. Anyone can assert "your data never leaves your
browser"; the value here is that a skeptical reviewer can check it in under a minute.

## Operating Context

Used mid-task, in a browser tab beside an editor, terminal, or API client. Sessions are short and
interruptive: paste, get an answer, leave. Inputs are frequently real production data, often large,
often malformed — malformed input is a normal case, not an error case.

Adoption inside a constrained organization may involve a second person: a security reviewer or
policy owner who evaluates the site without ever using a tool on it. That evaluation path is part
of the product, not marketing around it.

## Capabilities and Constraints

Live today: JSON viewer, validator, comparator, and formatter. A JWT decoder is declared next in
the tool registry. Longer term this is a **broad** developer-utility dock — encoding, hashing,
identifiers, time, expressions — not a JSON-only site. Breadth is the intent; the tool registry
(`src/lib/tools.ts`) exists to make adding one cheap.

Durable technical constraints, all currently true and all load-bearing:

- **No backend.** Static hosting (Cloudflare Pages). All computation happens in the page.
- **No `eval`.** The CSP omits `'unsafe-eval'`, so libraries that compile code at runtime cannot be
  used. This already forced schema validation onto `@cfworker/json-schema` (an interpreter) instead
  of ajv (a code generator). Every future dependency faces the same test.
- **Full offline operation is a protected property**, not a side effect of being static. A feature
  that only works online does not ship.
- **Heavy work runs in a Web Worker** so large documents never freeze the page.
- Only client-side persistence: `localStorage` holds each tool's current input and preferences.

### Permanent commitments

Confirmed as never-break, not launch stances:

- **Never ads.** This rules out the funding model every competitor uses.
- **Never accounts or sign-up.** No login, no user records, nothing to breach — which also rules
  out sync, saved workspaces, and team features.
- **No third-party requests of any kind.** No CDN, no hosted fonts, no embeds. The CSP stays strict
  enough that exfiltration is impossible.
- **No analytics script, of any kind, including cookieless ones.** Traffic questions are answered
  from the host's own request logs, which exist because the files must be served at all. Nothing
  additional runs in the visitor's page. If measurement is ever needed it must be first-party and
  disclosed on `/privacy` before it ships.

### Required for the primary audience

- Fully offline operation (already true).
- A plainly worded page stating what is stored, what is transmitted, and what the CSP forbids —
  something a developer can forward to a security team. `/privacy` is a first pass at this.
- **Publicly inspectable source.** Not yet met: the repository is local-only with no remote. Until
  it is public, the "verify it yourself" position is weaker than the product claims.

### Open decisions — record, do not invent

- **Self-hosting is not a requirement.** It was offered and not chosen, so no architecture decision
  should be justified by it.
- **Tool order after JWT is unset.** Breadth is committed; sequence is not.
- No decision has been made about funding, licensing, or long-term maintenance ownership.

## Brand Commitments

- Name: **UtilDock**. Domain `utildock.dev`, owned.
- Tagline: **"Your dock for developer utilities."** Fixed.
- The "dock" metaphor is the product's organizing idea: a place tools are docked, added to over
  time.

## Evidence on Hand

Pre-launch. Nothing is deployed, there are no users, no traffic, no testimonials, no press, and no
benchmarks. **Future work must not fabricate any of these** — no invented user counts, no "trusted
by" claims, no fictional reviews.

What genuinely exists and can be shown:

- A working, verifiable privacy guarantee, demonstrable live by disconnecting the network.
- Measured performance facts from this build: a 1.58 MB / 36,000-object document formats with a
  worst main-thread stall of 106 ms; the tree viewer renders 34 DOM nodes for 144,003 expanded rows.
  These are real and citable.
- Generated brand assets in `public/` (icons, OG card), reproducible via `npm run assets`.
- Two local commits; no public repository yet.

## Product Principles

1. **The guarantee is the product.** Any feature that cannot survive "nothing leaves the browser"
   is not a feature of this product, however useful it would be.
2. **Prove, don't assert.** Every privacy claim must be checkable by a skeptic in minutes — offline
   operation, readable source, plain-language guarantees. Unverifiable claims are worth less than
   no claim.
3. **Breadth is earned one tool at a time.** The dock grows, but a new tool ships only when it meets
   the same bar as the existing four. A wide drawer of mediocre tools defeats the purpose.
4. **Built for real inputs.** Large, malformed, and deeply nested data are the normal case. Handling
   them well is the baseline, not an optimization.
5. **Longevity over reach.** No growth targets. Prefer decisions that keep the site correct and fast
   in five years over ones that would attract attention now.
