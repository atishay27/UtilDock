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
