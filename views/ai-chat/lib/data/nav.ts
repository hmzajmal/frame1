// Header (nav) + footer content, hardcoded from imagine-web's live production
// Firebase Remote Config export (`navItems` / `footerData`). No Remote Config
// integration here — this is a static snapshot, read verbatim. See
// ../../../../prod-header-new.json and ../../../../prod-footer-new.json for
// the source of truth this was transcribed from.

import { TALK_TO_SALES_HREF } from "@/lib/sales-links.constants";

export type NavRow = {
  name: string;
  href: string;
  target: "_self" | "_blank";
  description?: string;
  iconSrc?: string;
};

export type NavColumn = {
  title?: string;
  headingHref?: string;
  description?: string;
  rows: NavRow[];
};

export type FlatNavItem = {
  kind: "flat";
  id: string;
  name: string;
  href: string;
  target: "_self" | "_blank";
};

export type NestedNavItem = {
  kind: "nested";
  id: string;
  name: string;
  firstColumn: NavColumn;
  remainingColumns: NavColumn[];
};

export type NavItem = FlatNavItem | NestedNavItem;

const BASE = "https://www.imagine.art";

export const NAV_ITEMS: NavItem[] = [
  {
    kind: "flat",
    id: "blogNavLink",
    name: "Blog",
    href: `${BASE}/insights`,
    target: "_self",
  },
  {
    kind: "nested",
    id: "toolNavLink",
    name: "Tools",
    firstColumn: {
      title: "Editing Tools",
      rows: [
        {
          name: "AI Image Editor",
          href: `${BASE}/apps/ai-image-editor`,
          target: "_self",
          description: "Edit, retouch, and transform images with AI tools.",
          iconSrc:
            '<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M6.34078 15.9088H10.6608C14.2608 15.9088 15.7008 14.4688 15.7008 10.8688V6.54879C15.7008 2.94879 14.2608 1.50879 10.6608 1.50879H6.34078C2.74078 1.50879 1.30078 2.94879 1.30078 6.54879V10.8688C1.30078 14.4688 2.74078 15.9088 6.34078 15.9088Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.41278 7.64319C6.41278 6.26799 7.38478 5.71359 8.57278 6.39759L10.416 7.46319C11.604 8.14719 11.604 9.27039 10.416 9.95439L8.57278 11.02C7.38478 11.704 6.41278 11.1424 6.41278 9.77439V7.64319Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        },
        {
          name: "Kling AI Motion Control",
          href: `${BASE}/apps/motion-control`,
          target: "_self",
          description: "Add dynamic motion to static images with AI-powered animation controls.",
          iconSrc:
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.8627 9.98495C12.8627 8.41745 11.5952 7.14245 10.0202 7.14245M9.22476 2.5H7.72476C3.97476 2.5 2.47476 4 2.47476 7.75V12.25C2.47476 16 3.97476 17.5 7.72476 17.5H12.2248C15.9748 17.5 17.4748 16 17.4748 12.25V10.75M10.5825 11.8675C10.5825 12.5275 10.3275 13.1575 9.85504 13.6375C9.48754 14.005 8.99254 14.26 8.40004 14.335L6.92254 14.4925C6.12004 14.5825 5.43004 13.9 5.52004 13.0825L5.67754 11.605C5.82004 10.2925 6.91504 9.45248 8.08504 9.42998C8.20504 9.42248 8.32504 9.42998 8.44504 9.43748C8.95504 9.50498 9.45004 9.73748 9.86254 10.15C10.2675 10.555 10.4925 11.02 10.56 11.5225C10.575 11.6425 10.5825 11.7625 10.5825 11.8675ZM17.4078 3.67017C16.4853 5.97266 14.1678 9.10766 12.2328 10.6602L11.0478 11.6052C10.8978 11.7177 10.7478 11.8077 10.5753 11.8752C10.5753 11.7627 10.5678 11.6502 10.5528 11.5302C10.4853 11.0277 10.2603 10.5552 9.85529 10.1577C9.44279 9.74516 8.94779 9.51266 8.43779 9.44516C8.31779 9.43766 8.19779 9.43016 8.07779 9.43766C8.14529 9.25016 8.24279 9.07766 8.37029 8.93516L9.31529 7.75016C10.8678 5.81516 14.0103 3.48267 16.3053 2.56017C16.6578 2.42517 17.0028 2.53017 17.2203 2.74767C17.4453 2.97267 17.5503 3.31767 17.4078 3.67017Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        },
      ],
    },
    remainingColumns: [
      {
        title: "AI Image Generator",
        headingHref: `${BASE}/ai-image-generator`,
        rows: [
          { name: "BG Remover", href: `${BASE}/bg-remover`, target: "_self" },
          { name: "AI Image Combiner", href: `${BASE}/apps/image-combiner`, target: "_self" },
          { name: "AI Image Face Swap", href: `${BASE}/apps/face-swap`, target: "_self" },
          { name: "AI Image Replace", href: `${BASE}/apps/ai-replace`, target: "_self" },
        ],
      },
      {
        title: "AI Video Generator",
        headingHref: `${BASE}/ai-video-generator`,
        rows: [
          { name: "AI Heygen Avatar", href: `${BASE}/apps/heygen-avatar`, target: "_self" },
          { name: "AI Video Object Removal", href: `${BASE}/apps/video-object-removal`, target: "_self" },
          { name: "AI Video Recolor", href: `${BASE}/apps/video-recolor`, target: "_self" },
          { name: "AI Video background Changer", href: `${BASE}/apps/video-background-changer`, target: "_self" },
          { name: "AI Video Editor", href: `${BASE}/ai-video-editor`, target: "_self" },
        ],
      },
    ],
  },
  {
    kind: "nested",
    id: "communityNavLink",
    name: "Community",
    firstColumn: {
      title: "Connect",
      description:
        "Unlock the future of creativity with our Generative AI community—where art, video, and images are born from the power of AI imagination!",
      rows: [],
    },
    remainingColumns: [
      {
        rows: [
          {
            name: "Discord",
            href: "https://discord.com/invite/z7kjUyvAbv",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.852 14.17c0 .833 1.223 2.5 1.63 2.5 1.223 0 2.31-1.39 2.854-2.5.544-1.39.408-4.862-1.223-9.584-1.188-.846-2.446-1.117-3.668-1.25l-.793 1.602a9.504 9.504 0 0 0-3.304 0l-.795-1.602c-1.223.133-2.48.404-3.668 1.25-1.63 4.722-1.767 8.194-1.223 9.583.544 1.111 1.63 2.5 2.853 2.5.408 0 1.63-1.666 1.63-2.5m-1.222-.416c2.853.833 5.299.833 8.152 0m-7.337-3.75c0 .22.086.433.239.589a.807.807 0 0 0 1.153 0 .843.843 0 0 0 0-1.179.806.806 0 0 0-1.153 0 .843.843 0 0 0-.239.59Zm4.891 0c0 .22.086.433.24.589a.806.806 0 0 0 1.152 0 .843.843 0 0 0 0-1.179.807.807 0 0 0-1.153 0 .843.843 0 0 0-.239.59Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
          {
            name: "Facebook",
            href: "https://www.facebook.com/groups/imagineai",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.71 2.5h-2.25a3.75 3.75 0 0 0-3.75 3.75V8.5H5.46v3h2.25v6h3v-6h2.25l.75-3h-3V6.25a.75.75 0 0 1 .75-.75h2.25v-3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
          {
            name: "Instagram",
            href: "https://www.instagram.com/imagineartofficial",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.753 6.253v.008m-10.417.408a3.333 3.333 0 0 1 3.333-3.333h6.667a3.334 3.334 0 0 1 3.333 3.333v6.667a3.334 3.334 0 0 1-3.333 3.333H6.669a3.333 3.333 0 0 1-3.333-3.333V6.669Zm4.167 3.334a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
        ],
      },
      {
        rows: [
          {
            name: "Pinterest",
            href: "https://www.pinterest.com/imagineart_/_created/",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.23 1.664c-4.638 0-7.105 2.927-7.105 6.12 0 1.48.84 3.325 2.184 3.91.204.091.316.053.361-.134.04-.141.217-.824.303-1.146a.291.291 0 0 0-.072-.29C5.454 9.618 5.1 8.69 5.1 7.823c0-2.227 1.797-4.388 4.855-4.388 2.645 0 4.495 1.692 4.495 4.112 0 2.734-1.47 4.626-3.379 4.626-1.057 0-1.844-.817-1.594-1.827.301-1.204.893-2.497.893-3.365 0-.778-.447-1.422-1.358-1.422-1.076 0-1.949 1.049-1.949 2.457 0 .895.322 1.5.322 1.5l-1.262 5.024c-.335 1.338.045 3.506.078 3.693.02.103.138.135.203.05.105-.135 1.391-1.942 1.752-3.249.13-.476.67-2.406.67-2.406.354.63 1.377 1.158 2.466 1.158 3.241 0 5.583-2.805 5.583-6.286-.012-3.338-2.912-5.835-6.645-5.835Z" fill="currentColor"/></svg>',
          },
          {
            name: "Reddit",
            href: "https://www.reddit.com/r/ImagineAiArt/",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.306 7.264c2.08 0 3.95.65 5.244 1.681a1.964 1.964 0 0 1 1.828 3.426c0 2.82-3.167 5.106-7.071 5.106-3.83 0-6.95-2.2-7.07-4.944l-.787-.162a1.964 1.964 0 0 1 1.828-3.426C5.57 7.914 7.44 7.265 9.52 7.265h.785Zm0 0 .786-3.928 4.714.786M8.735 14.335a3.49 3.49 0 0 0 1.571.393 3.49 3.49 0 0 0 1.571-.393M15.02 4.122a.786.786 0 1 0 1.571 0 .786.786 0 0 0-1.571 0Zm-6.678 7.07a.393.393 0 1 1-.786 0 .393.393 0 0 1 .786 0Zm4.714 0a.393.393 0 1 1-.786 0 .393.393 0 0 1 .786 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
          {
            name: "Snapchat",
            href: "https://snapchat.com/add/imagine.art1",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 14.286c-1.593-.797-2.199-1.593-2.698-2.39-.238-.378-.3-.494-.374-.932l2.296-1.47a1.55 1.55 0 1 0-1.777-2.536l-.661.505v-.677a4.286 4.286 0 0 0-8.572 0v.677l-.66-.505a1.55 1.55 0 1 0-1.778 2.536l2.296 1.47c-.073.438-.136.554-.373.933-.5.796-1.106 1.592-2.699 2.389 1.071 0 2.893.75 3.75 1.607C7.321 16.964 8.393 17.5 10 17.5c1.607 0 2.679-.536 3.75-1.607.857-.857 2.679-1.607 3.75-1.607Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
        ],
      },
      {
        rows: [
          {
            name: "Twitter",
            href: "https://x.com/ImagineArt_X",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="m3.336 16.67 5.64-5.64m2.05-2.05 5.643-5.644m-13.333 0 9.777 13.333h3.556L6.892 3.336H3.336Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
          {
            name: "YouTube",
            href: "https://www.youtube.com/@imagineartofficial",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="m9.46 7.747 2.25 1.35c.81.54.81 1.35 0 1.89l-2.25 1.35c-.9.54-1.62.09-1.62-.9v-2.7c0-1.17.72-1.53 1.62-.99Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 17.197h-9c-2.7 0-4.5-1.8-4.5-4.5v-5.4c0-2.7 1.8-4.5 4.5-4.5h9c2.7 0 4.5 1.8 4.5 4.5v5.4c0 2.7-1.8 4.5-4.5 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
          {
            name: "WhatsApp",
            href: "https://chat.whatsapp.com/G5uXKiRk0RL5frRJ8oB5Xl",
            target: "_blank",
            iconSrc:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.375 12.136a.858.858 0 0 1-.085.368 1.524 1.524 0 0 1-.784.742 1.7 1.7 0 0 1-.659.129 2.82 2.82 0 0 1-1.102-.246 5.937 5.937 0 0 1-1.162-.669 9.716 9.716 0 0 1-1.11-.945 9.597 9.597 0 0 1-.942-1.103c-.277-.385-.5-.77-.663-1.151a2.839 2.839 0 0 1-.243-1.104c0-.23.04-.449.122-.651.08-.206.21-.395.388-.564.217-.212.453-.317.703-.317.095 0 .19.02.274.06a.55.55 0 0 1 .227.19l.784 1.103c.06.085.105.162.135.237a.458.458 0 0 1-.024.446 1.148 1.148 0 0 1-.189.239l-.257.266a.18.18 0 0 0-.054.135c0 .027.004.051.01.078.01.027.02.047.027.068.061.11.166.256.315.432.152.175.314.354.49.533.182.179.358.344.537.496.176.148.321.25.436.31l.061.027c.027.01.054.014.085.014.057 0 .101-.02.138-.058l.257-.253c.085-.084.166-.148.243-.189a.45.45 0 0 1 .24-.07.54.54 0 0 1 .207.043c.074.03.152.075.236.132l1.119.793c.088.06.149.132.186.216a.692.692 0 0 1 .054.263Z" stroke="currentColor" stroke-width="1.3" stroke-miterlimit="10"/><path d="M6.175 16.45A7.514 7.514 0 0 0 10 17.5c4.125 0 7.5-3.375 7.5-7.5S14.125 2.5 10 2.5 2.5 5.875 2.5 10c0 1.35.375 2.625.975 3.75l-.579 2.225a.9.9 0 0 0 1.119 1.092l2.16-.617Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          },
        ],
      },
    ],
  },
  {
    kind: "flat",
    id: "affiliate",
    name: "Affiliate",
    href: `${BASE}/affiliate-program`,
    target: "_self",
  },
  {
    kind: "flat",
    id: "apiNavLink",
    name: "API",
    href: `${BASE}/gen-api`,
    target: "_self",
  },
  {
    kind: "flat",
    id: "creatorsNavLink",
    name: "Creators",
    href: `${BASE}/creators-program`,
    target: "_blank",
  },
  {
    kind: "flat",
    id: "pricingNavLink",
    name: "Pricing",
    href: `${BASE}/subscription`,
    target: "_blank",
  },
];

export const HOME_HREF = `${BASE}/home`;

export type FooterRow = { label: string; href: string; target?: "_self" | "_blank" };
export type FooterSubSection = { heading: string; rows: FooterRow[] };
export type FooterSectionData = {
  heading: string;
  rows: FooterRow[];
  subSections?: FooterSubSection[];
};

export const FOOTER_SECTIONS: FooterSectionData[] = [
  {
    heading: "Product",
    rows: [
      { label: "Audio Studio", href: `${BASE}/audio-studio`, target: "_self" },
      { label: "AI Film Studio", href: `${BASE}/ai-film-studio`, target: "_self" },
      { label: "AI Ad Studio", href: `${BASE}/ai-ad-studio`, target: "_self" },
      { label: "Lipsync Studio", href: `${BASE}/lipsync-studio`, target: "_self" },
      { label: "AI Workflows", href: `${BASE}/workflow`, target: "_self" },
      { label: "Enterprise", href: `${BASE}/business/enterprise`, target: "_self" },
      { label: "Apps", href: `${BASE}/apps`, target: "_self" },
      { label: "API Docs", href: `${BASE}/api/home`, target: "_self" },
    ],
  },
  {
    heading: "Image",
    rows: [
      { label: "AI Image Generator", href: `${BASE}/ai-image-generator`, target: "_self" },
      { label: "GPT Image 2", href: `${BASE}/apps/gpt-image-2`, target: "_self" },
      { label: "Nano Banana 2", href: `${BASE}/apps/nano-banana-2`, target: "_self" },
      { label: "Image Upscaler", href: `${BASE}/apps/image-upscaler`, target: "_self" },
    ],
  },
  {
    heading: "Video",
    rows: [
      { label: "AI Video Editor", href: `${BASE}/ai-video-editor`, target: "_self" },
      { label: "AI Video Generator", href: `${BASE}/ai-video-generator`, target: "_self" },
      { label: "Sora 2", href: `${BASE}/apps/sora-2`, target: "_self" },
      { label: "Kling 3.0", href: `${BASE}/apps/kling-3.0`, target: "_self" },
      { label: "Pixverse v6", href: `${BASE}/apps/pixverse-v6`, target: "_self" },
    ],
  },
  {
    heading: "Resources",
    rows: [
      { label: "Blogs", href: `${BASE}/insights`, target: "_self" },
      { label: "Enterprise Resources", href: `${BASE}/business/resources`, target: "_blank" },
      { label: "Community", href: "https://discord.gg/z7kjUyvAbv", target: "_self" },
      { label: "Pricing", href: `${BASE}/subscription`, target: "_self" },
      { label: "Creator Program", href: `${BASE}/creators-program`, target: "_self" },
      { label: "Contact Sales", href: TALK_TO_SALES_HREF, target: "_self" },
    ],
    subSections: [
      {
        heading: "ImagineArt",
        rows: [
          { label: "Privacy Policy", href: `${BASE}/privacy-policy`, target: "_blank" },
          { label: "Terms & Conditions", href: `${BASE}/terms-and-conditions`, target: "_blank" },
          { label: "Help Center", href: "https://help.imagine.art/", target: "_blank" },
          { label: "About Us", href: "https://www.imagine.art/about", target: "_blank" },
        ],
      },
    ],
  },
];

export const FOOTER_SOCIALS = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/groups/imagineai",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/imagineartofficial",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    title: "Reddit",
    href: "https://www.reddit.com/r/ImagineAiArt/",
    path: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z",
  },
  {
    title: "Discord",
    href: "https://discord.com/invite/z7kjUyvAbv",
    path: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.03.05a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
];

export const FOOTER_TAGLINE = "Endless Possibilities. Just Imagine.";
