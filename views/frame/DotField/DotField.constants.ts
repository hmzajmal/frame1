export const CELL = 5;
export const INK = "rgb(255 255 255 / 0.17)";
export const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);
export const LAYERS = [
  { speed: 0.18, band: 1100, base: 0.34, waves: [[120, 0.0021], [60, 0.0057], [24, 0.017]] },
  { speed: 0.42, band: 1500, base: 0.62, waves: [[170, 0.0016], [70, 0.0049], [30, 0.014]] },
];
export const HERO_ID = "frame-hero";
export const DOT_EASE = 0.18;
