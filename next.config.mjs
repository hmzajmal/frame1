/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(process.env.NEXT_STATIC_ASSET_PREFIX
    ? { assetPrefix: process.env.NEXT_STATIC_ASSET_PREFIX.replace(/\/+$/, '') }
    : {}),
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-imagine.vyro.ai",
        pathname: "/imagine-static-pages/landing-pages-assets/**",
      },
    ],
  },
};

export default nextConfig;
