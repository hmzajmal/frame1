"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SCENES, WIPE_MS } from "./Hero.constants";

export function useHeroDemo() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [scene, setScene] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const go = useCallback((i: number) => setIncoming((current) => (current === null ? i : current)), []);

  useEffect(() => {
    videos.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === scene && incoming === null) void v.play().catch(() => undefined);
      else v.pause();
    });
  }, [scene, incoming]);

  useEffect(() => {
    if (incoming === null) return;
    const v = videos.current[incoming];
    if (v) v.currentTime = 0;
    const id = window.setTimeout(() => {
      setScene(incoming);
      setIncoming(null);
    }, WIPE_MS);
    return () => window.clearTimeout(id);
  }, [incoming]);

  useEffect(() => {
    if (incoming !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go((scene + 1) % SCENES.length), SCENES[scene].playMs);
    return () => window.clearTimeout(id);
  }, [scene, incoming, go]);

  return { videos, scene, incoming, playing: incoming === null, muted, toggleMuted, go };
}
