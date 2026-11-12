"use client";

/* eslint-disable @next/next/no-img-element */
import "./LineHero.css";
import { Orb } from "../Orb";
import { WaitlistButton } from "../WaitlistButton";
import { BRAND_LOGO, CANVAS, REAL_SRC, REAL_VARS, WOMAN_SRC } from "./LineHero.constants";
import { useLineHero } from "./use-line-hero";

export function LineHero() {
  const { root, canvas, photo, note, typed, typing } = useLineHero();

  return (
    <section id="frame-hero" ref={root} className="ln">
      <div className="ln-stage">
        <div className="ln-copy">
          <img className="ln-brand" src={BRAND_LOGO} alt="ImagineArt" width={140} height={22} decoding="async" />
          <div className="ln-mark">
            <h1 className="ln-title" data-text="Frame 1.0">
              Frame 1<span className="ln-rec">.</span>0
            </h1>
          </div>
          <p className="ln-sub">Record yourself once and get an avatar that looks and moves like you, ready for any video.</p>
          <div className="ln-ctas">
            <WaitlistButton />
          </div>
        </div>
        <div className="ln-figure">
          <div ref={photo} className="ln-real" style={REAL_VARS} aria-hidden>
            <img src={REAL_SRC} alt="" className="ln-photo" decoding="async" />
            <img src={WOMAN_SRC} alt="" className="ln-photo ln-photo-alt" decoding="async" />
            <i className="ln-tear" data-tone="a" />
            <i className="ln-tear" data-tone="b" />
          </div>
          <canvas ref={canvas} width={CANVAS.w} height={CANVAS.h} aria-hidden />
          <div className="ln-note">
            <Orb active={typing} />
            <p>
              <span className="ln-note-ghost" aria-hidden>
                {note}
              </span>
              <span className="ln-note-text">
                {typed}
                <i data-typing={typing || undefined} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
