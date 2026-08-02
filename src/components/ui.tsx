import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconKey } from '../lib/icons';
import { useCopy } from '../lib/hooks';

/** Shared primitives for the tool UIs — kept deliberately small and unstyled-ish. */

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
      'border border-line bg-surface-2 text-content hover:border-line-strong hover:bg-surface-3',
    primary: 'bg-accent text-accent-contrast hover:opacity-90 border border-transparent',
    ghost: 'border border-transparent text-muted hover:bg-surface-2 hover:text-content',
    danger: 'border border-line bg-surface-2 text-muted hover:border-danger/60 hover:text-danger',
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </button>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function Select({ label, className = '', children, ...rest }: SelectProps) {
  return (
    <label className="inline-flex items-center gap-1.5 text-[13px] text-muted">
      <span>{label}</span>
      <select
        className={`rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[13px] text-content transition-colors hover:border-line-strong ${className}`}
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
}

export function Toggle({ checked, onChange, children, title }: ToggleProps) {
  return (
    <label
      className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] whitespace-nowrap text-muted select-none hover:text-content"
      title={title}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-3.5 accent-[var(--ud-accent)]"
      />
      {children}
    </label>
  );
}

interface PanelProps {
  title: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Highlight the panel while a file is being dragged over it. */
  highlighted?: boolean;
  dropHandlers?: Partial<Record<string, unknown>>;
}

/** A titled editor/output pane: header strip, body, optional status footer. */
export function Panel({
  title,
  actions,
  footer,
  children,
  className = '',
  highlighted = false,
  dropHandlers,
}: PanelProps) {
  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden rounded-xl border bg-surface transition-colors ${
        highlighted ? 'border-accent' : 'border-line'
      } ${className}`}
      {...dropHandlers}
    >
      {/* Wraps rather than clips: on a narrow screen the controls flow onto
          their own row instead of disappearing past the right edge. */}
      <header className="flex min-h-11 shrink-0 flex-wrap items-center gap-x-2 gap-y-2 border-b border-line px-3 py-2">
        <h2 className="text-[13px] font-medium text-content">{title}</h2>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">{actions}</div>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {children}
        {highlighted && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-bg/70 text-sm font-medium text-accent">
            Drop a .json file to load it
          </div>
        )}
      </div>
      {footer && (
        <footer className="flex h-9 shrink-0 items-center gap-3 border-t border-line px-3 text-xs text-muted">
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

export function Status({ tone, children }: StatusProps) {
  const tones = {
    ok: 'text-success',
    error: 'text-danger',
    warn: 'text-warning',
    idle: 'text-faint',
  };
  const dots = {
    ok: 'bg-success',
    error: 'bg-danger',
    warn: 'bg-warning',
    idle: 'bg-faint',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 ${tones[tone]}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${dots[tone]}`} />
      {children}
    </span>
  );
}

/** Hidden file input paired with a button, for the "Open file" action. */
export function FileButton({ onText }: { onText: (text: string, filename: string) => void }) {
  return (
    <label
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[13px] font-medium text-content transition-colors hover:border-line-strong hover:bg-surface-3"
      title="Open a local file — it is read in your browser, never uploaded"
    >
      <Icon name="upload" size={15} />
      Open
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
      className={copied ? 'text-success' : ''}
      title="Copy to clipboard"
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
