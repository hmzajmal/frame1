import { ANALYTIC_EVENTS } from "../events/events";
import { MIXPANEL_ENDPOINT } from "./core.constants";
import { imagineTags } from "../analytics.constants";
import type { AnalyticEvent } from "./analytic-event";
import type { DataLayerWindow } from "../tags/tags.types";

export abstract class AnalyticsProvider {
  abstract log(event: AnalyticEvent): void;
}

export class Aggregator extends AnalyticsProvider {
  constructor(private readonly providers: AnalyticsProvider[]) {
    super();
  }

  log(event: AnalyticEvent): void {
    this.providers.forEach((provider) => provider.log(event));
  }
}

export class BufferedAnalyticsProvider extends AnalyticsProvider {
  private target: AnalyticsProvider | null = null;
  private isReady = false;
  private queue: AnalyticEvent[] = [];

  configure(target: AnalyticsProvider, isReady: boolean): void {
    this.target = target;
    this.isReady = isReady;
    if (!isReady) return;

    this.queue.forEach((event) => target.log(event));
    this.queue = [];
  }

  log(event: AnalyticEvent): void {
    if (this.isReady && this.target) this.target.log(event);
    else this.queue.push(event);
  }
}

export class GtmAnalyticsProvider extends AnalyticsProvider {
  constructor() {
    super();
    if (typeof window !== "undefined") {
      const browserWindow = window as DataLayerWindow;
      browserWindow.dataLayer ??= [];
    }
  }

  log(event: AnalyticEvent): void {
    if (typeof window === "undefined" || imagineTags.disabled) return;

    const browserWindow = window as DataLayerWindow;
    browserWindow.dataLayer ??= [];
    browserWindow.dataLayer.push({
      event: "gtm.click",
      "gtm.elementId": event.name,
      ...event.properties,
    });
  }
}

/** Same values Mixpanel's JS library sets, since raw posts don't get device properties. */
const browserOf = (agent: string) =>
  /Edg\//.test(agent) ? "Microsoft Edge"
  : /OPR\//.test(agent) ? "Opera"
  : /Firefox\//.test(agent) ? "Firefox"
  : /Chrome\//.test(agent) ? "Chrome"
  : /Safari\//.test(agent) ? "Safari"
  : "";

const osOf = (agent: string) =>
  /Windows/.test(agent) ? "Windows"
  : /Android/.test(agent) ? "Android"
  : /(iPhone|iPad|iPod)/.test(agent) ? "iOS"
  : /Mac OS X/.test(agent) ? "Mac OS X"
  : /Linux/.test(agent) ? "Linux"
  : "";

/** Posts directly to Mixpanel because the GTM container has no Mixpanel tag. `time` is omitted on purpose: a wrong unit makes Mixpanel drop the event. */
export class MixpanelAnalyticsProvider extends AnalyticsProvider {
  log(event: AnalyticEvent): void {
    if (typeof window === "undefined" || imagineTags.disabled) return;

    const { distinct_id: distinctId, ...properties } = event.properties as Record<string, unknown>;

    const body = new URLSearchParams({
      data: JSON.stringify({
        event: event.name,
        properties: {
          ...properties,
          token: imagineTags.mixpanelToken,
          distinct_id: distinctId ?? "",
          $insert_id: crypto.randomUUID(),
          $current_url: window.location.href,
          $referrer: document.referrer,
          $browser: browserOf(navigator.userAgent),
          $os: osOf(navigator.userAgent),
          $screen_width: window.screen.width,
          $screen_height: window.screen.height,
        },
      }),
    });

    void fetch(MIXPANEL_ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

const GTM_EVENT_IDS = new Set([
  ANALYTIC_EVENTS.click.id,
  ANALYTIC_EVENTS.page_view.id,
  ANALYTIC_EVENTS.page_view_landing.id,
  ANALYTIC_EVENTS.page_view_models.id,
  ANALYTIC_EVENTS.page_view_tools.id,
  ANALYTIC_EVENTS.page_view_video_generator.id,
  ANALYTIC_EVENTS.submit_contact_form.id,
  ANALYTIC_EVENTS.submit_teams_plan_contact_form.id,
  ANALYTIC_EVENTS.enterprise_form_submit.id,
]);

export class GtmWrapper extends AnalyticsProvider {
  constructor(private readonly analyticProvider: AnalyticsProvider) {
    super();
  }

  log(event: AnalyticEvent): void {
    if (GTM_EVENT_IDS.has(event.id)) this.analyticProvider.log(event);
  }
}

const MIXPANEL_EVENT_IDS = new Set([
  ANALYTIC_EVENTS.page_view_landing.id,
  ANALYTIC_EVENTS.click.id,
]);

export class MixpanelWrapper extends AnalyticsProvider {
  constructor(private readonly analyticProvider: AnalyticsProvider) {
    super();
  }

  log(event: AnalyticEvent): void {
    if (MIXPANEL_EVENT_IDS.has(event.id)) this.analyticProvider.log(event);
  }
}
