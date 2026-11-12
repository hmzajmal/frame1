import { MARKS_BY_SHOT, START_MS, STEP_MS } from "./Consistency.constants";

export function useConsistency(active: number) {
  const marks = (MARKS_BY_SHOT[active] ?? MARKS_BY_SHOT[0]).map((m, i) => {
    const [px, py] = m.point;
    const [lx, ly] = m.tag;
    return {
      ...m,
      index: String(i + 1).padStart(2, "0"),
      px,
      py,
      lx,
      ly,
      delay: START_MS + i * STEP_MS,
      down: ly > py,
      vertical: { left: `${px}%`, top: `${Math.min(py, ly)}%`, height: `${Math.abs(ly - py)}%` },
      horizontal: { left: `${Math.min(px, lx)}%`, top: `${ly}%`, width: `${Math.abs(lx - px)}%` },
    };
  });
  return { marks };
}
