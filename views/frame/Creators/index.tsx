/* eslint-disable @next/next/no-img-element */
import "./Creators.css";
import { Orb } from "../Orb";
import { CREATORS } from "./Creators.constants";

export function Creators() {
  return (
    <section id="creators" className="fm-cr">
      <div className="fm-cr-stage">
      <div className="fm-cr-rail">
        <article className="fm-cr-card fm-cr-intro">
          <div className="fm-cr-faces">
            {CREATORS.map((c) => (
              <img key={c.id} src={c.src} alt="" loading="lazy" decoding="async" />
            ))}
          </div>
          <h2 className="fm-caps fm-cr-title">
            Record once.
            <span>Show up everywhere.</span>
          </h2>
          <p>Your avatar keeps posting, teaching and selling, so you can get on with the rest.</p>
        </article>
        {CREATORS.map((c) => (
          <article key={c.id} className="fm-cr-card" data-id={c.id}>
            <img className="fm-cr-img" src={c.src} alt={c.alt} loading="lazy" decoding="async" />
            <div className="fm-cr-copy">
              <p className="fm-cr-name">
                <Orb className="fm-cr-orb" />
                {c.name}
              </p>
              <h3 className="fm-caps fm-cr-head">
                {c.title[0]}
                <span>{c.title[1]}</span>
              </h3>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
