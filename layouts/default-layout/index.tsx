import { LandingAnalytics } from "@/lib/analytics/page-tracking/LandingAnalytics";
import { SiteFooter as Footer } from "./Footer/index";
import { Navbar as Navbar } from "./Navbar/index";
import type { DefaultLayoutProps } from "./default-layout.types";

export function DefaultLayout({ children, mode = "light" }: DefaultLayoutProps) {
  return (
    <>
      <LandingAnalytics />
      <Navbar mode={mode} />
      {children}
      <Footer />
    </>
  );
}
