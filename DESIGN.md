---
name: UtilDock
description: A forge, not a dashboard — developer tools where the work is heated, struck, measured, and never leaves the shop.
colors:
  forge-black: "#0a0a0c"
  bench-iron: "#131417"
  anvil-face: "#1b1d21"
  anvil-lit: "#24272c"
  scribed-line: "#2f3339"
  scribed-line-strong: "#454a52"
  chalk: "#f2ede6"
  tempered-grey: "#a8a49d"
  faint-mark: "#86837b"
  cold-stock: "#5a5f66"
  dull-red: "#7a1e12"
  cherry: "#ff4b00"
  white-heat: "#ffb400"
  white-hot: "#fff7f0"
  stamp: "#100c0a"
  stamp-ink: "#f4efe8"
  rings-true: "#4fb477"
  crack: "#ff5c46"
  mill-scale-ground: "#e5e2dc"
  cold-shop-bench: "#efece6"
  cold-shop-anvil: "#f6f4ef"
  cold-chalk: "#17181b"
  cold-cherry: "#b02c00"
  cold-crack: "#b02513"
  cold-rings-true: "#17714a"
typography:
  display:
    fontFamily: "Big Shoulders Display, Haettenschweiler, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 11vw, 9rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Haettenschweiler, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 4.5vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  force:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "tnum"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  tight: "4px"
  snug: "8px"
  base: "16px"
  wide: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.forge-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-default:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-default-hover:
    textColor: "{colors.cherry}"
  button-stamped:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.stamp-ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-stamped-outline:
    backgroundColor: "transparent"
    textColor: "{colors.stamp}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  panel:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
  panel-header:
    backgroundColor: "{colors.bench-iron}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    padding: "8px 12px"
  tool-row:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    padding: "28px 0"
---

# Design System: UtilDock

## Overview

**Creative north star: the forge.** Stock arrives cold, is brought to heat, struck, measured, and
carried out — and it never leaves the shop. That last clause is the product: UtilDock's tools run
entirely in the visitor's own tab, and the visual system exists to make that fact physical rather
than asserted.

The system is built from a working smithy's grammar: a heat scale that reads temperature, stencilled
condensed capitals, tabular force numerals, scale-fleck texture, and scribed hairlines. It is
deliberately not the category default — the near-black page with one neon accent and a grid of
rounded cards — and not that default's opposite, the white SaaS marketing page. Its measured tone is
industrial and unsentimental: nothing is soft, nothing is glassy, nothing is decorative.

**Two registers, not a theme and its inverse.** Dark is the forge at heat: scale-black ground with
the work glowing on it. Light is the cold shop by day: mill-scale concrete, dark chalk marks, and
the same heat scale reading state — which reads *harder* against a cold ground. Both are first-class;
the site is used in both, unpredictably.

**Anti-references:** glass and blur, gradient text, soft-shadowed rounded rectangles, pill buttons,
icon-plus-heading-plus-text card grids as page structure, and any monospace used as a costume for
"technical" rather than for code or measurement.

## Colors

**Colour is state, not decoration.** A colour on this site means the work is at a temperature. The
ramp is the one a smith actually reads: cold → dull red → cherry → white heat → white hot.

| Role | Dark (forge) | Light (cold shop) | Meaning |
| --- | --- | --- | --- |
| Ground | `#0a0a0c` forge black | `#e5e2dc` mill-scale concrete | The floor everything sits on |
| Bench | `#131417` | `#efece6` | Panel headers and footers |
| Anvil | `#1b1d21` | `#f6f4ef` | Working surfaces — panels, editors |
| Scribed line | `#2f3339` / `#454a52` | `#c9c4ba` / `#a8a296` | Hairline and structural rules |
| Chalk | `#f2ede6` | `#17181b` | Primary text |
| Tempered | `#a8a49d` | `#4f5257` | Secondary text |
| Faint | `#86837b` | `#5a5d62` | Engraved legends (holds 4.5:1) |
| Cold stock | `#5a5f66` | `#8a8d92` | Nothing on the anvil yet |
| Cherry | `#ff4b00` | `#b02c00` | Working heat — the primary accent |
| White heat | `#ffb400` | `#a25c00` | Keys, warnings, focus ring |
| Rings true | `#4fb477` | `#17714a` | Valid — the piece is sound |
| Crack | `#ff5c46` | `#b02513` | A fault, located to the column |

