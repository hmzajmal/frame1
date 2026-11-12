"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useInView(ref: RefObject<Element | null>, margin: string, once = false) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, once]);

  return inView;
}
