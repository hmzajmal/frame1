"use client";

/* eslint-disable @next/next/no-img-element */
import "./Footer.css";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { FOOTER_COLUMNS, FOOTER_COMMUNITY, FOOTER_SOCIALS } from "./Footer.constants";
import { FooterLinkItem } from "./FooterLinkItem";
import { TrustReviews } from "./TrustReviews";
import { NAV_AUTH } from "../Navbar/Navbar.constants";
import { Analytics } from "@/lib/analytics/tags/gtm";
import { EVENT_IDS } from "@/lib/analytics/tags/tags.constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-glow" aria-hidden="true" />
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <a href={NAV_AUTH} aria-label="ImagineArt"><img src={resolveAssetUrl(ASSET_PATHS.shared.logoIcon)} alt="ImagineArt" width={28} height={28} /></a>
        </div>
        <div className="site-footer-columns">
          {FOOTER_COLUMNS.map((column, columnIndex) => (
            <div className="site-footer-column" key={columnIndex}>
              {column.map((section) => (
                <section className="site-footer-section" key={section.heading}>
                  <h2 className="site-footer-heading">{section.heading}</h2>
                  <ul>{section.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}</ul>
                </section>
              ))}
            </div>
          ))}
        </div>
        <div className="site-footer-community">
          <span className="site-footer-heading">Community</span>
          <ul>{FOOTER_COMMUNITY.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer" className="site-footer-community-link"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={link.path} /></svg>{link.label}</a></li>)}</ul>
          <TrustReviews />
        </div>
      </div>
      <div className="site-footer-wordmark" aria-hidden="true">
        <img src={resolveAssetUrl(ASSET_PATHS.shared.logoText)} alt="ImagineArt" />
      </div>
      <div className="site-footer-bottom">
        <div className="site-footer-legal">
          <span>© {year} <strong>Vyro</strong>. All rights reserved.</span>
          <button type="button">Manage Cookie Preferences</button>
        </div>
        <div className="site-footer-socials">
          {FOOTER_SOCIALS.map((social) => (
            <a key={social.title} href={social.href} target="_blank" rel="noopener noreferrer" title={social.title} aria-label={social.title} onClick={() => Analytics.triggerEventUsingElementId(social.title === "X" ? EVENT_IDS.TWITTER_BTN : EVENT_IDS[`${social.title.toUpperCase()}_BTN` as keyof typeof EVENT_IDS] ?? EVENT_IDS.COMMUNITY_HOME)}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={social.path} /></svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
