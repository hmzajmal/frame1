"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { NEAR_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";
import { CLIPS, SWIPE_COOLDOWN_MS, SWIPE_PX } from "./Clips.constants";

export function useClips() {
  const stage = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [ready, setReady] = useState<boolean[]>(() => CLIPS.map(() => false));
  const [inView, setInView] = useState(false);
  const near = useInView(stage, NEAR_MARGIN, true);
  const markReady = useCallback((i: number) => setReady((r) => (r[i] ? r : r.map((v, j) => (j === i ? true : v)))), []);

  const step = useCallback((dir: number) => setActive((a) => (a + dir + CLIPS.length) % CLIPS.length), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let sum = 0;
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      sum += e.deltaX;
      if (Math.abs(sum) < SWIPE_PX) return;
      step(sum > 0 ? 1 : -1);
      sum = 0;
      lockedUntil = now + SWIPE_COOLDOWN_MS;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  const onPointerDown = (e: PointerEvent) => {
    start.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    dragged.current = Math.abs(dx) >= SWIPE_PX;
    if (dragged.current) step(dx < 0 ? 1 : -1);
  };
  const onClickCapture = (e: MouseEvent) => {
    if (!dragged.current) return;
    dragged.current = false;
    e.stopPropagation();
  };

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const syncVideos = useCallback(
    (muted: boolean) => {
      videos.current.forEach((v, i) => {
        if (!v) return;
        if (v.readyState >= 3) markReady(i);
        v.muted = muted || i !== active;
        if (i === active && inView) void v.play().catch(() => undefined);
        else {
          v.pause();
          if (i !== active) v.currentTime = 0;
        }
      });
    },
    [active, inView, markReady],
  );

  const posOf = (i: number) => {
    const n = CLIPS.length;
    const d = ((i - active + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
    return d === 0 ? "center" : d === 1 ? "right" : d === -1 ? "left" : d > 0 ? "far-right" : "far-left";
  };

  return { stage, near, videos, ready, markReady, syncVideos, active, posOf, pick: setActive, step, onPointerDown, onPointerUp, onClickCapture };
}
