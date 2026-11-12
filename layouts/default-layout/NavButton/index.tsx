import "./NavButton.css";
import type { NavButtonProps } from "./NavButton.types";

export function NavButton({ variant = "primary", size = "md", tone, children, ...rest }: NavButtonProps) {
  return (
    <a className={`nav-btn ${variant === "primary" ? "nav-cta" : variant === "white" ? "nav-signin nav-white" : "nav-signin"}`} data-tone={tone} data-size={size} {...rest}>
      {children}
    </a>
  );
}
