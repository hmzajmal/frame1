"use client";

/* eslint-disable @next/next/no-img-element */
import "./Carousel.css";
import "./Clips.css";
import { Pills } from "../Pills";
import { useSound } from "../use-sound";
import { VolumeButton } from "../VolumeButton";
import { CLIPS } from "./Clips.constants";
import { useClips } from "./use-clips";
import { useClipsSound } from "./use-clips-sound";

export function Clips() {
  const { stage, near, videos, ready, markReady, syncVideos, active, posOf, pick, step, onPointerDown, onPointerUp, onClickCapture } = useClips();
  const { muted, toggle, hoverSound } = useSound();
  useClipsSound(syncVideos, muted);

  return (
    <section id="clips" className="fm-how fm-clips">
      <h2 className="fm-caps fm-clips-title">
        Record yourself once
        <span>The possibilities are limitless</span>
      </h2>
      <div className="fm-how-tabs">
        <Pills items={CLIPS.map((c) => c.tab)} active={active} onPick={pick} label="Clips" />
      </div>
      <div ref={stage} className="fm-how-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onClickCapture={onClickCapture} {...hoverSound}>
        {CLIPS.map((c, i) => (
          <div
            key={c.tab}
            className="fm-how-card"
            data-pos={posOf(i)}
            aria-hidden={i !== active}
            onClick={posOf(i) === "right" ? () => step(1) : posOf(i) === "left" ? () => step(-1) : undefined}
          >
            <img draggable={false} className="fm-clips-video" src={c.shot.src} alt={c.shot.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            {c.shot.video && (
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                className="fm-clips-video fm-clips-motion"
                data-ready={ready[i] || undefined}
                src={near ? c.shot.video : undefined}
                muted
                playsInline
                preload={near && i === active ? "auto" : "none"}
                onCanPlay={() => markReady(i)}
                onEnded={i === active ? () => step(1) : undefined}
                aria-hidden
              />
            )}
          </div>
        ))}
        {CLIPS.some((c) => c.shot.video) && <VolumeButton muted={muted} onToggle={toggle} className="fm-clips-volume" />}
      </div>
    </section>
  );
}
