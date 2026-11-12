import type { Metadata } from "next";
import { CanonicalTags } from "@/lib/seo/CanonicalTags";
import FrameView from "@/views/frame";
import { FRAME_SEO } from "@/views/frame/config";

const { title, description, canonical } = FRAME_SEO;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: "ImagineArt", locale: "en_US", title, description },
  twitter: { card: "summary_large_image", site: "@imagineArtAI", title, description },
};

export default function FramePage() {
  return (
    <>
      <CanonicalTags url={canonical} />
      <FrameView />
    </>
  );
}
