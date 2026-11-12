import { COUNTRIES } from "./ContactSalesOptions.constants";
import type { ContactSalesStep } from "./ContactSalesForm.types";

const option = (value: string) => ({ label: value, value });

export const CONTACT_SALES_STEPS: ContactSalesStep[] = [
  {
    fields: [
      { name: "firstname", label: "First name", kind: "text", placeholder: "John" },
      { name: "lastname", label: "Last name", kind: "text", placeholder: "Doe" },
      { name: "company", label: "Company name", kind: "text", placeholder: "ImagineArt" },
      { name: "jobtitle", label: "Job title", kind: "text", placeholder: "VP of Marketing" },
      { name: "email", label: "Business email", kind: "email", placeholder: "john@imagine.art" },
      { name: "country_select", label: "Country", kind: "select", options: COUNTRIES.map(option) },
      { name: "phone", label: "Phone number", kind: "tel", placeholder: "555 123 4567", optional: true },
      {
        name: "best_time_to_call",
        label: "Best time to call",
        kind: "select",
        options: ["Morning (9am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)", "Any time"].map(option),
        optional: true,
      },
    ],
  },
  {
    fields: [
      {
        name: "company_size_",
        label: "Company size",
        kind: "select",
        options: ["2-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10,000"].map(option),
      },
      {
        name: "what_do_you_need_assistance_with",
        label: "What are you interested in?",
        kind: "select",
        options: [
          option("Team Plans / Enterprise"),
          option("Platform Features"),
          { label: "Support / Billing / Other", value: "Support / Billing" },
        ],
      },
      {
        name: "industry_enterprise_form",
        label: "What best describes your company?",
        kind: "select",
        options: [
          option("Consumer Packaged Goods / FMCG"),
          option("Fashion & Apparel"),
          option("Creative / Marketing / Advertising Agency"),
          option("Furniture / Home Decor / Interior Design"),
          option("VFX / Animations & Post Production"),
          option("E-commerce / Marketplace"),
          option("Education / E-learning"),
          { label: "Gaming & Interactive Media", value: "Gaming & Metaverse" },
          option("Creator Economy / UGC Production"),
          option("Other"),
        ],
        wide: true,
      },
      {
        name: "what_would_you_use_imagineart_for",
        label: "Tell us more about your needs",
        kind: "textarea",
        placeholder: "Team size, the content you make, timelines, anything we should know.",
        wide: true,
      },
    ],
  },
];

export const HUBSPOT_SUBMISSION_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/244312374/5beeefe7-2f54-4b92-b0ef-23ddca21eebe";

export const CONTACT_SALES_AUTOCOMPLETE: Record<string, string> = {
  firstname: "given-name",
  lastname: "family-name",
  company: "organization",
  jobtitle: "organization-title",
  email: "email",
  country_select: "country-name",
  phone: "tel-national",
};

export const PHONE_CODE_FIELD = "phone_code";

export const DEFAULT_PHONE_REGION = "US";

export const PHONE_DIGITS = { min: 7, max: 20 };

export const LIVE_VALIDATION_DELAY_MS = 600;

export const FIELD_MESSAGES = {
  required: "Please complete this required field.",
  choose: "Please select an option.",
  emailFormat: "Email must be formatted correctly.",
  emailBlocked: (domain: string) => `Please enter a different email address. This form does not accept addresses from ${domain}.`,
  phone: "Please enter a valid phone number.",
};

export const HUBSPOT_FIELD_PATTERN = /fields\.([a-z0-9_]+)/i;

export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "proton.me", "protonmail.com", "pm.me", "gmx.com", "gmx.de", "gmx.net", "web.de", "mail.com",
  "yandex.com", "yandex.ru", "mail.ru", "zoho.com", "zohomail.com", "tutanota.com", "tuta.io", "fastmail.com",
  "hey.com", "qq.com", "163.com", "126.com", "rediffmail.com", "inbox.com", "hushmail.com", "gamli.com", "gmali.com",
]);

export const DEMO_INTEREST_LEDES: Record<string, string> = {
  "Team Plans / Enterprise": "Pick a time for your enterprise demo.",
  "Platform Features": "Pick a time for your platform demo.",
};

export const ENTERPRISE_DEMO_URL = "https://meetings-na2.hubspot.com/imagine-art/-enterprise-plan-demo";

export const CUSTOMER_ASSIST_URL = "https://cal.com/team/imagineart/imagineart-customer-assist";

export const ASSIST_BOOKING_LEDE = "Pick a time to talk to our team.";
