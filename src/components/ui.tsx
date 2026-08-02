import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconKey } from '../lib/icons';
import { useCopy } from '../lib/hooks';

/**
 * True for a beat each time `key` changes — the visual report of a blow
 * landing. Skipped on first render so arriving at a page with restored work
 * does not fake an operation that never happened.
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

/**
 * Shop controls. Everything is struck rather than softened: square corners,
 * engraved legends, tabular figures. Operate rules bind here — the task and its
 * state always outrank the world.
 */

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
  label: string;
}

export function Select({ label, className = '', children, ...rest }: SelectProps) {
  return (
    <label
      className={`ud-legend inline-flex items-center gap-2 ${rest.disabled ? 'opacity-40' : ''}`}
    >
      <span>{label}</span>
      <select
        className={`ud-force border border-scribe-strong bg-anvil px-2 py-1.5 text-xs text-chalk transition-colors enabled:hover:border-cherry disabled:cursor-not-allowed ${className}`}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  title?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, children, title, disabled = false }: ToggleProps) {
  return (
    <label
      className={`ud-legend inline-flex items-center gap-2 whitespace-nowrap transition-colors select-none ${
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:text-chalk'
      }`}
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
  /**
   * Share row tracks with sibling panels so headers, bodies and footers line up
   * even when one panel's controls wrap and the other's do not. The parent must
   * declare `lg:grid-rows-[auto_minmax(0,1fr)_auto]`.
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
      <header className="flex min-h-10 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-scribe bg-bench px-3 py-2">
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
        {highlighted && (
          <div className="ud-legend pointer-events-none absolute inset-0 grid place-items-center bg-ground/85 text-cherry">
            Drop the stock here
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

/** A registered measurement: engraved label, tabular value. */
export function Gauge({ label, value }: { label: string; value: ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-faint">{label}</span>
      <span className="ud-force text-xs text-chalk">{value}</span>
    </span>
  );
}

export function FileButton({ onText }: { onText: (text: string, filename: string) => void }) {
  return (
    <label
      className="ud-legend inline-flex cursor-pointer items-center gap-1.5 border border-scribe-strong bg-anvil px-2.5 py-1.5 text-chalk transition-colors hover:border-cherry hover:text-cherry"
      title="Read a local file — it is read on this machine, never uploaded"
    >
      <Icon name="upload" size={14} strokeWidth={2} />
      Load
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

export function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const { copy, copied } = useCopy();
  return (
    <Button
      icon={copied ? 'check' : 'copy'}
      onClick={() => void copy(text)}
      disabled={disabled || !text}
      className={copied ? 'text-sound' : ''}
      title="Copy to clipboard"
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
