"use client";

import Button from "@/components/ui/Button";
import { useCmsForm, type FormFieldSchema } from "@/lib/forms";
import RecaptchaCheckbox from "@/components/RecaptchaCheckbox";

/**
 * Fields today mirror the CMS "Contact Form" (`contact-us-form`) exactly —
 * this is only the instant-render fallback used until that schema loads (or
 * if it's ever unreachable). Add/remove/relabel fields from
 * `/cms/forms/contact-us-form/` and this form updates with no deploy;
 * submissions still land in Leads exactly as before.
 */
const FALLBACK_FIELDS: FormFieldSchema[] = [
  { name: "name", field_type: "text", label: "Name", required: true, options: [] },
  { name: "phone", field_type: "tel", label: "Phone", required: true, options: [] },
  { name: "email", field_type: "email", label: "Email", required: true, options: [] },
  { name: "pincode", field_type: "text", label: "Pin Code", required: true, options: [] },
  { name: "enquire_type", field_type: "select", label: "Enquire Type", required: true, options: ["Commercial", "Consumer"] },
  {
    name: "message",
    field_type: "textarea",
    label: "Message",
    placeholder: "Enter the Product IDs You're Interested In\ne.g.,\nLM-19928\nLM-19920\nLM-19785",
    required: false,
    options: [],
  },
];

const inputClass =
  "bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full";
const labelClass = "text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase";

export default function ContactForm() {
  const { fields, values, setValue, submitting, submitted, error, submitLabel, successMessage, handleSubmit, recaptcha } =
    useCmsForm("contact-us-form", FALLBACK_FIELDS, "Submit Inquiry", "Your inquiry has been received. Our team will get back to you within 24 hours.");

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(123,171,139,0.15)" }}>
          <svg className="w-8 h-8" fill="none" stroke="#4CAF6B" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-[24px] text-[var(--text-primary)] mb-2">Thank You!</h3>
        <p className="text-[14px] text-[var(--text-secondary)]">{successMessage}</p>
      </div>
    );
  }

  // Single-line fields flow two-per-row (matches the original Name+Phone /
  // Email+Pin Code layout); dropdowns and long text stay full width below —
  // this holds for any field set the CMS produces, not just today's.
  const lineFields = fields.filter((f) => ["text", "email", "tel", "number"].includes(f.field_type));
  const otherFields = fields.filter((f) => !lineFields.includes(f));

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
      {lineFields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lineFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <input
                type={field.field_type}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                onChange={(e) => setValue(field.name, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}

      {otherFields.map((field) => {
        if (field.field_type === "select") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <select
                required={field.required}
                value={values[field.name] || ""}
                onChange={(e) => setValue(field.name, e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>Select type</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }
        if (field.field_type === "textarea") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <textarea
                placeholder={field.placeholder}
                rows={5}
                required={field.required}
                value={values[field.name] || ""}
                onChange={(e) => setValue(field.name, e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
          );
        }
        return null;
      })}

      {recaptcha.version === "v2" && (
        <RecaptchaCheckbox siteKey={recaptcha.siteKey} onVerify={recaptcha.onVerify} />
      )}

      {error && (
        <p className="text-[13px]" style={{ color: "#d64545" }}>
          Something went wrong sending your inquiry. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth className="mt-8" disabled={submitting}>
        {submitting ? "Submitting…" : submitLabel}
      </Button>
    </form>
  );
}
