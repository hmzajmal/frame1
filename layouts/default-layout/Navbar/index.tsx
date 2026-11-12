"use client";

import "./Navbar.css";
import Image from "next/image";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { NAVBAR_ITEMS, NAV_AUTH, NAV_CTA, NAV_DEMO, NAV_ORIGIN } from "./Navbar.constants";
import { ContactSalesButton } from "../ContactSales/ContactSalesButton";
import type { NavbarProps } from "./Navbar.types";
import { MenuContent } from "./MenuContent";
import { MobileMenu } from "./MobileMenu";
import { ChevronDown } from "@/packages/icons/chevron-down";
import { useNavbar } from "./use-navbar";
import { Analytics } from "@/lib/analytics/tags/gtm";
import { EVENT_IDS } from "@/lib/analytics/tags/tags.constants";

const linkTarget = (href: string) => href.startsWith("http") && !href.startsWith(NAV_ORIGIN)
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

export function Navbar({ mode = "light" }: NavbarProps = {}) {
  const {
    mode: activeMode,
    scrolled,
    overDarkHero,
    menuOpen,
    setMenuOpen,
    openPanel,
    setOpenPanel,
    openRow,
    setOpenRow,
    closeAll,
    hoverOpen,
    hoverClose,
    hoverKeep,
    togglePanel,
    panelRef,
    panelPosition,
    panelEntry,
  } = useNavbar(mode);
  const compact = scrolled;
  const menuTheme = overDarkHero ? "dark" : activeMode;
  const darkTheme = compact || activeMode === "dark";

  return (
    <>
      <nav
        className={`imagine-site-nav${compact ? " is-compact" : ""}`}
        aria-label="Main"
        data-nav-theme={darkTheme ? "dark" : "light"}
        data-compact={compact}
      >
        <a href={NAV_AUTH} className="flex shrink-0 items-center" aria-label="ImagineArt home" onClick={() => Analytics.triggerEventUsingElementId(EVENT_IDS.IMAGINE_WEB_REDIRECT)}>
            <Image
              src={resolveAssetUrl(ASSET_PATHS.shared.logoTextDark)}
              alt="ImagineArt"
              width={140}
              height={22}
              className="imagine-site-nav-logo block h-6 w-auto"
          />
        </a>

        <div className="nav-desktop hidden items-center gap-0.5 min-[1081px]:flex">
          {NAVBAR_ITEMS.map((entry) =>
            entry.panel ? (
              <button
                key={entry.label}
                type="button"
                className="nav-tab"
                data-nav-tab={entry.label}
                aria-expanded={openPanel === entry.label}
                aria-controls="nav-dropdown"
                onPointerEnter={hoverOpen(entry.label)}
                onPointerLeave={hoverClose}
                onClick={(event) => togglePanel(entry.label, event.detail === 0)}
              >
                {entry.label}
                <ChevronDown width={14} height={14} className="nav-chev" />
              </button>
            ) : (
              <a key={entry.label} href={entry.href} className="nav-tab" onPointerEnter={hoverClose} onClick={closeAll} {...linkTarget(entry.href!)}>
                {entry.label}
              </a>
            ),
          )}
        </div>

        <div className="nav-desktop hidden shrink-0 items-center gap-2 min-[1081px]:flex">
          <ContactSalesButton label={NAV_DEMO.label} className="nav-signin" />
          <a href={NAV_CTA.href} data-cta className="nav-cta" onClick={() => Analytics.triggerEventUsingElementId(EVENT_IDS.OPEN_APP_BTN)}>
            {NAV_CTA.label}
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
        >
          <span className="nav-burger-icon">
            <span />
            <span />
          </span>
        </button>
      </nav>

      {panelEntry?.panel && (
        <>
          <div className="mm-backdrop" onClick={() => setOpenPanel(null)} aria-hidden />
          <div
            key={panelEntry.label}
            id="nav-dropdown"
            role="region"
            aria-label={panelEntry.label}
            className={`mm-scope mm-panel${panelEntry.panel.columns.length === 1 && !panelEntry.panel.cards ? " mm-panel-single" : ""}${panelEntry.panel.columns.length >= 4 ? " mm-panel-dense" : ""}`}
            data-menu-theme={menuTheme}
            data-compact={compact}
            ref={panelRef}
            style={{
              top: 84,
              ...(panelPosition?.label === panelEntry.label ? { left: panelPosition.left } : { visibility: "hidden" }),
              ["--mm-cols" as string]: Math.min(
                3,
                panelEntry.panel.columns[0]?.groups.reduce(
                  (count, group) => count + (group.items?.length ?? group.links?.length ?? 0),
                  0,
                ) ?? 3,
              ),
            }}
            onPointerEnter={hoverKeep}
            onPointerLeave={hoverClose}
          >
            <div className="mm-inner">
              <MenuContent panel={panelEntry.panel} onNavigate={closeAll} />
            </div>
          </div>
        </>
      )}

      {menuOpen && <MobileMenu mode={menuTheme} openRow={openRow} onClose={closeAll} onToggleRow={(label) => setOpenRow((current) => current === label ? null : label)} />}
    </>
  );
}
