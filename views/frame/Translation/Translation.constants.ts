import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import type { Language } from "./Translation.types";

const { translation } = ASSET_PATHS.frame;

export const LANGUAGES: Language[] = [
  { name: "English", flag: "🇺🇸", video: resolveAssetUrl(translation.en), code: "en", dir: "ltr", words: ["Hey!", "I", "recorded", "this", "once.", "Now", "I", "can", "say", "it", "in", "any", "language."] },
  { name: "Español", flag: "🇪🇸", video: resolveAssetUrl(translation.es), code: "es", dir: "ltr", words: ["¡Hola!", "Grabé", "esto", "una", "sola", "vez.", "Ahora", "puedo", "decirlo", "en", "cualquier", "idioma."] },
  { name: "Deutsch", flag: "🇩🇪", video: resolveAssetUrl(translation.de), code: "de", dir: "ltr", words: ["Hallo!", "Ich", "habe", "das", "nur", "einmal", "aufgenommen.", "Jetzt", "sage", "ich", "es", "in", "jeder", "Sprache."] },
  { name: "日本語", flag: "🇯🇵", video: resolveAssetUrl(translation.ja), code: "ja", dir: "ltr", words: ["こんにちは！", "一度だけ", "録画しました。", "今では", "どんな言語でも", "話せます。"] },
  { name: "العربية", flag: "🇸🇦", video: resolveAssetUrl(translation.ar), code: "ar", dir: "rtl", words: ["مرحبًا!", "سجّلت", "هذا", "مرة", "واحدة.", "والآن", "أستطيع", "قوله", "بأي", "لغة."] },
];
