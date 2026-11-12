import type { FaqItem } from "@/views/home/Faq/Faq.types";

export const FRAME_FAQ: FaqItem[] = [
  { q: "What is Frame 1.0?", a: "Frame 1.0 is ImagineArt's avatar model. It makes videos of you speaking a script you write, with your face, your mannerisms and lips matched to the words." },
  { q: "What do I need to make my avatar?", a: "A photo or a short clip of yourself talking. We will share the exact requirements when you get access." },
  { q: "Can it speak other languages?", a: "Yes. Video Translation re-voices a video in another language and matches the lips to it." },
  { q: "Can I make an avatar of someone else?", a: "Only with that person's consent. Frame 1.0 is built for your own face and for characters you own." },
  { q: "How do I get access?", a: "Use Contact Us and tell us what you want to make. We are opening access to teams first." },
];

export const FRAME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FRAME_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
