"use client";

import { CONTACT_SALES_FALLBACK_HREF } from "@/layouts/default-layout/ContactSales/contact-sales.constants";
import { useContactSalesButton } from "@/layouts/default-layout/ContactSales/ContactSalesButton/use-contact-sales-button";
import { NavButton } from "@/layouts/default-layout/NavButton";

export function WaitlistButton() {
  const { open } = useContactSalesButton();

  return (
    <NavButton size="lg" tone="dark" href={CONTACT_SALES_FALLBACK_HREF} onClick={open} aria-haspopup="dialog" draggable={false} data-cta>
      Join the waitlist
    </NavButton>
  );
}
