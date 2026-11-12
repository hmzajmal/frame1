"use client";

import "./DotField.css";
import { useDotField } from "./use-dot-field";

export function DotField() {
  const canvas = useDotField();

  return <canvas ref={canvas} className="fm-dots" aria-hidden />;
}
