import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import type { HeroScene } from "./Hero.types";

const { hero } = ASSET_PATHS.frame;

export const SCENES: HeroScene[] = [
  { id: "review", playMs: 7600, label: "Camera review", video: resolveAssetUrl(hero.reviewVideo), poster: resolveAssetUrl(hero.reviewPoster), alt: "A creator in a warm studio holds up a compact camera and reviews it to the lens" },
  { id: "vintage", playMs: 6700, label: "1940s film", video: resolveAssetUrl(hero.vintageVideo), poster: resolveAssetUrl(hero.vintagePoster), alt: "The same man in a 1940s black-and-white film, in a pinstripe suit, speaking into a telephone" },
  { id: "podcast", playMs: 7700, label: "Podcast", video: resolveAssetUrl(hero.doctorVideo), poster: resolveAssetUrl(hero.doctorPoster), alt: "The same man hosts a podcast, talking across a table with a doctor in a white coat" },
];

export const WIPE_MS = 1150;

export const SCREEN = { cols: 144, rows: 63, cellW: 10, cellH: 14 };
export const SCREEN_DIGITS = "01";
export const SCREEN_FRAME_MS = 33;
export const SCREEN_BULGE = 0.13;
export const SCREEN_STRIPS = 96;
export const SCREEN_TINT = 1.55;
export const SCREEN_UNDERLAY = 0.1;
export const SCREEN_FLOOR = 0.05;
export const SCREEN_FLIP_MS = 600;
export const SCREEN_MIX_RATE = 0.16;
