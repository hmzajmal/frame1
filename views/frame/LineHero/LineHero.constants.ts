import type { CSSProperties } from "react";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";

const { head, womanHead } = ASSET_PATHS.frame;

export const HEAD_FRAMES = [head.a90, head.a75, head.a60, head.a45, head.a30, head.a15, head.a0].map(resolveAssetUrl);
export const WOMAN_FRAMES = [womanHead.a90, womanHead.a75, womanHead.a60, womanHead.a45, womanHead.a30, womanHead.a15, womanHead.a0].map(resolveAssetUrl);
export const WOMAN_BEATS = [
  [0.77, 0.82],
  [0.87, 0.92],
];
export const REAL_SRC = resolveAssetUrl(head.cut);
export const WOMAN_SRC = resolveAssetUrl(womanHead.cut);
export const REAL_VARS = { "--man": `url(${REAL_SRC})`, "--woman": `url(${WOMAN_SRC})` } as CSSProperties;
export const CANVAS = { w: 1200, h: 1200 };
export const ROW = 10;
export const COLS = 240;
export const INK = "#f2f2f3";
export const RELIEF = 1.7;
export const EASE = 0.12;
export const TURN_END = 0.58;
export const REAL_END = 0.84;
export const SCAN_PART = 0.62;
export const SCAN_GLOW = 46;
export const BUILD_NOTE = "Building a version of you";
export const REAL_NOTE = "Done! Now you can appear in any video";
export const REAL_TYPE_END = 0.8;
export const BRAND_LOGO = resolveAssetUrl(ASSET_PATHS.shared.logoText);
