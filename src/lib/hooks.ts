import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * State mirrored into localStorage so a refresh doesn't lose the user's work.
 * Reads happen after mount, never during render, so the server-rendered markup
 * and the first client render agree.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      /* storage disabled or corrupt — carry on with the default */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota exceeded or storage disabled — not worth interrupting the user */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

/** Trailing-edge debounce of a changing value. */
export function useDebounced<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/** Copy to clipboard with a short-lived "copied" acknowledgement. */
export function useCopy(resetAfter = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard API needs a secure context; fall back to a hidden textarea.
        const scratch = document.createElement('textarea');
        scratch.value = text;
        scratch.setAttribute('readonly', '');
        scratch.style.position = 'fixed';
        scratch.style.opacity = '0';
        document.body.appendChild(scratch);
        scratch.select();
        document.execCommand('copy');
        scratch.remove();
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
    },
    [resetAfter],
  );

  return { copy, copied };
}

/**
 * Save text to a file, entirely locally via a blob URL.
 *
 * The MIME type follows the extension rather than being fixed at JSON, so the
 * text tools do not hand the operating system a `.txt` file labelled as JSON.
 */
export function downloadText(text: string, filename: string) {
  const type = /\.(txt|md|csv)$/i.test(filename)
    ? 'text/plain;charset=utf-8'
    : /\.jwt$/i.test(filename)
      ? 'application/jwt'
      : 'application/json;charset=utf-8';
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Read a dropped or picked file as text — never uploaded, just read locally. */
export function readFileAsText(file: File): Promise<string> {
  return file.text();
}

/**
 * Drag-and-drop onto a panel. Returns props to spread and whether a file is
 * currently hovering, so the drop target can highlight itself.
 */
export function useFileDrop(onText: (text: string, filename: string) => void) {
  const [isOver, setIsOver] = useState(false);
  const depth = useRef(0);

  const handlers = {
    onDragEnter: (event: React.DragEvent) => {
      if (!event.dataTransfer.types.includes('Files')) return;
      event.preventDefault();
      depth.current++;
      setIsOver(true);
    },
    onDragOver: (event: React.DragEvent) => {
      if (event.dataTransfer.types.includes('Files')) event.preventDefault();
    },
    onDragLeave: () => {
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setIsOver(false);
    },
    onDrop: (event: React.DragEvent) => {
      const file = event.dataTransfer.files[0];
      depth.current = 0;
      setIsOver(false);
      if (!file) return;
      event.preventDefault();
      void readFileAsText(file).then((text) => onText(text, file.name));
    },
  };

  return { isOver, dropHandlers: handlers };
}

/** Run a callback on Cmd/Ctrl + key, anywhere on the page. */
export function useShortcut(key: string, callback: () => void) {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      event.preventDefault();
      saved.current();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key]);
}
