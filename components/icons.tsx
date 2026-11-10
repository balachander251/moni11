type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GiftIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 13h18" />
      <path d="M12 9v11" />
      <path d="M12 9c-1.2-3-3.2-4.5-4.8-4-1.6.5-1.9 3 .3 4" />
      <path d="M12 9c1.2-3 3.2-4.5 4.8-4 1.6.5 1.9 3-.3 4" />
    </svg>
  );
}

export function HeartIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 20.4 4.7 13.3a4.7 4.7 0 0 1 0-6.7 4.8 4.8 0 0 1 6.7 0l.6.6.6-.6a4.8 4.8 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7Z" />
    </svg>
  );
}

export function SparkleIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2" />
    </svg>
  );
}

export function PlayIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M7 4.8v14.4c0 .8.9 1.3 1.6.9l11.5-7.2a1 1 0 0 0 0-1.7L8.6 3.9C7.9 3.5 7 4 7 4.8Z" />
    </svg>
  );
}

export function PauseIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none" aria-hidden="true">
      <rect x="6" y="4" width="4.5" height="16" rx="1" />
      <rect x="13.5" y="4" width="4.5" height="16" rx="1" />
    </svg>
  );
}

export function VolumeIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9Z" />
      <path d="M16.5 9a4 4 0 0 1 0 6" />
      <path d="M19 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

export function MuteIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9Z" />
      <path d="M16 9.5 20.5 14" />
      <path d="M20.5 9.5 16 14" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CameraIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 8.5h2.4L8 6h8l1.6 2.5H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

export function BackspaceIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M9 5h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7 6-7Z" />
      <path d="M12.5 9.5l4 4M16.5 9.5l-4 4" />
    </svg>
  );
}

export function LockIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </svg>
  );
}

export function ReplayIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4v4.5h4.5" />
    </svg>
  );
}

export function ShuffleIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M3 6h4.5L15 18h6" />
      <path d="M17.5 5.5 21 8l-3.5 2.5" />
      <path d="M3 18h4.5l2.4-3.8" />
      <path d="M17.5 15.5 21 18l-3.5 2.5" />
      <path d="M9.9 9.8 7.5 6H3" />
    </svg>
  );
}

export function MusicIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M9 18V6l11-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  );
}
