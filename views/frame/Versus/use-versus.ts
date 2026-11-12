"use client";

import { useState } from "react";
import { VERSUS_PREVIEWS } from "./Versus.constants";

export function useVersus() {
  const [active, setActive] = useState(-1);
  const itemProps = (i: number) =>
    VERSUS_PREVIEWS[i]
      ? { onMouseEnter: () => setActive(i), onFocus: () => setActive(i), onClick: () => setActive(i), tabIndex: 0, "data-preview": true }
      : {};
  const reset = () => setActive(-1);
  return { active, itemProps, reset };
}
