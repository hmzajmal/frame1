export const imagineTags = {
  disabled: process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-WNBR3NM",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "G-DG1T2DZH17",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "gm8yy2ed7a",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "176164091799556",
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "6b2818f563ac5aa58b310d2ec6e50328",
} as const;
