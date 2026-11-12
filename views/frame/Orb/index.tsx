"use client";

import "./Orb.css";
import { ORB_PX } from "./Orb.constants";
import type { OrbProps } from "./Orb.types";
import { useOrb } from "./use-orb";

export function Orb({ active = false, className }: OrbProps) {
  const canvas = useOrb(active);

  return <canvas ref={canvas} className={["fm-orb", className].filter(Boolean).join(" ")} width={ORB_PX} height={ORB_PX} aria-hidden />;
}
