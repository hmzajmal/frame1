export type FacebookPixel = ((...args: unknown[]) => void) & { queue?: unknown[][] };

export type DataLayerWindow = Window & {
  __imagineGtmStarted?: boolean;
  dataLayer?: Record<string, unknown>[];
  fbq?: FacebookPixel;
  clarity?: (...args: unknown[]) => void;
};
