interface ArchDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

// Arch shape echoes the cafe's physical alcove — see brief Section 2 (Architectural Motif).
export function ArchDivider({ color = '#F2E8D9', flip = false, className }: ArchDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className ?? ''}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16 block">
        <path d="M0,60 Q720,0 1440,60 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}
