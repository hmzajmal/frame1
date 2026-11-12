import { CHARACTER_VIDEO } from "../media.constants";
import type { CharacterStop } from "./Characters.types";

export const CHARACTER_SHOT = CHARACTER_VIDEO;
export const CHARACTER_STOPS: CharacterStop[] = [
  { name: "You", at: 0 },
  { name: "Fox", at: 4.75 },
  { name: "3D", at: 8.65 },
  { name: "Anime", at: 12.05 },
];
export const SWEEP_S = 0.8;
