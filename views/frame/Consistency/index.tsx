import "./Consistency.css";
import type { ConsistencyProps } from "./Consistency.types";
import { useConsistency } from "./use-consistency";

export function Consistency({ active }: ConsistencyProps) {
  const { marks } = useConsistency(active);

  return (
    <div className="fm-cons" key={active} aria-hidden>
      {marks.map((m) => (
        <div key={m.label} className="fm-cons-mark" data-side={m.side} data-down={m.down || undefined}>
          <span className="fm-cons-dot" style={{ left: `${m.px}%`, top: `${m.py}%`, animationDelay: `${m.delay}ms` }} />
          <i className="fm-cons-v" style={{ ...m.vertical, animationDelay: `${m.delay + 250}ms` }} />
          <i className="fm-cons-h" style={{ ...m.horizontal, animationDelay: `${m.delay + 520}ms` }} />
          <span className="fm-cons-tag" style={{ left: `${m.lx}%`, top: `${m.ly}%`, animationDelay: `${m.delay + 780}ms` }}>
            <small>{m.index}</small>
            {m.label}
            <svg viewBox="0 0 12 12" width="12" height="12">
              <path d="M2.5 6.3 5 8.6l4.5-5.2" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
