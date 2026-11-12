export type FooterLink = { label: string; href?: string; underline?: boolean; soon?: boolean; contactSales?: boolean };

export type FooterLinkItemProps = { link: FooterLink };

export type FooterSection = { heading: string; links: FooterLink[] };

export type FooterColumn = FooterSection[];

export type FooterSocial = { title: string; href: string; path: string };

export type FooterCommunityLink = { label: string; href: string; path: string };
