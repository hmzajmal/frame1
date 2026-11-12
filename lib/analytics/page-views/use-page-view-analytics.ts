"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ANALYTIC_EVENTS } from "../events/events";
import { useAnalyticsContext } from "../core/use-analytics-context";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "None";
}

export function usePageViewAnalytics(): void {
  const pathname = usePathname();
  const { aggregator } = useAnalyticsContext();
  const lastFiredPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastFiredPath.current === pathname) return;
    lastFiredPath.current = pathname;

    let source = "";
    try {
      source = sessionStorage.getItem("source") ?? "";
      sessionStorage.setItem("source", pathname);
    } catch {}

    const route = pathname.replace(/\/+$/, "");
    if (route === "/ai-video-generator") {
      aggregator.log(
        ANALYTIC_EVENTS.page_view_video_generator.withProperties({
          page_name: pathname,
          source,
          utm_term: readCookie("utm_term"),
          utm_source: readCookie("utm_source"),
          utm_medium: readCookie("utm_medium"),
          utm_campaign: readCookie("utm_campaign"),
          first_page_view: readCookie("first_page_view"),
        }),
      );
    } else if (route === "/models") {
      aggregator.log(ANALYTIC_EVENTS.page_view_models.withProperties({ page_name: pathname, source }));
    } else if (route === "/tools") {
      aggregator.log(ANALYTIC_EVENTS.page_view_tools.withProperties({ page_name: pathname, source }));
    }

    aggregator.log(ANALYTIC_EVENTS.page_view.withProperties({ page_name: pathname, source }));
  }, [aggregator, pathname]);
}
