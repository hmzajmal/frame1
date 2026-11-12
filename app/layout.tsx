import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { resolveAssetUrl } from "@/lib/assets";
import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { imagineSans } from "@/lib/fonts";
import { DeferredTags } from "@/lib/analytics/tags/DeferredTags";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  icons: { icon: resolveAssetUrl(ASSET_PATHS.shared.favicon) },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preconnect("https://cdn-imagine.vyro.ai");

  return (
    <html lang="en" className={`${imagineSans.variable} no-js`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }}
        />
        <DeferredTags />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
