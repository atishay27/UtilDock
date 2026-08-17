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
  faint-mark: "#908d85"
  cold-stock: "#5a5f66"
  dull-red: "#7a1e12"
  cherry: "#ff4b00"
  white-heat: "#ffb400"
  white-hot: "#fff7f0"
  on-cherry: "#140503"
  stamp: "#100c0a"
  stamp-ink: "#f4efe8"
  rings-true: "#4fb477"
  crack: "#ff5c46"
  json-key: "#ffb400"
  json-string: "#9fd6ae"
  json-number: "#ff8c4a"
  json-boolean: "#ff7a9c"
  json-null: "#8d8a82"
  cold-shop-ground: "#e5e2dc"
  cold-shop-bench: "#efece6"
  cold-shop-anvil: "#f6f4ef"
  cold-chalk: "#17181b"
  cold-tempered: "#4f5257"
  cold-faint: "#5a5d62"
  cold-cherry: "#b02c00"
  cold-white-heat: "#a25c00"
  cold-rings-true: "#17714a"
  cold-crack: "#b02513"
typography:
  display:
    fontFamily: "'Big Shoulders Display', Haettenschweiler, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.25rem, 11vw, var(--ud-hero-max))"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Big Shoulders Display', Haettenschweiler, 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.9rem, 4.5vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  title:
    fontFamily: "'Big Shoulders Display', Haettenschweiler, 'Arial Narrow', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
  force:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontFeature: "'tnum' 1"
  scale:
    legend: "0.6875rem"
    fine: "0.75rem"
    code: "0.8125rem"
    body: "0.875rem"
    struck-nav: "1.05rem"
    struck-wordmark: "1.35rem"
    struck-row: "1.5rem"
    struck-note: "1.6rem"
    struck-section: "1.75rem"
    struck-row-wide: "2rem"
    og-lead: "1.7rem"
    og-display: "6.5rem"
rounded:
  none: "0"
spacing:
  tight: "4px"
  snug: "8px"
  control: "12px"
  gutter: "16px"
  gutter-wide: "24px"
  band: "56px"
  section: "112px"
components:
  button-default:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-default-hover:
    textColor: "{colors.cherry}"
  button-primary:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.on-cherry}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.tempered-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-danger:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.tempered-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  button-danger-hover:
    textColor: "{colors.crack}"
  panel:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
  panel-header:
    backgroundColor: "{colors.bench-iron}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
    height: "48px"
  select-trigger:
    backgroundColor: "{colors.anvil-face}"
    textColor: "{colors.chalk}"
    typography: "{typography.force}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  select-option-active:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.on-cherry}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  toggle-checked:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.on-cherry}"
    rounded: "{rounded.none}"
    size: "14px"
  site-header:
    backgroundColor: "{colors.forge-black}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    height: "56px"
    padding: "0 16px"
---

# Design System: UtilDock

## Overview

**Creative North Star: "The Forge"**

This is a working smithy, not a dashboard. Stock arrives cold, goes into the fire, gets struck on
the anvil, and is measured. Every surface in the interface is named for a place in that shop — the
`ground` underfoot, the `bench` beside the anvil, the `anvil` face where the work happens — and
every colour that is not a surface reports a temperature. The metaphor is not decoration applied
over a generic tool site; it is the naming system the code itself uses, which is why a token called
`cherry` means "at working heat" and not "orange".

The register is dense, square, and unapologetically industrial. Nothing is rounded, nothing floats,
nothing is soft. Type is stencilled condensed capitals for anything that announces, and tabular
monospace for anything that measures. Colour is scarce and load-bearing: most of the page is four
greys, and the heat scale appears only where something is genuinely at a state. The result reads
closer to a machine tool's fascia than to a web app.

Dark and light are **two registers of the same shop**, not a theme and its inverse. Dark is the forge
at heat: forge-black ground with the work glowing on it. Light is the cold shop by day: mill-scale
concrete, dark chalk marks, and the same heat scale reading state — which reads *harder* against a
cold ground, so its values are re-struck rather than merely lightened. Both are first-class.

The world is also under a standing constraint the product imposes: this is an Operate surface used
mid-task, on real production data, often malformed. Expression may never obscure the task, its
state, or a familiar affordance.

**Key Characteristics:**

- Zero border-radius, anywhere, without exception
- Zero drop shadows; depth is tonal layering plus hairlines
- Colour reports temperature or it does not appear
- Stencilled condensed capitals announce; tabular monospace measures
- One authored motion idea — the strike — and nothing else
- Two registers, both first-class, swapped by token not by second stylesheet

