import type { Shot } from "../media.types";

export type LipSyncProps = { shot: Shot; muted?: boolean };
export type Word = { text: string; from: number; to: number };
