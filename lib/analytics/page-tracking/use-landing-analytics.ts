"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ANALYTIC_EVENTS } from "../events/events";
import { useAnalyticsContext } from "../core/use-analytics-context";
import { identity, resolveProfile } from "./identity";
import { pageHandlers, pageOf } from "./page-tracking";
import { AREA_SELECTOR, BUTTON_SELECTOR, IDENTITY_WAIT_MS, LABEL_MAX_LENGTH, SEARCH_DEBOUNCE_MS } from "./page-tracking.constants";
import type { Send, TrackProps } from "./page-tracking.types";

const sectionOf = (element: Element) => {
  const section = element.closest("section");
  return section ? section.id : element.closest(AREA_SELECTOR)?.tagName.toLowerCase() ?? "";
};

const labelOf = (element: Element) =>
  ((element.textContent ?? "").trim() || element.getAttribute("aria-label") || "").slice(0, LABEL_MAX_LENGTH);

const isOwnHost = (host: string) => host === window.location.hostname || /(^|\.)imagine\.art$/i.test(host);

const hostOf = (href: string) => {
  try {
    const url = new URL(href, window.location.href);
    return /^https?:$/.test(url.protocol) ? url.hostname : "";
  } catch {
    return "";
  }
};

/** Sends `page_view_landing` and delegated `click` events for every page; mounted from `DefaultLayout`. */
export function useLandingAnalytics() {
  const pathname = usePathname();
  const page = pathname ? pageOf(pathname) : "";
  const { aggregator } = useAnalyticsContext();

  useEffect(() => {
    if (!page) return;

    let live = true;
    const shared = (): TrackProps => ({
      page,
      page_name: window.location.pathname,
      distinct_id: identity().distinctId,
      ...pageHandlers().context?.(),
    });

    void Promise.race([
      resolveProfile().catch(() => undefined),
      new Promise<undefined>((resolve) => window.setTimeout(() => resolve(undefined), IDENTITY_WAIT_MS)),
    ]).then((profile) => {
      if (!live) return;
      const who = identity();
      aggregator.log(
        ANALYTIC_EVENTS.page_view_landing.withProperties({
          ...shared(),
          source: document.referrer || "direct",
          email: profile?.email ?? "",
          has_account: profile?.userId ? "true" : "false",
          id_source: who.source,
          distinct_id: who.distinctId,
        }),
      );
    });

    const send: Send = (trigger, props = {}) =>
      aggregator.log(ANALYTIC_EVENTS.click.withProperties({ trigger, ...shared(), ...props }));

    const onMarked = (kind: string, marked: HTMLElement) => {
      if (pageHandlers().onMarked?.(kind, marked, send)) return;
      if (kind === "search") return;
      if (kind === "filter") return send("filter", { value: marked.dataset.trackValue ?? "" });
      if (kind === "carousel") return send("carousel", { value: marked.dataset.trackIndex ?? "" });
      if (kind === "faq") {
        if (marked.getAttribute("aria-expanded") === "false") send("faq_expand", { value: marked.dataset.trackQ ?? "" });
        return;
      }
      send(kind, { value: marked.dataset.trackValue ?? "", label: labelOf(marked), section: sectionOf(marked) });
    };

    const onLink = (link: HTMLAnchorElement) => {
      const href = link.getAttribute("href") ?? "";
      if (pageHandlers().onLink?.(link, href, send)) return;

      const props = { label: labelOf(link), section: sectionOf(link), href };
      if (link.hasAttribute("data-cta")) return send("cta", { ...props, value: link.dataset.trackValue ?? "" });

      const host = hostOf(href);
      if (host && !isOwnHost(host)) return send("outbound", { ...props, host });
      send("link", props);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const marked = target.closest<HTMLElement>("[data-track]");
      if (marked) return onMarked(marked.dataset.track ?? "", marked);

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (link) return onLink(link);

      const button = target.closest<HTMLElement>(BUTTON_SELECTOR);
      if (button) send("button", { label: labelOf(button), section: sectionOf(button) });
    };

    let searchTimer: number | undefined;
    let lastSearch = "";
    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement | null;
      if (input?.dataset.track !== "search") return;
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        const query = input.value.trim().toLowerCase().slice(0, LABEL_MAX_LENGTH);
        if (!query || query === lastSearch) return;
        lastSearch = query;
        send("search", { value: query, results: Number(input.dataset.trackResults ?? -1) });
      }, SEARCH_DEBOUNCE_MS);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("input", onInput, true);
    return () => {
      live = false;
      window.clearTimeout(searchTimer);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("input", onInput, true);
    };
  }, [aggregator, page]);
}
