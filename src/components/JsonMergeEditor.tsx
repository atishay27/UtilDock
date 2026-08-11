import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { Compartment, Prec } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { MergeView, goToNextChunk, goToPreviousChunk } from '@codemirror/merge';
import { json as jsonLanguage } from '@codemirror/lang-json';
import { linter, lintGutter, type Diagnostic } from '@codemirror/lint';
import { basicSetup } from '@uiw/react-codemirror';

import { editorHighlighting, editorTheme, mergeTheme } from '../lib/editorTheme';
import { ICONS } from '../lib/icons';
import type { Marker } from './JsonEditor';

/**
 * Two live JSON editors with the difference drawn between them. Both sides stay
 * editable while the comparison is on screen: `@codemirror/merge` re-diffs on
 * every keystroke, aligns the documents with spacers, and puts a control in the
 * seam that copies a chunk either way.
 *
 * React does not own the documents. The MergeView is built once and kept —
 * rebuilding it per keystroke would discard the cursor, selection, scroll
 * position, undo history and fold state. Text leaves through `onChange` and
 * returns through a one-way sync that fires only on a genuine disagreement.
 */

export interface MergeHandle {
  /** Move the cursor to the next / previous changed chunk. */
  step: (direction: 1 | -1) => void;
  focus: () => void;
}

interface JsonMergeEditorProps {
  left: string;
  right: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
  leftLabel: string;
  rightLabel: string;
  leftPlaceholder: string;
  rightPlaceholder: string;
  leftMarkers: Marker[];
  rightMarkers: Marker[];
  /** Fold runs of identical lines down to a clickable summary. */
  collapseIdentical: boolean;
  /** Titles for the two seam controls, in the direction each one copies. */
  applyIntoRight: string;
  applyIntoLeft: string;
  handleRef?: React.Ref<MergeHandle>;
}

function toDiagnostics(markers: Marker[]): Diagnostic[] {
  return markers.map((marker) => ({
    from: marker.from,
    to: Math.max(marker.to, marker.from + 1),
    severity: marker.severity ?? 'error',
    message: marker.message,
  }));
}

/**
 * Step to the next / previous difference, on the keys VS Code uses. `Prec.high`
 * because the default keymap owns Alt-ArrowUp/Down for moving a line, and
 * walking the diff must not reorder the document.
 */
const chunkKeys = Prec.high(
  keymap.of([
    { key: 'F7', run: goToNextChunk },
    { key: 'Shift-F7', run: goToPreviousChunk },
  ]),
);

/**
 * Lines wrap, and that is not a preference. Each pane is half the frame and
 * `.cm-mergeViewEditor` clips its overflow, so an unwrapped long line would be
 * unreachable — the horizontal scrollbar sits at the foot of the *content*,
 * since the merge view makes each editor as tall as its document. Alignment
 * survives wrapping: spacers are measured from rendered heights, not lines.
 */
const wrapping = EditorView.lineWrapping;

function setup() {
  return basicSetup({
    lineNumbers: true,
    foldGutter: true,
    highlightActiveLine: true,
    highlightActiveLineGutter: true,
    bracketMatching: true,
    closeBrackets: true,
    autocompletion: false,
    highlightSelectionMatches: false,
    searchKeymap: true,
  });
}

/** Replace a document only when it actually differs — see the note above. */
function syncDoc(view: EditorView, text: string) {
  const current = view.state.doc.toString();
  if (current === text) return;
  view.dispatch({
    changes: { from: 0, to: current.length, insert: text },
    /* An external rewrite — Tidy, Swap, Sample — is not something to undo one
       character at a time, and the caret has no meaningful home in a document
       that was just replaced wholesale. */
    selection: { anchor: Math.min(view.state.selection.main.anchor, text.length) },
  });
}

