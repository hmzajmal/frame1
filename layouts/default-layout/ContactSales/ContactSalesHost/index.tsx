"use client";

import { ContactSalesOverlay } from "../ContactSalesOverlay";
import { useContactSalesHost } from "./use-contact-sales-host";

export function ContactSalesHost() {
  const { open, close } = useContactSalesHost();
  return open ? <ContactSalesOverlay onClose={close} /> : null;
}
