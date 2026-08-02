# UtilDock

**Your dock for developer utilities.** — [utildock.dev](https://utildock.dev)

Small, sharp developer tools that are free, ad-free, and run entirely in your browser.

| Tool | What it does |
| --- | --- |
| [JSON Viewer](https://utildock.dev/json/viewer) | Collapsible tree with search and path copy |
| [JSON Validator](https://utildock.dev/json/validator) | Syntax errors with line numbers, plus JSON Schema |
| [JSON Comparator](https://utildock.dev/json/diff) | Structural diff that ignores key order |
| [JSON Formatter](https://utildock.dev/json/formatter) | Pretty-print, minify, sort keys |

## Nothing leaves your browser

There is no backend. Every tool is JavaScript running in your tab, and the shipped
Content-Security-Policy (`default-src 'self'`, `connect-src 'self'`) means the page *cannot* make
an outbound request even if a dependency were compromised. No cookies, no analytics, no ads, no
accounts, no third-party scripts, no hosted fonts.

You can check this in one move: load a tool, go offline, and keep using it.

## Development

```bash
npm install
npm run dev       # dev server (daemonized — stop with `npx astro dev stop`)
npm run build     # static build to dist/
npm run check     # types and templates
npm run assets    # regenerate icons and the OG image
```

Built with [Astro](https://astro.build) (static output), React islands, Tailwind CSS 4 and
CodeMirror 6. Parsing, validation and diffing run in a Web Worker so large documents never block
the page.

See [AGENTS.md](./AGENTS.md) for architecture notes and the constraints that shape the codebase.

## Deploying

Cloudflare Pages, with **build command** `npm run build` and **output directory** `dist`.
`public/_headers`, `public/_redirects` and `public/sw.js` ship as static files.
