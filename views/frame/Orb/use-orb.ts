"use client";

import { useEffect, useRef } from "react";
import { ORB_FLOW, ORB_POINTS, ORB_PX, ORB_SPIN } from "./Orb.constants";

export function useOrb(active: boolean) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const energy = useRef(active);

  useEffect(() => {
    energy.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: ORB_POINTS }, (_, i) => {
      const y = 1 - (i / (ORB_POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
    });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = ORB_PX / 2;
    let raf = 0;
    let level = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const t = still ? 0 : now;
      level += ((energy.current ? 1 : 0.35) - level) * 0.06;
      const spin = t * ORB_SPIN;
      const cos = Math.cos(spin);
      const sin = Math.sin(spin);
      ctx.clearRect(0, 0, ORB_PX, ORB_PX);
      for (const p of points) {
        const flow = Math.sin(p.y * 4.2 + t * ORB_FLOW) * Math.cos(p.x * 3.4 - t * ORB_FLOW * 0.8) + Math.sin(p.z * 5.1 + t * ORB_FLOW * 1.3) * 0.6;
        const radius = half * (0.6 + flow * 0.085 * (0.6 + level));
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const depth = (z + 1) / 2;
        const size = 0.6 + depth * 1.9 * (0.75 + level * 0.35);
        ctx.globalAlpha = 0.16 + depth * 0.84;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(half + x * radius, half + p.y * radius, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return canvas;
}
