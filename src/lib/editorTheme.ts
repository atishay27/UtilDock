import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';

/**
 * The editor is the anvil face. Built entirely from the site's custom
 * properties, so light and dark swap with no remount and no second theme.
 */

export const editorTheme = EditorView.theme({
  '&': {
    color: 'var(--fg-chalk)',
    backgroundColor: 'transparent',
    fontSize: '13px',
    height: '100%',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.65',
    overflow: 'auto',
  },
  '.cm-content': { padding: '10px 0', caretColor: 'var(--fg-cherry)' },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: 'var(--fg-faint)',
    border: 'none',
    borderRight: '1px solid var(--fg-scribe)',
    fontVariantNumeric: 'tabular-nums',
  },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 10px 0 14px', minWidth: '2.5em' },
  '.cm-activeLine': { backgroundColor: 'color-mix(in srgb, var(--fg-cherry) 7%, transparent)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--fg-cherry)' },
  /* The active line marks where the cursor is, so it has no business being
     drawn when there is no cursor. On an untouched editor the placeholder is a
     three-line widget living inside line 1, which stretched this warm band
     across the whole of it — every tool's empty state opened looking like it
     had already flagged an error. */
  '&:not(.cm-focused) .cm-activeLine': { backgroundColor: 'transparent' },
  '&:not(.cm-focused) .cm-activeLineGutter': { color: 'var(--fg-faint)' },
  '&.cm-focused': { outline: 'none' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'var(--fg-cherry)', borderLeftWidth: '2px' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
    backgroundColor: 'color-mix(in srgb, var(--fg-heat) 26%, transparent)',
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'var(--fg-anvil-lit)',
    border: '1px solid var(--fg-scribe-strong)',
    color: 'var(--fg-temper)',
    borderRadius: '0',
    padding: '0 6px',
    margin: '0 3px',
  },
  '.cm-tooltip': {
    backgroundColor: 'var(--fg-bench)',
    border: '1px solid var(--fg-scribe-strong)',
    borderRadius: '0',
    color: 'var(--fg-chalk)',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    padding: '0',
  },
  '.cm-tooltip .cm-diagnostic': { padding: '6px 9px', borderLeft: 'none' },
  '.cm-tooltip .cm-diagnostic-error': { borderLeft: '2px solid var(--fg-fault)' },
  // A fault in the bar, marked where it runs.
  '.cm-lintRange-error': {
    backgroundImage: 'none',
    borderBottom: '2px solid var(--fg-fault)',
    backgroundColor: 'color-mix(in srgb, var(--fg-fault) 16%, transparent)',
  },
  '.cm-lintRange-warning': {
    backgroundImage: 'none',
    borderBottom: '2px dotted var(--fg-warn)',
  },
  '.cm-placeholder': {
    color: 'var(--fg-faint)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  '.cm-searchMatch': {
    backgroundColor: 'color-mix(in srgb, var(--fg-heat) 32%, transparent)',
  },
});

/**
 * The diff layer, for the comparator's two live editors.
 *
 * `@codemirror/merge` ships a base theme in fixed hex keyed on `&light` /
 * `&dark` classes this site never sets, so most of its rules never match and
 * the rest are the wrong colours. Restating them in tokens keeps the light
 * theme a token swap rather than a second stylesheet.
 *
 * Left reads as loss, right as gain — the same pairing the rest of the tool
 * uses, so a colour never means two things on one screen.
 */
export const mergeTheme = EditorView.theme({
  '&.cm-merge-a .cm-changedLine, .cm-deletedChunk': {
    backgroundColor: 'color-mix(in srgb, var(--fg-fault) 13%, transparent)',
  },
  '&.cm-merge-b .cm-changedLine, .cm-inlineChangedLine': {
    backgroundColor: 'color-mix(in srgb, var(--fg-sound) 13%, transparent)',
  },
  /* The exact characters that differ, underscored rather than filled: a second
     block of colour inside an already-tinted line reads as a different kind of
     change instead of a closer look at the same one. */
  '&.cm-merge-a .cm-changedText, .cm-deletedChunk .cm-deletedText': {
    background: 'linear-gradient(var(--fg-fault), var(--fg-fault)) bottom/100% 2px no-repeat',
  },
  '&.cm-merge-b .cm-changedText': {
    background: 'linear-gradient(var(--fg-sound), var(--fg-sound)) bottom/100% 2px no-repeat',
  },
  '&.cm-merge-b .cm-deletedText': {
    backgroundColor: 'color-mix(in srgb, var(--fg-fault) 22%, transparent)',
  },

  '.cm-changeGutter': { width: '3px', paddingLeft: '1px' },
  '&.cm-merge-a .cm-changedLineGutter, .cm-deletedLineGutter': {
    background: 'var(--fg-fault)',
  },
  '&.cm-merge-b .cm-changedLineGutter': { background: 'var(--fg-sound)' },
  '.cm-inlineChangedLineGutter': { background: 'var(--fg-warn)' },

  /* Folded identical lines. The package draws a pair of `⦚` glyphs around the
     count; this replaces them with a rule that runs the width of the row, so
     the fold reads as a seam in the document rather than as punctuation. */
  '.cm-collapsedLines': {
    padding: '3px 10px',
    background: 'var(--fg-bench)',
    borderBlock: '1px solid var(--fg-scribe)',
    color: 'var(--fg-faint)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.6875rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  '.cm-collapsedLines:hover': { color: 'var(--fg-chalk)', background: 'var(--fg-anvil-lit)' },
  '.cm-collapsedLines:before, .cm-collapsedLines:after': { content: '""', margin: '0' },

  /* Accept / reject on an inline chunk. */
  '.cm-deletedChunk .cm-chunkButtons': { insetInlineEnd: '6px' },
  '.cm-deletedChunk button': {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.6875rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: '0',
    padding: '1px 7px',
    margin: '0 0 0 4px',
    border: '1px solid var(--fg-scribe-strong)',
    cursor: 'pointer',
  },
  '.cm-deletedChunk button[name=accept]': {
    background: 'transparent',
    color: 'var(--fg-fault)',
  },
  '.cm-deletedChunk button[name=reject]': {
    background: 'transparent',
    color: 'var(--fg-temper)',
  },
  '.cm-deletedChunk button:hover': { background: 'var(--fg-anvil-lit)' },
});

/* Value types read off the heat scale: keys at white heat, the rest cooler. */
const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: 'var(--fg-key)' },
  { tag: [tags.string, tags.special(tags.string)], color: 'var(--fg-string)' },
  { tag: tags.number, color: 'var(--fg-number)' },
  { tag: tags.bool, color: 'var(--fg-boolean)' },
  { tag: tags.null, color: 'var(--fg-null)' },
  { tag: tags.punctuation, color: 'var(--fg-temper)' },
  { tag: tags.brace, color: 'var(--fg-temper)' },
  { tag: tags.invalid, color: 'var(--fg-fault)' },
]);

export const editorHighlighting = syntaxHighlighting(highlightStyle);
