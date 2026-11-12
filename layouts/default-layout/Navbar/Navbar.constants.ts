import { ASSET_PATHS } from "@/lib/assets/assets.constants";
import { BOOK_A_DEMO_HREF } from "@/lib/sales-links.constants";
import type { NavEntry } from "./Navbar.types";

const IA = "https://www.imagine.art";

export const NAV_HOME = IA;

export const NAV_AUTH = "https://imagine.art/home";

export const NAV_DEMO = { label: "Book a demo", href: BOOK_A_DEMO_HREF };
export const NAV_CTA = { label: "Try it free", href: NAV_AUTH };

export const NAV: NavEntry[] = [
  {
    label: "Platform",
    panel: {
      columns: [
        {
          divider: true,
          groups: [
            {
              heading: "Product",
              items: [
                { title: "Creative Agent", description: "An agent that plans and creates", href: `${IA}/imagine-computer` },
                { title: "Workflows", description: "Canvas for content at scale", href: `${IA}/workflow` },
                { title: "MCP", description: "Connect Claude, ChatGPT, Grok", href: `${IA}/mcp` },
                { title: "Plugins", description: "Use in Photoshop, Figma, After Effects", href: `${IA}/plugins` },
                { title: "Desktop App", description: "ImagineArt in its own Mac app", href: `${IA}/desktop`, badge: "New", badgeTone: "new" },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "Studios",
              items: [
                { title: "Fashion Studio", description: "Campaign and catalogue imagery", href: `${IA}/ai-fashion-studio` },
                { title: "Ad Studio", description: "Create ads that convert", href: `${IA}/ai-ad-studio` },
                { title: "Film Studio", description: "Bring your stories to life", href: `${IA}/ai-film-studio` },
                { title: "Avatar Studio", description: "Consistent AI presenters and avatars", href: `${IA}/ai-avatar-studio`, badge: "New", badgeTone: "new" },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "AI Tools",
              items: [
                { title: "AI Art Generator", description: "Turn ideas into AI art", href: `${IA}` },
                { title: "AI Video Generator", description: "Generate AI videos", href: `${IA}/ai-video-generator` },
                { title: "AI Image Generator", description: "Generate AI images", href: `${IA}/ai-image-generator` },
                { title: "AI Video Editor", description: "Edit and enhance AI videos", href: `${IA}/ai-video-editor` },
                { title: "AI Image Editor", description: "Edit and enhance AI images", href: `${IA}/apps/ai-image-editor` },
                { title: "Audio", description: "Music, voice and sound effects", href: `${IA}/audio-studio` },
                { title: "AI Influencer", description: "Create and grow AI influencers", href: `${IA}/ai-influencer`, badge: "New", badgeTone: "new" },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "AI Tools",
              headingHidden: true,
              items: [
                { title: "AI Hairstyle Changer", description: "Try new hairstyles on any photo", href: `${IA}/apps/ai-hairstyle-changer` },
                { title: "AI Age Progression", description: "See any face younger or older", href: `${IA}/apps/ai-age-progression` },
                { title: "Video Object Removal", description: "Erase objects from any video", href: `${IA}/apps/video-object-removal` },
                { title: "Background Remover", description: "Remove image backgrounds in one click", href: `${IA}/bg-remover` },
                { title: "Upscale", description: "Boost image or video quality", href: `${IA}/edit/upscale` },
                { title: "Video Recolor", description: "Apply a color grade to any video", href: `${IA}/apps/video-recolor` },
              ],
              more: { label: "All AI tools", href: `${IA}/tools` },
            },
          ],
        },
      ],
      bar: {
        title: "Use ImagineArt everywhere you create",
        links: [
          { label: "MCP", href: `${IA}/mcp`, marks: [ASSET_PATHS.shared.navClaude, ASSET_PATHS.shared.navChatgpt] },
          { label: "Plugins", href: `${IA}/plugins`, marks: [ASSET_PATHS.shared.navAftereffects, ASSET_PATHS.shared.navFigma] },
          { label: "Extensions", href: "https://chromewebstore.google.com/detail/imagineart/cimlkemminoobnamlheobhnghepobcff", marks: ["chrome"] },
          { label: "iOS", href: "https://apps.apple.com/us/app/imagineart-ai-video-generator/id1664121419", marks: ["apple"] },
          { label: "Android", href: "https://play.google.com/store/apps/details?id=com.vyroai.aiart&hl=en", marks: ["android"] },
        ],
      },
      cards: [
        {
          kind: "card",
          surface: "tint",
          title: "AI Models",
          body: "Seedance 2.5, GPT Image 2.5, Kling 4 and 50+ more.",
          cta: { label: "Explore Models", href: `${IA}/models` },
          media: { kind: "image", src: ASSET_PATHS.shared.navPlatformTeams },
        },
      ],
    },
  },
  {
    label: "Enterprise",
    panel: {
      columns: [
        {
          divider: true,
          groups: [
            {
              heading: "Business",
              items: [
                { title: "Enterprise", description: "Security and control at scale", href: `${IA}/business` },
                { title: "Case Studies", description: "Results from real teams", href: `${IA}/business/case-studies` },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "Solutions",
              items: [
                { title: "Fashion and Apparel", description: "Lookbooks, catalogs and films", href: `${IA}/business/industries/fashion` },
                { title: "Real Estate", description: "Listings, tours and staged rooms", href: `${IA}/business/industries/real-estate` },
                { title: "Food and Beverage", description: "Appetizing food and drink visuals", href: `${IA}/business/industries/ai-for-fb-creatives` },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "Solutions",
              headingHidden: true,
              items: [
                { title: "Education", description: "Course visuals and explainers", href: `${IA}/business/industries/education` },
                { title: "Automotive", description: "Launch films and ads that sell", href: `${IA}/business/industries/automotive` },
                { title: "Beauty", description: "Campaigns at the category's pace", href: `${IA}/business/industries/beauty-and-skincare` },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "Solutions",
              headingHidden: true,
              items: [
                { title: "Retail", description: "Promos for every store and season", href: `${IA}/business/industries/retail` },
                { title: "Ecommerce", description: "Listing-ready images and motion", href: `${IA}/business/solutions/ecommerce` },
                { title: "Interior Design", description: "Every piece in a styled room", href: `${IA}/business/industries/interior-design-ai` },
              ],
            },
          ],
        },
      ],
      stories: {
        heading: "Featured case studies",
        all: { label: "View all", href: `${IA}/business/case-studies` },
        items: [
          { href: `${IA}/business/case-studies/unilever`, image: ASSET_PATHS.business.caseStudies.unilever, imageZoom: 2.3, company: "Unilever", result: "10x higher output volume" },
          { href: `${IA}/business/case-studies/buzz-lab`, image: ASSET_PATHS.business.caseStudies.buzzLab, company: "Buzz Lab", result: "60x output in the same window" },
          { href: `${IA}/business/case-studies/framon`, image: ASSET_PATHS.business.caseStudies.framon, company: "Framon Group", result: "Production time cut in half" },
        ],
      },
    },
  },
  {
    label: "Resources",
    panel: {
      columns: [
        {
          groups: [
            {
              heading: "Resources",
              items: [
                { title: "Blog", description: "Tutorials, tips and AI trends", href: `${IA}/insights` },
                { title: "Announcements", description: "Launches and product updates", href: `${IA}/announcements` },
                { title: "Case Studies", description: "Results from real teams", href: `${IA}/business/case-studies` },
                { title: "Agency Program", description: "Partner with ImagineArt as an agency", href: `${IA}/agency-program` },
                { title: "Careers", description: "Join the team building ImagineArt", href: `${IA}/careers` },
              ],
            },
          ],
        },
        {
          groups: [
            {
              heading: "Community",
              items: [
                { title: "Creators Program", description: "Get rewarded for your work", href: `${IA}/creators-program` },
                { title: "Affiliate Program", description: "Earn by referring creators", href: `${IA}/affiliate-program` },
                { title: "Ambassadors Program", description: "Represent ImagineArt", href: `${IA}/ambassadors` },
                { title: "ImagineArt Academy", description: "Courses on creating with AI", href: "https://academy.imagine.art/" },
              ],
            },
          ],
        },
      ],
    },
  },
  { label: "Pricing", href: `${IA}/subscription` },
];

export const NAVBAR_ITEMS = NAV;
export const NAV_ORIGIN = IA;
export const NAV_SIGN_IN = NAV_DEMO.href;

export const linkProps = (target?: string) => target === "_blank"
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};
