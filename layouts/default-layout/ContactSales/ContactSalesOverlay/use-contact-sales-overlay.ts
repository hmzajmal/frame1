"use client";

import { useEffect, useRef } from "react";
import { lockPageScroll } from "@/lib/scroll-lock";

export function useContactSalesOverlay(onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const unlockScroll = lockPageScroll();
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return { closeRef };
}
