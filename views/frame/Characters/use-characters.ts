"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { NEAR_MARGIN, VISIBLE_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";
import { CHARACTER_STOPS, SWEEP_S } from "./Characters.constants";

const last = CHARACTER_STOPS.length - 1;

const progressAt = (t: number) => {
  for (let i = last; i > 0; i--) {
    const start = CHARACTER_STOPS[i].at - SWEEP_S / 2;
    if (t >= start) return Math.min(i, i - 1 + (t - start) / SWEEP_S);
  }
  return 0;
};

const timeAt = (k: number) => {
  const i = Math.min(last - 1, Math.floor(k));
  const frac = k - i;
  return CHARACTER_STOPS[i + 1].at - SWEEP_S / 2 + Math.min(1, frac) * SWEEP_S;
};

export function useCharacters(muted: boolean) {
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const near = useInView(stage, NEAR_MARGIN, true);
  const visible = useInView(stage, VISIBLE_MARGIN);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v || !near) return;
    v.muted = muted;
    if (visible) void v.play().catch(() => undefined);
    else v.pause();
  }, [near, visible, muted]);

  useEffect(() => {
    const v = video.current;
    const el = stage.current;
    if (!v || !el || !visible) return;
    let raf = 0;
    let shown = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = progressAt(v.currentTime);
      el.style.setProperty("--pos", String(p / last));
      const index = Math.round(p);
      if (index !== shown) {
        shown = index;
        setCurrent(index);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const scrub = (clientX: number) => {
    const box = track.current?.getBoundingClientRect();
    const v = video.current;
    if (!box || !v) return;
    const f = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    stage.current?.style.setProperty("--pos", String(f));
    v.currentTime = f >= 1 ? CHARACTER_STOPS[last].at + SWEEP_S : f <= 0 ? 0 : timeAt(f * last);
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    video.current?.pause();
    scrub(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) scrub(e.clientX);
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    void video.current?.play().catch(() => undefined);
  };

  const jump = (i: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = i === 0 ? 0 : CHARACTER_STOPS[i].at + SWEEP_S;
    void v.play().catch(() => undefined);
  };

  return { stage, video, track, near, current, jump, drag: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp } };
}
