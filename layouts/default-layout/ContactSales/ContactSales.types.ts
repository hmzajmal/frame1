export type BenefitIconName = "team" | "spark" | "shield";

export type ContactSalesBenefit = {
  strong: string;
  rest: string;
  icon: BenefitIconName;
};

export type ContactSalesPartner = {
  name: string;
  src: string;
  mask: boolean;
};

export type ContactSalesOverlayProps = {
  onClose: () => void;
};

export type BenefitIconProps = {
  name: BenefitIconName;
};

export type ContactSalesButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

export type ContactSalesPanelProps = {
  idPrefix: string;
  tone?: "light" | "dark";
};
