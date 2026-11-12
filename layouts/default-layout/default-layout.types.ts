import type { ReactNode } from "react";
import type { NavbarMode } from "./Navbar/Navbar.types";

export type DefaultLayoutProps = {
  children: ReactNode;
  mode?: NavbarMode;
};
