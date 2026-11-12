"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ANALYTIC_EVENTS } from "@/lib/analytics/events/events";
import { useAnalyticsContext } from "@/lib/analytics/core/use-analytics-context";
import {
  ASSIST_BOOKING_LEDE,
  CONTACT_SALES_AUTOCOMPLETE,
  CONTACT_SALES_STEPS,
  CUSTOMER_ASSIST_URL,
  DEFAULT_PHONE_REGION,
  DEMO_INTEREST_LEDES,
  ENTERPRISE_DEMO_URL,
  FIELD_MESSAGES,
  FREE_EMAIL_DOMAINS,
  HUBSPOT_FIELD_PATTERN,
  HUBSPOT_SUBMISSION_URL,
  LIVE_VALIDATION_DELAY_MS,
  PHONE_CODE_FIELD,
  PHONE_DIGITS,
} from "./ContactSalesForm.constants";
import { COUNTRY_REGION_ALIASES, DIAL_CODE_OPTIONS, DIAL_CODES, HUBSPOT_TIME_ZONES } from "./ContactSalesOptions.constants";
import type {
  ContactSalesBooking,
  ContactSalesErrors,
  ContactSalesField,
  ContactSalesStatus,
  ContactSalesValues,
  DialCodeOption,
  HubspotErrorResponse,
  HubspotSubmission,
} from "./ContactSalesForm.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "None";
}

function readCampaignParameter(name: string): string {
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

function getPhoneRegion(values: ContactSalesValues, dialCodes: DialCodeOption[]): string {
  if (values[PHONE_CODE_FIELD]) return values[PHONE_CODE_FIELD];

  const country = values.country_select;
  if (country && COUNTRY_REGION_ALIASES[country]) return COUNTRY_REGION_ALIASES[country];
  const match = country && dialCodes.find((option) => option.label.startsWith(`${country} (`));
  return match ? match.region : DEFAULT_PHONE_REGION;
}

function getHubspotTimeZone(): string {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const value = zone.toLowerCase().replace(/\//g, "_slash_").replace(/-/g, "_hyphen_");
    return HUBSPOT_TIME_ZONES.has(value) ? value : "";
  } catch {
    return "";
  }
}

const ALL_FIELDS = CONTACT_SALES_STEPS.flatMap((step) => step.fields);

function getFormatError(field: ContactSalesField, value: string): string | undefined {
  if (field.kind === "email") {
    if (!EMAIL_PATTERN.test(value)) return FIELD_MESSAGES.emailFormat;
    const domain = value.split("@").pop()?.toLowerCase() ?? "";
    if (FREE_EMAIL_DOMAINS.has(domain)) return FIELD_MESSAGES.emailBlocked(domain);
  }
  if (field.kind === "tel") {
    const digits = value.replace(/\D/g, "").length;
    if (digits < PHONE_DIGITS.min || digits > PHONE_DIGITS.max || /[^\d\s()+.-]/.test(value)) return FIELD_MESSAGES.phone;
  }
  return undefined;
}

function getFieldError(field: ContactSalesField, rawValue: string | undefined): string | undefined {
  const value = (rawValue ?? "").trim();
  if (!value) return field.optional ? undefined : field.kind === "select" ? FIELD_MESSAGES.choose : FIELD_MESSAGES.required;
  return getFormatError(field, value);
}

function getFieldErrors(values: ContactSalesValues, stepIndex: number): ContactSalesErrors {
  const errors: ContactSalesErrors = {};

  CONTACT_SALES_STEPS[stepIndex].fields.forEach((field) => {
    const error = getFieldError(field, values[field.name]);
    if (error) errors[field.name] = error;
  });

  return errors;
}

function getHubspotFieldErrors(body: HubspotErrorResponse, values: ContactSalesValues): ContactSalesErrors {
  const errors: ContactSalesErrors = {};

  body.errors?.forEach(({ message = "", errorType = "" }) => {
    const name = message.match(HUBSPOT_FIELD_PATTERN)?.[1];
    const field = ALL_FIELDS.find((candidate) => candidate.name === name);
    if (!field || errors[field.name]) return;

    const value = (values[field.name] ?? "").trim();
    if (errorType === "BLOCKED_EMAIL") errors[field.name] = FIELD_MESSAGES.emailBlocked(value.split("@").pop() ?? "this domain");
    else if (errorType === "REQUIRED_FIELD") errors[field.name] = field.kind === "select" ? FIELD_MESSAGES.choose : FIELD_MESSAGES.required;
    else errors[field.name] = getFormatError(field, value) ?? (field.kind === "email" ? FIELD_MESSAGES.emailFormat : FIELD_MESSAGES.required);
  });

  return errors;
}

function getSubmittedValues(values: ContactSalesValues, phoneRegion: string): ContactSalesValues {
  const submitted: ContactSalesValues = {};

  CONTACT_SALES_STEPS.forEach((step) =>
    step.fields.forEach((field) => {
      const value = (values[field.name] ?? "").trim();
      if (!value) return;
      submitted[field.name] = field.kind === "tel" ? `+${DIAL_CODES[phoneRegion]} ${value}` : value;
    }),
  );

  return submitted;
}

function getHubspotSubmission(values: ContactSalesValues): HubspotSubmission {
  const pageUri = window.location.href;
  const pageName = document.title;
  const firstPageView = readCookie("first_page_view");
  const fields = [
    ...Object.entries(values).map(([name, value]) => ({ name, value })),
    { name: "hs_timezone", value: getHubspotTimeZone() },
    { name: "first_page_view", value: firstPageView === "None" ? "" : firstPageView },
    { name: "product_line", value: "ImagineArt" },
    { name: "pagename", value: pageName },
    { name: "sourcepage", value: pageUri },
    { name: "utmsource", value: readCampaignParameter("utm_source") },
    { name: "utmmedium", value: readCampaignParameter("utm_medium") },
    { name: "utmcampaign", value: readCampaignParameter("utm_campaign") },
    { name: "utmterm", value: readCampaignParameter("utm_term") },
  ].filter((field) => field.value);
  const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];

  return {
    fields,
    context: {
      pageUri,
      pageName,
      ...(hutk ? { hutk } : {}),
    },
  };
}

