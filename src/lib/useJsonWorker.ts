import { useCallback, useEffect, useRef } from 'react';
import type { Request, Response, ResponseFor } from './json/ops';
import { trackEvent } from './analytics';

/**
 * Lazily starts the JSON worker and exposes a promise-based `run`.
 *
 * Every call gets an id; only the newest reply for a given op is delivered, so
 * results from superseded keystrokes are dropped instead of flickering into the
 * UI out of order. The worker is terminated on unmount.
 *
 * Passing `toolId` also makes this the place a tool reports that it was used.
 * Every tool routes its work through here, so a request reaching the worker is
 * the one honest definition of use: something was in the editor and we did work
 * on it. It fires once per mount — the alternative is an event per keystroke,
 * which measures typing speed rather than usage and would swamp the property.
 * The event carries the tool's id and nothing else; see `trackEvent`.
 */
export function useJsonWorker(toolId?: string) {
  const workerRef = useRef<Worker | null>(null);
  const nextId = useRef(0);
  const pending = useRef(new Map<number, (response: Response) => void>());
  const latestByOp = useRef(new Map<string, number>());
  const reported = useRef(false);

  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;

    const worker = new Worker(new URL('./json/worker.ts', import.meta.url), { type: 'module' });
    worker.addEventListener(
      'message',
      (event: MessageEvent<{ id: number; response?: Response; failure?: string }>) => {
        const { id, response } = event.data;
        const resolve = pending.current.get(id);
        pending.current.delete(id);
        if (resolve && response) resolve(response);
      },
    );
    workerRef.current = worker;
    return worker;
  }, []);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      pending.current.clear();
    },
    [],
  );

  /**
   * Resolves with the operation result, or never resolves if a newer request
   * for the same op supersedes this one.
   */
  const run = useCallback(
    <R extends Request>(request: R): Promise<ResponseFor<R['op']>> => {
      const worker = ensureWorker();

      if (toolId && !reported.current) {
        reported.current = true;
        trackEvent('tool_used', { tool_id: toolId });
      }

      const id = ++nextId.current;
      latestByOp.current.set(request.op, id);

      return new Promise<ResponseFor<R['op']>>((resolve) => {
        pending.current.set(id, (response) => {
          if (latestByOp.current.get(request.op) !== id) return; // superseded
          resolve(response as ResponseFor<R['op']>);
        });
        worker.postMessage({ id, request });
      });
    },
    [ensureWorker, toolId],
  );

  return run;
}
