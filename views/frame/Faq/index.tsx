import "@/views/home/Faq/Faq.css";
import "./Faq.css";
import { FaqRow } from "@/views/home/Faq/FaqRow";
import { FRAME_FAQ, FRAME_FAQ_SCHEMA } from "./Faq.constants";

export function Faq() {
  return (
    <section id="faq" className="fm-faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FRAME_FAQ_SCHEMA) }} />
      <div className="faq-grid">
        <div className="faq-intro">
          <h2 className="fm-caps fm-faq-title">Frequently asked questions</h2>
          <p className="fm-faq-lede">The things people ask before they make their first avatar.</p>
        </div>
        <div className="faq-list fm-faq-list">
          {FRAME_FAQ.map((item, i) => (
            <FaqRow key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