## Colors

A heat scale on four greys. The greys carry all structure; the scale carries all state.

### Primary

- **Cherry** (`#ff4b00` dark / `#b02c00` light): working heat, and the system's only accent. It marks
  the active option, the focused border, the bar that lands when an operation completes, and the
  emphasised figure in a metric. The light value is re-struck rather than converted — it holds 4.5:1
  on the pale ground, which the dark value does not.
- **On Cherry** (`#140503` dark / `#fff7f0` light): the legend struck into hot metal. The only text
  colour permitted on a cherry field.

### Secondary

The rest of the heat scale, in order of temperature. These report state and are never used to
decorate.

- **Cold stock** (`#5a5f66`): nothing on the anvil yet — idle, empty, untouched.
- **Dull red** (`#7a1e12`): the first colour in the metal.
- **White heat** (`#ffb400`): keys, warnings, and the focus ring.
- **White hot** (`#fff7f0`): the top of the scale; the flare in the billet and the selection colour.

### Tertiary

Verdicts and value types, drawn off the same scale so nothing introduces a new hue.

- **Rings true** (`#4fb477` dark / `#17714a` light): the piece is sound — valid, verified, matched.
- **Crack** (`#ff5c46` dark / `#b02513` light): a fault, located to the column where it opened.
- **JSON value types** (`json-key #ffb400`, `json-string #9fd6ae`, `json-number #ff8c4a`,
  `json-boolean #ff7a9c`, `json-null #8d8a82`): the editor's syntax colours, each a descendant of the
  heat scale rather than an imported theme.

### Neutral

Four grounds stacked from the floor up, and three mark weights on top of them.

- **Forge black** (`#0a0a0c` dark / `#e5e2dc` light): the floor everything sits on.
- **Bench iron** (`#131417` dark / `#efece6` light): panel headers and footers.
- **Anvil face** (`#1b1d21` dark / `#f6f4ef` light): working surfaces — panels, editors, controls.
- **Anvil lit** (`#24272c` dark / `#fbfaf7` light): a raised control on the anvil.
- **Scribed line** (`#2f3339` / `#454a52` dark): 1px internal division and 2px structural boundary.
- **Chalk** (`#f2ede6` dark / `#17181b` light): primary text.
- **Tempered grey** (`#a8a49d` dark / `#4f5257` light): secondary text.
- **Faint mark** (`#908d85` dark / `#5a5d62` light): engraved legends.

### Named Rules

**The Heat Rule.** A colour here says the work is at a temperature. If a new colour does not report a
state, it does not belong. There is no decorative colour in this system and no room for one.

**The Two Registers Rule.** Dark and light are the same shop under different light, not a palette and
its inverse. A light value is re-struck for its ground, never derived by flipping lightness — which
is why `cherry` is `#b02c00` cold and `#ff4b00` hot.

**The Contrast Floor Rule.** Every text token holds 4.5:1 against **every** ground it can land on, not
merely the darkest. `faint-mark` was `#86837b` until an audit found it clearing forge-black at 5.22
and the bench at 4.86 but missing on the anvil at 4.46 — which is where engraved legends mostly sit.
It is now `#908d85`: 5.97 / 5.56 / 5.09 / 4.52 across the four dark grounds. Verify a new token in
both registers, against all four, before committing it. Small legend text is the usual casualty.

## Typography

**Display Font:** Big Shoulders Display (with Haettenschweiler, Arial Narrow)
**Body Font:** Archivo (with system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas)

**Character:** A stencilled condensed grotesque that behaves like paint through a plate, set against a
plain workmanlike sans and a mono reserved strictly for measurement. The display face is set at
weight 800, uppercase, and struck tight — line-height `0.92`, letter-spacing `0.005em` — so headings
read as stamped into the surface rather than typeset on it.

All three faces are self-hosted and carry the **latin subset only**. Cyrillic and CJK fall through to
the system faces named at the tail of each stack, which is deliberate: the site publishes in eight
languages including Japanese and Chinese, and a CJK webfont would cost those visitors more than the
entire rest of the page. The visible result is a mix — the condensed face sets "JSON", the system
face sets the kana beside it — and that mix is accepted.

### Hierarchy

- **Display** (800, `clamp(3.25rem, 11vw, var(--ud-hero-max))`, 0.92): the home hero only. One per page.
- **Headline** (800, `clamp(1.9rem, 4.5vw, 3rem)`, 0.92): page `h1` on tools, hubs, about, privacy.
- **Title** (800, `1.35rem`, 0.92): the wordmark in the site header, and section `h2`s at rest.
- **Body** (400, `0.875rem`, 1.625): prose and taglines. Long-form is capped at `max-w-prose`.
- **Label** (600, `0.6875rem`, `0.16em`, uppercase): `.ud-legend` — panel titles, footers, badges,
  buttons, table headers. The single most-used type role in the system.
