import type { Word } from "./LipSync.types";

export const MOUTH = { x: 0.507, y: 0.452 };
export const TRACK = { w: 0.14, h: 0.15 };
export const LENS_SOURCE_W = 0.15;
export const LENS_PX = 360;
export const WAVE = { w: 360, h: 72, bars: 36 };

const spread = (texts: string[], from: number, to: number): Word[] => {
  const step = (to - from) / texts.length;
  return texts.map((text, i) => ({ text, from: from + i * step, to: from + (i + 1) * step }));
};

export const WORDS: Word[] = [
  ...spread(["A", "day", "on", "Venus", "is", "longer", "than", "its", "year."], 0.35, 2.95),
  ...spread(["And", "honestly,", "I", "love", "that."], 3.35, 5.0),
];
