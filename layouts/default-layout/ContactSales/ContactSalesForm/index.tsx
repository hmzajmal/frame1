"use client";

import "./ContactSalesForm.css";
import { PHONE_CODE_FIELD } from "./ContactSalesForm.constants";
import { DIAL_CODES } from "./ContactSalesOptions.constants";
import { useContactSalesForm } from "./use-contact-sales-form";
import type { ContactSalesFormProps } from "./ContactSalesForm.types";

export function ContactSalesForm({ idPrefix, tone = "light", compact = false }: ContactSalesFormProps) {
  const {
    autocomplete,
    booking,
    dialCodes,
    errors,
    firstName,
    formRef,
    handleSubmit,
    isLastStep,
    goBack,
    validateOnBlur,
    phoneRegion,
    status,
    step,
    stepIndex,
    stepCount,
    updateValue,
    values,
  } = useContactSalesForm();

  if (booking) {
    return (
      <div className="csf" data-tone={tone} data-compact={compact ? "true" : undefined}>
        <div className="csf-done" role="status">
          <span className="csf-done-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="csf-title">{firstName ? `Thanks, ${firstName}` : "Thanks"}, we’ve got your details</h3>
          <p className="csf-sub">{booking.lede}</p>
          <a href={booking.href} target="_blank" rel="noopener noreferrer" className="csf-book">
            Book a call
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="csf" data-tone={tone} data-compact={compact ? "true" : undefined}>
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <h3 className="csf-title">Contact sales</h3>
        <p className="csf-sub">
          Tell us about your needs and we’ll get back to you{`. Step ${stepIndex + 1} of ${stepCount}`}
        </p>
        <div className="csf-fields" key={stepIndex}>
          {step.fields.map((field) => {
            const id = `${idPrefix}-${field.name}`;
            const error = errors[field.name];
            const commonProps = {
              id,
              name: field.name,
              value: values[field.name] ?? "",
              "aria-required": !field.optional || undefined,
              "aria-invalid": Boolean(error) || undefined,
              "aria-describedby": error ? `${id}-err` : undefined,
            };

            return (
              <div className={`csf-field${field.wide ? " csf-wide" : ""}`} key={field.name}>
                <label htmlFor={id}>
                  {field.label}
                  {!field.optional && <span className="csf-required" aria-hidden="true">*</span>}
                </label>
                {field.kind === "select" ? (
                  <div className="csf-select">
                    <select {...commonProps} onChange={(event) => updateValue(field.name, event.target.value)}>
                      <option value="" disabled={!field.optional}>Select…</option>
                      {field.options?.map((option) => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                ) : field.kind === "textarea" ? (
                  <textarea
                    {...commonProps}
                    rows={4}
                    placeholder={field.placeholder}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                  />
                ) : field.kind === "tel" ? (
                  <div className="csf-phone">
                    <div className="csf-dial">
                      <span aria-hidden="true">+{DIAL_CODES[phoneRegion]}</span>
                      <select
                        aria-label="Country code"
                        name={PHONE_CODE_FIELD}
                        value={phoneRegion}
                        onChange={(event) => updateValue(PHONE_CODE_FIELD, event.target.value)}
                      >
                        {dialCodes.map((option) => (
                          <option value={option.region} key={option.region}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      {...commonProps}
                      type="tel"
                      inputMode="tel"
                      placeholder={field.placeholder}
                      autoComplete={autocomplete[field.name]}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                      onBlur={() => validateOnBlur(field.name)}
                    />
                  </div>
                ) : (
                  <input
                    {...commonProps}
                    type={field.kind}
                    placeholder={field.placeholder}
                    autoComplete={autocomplete[field.name]}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    onBlur={() => validateOnBlur(field.name)}
                  />
                )}
                {error && <span id={`${id}-err`} className="csf-err">{error}</span>}
              </div>
            );
          })}
        </div>
        {status === "failed" && (
          <p className="csf-fail" role="alert">Something went wrong sending the form. Please check your details and try again.</p>
        )}
        <div className="csf-foot">
          <div className="csf-progress" aria-hidden="true">
            {Array.from({ length: stepCount }, (_, index) => (
              <span data-on={index <= stepIndex ? "true" : "false"} key={index} />
            ))}
          </div>
          <div className="csf-actions">
            {stepIndex > 0 && <button type="button" className="csf-back" onClick={goBack}>Back</button>}
            <button type="submit" className="csf-next" disabled={status === "sending"}>
              {isLastStep ? status === "sending" ? "Sending…" : "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
