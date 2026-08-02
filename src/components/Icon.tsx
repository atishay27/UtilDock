import { ICONS, type IconKey } from '../lib/icons';

interface IconProps {
  name: IconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/** React twin of Icon.astro, for use inside hydrated tool components. */
export function Icon({ name, size = 16, className = '', strokeWidth = 1.7 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
