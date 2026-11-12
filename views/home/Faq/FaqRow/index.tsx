"use client";

import { PlusMinus } from "../PlusMinus";
import type { FaqRowProps } from "./FaqRow.types";
import { useFaqRow } from "./use-faq-row";

export function FaqRow({ q, a, defaultOpen = false }: FaqRowProps) {
  const { open, toggle } = useFaqRow(defaultOpen);
  return (
    <div className="faq-row">
      <button type="button" onClick={toggle} aria-expanded={open} className="faq-q">
        <span>{q}</span>
        <PlusMinus open={open} />
      </button>
      <div className="faq-a-wrap" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div style={{ overflow: "hidden" }}>
          <p className="faq-a">{a}</p>
        </div>
      </div>
    </div>
  );
}
