import { useState } from "react";

export function useFaqRow(defaultOpen: boolean) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((v) => !v);
  return { open, toggle };
}