function getBooking(values: ContactSalesValues): ContactSalesBooking {
  const query = new URLSearchParams();

  const demoLede = DEMO_INTEREST_LEDES[values.what_do_you_need_assistance_with];
  if (demoLede) {
    Object.entries(values).forEach(([name, value]) => query.set(name, value));
    return { href: `${ENTERPRISE_DEMO_URL}?${query}`, lede: demoLede };
  }

  const name = [values.firstname, values.lastname].map((part) => part?.trim()).filter(Boolean).join(" ");
  if (name) query.set("name", name);
  if (values.email?.trim()) query.set("email", values.email.trim());
  return { href: `${CUSTOMER_ASSIST_URL}?${query}`, lede: ASSIST_BOOKING_LEDE };
}

export function useContactSalesForm() {
  const { aggregator } = useAnalyticsContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<ContactSalesValues>({});
  const [errors, setErrors] = useState<ContactSalesErrors>({});
  const [status, setStatus] = useState<ContactSalesStatus>("idle");
  const dialCodes = DIAL_CODE_OPTIONS;
  const phoneRegion = getPhoneRegion(values, dialCodes);
  const submittedValues = getSubmittedValues(values, phoneRegion);
  const isLastStep = stepIndex === CONTACT_SALES_STEPS.length - 1;
  const liveTimers = useRef<Record<string, number>>({});

  useEffect(() => {
    const timers = liveTimers.current;
    return () => Object.values(timers).forEach((timer) => window.clearTimeout(timer));
  }, []);

  const setFieldError = (name: string, error: string | undefined) => {
    setErrors((current) => {
      if (current[name] === error) return current;
      const nextErrors = { ...current };
      if (error) nextErrors[name] = error;
      else delete nextErrors[name];
      return nextErrors;
    });
  };

  // Format checks (email, phone) run as people type, after a short pause; empty fields wait for Continue.
  const validateLive = (name: string, value: string) => {
    const field = ALL_FIELDS.find((candidate) => candidate.name === name);
    if (!field || (field.kind !== "email" && field.kind !== "tel")) return;
    const trimmed = value.trim();
    setFieldError(name, trimmed ? getFormatError(field, trimmed) : undefined);
  };

  const updateValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setFieldError(name, undefined);
    if (status === "failed") setStatus("idle");

    window.clearTimeout(liveTimers.current[name]);
    liveTimers.current[name] = window.setTimeout(() => validateLive(name, value), LIVE_VALIDATION_DELAY_MS);
  };

  const validateOnBlur = (name: string) => {
    window.clearTimeout(liveTimers.current[name]);
    validateLive(name, values[name] ?? "");
  };

  const submitToHubspot = async () => {
    setStatus("sending");

    try {
      const response = await fetch(HUBSPOT_SUBMISSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getHubspotSubmission(submittedValues)),
      });

      if (!response.ok) {
        const body: HubspotErrorResponse = await response.json().catch(() => ({}));
        const fieldErrors = getHubspotFieldErrors(body, values);
        const firstField = Object.keys(fieldErrors)[0];
        if (!firstField) {
          setStatus("failed");
          return;
        }

        setErrors(fieldErrors);
        setStatus("idle");
        setStepIndex(CONTACT_SALES_STEPS.findIndex((step) => step.fields.some((field) => field.name === firstField)));
        return;
      }

      setStatus("done");
    } catch {
      setStatus("failed");
      return;
    }

    // Analytics never decides the outcome: the lead is already in HubSpot.
    try {
      const pageName = window.location.pathname;
      let source = "";
      try {
        source = sessionStorage.getItem("source") ?? "";
      } catch {}

      aggregator.log(
        ANALYTIC_EVENTS.enterprise_form_submit.withProperties({
          page_name: pageName,
          source,
          first_page_view: readCookie("first_page_view"),
          user_account_status: "Free",
          user_plan: "Free",
          user_plan_period: "Free",
          distinct_id: "",
          name_form: [values.firstname, values.lastname].filter(Boolean).join(" "),
          email_form: values.email ?? "",
          company_name_form: values.company ?? "",
          company_web_form: "",
          country_form: values.country_select ?? "",
          country_ip_form: readCookie("country_code"),
          company_size_form: values.company_size_ ?? "",
          industry_type_form: values.industry_enterprise_form ?? "",
          monthly_volume: "",
          question_form: values.what_would_you_use_imagineart_for ?? "",
          help_us_understand_your_needs: values.what_would_you_use_imagineart_for ?? "",
          utm_medium: readCampaignParameter("utm_medium"),
          utm_campaign: readCampaignParameter("utm_campaign"),
          utm_term: readCampaignParameter("utm_term"),
          utm_source: readCampaignParameter("utm_source"),
        }),
      );
    } catch {}
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = getFieldErrors(values, stepIndex);
    setErrors(nextErrors);
    const firstInvalidField = Object.keys(nextErrors)[0];

    if (firstInvalidField) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    if (isLastStep) {
      void submitToHubspot();
      return;
    }

    setStepIndex((current) => current + 1);
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((current) => Math.max(0, current - 1));
  };

  return {
    autocomplete: CONTACT_SALES_AUTOCOMPLETE,
    booking: status === "done" ? getBooking(submittedValues) : null,
    dialCodes,
    firstName: (values.firstname ?? "").trim(),
    errors,
    formRef,
    handleSubmit,
    isLastStep,
    goBack,
    validateOnBlur,
    phoneRegion,
    status,
    step: CONTACT_SALES_STEPS[stepIndex],
    stepIndex,
    stepCount: CONTACT_SALES_STEPS.length,
    updateValue,
    values,
  };
}
