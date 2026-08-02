import { useMemo } from 'react';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { json as jsonLanguage } from '@codemirror/lang-json';
import { linter, lintGutter, type Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';

import { editorHighlighting, editorTheme } from '../lib/editorTheme';

/** Stable identity so an editor without markers doesn't rebuild its extensions. */
const NO_MARKERS: Marker[] = [];

export interface Marker {
  /** Character offsets into the document. */
  from: number;
  to: number;
  message: string;
  severity?: 'error' | 'warning' | 'info';
}

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  markers?: Marker[];
  placeholder?: string;
  readOnly?: boolean;
  wrap?: boolean;
  /** Accessible name — every editor on a page needs a distinct one. */
  label: string;
  className?: string;
  editorRef?: React.Ref<ReactCodeMirrorRef>;
}

export function JsonEditor({
  value,
  onChange,
  markers = NO_MARKERS,
  placeholder = '',
  readOnly = false,
  wrap = false,
  label,
  className = '',
  editorRef,
}: JsonEditorProps) {
  const extensions = useMemo(() => {
    const diagnostics: Diagnostic[] = markers.map((marker) => ({
      from: marker.from,
      to: Math.max(marker.to, marker.from + 1),
      severity: marker.severity ?? 'error',
      message: marker.message,
    }));

    const list = [
      jsonLanguage(),
      editorTheme,
      editorHighlighting,
      lintGutter(),
      // The diagnostics are computed outside the editor (in the worker), so the
      // linter just replays whatever the tool handed us.
      linter(() => diagnostics, { delay: 0 }),
      EditorView.contentAttributes.of({ 'aria-label': label }),
    ];
    if (wrap) list.push(EditorView.lineWrapping);
    return list;
  }, [markers, wrap, label]);

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      extensions={extensions}
      // "none" stops @uiw from injecting its own light theme, which would
      // otherwise paint a white editor background under our token-based theme.
      theme="none"
      className={`ud-editor h-full ${className}`}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: !readOnly,
        highlightActiveLineGutter: !readOnly,
        bracketMatching: true,
        closeBrackets: !readOnly,
        autocompletion: false,
        highlightSelectionMatches: false,
        searchKeymap: true,
      }}
    />
  );
}
