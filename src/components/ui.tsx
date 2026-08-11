import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';
import type { IconKey } from '../lib/icons';
import { useCopy } from '../lib/hooks';

/**
 * True for a beat each time `key` changes. Skipped on first render so arriving
 * at a page with restored work does not fake an operation that never happened.
 */
function useStrike(key: string | number | undefined, duration = 720) {
  const [struck, setStruck] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    if (key === undefined) return;
    if (!seen.current) {
      seen.current = true;
      return;
    }
    setStruck(true);
    const timer = setTimeout(() => setStruck(false), duration);
    return () => clearTimeout(timer);
  }, [key, duration]);

  return struck;
}

/** Shop controls: square corners, engraved legends, tabular figures. */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconKey;
  variant?: 'default' | 'primary' | 'ghost' | 'danger';
  children?: ReactNode;
}

export function Button({
  icon,
  variant = 'default',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const variants = {
    default:
      'border border-scribe-strong bg-anvil text-chalk hover:border-cherry hover:text-cherry',
    primary: 'border border-cherry bg-cherry text-on-cherry hover:brightness-115',
    ghost: 'border border-transparent text-temper hover:text-chalk',
    danger: 'border border-scribe-strong bg-anvil text-temper hover:border-fault hover:text-fault',
  };

  return (
    <button
      type="button"
      className={`ud-legend inline-flex items-center gap-1.5 px-2.5 py-1.5 whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={14} strokeWidth={2} />}
      {children}
    </button>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Visible text beside the control. Pass `''` and an `aria-label` to hide it. */
  label: string;
}

/** One `<option>` child, read off at render time. */
interface OptionItem {
  value: string;
  text: string;
  disabled: boolean;
}

function readOptions(children: ReactNode): OptionItem[] {
  return Children.toArray(children)
    .filter((child): child is ReactElement<HTMLOptionElement & { children?: ReactNode }> =>
      isValidElement(child) && child.type === 'option',
    )
    .map((child) => {
      const props = child.props as { value?: string | number; children?: ReactNode; disabled?: boolean };
      return {
        value: String(props.value ?? ''),
        text: Children.toArray(props.children).join(''),
        disabled: Boolean(props.disabled),
      };
    });
}

/**
 * How long after opening a click on the trigger is ignored — the reason this
 * dropdown is custom at all. A native `<select>` opens on pointer-down and
 * dismisses on the pointer-up that follows, so hovering and clicking in one
 * motion makes it flash and vanish, and the popup is browser chrome no handler
 * can reach.
 *
 * Here the release does nothing. The window guards against the second event of
 * a fast double-fire and against a press-drag-release that ends on the trigger.
 * 400ms is longer than any accidental click, shorter than a deliberate close.
 */
const ACCIDENTAL_CLICK_MS = 400;

/**
 * A labelled `<select>`.
 *
 * The label is a **sibling** associated by `htmlFor`, never a wrapper. A
 * control nested inside its own `<label>` is activated twice when the pointer
 * lands on the control itself — once directly, once forwarded by the label —
 * which opens the dropdown and closes it in the same frame.
 *
 * `Toggle` and `FileButton` still wrap their inputs, correctly: both are
 * `sr-only`, so the pointer never lands on the control and the second dispatch
 * has nothing to hit.
 */
export function Select({
  label,
  className = '',
  children,
  id,
  value,
  onChange,
  disabled,
  'aria-label': ariaLabel,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listId = `${selectId}-list`;

  const options = readOptions(children);
  const current = options.find((option) => option.value === String(value ?? ''));

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rect, setRect] = useState<{
    /** Set when the menu hangs below the trigger. */
    top?: number;
    /** Set instead when it is flipped above — distance from the viewport foot. */
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openedAt = useRef(0);
  const typeahead = useRef({ buffer: '', at: 0 });

  /**
   * Where the menu goes, measured fresh each time: below the trigger when there
   * is room, flipped above when there is not. The height is capped to the space
   * available so a thirteen-option list scrolls inside itself, not the page.
   */
  const place = useCallback(() => {
    const node = triggerRef.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const GAP = 2;
    const MARGIN = 12;
    const below = window.innerHeight - r.bottom - MARGIN;
    const above = r.top - MARGIN;
    const dropDown = below >= 180 || below >= above;

    setRect({
      ...(dropDown
        ? { top: r.bottom + GAP }
        : { bottom: window.innerHeight - r.top + GAP }),
      left: r.left,
      width: r.width,
      maxHeight: Math.max(120, Math.min(256, dropDown ? below : above)),
    });
  }, []);

  const openMenu = useCallback(() => {
    if (disabled) return;
    place();
    openedAt.current = Date.now();
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === String(value ?? ''))));
    setOpen(true);
  }, [disabled, place, options, value]);

  const closeMenu = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const choose = useCallback(
    (option: OptionItem) => {
      if (option.disabled) return;
      closeMenu();
      // Call sites are written against a real <select>, so the handler still
      // receives something shaped like a change event.
      onChange?.({
        target: { value: option.value },
        currentTarget: { value: option.value },
      } as unknown as React.ChangeEvent<HTMLSelectElement>);
    },
    [closeMenu, onChange],
  );

  /* Dismiss on anything that means "I am doing something else now". */
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      closeMenu(false);
    };
    /**
     * Capture phase, so a fixed-position menu tracks its trigger through a
     * scroll in any container. The first line excludes the menu's own
     * scrolling, which is the user reading it rather than the page moving.
     */
    const onScroll = (event: Event) => {
      if (listRef.current?.contains(event.target as Node)) return;
      const r = triggerRef.current?.getBoundingClientRect();
      // Follow the trigger; only give up once it has left the viewport.
      if (!r || r.bottom < 0 || r.top > window.innerHeight) {
        closeMenu(false);
        return;
      }
      place();
    };
    const onResize = () => place();

    document.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, closeMenu, place]);

  /* Keep the keyboard highlight inside the scroll port. With thirteen options
     and a capped height, arrowing down otherwise walks the highlight out of
     sight and the list sits still. */
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(options.length - 1, index + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
    } else if (event.key.length === 1) {
      // Typeahead, the one native behaviour people miss most when a select is
      // replaced: "t" jumps to Title Case.
      const now = Date.now();
      const buffer = now - typeahead.current.at > 700 ? event.key : typeahead.current.buffer + event.key;
      typeahead.current = { buffer, at: now };
      const found = options.findIndex((o) => o.text.toLowerCase().startsWith(buffer.toLowerCase()));
      if (found >= 0) setActiveIndex(found);
    }
  };

  return (
    /* Wraps rather than overflows: in a narrow column — the formatter's 15rem
       options panel, in a language whose words are longer than English's —
       the label drops above the control instead of pushing it out of the
       panel. Russian "Сортировка / Не сортировать" was 252px in a 238px box. */
    <span
      className={`ud-legend inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 ${
        disabled ? 'opacity-40' : ''
      }`}
    >
      {label && (
        <label htmlFor={selectId} className={disabled ? '' : 'cursor-pointer'}>
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        /* Without this a screen reader hears the menu open and then nothing as
           the arrow keys move through it — the highlight was visual only. */
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        onPointerDown={(event) => {
          // Open on press. The release deliberately does nothing — that is the
          // accidental-click fix. Closing again needs a fresh press, and even
          // then not within the guard window.
          if (event.button !== 0) return;
          event.preventDefault();
          if (!open) openMenu();
          else if (Date.now() - openedAt.current > ACCIDENTAL_CLICK_MS) closeMenu();
        }}
        onKeyDown={onTriggerKeyDown}
        className={`ud-force inline-flex max-w-full min-w-0 items-center gap-1.5 border bg-anvil px-2 py-1.5 text-xs text-chalk transition-colors disabled:cursor-not-allowed ${
          open ? 'border-cherry' : 'border-scribe-strong enabled:hover:border-cherry'
        } ${className}`}
      >
        <span className="truncate">{current?.text ?? ''}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={12} className="shrink-0 text-faint" />
      </button>

      {/* Portalled because every Panel is `overflow-hidden`, which would clip a
          menu rendered inside a panel header. */}
      {open &&
        rect &&
        createPortal(
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel ?? label}
            style={{
              top: rect.top,
              bottom: rect.bottom,
              left: rect.left,
              minWidth: rect.width,
              maxHeight: rect.maxHeight,
            }}
            className="ud-legend fixed z-50 overflow-y-auto overscroll-contain border border-cherry bg-anvil py-1"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={option.value === String(value ?? '')}
                onPointerUp={() => choose(option)}
                onPointerEnter={() => setActiveIndex(index)}
                className={`cursor-pointer px-3 py-1.5 whitespace-nowrap transition-colors ${
                  option.disabled
                    ? 'cursor-not-allowed text-faint'
                    : index === activeIndex
                      ? 'bg-cherry text-on-cherry'
                      : 'text-chalk'
                }`}
              >
                {option.text}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </span>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  title?: string;
  disabled?: boolean;
  /**
   * Merged onto the label, so a caller in a narrow column can pass `min-w-0`
   * and let the text wrap. The default `whitespace-nowrap` suits a panel header
   * but forces a horizontal scrollbar in a fixed-width list.
   */
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  children,
  title,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <label
      className={`ud-legend inline-flex items-center gap-2 whitespace-nowrap transition-colors select-none ${
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:text-chalk'
      } ${className}`}
      title={title}
    >
      <span
        className={`grid size-3.5 shrink-0 place-items-center border transition-colors ${
          checked ? 'border-cherry bg-cherry' : 'border-scribe-strong'
        }`}
      >
        {checked && <Icon name="check" size={10} strokeWidth={3} className="text-on-cherry" />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

interface PanelProps {
  title: ReactNode;
  /** Small engraved word beside the title — which end of the process this is. */
  station?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
  dropHandlers?: Partial<Record<string, unknown>>;
  /** Change this when an operation lands; the panel takes the blow. */
  strikeKey?: string | number;
  /** Overlay shown while a file is dragged over the panel. */
  dropLabel?: string;
  /**
   * Share row tracks with sibling panels so headers, bodies and footers align
   * even when one panel's controls wrap. Requires the parent to declare
   * `lg:grid-rows-[auto_minmax(0,1fr)_auto]`.
   */
  aligned?: boolean;
}

export function Panel({
  title,
  station,
  actions,
  footer,
  children,
  className = '',
  highlighted = false,
  dropHandlers,
  strikeKey,
  dropLabel,
  aligned = false,
}: PanelProps) {
  const struck = useStrike(strikeKey);

  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden border transition-colors ${
        aligned ? 'lg:grid lg:grid-rows-subgrid lg:row-span-3' : ''
      } ${highlighted ? 'border-cherry' : 'border-scribe-strong'} bg-anvil ${className}`}
      {...dropHandlers}
    >
      {/* min-h-12 is the height a header reaches once it holds a button, which
          most do — without the floor, a panel whose only control is a checkbox
          sits 8px shorter than its neighbour and their bodies misalign. Panels
          using `aligned` get this from the subgrid; the validator cannot, since
          its right column stacks two panels of its own. */}
      <header className="flex min-h-12 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-scribe bg-bench px-3 py-2">
        <h2 className="ud-legend flex items-baseline gap-2 text-chalk">
          {title}
          {station && <span className="text-faint">{station}</span>}
        </h2>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">{actions}</div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* The blow: a bar of heat runs across the panel when a result lands. */}
        {struck && (
          <span
            className="ud-draw pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-cherry"
            aria-hidden="true"
          />
        )}
        {children}
        {highlighted && dropLabel && (
          <div className="ud-legend pointer-events-none absolute inset-0 grid place-items-center bg-ground/85 text-cherry">
            {dropLabel}
          </div>
        )}
      </div>

      {footer && (
        <footer className="ud-legend flex min-h-8 shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-t border-scribe bg-bench px-3 py-1.5">
          {footer}
        </footer>
      )}
    </section>
  );
}

interface StatusProps {
  tone: 'ok' | 'error' | 'idle' | 'warn';
  children: ReactNode;
}

/** State is a temperature: cold stock, working heat, or a fault in the bar. */
export function Status({ tone, children }: StatusProps) {
  const tones = {
    ok: 'text-sound',
    error: 'text-fault',
    warn: 'text-warn',
    idle: 'text-faint',
  };
  const marks = {
    ok: 'bg-sound',
    error: 'bg-fault',
    warn: 'bg-warn',
    idle: 'bg-cold',
  };
  return (
    <span className={`inline-flex items-center gap-2 ${tones[tone]}`}>
      <span className={`size-1.5 shrink-0 ${marks[tone]}`} />
      {children}
    </span>
  );
}

/**
 * A plain textarea for prose. The text tools deliberately avoid `JsonEditor`:
 * CodeMirror's JSON mode would flag every apostrophe as an unterminated string,
 * and a textarea gives prose the browser's own spellcheck and native selection.
 */
export function PlainEditor({
  value,
  onChange,
  label,
  placeholder,
  readOnly = false,
  spellCheck = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  spellCheck?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      readOnly={readOnly}
      aria-label={label}
      placeholder={placeholder}
      spellCheck={spellCheck}
      className="h-full w-full resize-none border-0 bg-transparent p-3 font-sans text-sm leading-[1.7] text-chalk placeholder:text-cold focus:outline-none"
    />
  );
}

/**
 * One counted figure, sized to be read across the room. `tabular-nums` is
 * load-bearing: without it a count ticking from 199 to 200 shifts the whole row
 * sideways as someone types.
 */
export function Metric({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="border-b border-scribe px-3 py-2.5">
      <div
        className={`ud-force tabular-nums ${
          emphasis ? 'text-2xl leading-none text-cherry' : 'text-xl leading-none text-chalk'
        }`}
      >
        {value}
      </div>
      <div className="ud-legend mt-1.5 text-faint">{label}</div>
    </div>
  );
}

/** A registered measurement: engraved label, tabular value. */
export function Gauge({ label, value }: { label: string; value: ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-faint">{label}</span>
      <span className="ud-force text-xs text-chalk">{value}</span>
    </span>
  );
}

export function FileButton({
  onText,
  label,
  title,
}: {
  onText: (text: string, filename: string) => void;
  label: string;
  title: string;
}) {
  return (
    <label
      className="ud-legend inline-flex cursor-pointer items-center gap-1.5 border border-scribe-strong bg-anvil px-2.5 py-1.5 text-chalk transition-colors hover:border-cherry hover:text-cherry"
      title={title}
    >
      <Icon name="upload" size={14} strokeWidth={2} />
      {label}
      <input
        type="file"
        accept=".json,.jsonc,.txt,application/json,text/plain"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          void file.text().then((text) => onText(text, file.name));
          event.target.value = '';
        }}
      />
    </label>
  );
}

export function CopyButton({
  text,
  disabled,
  label,
  copiedLabel,
  title,
}: {
  text: string;
  disabled?: boolean;
  label: string;
  copiedLabel: string;
  title: string;
}) {
  const { copy, copied } = useCopy();
  return (
    <Button
      icon={copied ? 'check' : 'copy'}
      onClick={() => void copy(text)}
      disabled={disabled || !text}
      className={copied ? 'text-sound' : ''}
      title={title}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
