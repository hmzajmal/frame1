import { Fragment } from "react";
import Image from "next/image";
import { NAVBAR_ITEMS, NAV_AUTH, NAV_CTA, NAV_DEMO, linkProps } from "../Navbar.constants";
import { ContactSalesButton } from "../../ContactSales/ContactSalesButton";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { MenuContent } from "../MenuContent";
import { MOBILE_PANEL_GROUPS } from "./MobileMenu.constants";
import { ChevronDown } from "@/packages/icons/chevron-down";
import { CloseX } from "@/packages/icons/close-x";
import type { MobileMenuProps } from "./MobileMenu.types";
import { Analytics } from "@/lib/analytics/tags/gtm";
import { EVENT_IDS } from "@/lib/analytics/tags/tags.constants";

export function MobileMenu({ mode, openRow, onClose, onToggleRow }: MobileMenuProps) {
  return (
    <>
      <div className="imagine-mobile-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="mm-scope imagine-mobile-menu fixed inset-0 flex animate-[navMenuIn_0.22s_cubic-bezier(0.4,0,0.2,1)_forwards] flex-col" data-menu-theme={mode} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex shrink-0 items-center justify-between px-6 py-4">
        <a href={NAV_AUTH} onClick={() => { onClose(); Analytics.triggerEventUsingElementId(EVENT_IDS.IMAGINE_WEB_REDIRECT); }} className="inline-flex items-center" aria-label="ImagineArt home">
          <Image src={resolveAssetUrl(ASSET_PATHS.shared.logoTextDark)} alt="ImagineArt" width={140} height={22} className="imagine-mobile-menu-logo block h-6 w-auto" />
        </a>
        <button onClick={onClose} className="imagine-mobile-menu-close" aria-label="Close menu">
          <CloseX width={16} height={16} />
        </button>
      </div>
      <div className="mx-6 h-px shrink-0 bg-[var(--mm-divider)]" />
      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-6 py-2">
        {NAVBAR_ITEMS.map((entry) => {
          if (!entry.panel) {
            return <a key={entry.label} href={entry.href} className="ms-row" onClick={onClose} {...linkProps(entry.href)}>{entry.label}</a>;
          }
          const expanded = openRow === entry.label;
          return (
            <Fragment key={entry.label}>
              <button type="button" className="ms-row" aria-expanded={expanded} onClick={() => onToggleRow(entry.label)}>
                {entry.label}
                <ChevronDown width={20} height={20} className="ms-chev" />
              </button>
              {expanded && <div className="ms-body"><MenuContent groups={MOBILE_PANEL_GROUPS[entry.label]} onNavigate={onClose} /></div>}
            </Fragment>
          );
        })}
      </div>
      <div className="imagine-mobile-menu-actions">
        <a href={NAV_CTA.href} data-cta onClick={() => { onClose(); Analytics.triggerEventUsingElementId(EVENT_IDS.SIGN_UP_MOBILE_CTA); }} className="imagine-mobile-menu-cta">{NAV_CTA.label}</a>
        <ContactSalesButton label={NAV_DEMO.label} className="imagine-mobile-menu-signin" onClick={onClose} />
      </div>
      </div>
    </>
  );
}
