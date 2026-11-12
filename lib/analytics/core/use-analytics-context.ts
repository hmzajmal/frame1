"use client";

import { useContext } from "react";
import { AnalyticsContext } from "./analytics.context";

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error("useAnalyticsContext must be used within AnalyticsContextProvider");
  return context;
}
