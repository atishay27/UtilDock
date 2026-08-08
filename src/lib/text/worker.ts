/// <reference lib="webworker" />
import { runOperation, type Request, type Response } from './ops';

/**
 * The text worker. Receives a request, runs it, posts the result back.
 * Requests are correlated by id so a stale reply from a superseded keystroke
 * can be discarded by the caller — the same contract as `json/worker.ts`.
 */

interface Envelope {
  id: number;
  request: Request;
}

self.addEventListener('message', (event: MessageEvent<Envelope>) => {
  const { id, request } = event.data;
  try {
    const response: Response = runOperation(request);
    (self as unknown as Worker).postMessage({ id, response });
  } catch (cause) {
    (self as unknown as Worker).postMessage({
      id,
      failure: cause instanceof Error ? cause.message : 'Unexpected error',
    });
  }
});
