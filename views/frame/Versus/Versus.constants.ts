import { CLOSER_SHOTS, PHONE_SHOTS } from "../media.constants";
import type { VersusTool } from "./Versus.types";

export const VERSUS_FEATURES = ["Camera angles", "Your mannerisms", "Emotion", "Lip-synced translation"];
export const VERSUS_TOOLS: VersusTool[] = [
  { name: "Frame 1.0", frame: true, cells: ["Any angle, all the way round, from one recording", "Learned from your own footage", "Follows the tone of your voice", "Yes"] },
  { name: "HeyGen", cells: ["Wide, medium and close-up", "Not publicly stated", "Expressive avatars", "Yes"] },
  { name: "Synthesia", cells: ["Preset angles on stock avatars only", "Generated from the script", "Inferred from the script", "Yes"] },
];
export const VERSUS_NOTE = "Based on each company's public product pages, November 2026.";
export const VERSUS_PREVIEWS = [null, PHONE_SHOTS.avatar, null, CLOSER_SHOTS.lips];
