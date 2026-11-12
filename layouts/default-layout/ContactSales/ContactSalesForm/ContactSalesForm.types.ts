export type ContactSalesValues = Record<string, string>;

export type ContactSalesField = {
  name: string;
  label: string;
  kind: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  optional?: boolean;
  options?: { label: string; value: string }[];
  wide?: boolean;
};

export type ContactSalesStep = {
  fields: ContactSalesField[];
};

export type DialCodeOption = {
  region: string;
  label: string;
  code: string;
};

export type ContactSalesErrors = Record<string, string>;

export type HubspotSubmissionContext = {
  pageUri: string;
  pageName: string;
  hutk?: string;
};

export type HubspotSubmission = {
  fields: { name: string; value: string }[];
  context: HubspotSubmissionContext;
};

export type HubspotErrorResponse = {
  errors?: { message?: string; errorType?: string }[];
};

export type ContactSalesStatus = "idle" | "sending" | "done" | "failed";

export type ContactSalesBooking = {
  href: string;
  lede: string;
};

export type ContactSalesFormProps = {
  idPrefix: string;
  tone?: "light" | "dark";
  compact?: boolean;
};
