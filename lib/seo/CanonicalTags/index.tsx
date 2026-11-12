import type { CanonicalTagsProps } from "./CanonicalTags.types";

export function CanonicalTags({ url, languages }: CanonicalTagsProps) {
  return (
    <>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      {languages &&
        Object.entries(languages).map(([language, href]) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={href}
          />
        ))}
    </>
  );
}
