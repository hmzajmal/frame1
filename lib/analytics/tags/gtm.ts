import { imagineTags } from "../analytics.constants";
import type { DataLayerWindow, FacebookPixel } from "./tags.types";

export function loadGtm(): void {
  if (typeof window === "undefined" || imagineTags.disabled) return;

  const browserWindow = window as DataLayerWindow;
  browserWindow.dataLayer ??= [];
  if (browserWindow.__imagineGtmStarted) return;
  browserWindow.__imagineGtmStarted = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${imagineTags.gtmId}`;
  document.head.appendChild(script);
}

export function pushToDataLayer(payload: Record<string, unknown>): void {
  const browserWindow = window as DataLayerWindow;
  browserWindow.dataLayer = browserWindow.dataLayer || [];
  browserWindow.dataLayer.push(payload);
}

export function clarityEvent(eventId: string): void {
  const browserWindow = window as DataLayerWindow;
  if (typeof browserWindow.clarity === "function") browserWindow.clarity("event", eventId);
}

export class Analytics {
  static triggerEventUsingElementId(
    elementId: string,
    eventId?: string,
    eventParams: Record<string, unknown> = {},
  ): void {
    if (typeof window === "undefined" || imagineTags.disabled) return;

    const browserWindow = window as DataLayerWindow;
    browserWindow.dataLayer ??= [];
    browserWindow.dataLayer.push({
      event: "gtm.click",
      "gtm.elementId": elementId,
      eventID: eventId,
      ...eventParams,
    });
    if (!browserWindow.fbq) {
      const pixel: FacebookPixel = (...args) => {
        pixel.queue ??= [];
        pixel.queue.push(args);
      };
      browserWindow.fbq = pixel;
      pixel("init", imagineTags.metaPixelId);
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }
    browserWindow.fbq("trackCustom", elementId);
    loadGtm();
  }
}
