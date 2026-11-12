import type { Feature } from "../FeatureRow/FeatureRow.types";
import { CLOSER_SHOTS } from "../media.constants";

export const FEATURES: Feature[] = [
  { id: "consistency", title: ["Character consistency"], line: "The same you in every video, whatever the outfit, the set or the light.", shots: CLOSER_SHOTS.consistency, options: ["Studio", "Street", "Office"], annotate: true },
  { id: "broadcast", title: ["Ready for broadcast"], line: "Sit-down interviews and live news hits that hold up on a TV screen.", shots: CLOSER_SHOTS.broadcast, options: ["Interview", "News"] },
  { id: "angles", title: ["Multiple angles"], line: "Every angle, all the way round. Cut between cameras you never set up.", shots: CLOSER_SHOTS.angles, options: ["Front", "Front left", "Left", "Back left", "Back", "Back right", "Right", "Front right"], angles: [0, 45, 90, 135, 180, 225, 270, 315], ms: 1800 },
  { id: "lip-sync", title: ["Accurate lip-sync"], line: "Every syllable lands on the right frame. Watch the lips against the words.", shots: [CLOSER_SHOTS.lips], lipSync: true },
  { id: "emotion", title: ["Voice-synced", "emotion"], line: "The face follows the tone of the voice, from calm to fired up.", shots: CLOSER_SHOTS.emotion, options: ["Calm", "Excited", "Serious"] },
];
