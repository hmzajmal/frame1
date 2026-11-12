export type MediaHandoffSlot = "image" | "video";

export type MediaHandoffFile = {
  slot: MediaHandoffSlot;
  file: File;
};

export type MediaHandoffRecord = {
  v: number;
  id: string;
  createdAt: number;
  items: {
    slot: MediaHandoffSlot;
    type: string;
    name: string;
    size: number;
    blob: Blob;
  }[];
};
