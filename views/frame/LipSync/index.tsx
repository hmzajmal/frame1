"use client";

import "./LipSync.css";
import type { CSSProperties } from "react";
import { LENS_PX, MOUTH, TRACK, WAVE, WORDS } from "./LipSync.constants";
import type { LipSyncProps } from "./LipSync.types";
import { useLipSync } from "./use-lip-sync";

export function LipSync({ shot, muted = true }: LipSyncProps) {
  const { video, near, lens, wave, word } = useLipSync(muted);
  const vars = { "--mx": `${MOUTH.x * 100}%`, "--my": `${MOUTH.y * 100}%`, "--tw": `${TRACK.w * 100}%`, "--th": `${TRACK.h * 100}%` } as CSSProperties;

  return (
    <div className="fm-lip" style={vars} data-speaking={word >= 0 || undefined}>
      <video ref={video} className="fm-lip-video" src={near ? shot.video : undefined} poster={shot.src} aria-label={shot.alt} muted loop playsInline preload={near ? "auto" : "none"} />
      <div className="fm-lip-shade" aria-hidden />
      <div className="fm-lip-track" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </div>
      <svg className="fm-lip-link" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path d={`M ${(MOUTH.x + TRACK.w / 2) * 100} ${MOUTH.y * 100} L 67 ${MOUTH.y * 100} L 72 44`} />
      </svg>
      <div className="fm-lip-panel" aria-hidden>
        <div className="fm-lip-lens">
          <canvas ref={lens} width={LENS_PX} height={LENS_PX} />
        </div>
        <canvas ref={wave} className="fm-lip-wave" width={WAVE.w} height={WAVE.h} />
        <p className="fm-lip-state">
          <i />
          Lips locked to audio
        </p>
      </div>
      <p className="fm-lip-words" aria-hidden>
        {WORDS.map((w, i) => (
          <span key={`${w.text}-${i}`} data-on={i === word || undefined} data-said={(word >= 0 && i < word) || undefined}>
            {w.text}
          </span>
        ))}
      </p>
    </div>
  );
}
