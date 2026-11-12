"use client";

import { useEffect, useRef, useState } from "react";
import { BUILD_NOTE, CANVAS, COLS, EASE, HEAD_FRAMES, INK, REAL_END, REAL_NOTE, REAL_TYPE_END, RELIEF, ROW, SCAN_GLOW, SCAN_PART, TURN_END, WOMAN_BEATS, WOMAN_FRAMES } from "./LineHero.constants";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function useLineHero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"build" | "real">("build");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = root.current;
    const ctx = canvas.current?.getContext("2d");
    if (!el || !ctx) return;
    const { w, h } = CANVAS;
    const rows = Math.floor(h / ROW);
    const cell = w / COLS;
    const sampler = Object.assign(document.createElement("canvas"), { width: COLS, height: rows }).getContext("2d", { willReadFrequently: true });
    if (!sampler) return;
    const load = (sources: string[]) => {
      const out: (Float32Array | null)[] = sources.map(() => null);
      sources.forEach((src, index) => {
        const img = Object.assign(new Image(), { src });
        img.onload = () => {
          sampler.drawImage(img, 0, 0, COLS, rows);
          const px = sampler.getImageData(0, 0, COLS, rows).data;
          const bright = new Float32Array(COLS * rows);
          for (let i = 0; i < bright.length; i++) {
            const lum = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255;
            bright[i] = Math.pow(clamp((lum - 0.035) / 0.8), 0.8);
          }
          out[index] = bright;
        };
      });
      return out;
    };
    const man = load(HEAD_FRAMES);
    const woman = load(WOMAN_FRAMES);
    const surface = canvas.current;
    let glitch: Animation | undefined;

    let raf = 0;
    let shown = "build";
    let shownChars = -1;
    let eased = -1;
    let last = 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const box = el.getBoundingClientRect();
      if (box.bottom < 0) return;
      const target = clamp(-box.top / Math.max(1, box.height - window.innerHeight));
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      eased = eased < 0 || still ? target : eased + (target - eased) * (1 - Math.pow(1 - EASE, dt / 16.7));
      if (Math.abs(target - eased) < 0.0005) eased = target;
      const p = eased;
      const turn = clamp(p / TURN_END);
      const real = clamp((p - TURN_END) / (REAL_END - TURN_END));
      const scan = clamp(real / SCAN_PART);
      const reveal = clamp((real - SCAN_PART) / (1 - SCAN_PART));
      const next = reveal > 0 ? "real" : "build";
      if (next !== shown) {
        shown = next;
        setStage(next);
      }
      if (photo.current) photo.current.style.opacity = String(reveal);
      const text = next === "real" ? REAL_NOTE : BUILD_NOTE;
      const typed = next === "real" ? clamp(reveal / REAL_TYPE_END) : 1;
      const chars = Math.round(typed * text.length);
      if (chars !== shownChars) {
        shownChars = chars;
        setCount(chars);
      }

      glitch ??= surface?.getAnimations()[0];
      const beat = glitch?.effect?.getComputedTiming().progress ?? 0;
      const swap = WOMAN_BEATS.some(([from, to]) => beat >= from && beat < to);
      const frames = swap && woman.every(Boolean) ? woman : man;
      const at = turn * (frames.length - 1);
      const i0 = Math.min(frames.length - 1, Math.floor(at));
      const i1 = Math.min(frames.length - 1, i0 + 1);
      const a = frames[i0] ?? frames.find(Boolean);
      const b = frames[i1] ?? a;
      ctx.clearRect(0, 0, w, h);
      if (!a || !b || reveal >= 1) return;
      const f = at - i0;
      const breathe = Math.sin(now / 1400) * 0.04;
      ctx.fillStyle = INK;
      ctx.globalAlpha = 1 - reveal;
      const scanY = scan * h;
      const scanning = scan > 0 && scan < 1;
      const lift = RELIEF + breathe;
      for (let y = 0; y < rows; y++) {
        const cy = y * ROW + ROW * 0.75;
        const near = scanning ? clamp(1 - Math.abs(cy - scanY) / SCAN_GLOW) : 0;
        const fade = 1 + near * 0.35;
        let runX = -1;
        let runY = 0;
        let runH = 0;
        for (let x = 0; x <= COLS; x++) {
          const v = x < COLS ? a[y * COLS + x] * (1 - f) + b[y * COLS + x] * f : 0;
          const on = v >= 0.05;
          const thick = on ? Math.max(1, Math.round(v * ROW * 0.62 * fade)) : 0;
          const top = on ? Math.round(cy - v * ROW * lift - thick / 2) : 0;
          if (runX >= 0 && (!on || top !== runY || thick !== runH)) {
            ctx.fillRect(runX * cell, runY, (x - runX) * cell, runH);
            runX = -1;
          }
          if (on && runX < 0) {
            runX = x;
            runY = top;
            runH = thick;
          }
        }
      }
      if (scanning) {
        const trail = ctx.createLinearGradient(0, scanY - SCAN_GLOW, 0, scanY);
        trail.addColorStop(0, "rgb(94 242 255 / 0)");
        trail.addColorStop(1, "rgb(94 242 255 / 0.1)");
        ctx.fillStyle = trail;
        ctx.fillRect(w * 0.08, scanY - SCAN_GLOW, w * 0.84, SCAN_GLOW);
        const beam = ctx.createLinearGradient(0, 0, w, 0);
        beam.addColorStop(0, "rgb(255 255 255 / 0)");
        beam.addColorStop(0.25, "rgb(214 250 255 / 0.9)");
        beam.addColorStop(0.5, "#ffffff");
        beam.addColorStop(0.75, "rgb(214 250 255 / 0.9)");
        beam.addColorStop(1, "rgb(255 255 255 / 0)");
        ctx.fillStyle = beam;
        ctx.shadowColor = "rgb(94 242 255 / 0.8)";
        ctx.shadowBlur = 10;
        ctx.fillRect(0, scanY - 0.75, w, 1.5);
        ctx.shadowBlur = 0;
        ctx.fillStyle = INK;
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const note = stage === "real" ? REAL_NOTE : BUILD_NOTE;

  return { root, canvas, photo, note, typed: note.slice(0, count), typing: count > 0 && count < note.length };
}
