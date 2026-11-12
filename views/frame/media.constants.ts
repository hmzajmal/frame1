import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import type { Shot } from "./media.types";

const { characters, clips, translation, closer, use, phone } = ASSET_PATHS.frame;

const shot = (path: string, alt: string, video?: string): Shot => ({ src: resolveAssetUrl(path), alt, video: video && resolveAssetUrl(video) });

export const CLIP_SHOTS = {
  record: shot(clips.record, "A man with auburn curls and glasses talks to camera at his desk in a cosy home studio", clips.recordVideo),
  interview: shot(clips.interview, "He laughs mid-story at a podcast table across from a doctor", clips.interviewVideo),
  review: shot(clips.review, "He holds up a mirrorless camera and points at it in a warm creator studio", clips.reviewVideo),
  ad: shot(clips.ad, "He rips open a KESTREL kettle chips bag as chips burst into the air, on a teal ad set", clips.adVideo),
  talkShow: shot(clips.talkShow, "He laughs on a talk show sofa with a microphone, the host at her desk", clips.talkShowVideo),
  samurai: shot(clips.samurai, "As a samurai he half-draws his sword in a castle courtyard in the rain", clips.samuraiVideo),
};

export const TRANSLATION_SHOT = shot(translation.poster, "A woman with natural curls in a mustard cardigan talks to the camera from a green velvet couch");

export const CLOSER_SHOTS = {
  broadcast: [
    shot(use.interview, "A man in glasses gives a sit-down interview in a bright room", use.interviewVideo),
    shot(use.news, "A man in a suit speaks to camera from a marble hall lined with statues, like a live TV hit", use.newsVideo),
  ],
  consistency: [
    shot(closer.consistStudioPoster, "A woman with wavy light-brown hair talks to the camera in a photo studio", closer.consistStudioVideo),
    shot(closer.consistStreetPoster, "The same woman talks to the camera on a city street at dusk", closer.consistStreetVideo),
    shot(closer.consistOfficePoster, "The same woman talks to the camera at a desk in a bright office", closer.consistOfficeVideo),
  ],
  angles: [
    shot(closer.angleFront, "A potter talks to the camera in her studio, seen from the front"),
    shot(closer.angle34, "The same potter seen from a three-quarter angle"),
    shot(closer.angleProfile, "The same potter seen in profile"),
    shot(closer.angle135, "The same potter seen from behind over her left shoulder"),
    shot(closer.angle180, "The same potter seen from directly behind, facing her workbench"),
    shot(closer.angle225, "The same potter seen from behind over her right shoulder"),
    shot(closer.angle270, "The same potter seen in profile from her other side"),
    shot(closer.angle315, "The same potter seen in three-quarter view from her other side"),
  ],
  lips: shot(closer.lipsPoster, "A woman in a home study explains a fact about Venus to the camera", closer.lipsVideo),
  emotion: [
    shot(closer.emoCalm, "A man on a small stage speaks calmly"),
    shot(closer.emoExcited, "The same man throws his arms up, laughing"),
    shot(closer.emoSerious, "The same man leans in with a serious look"),
  ],
};

export const PHONE_SHOTS = {
  selfie: shot(phone.selfie, "A phone recording of a man in a grey hoodie at his desk, fingers pinched in an emphatic gesture", phone.selfieVideo),
  avatar: shot(phone.avatar, "His Frame avatar making the same gesture, generated in a studio", phone.avatarVideo),
};

export const CHARACTER_VIDEO = shot(characters.journalist, "A journalist with glasses walks down a rainy city street talking to camera, then turns into a fox reporter, a 3D animated character and an anime character in one take", characters.journalistVideo);
