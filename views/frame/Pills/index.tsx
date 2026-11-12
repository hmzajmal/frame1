import "./Pills.css";
import type { PillsProps } from "./Pills.types";

export function Pills({ items, active, onPick, label, variant = "bar" }: PillsProps) {
  return (
    <div className="fm-pills" data-variant={variant} role="tablist" aria-label={label}>
      {items.map((item, i) => (
        <button key={item} type="button" role="tab" aria-selected={i === active} onClick={() => onPick(i)}>
          {item}
        </button>
      ))}
    </div>
  );
}
