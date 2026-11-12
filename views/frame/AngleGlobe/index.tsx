"use client";

import "./AngleGlobe.css";
import { AXES } from "./AngleGlobe.constants";
import type { AngleGlobeProps } from "./AngleGlobe.types";
import { useAngleGlobe } from "./use-angle-globe";

export function AngleGlobe({ labels, angles, active, onPick }: AngleGlobeProps) {
  const { canvas } = useAngleGlobe(angles, active, onPick);

  return (
    <div className="fm-globe">
      <canvas ref={canvas} role="img" aria-label={`Camera angle: ${labels[active]}`} />
      <svg className="fm-globe-axes" viewBox="-22 -22 44 44" aria-hidden>
        {AXES.map((a) => (
          <g key={a.label}>
            <line x1="0" y1="0" x2={a.x2} y2={a.y2} stroke={a.color} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx={a.x2} cy={a.y2} r="4.2" fill={a.color} />
            <text x={a.x2} y={a.y2 + 2.1} textAnchor="middle" fontSize="5.6" fontWeight="700" fill="#111">
              {a.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
