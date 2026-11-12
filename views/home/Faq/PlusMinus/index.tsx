import type { PlusMinusProps } from "./PlusMinus.types";

export function PlusMinus({ open }: PlusMinusProps) {
  return (
    <span className="faq-toggle" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line
          x1="7" y1="1" x2="7" y2="13"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
          style={{
            transition: "transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 200ms ease",
            transformOrigin: "center",
            transform: open ? "scaleY(0)" : "scaleY(1)",
            opacity: open ? 0 : 1,
          }}
        />
      </svg>
    </span>
  );
}
