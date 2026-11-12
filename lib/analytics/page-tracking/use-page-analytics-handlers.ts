"use client";

import { useEffect } from "react";
import { setPageHandlers } from "./page-tracking";
import type { PageAnalyticsHandlers } from "./page-tracking.types";

export function usePageAnalyticsHandlers(handlers: PageAnalyticsHandlers) {
  useEffect(() => {
    setPageHandlers(handlers);
  });

  useEffect(() => () => setPageHandlers({}), []);
}
