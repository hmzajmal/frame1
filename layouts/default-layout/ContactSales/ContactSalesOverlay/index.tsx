"use client";

import "./ContactSalesOverlay.css";
import { ContactSalesPanel } from "../ContactSalesPanel";
import { useContactSalesOverlay } from "./use-contact-sales-overlay";
import type { ContactSalesOverlayProps } from "../ContactSales.types";

export function ContactSalesOverlay({ onClose }: ContactSalesOverlayProps) {
  const { closeRef } = useContactSalesOverlay(onClose);

  return (
    <div className="cso" role="dialog" aria-modal="true" aria-label="Contact sales">
      <button ref={closeRef} type="button" className="cso-close" onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <ContactSalesPanel idPrefix="cso" />
    </div>
  );
}
