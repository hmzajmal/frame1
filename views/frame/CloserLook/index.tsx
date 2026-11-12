import "./CloserLook.css";
import { FeatureRow } from "../FeatureRow";
import { FEATURES } from "./CloserLook.constants";

export function CloserLook() {
  return (
    <section id="closer-look" className="fm-closer">
      <header className="fm-closer-head">
        <h2 className="fm-caps fm-closer-title">
          Every detail,
          <span>still you.</span>
        </h2>
      </header>
      <div className="fm-closer-rows">
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
