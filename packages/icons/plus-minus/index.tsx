import type { PlusMinusIconProps } from "./plus-minus.types";

export function PlusMinusIcon({ verticalClassName, ...props }: PlusMinusIconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={verticalClassName} />
    </svg>
  );
}
