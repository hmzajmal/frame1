import type { NavbarMode } from "../Navbar.types";

export type MobileMenuProps = {
  mode: NavbarMode;
  openRow: string | null;
  onClose: () => void;
  onToggleRow: (label: string) => void;
};
