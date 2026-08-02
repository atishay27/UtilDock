/**
 * Small, dependency-free helpers shared by the UI and the worker.
 *
 * The actual parser lives in ./parse, which pulls in a second JSON parser for
 * error positions; keeping these here means components can import them without
 * dragging that into the main-thread bundle.
 */

export interface JsonError {
  message: string;
  /** 0-based character offset into the source, when we could determine one. */
  offset: number | null;
  /** 1-based. */
  line: number;
  /** 1-based. */
  column: number;
}

export interface JsonStats {
  keys: number;
  values: number;
  arrays: number;
  objects: number;
  depth: number;
}

/** Convert a character offset into a 1-based line/column pair. */
export function offsetToPosition(text: string, offset: number): { line: number; column: number } {
  const clamped = Math.max(0, Math.min(offset, text.length));
  let line = 1;
  let lineStart = 0;
  for (let i = 0; i < clamped; i++) {
    if (text.charCodeAt(i) === 10 /* \n */) {
      line++;
      lineStart = i + 1;
    }
  }
  return { line, column: clamped - lineStart + 1 };
}

/** Inverse of offsetToPosition, used to place editor markers. */
export function positionToOffset(text: string, line: number, column: number): number {
  let offset = 0;
  for (let current = 1; current < line; current++) {
    const next = text.indexOf('\n', offset);
    if (next === -1) return text.length;
    offset = next + 1;
  }
  return Math.min(offset + column - 1, text.length);
}

/** Human-readable size, used in the tool status bars. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
