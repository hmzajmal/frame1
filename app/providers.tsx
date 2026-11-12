"use client";

import { useState } from "react";
import type { PropsWithChildren } from "react";
import { AnalyticsContextProvider } from "@/lib/analytics/core/AnalyticsContextProvider";
import {
  Aggregator,
  GtmAnalyticsProvider,
  GtmWrapper,
  MixpanelAnalyticsProvider,
  MixpanelWrapper,
} from "@/lib/analytics/core/providers";
import { PageViewAnalytics } from "@/lib/analytics/page-views/PageViewAnalytics";
import { CtaLoader } from "@/lib/cta-loader/CtaLoader";
import { ContactSalesHost } from "@/layouts/default-layout/ContactSales/ContactSalesHost";
import { useDeferredVideos } from "./use-deferred-videos";

export function Providers({ children }: PropsWithChildren) {
  useDeferredVideos();

  const [aggregator] = useState(
    () =>
      new Aggregator([
        new GtmWrapper(new GtmAnalyticsProvider()),
        new MixpanelWrapper(new MixpanelAnalyticsProvider()),
      ]),
  );

  return (
    <AnalyticsContextProvider aggregator={aggregator} isAggregatorReady>
      <PageViewAnalytics />
      <CtaLoader />
      {children}
      <ContactSalesHost />
    </AnalyticsContextProvider>
  );
}
