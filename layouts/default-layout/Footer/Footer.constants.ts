import type { FooterSection, FooterSocial, FooterCommunityLink } from "./Footer.types";

const BASE = "https://www.imagine.art";

export const FOOTER_COLUMNS: FooterSection[][] = [
  [
    {
      heading: "Product",
      links: [
        { label: "Creative Agent", href: `${BASE}/imagine-computer` },
        { label: "Workflows", href: `${BASE}/workflow` },
        { label: "MCP", href: `${BASE}/mcp` },
        { label: "Plugins", href: `${BASE}/plugins` },
        { label: "Desktop App", href: `${BASE}/desktop` },
      ],
    },
    {
      heading: "Studios",
      links: [
        { label: "Fashion Studio", href: `${BASE}/ai-fashion-studio` },
        { label: "Ad Studio", href: `${BASE}/ai-ad-studio` },
        { label: "Film Studio", href: `${BASE}/ai-film-studio` },
        { label: "Avatar Studio", href: `${BASE}/ai-avatar-studio` },
      ],
    },
  ],
  [
    {
      heading: "AI Tools",
      links: [
        { label: "AI Art Generator", href: `${BASE}` },
        { label: "AI Video Generator", href: `${BASE}/ai-video-generator` },
        { label: "AI Image Generator", href: `${BASE}/ai-image-generator` },
        { label: "AI Video Editor", href: `${BASE}/ai-video-editor` },
        { label: "AI Image Editor", href: `${BASE}/apps/ai-image-editor` },
        { label: "Audio", href: `${BASE}/audio-studio` },
        { label: "AI Influencer", href: `${BASE}/ai-influencer` },
        { label: "AI Hairstyle Changer", href: `${BASE}/apps/ai-hairstyle-changer` },
        { label: "AI Age Progression", href: `${BASE}/apps/ai-age-progression` },
        { label: "Video Object Removal", href: `${BASE}/apps/video-object-removal` },
        { label: "Background Remover", href: `${BASE}/bg-remover` },
        { label: "Upscale", href: `${BASE}/edit/upscale` },
        { label: "Video Recolor", href: `${BASE}/apps/video-recolor` },
        { label: "All AI tools", href: `${BASE}/tools`, underline: true },
      ],
    },
  ],
  [
    {
      heading: "Business",
      links: [
        { label: "Enterprise", href: `${BASE}/business` },
        { label: "Case Studies", href: `${BASE}/business/case-studies` },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Fashion and Apparel", href: `${BASE}/business/industries/fashion` },
        { label: "Real Estate", href: `${BASE}/business/industries/real-estate` },
        { label: "Food and Beverage", href: `${BASE}/business/industries/ai-for-fb-creatives` },
        { label: "Education", href: `${BASE}/business/industries/education` },
        { label: "Automotive", href: `${BASE}/business/industries/automotive` },
        { label: "Beauty", href: `${BASE}/business/industries/beauty-and-skincare` },
        { label: "Retail", href: `${BASE}/business/industries/retail` },
        { label: "Ecommerce", href: `${BASE}/business/solutions/ecommerce` },
        { label: "Interior Design", href: `${BASE}/business/industries/interior-design-ai` },
      ],
    },
  ],
  [
    {
      heading: "Get Started",
      links: [
        { label: "Pricing", href: `${BASE}/subscription` },
        { label: "Contact Us", contactSales: true },
      ],
    },
    {
      heading: "Community",
      links: [
        { label: "Creators Program", href: `${BASE}/creators-program` },
        { label: "Affiliate Program", href: `${BASE}/affiliate-program` },
        { label: "Ambassadors Program", href: `${BASE}/ambassadors` },
        { label: "ImagineArt Academy", href: "https://academy.imagine.art/" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: `${BASE}/insights` },
        { label: "Announcements", href: `${BASE}/announcements` },
        { label: "Case Studies", href: `${BASE}/business/case-studies` },
        { label: "Agency Program", href: `${BASE}/agency-program` },
        { label: "Help Docs", href: "https://docs.imagine.art/" },
        { label: "Careers", href: `${BASE}/careers` },
      ],
    },
  ],
];

export const FOOTER_COMMUNITY: FooterCommunityLink[] = [
  { label: "Discord", href: "https://discord.com/invite/z7kjUyvAbv", path: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.03.05a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" },
  { label: "Twitter / X", href: "https://x.com/Imagineart_x", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.432-8.5L2.25 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Instagram", href: "https://www.instagram.com/imagineartofficial", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  { title: "Facebook", href: "https://www.facebook.com/groups/imagineai", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { title: "Twitter / X", href: "https://x.com/Imagineart_x", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.432-8.5L2.25 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { title: "Discord", href: "https://discord.com/invite/z7kjUyvAbv", path: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.03.05a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" },
  { title: "Instagram", href: "https://www.instagram.com/imagineartofficial", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { title: "YouTube", href: "https://www.youtube.com/@imagineartofficial", path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" },
  { title: "Reddit", href: "https://www.reddit.com/r/ImagineAiArt/", path: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" },
];
