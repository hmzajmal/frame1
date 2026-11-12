export type NavbarMode = "dark" | "light";
export type PageTheme = NavbarMode;

export type NavBadgeTone = "new";

export type NavLink = { label: string; href: string };

export type NavItem = {
  title: string;
  description?: string;
  href?: string;
  badge?: string;
  badgeTone?: NavBadgeTone;
  links?: NavLink[];
};

export type NavGroup = {
  heading?: string;
  headingHidden?: boolean;
  items?: NavItem[];
  links?: NavLink[];
  more?: NavLink;
};

export type NavColumn = {
  groups: NavGroup[];
  width?: "wide" | "narrow";
  divider?: boolean;
};

export type NavCardMedia =
  | { kind: "image"; src: string }
  | { kind: "fan"; srcs: [string, string, string] }
  | { kind: "split"; srcs: [string, string] };

export type NavCard =
  | { kind: "tile"; src: string; alt: string; href: string }
  | {
      kind: "card";
      title?: string;
      body?: string;
      badge?: string;
      cta: NavLink;
      media: NavCardMedia;
      surface?: "tint" | "muted";
    };

export type NavBarLink = { label: string; href?: string; marks: string[] };

export type NavBar = { title: string; links: NavBarLink[] };

export type NavStory = { href: string; image: string; imageZoom?: number; company: string; result: string };

export type NavStories = { heading: string; all: { label: string; href: string }; items: NavStory[] };

export type NavPanel = { columns: NavColumn[]; cards?: NavCard[]; bar?: NavBar; stories?: NavStories };

export type NavEntry = { label: string; href?: string; panel?: NavPanel };

export type NavbarProps = {
  mode?: NavbarMode;
};

export type NavbarPanelPosition = { label: string; left: number };
