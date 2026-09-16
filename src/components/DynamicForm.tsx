"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { getFormSchema, submitForm, type FormSchema } from "@/lib/forms";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { getRecaptchaV3Token } from "@/lib/recaptcha";
import RecaptchaCheckbox from "@/components/RecaptchaCheckbox";

const inputClass =
  "bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full";
const labelClass = "text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase";

/**
 * Renders and submits any CMS-managed form by slug — fields, labels,
 * requiredness and options all come from `GET /api/forms/<slug>/`, so the
 * client can add/remove fields without a code change.
 */
export default function DynamicForm({ slug }: { slug: string }) {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const { recaptcha } = useSiteSettings();

  useEffect(() => {
    let active = true;
    getFormSchema(slug).then((s) => {
      if (active) setSchema(s);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!schema) return null;

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(123,171,139,0.15)" }}
        >
          <svg className="w-8 h-8" fill="none" stroke="#4CAF6B" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-[24px] text-[var(--text-primary)] mb-2">Thank You!</h3>
        <p className="text-[14px] text-[var(--text-secondary)]">{schema.success_message}</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(false);

        let recaptchaToken: string | null = null;
        if (recaptcha.version === "v3") {
          recaptchaToken = await getRecaptchaV3Token(recaptcha.site_key, `submit_${slug.replace(/-/g, "_")}`);
        } else if (recaptcha.version === "v2") {
          if (!v2Token) {
            setSubmitError(true);
            return;
          }
          recaptchaToken = v2Token;
        }

        setSubmitting(true);
        const result = await submitForm(slug, values, recaptchaToken);
        setSubmitting(false);
        if (!result.ok) {
          setSubmitError(true);
          return;
        }
        setSubmitted(true);
      }}
    >
      {schema.fields.map((field) => {
        if (field.field_type === "hidden") {
          return null;
        }

        if (field.field_type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-2 text-[14px] text-[var(--text-primary)]">
              <input
                type="checkbox"
                required={field.required}
                checked={Boolean(values[field.name])}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.checked })}
                className="rounded border-[var(--border)]"
              />
              {field.label}
            </label>
          );
        }

        if (field.field_type === "textarea") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                rows={5}
                value={(values[field.name] as string) || ""}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              {field.help_text && <p className="text-[12px] text-[var(--text-secondary)]">{field.help_text}</p>}
            </div>
          );
        }

        if (field.field_type === "select") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <select
                required={field.required}
                value={(values[field.name] as string) || ""}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  {field.placeholder || "Select"}
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.field_type === "radio") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label className={labelClass}>{field.label}</label>
              <div className="flex flex-wrap gap-4">
                {field.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-[14px] text-[var(--text-primary)]">
                    <input
                      type="radio"
                      name={field.name}
                      required={field.required}
                      checked={values[field.name] === opt}
                      onChange={() => setValues({ ...values, [field.name]: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          );
        }

        const inputType = field.field_type === "email" ? "email" : field.field_type === "tel" ? "tel" : field.field_type === "number" ? "number" : "text";
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label className={labelClass}>{field.label}</label>
            <input
              type={inputType}
              required={field.required}
              placeholder={field.placeholder}
              value={(values[field.name] as string) || ""}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              className={inputClass}
            />
            {field.help_text && <p className="text-[12px] text-[var(--text-secondary)]">{field.help_text}</p>}
          </div>
        );
      })}

      {recaptcha.version === "v2" && (
        <RecaptchaCheckbox siteKey={recaptcha.site_key} onVerify={setV2Token} />
      )}

      {submitError && (
        <p className="text-[13px]" style={{ color: "#d64545" }}>
          Something went wrong sending your submission. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth className="mt-4" disabled={submitting}>
        {submitting ? "Submitting…" : schema.submit_label}
      </Button>
    </form>
  );
}