- **Force** (`JetBrains Mono`, `tabular-nums`, `'tnum' 1`): `.ud-force` — every figure, without
  exception.

### The ramp

The roles above name the *voices*; this is the enumerated set of sizes those voices are allowed to
take. Anything outside it is drift.

| Step | Size | Where |
| --- | --- | --- |
| `legend` | `0.6875rem` | `.ud-legend`, and the editor's own chrome — collapsed-line pills, merge accept/reject |
| `fine` | `0.75rem` | `.ud-force` figures, footnotes |
| `code` | `0.8125rem` | Mono reading surfaces: the JSON tree, the JWT token layers |
| `body` | `0.875rem` | Prose, taglines, descriptions |
| `struck-nav` | `1.05rem` | Display face at its smallest: tool names in the header menu |
| `struck-wordmark` | `1.35rem` | The wordmark |
| `struck-row` → `struck-row-wide` | `1.5rem` → `2rem` | Tool row name, narrow → `sm` and above |
| `struck-note` | `1.6rem` | Category hub note headings |
| `struck-section` | `1.75rem` | Tool page section headings, under a 2px cherry rule |
| `og-lead` / `og-display` | `1.7rem` / `6.5rem` | **The share card only.** `/og` is a fixed 1200×630 render target, not a page — it runs two steps of its own that no visitor-facing surface may use |

**The Coupled Unit Rule.** `code` is spelled `0.8125rem` in the JWT tools and `13px` in the JSON tree,
and that is not an oversight to tidy. The tree is virtualised against `ROW_HEIGHT = 24`, a pixel
constant, so its text must not scale with the visitor's root font size or it would grow inside a row
that cannot. Everywhere the row height is not pixel-locked, use the rem spelling — a px font-size
ignores the reader's own setting, which is a cost worth paying only where the layout is pinned to
pixels anyway.

### Named Rules

**The Tabular Rule.** Every number in this interface is `.ud-force`. Without it, a count ticking from
199 to 200 shifts the whole row sideways while someone is typing. Measurement is monospace and
tabular; there is no such thing as a proportional figure here.

**The No Kicker Rule.** Nothing sits above a heading. No eyebrow, no kicker, no category label riding
over the `h1`. The heading opens the section.

**The Case Inheritance Rule.** `button { text-transform: inherit }` is set globally because the UA
stylesheet forces `none` on form controls and Tailwind's preflight does not undo it — a `<button>`
inside an uppercase container would otherwise render in source case beside its `<a>` siblings.
Inputs and selects are deliberately left alone: a button's label is ours, a visitor's typed value is
not.

## Layout

A single wide measure with a fixed rhythm. The page container is `max-w-[1600px]` with a `16px`
gutter that opens to `24px` at `sm`. The site header is `56px` tall and sticky, on the `ground`
colour, closed by a 1px `scribe` rule.

Three breakpoints are in use — `sm` (640px), `md` (768px), `lg` (1024px) — and they carry distinct
jobs rather than being generic reflow points: `sm` opens the gutter and restores full control
labels, `md` reveals the header's tool navigation, `lg` moves tool surfaces from a stacked column
into their side-by-side working layout.

Density is deliberate and high. Controls are `6px 10px`; panel headers hold a `48px` floor so a
panel whose only control is a checkbox still aligns with the one beside it; panel footers hold
`32px`. Vertical rhythm on reading surfaces runs in bands: `56px` for a standard section and `112px`
for a hero. Tool surfaces do not use that rhythm — they fill the viewport and scroll internally, so
the page itself never scrolls past its own header.

Panels that must align across a row use `lg:grid-rows-subgrid` rather than matched fixed heights.

## Elevation & Depth

**The system is flat.** There are no drop shadows in the interface. Depth is tonal layering plus
rules: `ground` → `bench` (headers, footers) → `anvil` (working surfaces) → `anvil-lit` (raised
controls), separated by 1px `scribe` hairlines and 2px `scribe-strong` at structural boundaries.

> **`--fg-shadow` is declared but dead.** `global.css` defines it in both registers
> (`0 2px 4px rgb(0 0 0 / 0.5), 0 12px 28px -12px rgb(0 0 0 / 0.7)` dark; a lighter pair light), and a
> scan of the entire codebase finds **zero consumers**. It is vestigial, not a sanctioned shadow
> vocabulary. Do not read its presence as permission to add elevation.

