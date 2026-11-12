import Image from "next/image";
import { Fragment } from "react";
import type { CSSProperties } from "react";
import { resolveAssetUrl } from "@/lib/assets";
import { ChevronRight16 } from "@/packages/icons/chevron-right-16";
import { ArrowRightShort } from "@/packages/icons/arrow-right-short";
import type { NavBadgeTone, NavBar, NavCard, NavGroup, NavItem, NavPanel, NavStories } from "../Navbar.types";
import type { MenuContentProps } from "./MenuContent.types";

const isExternal = (href: string) => href.startsWith("http") && !href.startsWith("https://www.imagine.art");
const linkTarget = (href: string) => isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

function renderBadge({ children, muted, tone }: { children: string; muted?: boolean; tone?: NavBadgeTone }) {
  const variant = muted ? " mm-badge-muted" : tone ? ` mm-badge-${tone}` : "";
  return <span className={`mm-badge${variant}`}>{children}</span>;
}

function renderItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const title = <span className="mm-item-title">{item.title}{item.badge && renderBadge({ children: item.badge, tone: item.badgeTone })}{item.href && <ChevronRight16 className="mm-chev" />}</span>;
  const description = item.description && <span className="mm-desc">{item.description}</span>;
  if (item.links) return <div className="mm-item mm-item-static">{title}{description}<span className="mm-sublinks">{item.links.map((link) => <a key={link.label} href={link.href} className="mm-sublink" onClick={onNavigate} {...linkTarget(link.href)}>{link.label}<ArrowRightShort /></a>)}</span></div>;
  if (!item.href) return <div className="mm-item mm-item-static mm-item-soon" aria-disabled="true">{title}{description}</div>;
  return <a href={item.href} className="mm-item" onClick={onNavigate} {...linkTarget(item.href)}>{title}{description}</a>;
}

