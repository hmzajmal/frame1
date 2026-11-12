import type { AnalyticsProvider } from "./providers";

export type AnalyticEventProperties<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T;

export interface AnalyticsContextValue {
  aggregator: AnalyticsProvider;
  isAggregatorReady: boolean;
}
