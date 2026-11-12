import type { NavGroup, NavPanel } from "../Navbar.types";

export type MenuContentProps = {
  panel?: NavPanel;
  groups?: NavGroup[];
  onNavigate: () => void;
};
