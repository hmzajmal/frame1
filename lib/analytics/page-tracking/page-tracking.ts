import { HOME_PAGE_KEY, PAGE_KEY_ALIASES } from "./page-tracking.constants";
import type { PageAnalyticsHandlers } from "./page-tracking.types";

let current: PageAnalyticsHandlers = {};

export const pageHandlers = () => current;

export function setPageHandlers(handlers: PageAnalyticsHandlers) {
  current = handlers;
}

export function pageOf(pathname: string) {
  const path = pathname.split("/").filter(Boolean).join("/");
  return PAGE_KEY_ALIASES[path] ?? (path || HOME_PAGE_KEY);
}
