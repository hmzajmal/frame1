import type { Shot } from "../media.types";

export type Feature = { id: string; title: [string, string?]; line: string; shots: Shot[]; options?: string[]; angles?: number[]; ms?: number; lipSync?: boolean; annotate?: boolean };
export type FeatureRowProps = { feature: Feature; flip: boolean };
