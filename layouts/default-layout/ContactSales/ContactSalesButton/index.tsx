"use client";

import { CONTACT_SALES_FALLBACK_HREF } from "../contact-sales.constants";
import { useContactSalesButton } from "./use-contact-sales-button";
import type { ContactSalesButtonProps } from "../ContactSales.types";

export function ContactSalesButton({ label, className, onClick }: ContactSalesButtonProps) {
  const { open } = useContactSalesButton(onClick);

  return (
    <a href={CONTACT_SALES_FALLBACK_HREF} className={className} onClick={open} aria-haspopup="dialog">
      {label}
    </a>
  );
}
