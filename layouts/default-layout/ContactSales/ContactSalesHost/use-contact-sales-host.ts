"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CONTACT_SALES_AUTO_OPEN_PARAM,
  CONTACT_SALES_EVENT,
} from "../contact-sales.constants";
import { openContactSales } from "../open-contact-sales";

export function useContactSalesHost() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONTACT_SALES_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_SALES_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(CONTACT_SALES_AUTO_OPEN_PARAM) === "true") openContactSales();
  }, []);

  return { open, close };
}
