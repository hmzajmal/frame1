"use client";

import "./ContactSalesPanel.css";
import { ContactSalesForm } from "../ContactSalesForm";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { BenefitIcon } from "../BenefitIcon";
import { CONTACT_SALES_BENEFITS, CONTACT_SALES_PARTNERS } from "./ContactSalesPanel.constants";
import type { ContactSalesPanelProps } from "../ContactSales.types";

export function ContactSalesPanel({ idPrefix, tone = "dark" }: ContactSalesPanelProps) {
  return (
    <>
      <div className="cso-media">
        <video className="cso-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src={resolveAssetUrl(ASSET_PATHS.business.hero.heroErpHevc)} type={"video/mp4; codecs=\"hvc1\""} />
          <source src={resolveAssetUrl(ASSET_PATHS.business.hero.heroErp)} type="video/mp4" />
        </video>
        <span className="cso-scrim" aria-hidden="true" />

        <div className="cso-media-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resolveAssetUrl(ASSET_PATHS.business.root.imagineArtWordmark)} alt="ImagineArt" className="cso-logo" />

          <div className="cso-pitch">
            <h2 className="cso-pitch-title">Contact our enterprise team</h2>
            <ul className="cso-benefits">
              {CONTACT_SALES_BENEFITS.map((benefit) => (
                <li key={benefit.strong}>
                  <span className="cso-benefit-icon" aria-hidden="true">
                    <BenefitIcon name={benefit.icon} />
                  </span>
                  <span>
                    <strong>{benefit.strong}</strong>
                    {benefit.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cso-partners">
            <p>Partnering with global leaders to power creativity</p>
            <ul>
              {CONTACT_SALES_PARTNERS.map((partner) => {
                const src = resolveAssetUrl(partner.src);
                return (
                  <li key={partner.name}>
                    {partner.mask ? (
                      <span aria-hidden="true" className="cso-mark" style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }} />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={src} alt="" aria-hidden="true" className="cso-mark cso-mark-img" />
                    )}
                    <span>{partner.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="cso-panel">
        <div className="cso-form">
          <ContactSalesForm tone={tone} idPrefix={idPrefix} />
        </div>
      </div>
    </>
  );
}
