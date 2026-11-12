"use client";

import "./Hero.css";
import { WaitlistButton } from "../WaitlistButton";
import type { CSSProperties } from "react";
import { VolumeButton } from "../VolumeButton";
import { SCENES } from "./Hero.constants";
import { useAsciiScreen } from "./use-ascii-screen";
import { useHeroDemo } from "./use-hero-demo";

export function Hero() {
  const { videos, scene, incoming, playing, muted, toggleMuted, go } = useHeroDemo();
  const { canvas, width, height } = useAsciiScreen(videos, { scene, incoming, playing });
  const shown = incoming ?? scene;

  return (
    <section id="top" className="fm-hero">
      <div className="fm-hero-sources" aria-hidden>
        {SCENES.map((s, i) =>
          s.video ? (
            <video
              key={s.id}
              ref={(el) => {
                videos.current[i] = el;
              }}
              src={s.video}
              crossOrigin="anonymous"
              muted={muted}
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
            />
          ) : null,
        )}
      </div>

      <div className="fm-hero-screen">
        <canvas ref={canvas} width={width} height={height} role="img" aria-label={SCENES[shown].alt} />
        <VolumeButton muted={muted} onToggle={toggleMuted} className="fm-hero-volume" />
        <div className="fm-hero-dots" role="tablist" aria-label="Hero videos">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={i === shown} onClick={() => go(i)} style={{ "--play": `${s.playMs}ms` } as CSSProperties} data-running={(i === scene && playing) || undefined}>
              <span>{s.label}</span>
              <i />
            </button>
          ))}
        </div>
      </div>

      <div className="fm-hero-foot">
        <h1 className="fm-hero-title">
          Frame 1.0.
          <span>Your face, your voice, any script.</span>
        </h1>
        <WaitlistButton />
      </div>
    </section>
  );
}
