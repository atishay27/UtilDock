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
npm run assets    # regenerate icons and the OG image from scripts/generate-assets.mjs
```

Tailwind only scans files that existed when the dev server started. **After adding a new
component file, restart the dev server** or its classes will silently not be generated.

## The rule that shapes everything

No user data leaves the browser. There is no backend, no analytics by default, no third-party
script, no web font fetch. `public/_headers` enforces this with a CSP whose `default-src 'self'`
and `connect-src 'self'` make exfiltration impossible even from a compromised dependency.

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
- `src/styles/global.css` — every colour is a `--ud-*` token declared twice (dark default, light
  override) and mapped into Tailwind via `@theme inline`. Components reference semantic names
  (`bg-surface`, `text-muted`), never raw colours, so theming is a token swap.
- `src/components/JsonEditor.tsx` — the shared CodeMirror wrapper. Pass `theme="none"`; @uiw
  otherwise injects a light theme with a white background that fights the token theme.

## Deploy

Cloudflare Pages, build `npm run build`, output directory `dist`. `public/_headers` and
`public/_redirects` ship as-is. `public/sw.js` is hand-written — bump `VERSION` in it when the
caching strategy changes.

## Astro reference

Full documentation: https://docs.astro.build
