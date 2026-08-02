import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';

/**
 * CodeMirror styling expressed entirely through the site's CSS custom
 * properties, so switching the site theme re-themes the editor with no
 * remount and no second theme object to keep in sync.
 */

export const editorTheme = EditorView.theme({
  '&': {
    color: 'var(--ud-text)',
    backgroundColor: 'transparent',
    fontSize: '13px',
    height: '100%',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.6',
    overflow: 'auto',
  },
  '.cm-content': { padding: '12px 0', caretColor: 'var(--ud-accent)' },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: 'var(--ud-faint)',
    border: 'none',
    borderRight: '1px solid var(--ud-line)',
    paddingRight: '2px',
  },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 8px 0 12px', minWidth: '2.5em' },
  '.cm-activeLine': { backgroundColor: 'color-mix(in oklab, var(--ud-surface-3) 45%, transparent)' },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: 'var(--ud-muted)',
  },
  '&.cm-focused': { outline: 'none' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'var(--ud-accent)', borderLeftWidth: '2px' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
    backgroundColor: 'color-mix(in oklab, var(--ud-accent) 28%, transparent)',
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'var(--ud-surface-3)',
    border: '1px solid var(--ud-line-strong)',
    color: 'var(--ud-muted)',
    borderRadius: '4px',
    padding: '0 6px',
    margin: '0 2px',
  },
  '.cm-tooltip': {
    backgroundColor: 'var(--ud-surface-2)',
    border: '1px solid var(--ud-line-strong)',
    borderRadius: '8px',
    color: 'var(--ud-text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    padding: '2px',
  },
  '.cm-tooltip .cm-diagnostic': { padding: '4px 8px', borderLeft: 'none' },
  '.cm-tooltip .cm-diagnostic-error': { borderLeft: '3px solid var(--ud-danger)' },
  '.cm-lintRange-error': {
    backgroundImage: 'none',
    borderBottom: '2px wavy var(--ud-danger)',
    backgroundColor: 'color-mix(in oklab, var(--ud-danger) 14%, transparent)',
  },
  '.cm-lintRange-warning': {
    backgroundImage: 'none',
    borderBottom: '2px wavy var(--ud-warning)',
  },
  // The placeholder is inert decoration, not text — keep the browser from
  // painting a selection over it when the document is empty.
  '.cm-placeholder': {
    color: 'var(--ud-faint)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  '.cm-searchMatch': {
    backgroundColor: 'color-mix(in oklab, var(--ud-warning) 30%, transparent)',
  },
});

const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: 'var(--ud-key)' },
  { tag: [tags.string, tags.special(tags.string)], color: 'var(--ud-string)' },
  { tag: tags.number, color: 'var(--ud-number)' },
  { tag: tags.bool, color: 'var(--ud-boolean)' },
  { tag: tags.null, color: 'var(--ud-null)' },
  { tag: tags.punctuation, color: 'var(--ud-muted)' },
  { tag: tags.brace, color: 'var(--ud-muted)' },
  { tag: tags.invalid, color: 'var(--ud-danger)' },
]);

export const editorHighlighting = syntaxHighlighting(highlightStyle);
