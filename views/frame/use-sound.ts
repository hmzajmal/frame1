"use client";

import { useCallback, useState } from "react";
import type { PointerEvent } from "react";

const canPlaySound = () => (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true;

export function useSound() {
  const [on, setOn] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggle = useCallback(() => setOn((m) => !m), []);
  const onPointerEnter = useCallback((e: PointerEvent) => {
    if (e.pointerType === "mouse" && canPlaySound()) setHovered(true);
  }, []);
  const onPointerLeave = useCallback(() => setHovered(false), []);

  return { muted: !(on || hovered), toggle, hoverSound: { onPointerEnter, onPointerLeave, "data-sound": "" } };
}