export function JsonMergeEditor({
  left,
  right,
  onLeftChange,
  onRightChange,
  leftLabel,
  rightLabel,
  leftPlaceholder,
  rightPlaceholder,
  leftMarkers,
  rightMarkers,
  collapseIdentical,
  applyIntoRight,
  applyIntoLeft,
  handleRef,
}: JsonMergeEditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const merge = useRef<MergeView | null>(null);

  /* The listeners are installed once and live as long as the editor, so they
     read their callbacks through refs rather than closing over the first
     render's versions. */
  const onLeft = useRef(onLeftChange);
  const onRight = useRef(onRightChange);
  onLeft.current = onLeftChange;
  onRight.current = onRightChange;

  /* Read at render time by the seam controls, which the merge view builds
     itself and so cannot close over a prop. */
  const labels = useRef({ right: applyIntoRight, left: applyIntoLeft });
  labels.current = { right: applyIntoRight, left: applyIntoLeft };

  const lintLeft = useRef(new Compartment());
  const lintRight = useRef(new Compartment());

  /* Everything the first render needs, read once. Later changes arrive through
     the effects below; putting them in the dependency list would rebuild the
     editor and take the visitor's cursor with it. */
  const initial = useRef({ left, right, collapseIdentical });

  /**
   * Copy one changed block from one document into the other.
   *
   * The package's revert control runs one way only — `a-to-b` or `b-to-a`, one
   * arrow. Neither document here is the authority, so both directions are on
   * offer and the edit is ours. Bounds are the package's: a chunk's `to` is one
   * past the last line, so the copy drops that position and restores the line
   * break only when there was a line to end.
   */
  const applyChunk = useCallback((index: number, toLeft: boolean) => {
    const view = merge.current;
    const chunk = view?.chunks[index];
    if (!view || !chunk) return;

    const [source, dest, srcFrom, srcTo, destFrom, destTo] = toLeft
      ? ([view.b, view.a, chunk.fromB, chunk.toB, chunk.fromA, chunk.toA] as const)
      : ([view.a, view.b, chunk.fromA, chunk.toA, chunk.fromB, chunk.toB] as const);

    let insert = source.state.sliceDoc(srcFrom, Math.max(srcFrom, srcTo - 1));
    if (srcFrom !== srcTo && destTo <= dest.state.doc.length) insert += source.state.lineBreak;

    dest.dispatch({
      changes: { from: destFrom, to: Math.min(dest.state.doc.length, destTo), insert },
      userEvent: 'revert',
    });
  }, []);

  useEffect(() => {
    const parent = host.current;
    if (!parent) return;

    const view = new MergeView({
      parent,
      orientation: 'a-b',
      /* This only asks the package for the column and its per-chunk
         positioning. The buttons inside it are ours, and so is the edit they
         make — see `applyChunk`. */
      revertControls: 'a-to-b',
      renderRevertControl: () => {
        const pair = document.createElement('div');
        pair.className = 'ud-apply';

        for (const toLeft of [true, false]) {
          const button = document.createElement('button');
          button.type = 'button';
          const label = toLeft ? labels.current.left : labels.current.right;
          button.setAttribute('aria-label', label);
          button.setAttribute('title', label);
          button.dataset.toLeft = String(toLeft);
          /* Drawn from the site's own icon set rather than the package's ⇝,
             so the seam controls carry the same stroke and weight as every
             other control on the page. */
          button.innerHTML =
            `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"` +
            ` stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"` +
            `${toLeft ? ' style="transform:scaleX(-1)"' : ''}>${ICONS['arrow-right']}</svg>`;
          pair.append(button);
        }

        /* Stops here rather than bubbling to the package's own handler, which
           would then run its single-direction revert on top of ours. */
        pair.addEventListener('mousedown', (event) => {
          const button = (event.target as HTMLElement).closest('button');
          if (!button) return;
          event.preventDefault();
          event.stopPropagation();
          applyChunk(Number(pair.dataset.chunk), button.dataset.toLeft === 'true');
        });

        return pair;
      },
      highlightChanges: true,
      gutter: true,
      collapseUnchanged: initial.current.collapseIdentical ? { margin: 2, minSize: 4 } : undefined,
      /* A pair of multi-megabyte documents must not lock the main thread while
         someone is typing into them. Past these bounds the package falls back
         to a coarser diff, which is the right trade: a slightly blockier
         comparison beats a frozen tab. */
      diffConfig: { scanLimit: 4000, timeout: 500 },
      a: {
        doc: initial.current.left,
        extensions: [
          setup(),
          chunkKeys,
          wrapping,
          jsonLanguage(),
          editorTheme,
          editorHighlighting,
          mergeTheme,
          lintGutter(),
          lintLeft.current.of(linter(() => [], { delay: 0 })),
          placeholder(leftPlaceholder),
          EditorView.contentAttributes.of({ 'aria-label': leftLabel }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onLeft.current(update.state.doc.toString());
          }),
        ],
      },
      b: {
        doc: initial.current.right,
        extensions: [
          setup(),
          chunkKeys,
          wrapping,
          jsonLanguage(),
          editorTheme,
          editorHighlighting,
          mergeTheme,
          lintGutter(),
          lintRight.current.of(linter(() => [], { delay: 0 })),
          placeholder(rightPlaceholder),
          EditorView.contentAttributes.of({ 'aria-label': rightLabel }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onRight.current(update.state.doc.toString());
          }),
        ],
      },
    });

    merge.current = view;
    return () => {
      view.destroy();
      merge.current = null;
    };
    // Built once, on purpose. See the note on `initial`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (merge.current) syncDoc(merge.current.a, left);
  }, [left]);

  useEffect(() => {
    if (merge.current) syncDoc(merge.current.b, right);
  }, [right]);

  useEffect(() => {
    const view = merge.current;
    if (!view) return;
    view.a.dispatch({
      effects: lintLeft.current.reconfigure(
        linter(() => toDiagnostics(leftMarkers), { delay: 0 }),
      ),
    });
  }, [leftMarkers]);

  useEffect(() => {
    const view = merge.current;
    if (!view) return;
    view.b.dispatch({
      effects: lintRight.current.reconfigure(
        linter(() => toDiagnostics(rightMarkers), { delay: 0 }),
      ),
    });
  }, [rightMarkers]);

  useEffect(() => {
    merge.current?.reconfigure({
      collapseUnchanged: collapseIdentical ? { margin: 2, minSize: 4 } : undefined,
    });
  }, [collapseIdentical]);

  useImperativeHandle(
    handleRef,
    (): MergeHandle => ({
      step: (direction) => {
        const view = merge.current;
        if (!view) return;
        /* Navigation drives whichever side the visitor was last in, so
           stepping never yanks the focus across the seam. */
        const target = view.b.hasFocus ? view.b : view.a;
        target.focus();
        (direction === 1 ? goToNextChunk : goToPreviousChunk)({
          state: target.state,
          dispatch: (transaction) => target.dispatch(transaction),
        });
      },
      focus: () => merge.current?.a.focus(),
    }),
    [],
  );

  return <div ref={host} className="ud-merge h-full" />;
}
