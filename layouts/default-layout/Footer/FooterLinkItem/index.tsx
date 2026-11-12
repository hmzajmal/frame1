import { ContactSalesButton } from "../../ContactSales/ContactSalesButton";
import type { FooterLinkItemProps } from "../Footer.types";

export function FooterLinkItem({ link }: FooterLinkItemProps) {
  const className = link.underline ? "is-underlined" : undefined;

  if (link.soon) {
    return <span className="site-footer-soon">{link.label}<span>Soon</span></span>;
  }

  if (link.contactSales) {
    return <ContactSalesButton label={link.label} className={className} />;
  }

  return <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{link.label}</a>;
}
