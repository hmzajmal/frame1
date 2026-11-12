import type { BenefitIconProps } from "../ContactSales.types";

export function BenefitIcon({ name }: BenefitIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {name === "team" && (
        <>
          <circle cx="12" cy="6.5" r="3" />
          <circle cx="5.5" cy="16" r="2.5" />
          <circle cx="18.5" cy="16" r="2.5" />
          <path d="M10 9.2 7 13.8M14 9.2l3 4.6M8 16h8" />
        </>
      )}
      {name === "spark" && (
        <>
          <path d="M10 3.5l1.6 4.4L16 9.5l-4.4 1.6L10 15.5l-1.6-4.4L4 9.5l4.4-1.6L10 3.5z" />
          <path d="M17.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 2.8l7 3v5.3c0 4.5-3 7.5-7 9.1-4-1.6-7-4.6-7-9.1V5.8l7-3z" />
          <path d="M8.8 11.8l2.3 2.3 4.2-4.3" />
        </>
      )}
    </svg>
  );
}
