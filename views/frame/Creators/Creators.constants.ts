import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import type { Creator } from "./Creators.types";

const { creators } = ASSET_PATHS.frame;

export const CREATORS: Creator[] = [
  { id: "dj", src: resolveAssetUrl(creators.dj), alt: "A DJ in a black and white bucket hat on a red-orange backdrop", name: "Kelin Ade, DJ", title: ["His avatar teaches", "while he tours"] },
  { id: "stickers", src: resolveAssetUrl(creators.stickers), alt: "A beauty creator with brand stickers on her face on a cobalt backdrop", name: "Noa Reyes, beauty creator", title: ["Her avatar posts", "every brand drop"] },
  { id: "coach", src: resolveAssetUrl(creators.coach), alt: "A fitness coach in a sweatband on a lime green backdrop", name: "Priya Nair, coach", title: ["Her avatar runs", "the 6am class"] },
  { id: "gamer", src: resolveAssetUrl(creators.gamer), alt: "A gaming streamer in pink sunglasses and a headset on a hot pink backdrop", name: "Jun Park, streamer", title: ["His avatar streams", "while he sleeps"] },
];
