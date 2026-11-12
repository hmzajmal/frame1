import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type NavButtonVariant = "primary" | "secondary" | "white";

export type NavButtonTone = "light" | "dark";

export type NavButtonSize = "md" | "lg";

export type NavButtonProps = {
  variant?: NavButtonVariant;
  size?: NavButtonSize;
  tone?: NavButtonTone;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
