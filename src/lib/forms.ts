/**
 * CMS-managed forms (`GET /api/forms/<slug>/`, `POST /api/forms/<slug>/submit/`).
 *
 * `src/lib/inquiries.ts` (the fixed-field, direct-to-Inquiry submit used
 * historically by ContactForm/Popup) still exists for anything not yet
 * migrated. Forms whose `target_pipeline` is "inquiry" on the backend route
 * into the exact same `leads.Inquiry` table / Leads dashboard as before —
 * this is just the CMS-field-editable front door onto that same pipeline.
 */
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { getRecaptchaV3Token } from "@/lib/recaptcha";

export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "hidden";

export interface FormFieldSchema {
  name: string;
  field_type: FormFieldType;
  label: string;
  placeholder?: string;
  help_text?: string;
  required: boolean;
  options: string[];
}

export interface FormSchema {
  slug: string;
  name: string;
  description?: string;
  submit_label: string;
  success_message: string;
  fields: FormFieldSchema[];
}

export async function getFormSchema(slug: string): Promise<FormSchema | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/forms/${slug}/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as FormSchema;
  } catch {
    return null;
  }
}

export async function submitForm(
  slug: string,
  data: Record<string, string | boolean>,
  recaptchaToken?: string | null
): Promise<{ ok: boolean; errors?: Record<string, string[]> }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/forms/${slug}/submit/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
        source_page: typeof window !== "undefined" ? window.location.pathname : "",
        recaptcha_token: recaptchaToken || "",
      }),
    });
    if (!res.ok) {
      const errors = await res.json().catch(() => undefined);
      return { ok: false, errors };
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/**
 * Powers a form whose *visual design stays bespoke per-component* (Contact
 * Form, the site-wide popup, …) but whose field list comes from the CMS.
 * Starts from `fallbackFields` (today's hard-coded fields) so the form
 * renders instantly and correctly even if the CMS fetch is slow or fails,
 * then swaps in the CMS-configured fields once loaded — so adding, removing
 * or relabelling a field in `/cms/forms/<slug>/` shows up with no deploy.
 */
export function useCmsForm(
  slug: string,
  fallbackFields: FormFieldSchema[],
  fallbackSubmitLabel = "Submit",
  fallbackSuccessMessage = "Thank you!"
) {
  const [fields, setFields] = useState<FormFieldSchema[]>(fallbackFields);
  const [submitLabel, setSubmitLabel] = useState(fallbackSubmitLabel);
  const [successMessage, setSuccessMessage] = useState(fallbackSuccessMessage);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const { recaptcha: recaptchaSettings } = useSiteSettings();

  useEffect(() => {
    let active = true;
    getFormSchema(slug).then((schema) => {
      if (!active || !schema || schema.fields.length === 0) return;
      setFields(schema.fields);
      setSubmitLabel(schema.submit_label);
      setSuccessMessage(schema.success_message);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const setValue = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (
    e: { preventDefault: () => void },
    extra?: Record<string, string>,
    onSuccess?: () => void
  ) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    let recaptchaToken: string | null = null;
    if (recaptchaSettings.version === "v3") {
      recaptchaToken = await getRecaptchaV3Token(recaptchaSettings.site_key, `submit_${slug.replace(/-/g, "_")}`);
    } else if (recaptchaSettings.version === "v2") {
      if (!v2Token) {
        setSubmitting(false);
        setError(true);
        return;
      }
      recaptchaToken = v2Token;
    }

    const result = await submitForm(slug, { ...values, ...extra }, recaptchaToken);
    setSubmitting(false);
    if (!result.ok) {
      setError(true);
      return;
    }
    setSubmitted(true);
    onSuccess?.();
  };

  const recaptcha = {
    version: recaptchaSettings.version,
    siteKey: recaptchaSettings.site_key,
    onVerify: setV2Token,
  };

  return { fields, values, setValue, submitting, submitted, error, submitLabel, successMessage, handleSubmit, recaptcha };
}