Texture does the depth work that shadow would do elsewhere, and both materials are generated in CSS
so they cost no request:

- **`.ud-scale`** — scale flecks, the black shell that shatters off hot iron. Four radial-gradient
  dots at irregular offsets, tiled at four pairwise-coprime sizes (`37×41, 53×47, 61×59, 43×67`) so
  the field never visibly repeats. A design detector may flag this as a decorative grid field. It is
  not a grid, and it is a deliberate, documented exception.
- **`.ud-void`** — a fine 135° hatch standing for absence. The comparator uses it where one document
  has nothing on the line the other occupies; an empty cell would read as padding, whereas hatching
  reads as "no stock here". Same rationale, same exception.

### Named Rules

**The Flat Rule.** Depth is a change of ground plus a rule. If a surface needs to feel raised, move
it up the `ground → bench → anvil → anvil-lit` stack. Never reach for a shadow, a glass blur, or a
gradient that is not the billet.

## Shapes

**Nothing is rounded.** `border-radius` is `0` everywhere without exception — buttons, panels,
inputs, badges, checkboxes, editors, menus. A grep for `rounded` across every component returns
nothing. The form language is struck and stamped, not moulded; a radius anywhere in this system is a
bug.

Borders carry all structure: 1px `scribe` for internal division, 2px `scribe-strong` for structural
boundaries, and `cherry` as the border of anything currently active or open.

The **billet** (`.ud-billet`) is the system's one gradient and its signature object: a heat-graded bar
running `white-heat → white-hot → white-heat → cherry → dull-red → cold` across its length, drawn
from the separate `--fg-bar-*` ramp. It appears as a 3px rule, a 40px footer mark, a hover reveal on
a tool row, and full-bleed behind the home hero.

### Named Rules

**The Separate Ramp Rule.** The billet is a graphic, not text. It is drawn from `--fg-bar-*` and
stamped with `--fg-stamp` / `--fg-stamp-ink`, which are fixed in both registers because the metal is
hot in both. Drawing it from the text-safe heat tokens breaks its gradient in one register; stamping
it with theme-following colours makes the legend vanish in the other.

## Components

### Buttons

- **Shape:** square (0 radius), `6px 10px` padding, `.ud-legend` type, optional 14px leading icon
- **Default:** `anvil` field, 1px `scribe-strong` border, `chalk` label; hover moves border and label
  to `cherry`
- **Primary:** solid `cherry` field with `on-cherry` label; hover is `brightness(1.15)`, not a second
  colour
- **Ghost:** transparent field, transparent border, `tempered` label rising to `chalk`
- **Danger:** reads as default at rest and only turns `crack` on hover — destruction announces itself
  on approach, not at rest
- **Disabled:** `opacity: 0.35` and `cursor: not-allowed`; the label never disappears
- **Focus:** global `2px solid white-heat` outline at `2px` offset. Never removed, never restyled

**The Named Button Rule.** A button is labelled by its children or by `aria-label`. There is no third
case, and the type enforces it: `ButtonProps` is a union, so a childless button without an
`aria-label` is a build error rather than a screen-reader announcement of "button".

### Panels

The primary working container, and the frame every tool is assembled from.

- **Corner style:** square. **Background:** `anvil`. **Border:** 1px `scribe-strong`, becoming
  `cherry` when the panel is a live drop target
- **Header:** `bench` field, `48px` minimum height, `.ud-legend` title with an optional faint
  "station" suffix, actions pushed right
- **Footer:** `bench` field, `32px` minimum height, `.ud-legend`, holds gauges and status
- **Shadow strategy:** none; see Elevation
- **Signature behaviour:** when a result lands, a 2px `cherry` bar draws across the top of the body
  (`.ud-draw`)

### Inputs and Fields

- **Style:** `anvil` field, 1px `scribe-strong` border, square, `.ud-force` type at `12px`
- **Focus / open:** border moves to `cherry`; the global white-heat outline still applies
- **Select:** custom, not native — a native `<select>` opens on pointer-down and dismisses on the
  pointer-up that follows, so hover-and-click in one motion makes it flash and vanish. The menu is a
  fixed-position list on `anvil` inside a `cherry` border, flipped above the trigger when there is no
  room below, capped in height so a long list scrolls inside itself rather than scrolling the page.
  Its label is a **sibling** associated by `htmlFor`, never a wrapper.
- **Toggle:** a 14px square that fills `cherry` with an `on-cherry` check when set; the real checkbox
  is `sr-only` inside the label
