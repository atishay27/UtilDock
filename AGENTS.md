# UtilDock

"Your dock for developer utilities." A static site of small, ad-free developer tools that run
entirely in the browser. Deployed to Cloudflare Pages at https://utildock.dev.

## Development

The dev server daemonizes — start it in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

```
npm run dev       # dev server
npm run build     # static build to dist/
npm run preview   # serve dist/
npm run check     # astro check (types + templates)
npm run fonts     # re-download the self-hosted faces + licence
npm run assets    # regenerate favicon and PWA icons
```

The share card is not drawn in a script — it is a real page at `/og` rendered by the site's own CSS
and fonts. To regenerate: `npm run build && npx astro preview --port 4500`, then screenshot
`http://localhost:4500/og/` at 1200x630 into `public/og-default.png`.

Tailwind only scans files that existed when the dev server started. **After adding a new
component file, restart the dev server** or its classes will silently not be generated.

## The rule that shapes everything

No user *document* leaves the browser. There is no backend, no web font fetch, and the only
third-party script is a Google Tag Manager container that is not loaded until a visitor grants
consent. `public/_headers` allows Google's hosts and nothing else, so `connect-src` is an
allowlist of two: this origin, and analytics.

This is weaker than it once was, and the weakening is deliberate — read the comment block in
`public/_headers` and the header of `src/lib/analytics.ts` before touching either. The short
version: the CSP used to make exfiltration *impossible*; it now makes it *blocked for every
origin we have not named*, and "your document never leaves" is held by the code rather than by
the browser. Any new origin must clear a high bar, and `/privacy` must change in the same commit —
that page describes the mechanism precisely, and goes stale dangerously.

Two consequences worth knowing before changing a dependency:

- **No `eval`.** The CSP omits `'unsafe-eval'`, so any library that compiles code at runtime is
  unusable. This is why schema validation uses `@cfworker/json-schema` (an interpreter) rather
  than ajv (a code generator).
- **Anything new that phones home breaks the page**, loudly, in the console. That is intentional.

## Architecture

Astro 7 static output + React 19 islands + Tailwind 4 (CSS-first, no config file).

- `src/lib/tools.ts` — **the registry, and the single source of truth.** It drives the homepage
  grid, header nav, footer, related-tools rail and per-page JSON-LD. Adding a tool means: one
  entry here, one page under `src/pages/`, one component under `src/components/tools/`.
- `src/lib/json/ops.ts` — the request/response protocol between UI and worker. `worker.ts` runs it
  off the main thread; `useJsonWorker.ts` is the React side and drops replies from superseded
  keystrokes. **All parsing, validation and diffing goes through here** — that is what keeps
  heavyweight dependencies out of the main bundle and multi-megabyte documents from freezing the
  page.
- `src/lib/json/types.ts` vs `parse.ts` — components import `types.ts` (dependency-free helpers).
  `parse.ts` pulls in a second JSON parser for error positions and must stay worker-only.
- `src/styles/global.css` — every colour is a `--fg-*` token declared twice (dark default, light
  override) and mapped into Tailwind via `@theme inline`. Components reference semantic names
  (`bg-anvil`, `text-temper`), never raw colours, so theming is a token swap. **Read DESIGN.md
  before touching the visual system** — in particular the three separate heat ramps and why they
  cannot be collapsed into one.
- Tailwind v4 has no config file; the theme lives in `@theme inline` in `global.css`.
- `src/components/JsonEditor.tsx` — the shared CodeMirror wrapper. Pass `theme="none"`; @uiw
  otherwise injects a light theme with a white background that fights the token theme.

## Deploy

Cloudflare Pages, build `npm run build`, output directory `dist`. `public/_headers` and
`public/_redirects` ship as-is. `public/sw.js` is hand-written — bump `VERSION` in it when the
caching strategy changes.

## Astro reference

Full documentation: https://docs.astro.build
