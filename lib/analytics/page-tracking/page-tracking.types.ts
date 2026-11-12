import type { AnalyticEventProperties } from "../core/core.types";

export type TrackProps = AnalyticEventProperties<Record<string, string | number | boolean | undefined>>;

export type Send = (trigger: string, props?: TrackProps) => void;

/** A page's additions to the default tracking. Handlers return true when they handled the click. */
export interface PageAnalyticsHandlers {
  context?: () => TrackProps;
  onMarked?: (kind: string, element: HTMLElement, send: Send) => boolean;
  onLink?: (link: HTMLAnchorElement, href: string, send: Send) => boolean;
}

export interface Profile {
  userId: string;
  name?: string;
  username?: string;
  email?: string;
  imageKey?: string;
}

export interface Identity {
  distinctId: string;
  deviceId?: string;
  userId?: string;
  source: "site" | "account" | "own";
}

export interface ConsentWindow {
  Cookiebot?: { consent?: { statistics?: boolean } };
}
