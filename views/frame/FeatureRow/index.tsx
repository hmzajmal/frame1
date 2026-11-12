"use client";

import "./FeatureRow.css";
import { AngleGlobe } from "../AngleGlobe";
import { Consistency } from "../Consistency";
import { LipSync } from "../LipSync";
import { Pills } from "../Pills";
import { Media } from "../Media";
import { usePick } from "../use-pick";
import { useSound } from "../use-sound";
import { VolumeButton } from "../VolumeButton";
import { OPTION_MS, STILL_MS } from "./FeatureRow.constants";
import type { FeatureRowProps } from "./FeatureRow.types";

export function FeatureRow({ feature, flip }: FeatureRowProps) {
  const options = feature.options ?? [];
  const hasVideo = feature.shots.some((shot) => shot.video);
  const { active, pick } = usePick(Math.max(options.length, 1), feature.ms ?? (hasVideo ? OPTION_MS : STILL_MS));
  const { muted, toggle, hoverSound } = useSound();

  return (
    <article id={feature.id} className="fm-row" data-flip={flip || undefined}>
      <div className="fm-row-copy">
        <h3 className="fm-caps fm-row-title">
          {feature.title[0]}
          {feature.title[1] && <span>{feature.title[1]}</span>}
        </h3>
        <p className="fm-row-line">{feature.line}</p>
      </div>
      <div className="fm-row-media" {...(hasVideo ? hoverSound : {})}>
        {feature.lipSync ? (
          <LipSync shot={feature.shots[0]} muted={muted} />
        ) : (
          feature.shots.map((shot, i) => <Media key={shot.src} shot={shot} active={i === active} muted={muted} />)
        )}
        {feature.annotate && <Consistency active={active} />}
        {hasVideo && <VolumeButton muted={muted} onToggle={toggle} />}
        {feature.angles ? (
          <AngleGlobe labels={options} angles={feature.angles} active={active} onPick={pick} />
        ) : options.length > 0 && (
          <div className="fm-row-pills">
            <Pills items={options} active={active} onPick={pick} label={feature.title.join(" ")} />
          </div>
        )}
      </div>
    </article>
  );
}
