"use client";

/* eslint-disable @next/next/no-img-element */
import "./Media.css";
import type { MediaProps } from "./Media.types";
import { useMedia } from "./use-media";

export function Media({ shot, active = true, eager = false, muted = true }: MediaProps) {
  const { video, near } = useMedia(active, muted);

  return shot.video ? (
    <video ref={video} className="fm-media" data-on={active || undefined} src={near ? shot.video : undefined} poster={shot.src} aria-label={shot.alt} muted loop playsInline preload={near ? "auto" : "none"} />
  ) : (
    <img className="fm-media" data-on={active || undefined} src={shot.src} alt={shot.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
}
