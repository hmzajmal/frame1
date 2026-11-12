"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NEAR_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";
import { LANGUAGES } from "./Translation.constants";

export function useTranslation(muted: boolean) {
  const root = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [lit, setLit] = useState(0);
  const [inView, setInView] = useState(false);
  const near = useInView(root, NEAR_MARGIN, true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = useCallback(
    (to: number) => {
      const from = videos.current[active];
      const target = videos.current[to];
      if (from && target && to !== active) target.currentTime = from.ended ? 0 : from.currentTime;
      setActive(to);
    },
    [active],
  );

  const next = useCallback(() => {
    const to = videos.current[(active + 1) % LANGUAGES.length];
    if (to) to.currentTime = 0;
    setActive((a) => (a + 1) % LANGUAGES.length);
  }, [active]);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted || i !== active;
      if (i === active && inView) void v.play().catch(() => undefined);
      else v.pause();
    });
  }, [active, inView, muted]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const v = videos.current[active];
      if (!v || !v.duration) return;
      const words = LANGUAGES[active].words.length;
      setLit(Math.min(words, Math.floor((v.currentTime / (v.duration * 0.9)) * words) + 1));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return { root, near, videos, active, lit, pick, next };
}
