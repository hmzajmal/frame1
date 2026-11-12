"use client";

import { useCallback, useEffect, useState } from "react";

export function usePick(count: number, ms: number) {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [count, ms, round]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setRound((r) => r + 1);
  }, []);

  return { active, pick };
}
