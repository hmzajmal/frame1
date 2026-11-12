import "./VolumeButton.css";
import type { VolumeButtonProps } from "./VolumeButton.types";

export function VolumeButton({ muted, onToggle, className }: VolumeButtonProps) {
  return (
    <button type="button" className={["fm-volume", className].filter(Boolean).join(" ")} onClick={onToggle} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.8h2.6L9 3.6v10.8l-3.9-3.2H2.5z" fill="currentColor" />
        {muted ? <path d="m12 6.8 4 4.4m0-4.4-4 4.4" /> : <path d="M11.8 6.4a3.6 3.6 0 0 1 0 5.2M13.9 4.3a6.6 6.6 0 0 1 0 9.4" />}
      </svg>
    </button>
  );
}
