"use client";

import { useEffect, useRef } from "react";
import { BAYER, CELL, DOT_EASE, HERO_ID, INK, LAYERS } from "./DotField.constants";

const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

export function useDotField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const ridges = new Map<string, Float32Array>();
    const ridge = (layer: number, band: number, cols: number) => {
      const key = `${layer}:${band}:${cols}`;
      let row = ridges.get(key);
      if (!row) {
        const { band: size, waves } = LAYERS[layer];
        row = new Float32Array(cols);
        for (let c = 0; c < cols; c++) {
          let h = size * 0.34;
          waves.forEach(([amp, freq], i) => {
            h += amp * Math.sin(c * CELL * freq + band * 12.9898 + layer * 78.233 + i * 3.1);
          });
          row[c] = h;
        }
        if (ridges.size > 64) ridges.clear();
        ridges.set(key, row);
      }
      return row;
    };
    const shadeAt = (layer: number, c: number, wy: number, cols: number) => {
      const { band, base } = LAYERS[layer];
      const b = Math.floor(wy / band);
      const local = wy - b * band;
      const top = ridge(layer, b, cols)[c];
      if (local < top) return 0;
      const below = local - top;
      return base * Math.max(0, 1 - below / (band * 0.62)) + 0.32 * Math.exp(-below / 36);
    };

    let raf = 0;
    let eased = window.scrollY;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      raf = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (el.width !== w || el.height !== h) Object.assign(el, { width: w, height: h });
      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const target = window.scrollY;
      eased = still ? target : eased + (target - eased) * DOT_EASE;
      if (Math.abs(target - eased) < 0.5) eased = target;
      else raf = requestAnimationFrame(draw);
      const scroll = eased;
      const hero = document.getElementById(HERO_ID);
      el.toggleAttribute("data-dim", !!hero && scroll > hero.offsetTop + hero.offsetHeight - h);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = INK;
      for (let r = 0; r < rows; r++) {
        const y = r * CELL;
        const nearY = y + scroll * LAYERS[1].speed;
        const farY = y + scroll * LAYERS[0].speed;
        const grain = Math.floor(nearY / CELL);
        for (let c = 0; c < cols; c++) {
          const near = shadeAt(1, c, nearY, cols);
          const v = (near > 0 ? near : shadeAt(0, c, farY, cols)) + (hash(c, grain) - 0.5) * 0.3;
          if (v <= BAYER[(grain & 3) * 4 + (c & 3)]) continue;
          const size = v > 0.7 ? 3 : 2;
          ctx.fillRect(c * CELL, y, size, size);
        }
      }
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return canvas;
}
