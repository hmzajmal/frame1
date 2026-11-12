import { createContext } from "react";
import type { AnalyticsContextValue } from "./core.types";

export const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);
