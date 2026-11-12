export type Language = {
  name: string;
  flag: string;
  code: string;
  dir: "ltr" | "rtl";
  words: string[];
  video?: string;
};
