"use client";

/* eslint-disable @next/next/no-img-element */
import "./Translation.css";
import { TRANSLATION_SHOT } from "../media.constants";
import { Pills } from "../Pills";
import { useSound } from "../use-sound";
import { VolumeButton } from "../VolumeButton";
import { LANGUAGES } from "./Translation.constants";
import { useTranslation } from "./use-translation";

export function Translation() {
  const { muted, toggle, hoverSound } = useSound();
  const { root, near, videos, active, lit, pick, next } = useTranslation(muted);
  const language = LANGUAGES[active];

  return (
    <section id="translation" ref={root} className="fm-tr">
      <h2 className="fm-caps fm-tr-title">
        Video Translation
        <span>Lips matched to every language</span>
      </h2>
      <div className="fm-tr-pills">
        <Pills items={LANGUAGES.map((l) => `${l.flag}  ${l.name}`)} active={active} onPick={pick} label="Language" />
      </div>
      <div className="fm-tr-frame" {...hoverSound}>
        {LANGUAGES.map((l, i) =>
          l.video ? (
            <video
            key={l.code}
            ref={(el) => {
              videos.current[i] = el;
            }}
            className="fm-tr-video"
            data-on={i === active || undefined}
            src={near ? l.video : undefined}
            poster={TRANSLATION_SHOT.src}
            aria-label={TRANSLATION_SHOT.alt}
            muted
            playsInline
            preload={near && i === active ? "auto" : "none"}
            onEnded={i === active ? next : undefined}
          />
          ) : (
            <img key={l.code} className="fm-tr-video" data-on={i === active || undefined} src={TRANSLATION_SHOT.src} alt={TRANSLATION_SHOT.alt} loading="lazy" decoding="async" />
          ),
        )}
        <p className="fm-tr-speaking" key={`s-${language.code}`}>
          {language.flag} Speaking <b lang={language.code}>{language.name}</b>
        </p>
        <p className="fm-tr-caption" key={language.code} lang={language.code} dir={language.dir}>
          {language.words.map((w, i) => (
            <span key={`${w}-${i}`} data-lit={!language.video || i < lit || undefined}>
              {w}
            </span>
          ))}
        </p>
        <VolumeButton muted={muted} onToggle={toggle} />
      </div>
    </section>
  );
}