function renderGroup({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return <div className={group.links ? "mm-group mm-group-links" : "mm-group"}>
    {group.heading && <p className="mm-heading" aria-hidden={group.headingHidden || undefined} style={group.headingHidden ? { visibility: "hidden" as const } : undefined}>{group.heading}</p>}
    {group.items?.map((item) => <Fragment key={item.title}>{renderItem({ item, onNavigate })}</Fragment>)}
    {group.links?.map((link) => <a key={link.label} href={link.href} className="mm-link" onClick={onNavigate} {...linkTarget(link.href)}>{link.label}<span className="mm-link-arrow"><ArrowRightShort /></span></a>)}
    {group.more && <a href={group.more.href} className="mm-more" onClick={onNavigate} {...linkTarget(group.more.href)}>{group.more.label}<ArrowRightShort /></a>}
  </div>;
}

function renderCardMedia({ media }: { media: Extract<NavCard, { kind: "card" }>['media'] }) {
  if (media.kind === "image") return <div className="mm-media-image"><Image src={resolveAssetUrl(media.src)} alt="" width={400} height={300} unoptimized /></div>;
  if (media.kind === "fan") {
    const [left, right, front] = media.srcs;
    return <div className="mm-fan" aria-hidden><Image src={resolveAssetUrl(left)} alt="" width={100} height={130} unoptimized className="mm-fan-left" /><Image src={resolveAssetUrl(right)} alt="" width={100} height={130} unoptimized className="mm-fan-right" /><Image src={resolveAssetUrl(front)} alt="" width={100} height={130} unoptimized className="mm-fan-front" /></div>;
  }
  return <div className="mm-split" aria-hidden><Image src={resolveAssetUrl(media.srcs[0])} alt="" width={200} height={300} unoptimized /><Image src={resolveAssetUrl(media.srcs[1])} alt="" width={200} height={300} unoptimized className="mm-split-mirror" /></div>;
}

function renderCard({ card, onNavigate }: { card: NavCard; onNavigate: () => void }) {
  if (card.kind === "tile") return <a href={card.href} className="mm-tile" onClick={onNavigate} {...linkTarget(card.href)}><Image src={resolveAssetUrl(card.src)} alt={card.alt} width={300} height={500} unoptimized /></a>;
  return <div className={`mm-card${card.surface ? ` mm-card-${card.surface}` : ""}`}>
    {renderCardMedia({ media: card.media })}
    {(card.title || card.body) && <div className="mm-card-copy">{card.title && <p className="mm-card-title">{card.title}{card.badge && renderBadge({ children: card.badge, muted: true })}</p>}{card.body && <p className="mm-card-body">{card.body}</p>}</div>}
    <a href={card.cta.href} className="mm-card-cta" onClick={onNavigate} {...linkTarget(card.cta.href)}>{card.cta.label}</a>
  </div>;
}

function renderBarMark(mark: string) {
  if (mark === "chrome") {
    return <span className="mm-bar-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#DB4437"/><path d="M12 12 21.53 6.5A11 11 0 0 1 12 23Z" fill="#FFCD40"/><path d="M12 12v11A11 11 0 0 1 2.47 6.5Z" fill="#0F9D58"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="12" cy="12" r="3.9" fill="#4285F4"/></svg></span>;
  }
  if (mark === "apple") {
    return <span className="mm-bar-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg></span>;
  }
  if (mark === "android") {
    return <span className="mm-bar-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.75c.33.18.7.26 1.08.22l13.12-7.57-2.82-2.82-11.38 10.17zM.75 1.13C.28 1.63 0 2.39 0 3.36v17.28c0 .97.28 1.73.76 2.22l.12.11 9.68-9.68v-.23L.87 3.02.75 1.13zM20.9 9.61l-2.8-1.62-3.15 3.14 3.15 3.15 2.81-1.62c.8-.46.8-1.21 0-1.67v.62zM4.26.25L17.38 7.82l-2.82 2.82L3.18.47A1.39 1.39 0 014.26.25z" /></svg></span>;
  }
  if (mark.includes("/")) {
    return <span className="mm-bar-mark"><Image src={resolveAssetUrl(mark)} alt="" width={22} height={22} unoptimized /></span>;
  }
  const markText = { claude: "✳", chatgpt: "◉", aftereffects: "Ae", figma: "F" }[mark as "claude" | "chatgpt" | "aftereffects" | "figma"] ?? mark;
  return <span className={`mm-bar-mark mm-bar-mark-${mark}`} aria-hidden="true"><span>{markText}</span></span>;
}

function renderPanelStories({ stories, onNavigate }: { stories: NavStories; onNavigate: () => void }) {
  return (
    <div className="mm-stories">
      <div className="mm-stories-head">
        <span className="mm-heading">{stories.heading}</span>
        <a href={stories.all.href} className="mm-stories-all" onClick={onNavigate} {...linkTarget(stories.all.href)}>{stories.all.label}<ArrowRightShort className="mm-story-arrow" /></a>
      </div>
      <div className="mm-stories-row">
        {stories.items.map((story) => (
          <a key={story.company} href={story.href} className="mm-story" onClick={onNavigate} aria-label={`${story.company}: ${story.result}`} {...linkTarget(story.href)}>
            <span className="mm-story-media"><Image src={resolveAssetUrl(story.image)} alt="" width={480} height={270} unoptimized className="mm-story-image" style={story.imageZoom ? ({ "--mm-story-zoom": story.imageZoom } as CSSProperties) : undefined} /></span>
            <span className="mm-story-body">
              <span className="mm-story-copy">
                <span className="mm-story-company">{story.company}</span>
                <span className="mm-story-result">{story.result}</span>
              </span>
              <span className="mm-story-go"><ArrowRightShort className="mm-story-arrow" /></span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function renderPanelBar({ bar, onNavigate }: { bar: NavBar; onNavigate: () => void }) {
  return (
    <div className="mm-bar">
      <span className="mm-bar-title">{bar.title}</span>
      <div className="mm-bar-links">
        {bar.links.map((link) => {
          const content = <><span className="mm-bar-marks">{link.marks.map((mark) => <Fragment key={mark}>{renderBarMark(mark)}</Fragment>)}</span>{link.label}{link.href && <ArrowRightShort className="mm-bar-arrow" />}</>;
          return link.href
            ? <a key={link.label} href={link.href} className="mm-bar-link" onClick={onNavigate} {...linkTarget(link.href)}>{content}</a>
            : <span key={link.label} className="mm-bar-link mm-bar-link-off">{content}</span>;
        })}
      </div>
    </div>
  );
}

function renderPanel({ panel, onNavigate }: { panel: NavPanel; onNavigate: () => void }) {
  const columns = panel.columns.map((column, index) => (
    <div key={index} className={`mm-col${column.width === "narrow" ? " mm-col-narrow" : ""}${column.divider ? " mm-col-divider" : ""}`}>
      {column.groups.map((group, groupIndex) => <Fragment key={groupIndex}>{renderGroup({ group, onNavigate })}</Fragment>)}
    </div>
  ));

  return (
    <>
      {panel.bar || panel.stories ? <div className="mm-main"><div className="mm-cols">{columns}</div>{panel.bar && renderPanelBar({ bar: panel.bar, onNavigate })}{panel.stories && renderPanelStories({ stories: panel.stories, onNavigate })}</div> : columns}
      {panel.cards && <div className="mm-cards">{panel.cards.map((card, index) => <Fragment key={index}>{renderCard({ card, onNavigate })}</Fragment>)}</div>}
    </>
  );
}

export function MenuContent({ panel, groups, onNavigate }: MenuContentProps) {
  if (panel) return renderPanel({ panel, onNavigate });
  return <>{groups?.map((group, index) => <Fragment key={index}>{renderGroup({ group, onNavigate })}</Fragment>)}</>;
}
