import { CLIP_SHOTS } from "../media.constants";
import type { Clip } from "./Clips.types";

export const CLIPS: Clip[] = [
  { tab: "Record", shot: CLIP_SHOTS.record },
  { tab: "Podcast", shot: CLIP_SHOTS.interview },
  { tab: "Review", shot: CLIP_SHOTS.review },
  { tab: "Advertise", shot: CLIP_SHOTS.ad },
  { tab: "Interview", shot: CLIP_SHOTS.talkShow },
  { tab: "Change scene", shot: CLIP_SHOTS.samurai },
];
export const SWIPE_PX = 40;
export const SWIPE_COOLDOWN_MS = 550;
