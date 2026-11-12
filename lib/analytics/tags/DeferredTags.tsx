import { DEFERRED_TAGS, DEFERRED_TAGS_SCRIPT } from "./DeferredTags.constants";

export function DeferredTags() {
  if (DEFERRED_TAGS.disabled) return null;
  const { gtmId, ga4Id, clarityId, metaPixelId } = DEFERRED_TAGS;

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
      <script
        dangerouslySetInnerHTML={{
          __html: DEFERRED_TAGS_SCRIPT(gtmId, ga4Id, clarityId, metaPixelId),
        }}
      />
    </>
  );
}