- **Disabled:** `Toggle` and `Select` dim to 40%, buttons to 35%. A disabled control must *look*
  disabled and must still be readable

### Status

A square colour mark plus a legend. **Four temperatures only**, and no fifth may be added: `idle`
(cold stock — nothing on the anvil yet), `ok` (rings true), `warn` (white heat), `error` (crack). The
mark takes `currentColor`, so the legend and the mark can never disagree about the reading.

### Stamped Action

A display-scale action struck into the billet, and the only control that lives on the bar: a solid
`stamp` block with a `stamp-ink` legend, or a 2px `stamp` outline. It sets in display caps at
`text-lg`/`text-xl`, not at legend size, because it is stamped into the metal rather than placed on
a surface. Never use it off the billet.

### Navigation

Sticky `56px` header on `ground`, closed by a 1px `scribe` rule. The wordmark is Title-role display
type beside a 24px logo. Tool navigation appears at `md` and above; below that it collapses, and the
tools remain reachable from the footer and the home grid. Language and theme controls are
`.ud-legend` ghost controls at the right, each with an 11-unit hit height.

### Tool Row

The signature component: the home page's tool directory, and deliberately **not** a card grid.

Each row is a full-width band with a hairline rule, a display-type name, a body-type tagline, and a
`.ud-legend` spec plate stating whether the tool does the one thing the visitor came for. On hover, a
3px billet wipes down the left edge (`scale-y-0` → `scale-y-1`, 300ms) — the metal coming up to heat
under the cursor.

An unbuilt tool renders as a `<div>` rather than an `<a>`, drops its name from `chalk` to `tempered`,
loses the heat bar and the hover ground, and carries a bordered "coming soon" legend instead of a
spec plate — the site does not describe what it has not built.

**The No Blanket Opacity Rule.** An unavailable row is dimmed by *changing its token*, never by
putting opacity on the container. A blanket `opacity` would drag the row's body copy below the
contrast floor along with everything else, which is how a disabled state becomes an accessibility
failure.

It once carried a leading `.ud-force` index numeral, until that numeral was found to be the tool's
position in the registry array — no rank, no sequence, no step. It was also the row's third competing
alignment rule, against a baseline-aligned name and a hardcoded nudge on the description.

### Editor

CodeMirror themed entirely through the site's custom properties, so both registers swap with no
remount and no second theme to maintain. Value types are coloured off the heat scale; a syntax error
is underlined in `crack` with a gutter mark. Always pass `theme="none"` — @uiw otherwise injects a
light theme with a white background that fights the token theme.

### The Billet

Not a component so much as the system's recurring object; see Shapes. Where it carries a legend, the
legend is `--fg-stamp` on the bar and the shed flecks (`.ud-shed`) are the same, both fixed across
registers.

## Do's and Don'ts

### Do:

- **Do** treat colour as temperature. If a new colour does not report a state, it does not belong.
- **Do** put every figure in `.ud-force` with `tabular-nums`.
- **Do** verify a new text token at 4.5:1 in *both* registers against *all four* grounds, not just the
  darkest. Small legend text is the usual casualty.
- **Do** move a surface up the `ground → bench → anvil → anvil-lit` stack when it needs to feel raised.
- **Do** give every icon-only control an `aria-label` beside its `title`. The type will refuse the
  build otherwise.
- **Do** self-host any new font, image, or script. `public/_headers` ships `default-src 'self'`, and
  an added origin is a route data could leave by.
- **Do** let the world recede on tool surfaces. Expression may never obscure the task, its state, or a
  familiar affordance.

### Don't:

- **Don't** add a `border-radius`, a drop shadow, glass, or a gradient that is not the billet.
- **Don't** read `--fg-shadow` as permission to add elevation. It is declared and unused.
- **Don't** put a kicker or eyebrow above a heading.
- **Don't** draw the billet from the text-safe heat tokens, or stamp onto it with theme-following
  colours. Use `--fg-bar-*` and `--fg-stamp*`.
- **Don't** rebuild the tool directory as a card grid.
- **Don't** reintroduce an index numeral on a list whose order carries no information.
- **Don't** scatter animation. The system has one authored motion idea — the strike — expressed as
  `.ud-strike` on arrival and a `cherry` bar when an operation lands (`.ud-draw`), with `.ud-shed` for
  the flecks that leave the bar. Everything else is a plain state transition, and all of it collapses
  under `prefers-reduced-motion`.
- **Don't** use a library that compiles code at runtime. The CSP omits `'unsafe-eval'`, which is why
  schema validation uses `@cfworker/json-schema` rather than ajv.
