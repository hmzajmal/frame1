import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import type { ContactSalesBenefit, ContactSalesPartner } from "../ContactSales.types";

export const CONTACT_SALES_BENEFITS: ContactSalesBenefit[] = [
  { strong: "SSO and admin controls", rest: " to scale your entire creative team", icon: "team" },
  { strong: "50+ leading models", rest: " for image, video and audio in one workspace", icon: "spark" },
  { strong: "SOC 2 Type II", rest: " with zero data retention to protect your IP", icon: "shield" },
];

export const CONTACT_SALES_PARTNERS: ContactSalesPartner[] = [
  { name: "ByteDance", src: ASSET_PATHS.business.partners.bytedance, mask: true },
  { name: "Kling AI", src: ASSET_PATHS.business.partners.kling, mask: true },
  { name: "MiniMax", src: ASSET_PATHS.business.partners.minimax, mask: true },
  { name: "Wan", src: ASSET_PATHS.business.partners.wan, mask: false },
  { name: "fal", src: ASSET_PATHS.business.partners.fal, mask: false },
  { name: "Grok", src: ASSET_PATHS.business.partners.grok, mask: true },
];
