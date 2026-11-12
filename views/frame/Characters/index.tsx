"use client";

import "./Characters.css";
import { useSound } from "../use-sound";
import { VolumeButton } from "../VolumeButton";
import { CHARACTER_SHOT, CHARACTER_STOPS } from "./Characters.constants";
import { useCharacters } from "./use-characters";

export function Characters() {
  const { muted, toggle, hoverSound } = useSound();
  const { stage, video, track, near, current, jump, drag } = useCharacters(muted);

  return (
    <section id="characters" className="fm-chars">
      <header className="fm-chars-head">
        <h2 className="fm-caps fm-chars-title">Become any character</h2>
        <p className="fm-chars-lede">Same walk, same story. Slide from you to a fox, a 3D character or anime, mid-sentence.</p>
      </header>
      <div ref={stage} className="fm-chars-stage" {...hoverSound}>
        <video ref={video} className="fm-chars-video" src={near ? CHARACTER_SHOT.video : undefined} poster={CHARACTER_SHOT.src} aria-label={CHARACTER_SHOT.alt} muted loop playsInline preload={near ? "auto" : "none"} />
        <VolumeButton muted={muted} onToggle={toggle} className="fm-chars-volume" />
        <div className="fm-chars-slider">
          <div ref={track} className="fm-chars-track" {...drag}>
            <span className="fm-chars-fill" />
            <span className="fm-chars-knob" />
          </div>
          <ol className="fm-chars-stops">
            {CHARACTER_STOPS.map((s, i) => (
              <li key={s.name}>
                <button type="button" data-on={i === current || undefined} onClick={() => jump(i)}>
                  {s.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
