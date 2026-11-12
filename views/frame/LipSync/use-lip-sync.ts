"use client";

import { useEffect, useRef, useState } from "react";
import { NEAR_MARGIN, VISIBLE_MARGIN } from "../lazy.constants";
import { useInView } from "../use-in-view";
import { LENS_PX, LENS_SOURCE_W, MOUTH, WAVE, WORDS } from "./LipSync.constants";

export function useLipSync(muted: boolean) {
  const video = useRef<HTMLVideoElement>(null);
  const lens = useRef<HTMLCanvasElement>(null);
  const wave = useRef<HTMLCanvasElement>(null);
  const [word, setWord] = useState(-1);
  const near = useInView(video, NEAR_MARGIN, true);
  const visible = useInView(video, VISIBLE_MARGIN);

  useEffect(() => {
    const v = video.current;
    if (!v || !near) return;
    v.muted = muted;
    if (visible) void v.play().catch(() => undefined);
    else v.pause();
  }, [muted, near, visible]);

  useEffect(() => {
    const v = video.current;
    const lc = lens.current?.getContext("2d");
    const wc = wave.current?.getContext("2d");
    if (!v || !lc || !wc) return;
    let raf = 0;
    let last = -2;
    let level = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (v.readyState < 2) return;
      const t = v.currentTime;
      const sw = v.videoWidth * LENS_SOURCE_W;
      lc.drawImage(v, v.videoWidth * MOUTH.x - sw / 2, v.videoHeight * MOUTH.y - sw / 2, sw, sw, 0, 0, LENS_PX, LENS_PX);

      const index = WORDS.findIndex((w) => t >= w.from && t < w.to);
      if (index !== last) {
        last = index;
        setWord(index);
      }
      level += ((index >= 0 ? 1 : 0.06) - level) * 0.18;
      const { w, h, bars } = WAVE;
      const gap = w / bars;
      wc.clearRect(0, 0, w, h);
      wc.fillStyle = "#fff";
      for (let i = 0; i < bars; i++) {
        const wobble = 0.5 + 0.5 * Math.sin(now / 90 + i * 1.7) * Math.sin(now / 53 + i * 0.6);
        const envelope = Math.sin((Math.PI * (i + 0.5)) / bars);
        const bar = Math.max(3, h * level * envelope * (0.25 + 0.75 * wobble));
        wc.globalAlpha = 0.35 + 0.65 * level;
        wc.fillRect(i * gap + gap * 0.25, (h - bar) / 2, gap * 0.5, bar);
      }
      wc.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { video, near, lens, wave, word };
}
