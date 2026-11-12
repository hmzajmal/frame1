"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  CTA_BUTTON_BOUNDS,
  CTA_CARD_SELECTOR,
  CTA_LOADING_ATTRIBUTE,
  CTA_LOADING_OPACITY,
  CTA_LOADING_TIMEOUT_MS,
  CTA_MEDIA_SELECTOR,
  CTA_NAV_ALLOWED_SELECTOR,
  CTA_NAV_SELECTOR,
  CTA_SPINNER_CLASS,
  CTA_SPINNER_GAP_PX,
  CTA_SPINNER_SIZE_PX,
  CTA_WIDTH_TRANSITION,
} from "./cta-loader.constants";

type SavedStyle = Pick<CSSStyleDeclaration, "width" | "transition" | "whiteSpace" | "opacity">;

const savedStyles = new WeakMap<HTMLElement, SavedStyle>();

function isVisibleColor(color: string): boolean {
  if (!color || color === "transparent") return false;
  const alpha = color.match(/rgba?\([^)]*,\s*([\d.]+)\)/)?.[1];
  return alpha === undefined || Number(alpha) > 0;
}

function isButtonLike(link: HTMLAnchorElement): boolean {
  if (link.closest(CTA_NAV_SELECTOR) && !link.matches(CTA_NAV_ALLOWED_SELECTOR)) return false;
  if (link.querySelector(CTA_MEDIA_SELECTOR)) return false;

  const { width, height } = link.getBoundingClientRect();
  const { minHeight, maxHeight, maxWidth, minRadius } = CTA_BUTTON_BOUNDS;
  if (height < minHeight || height > maxHeight || width > maxWidth) return false;

  const style = getComputedStyle(link);
  if (parseFloat(style.borderTopLeftRadius) < minRadius) return false;

  const hasBorder = parseFloat(style.borderTopWidth) >= 1 && isVisibleColor(style.borderTopColor);
  return isVisibleColor(style.backgroundColor) || hasBorder;
}

function leavesPage(link: HTMLAnchorElement): boolean {
  if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return false;

  const url = new URL(link.href, window.location.href);
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search;
  return !(samePage && url.hash);
}

function startButtonLoading(link: HTMLAnchorElement) {
  const style = getComputedStyle(link);
  const gap = parseFloat(style.columnGap) || 0;
  const isFlex = style.display.includes("flex");
  const spacing = isFlex && gap > 0 ? gap : CTA_SPINNER_GAP_PX;
  const width = link.getBoundingClientRect().width;

  const spinner = document.createElement("span");
  spinner.className = CTA_SPINNER_CLASS;
  spinner.setAttribute("aria-hidden", "true");
  if (!(isFlex && gap > 0)) spinner.style.marginRight = `${CTA_SPINNER_GAP_PX}px`;

  savedStyles.set(link, { width: link.style.width, transition: link.style.transition, whiteSpace: link.style.whiteSpace, opacity: link.style.opacity });
  link.style.width = `${width}px`;
  link.style.whiteSpace = "nowrap";
  link.prepend(spinner);

  requestAnimationFrame(() => {
    link.style.transition = CTA_WIDTH_TRANSITION;
    link.style.width = `${width + CTA_SPINNER_SIZE_PX + spacing}px`;
    link.style.opacity = CTA_LOADING_OPACITY;
  });
}

function clearLoading() {
  document.querySelectorAll<HTMLElement>(`[${CTA_LOADING_ATTRIBUTE}]`).forEach((element) => {
    element.removeAttribute(CTA_LOADING_ATTRIBUTE);
    element.removeAttribute("aria-busy");
    element.querySelector(`:scope > .${CTA_SPINNER_CLASS}`)?.remove();

    const saved = savedStyles.get(element);
    if (saved) {
      element.style.width = saved.width;
      element.style.transition = saved.transition;
      element.style.whiteSpace = saved.whiteSpace;
      element.style.opacity = saved.opacity;
      savedStyles.delete(element);
    }
  });
}

export function useCtaLoader() {
  const pathname = usePathname();

  useEffect(() => {
    let timeout: number | undefined;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute(CTA_LOADING_ATTRIBUTE) || !leavesPage(link)) return;

      const isCard = link.matches(CTA_CARD_SELECTOR);
      if (!isCard && !isButtonLike(link)) return;

      if (!isCard) startButtonLoading(link);
      link.setAttribute(CTA_LOADING_ATTRIBUTE, "true");
      link.setAttribute("aria-busy", "true");
      window.clearTimeout(timeout);
      timeout = window.setTimeout(clearLoading, CTA_LOADING_TIMEOUT_MS);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("pageshow", clearLoading);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pageshow", clearLoading);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(clearLoading, [pathname]);
}
