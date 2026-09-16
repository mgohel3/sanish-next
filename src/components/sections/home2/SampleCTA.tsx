"use client";

import { useCmsForm, type FormFieldSchema } from "@/lib/forms";
import RecaptchaCheckbox from "@/components/RecaptchaCheckbox";

const BG  = "#2C3E50";
const ON  = "#F5F2EE";
const ACC = "#C4916A";

/**
 * Mirrors the CMS "Sample Request Form" (`sample-request`) exactly — the
 * instant-render fallback until that schema loads. Add/remove/relabel fields
 * from `/cms/forms/sample-request/`; submissions still land in Leads.
 */
const FALLBACK_FIELDS: FormFieldSchema[] = [
  { name: "name", field_type: "text", label: "Name", placeholder: "Your name", required: true, options: [] },
  { name: "phone", field_type: "tel", label: "Phone", placeholder: "+91 XXXXX XXXXX", required: true, options: [] },
  { name: "email", field_type: "email", label: "Email", placeholder: "your@email.com", required: true, options: [] },
  { name: "pincode", field_type: "text", label: "Pin Code", placeholder: "e.g. 110001", required: true, options: [] },
  { name: "enquire_type", field_type: "select", label: "Enquire Type", required: true, options: ["Commercial", "Consumer"] },
];

export default function Home2SampleCTA() {
  const { fields, values, setValue, submitting, submitted, error, submitLabel, successMessage, handleSubmit, recaptcha } =
    useCmsForm("sample-request", FALLBACK_FIELDS, "Request My Free Samples", "Our team will contact you within 24 hours to confirm your sample selections.");

  const lineFields = fields.filter((f) => ["text", "email", "tel", "number"].includes(f.field_type));
  const otherFields = fields.filter((f) => !lineFields.includes(f));

  return (
    <section className="relative home-section overflow-hidden" style={{ backgroundColor: BG }}>
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(196,145,106,0.10) 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(139,123,171,0.08) 0%, transparent 70%)`, transform: "translate(-30%, 30%)" }} />

      <div className="relative z-10 site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: ACC }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
                style={{ color: ACC, fontFamily: "var(--font-heebo)" }}>Free Samples</span>
            </div>
            <h2 className="font-medium leading-[1.1] mb-5"
              style={{ fontSize: "clamp(34px,4vw,52px)", fontFamily: "var(--font-vogue)", color: ON, letterSpacing: "-0.01em" }}>
              See the Quality<br /><em>Before You Decide</em>
            </h2>
            <p className="text-[16px] leading-[1.75] mb-8"
              style={{ color: "rgba(245,242,238,0.75)", fontFamily: "var(--font-heebo)" }}>
              Request free physical laminate samples delivered to your door. Architects, interior designers, and builders get priority dispatch within 48 hours.
            </p>
            <div className="space-y-3">
              {[
                "Choose from 500+ designs",
                "A4-size physical sample chips",
                "Delivered anywhere in India",
                "No cost, no commitment",
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${ACC}25` }}>
                    <svg className="w-3 h-3" fill="none" stroke={ACC} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[14px]"
                    style={{ color: "rgba(245,242,238,0.75)", fontFamily: "var(--font-heebo)" }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="p-8 md:p-10"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "28px", border: "1px solid rgba(255,255,255,0.12)" }}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(123,171,139,0.2)" }}>
                  <svg className="w-8 h-8" fill="none" stroke="#7BAB8B" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-medium mb-2"
                  style={{ color: ON, fontFamily: "var(--font-heebo)" }}>Request Received!</h3>
                <p className="text-[14px]"
                  style={{ color: "rgba(245,242,238,0.6)", fontFamily: "var(--font-heebo)" }}>
                  {successMessage}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-medium mb-6"
                  style={{ color: ON, fontFamily: "var(--font-heebo)" }}>Request Free Samples</h3>
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                  {lineFields.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {lineFields.map((field) => (
                        <div key={field.name}>
                          <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                            style={{ color: ON, fontFamily: "var(--font-heebo)" }}>
                            {field.label}{field.required ? " *" : ""}
                          </label>
                          <input required={field.required} type={field.field_type} placeholder={field.placeholder}
                            value={values[field.name] || ""}
                            onChange={(e) => setValue(field.name, e.target.value)}
                            className="w-full px-4 py-3 text-[14px] border outline-none transition-colors"
                            style={{ borderRadius: "12px", color: ON, backgroundColor: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {otherFields.map((field) => {
                    if (field.field_type === "select") {
                      return (
                        <div key={field.name}>
                          <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                            style={{ color: ON, fontFamily: "var(--font-heebo)" }}>
                            {field.label}{field.required ? " *" : ""}
                          </label>
                          <select required={field.required} value={values[field.name] || ""}
                            onChange={(e) => setValue(field.name, e.target.value)}
                            className="w-full px-4 py-3 text-[14px] border outline-none transition-colors appearance-none"
                            style={{ borderRadius: "12px", color: ON, backgroundColor: BG, borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }}>
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
                        <div key={field.name}>
                          <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                            style={{ color: ON, fontFamily: "var(--font-heebo)" }}>
                            {field.label}{field.required ? " *" : ""}
                          </label>
                          <textarea required={field.required} placeholder={field.placeholder} rows={4}
                            value={values[field.name] || ""}
                            onChange={(e) => setValue(field.name, e.target.value)}
                            className="w-full px-4 py-3 text-[14px] border outline-none transition-colors resize-none"
                            style={{ borderRadius: "12px", color: ON, backgroundColor: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }} />
                        </div>
                      );
                    }
                    return null;
                  })}
                  {recaptcha.version === "v2" && (
                    <RecaptchaCheckbox siteKey={recaptcha.siteKey} onVerify={recaptcha.onVerify} />
                  )}
                  {error && (
                    <p className="text-[12px]" style={{ color: "#e08080", fontFamily: "var(--font-heebo)" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button type="submit" disabled={submitting}
                    className="w-full py-4 text-[13px] font-medium text-white uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:opacity-90"
                    style={{ backgroundColor: ACC, borderRadius: "14px", fontFamily: "var(--font-heebo)" }}>
                    {submitting ? "Submitting…" : submitLabel}
                  </button>
                  <p className="text-[11px] text-center" style={{ color: "rgba(245,242,238,0.35)", fontFamily: "var(--font-heebo)" }}>
                    Free delivery. No credit card required.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
