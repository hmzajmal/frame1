import type { Mark } from "./Consistency.types";

export const MARKS_BY_SHOT: Mark[][] = [
  [
    { label: "Eye colour", point: [55, 24], tag: [66, 16], side: "right" },
    { label: "Freckles", point: [47, 30], tag: [37, 38], side: "left" },
  ],
  [
    { label: "Hairline", point: [49.5, 12.5], tag: [38, 20], side: "left" },
    { label: "Jawline", point: [56.5, 42], tag: [67, 50], side: "right" },
  ],
  [
    { label: "Eye colour", point: [54.5, 22.5], tag: [66, 14], side: "right" },
    { label: "Freckles", point: [47, 29], tag: [37, 37], side: "left" },
  ],
];

export const STEP_MS = 1100;
export const START_MS = 300;
