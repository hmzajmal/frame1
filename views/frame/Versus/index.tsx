"use client";

import "./Versus.css";
import { Media } from "../Media";
import { VERSUS_FEATURES, VERSUS_NOTE, VERSUS_PREVIEWS, VERSUS_TOOLS } from "./Versus.constants";
import { useVersus } from "./use-versus";

export function Versus() {
  const { active, itemProps, reset } = useVersus();

  return (
    <section id="compare" className="fm-vs">
      <header className="fm-vs-head">
        <h2 className="fm-caps fm-vs-title">How Frame compares</h2>
        <p className="fm-vs-lede">Side by side with the two best-known avatar tools, on the things that make an avatar feel like you.</p>
      </header>
      <div className="fm-vs-grid" onMouseLeave={reset}>
        {VERSUS_TOOLS.map((tool) => (
          <article key={tool.name} className="fm-vs-card" data-frame={tool.frame || undefined}>
            <h3 className="fm-vs-name">
              {tool.frame ? (
                <span>
                  Frame 1<span className="fm-vs-rec">.</span>0
                </span>
              ) : (
                tool.name
              )}
            </h3>
            <dl className="fm-vs-list">
              {VERSUS_FEATURES.map((feature, i) => (
                <div key={feature} className="fm-vs-item" data-on={(tool.frame && i === active) || undefined} {...(tool.frame ? itemProps(i) : {})}>
                  <dt>
                    {feature}
                    {tool.frame && VERSUS_PREVIEWS[i] && <i className="fm-vs-play" aria-label="Has a video preview" />}
                  </dt>
                  <dd>{tool.cells[i]}</dd>
                  {tool.frame && VERSUS_PREVIEWS[i] && (
                    <span className="fm-vs-pop" data-show={i === active || undefined} aria-hidden>
                      <Media shot={VERSUS_PREVIEWS[i]} active={i === active} />
                    </span>
                  )}
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="fm-vs-note">{VERSUS_NOTE}</p>
    </section>
  );
}
