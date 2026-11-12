import { ChevronDown } from "@/packages/icons/chevron-down";

export function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronDown width={10} height={10} className={`shrink-0 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
  );
}
