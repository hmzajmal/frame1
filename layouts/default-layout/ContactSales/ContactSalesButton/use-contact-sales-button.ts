"use client";

import type { MouseEvent } from "react";
import { openContactSales } from "../open-contact-sales";

export function useContactSalesButton(onClick?: () => void) {
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();
    openContactSales();
  };

  return { open };
}
