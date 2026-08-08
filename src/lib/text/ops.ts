/**
 * The operation protocol shared between the UI and the text worker.
 *
 * The same arrangement as `json/ops.ts`, and for the same reason. Counting is
 * not free: `Intl.Segmenter` walks the whole document to find word and sentence
 * boundaries, and on a novel-length paste that is long enough to drop frames if
 * it runs between keystrokes on the main thread. Formatting has the same shape
 * — a dozen passes over the string, several of them regex.
 *
 * Keeping both behind this protocol also keeps the counting and transform code
 * out of the main-thread bundle entirely, which is the other half of what the
 * JSON tools get from theirs.
 */

import { countText, estimateDurations, type CountResult, type Script } from './count';
import { formatText, type ChangeCounts, type FormatOptions } from './format';

export type Request =
  | { op: 'count'; text: string; locale: string }
  | { op: 'format'; text: string; options: FormatOptions; locale: string };

export interface CountPayload extends CountResult {
  /** Seconds. Derived here so the UI never re-implements the rates. */
  readingSeconds: number;
  speakingSeconds: number;
}

export type Response =
  | { op: 'count'; ok: true; result: CountPayload }
  | { op: 'format'; ok: true; output: string; changes: ChangeCounts; unchanged: boolean };

export function runOperation(request: Request): Response {
  switch (request.op) {
    case 'count': {
      const result = countText(request.text, request.locale);
      const durations = estimateDurations(result.counts, result.script);
      return {
        op: 'count',
        ok: true,
        result: {
          ...result,
          readingSeconds: durations.reading,
          speakingSeconds: durations.speaking,
        },
      };
    }

    case 'format': {
      const { output, changes, unchanged } = formatText(
        request.text,
        request.options,
        request.locale,
      );
      return { op: 'format', ok: true, output, changes, unchanged };
    }
  }
}

/** Narrow a Response to the variant matching a given op. */
export type ResponseFor<O extends Request['op']> = Extract<Response, { op: O }>;

export type { ChangeCounts, FormatOptions, Script };