In the comparator these verdict colours take on a second, fixed meaning, and it must not drift:
**red is what exists only in the original, green is what exists only in the changed document, and an
amber arrow between them marks a value that was replaced** — old struck through, new weighted. It is
the one convention on the site borrowed wholesale from outside it, because every developer already
reads it, and a tool whose whole claim is "understand this at a glance" cannot afford to teach a
private colour code first.

Three colour groups exist for reasons worth preserving:

1. **Text-safe heat tokens** (`--fg-cherry`, `--fg-heat`, `--fg-white-hot`) are tuned for contrast
   against their own ground and darken in the light register.
2. **The billet ramp** (`--fg-bar-*`) is a *graphic*, not text. Its luminance must climb monotonically
   to the hot end in both registers, so light mode uses its own saturated values. Never draw the bar
   from the text tokens: in light mode `--fg-white-hot` is the darkest of them, and the bar inverts.
3. **Stamp tokens** (`--fg-stamp`, `--fg-stamp-ink`) are identical in both registers, because the
   metal is hot in both. Anything struck into the bar uses these; a theme-following colour vanishes
   on the light side.

Cherry carries roughly 5–10% of the surface: primary action, active nav, active line, caret, active
filter. It is never used as a wash or a decorative fill.

## Typography

Three self-hosted variable faces, one job each. They are self-hosted because the site forbids
third-party requests; see Do's and Don'ts.

- **Big Shoulders Display (800)** — the display voice. Always uppercase, always tight
  (`line-height: 0.92`). Headings, primary actions, tool names, the logotype. Its full stop is a
  solid square, so at hero scale keep it inside the accent span or it reads as a stray block.
- **Archivo (400/500/600)** — body and UI. Sentence case, normal rhythm.
- **JetBrains Mono (400/500)** — code and measurement only, always with `tabular-nums`. Every figure
  that is a quantity uses it: byte counts, node counts, line and column numbers, tool indices.

Two named utility roles carry most of the system's character:

- `.ud-legend` — engraved legend plates: 0.6875rem, weight 600, `letter-spacing: 0.16em`, uppercase.
  Panel titles, nav, footers, status strips, badges.
- `.ud-force` — force numerals: mono with tabular figures. Measurement is always tabular so columns
  of numbers align and never shift as they update.

Reading pages (`about`, `privacy`) wrap their body in `.ud-prose`, which returns `h2`/`h3` to Archivo
in sentence case. Comprehension outranks the world in Read mode.

## Layout

- Content max width `1600px` on app and landing surfaces; `42rem` (`max-w-2xl`) for reading pages.
- Horizontal padding `1rem`, `1.5rem` at `sm` and above.
- Breakpoints are Tailwind defaults; the meaningful ones are `sm` (640) for panel headers and
  category headings, and `lg` (1024) where tool pages become two columns.
- **One blow per full-width row.** The tool directory is full-bleed rows, not a card grid: index
  numeral, name, category, description, with a heat bar wiping up the left edge on hover.
- **Side-by-side panels share row tracks.** Panels that sit next to each other pass `aligned`, which
  puts them on `lg:grid-rows-subgrid lg:row-span-3` against a parent declaring
  `lg:grid-rows-[auto_minmax(0,1fr)_auto]`. Headers, bodies and footers then line up even when one
  panel's controls wrap and the other's do not — without it, the two editors' first lines drift apart
  at intermediate widths.
- Panel headers wrap rather than clip. Controls flow onto a second row on narrow screens; they must
  never disappear past the right edge.

## Elevation & Depth

**The system is flat.** There are no drop shadows anywhere in the interface. Depth comes from tonal
layering and rules:

