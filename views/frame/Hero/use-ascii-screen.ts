"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { SCENES, SCREEN, SCREEN_BULGE, SCREEN_DIGITS, SCREEN_FLIP_MS, SCREEN_FLOOR, SCREEN_FRAME_MS, SCREEN_MIX_RATE, SCREEN_STRIPS, SCREEN_TINT, SCREEN_UNDERLAY, WIPE_MS } from "./Hero.constants";

type ScreenState = { scene: number; incoming: number | null; playing: boolean };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function useAsciiScreen(videos: RefObject<(HTMLVideoElement | null)[]>, state: ScreenState) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const live = useRef({ ...state, wipeAt: 0 });

  useEffect(() => {
    const prev = live.current;
    live.current = { ...state, wipeAt: state.incoming !== null && prev.incoming === null ? performance.now() : prev.wipeAt };
  }, [state]);

  useEffect(() => {
    const out = canvas.current?.getContext("2d");
    if (!out) return;
    const { cols, rows, cellW, cellH } = SCREEN;
    const W = cols * cellW;
    const H = rows * cellH;
    const make = (w: number, h: number) => Object.assign(document.createElement("canvas"), { width: w, height: h });
    const sampleCanvas = make(cols, rows);
    const sample = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const maskCanvas = make(W, H);
    const mask = maskCanvas.getContext("2d");
    const atlasCanvas = make(SCREEN_DIGITS.length * cellW, cellH);
    const clearCanvas = make(W, H);
    const clear = clearCanvas.getContext("2d");
    const atlas = atlasCanvas.getContext("2d");
    if (!sample || !mask || !atlas || !clear) return;

    atlas.fillStyle = "#fff";
    atlas.font = `700 ${cellH - 1}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
    atlas.textAlign = "center";
    atlas.textBaseline = "middle";
    [...SCREEN_DIGITS].forEach((ch, i) => atlas.fillText(ch, i * cellW + cellW / 2, cellH / 2 + 1));

    const posters = SCENES.map((s) => Object.assign(new Image(), { src: s.poster }));
    const source = (i: number) => {
      const v = videos.current[i];
      if (v && v.readyState >= 2) return { el: v, w: v.videoWidth, h: v.videoHeight };
      const p = posters[i];
      return p.complete && p.naturalWidth ? { el: p, w: p.naturalWidth, h: p.naturalHeight } : null;
    };
    const drawSource = (ctx: CanvasRenderingContext2D, i: number, w: number, h: number) => {
      const s = source(i);
      if (!s) return;
      const want = W / H;
      const sw = Math.min(s.w, s.h * want);
      const sh = sw / want;
      ctx.drawImage(s.el, (s.w - sw) / 2, (s.h - sh) * 0.3, sw, sh, 0, 0, w, h);
    };
    const curve = (from: HTMLCanvasElement, alpha: number) => {
      out.globalAlpha = alpha;
      const sw = W / SCREEN_STRIPS;
      for (let s = 0; s < SCREEN_STRIPS; s++) {
        const u = ((s + 0.5) / SCREEN_STRIPS) * 2 - 1;
        const dh = H * (1 - SCREEN_BULGE * u * u);
        out.drawImage(from, s * sw, 0, sw, H, s * sw, (H - dh) / 2, sw + 0.6, dh);
      }
    };
    const digits = (now: number, scene: number, incoming: number | null, wipe: number) => {
      sample.fillStyle = "#000";
      sample.fillRect(0, 0, cols, rows);
      drawSource(sample, scene, cols, rows);
      if (incoming !== null) {
        sample.save();
        sample.beginPath();
        sample.rect(0, 0, cols * wipe, rows);
        sample.clip();
        drawSource(sample, incoming, cols, rows);
        sample.restore();
      }
      const image = sample.getImageData(0, 0, cols, rows);
      const px = image.data;
      mask.globalCompositeOperation = "source-over";
      mask.fillStyle = "#000";
      mask.fillRect(0, 0, W, H);
      const beat = now / SCREEN_FLIP_MS;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
          px[i] = Math.min(255, px[i] * SCREEN_TINT);
          px[i + 1] = Math.min(255, px[i + 1] * SCREEN_TINT);
          px[i + 2] = Math.min(255, px[i + 2] * SCREEN_TINT);
          if (lum < SCREEN_FLOOR) continue;
          const seed = ((x * 73856093) ^ (y * 19349663)) >>> 0;
          const digit = ((seed >> 3) + Math.floor(beat + (seed % 11) / 11)) & 1;
          mask.drawImage(atlasCanvas, digit * cellW, 0, cellW, cellH, x * cellW, y * cellH, cellW, cellH);
        }
      }
      sample.putImageData(image, 0, 0);
      mask.globalCompositeOperation = "multiply";
      mask.imageSmoothingEnabled = false;
      mask.drawImage(sampleCanvas, 0, 0, W, H);
      mask.globalCompositeOperation = "lighter";
      mask.globalAlpha = SCREEN_UNDERLAY;
      mask.drawImage(sampleCanvas, 0, 0, W, H);
      mask.globalAlpha = 1;
      if (incoming !== null && wipe < 1) {
        mask.fillStyle = "rgb(255 255 255 / 0.85)";
        mask.fillRect(W * wipe - 2, 0, 4, H);
      }
    };

    let raf = 0;
    let last = 0;
    let mix = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < SCREEN_FRAME_MS) return;
      last = now;
      const { scene, incoming, playing, wipeAt } = live.current;
      const wipe = incoming === null ? 0 : ease(Math.min(1, (now - wipeAt) / WIPE_MS));
      mix += ((playing ? 0 : 1) - mix) * SCREEN_MIX_RATE;
      if (mix < 0.004) mix = 0;
      if (mix > 0.996) mix = 1;

      out.clearRect(0, 0, W, H);
      if (mix < 1) {
        drawSource(clear, scene, W, H);
        curve(clearCanvas, 1);
      }
      if (mix > 0) {
        digits(now, scene, incoming, wipe);
        if (mix < 1) {
          out.globalAlpha = mix;
          out.fillStyle = "#000";
          out.fillRect(0, 0, W, H);
        }
        curve(maskCanvas, mix);
      }
      out.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [videos]);

  return { canvas, width: SCREEN.cols * SCREEN.cellW, height: SCREEN.rows * SCREEN.cellH };
}
