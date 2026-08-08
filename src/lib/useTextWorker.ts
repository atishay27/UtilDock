import { useCallback, useEffect, useRef } from 'react';
import type { Request, Response, ResponseFor } from './text/ops';
import { trackEvent } from './analytics';

/**
 * Lazily starts the text worker and exposes a promise-based `run`.
 *
 * A deliberate copy of `useJsonWorker` rather than a shared generic. The two
 * hooks are structurally identical today, but they own different protocols and
 * different worker URLs, and `new Worker(new URL(...))` has to be a literal for
 * the bundler to see the dependency at all — a parameterised version would
 * silently stop emitting the worker chunk. Twenty lines of duplication is the
 * cheaper side of that trade.
 *
 * `toolId` makes this the place a text tool reports that it was used, on the
 * same terms as the JSON tools: once per mount, when work actually reaches the
 * worker, carrying the tool's id and nothing else. Never the text.
 */
export function useTextWorker(toolId?: string) {
  const workerRef = useRef<Worker | null>(null);
  const nextId = useRef(0);
  const pending = useRef(new Map<number, (response: Response) => void>());
  const latestByOp = useRef(new Map<string, number>());
  const reported = useRef(false);

  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;

    const worker = new Worker(new URL('./text/worker.ts', import.meta.url), { type: 'module' });
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
