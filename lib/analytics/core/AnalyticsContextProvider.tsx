"use client";

import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { AnalyticsContext } from "./analytics.context";
import { BufferedAnalyticsProvider } from "./providers";
import type { AnalyticsProvider } from "./providers";
import type { AnalyticsContextValue } from "./core.types";

export function AnalyticsContextProvider({
  children,
  aggregator,
  isAggregatorReady,
}: PropsWithChildren<AnalyticsContextValue>) {
  const [wrapper] = useState(() => new BufferedAnalyticsProvider());

  useEffect(() => {
    wrapper.configure(aggregator, isAggregatorReady);
  }, [aggregator, isAggregatorReady, wrapper]);

  const value = { aggregator: wrapper as AnalyticsProvider, isAggregatorReady };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}