`ground` → `bench` (headers, footers) → `anvil` (working surfaces) → `anvil-lit` (raised controls),
separated by 1px `scribe` hairlines and 2px `scribe-strong` rules at structural boundaries.

Texture does the rest. `.ud-scale` scatters radial-gradient scale flecks across grounds — the black
shell that shatters off hot iron. It is a named material of this world, generated in CSS so it costs
no request and tiles at any size. A design detector may flag it as a decorative grid field; it is a
deliberate, documented exception.

`.ud-void` is the second material: a fine diagonal hatch standing for absence. The comparator uses it
where one document has nothing on the line the other one occupies — an empty cell would read as
padding, whereas hatching reads as "no stock here". Same rationale, same exception.

## Shapes

**Nothing is rounded.** `border-radius` is `0` everywhere, without exception — buttons, panels,
inputs, badges, checkboxes, editors. The form language is struck and stamped, not moulded. A radius
anywhere in this system is a bug.

Borders carry structure: 1px `scribe` for internal division, 2px `scribe-strong` for structural
boundaries, 2px `cherry` as a section-opening rule.

The billet (`.ud-billet`) is the system's one gradient and its signature object: a heat-graded bar,
white-hot at the left where the blow lands, cooling to grey along its length.

## Components

- **Panel** — the workspace unit. `bench` header strip with a `.ud-legend` title and right-aligned
  controls, `anvil` body, optional `bench` footer carrying measurements. Passing `strikeKey` runs a
  cherry bar across the top when a result lands: the visual report of a blow.
- **Button** — square, `.ud-legend` caps, 1px border. `default` is anvil with a chalk legend going
  cherry on hover; `primary` is a solid cherry block; `danger` borders to `crack` on hover. Disabled
  is 35–40% opacity plus `cursor-not-allowed` — a disabled control must *look* disabled.
- **Stamped button** — display-scale action struck into the billet. Solid `stamp` block with
  `stamp-ink` legend, or a 2px `stamp` outline. Used only on the bar.
- **Toggle / Select** — square custom checkbox filling cherry when checked; both dim to 40% when
  disabled.
- **Status** — a 1.5px square colour mark plus text. Four temperatures only: `idle` (cold stock),
  `ok` (rings true), `warn`, `error` (crack).
- **Tool row** — full-width link: `.ud-force` index numeral, display-caps name, `.ud-legend`
  category, body description. Unavailable tools drop to `tempered` and lose the heat bar; they never
  use blanket opacity, which would take their body copy below contrast floor.
- **Editor** — CodeMirror themed entirely through the site's custom properties, so both registers
  swap with no remount and no second theme to maintain. Value types are coloured off the heat scale;
  a syntax error is underlined in `crack` with a gutter mark.

## Do's and Don'ts

**Do**

- Treat colour as temperature. If a new colour does not report a state, it does not belong.
- Keep every figure tabular and in `.ud-force`.
- Self-host any new font, image or script. `public/_headers` ships a CSP with `default-src 'self'`
  and `connect-src 'self'`, which is the mechanism behind the product's privacy claim — an added
  origin is a route data could leave by.
- Verify contrast in *both* registers before committing a token. Small legend text is the usual
  casualty.
- Let the world recede on tool pages. Expression may never obscure the task, its state, or a familiar
  affordance.

**Don't**

- Don't add a `border-radius`, a drop shadow, glass, or a gradient that isn't the billet.
- Don't put a kicker or eyebrow above a heading.
- Don't use a library that compiles code at runtime — the CSP omits `'unsafe-eval'`. This is why
  schema validation uses `@cfworker/json-schema` rather than ajv.
- Don't draw the billet from the text-safe heat tokens, or stamp onto it with theme-following
  colours. Use `--fg-bar-*` and `--fg-stamp*`.
- Don't rebuild the tool directory as a card grid.
- Don't scatter animation. The system has one authored motion idea — the strike — expressed as
  `.ud-strike` on arrival and a cherry bar when an operation lands. Everything else is a plain state
  transition, and all of it collapses under `prefers-reduced-motion`.
